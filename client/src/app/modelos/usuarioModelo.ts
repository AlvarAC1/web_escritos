export class UsuarioModelo{
	
	constructor(

		public _id: string,
		public nombre: String,
		public apellidos: String,
		public email: String,
		public password: String,
		public rol: String,
		public imagen: String

	){}

}


/* Esta forma mas clasica es sinonima a la que hemos escrito y no necesitamos ni getters ni setters,
   de esta forma nos ahorramos mucho codigo siendo exactamente igual en funcionalidad

export class UsuarioModelo{

		public _id: string;
		public nombre: String;
		.
		.
		.

	constructor(){
		this._id = _id;
		this.nombre = String;
		.
		.
		.
	}

	getters y setters
	.
	.
	.
	
}
*/