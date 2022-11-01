require('../connection/connection');
const Product = require('../models/Products')

const list = async () => {
  try {
    const productos = await Product.find();
    return productos;
  } catch (error) {
    throw new Error("No hay productos en DB" , error);
  }
};

// const getById = async (id) => {
//   try {
//     await knex
//     .from('productos') 
//     .select('*') 
//     .where({ id }) 
//     .then((data) => { 
//       return data;
//     }).catch((error) => {    
//       throw new Error('Producto no encontrado', error)
//     });
//   } catch (error) {
//     throw new Error('Producto no encontrado', error)
//   } 
// } 

const add = async (product) => {
  try {
    const newProduct = new Product(product);
    const data = await newProduct.create();
    return data;
  } catch (error) {
    throw new Error('No se pudo crear el producto', error)
  }
}

// const deleteById = (id) => {
//   try {
//     knex
//     .from('productos')
//     .where('id', '=' , id)
//     .del()
//     .then(() => {
//       return ('Producto eliminado exitosamente')
//     }).catch((error) => {
//       throw new Error ('Producto no se pudo eliminar', error)
//     })
//   } finally {
//     knex.destroy();
//   }
// };


module.exports = { list, add };