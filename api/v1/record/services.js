module.exports = recordServices = ({ recordModel })=>{
    return{
        // Middleware -retrive record by ID
        getRecordById: async(req, res,next) =>{
            try {
                record = await recordModel.findById(req.params.id);
                if (record == null) {
                return res.status(404).json({ message: 'Cannot find record - recordID does not exist' });
                }
            } catch (err) {
                return res.status(500).json({ message: `${err.message} || recordID may be invalid` });
            }
            
            res.record = record;
            next();
        }
    }
}  
