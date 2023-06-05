const fs = require('fs/promises');
const path = require('path');


// //HW_1
// const sortFolder = async (readFolder, gender, writeFolder) => {
//     try {
//         const folderPath = path.join(__dirname, readFolder);
//         const files = await fs.readdir(folderPath);
//
//         for (const file of files) {
//             const pathToFile = path.join(folderPath, file);
//             const data = await fs.readFile(pathToFile);
//
//             const user = JSON.parse(data.toString());
//
//             if (user.gender !== gender) {
//                 await fs.rename(pathToFile, path.join(__dirname, writeFolder, file));
//             }
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }
//
// sortFolder('boys', 'male', 'girls');
// sortFolder('girls', 'female', 'boys');


//HW_2

const reader = async (folderPath) => {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const pathToFile = path.join(folderPath, file);

        const stat = await fs.stat(pathToFile);

        if (stat.isFile()) {
            await fs.rename(pathToFile, path.join(__dirname, 'own', file));
        }

        if (stat.isDirectory()) {
            await reader(pathToFile);
        }
    }
}

reader(path.join(__dirname, 'own'));







