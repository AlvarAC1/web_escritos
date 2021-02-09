export class EscritoModelo{
	
	constructor(

		public _id: string,
		public titulo: String,
		public texto: String,
		public tipo: String,
		public imagen: String,
		public audio: String,
		//public fechaCreacion: Date = new Date(),
		public fechaCreacion: Date,
		public usuario: String

	){}

}