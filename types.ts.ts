export interface Pelicula {
    id: number;
    titulo: string;
    genero: string;
    horario: string;
    sala: number;
    disponibles: number;
  }
  
  export interface Reserva {
    cliente: string;
    peliculaId: number;
    cantidad: number;
  }

  