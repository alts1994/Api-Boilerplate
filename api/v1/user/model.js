const assert = require('assert');

module.exports = userModel = ({ mongoose, encrypt })=>{   
    assert(mongoose, "mongoose is required");

    const userSchema = new mongoose.Schema({
        email: {type: String, required: true, index:{unique:true}},
        password: {type: String, required: true},
        updated: { type: Date, default: Date.now, required:true},
      });

    userSchema.pre('save', function(next){
        const user =  this;
        // only hash the password if it has been modified or new
        if (!user.isModified('password')) return next();
        encrypt.hash(user.password, 10, (err, hash) =>{
            if(err) return next(err);
                user.password = hash;
             next();
         });
    });
    
    userSchema.methods.comparePassword = function(candidatePassword){
      return encrypt.compareSync(candidatePassword, this.password, (err, res) => {
          if(err){throw err}
          return res
      }); 
    };

    return mongoose.model('user', userSchema);
}
