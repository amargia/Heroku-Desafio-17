const methodBank = require("../data/productos")

class Contenedor { 
  
  static getAll() {
    const productos = methodBank.list();
    return productos;
  }

  static create(product) {
    const prod = methodBank.add(product);
    return prod;
  }

//   static delete(id) {
//     const deleteProd = methodBank.deleteById(id);
//     return deleteProd;
//   }

//   static getById(id) {
//     return methodBank.getById(id)
//   }
}

module.exports = Contenedor;