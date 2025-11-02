// Películas
const peliculas = [
    { id: 1, titulo: "Avatar 2", genero: "Ciencia ficción", horario: "18:00", sala: 1, disponibles: 40 },
    { id: 2, titulo: "Elementos", genero: "Animación", horario: "21:00", sala: 2, disponibles: 50 },
    { id: 3, titulo: "Homo Argento", genero: "Comedia", horario: "14:00", sala: 2, disponibles: 50 },
    { id: 4, titulo: "El Conjuro 2", genero: "Terror", horario: "22:00", sala: 1, disponibles: 40 },
    { id: 5, titulo: "Culpa Nuestra", genero: "Romántica", horario: "19:00", sala: 2, disponibles: 50 },
  ];
  //Mostrar Peliculas Disponibles
  function mostrarPeliculas() {
    console.log("Películas disponibles:");
    peliculas.forEach(p => { //forEach pasea por el array de las peliculas (each: significa cada x objeto de array)
      console.log(`ID: ${p.id}, Título: ${p.titulo}, Género: ${p.genero}, Horario: ${p.horario}, Sala: ${p.sala}, Entradas disponibles: ${p.disponibles}`);
    }); //p es el objeto del array pj: la pelicula
  }
  const prompt = require("prompt-sync")({ sigint: true });
  
  function mostrarPeliculas() {
    console.log("Mostrando lista de películas disponibles...");
  }

  //AGRAGAR PELICULAS A LA LISTA
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
  
  
  mostrarPeliculas();            // Muestra todas las películas disponibles
  agregarPelicula()              //Agregar una pelicula más peliculasMasReservadas(); 
  editarPelicula()             //Puedo editar las peliculas    
  peliculasMasReservadas();   // Ver las películas más reservadas
  eliminarPelicula()           //Poder eliminar pelicula