let alumnos = [];

//FUNCIONES
function registrar(){
  const codigo = $('#codigo').val();
  const nombre = $('#nombre').val();
  const nota = parseInt($('#nota').val());

  if (nombre == '' || nota == '' || isNaN(nota)) {
    return
  } else if(nota > 10){
    alert('La nota máxima es 10')
    $('#nota').val('');
    return
  } else {
    return nuevoAlumno(codigo, nombre, nota);
  }
}

function nuevoAlumno(codigo, nombre, nota){
  let alumno = {
    codigo: codigo,
    nombre: nombre,
    nota: nota }

  alumnos.push(alumno);

  $('#nombre').val('')
  $('#nota').val('')
  $('#alumnos').html('')

  localStorage.setItem(alumno.codigo, JSON.stringify(alumno));
  $('#codigo').val(localStorage.length + 1);
  listarAlumnos()
}

function listarAlumnos(){
  $('#alumnos').html('')

  for (var i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i)
    const alumno = $.parseJSON(localStorage.getItem(clave))

    document.querySelector('#alumnos').innerHTML +=
    `
      <tr>
        <td>${alumno.codigo}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.nota}</td>
        <td><button id="${alumno.codigo}" onclick="editar(${alumno.codigo})">Editar</button></td>
        <td><button id="${alumno.codigo}" onclick="eliminar(${alumno.codigo})">Eliminar</button></td>
      </tr>
    `
  }
}

function editar(id){
  let alumno;

  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    if (clave == id) {
      alumno = $.parseJSON(localStorage.getItem(id))
      $('#codigo').val(alumno.codigo)
      $('#nombre').val(alumno.nombre)
      $('#nota').val(alumno.nota)
    }
  }
}

function eliminar(id){
  localStorage.removeItem(id)
  $('#codigo').val(localStorage.length + 1);
  listarAlumnos()
}

function notaPromedio(){  //check
    const notas = alumnos.reduce(function(suma, alumno){
        return suma + alumno.nota;
    }, 0);

    const total = Math.round(notas / alumnos.length);
    alert(total)
}

$(document).ready(function(){

  $('#codigo').val(localStorage.length + 1);
  listarAlumnos()

  //EVENTOS
  $('#registrar') .on('click', registrar)
  $('#promedio')  .on('click', notaPromedio)

  $('#nota-mayor').on('click', ()=>{
    let max = 0; //mostrar el número más alto

    for (let i = 0; i < localStorage.length; i++) {
      let clave = localStorage.key(i)
      let alumno = $.parseJSON(localStorage.getItem(clave))
      console.log(alumno.nota)
      if (alumno.nota > max) {
        max = alumno.nota
      }
    }
    alert(max);
  })

  $('#nota-menor').on('click', ()=>{
    let min = 10; //mostrar el número más alto

    for (let i = 0; i < localStorage.length; i++) {
      let clave = localStorage.key(i)
      let alumno = $.parseJSON(localStorage.getItem(clave))
      if (alumno.nota < min) {
        min = alumno.nota
      }
    }
    alert(min);
  })

});
