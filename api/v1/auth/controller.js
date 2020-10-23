module.exports = authController = ({passport, passportJWT, jwt}) =>{
    const jwtStrategy = passportJWT.Strategy;
    const extractJwt = passportJWT.ExtractJwt;

    const genToken = (email) =>{
        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return token
    }

    //passport.use("jwt");




    return {
        authenticateUser: async(req,res)=>{
            try{
                passwordMatches = await res.user.comparePassword(req.body.password);
            } catch(err) {
                return res.status(500).json({message: err.message})
            }
            // JWT must be stored in authorization header before proceeding to make any further calls
            return passwordMatches? res.status(200).json(genToken(user.email)) : res.status(400).json({message: "invalid password"})
        }
    }
}