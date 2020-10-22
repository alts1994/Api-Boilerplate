module.exports = authController = () =>{
    return {
        authenticateUser: async(req,res)=>{
            try{
                // userServices.getUserByEmail returns user object if email is valid, we compare hash to verify user credentials
                passwordMatches = await res.user.comparePassword(req.body.password);
            } catch(err) {
                return res.status(500).json({message: err.message})
            }

            return passwordMatches? res.status(200).json({message: "valid"}) : res.status(400).json({message: "invalid"})
        }
    }
}