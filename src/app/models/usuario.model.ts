
export class Usuario {
    constructor(
        public id_usuario: number,
        public id_distrito: number,
        public nombre_usuario: string,
        public usuario: string,
        public estado: number,
        public perfil: 0 | 1 | 2,
        private contrasena?: string
        ) { }
    }
    /* 
    "id_usuario": 1,
    "id_distrito": 1,
    "nombre_usuario": "Distrito 1",
    "usuario": "dist1",
    "contrasena": "123456",
    "estado": 1,
    "perfil": 1, 
    */