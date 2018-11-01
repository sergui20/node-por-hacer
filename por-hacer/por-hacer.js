const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB(); //Porque si cargamos el archivo JSON automaticamente se transforma en un objeto, al hacerle un push se me agrega otra tarea, y de esa forma guardo mi objeto con mas tareas.

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    return porHacer;
}

const saveDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error(err);

        console.log('Your task has been saved correctly !')
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json'); //Si no cargamos el archivo, los datos se eliminaran y se agregaran los nuevos
        //Automaticamente se transforma en un objeto sin necesidad de transformarlo por nosotros

    } catch (err) {
        listadoPorHacer = [];
    }
}

const listar = (completado) => {
    cargarDB()
    if (completado === true) {
        let reviewTasks = listadoPorHacer.filter(tarea => tarea.completado === completado)
        return reviewTasks;
    } else if (completado === false) {
        let reviewTasks = listadoPorHacer.filter(tarea => tarea.completado === false)
        return reviewTasks;
    } else {
        return listadoPorHacer;
    }
}

const actualizar = (descripcion, completado) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(element => descripcion === element.descripcion)
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        saveDB();
        return 'Tarea actualizaada correctamente';
    } else {
        return 'Tarea no encontrada';
    }
}

const borrar = (descripcion) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(elemento => descripcion === elemento.descripcion)
    if (index >= 0) {
        let removed = listadoPorHacer.splice(index, 1);
        saveDB();
        return removed;
    } else {
        return 'Tarea no encontrada';
    }
}

module.exports = {
    crear,
    saveDB,
    listar,
    actualizar,
    borrar
}