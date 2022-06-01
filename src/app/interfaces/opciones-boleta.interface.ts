export interface OpcionesBoleta{
    id_opcion: number;
    nombre_candidatx: string;
    entidad: string; 
    estado: number;
    nombre_img: string;
    fecha_alta_opcion?: string;
    fecha_baja_opcion?: string;
    fecha_actualizacion?: string;
    id_usuario_alta?: number;
    id_usuario_baja?: number;
    id_usuario_actualiza?: number;
    
}