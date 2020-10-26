module.exports = authController = ({passport, passportLocal, strategies, jwt}) =>{
    
    const genToken = (email) =>{
        return  jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "7d"});
    }

    const LocalStrategy = passportLocal.Strategy;
    /*const localOpts = {
        usernameField: 'email',
        passwordField:"password",
        session:false, passReqToCallback:true
    };*/

    passport.use('local', new LocalStrategy(strategies.localOptions,strategies.local));

    return {
        authUser: (req, res, next)=>{
            if(req.body.password.length===0 || req.body.email.length === 0) return res.status(400).json({message: "missing user info"});
            
            passport.authenticate('local',(err, user, info) =>{
                   if(err) return res.status(500).json({message: info});
                   if(!user) return res.status(400).json({message: info});
                
                   return res.status(200).json(genToken(user.email));
               })(req, res, next);
            }
            
    }
}