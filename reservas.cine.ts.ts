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
