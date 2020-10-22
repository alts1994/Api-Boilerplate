module.exports = userRouter = ({ express, userServices, userController })=>{

    const router = express.Router();

    router.get('/', userController.listUsers);
    router.get('/:id', userServices.getUserById, userController.getUser);
    router.post('/', userServices.isEmailUnique, userController.createUser);
    router.patch('/:id', userServices.getUserById,userServices.isEmailUnique, userController.updateUser);
    router.delete('/:id', userServices.getUserById, userController.deleteUser);

    return router;
};