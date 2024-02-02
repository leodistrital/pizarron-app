import { useForm } from "react-hook-form";
import { Conexion } from "../service/Conexion";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/app.store";
// import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
// import Swal from "sweetalert2";
import { Resultados } from "../componentes/empresas/Resultados";
// import { alertaGuardado, alertaconfirmarBorado } from "../service/alertas";
import { Buscador } from '../componentes/empresas/Buscador';
import { Formulario } from '../componentes/empresas/Formulario';

export const Empresas = () => {
	// const defaultValues = {
	// 	id: "0",
	// 	nom_emp: "",
	// 	dir_emp: "",
	// 	mai_emp: "",
	// 	cod_dep_emp: "",
	// 	cod_ciu_emp: "",
	// 	tel_emp: "",
	// 	web_emp: "",
	// 	cod_sec_emp: "",
	// 	obs_emp: "",
	// 	cod_pad_emp: "",
	// };
	const datatable = new Conexion();
	const Tabla = "empresas";

	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const [dataResultado, setdataResultado] = useState([]);
	const [open, setOpen] = useState(false);

	// const {
	// 	register: register1,
	// 	handleSubmit: handleSubmit1,
	// 	reset: reset1,
	// } = useForm({});
	const { register, handleSubmit, reset } = useForm();

	const [idregistro, setidregistro] = useState(0);
	const [ciudadesData, setciudadesData] = useState([]);
	// const [departamentoData, setdepartamentoData] = useState([]);

	// const crearRegistro = () => {
	// 	setidregistro(0);
	// 	reset1({ defaultValues });
	// 	setOpen(true);
	// };

	// const onCloseModal = () => {
	// 	setOpen(false);
	// };

	// const confirmarBorado = () => {
	// 	alertaconfirmarBorado(Swal, deleteRegistro);
	// };

	/**Efecto solo para paremetros del formulario */
	useEffect(() => {
		datatable
			.gettable("parametros/ciudades")
			.then((data) => setciudadesData(data));

		// datatable
		// 	.gettable("parametros/departamentos")
		// 	.then((data) => setdepartamentoData(data));
	}, []);
	/**Efecto solo para paremetros del formulario */

	// /**OPERACIONES */
	// //BUSACRDOR
	// const onSubmitBuscador = handleSubmit((data) => {
	// 	toogleLoading(true);
	// 	const queryString = Object.keys(data)
	// 		.map((key) => {
	// 			return (
	// 				encodeURIComponent(key) +
	// 				"=" +
	// 				encodeURIComponent(data[key].trim())
	// 			);
	// 		})
	// 		.join("&");
	// 	const rutaApi = Tabla + "?" + queryString;
	// 	datatable.gettable(rutaApi).then((res) => {
	// 		setdataResultado(res);
	// 		toogleLoading(false);
	// 	});
	// });

	// //CREAR Y EDITAR
	// const onSubmitpost = handleSubmit1((data) => {
	// 	// console.log(data);
	// 	toogleLoading(true);
	// 	if (idregistro == 0) {
	// 		datatable.getCrearItem(Tabla, data).then(({ resp }) => {
	// 			alertaGuardado(resp.status, Swal, setOpen);
	// 		});
	// 	} else {
	// 		// console.log("eta editando");
	// 		datatable
	// 			.getEditarItem(Tabla, data, idregistro)
	// 			.then(({ resp }) => {
	// 				alertaGuardado(resp.status, Swal, setOpen);
	// 			});
	// 	}
	// 	toogleLoading(false);
	// });

	// //BUSCAR UN ID PARA EDITAR
	// const editProduct = (id = 0) => {
	// 	// console.log(id);
	// 	setidregistro(id);
	// 	if (id > 0) {
	// 		toogleLoading(true);
	// 		datatable.getItem(Tabla, id).then(({ data }) => {
	// 			console.log(data);
	// 			reset1(data);
	// 			setOpen(true);
	// 			toogleLoading(false);
	// 		});
	// 	}
	// };

	// //ELIMINAR
	// const deleteRegistro = () => {
	// 	toogleLoading(true);
	// 	datatable.getEliminarItem(Tabla, idregistro).then((data) => {
	// 		setOpen(false);
	// 		toogleLoading(false);
	// 	});
	// };
	// /**OPERACIONES */

	return (
		<>
			<Formulario />

			<section className='gContent'>
				<div className='gTitle'>
					<h2>Panel de control empresas</h2>
					<div className='contBtns'>
						<a
							onClick={crearRegistro}
							href='#'
							className='btnDark fancyForm cboxElement'>
							Crear empresa
						</a>
					</div>
				</div>
				<Buscador onSubmitBuscador={onSubmitBuscador} register={register}  ciudadesData={ciudadesData}  reset={reset}   />
				{/* <div className='gForm triB'>
					<h2>Buscar</h2>
					<div>
						<form onSubmit={onSubmitBuscador}>
							<p>
								<label>Nombre de la empresa</label>
								<input
									type='text'
									placeholder='|'
									{...register("nombre")}
								/>
							</p>
							<div className='col2'>
								<p>
									<label>Buscar por Ciudad</label>
									<select
										{...register("ciudad")}
										className='SELECT valid'
										aria-invalid='false'>
										<option value={0}>Seleccione..</option>
										{ciudadesData.map((item, index) => {
											return (
												<option
													key={index}
													value={item?.id}>
													{item?.nom_mun}
												</option>
											);
										})}
									</select>
								</p>
							</div>
							<div className='contBtns'>
								<input
									type='button'
									id='resetBusq'
									defaultValue='Anular Búsqueda'
									className='btnDark'
									onClick={() => reset()}
								/>
								<input
									type='submit'
									className='btnDark'
									value='Buscar'
								/>
							</div>
						</form>
					</div>
				</div> */}
				<Resultados
					dataResultado={dataResultado}
					editProduct={editProduct}
				/>
			</section>
		</>
	);
};
