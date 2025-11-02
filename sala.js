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
    
    
    editarDisponibilidadSala() 
    agregarSala()
    