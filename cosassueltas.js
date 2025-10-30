/* 
Es lo que antes teniamos en reservas , pero en next y trabajamps con node.js + espres en esta materia.
import { Injectable } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { Reserva } from './types';

@Injectable()
export class ReservasService {
  private reservas: Reserva[] = [];

  constructor(private peliculasService: PeliculasService) {}

  reservar(cliente: string, peliculaId: number, cantidad: number): string {
    const pelicula = this.peliculasService.buscarPorId(peliculaId);

    if (!pelicula) {
      return '❌ Película no encontrada.';
    }

    if (pelicula.disponibles >= cantidad) {
      this.peliculasService.actualizarDisponibilidad(peliculaId, cantidad);
      this.reservas.push({ cliente, peliculaId, cantidad });
      return `✅ Reserva confirmada para ${cliente}. Película: ${pelicula.titulo}, Cantidad: ${cantidad}`;
    } else {
      return `⚠️ No hay suficientes entradas disponibles. Quedan ${pelicula.disponibles}`;
    }
  }

  peliculasMasReservadas() {
    const conteo: Record<number, number> = {};

    this.reservas.forEach(r => {
      if (!conteo[r.peliculaId]) conteo[r.peliculaId] = 0;
      conteo[r.peliculaId] += r.cantidad;
    });

    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .map(([peliculaId, total]) => {
        const peli = this.peliculasService.buscarPorId(Number(peliculaId));
        return { titulo: peli?.titulo, totalReservas: total };
      });
  }

  obtenerReservas(): Reserva[] {
    return this.reservas;
  }
}
*/

//En app.controler teniamos esto 
//import { Module } from '@nestjs/common';

/* En "Types.ts teniamos"
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
*/