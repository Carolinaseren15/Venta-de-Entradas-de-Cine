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
  menu();