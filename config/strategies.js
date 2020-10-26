module.exports = strategies = ({ passportJwt, userModel }) =>{
        return{ 
        localOptions : {        
            usernameField: 'email',
            passwordField:"password",
            session:false, passReqToCallback:true},

        local : (req, username, password, done)=>{

            userModel.findOne({ email: username },(err,user)=>{
                    if (err){ return done(err); }
                    if (!user){ return done(null, false, { message: 'Invalid email' }); }
                    if (!user.verifyPassword(password)){ return done(null, false, { message: 'Incorrect Password' }); }
                    console.log(user);
                    return done(null, user);
                });
            },

        jwtOptions: {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: process.env.JWT_SECRET
        },
        
        jwt: (req, jwtPayload, done)=>{
            userModel.findOne({email: jwtPayload.email}, (err, user)=>{
                if (err) {
                    return done(err, false);
                }
                // No such user
                if (user === null) {
                    return done(null, false, { message: "User not found" });
                }
        
                return done(null, { _id: user._id, username: user.email });
            });
        },       
    }
}