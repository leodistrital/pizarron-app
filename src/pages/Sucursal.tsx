import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { alertaGuardado, alertaconfirmarBorado } from "../service/alertas";
import { Conexion } from "../service/Conexion";
import { useAppStore } from "../stores/app.store";

export const Sucursal = ({ idregistro, open, setOpen, Tabla, codigoPadre }) => {
	const defaultValues = {
		id: "0",
		nom_emp: "",
		dir_emp: "",
		mai_emp: "",
		cod_dep_emp: "",
		cod_ciu_emp: "",
		tel_emp: "",
		web_emp: "",
		cod_sec_emp: "",
		obs_emp: "",
		cod_pad_emp: codigoPadre,
		sucursales: [],
	};
	const datatable = new Conexion();


	const [ciudadesData, setciudadesData] = useState([]);

	const {
		register: register1,
		handleSubmit: handleSubmit1,
		reset: reset1,
		getValues,
	} = useForm({defaultValues});

	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const [departamentoData, setdepartamentoData] = useState([]);

	const [opensucursal, setopensucursal] = useState(false)

	const confirmarBorado = () => {
		alertaconfirmarBorado(Swal, deleteRegistro);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	//PARAMETROS
	useEffect(() => {
		datatable
			.gettable("parametros/ciudades")
			.then((data) => setciudadesData(data));
	}, []);

	//CARGA INICIAL
	useEffect(() => {
		if (idregistro > 0) {
			toogleLoading(true);
			datatable.getItem(Tabla, idregistro).then(({ data }) => {
				// console.log(data);
				reset1(data);
				console.log(getValues("sucursales").length);
				toogleLoading(false);
			});
		} else {
			reset1(defaultValues);
		}
	}, [idregistro , open]);

	//CREAR Y EDITAR
	const onSubmitpost = handleSubmit1((data) => {
		console.log(data);
		// toogleLoading(true);

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
						{/* <pre>{JSON.stringify(idregistro, null, 2)}</pre> */}
						<h2>Formulario sucursal </h2>
						<div>
							<form onSubmit={onSubmitpost}>
								<div className='col2'>
									<p>
										<label htmlFor='nom'>Nombre</label>
										<input
											type='text'
											{...register1("nom_emp", {
												required: true,
											})}
										/>
										<input
											type='hidden'
											{...register1("cod_pad_emp", {
												required: true,
											})}
										/>
									</p>
									<p>
										<label htmlFor='cod_ciu_emp'>
											Ciudad
										</label>
										<select
											{...register1("cod_ciu_emp")}
											className='SELECT'
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
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
						
								<div className='col2'>
									<p>
										<label htmlFor='dir'>Dirección</label>

										<input
											type='text'
											{...register1("dir_emp")}
										/>
									</p>
									<p>
										<label htmlFor='tel'>Teléfono</label>

										<input
											type='text'
											{...register1("tel_emp")}
										/>
									</p>
								</div>
								<div className='col2'>
									<p>
										<label htmlFor='mail'>Email</label>

										<input
											type='text'
											{...register1("mai_emp")}
										/>
									</p>
									<p>
										<label>Sitio web</label>

										<input
											type='text'
											{...register1("web_emp")}
										/>
									</p>
								</div>
								<p>
									<label htmlFor='obs'>Observaciones</label>
									<textarea
										maxLength={128}
										className='maxLength'
										{...register1("obs_emp")}
									/>
									<span className='numCarac'>
										<strong>0</strong> caracteres de{" "}
										<strong>128</strong>
									</span>
								</p>

								<div className='dateModi'>
									<p>
										<strong>Fecha de creación</strong>
										de
									</p>

									<p>
										<strong>Última modificación</strong>
									</p>
								</div>
								<div className='contBtns'>
									<input
										type='button'
										defaultValue='Guardar información'
										className='btnDark'
										value='Guardar'
										onClick={onSubmitpost}
									/>

									{idregistro > 0 && (
										<>
											<input
												type='button'
												defaultValue='Eliminar  sucursal'
												className='btnDark  deleteReg'
												onClick={confirmarBorado}
											/>
										</>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};
