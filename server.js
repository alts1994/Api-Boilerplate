const app = require("./config/express");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port} \nEnv: ${process.env.NODE_ENV}`);
});