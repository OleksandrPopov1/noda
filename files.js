const fs = require('fs').promises;

fs.appendFile('./file.txt', 'Hello').then(() => {
    console.log('Done')
}).catch(e => {
    console.log(e)
});

// fs.writeFile('./file.txt', 'Hello').then(() => {
//     console.log('Done')
// }).catch(e => {
//     console.log(e)
// })

// fs.readFile('./file.txt').then(data => {
//     console.log(data.toString())
// }).catch(e => {
//     console.log(e)
// })

// fs.unlink('./file.txt').then(value => {
//     console.log(value)
// }).catch(e => {
//     console.log(e)
// })

// fs.mkdir('./home').catch(e => {
//     console.log(e)
// })
