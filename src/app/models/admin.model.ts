
export class Administrador {
    constructor(
        public id_admin: number,
        public usuario: string,
        public estado: number,
        public perfil: 1 | 2,
        private contrasena?: string
        ) { }
    }