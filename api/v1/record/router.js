module.exports = recordRouter = ({ express, recordServices, recordController })=>{

    const router = express.Router();

    router.get('/', recordController.listRecords);
    router.get('/:id', recordServices.getRecordById, recordController.getRecord);
    router.post('/', recordController.createRecord);
    router.patch('/:id', recordServices.getRecordById, recordController.updateRecord);
    router.delete('/:id', recordServices.getRecordById, recordController.deleteRecord);

    return router;
};