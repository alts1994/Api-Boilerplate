const assert = require('assert');

module.exports = recordModel = ({ mongoose })=>{   
    assert(mongoose, "mongoose is required");

    const recordSchema = new mongoose.Schema({
        name:    {type:String, required:true},
        updated: { type: Date, default: Date.now, required:true},
      });

    return mongoose.model('record', recordSchema);
}
