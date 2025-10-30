// --- 1. Importar las librerías ---

// Importa la librería Express, que es el framework para crear el servidor web.
const express = require('express');
// Importa 'cors', un middleware (una función) para permitir que tu API sea llamada desde páginas web en otros dominios.
const cors = require('cors');
// Importa 'fs' (File System), el módulo de Node.js para interactuar con los archivos del sistema (leer, escribir).
const fs = require('fs');
// Importa 'path', un módulo de Node.js para construir rutas de archivos (ej. 'data/peliculas.json') de forma segura.
const path = require('path');

// --- 2. Inicializar el servidor ---

// Crea una instancia de una aplicación Express. 'app' será nuestro servidor.
const app = express();
// Define el número de puerto (ej. 3000) donde el servidor "escuchará" peticiones.
const port = 3000;

// --- 3. Middlewares ---
// Middlewares son funciones que se ejecutan en CADA petición ANTES de que llegue a nuestras rutas (GET, POST, etc.)

// Le dice a 'app' que use 'cors'. Esto añade cabeceras HTTP a la respuesta para permitir peticiones cross-origin.
app.use(cors());
// Le dice a 'app' que entienda peticiones que vienen en formato JSON. Esencial para los POST.
// Convierte el texto JSON de la petición en un objeto JavaScript (req.body).
app.use(express.json());

// --- 4. Definir Rutas a los Archivos de Datos ---

// Crea una ruta a la carpeta 'data'. `__dirname` es una variable de Node que te da la ruta de la carpeta actual (donde está server.js).
const dataDir = path.join(__dirname, 'data');
// Crea la ruta completa al archivo 'data/peliculas.json'.
const pathPeliculas = path.join(dataDir, 'peliculas.json');
// Crea la ruta completa al archivo 'data/reservas.json'.
const pathReservas = path.join(dataDir, 'reservas.json');

// --- 5. Funciones Auxiliares para Leer/Escribir (La lógica de tus "Servicios") ---
// Estas funciones nos ayudan a no repetir código.

// Define una función llamada 'leerDatos' que acepta un parámetro 'ruta' (la ruta al archivo).
function leerDatos(ruta) {
  try { // 'try' intenta ejecutar este bloque de código. Si falla (ej. el archivo no existe), salta al 'catch'.
    // Lee el archivo de la 'ruta' de forma SINCRÓNICA (fs.readFileSync). El programa se frena hasta que termina de leer.
    // 'utf-8' es la codificación de texto. El resultado ('datosRaw') es un string (texto plano).
    const datosRaw = fs.readFileSync(ruta, 'utf-8');
    // Convierte el texto (string) que leímos del archivo a un objeto o array de JavaScript.
    return JSON.parse(datosRaw);
  } catch (error) { // 'catch' se ejecuta si el 'try' falla. 'error' tiene la info del problema.
    // Muestra un error en la consola del servidor (no en el navegador del cliente).
    console.error(`Error al leer el archivo ${ruta}:`, error);
    // Devuelve un array vacío para que el programa no se rompa y pueda seguir.
    return [];
  }
}

// Define una función llamada 'escribirDatos' que acepta 'ruta' (dónde guardar) y 'datos' (qué guardar).
function escribirDatos(ruta, datos) {
  try { // Intenta ejecutar la escritura.
    // Convierte el array/objeto 'datos' (de JavaScript) a un string en formato JSON.
    // 'null, 2' hace que el JSON se escriba de forma "bonita" e indentada con 2 espacios en el archivo.
    const datosString = JSON.stringify(datos, null, 2);
    // Escribe el 'datosString' en el archivo de la 'ruta' de forma SINCRÓNICA (fs.writeFileSync).
    fs.writeFileSync(ruta, datosString, 'utf-8');
  } catch (error) { // Se ejecuta si la escritura falla (ej. no hay permisos).
    // Muestra un error en la consola del servidor.
    console.error(`Error al escribir el archivo ${ruta}:`, error);
  }
}

// --- 6. Cargar Datos en Memoria al Iniciar ---
// Leemos los archivos UNA SOLA VEZ cuando el servidor arranca.
// Los guardamos en variables 'let' porque su contenido (ej. 'disponibles') va a cambiar.

// Llama a la función 'leerDatos' y guarda el array de películas en la variable 'peliculas'.
let peliculas = leerDatos(pathPeliculas);
// Llama a 'leerDatos' y guarda el array de reservas en la variable 'reservas'.
let reservas = leerDatos(pathReservas);

// --- 7. Definir las Rutas (La lógica de tu "Controlador") ---
// Aquí es donde le decimos al servidor qué hacer cuando alguien visita una URL.



// Define una ruta para peticiones GET a la URL '/peliculas' (ej. http://localhost:3000/peliculas)
app.get('/peliculas', (req, res) => {
  // 'req' (request) tiene la info de la petición del cliente.
  // 'res' (response) es lo que usamos para responderle al cliente.

  // Responde con un código de estado 200 (OK).
  // .json(peliculas) convierte el array 'peliculas' (de JavaScript) a JSON y se lo envía al cliente.
  res.status(200).json(peliculas);
});

// Define una ruta para peticiones POST a la URL '/reservar' (ej. http://localhost:3000/reservar)
app.post('/reservar', (req, res) => {
  // Sacamos 'cliente', 'peliculaId' y 'cantidad' del 'body' de la petición POST.
  // Esto es posible gracias a `app.use(express.json())`. 'req.body' es el JSON que mandó el cliente.
  const { cliente, peliculaId, cantidad } = req.body;

  // Validación: chequea si alguno de los datos falta (es 'undefined' o 'null') o si la cantidad es 0 o menor.
  if (!cliente || !peliculaId || !cantidad || cantidad <= 0) {
    // 'return' es importante para que no siga ejecutando el código de abajo si hay un error.
    // Responde con código 400 (Bad Request - Petición incorrecta).
    return res
      .status(400)
      .json({ mensaje: 'Datos de reserva inválidos.' }); // Envía un mensaje de error en JSON.
  }

  // Busca en el array 'peliculas' (que está en memoria) la película cuyo 'id' coincida con el 'peliculaId' de la petición.
  const pelicula = peliculas.find((p) => p.id === peliculaId);

  // Si 'pelicula' es 'undefined' (porque .find() no encontró nada)...
  if (!pelicula) {
    // Responde con 404 (Not Found - No encontrado).
    return res.status(404).json({ mensaje: '❌ Película no encontrada.' });
  }

  // Comprueba si hay suficientes entradas disponibles para la cantidad solicitada.
  if (pelicula.disponibles >= cantidad) {
    // --- Si hay entradas, procesamos la reserva ---

    // 1. Modificamos los datos EN MEMORIA RAM
    pelicula.disponibles -= cantidad; // Resta la cantidad reservada a las disponibles de esa película.
    reservas.push({ cliente, peliculaId, cantidad }); // Añade la nueva reserva al array 'reservas' en memoria.

    // 2. Guardamos los cambios EN LOS ARCHIVOS (Persistencia)
    escribirDatos(pathPeliculas, peliculas); // Llama a la función para guardar el array 'peliculas' actualizado en 'peliculas.json'.
    escribirDatos(pathReservas, reservas); // Llama a la función para guardar el array 'reservas' actualizado en 'reservas.json'.

    // 3. Respondemos al cliente
    // Responde con 201 (Created - Se creó un recurso nuevo, en este caso, una reserva).
    res.status(201).json({
      mensaje: `✅ Reserva confirmada para ${cliente}. Película: ${pelicula.titulo}, Cantidad: ${cantidad}`,
    });
  } else {
    // --- Si NO hay entradas suficientes ---
    // Si el 'if' de arriba (pelicula.disponibles >= cantidad) da falso, se ejecuta este 'else'.
    // Responde con 400 (Bad Request), porque la petición es válida pero no se puede cumplir.
    res.status(400).json({
      mensaje: `⚠️ No hay suficientes entradas disponibles. Quedan ${pelicula.disponibles}`,
    });
  }
});

// Define una ruta para peticiones GET a la URL '/peliculas/mas-reservadas'
app.get('/peliculas/mas-reservadas', (req, res) => {
  // Crea un objeto vacío para usarlo como un "diccionario" o "mapa" para contar.
  // Guardará { peliculaId: totalReservas, ... } ej: { '1': 2, '2': 3 }
  const conteo = {};

  // Itera sobre cada reserva ('r') en el array 'reservas'.
  reservas.forEach((r) => {
    // Si la película (r.peliculaId) no existe como clave en el objeto 'conteo'...
    if (!conteo[r.peliculaId]) {
      conteo[r.peliculaId] = 0; // ...la inicializa en 0.
    }
    // Suma la 'cantidad' de la reserva al total acumulado para esa película.
    conteo[r.peliculaId] += r.cantidad;
  });

  // Ahora 'conteo' podría verse así: { '1': 2, '5': 4, '2': 10 }

  // Object.entries(conteo) convierte el objeto en un array de arrays: [ ['1', 2], ['5', 4], ['2', 10] ]
  const ordenadas = Object.entries(conteo)
    // .sort() ordena el array. (a, b) son dos elementos a comparar, ej. ['1', 2] y ['5', 4].
    // b[1] - a[1] ordena de mayor a menor (descendente) usando el segundo elemento (el total de reservas).
    .sort((a, b) => b[1] - a[1])
    // .map() transforma cada elemento del array ya ordenado.
    // [peliculaId, total] es "desestructurar" el array (ej. ['2', 10]).
    .map(([peliculaId, total]) => {
      // Busca la película en el array 'peliculas' para obtener el título.
      // parseInt() convierte el 'peliculaId' (que era un string por ser clave de objeto) a un número.
      const peli = peliculas.find((p) => p.id === parseInt(peliculaId));
      // Devuelve un nuevo objeto con el formato que queremos enviar al cliente.
      return {
        // Si (por alguna razón) no encuentra la peli (p.ej. se borró), pone un texto por defecto.
        titulo: peli ? peli.titulo : 'Película desconocida',
        totalReservas: total, // El total que calculamos.
      };
    });

  // Responde con 200 (OK) y envía el array 'ordenadas' (ya con los títulos) en formato JSON.
  res.status(200).json(ordenadas);
});

// --- 8. Iniciar el servidor ---

// Le dice a la 'app' de Express que empiece a "escuchar" peticiones HTTP en el 'port' que definimos (3000).
app.listen(port, () => {
  // Esta función (callback) se ejecuta UNA VEZ cuando el servidor arranca exitosamente.
  // Muestra un mensaje en la consola donde corriste 'node server.js'.
  console.log(`Servidor de Cine (Express + FS) corriendo en http://localhost:${port}`);
  // Confirma que los datos se intentaron cargar (no significa que se hayan cargado bien, para eso están los 'console.error').
  console.log('Datos cargados desde /data/');
});