module.exports = userServices = ({ userModel })=>{
    return{
        // Middleware -retrive record by ID
        getUserById: async(req, res,next) =>{
            try {
                user = await userModel.findById(req.params.id);
                if (user == null) {
                return res.status(404).json({ message: 'Cannot find user - UserID does not exist' });
                }
            } catch (err) {
                return res.status(500).json({ message: `${err.message} || UserID may be invalid` });
            }
            
            res.user = user;
            next();
        },

        // middleware - check if email is unique
        isEmailUnique: async(req, res,next)=>{
            if(!req.body.email) return next()
            try{
                const email = await userModel.findOne({email: req.body.email});
                if(email){
                    return res.status(401).json({message: 'Email already exists'})
                };
            } catch (err) {
                return res.status(500).json({message: err.message})
            }
            next();
        },

        getUserByEmail: async(req, res, next)=>{
            try {
            user = await userModel.findOne({email: req.body.email});
            if (user == null) {
                return res.status(404).json({ message: 'Invalid email'});
              }
            } catch (err) {
              return res.status(500).json({ message: err.message });
            }
            res.user = user;
            next();
        },

    }
}  
