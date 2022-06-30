// const fs = require('fs')
// const path = require('path');
// const dir = path.join(__dirname, '../../Carts')

// class Cart {
//     constructor(name) {
//         const id = name ? name : this.getLastName();
//         this.id = id;
//         this.directory = `${dir}\\${id}.txt`;
//         if (name) {
//             if (!fs.existsSync(this.directory))
//                 throw ("No existe ese carrito")
//         }
//         else
//             fs.writeFile(this.directory, [], function (err) {
//                 if (err) throw err;
//                 console.log('File is created successfully.');
//             });
//     }
//     getLastName() {
//         const files = fs.readdirSync(dir)
//         if(files.length){
//             const lastFile = files[files.length - 1].split(".");
//             return Number.parseInt(lastFile[0]) + 1;
//         }
//         return 0; 
//     }
//     async save(object) {
//         try {
//             const data = await fs.promises.readFile(this.directory, 'utf8')
//             let content = data ? [...JSON.parse(data)] : [];
//             content = [...content, object]
//             fs.writeFile(this.directory, JSON.stringify(content), function (err) {
//                 if (err) throw err;
//             })
//         }
//         catch (err) {
//             console.log(err)
//         }

//         return object;
//     }
//     async getById(id) {
//         let object = {}
//         try {
//             const data = await fs.promises.readFile(this.directory, 'utf8')
//             object = data ? [...JSON.parse(data)][id] : [];
//         }
//         catch (err) {
//             console.log(err)
//         }

//         return object;

//     }
//     async getAll() {
//         const data = await fs.promises.readFile(this.directory, 'utf8')
//         return data ? [...JSON.parse(data)] : [];
//     }
//     async deleteById() {
//         fs.unlink(this.directory, function (err) {
//             if (err) throw err;
//             console.log('File is deleted successfully.');
//         });
//     }
//     async deleteProductById(id) {
//         try {
//             const data = await fs.promises.readFile(this.directory, 'utf8')
            
//             let list = data ? [...JSON.parse(data)] : [];
//             let newList = list.filter(object => object.id !== id)
//             fs.writeFile(this.directory, JSON.stringify(newList), function (err) {
//                 if (err) throw err;
//             })
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
//     async update(object) {
//         try {
//             const data = await fs.promises.readFile(this.directory, 'utf8')
//             let list = data ? [...JSON.parse(data)] : [];
//             let objectToUpdate = list[object.id]
//             if (objectToUpdate) {
//                 objectToUpdate =
//                     fs.writeFile(this.directory, JSON.stringify(newList), function (err) {
//                         if (err) throw err;
//                     })
//             }
//             else
//                 throw ('error: Producto no encontrado')
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
    
//     async deleteAll() {
//         await fs.promises.writeFile(this.directory, '')
//     }

// }
// module.exports = Cart;