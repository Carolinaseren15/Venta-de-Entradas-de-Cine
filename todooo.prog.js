// Películas
const peliculas = [
  { id: 1, titulo: "Avatar 2", genero: "Ciencia ficción", horario: "18:00", sala: 1, disponibles: 40 },
  { id: 2, titulo: "Elementos", genero: "Animación", horario: "21:00", sala: 2, disponibles: 50 },
  { id: 3, titulo: "Homo Argento", genero: "Comedia", horario: "14:00", sala: 2, disponibles: 50 },
  { id: 4, titulo: "El Conjuro 2", genero: "Terror", horario: "22:00", sala: 1, disponibles: 40 },
  { id: 5, titulo: "Culpa Nuestra", genero: "Romántica", horario: "19:00", sala: 2, disponibles: 50 },
];

function agregarPelicula() {
    console.log("\n AGREGAR NUEVA PELÍCULA ");
  
    const idNueva = parseInt(prompt("Ingrese el ID de la nueva película: "));
  
    // Validar que el ID no exista
    const existe = peliculas.some(p => p.id === idNueva);
    if (existe) {
      console.log(" Ya existe una película con ese ID.");
      return;
    }
  
    const titulo = prompt("Ingrese el título de la película: ").trim();
    const genero = prompt("Ingrese el género: ").trim();
    const horario = prompt("Ingrese el horario (hh:mm): ").trim();
    const sala = parseInt(prompt("Ingrese la sala (ID): "));
    const disponibles = parseInt(prompt("Ingrese la cantidad de entradas disponibles: "));
  
    // Validaciones básicas
    if (!titulo || !genero || !horario || isNaN(sala) || isNaN(disponibles) || disponibles <= 0) {
      console.log(" Datos inválidos. La película no fue agregada.");
      return;
    }
  
    // Verificar que la sala exista
    const salaExiste = salas.some(s => s.id === sala);
    if (!salaExiste) {
      console.log(" La sala ingresada no existe. Agregá la sala primero.");
      return;
    }
  
    // Agregar la película
    peliculas.push({
      id: idNueva,
      titulo,
      genero,
      horario,
      sala,
      disponibles
    });
  
    console.log(` Película "${titulo}" agregada correctamente.`);
    console.table(
      peliculas.map(p => ({
        ID: p.id,
        Título: p.titulo,
        Género: p.genero,
        Horario: p.horario,
        Sala: p.sala,
        Disponibles: p.disponibles
      }))
    );
  }
  

const prompt = require("prompt-sync")({ sigint: true });

function mostrarPeliculas() {
  console.log("Mostrando lista de películas disponibles...");
}

function reservarEntrada() {
  console.log("Reservando entrada...");
}
function menu() {
  let opcion = "";

  while (opcion !== "0") {
    console.log("------ MENÚ DEL CINE ------");
    console.log("1. Mostrar películas");
    console.log("2. Reservar entrada");
    console.log("0. Salir");

    opcion = prompt("Elige una opción: ");

    switch (opcion) {
      case "1":
        mostrarPeliculas();
        break;

      case "2":
        reservarEntrada();
        break;

      case "0":
        console.log("Saliendo del sistema...");
        break;

      default:
        console.log("Opción no válida. Intenta de nuevo.");
        break;
    }

    console.log("");
  }
}


// Salas
const salas = [
  { id: 1, capacidad: 50 }, // tiene que decremantar la capacidad
  { id: 2, capacidad: 40 },
];

function editarDisponibilidadSala() {
    console.log("\n EDITAR DISPONIBILIDAD DE SALA ");
    console.table(
      salas.map(s => ({
        ID: s.id,
        "Capacidad actual": s.capacidad
      }))
    );
  
    const idSala = parseInt(prompt("Ingrese el ID de la sala que desea modificar: "));
    const nuevaCapacidad = parseInt(prompt("Ingrese la nueva capacidad para la sala: "));
  
    const sala = salas.find(s => s.id === idSala);
  
    if (!sala) {
      console.log("Sala no encontrada.");
      return;
    }
  
    if (isNaN(nuevaCapacidad) || nuevaCapacidad <= 0) {
      console.log("Ingrese un número válido mayor que cero.");
      return;
    }
  
    // Confirmar cambio
    const anterior = sala.capacidad;
    sala.capacidad = nuevaCapacidad;
  
    console.log(`Capacidad de la sala ${sala.id} actualizada: ${anterior} → ${nuevaCapacidad}`);
  }
  function agregarSala() {
    console.log("\n AGREGAR NUEVA SALA ");
    console.table(
      salas.map(s => ({
        ID: s.id,
        Capacidad: s.capacidad
      }))
    );
  
    const idNueva = parseInt(prompt("Ingrese el ID de la nueva sala: "));
    const capacidad = parseInt(prompt("Ingrese la capacidad de la sala: "));
  
    // Validaciones
    if (isNaN(idNueva) || isNaN(capacidad)) {
      console.log(" Debe ingresar números válidos.");
      return;
    }
  
    if (capacidad <= 0) {
      console.log(" La capacidad debe ser mayor a cero.");
      return;
    }
  
    // Verificar si ya existe una sala con ese ID
    const existe = salas.some(s => s.id === idNueva);
    if (existe) {
      console.log(" Ya existe una sala con ese ID.");
      return;
    }
  
    // Agregar la nueva sala
    salas.push({ id: idNueva, capacidad });
    console.log(` Sala ${idNueva} agregada correctamente con capacidad para ${capacidad} personas.`);
  
    // Mostrar lista actualizada
    console.table(salas);
  }
  
  

// Reservas (inicial)
const reservas = [
  { cliente: "Caro", peliculaId: 1, cantidad: 2 },
];
function eliminarReserva() {
    console.log("\n ELIMINAR RESERVA ");
  
    if (reservas.length === 0) {
      console.log("No hay reservas registradas.");
      return;
    }
  
    // Mostrar reservas con índice para elegir
    console.table(
      reservas.map((r, index) => {
        const peli = peliculas.find(p => p.id === r.peliculaId);
        return {
          Índice: index,
          Cliente: r.cliente,
          Película: peli ? peli.titulo : "Desconocida",
          Cantidad: r.cantidad
        };
      })
    );
  
    const indice = parseInt(prompt("Ingrese el índice de la reserva que desea eliminar: "));
  
    if (isNaN(indice) || indice < 0 || indice >= reservas.length) {
      console.log(" Índice inválido.");
      return;
    }
  
    const reserva = reservas[indice];
  
    // Confirmar eliminación
    const confirmar = prompt(`¿Está seguro de eliminar la reserva de ${reserva.cliente} para la película "${peliculas.find(p => p.id === reserva.peliculaId).titulo}"? (s/n): `);
    if (confirmar.toLowerCase() !== "s") {
      console.log(" Operación cancelada.");
      return;
    }
  
    // Actualizar disponibilidad de la película
    const pelicula = peliculas.find(p => p.id === reserva.peliculaId);
    if (pelicula) {
      pelicula.disponibles += reserva.cantidad;
    }
  
    // Eliminar reserva
    reservas.splice(indice, 1);
  
    console.log(" Reserva eliminada correctamente.");
    mostrarReservas(); // Mostrar reservas actualizadas
  }
  

// Mostrar películas disponibles
function mostrarPeliculas() {
  console.log("Películas disponibles:");
  peliculas.forEach(p => { //forEach pasea por el array de las peliculas (each: significa cada x objeto de array)
    console.log(`ID: ${p.id}, Título: ${p.titulo}, Género: ${p.genero}, Horario: ${p.horario}, Sala: ${p.sala}, Entradas disponibles: ${p.disponibles}`);
  }); //p es el objeto del array pj: la pelicula
}
function editarPelicula() {
    console.log("\n EDITAR PELÍCULA ");
    console.table(
      peliculas.map(p => ({
        ID: p.id,
        Título: p.titulo,
        Género: p.genero,
        Horario: p.horario,
        Sala: p.sala,
        Disponibles: p.disponibles,
      }))
    );
  
    const idEditar = parseInt(prompt("Ingrese el ID de la película que desea editar: "));
    const pelicula = peliculas.find(p => p.id === idEditar);
  
    if (!pelicula) {
      console.log("Película no encontrada.");
      return;
    }
  
    console.log(`\nEditando "${pelicula.titulo}"... (deje en blanco si no quiere cambiar un campo)`);
  
    // Pedimos nuevos valores (si deja vacío, se mantiene el actual)
    const nuevoTitulo = prompt(`Nuevo título (${pelicula.titulo}): `);
    const nuevoGenero = prompt(`Nuevo género (${pelicula.genero}): `);
    const nuevoHorario = prompt(`Nuevo horario (${pelicula.horario}): `);
    const nuevaSala = prompt(`Nueva sala (${pelicula.sala}): `);
    const nuevasDisponibles = prompt(`Nuevas entradas disponibles (${pelicula.disponibles}): `);
  
    // Actualizamos los campos solo si el usuario ingresó algo
    if (nuevoTitulo.trim() !== "") pelicula.titulo = nuevoTitulo; //se usa para eliminar los espacios en 
    if (nuevoGenero.trim() !== "") pelicula.genero = nuevoGenero; //blanco al principio y al final de un texto (string).
    if (nuevoHorario.trim() !== "") pelicula.horario = nuevoHorario;
    if (nuevaSala.trim() !== "" && !isNaN(parseInt(nuevaSala))) pelicula.sala = parseInt(nuevaSala);
    if (nuevasDisponibles.trim() !== "" && !isNaN(parseInt(nuevasDisponibles))) pelicula.disponibles = parseInt(nuevasDisponibles);
  
    console.log("Película actualizada correctamente.");
    console.table(
      peliculas.map(p => ({
        ID: p.id,
        Título: p.titulo,
        Género: p.genero,
        Horario: p.horario,
        Sala: p.sala,
        Disponibles: p.disponibles,
      }))
    );
  }

  function eliminarPelicula() {
    console.log("\n ELIMINAR PELÍCULA ");
    console.table(
      peliculas.map(p => ({
        ID: p.id,
        Título: p.titulo,
        Género: p.genero,
        Horario: p.horario,
        Sala: p.sala,
        Disponibles: p.disponibles,
      }))
    );
  
    const idEliminar = parseInt(prompt("Ingrese el ID de la película que desea eliminar: "));
    const indice = peliculas.findIndex(p => p.id === idEliminar);
  
    if (indice === -1) {
      console.log(" Película no encontrada.");
      return;
    }
  
    // Confirmación antes de borrar
    const confirmar = prompt(`¿Está seguro de eliminar "${peliculas[indice].titulo}"? (s/n): `);
    if (confirmar.toLowerCase() === "s") {
      peliculas.splice(indice, 1);
      console.log("Película eliminada correctamente.");
    } else {
      console.log(" Operación cancelada.");
    }
  
    console.log("\n Lista actualizada de películas:");
    console.table(
      peliculas.map(p => ({
        ID: p.id,
        Título: p.titulo,
        Género: p.genero,
        Horario: p.horario,
        Sala: p.sala,
        Disponibles: p.disponibles,
      }))
    );
  }
  
  

// Reservar entradas
function reservarEntradas(cliente, peliculaId, cantidad) {
  const pelicula = peliculas.find(p => p.id === peliculaId); //pelicula.find : pelicula es el array y find es encontrar
  if (!pelicula) {                //pid tiene que ser igual a peliculaid, que es lo que puso el cliente, sino hay ninguna sal lo que dice en consola
    console.log("Película no encontrada.");
    return;
  }

  if (pelicula.disponibles >= cantidad) { //SI la cantidad de espacio disponible es mayor o igual a la cantidad disponible 
    pelicula.disponibles -= cantidad;     //se decrementa la cantidad reservada
    reservas.push({ cliente, peliculaId, cantidad }); 
    console.log(`Reserva confirmada para ${cliente}. Película: ${pelicula.titulo}, Cantidad: ${cantidad}`);
  } else {
    console.log(`No hay suficientes entradas disponibles. Disponibles: ${pelicula.disponibles}`);
  }
} 

// Mostrar disponibilidad por película // //nose si es necesario porque ya esta mas arriba (linea 21)
function mostrarDisponibilidad() {
  console.log("Disponibilidad de entradas por película:");
  peliculas.forEach(p => {
    console.log(`Película: ${p.titulo}, Sala: ${p.sala}, Entradas disponibles: ${p.disponibles}`);
  });
}

// Mostrar películas más reservadas
function peliculasMasReservadas() {
  const conteo = {}; //conteo es una array que guarda la cantidad de pelis reservadas

  reservas.forEach(r => {
    if (!conteo[r.peliculaId]) {   //r:reserva, si en reservas para el conteo no hay nada es igual a cero
      conteo[r.peliculaId] = 0;
    }
    conteo[r.peliculaId] += r.cantidad; //suma la cantidad de reservadas al conteo
  });


  //Este bloque de código ordena las películas por la 
  //cantidad de reservas realizadas y luego devuelve 
  //un arreglo con el título y la cantidad total de 
  //reservas para cada película, ordenado de mayor a menor. es un lioooooo nose si es lo que necesitamos
  const ordenadas = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])                  
    .map(([peliculaId, total]) => {
      const peli = peliculas.find(p => p.id === parseInt(peliculaId));
      return { titulo: peli.titulo, totalReservas: total };
    });

  console.log("Películas más reservadas:");
  ordenadas.forEach(p => {
    console.log(`Título: ${p.titulo}, Total de reservas: ${p.totalReservas}`);
  });
}
mostrarPeliculas();            // Muestra todas las películas disponibles
agregarPelicula()              //Agregar una pelicula más
menu();                        //Menú de las pelis
editarDisponibilidadSala()     //Poder editar la capacidad de la sala
agregarSala()                  //Si habia 2 salas con esta función van haber 3 salas
reservarEntradas("Luis", 2, 4);// Reserva 4 entradas para "Elementos"
reservarEntradas("Ana", 1, 3); // Reserva 3 entradas para "Avatar 2"
eliminarReserva()             //Eliminar una reserva 
mostrarDisponibilidad();      // Ver entradas disponibles luego de las reservas
peliculasMasReservadas();     // Ver las películas más reservadas
editarPelicula()             //Puedo editar las peliculas
eliminarPelicula()           //Poder eliminar pelicula

