// proyecto Tareas pendientes

// Variable
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
let tareas =[];


//EventListenners
EventListenners();

function EventListenners() {
    // Cuando usuario agrega un nuevo tarea
    formulario.addEventListener('submit', agregartarea);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tareas = JSON.parse( localStorage.getItem('tareas')) || [];

        console.log(tareas);

        crearHTML();
    });
}



//Funciones
function agregartarea(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tarea = document.querySelector('#tarea').value;
    
    // validacion...
    if(tarea === ''){
      mostrarError('Un tarea no puede enviarse vacio');
        return;// evita ejecuten mas lineas de codigo
    }

    const tareaObj = {
        id:  Date.now(),
        tarea // = tarea : tarea
    }
    // añdir al arreglo de tareas
    tareas = [...tareas, tareaObj];
    // una vez agregado cremos HTML
    crearHTML();

    // reiniciar el fromulario

    formulario.reset();

}

 // mostrar mensaje de error
 function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar en el contendio
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // elimina alert despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
 }

 // Muestra listado tareas

 function crearHTML() {

    limpiarHTML();

    if(tareas.length > 0){
        tareas.forEach(tarea =>{
            // agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tarea');
            btnEliminar.innerText = 'X';

            // añadir funcion eliminar
            btnEliminar.onclick = ()=>{
                borrartarea(tarea.id);
            }
        
            //crear HTML
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tarea.tarea;

            // assignar boton
            li.appendChild(btnEliminar)
            
            // insertar en el html
            listaTareas.appendChild(li);
        });
    }

    sincronizarStorage();
 }
 // Agregar tareas a localStorage
 function sincronizarStorage() {
    localStorage.setItem('tareas',JSON.stringify(tareas))
 }

 // elimina tarea
 function borrartarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);

    crearHTML();
 }
 // limpar HTML
 function limpiarHTML() {
    while( listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
 }