module.exports = userController = ({ userModel })=>{
    return{

        // List all users
        listUsers: async (req, res)=>{
            try{
                const users = await userModel.find();
                res.json(users);
            } catch(err) {
                res.status(500).json({ message: err.message });
            }
        },

        // Get 1 user
        getUser: async (req,res) =>{
            res.json(res.user);
        },

        // Create one user
        createUser: async (req, res)=>{
            const user = new userModel({
                email: req.body.email,
                password: req.body.password,
            })

            try {
                const newUser = await user.save();
                res.status(201).json(newUser)
            } catch (err) {
                res.status(400).json({message: err.message})
            }
        },

        // Update 1 user

        updateUser: async (req,res)=>{
            if(req.body.email != null) {
                res.user.email = req.body.email; 
            }
        
            if(req.body.password != null){
                res.user.password = req.body.password;
            }
            try {
                const updatedUser = await res.user.save();
                res.status(200).json(updatedUser);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }

        },

        //Delete 

        deleteUser: async (req, res)=>{
            try {
                await res.user.remove();
                res.json({ message: 'User Deleted' });
              } catch (err) {
                res.status(500).json({ message: err.message });
              }
        }



    }
}