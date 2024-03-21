import axios from "axios";
import { useAppStore } from "../stores/app.store";
// import { Header } from '../componentes/global/Header';

const URL = "http://localhost" + "/api/";
const URLlogin = "http://localhost" + "/login";

// const URL = "https://api.pizarron.info" + "/api/";
// const URLlogin = "https://api.pizarron.info" + "/login";



export class Conexion {
	header = {};
	session = useAppStore((state) => state);

	constructor() {
		const { xtoken } = this.session;
		this.header = {
			Authorization: xtoken,
		};
	}

	updateHeader() {
			// console.log(this.session.token);
		// const { xtoken } = this.session;
		this.header = {
			Authorization: this.session.token,
			userapp: this.session.mail,
			usertoken: this.session.usertoken,
		};
		// console.log(xtoken);

	}

	gettable(tabla) {
		this.updateHeader() ;
	
		return axios
			.get(URL + tabla, {
				headers: this.header,
			})
			.then((res) => {
				// console.log(res, "leo");
				return res.data;
			})
			.catch(function (err) {
				console.log({ err });
				return 0;
			});
	}

	getItem(tabla, id) {
		this.updateHeader() ;
		return axios
			.get(URL + tabla + "/" + id, {
				headers: this.header,
			})
			.then((res) => res.data);
	}

	getCrearItem(tabla, data) {
		this.updateHeader() ;
		// console.log(tabla, data, 'envia crear')
		return axios
			.post(URL + tabla + "", { ...data }, { headers: this.header })
			.then((res) => res.data);
	}

	getEditarItem(tabla, data, id) {
		this.updateHeader() ;
		// console.log(data)
		return axios
			.put(URL + tabla + "/" + id, { ...data }, { headers: this.header })
			.then((res) => res.data);
	}
	getEliminarItem(tabla, id) {
		this.updateHeader() ;
		return axios
			.delete(URL + tabla + "/" + id, { headers: this.header })
			.then((res) => res.data);
	}

	getlogin(tabla, data) {
		// console.log(tabla, data, 'envia crear')
		return axios
			.post(URLlogin + "", { ...data })
			.then((res) => {
				// res.data
				// console.log(res.data)
				return res.data;
			})
			.catch(function () {
				return 0;
			});
	}
}
