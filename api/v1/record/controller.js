module.exports = recordController = ({ recordModel })=>{
    return{

        // List all records
        listRecords: async (req, res)=>{
            try{
                const records = await recordModel.find();
                res.json(records);
            } catch(err) {
                res.status(500).json({ message: err.message });
            }
        },

        // Get 1 record
        getRecord: async (req,res) =>{
            res.json(res.record);
        },

        // Create one record
        createRecord: async (req, res)=>{
            const record = new recordModel({
                name: req.body.name,
            })

            try {
                const newRecord = await record.save();
                res.status(201).json(newRecord)
            } catch (err) {
                res.status(400).json({message: err.message})
            }
        },

        // Update 1 record

        updateRecord: async (req,res)=>{
            if(req.body.name != null){
                res.record.name = req.body.name;
            }

            try {
                const updatedRecord = await res.record.save();
                res.status(200).json(updatedRecord);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }

        },

        //Delete 

        deleteRecord: async (req, res)=>{
            try {
                await res.record.remove();
                res.json({ message: 'Record Deleted' });
              } catch (err) {
                res.status(500).json({ message: err.message });
              }
        }



    }
}