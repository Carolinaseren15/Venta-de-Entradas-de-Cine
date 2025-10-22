// Películas
const peliculas = [
  { id: 1, titulo: "Avatar 2", genero: "Ciencia ficción", horario: "18:00", sala: 1, disponibles: 40 },
  { id: 2, titulo: "Elementos", genero: "Animación", horario: "21:00", sala: 2, disponibles: 50 },
  { id: 3, titulo: "Homo Argento", genero: "Comedia", horario: "14:00", sala: 2, disponibles: 50 },
  { id: 4, titulo: "El Conjuro 2", genero: "Terror", horario: "22:00", sala: 1, disponibles: 40 },
  { id: 5, titulo: "Culpa Nuestra", genero: "Romántica", horario: "19:00", sala: 2, disponibles: 50 },
];

// Salas
const salas = [
  { id: 1, capacidad: 50 }, // tiene que decremantar la capacidad
  { id: 2, capacidad: 40 },
];

// Reservas (inicial)
const reservas = [
  { cliente: "Caro", peliculaId: 1, cantidad: 2 },
];

// Mostrar películas disponibles
function mostrarPeliculas() {
  console.log("Películas disponibles:");
  peliculas.forEach(p => { //forEach pasea por el array de las peliculas (each: significa cada x objeto de array)
    console.log(`ID: ${p.id}, Título: ${p.titulo}, Género: ${p.genero}, Horario: ${p.horario}, Sala: ${p.sala}, Entradas disponibles: ${p.disponibles}`);
  }); //p es el objeto del array pj: la pelicula
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


//  Ejemplo de uso:


mostrarPeliculas();            // Muestra todas las películas disponibles
reservarEntradas("Luis", 2, 4); // Reserva 4 entradas para "Elementos"
reservarEntradas("Ana", 1, 3);  // Reserva 3 entradas para "Avatar 2"
mostrarDisponibilidad();       // Ver entradas disponibles luego de las reservas
peliculasMasReservadas();      // Ver las películas más reservadas

