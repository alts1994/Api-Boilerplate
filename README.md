# API Boilerplate

A simple Node-Express-Mongo API boilerplate that uses Awilix for dependency injection and Passport for authentication. Designed to be extended and scaled.

## Setup
1. Follow [npm's install guide](https://www.npmjs.com/get-npm) or [download nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#install-script) and install Node 12
2. Test that npm is properly configured by running `npm -v`, it should print a version number (e.g. 6.14.5)
3. Install dependencies by running `npm install`
4. Create a .env file  from the template provided in sample.env and populate the values according to your needs
5. Start the server by running `npm run dev`, if everything is setup properly, it should print the following: 
```bash
Listening on Port ####
Env: {{your chosen env}} 
DB connection successful
``` 
## TechStack

### Database
- [MongoDB](https://www.mongodb.com/) - a noSQL database 
- [Mongoose](https://mongoosejs.com/) - a javascript framework to provide object modelling for MongoDB

MongoDB + Mongoose provide a flexible, but regulated, base for initial data modelling. In future, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) also gives us a convenient way to scale up the database without needing to worry about refractoring our database access layer. 


### Server
- [Node.js](https://nodejs.org) - an asynchronous, event driven javascript runtime environment
- [Express](https://expressjs.com/) - a javascript web application framework for Node.js

Node + Express are chosen as a base for the server for their reliability. While there are other frameworks with newer feature sets, this combination remains time tested and the support/documentation is generally easy enough to find.

### Security
- [Passport](http://www.passportjs.org) - a modular authentication middleware
- [JWT](https://github.com/auth0/node-jsonwebtoken) - open, industry standard method for representing claims securely between two parties
- [bCrypt](https://github.com/dcodeIO/bcrypt.js#readme) - a hashing function used to salt and hash sensitive data



Passport + JWT is used to render stateless, token-based authentication throughout the API. Passport's modular system also makes integrating other authentication services (eg. 0auth or Google) painless as the application grows in the future.

## Dependency Injection with Awilix

As an application grows, so does cross dependency within the system. Dependency injection allows us to centralize and regulate this cross dependency, eradicating errors from inaccurate references and simplifying testing. [Awilix](https://github.com/jeffijoe/awilix) is used to faciliate this functionality in this boilerplate.

To register a new dependency or reference, you'll need to do some small modifications to the configContainer.js file in the config folder.

1. Import the dependency as per usual at the top of the file eg. `const dependency = require('./dependency');`
2. Define it within the _Container.register_ function
   1. If you're adding an npm package define it "asValue" eg. `npmPackage: awilix.asValue('npmPackage')`
   2. If you're adding a module, you'll define it either "asClass" or "asFunction" depending how you've exported it eg. `exportedFunction : awilix.asFunction('exportedFunction')` or `exportedClass: awilix.asClass('exportedClass')`
   3. For anything that needs to be kept to a single instance (eg. models); chain `.scoped()` or `.singleton()`behind the definition. [(read more about lifetime management here)](https://github.com/jeffijoe/awilix#lifetimemanagement)
    eg. `model : awilix.asFunction('model').scoped()`

Specify which dependencies/modules you need injected when you call it in the factory function parameters or in the class constructor 
   ```javascript
    // Make an Awilix container and register the dependencies
    const awilix = require('awilix');
    const dependency = require('dependency');
    
    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.PROXY
        })
    container.register(
        dependency : awilix.asValue('dependency')
    )

    // Factory Function example
    const exampleFunction = ({ dependency }) =>{
        return dependency.method
    }

    // Class Constructor Example
    class exampleClass = {
        constructor(opts){
            this.dependency = opts.dependency
        }

        method(req,res) {
            return this.dependency
        }
    }
   ```
Finally, trigger a dependency injection with `container.resolve()` 
   ```javascript
   const container = require('./container');

   router.get(api/user/, container.resolve('exampleClass'));
   ```

And that's it! It may seem alittle tedious from the offset, but after you do it once or twice it's quite routine. 

## License

[MIT](https://choosealicense.com/licenses/mit/)
