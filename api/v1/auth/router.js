module.exports = ({ express, userServices, authController }) =>{
    const router = express.Router();
    
    router.post('/', userServices.getUserByEmail, authController.authenticateUser);
    
    return router;
}