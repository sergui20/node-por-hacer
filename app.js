const argv = require('./config/yargs');
const { crear, saveDB, listar, actualizar, borrar } = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        saveDB();
        break;
    case 'listar':
        //console.log(typeof(argv.completado)); Argv.completado es un boolano true por defecto, pero al pasar false en la terminal es un string.
        let listado = listar(argv.completado);
        console.log(listado)
        for (let tarea of listado) {
            console.log('====Por Hacer===='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('================='.green);
        }
        break;
    case 'actualizar':
        let actualizado = actualizar(argv.descripcion, argv.completado)
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion)
        console.log(borrado)
        break;
    default:
        console.log('Comando no reconocido');
}