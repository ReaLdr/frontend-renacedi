
export interface BoletaDistrital {
    tipo_boleta: string;
    folio:      string;
    // mesa:        string;
    genero:     number;
    edad:       number;
    seleccion:  string;
    otro:       string;
    archivo: File;
    // id_mesa: number;
    // id_distrito: number;
    id_demarcacion: number;
    nombre_demarcacion: string;
    clave_ut: string;
    nombre_ut: string;
    // seccion: number;
    mesa: string;
    observacion?: string;
}