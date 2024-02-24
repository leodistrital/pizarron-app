import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { alertaGuardado, alertaconfirmarBorado } from "../../service/alertas";
import { Conexion } from "../../service/Conexion";
import { useAppStore } from "../../stores/app.store";
import { Sucursal } from '../../pages/Sucursal';

export const Formulario = ({ idregistro, open, setOpen, Tabla }) => {
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
		cod_pad_emp: "",
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

	const [opensucursal, setopensucursal] = useState(false);
	const [idsucursal, setidsucursal] = useState(0);
	const [ciudadesDataselecciona, setciudadesDataselecciona] = useState([]);

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

		datatable
			.gettable("parametros/departamentos")
			.then((data) => setdepartamentoData(data));
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
	}, [idregistro ,open , opensucursal]);

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

	const editSucursal = (id = 0) => {
		console.log(id, "open sucursal");
		setidsucursal(id);
		// console.log(setopensucursal);
		setopensucursal(true);
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
						<h2>Formulario empresas  </h2>
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
									</p>
								</div>
								<div className='col2'>
									<p>
										<label htmlFor='cod_dep_emp'>
											Departamento
										</label>
										<select
											{...register1("cod_dep_emp")}
											onChange={(e) => {
												// console.log(e.target.value);
												let data = ciudadesData.filter(
													(ciudad) =>
														ciudad.cod_dep_mun ==
														e.target.value
												);
												// console.log(data);
												setciudadesDataselecciona(data);
											}}
											className='SELECT '
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
											{departamentoData.map(
												(item, index) => {
													return (
														<option
															key={index}
															value={item?.id}>
															{item?.nom_dep}
														</option>
													);
												}
											)}
										</select>
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
											{ciudadesDataselecciona.map(
												(item, index) => {
													return (
														<option
															key={index}
															value={item?.id}>
															{item?.nom_mun}
														</option>
													);
												}
											)}
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

								<div className='listSucur'>
									<label>Listado de sucursales:</label>
									{/* <pre>{JSON.stringify(getValues('sucursales').length, null, 2)}</pre> */}
									<ul>
										{
											// if(getValues('sucursales').length > 0){
											getValues("sucursales").map(
												(item, index) => {
													return (
														<li key={index}>
															<a
																onClick={() => editSucursal(item.id)}
																href='#'
																className='openEditSurc'>
																{item.nom_emp}
															</a>
														</li>
													);
												}
											)
										}
										{/* <li>
											<a
												href='#'
												className='openEditSurc'>
												MI sucirsal
											</a>
										</li> */}
									</ul>
								</div>

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
												defaultValue='Eliminar  empresa'
												className='btnDark  deleteReg'
												onClick={confirmarBorado}
											/>
											<a
												onClick={() => editSucursal(0)}
												href='#'
												className='btnDark'
												id='toggleFC'>
												Crear sucursal 
											</a>
										</>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
				<Sucursal idregistro={idsucursal}
				open={opensucursal}
				setOpen={setopensucursal}
				Tabla={Tabla} 		
				codigoPadre={idregistro}
				/>
			</Modal>

			
		
		</>
	);
};

/**
 * idregistro, open, setOpen, Tabla
 * 
 */
