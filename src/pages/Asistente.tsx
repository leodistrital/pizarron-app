import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { alertaGuardado, alertaconfirmarBorado } from "../service/alertas";
import { Conexion } from "../service/Conexion";
import { useAppStore } from "../stores/app.store";

export const Asistente = ({ idregistro, open, setOpen, Tabla, codigoPadre }) => {
	const defaultValues = {
		id: "0",
		nom_per: "",
		ape_per: "",
		mai_per: "",
		tof_per: "",
		obs_per: "",
		reg_per: 0,
		coy_per: codigoPadre,
		asis_per: 1,
		dir_corr_per: "",
	};
	const datatable = new Conexion();

	// const [ciudadesData, setciudadesData] = useState([]);

	const {
		register: register1,
		handleSubmit: handleSubmit1,
		reset: reset1,
		getValues,
	} = useForm({ defaultValues });

	const toogleLoading = useAppStore((state) => state.toogleLoading);
	// const [departamentoData, setdepartamentoData] = useState([]);

	// const [opensucursal, setopensucursal] = useState(false);
	const [regaloData, setregaloData] = useState([]);
	const [listadirecciones, setlistadirecciones] = useState([]);

	const confirmarBorado = () => {
		alertaconfirmarBorado(Swal, deleteRegistro);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	//CARGA INICIAL
	useEffect(() => {
		if (idregistro > 0) {
			toogleLoading(true);
			datatable.getItem(Tabla, idregistro).then(({ data }) => {
				// console.log(data);
				reset1(data);
				toogleLoading(false);
			});
		} else {
			reset1(defaultValues);
		}
	}, [idregistro]);


		//PARAMETROS
	useEffect(() => {
		console.log({ codigoPadre });
		datatable
			.gettable("parametros/parametros/si_no")
			.then((data) => setregaloData(data));
		datatable
			.gettable("asistentesdireccion/"+codigoPadre)
			.then((data) => setlistadirecciones(data));
				
	}, [open]);

	//CREAR Y EDITAR
	const onSubmitpost = handleSubmit1((data) => {
		
		toogleLoading(true);

		if (idregistro == 0) {
			datatable.getCrearItem(Tabla, data).then(({ resp }) => {
				alertaGuardado(resp.status, Swal, setOpen);
				toogleLoading(false);
			});
		} else {
			// console.log("eta editando");
			datatable
				.getEditarItem(Tabla, data, idregistro)
				.then(({ resp }) => {
					// console.log(resp);
					alertaGuardado(resp.status, Swal, setOpen);
					toogleLoading(false);
				});
		}
	});

	//ELIMINAR


	const deleteRegistro = () => {
		toogleLoading(true);
		datatable.getEliminarItem(Tabla, idregistro).then(() => {
			setOpen(false);
			toogleLoading(false);
		});
	};

	return (
		<>
			<Modal
				classNames={{
					modal: "customModalEmpresas",
				}}
				open={open}
				onClose={onCloseModal}
				center
				showCloseIcon={false}>
				<div className='formFancy'>
					<span
						className='btnClose'
						onClick={() => {
							onCloseModal();
						}}>
						Close
					</span>
					<div className='gForm triB'>
						{/* <pre>{JSON.stringify(getValues(), null, 2)}</pre> */}
						<h2>Formulario Asistente </h2>
						<div>
							<form onSubmit={onSubmitpost}>
								<div className='col2'>
									<p>
										<label htmlFor='nom_per'>Nombre</label>
										<input
											type='text'
											{...register1("nom_per", {
												required: true,
											})}
										/>
										<input
											type='hidden'
											{...register1("asis_per", {
												required: true,
											})}
										/>
									</p>
									<p>
										<label htmlFor='ape_per'>
											Apellidos
										</label>

										<input
											type='text'
											{...register1("ape_per")}
										/>
									</p>
									
								</div>

								<div className='col2'>
									<p>
										<label htmlFor='tof_per'>
											Teléfono de contacto
										</label>
										<input
											type='text'
											{...register1("tof_per")}
										/>
									</p>
									<p>
										<label htmlFor='mai_per'>E-mail</label>

										<input
											type='text'
											{...register1("mai_per")}
										/>
									</p>
								</div>


								<div className='col2'>
									<p>
										<label htmlFor='tof_per'>
											Regalo:
										</label>
										<select
											{...register1("reg_per")}
											className='SELECT valid'
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
											{regaloData.map(
												(item, index) => {
													return (
														<option
															key={index}
															value={item?.id}>
															{item?.name}
														</option>
													);
												}
											)}
										</select>
									</p>
									<p>
										<label htmlFor='mai_per'>Direccion:</label>
										<select
											{...register1("dir_corr_per")}
											className='SELECT valid'
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
											{listadirecciones.map(
												(item, index) => {
													return (
														<option
															key={index}
															value={item?.direccion}>
															{item?.lugar}
														</option>
													);
												}
											)}
										</select>

										{/* <input
											type='text'
											{...register1("mai_per")}
										/> */}
									</p>
								</div>

								setlistadirecciones


								<p>
									<label htmlFor='obs_per'>
										Observaciones
									</label>
									<textarea
										maxLength={128}
										className='maxLength'
										{...register1("obs_per")}
									/>
								</p>

								<div className='contBtns'>
									<input
										type='button'
										defaultValue='Guardar información'
										className='btnDark'
										value='Guardar'
										onClick={onSubmitpost}
									/>
									
									
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};
