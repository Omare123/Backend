class Ususario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [...libros];
        this.mascotas = [...mascotas];
    }
    getFullName(){
       return `${this.nombre} ${this.apellido}` 
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return(this.mascotas.length)
    }
    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
    }
    getBookNames(){
        return this.libros.map(libro => {
            return ' ' + libro.nombre
        })
    }

}
module.exports = Ususario