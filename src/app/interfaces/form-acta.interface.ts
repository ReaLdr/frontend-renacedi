

export interface Acta {
    // mre:                              Mre;
    id_mesa:                          number;
    id_distrito:                      number;
    fecha_instalacion_mre:            string;
    hora_instalacion_mre:             string;
    fecha_apertura_mre:               string;
    hora_apertura_mre:                string;
    incidente:                        string;
    total_boletas_extraidas:          number;
    con_opinion:                      number;
    sin_opinion:                      number;
    grupo_etario_6a9_mujeres:         number;
    grupo_etario_6a9_hombres:         number;
    grupo_etario_6a9_no_idenfitica:   number;
    grupo_etario_6a9_no_decirlo:      number;
    grupo_etario_10a13_mujeres:       number;
    grupo_etario_10a13_hombres:       number;
    grupo_etario_10a13_no_idenfitica: number;
    grupo_etario_10a13_no_decirlo:    number;
    grupo_etario_14a17_mujeres:       number;
    grupo_etario_14a17_hombres:       number;
    grupo_etario_14a17_no_idenfitica: number;
    grupo_etario_14a17_no_decirlo:    number;
    hora_cierre_mre:                  string;
    hora_clausura_mre:                string;
}

export interface Mre {
    id_demarcacion:          number;
    demarcacion_territorial: string;
    clave_ut:                string;
    nombre_ut:               string;
    mre:                     string;
}
