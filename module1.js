function createUser(name, age) {
    return {
        name,
        age,
        sayHello: () => {
            console.log(`hello my name is ${name}, my age ${age}`);
        }
    }
}

module.exports = {
    createUser
}
