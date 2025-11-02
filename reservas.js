function reservarEntrada() {
    console.log("Reservando entrada...");
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
  
reservarEntradas("Luis", 2, 4);// Reserva 4 entradas para "Elementos"
reservarEntradas("Ana", 1, 3); // Reserva 3 entradas para "Avatar 2"
eliminarReserva()             //Eliminar una reserva 
peliculasMasReservadas();     // Ver las películas más reservadas