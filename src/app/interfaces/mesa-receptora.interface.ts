export interface MesaReceptora {
    id_mesa: number;
    id_distrito: number;
    id_demarcacion: number;
    demarcacion_territorial: string;
    clave_ut: string;
    nombre_ut: string;
    capturada: 0 | 1;
    mre: string;
}