module.exports = ({ express, authController }) =>{
    const router = express.Router();
    
    router.post('/', authController.authUser);
    
    return router;
}