import { useForm } from "react-hook-form";
import { Conexion } from "../service/Conexion";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/app.store";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";

export const Empresas = () => {
	const defaultValues = {
		id: "0",
		nom_emp: "xxxx",
		dir_emp: "",
		mai_emp: "",
		cod_dep_emp: "",
		cod_ciu_emp: "",
		tel_emp: "",
		web_emp: "",
		cod_sec_emp: "",
		obs_emp: "ABC",
		cod_pad_emp: "",
	};
	const [registro, setregistro] = useState(defaultValues);

	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const { register, handleSubmit, reset } = useForm();
	const { register: register1, handleSubmit: handleSubmit1 ,reset:reset1 } = useForm( { });

	const [idregistro, setidregistro] = useState(0);
	
	const [dataResultado, setdataResultado] = useState([]);
	const [ciudadesData, setciudadesData] = useState([]);
	const [departamentoData, setdepartamentoData] = useState([]);

	const Tabla = "empresas";
	const datatable = new Conexion();

	const [open, setOpen] = useState(false);

	// const onOpenModal = () => {
	// 	// setregistro(defaultValues);
	// 	// reset1({defaultValues});
	// 	setOpen(true);
	// };

	const crearRegistro = () => { 
		reset1({defaultValues});
		setOpen(true);
	};

	const onCloseModal = () => {
		console.log('cerrando');
		setregistro(defaultValues);
		setidregistro(0);
		// setregistro(defaultValues);
		setOpen(false);
	};

	const editProduct = (id=0) => {
		console.log(id);
		if (id > 0) {
			toogleLoading(true);
			// console.log(idregistro);
			datatable.getItem(Tabla, id).then(({ data }) => {
				console.log(data);
				// setValue("nom_emp", data.nom_emp);
				reset1(data);
				setidregistro(id);
				setregistro(data);
				// onOpenModal();
				setOpen(true);
				toogleLoading(false);
			});
		}
	};

	// useEffect(() => {
	// 	console.log('algo cambio');
	// 	// setValue("nom_emp", registro.nom_emp);
	// 	// if (idregistro > 0) {
	// 	// 	toogleLoading(true);
	// 	// 	console.log(idregistro);
	// 	// 	datatable.getItem(Tabla, idregistro).then(({ data }) => {
	// 	// 		// console.log(data);
	// 	// 		setidregistro(idregistro);
	// 	// 		setregistro(data);
	// 	// 		onOpenModal();
	// 	// 		toogleLoading(false);
	// 	// 	});
	// 	// }
	// }, [registro]);

	/**Efecto solo para paremetros del formulario */
	useEffect(() => {
		datatable
			.gettable("parametros/ciudades")
			.then((data) => setciudadesData(data));

		datatable
			.gettable("parametros/departamentos")
			.then((data) => setdepartamentoData(data));
	}, []);
	/**Efecto solo para paremetros del formulario */

	const onSubmitBuscador = handleSubmit((data) => {
		// console.log(data);
		toogleLoading(true);
		const queryString = Object.keys(data)
			.map((key) => {
				return (
					encodeURIComponent(key) +
					"=" +
					encodeURIComponent(data[key].trim())
				);
			})
			.join("&");
		const rutaApi = Tabla + "?" + queryString;
		datatable.gettable(rutaApi).then((res) => {
			setdataResultado(res);
			toogleLoading(false);
		});
	});

	const mostaralertaGuardado = ({ status }) => {
		if (status == "Ok")
			Swal.fire({
				title: "Registro exitoso",
				confirmButtonText: "Continuar",
				confirmButtonColor: "#4a2a42",
			}).then((result) => {
				if (result.isConfirmed) {
					setOpen(false);
				}
			});
	};

	const onSubmitpost = handleSubmit1((data) => {
		console.log(data);
		datatable.getCrearItem(Tabla, data).then(({ resp }) => {
			console.log(idregistro);
			console.log(resp);
			mostaralertaGuardado(resp);
			// handleClick();
			// setOpen(false);
		});
		// console.log(data);
		// toogleLoading(true);
		// const queryString = Object.keys(data)
		// 	.map((key) => {
		// 		return (
		// 			encodeURIComponent(key) +
		// 			"=" +
		// 			encodeURIComponent(data[key].trim())
		// 		);
		// 	})
		// 	.join("&");
		// const rutaApi = Tabla + "?" + queryString;
		// datatable.gettable(rutaApi).then((res) => {
		// 	setdataResultado(res);
		// 	toogleLoading(false);
		// });
	});

	// const onInputChange = (e, name) => {
	// 	// console.log(name);
	// 	console.log(e.target, e.target.value, name);
	// 	// const val = (e.target && e.target.value) || "";
	// 	// let _product = { ...formData };
	// 	// _product[`${name}`] = val;

	// };

	return (
		<>
			<Modal
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
							<pre>{JSON.stringify(registro, null, 2)}</pre>
						<h2>Formulario empresas nuevas </h2>
						<div>
							<form onSubmit={onSubmitpost}>
								<div className='col2'>
									<p>
										<label htmlFor='nom'>Nombre</label>
										<input
											type='text'
											// name="nom_emp"
											// id="nom_emp"
											// value={registro.nom_emp}
											{...register1("nom_emp") }
											

										/>
									</p>
								</div>
								<div className='col2'>
									<p>
										<label htmlFor='cod_dep_emp'>
											Departamento {registro.cod_dep_emp}
										</label>
										<select
											{...register1("cod_dep_emp")}
											className='SELECT '
											aria-invalid='false'
											value={registro.cod_dep_emp}>
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
										<label >Sitio web</label>

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
										{...register1("defaultValues.obs_emp")} value={registro.obs_emp}
									/>
									<span className='numCarac'>
										<strong>0</strong> caracteres de{" "}
										<strong>128</strong>
									</span>
								</p>
								{/*?
				if(!empty($codigo_Edicion))
				{
					$dbdatos_surcu= new  Database();
					$sql_sur =" SELECT * FROM  empresas  WHERE  cod_pad_emp= '$codigo_Edicion' and cod_pad_emp!=0 AND reg_eli=0 ";
					$dbdatos_surcu-*/}
								query($sql_sur); $var_inici=0; ?&gt;
								<div className='listSucur'>
									<label>Listado de sucursales:</label>
									<ul>
										{/*? while ($dbdatos_surcu-*/}
										next_row()) {"{"} ?&gt;
										<li>
											<a
												href="crear_sucursal.php?edi=<?=$_REQUEST['edi']?>&edis=<?=encode_this_get('consEdSuc='.$dbdatos_surcu->cod_emp);?>"
												className='openEditSurc'>
												{/*?=$dbdatos_surcu-*/}
												nom_emp?&gt;
											</a>
										</li>
										{/*? } ?*/}
									</ul>
								</div>
								{/*? } ?*/}
								{/*? if($var_inici!='10000') {
					$mes_creacion=formato_fecha($fecha_creacion,'nombre_mes');
					$dia_creacion=formato_fecha($fecha_creacion,'dia');
					$annio_creacion=formato_fecha($fecha_creacion,'ano');

					$mes_edicion=formato_fecha($fecha_edicion,'nombre_mes');
					$dia_edicion=formato_fecha($fecha_edicion,'dia');
					$annio_edicion=formato_fecha($fecha_edicion,'ano');
					?*/}
								<div className='dateModi'>
									{/*? if($annio_creacion*/}0) {"{"} ?&gt;
									<p>
										<strong>Fecha de creación</strong>{" "}
										{/*?=$mes_creacion?*/}{" "}
										{/*?=$dia_creacion?*/} de{" "}
										{/*?=$annio_creacion?*/}
									</p>
									{/*? } ?*/}
									{/*? if($annio_edicion*/}0) {"{"} ?&gt;
									<p>
										<strong>Última modificación</strong>{" "}
										{/*?=$mes_edicion?*/}{" "}
										{/*?=$dia_edicion?*/} de{" "}
										{/*?=$annio_edicion?*/}
									</p>
									{/*? } ?*/}
								</div>
								{/*? } ?*/}
								<div className='contBtns'>
									{/* <input
										type='button'
										defaultValue='Guardar información'
										className='btnDark'
										value='Guardar'
										onClick={onSubmitpost}
									/> */}
									{/*? if($var_inici!='10000') {?*/}
									{/* <input
										type='button'
										defaultValue='Eliminar empresa'
										className='btnDark deleteReg'
									/> */}
									<a
										href="crear_sucursal.php?edi=<?=$_REQUEST['edi']?>&edis=<?=encode_this_get('consEdSuc=000');?>"
										className='btnDark'
										id='toggleFC'>
										Crear sucursal
									</a>
									{/*? } ?*/}
								</div>
								{/* <input
									type='hidden'
									name='edi'
									id='edi'
									defaultValue="<?=$_REQUEST['edi']?>"
								/> */}
							</form>
						</div>
					</div>
				</div>
			
			</Modal>

			<section className='gContent'>
				<pre>{JSON.stringify(idregistro, null, 2)}</pre>
				{/* <pre>{JSON.stringify(registro, null, 2)}</pre> */}
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
				<div className='gForm triB'>
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
				</div>

				{dataResultado.length > 0 ? (
					<div id='divResult' className='contResults'>
						<table>
							<thead>
								<tr>
									<th>
										<a href='#' className='orderAsc'>
											Empresa
										</a>
									</th>
									<th>
										<a href='#' className='orderDes'>
											Dirección
										</a>
									</th>
									<th>
										<a href='#' className='orderDes'>
											Teléfono
										</a>
									</th>
									<th>
										<a href='#' className='orderDes'>
											Sitio web
										</a>
									</th>
								</tr>
							</thead>
							<tbody>
								{dataResultado.map((item, index) => {
									return (
										<tr key={index}>
											<td>
												<a
													onClick={() =>
														editProduct(item?.id)
													}
													href='#'
													className='fancyForm cboxElement'>
													{item?.nom_emp}
												</a>
											</td>
											<td>{item?.dir_emp}</td>
											<td>{item?.tel_emp}</td>
											<td>{item?.web_emp}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					""
				)}
			</section>
		</>
	);
};
