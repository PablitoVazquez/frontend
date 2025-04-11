export interface Excursion{
    id_excursion: number;
    nombre: string;
    descripcion: string;
    destino: string;
    precio_adulto: number;
    precio_nino: number;
    capacidad_maxima: number;
    cupos_disponibles: number;
    fecha_salida: string;
    fecha_regreso: string;
    imagen_url: string;
}