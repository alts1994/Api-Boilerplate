const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt= require('bcryptjs');

const userSchema = new Schema({
    email: {type: String, required: true, index:{unique:true}},
    password: {type: String, required: true}
    
})

userSchema.pre('save', function(next){
    const user =  this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash) =>{
        if(err) return next(err);
         console.log(hash);
            user.password = hash;
         next();
     });
});

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compareSync(candidatePassword, this.password, (err, res) => {
        if(err){throw err}
        return res
    }); 
};

module.exports = mongoose.model('user', userSchema)