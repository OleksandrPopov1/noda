const module1 = require('./module1');
require('./files');
const user = module1.createUser('viktor', 22);

user.sayHello();
