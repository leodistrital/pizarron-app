import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { alertaGuardado, alertaconfirmarBorado } from "../../service/alertas";
import { Conexion } from "../../service/Conexion";
import { useAppStore } from "../../stores/app.store";
import { Sucursal } from "../../pages/Sucursal";

export const Formulario = ({ idregistro, open, setOpen, Tabla }) => {
	const defaultValues = {
		id: "",
		cod_tit_per: "",
		nom_per: "RANCHESCA SUSANA",
		ape_per: "",
		cod_gen_per: "",
		pro_per: "",
		cod_civ_per: "",
		mai_per: "",
		coy_per: "0",
		cod_emp_per: null,
		dsc_per: null,
		car_per: null,
		tof_per: "",
		obs_per: "",
		twt_per: "",
		cel_per: "",
		cod_dep_per: "",
		cod_cui_per: "",
		dir_per: "",
		sec_per: "",
		temp_per: "",
		codigo_temporal: "",
		dir_corr_per: "",
		tipo_dir_per: "",
		cod_dir_per: "",
		cod_suc_per: "0",
		asis_per: "0",
		est_coy_per: "0",
		reg_per: "0",
		hab_per: "",
		sin_dirc_per: "0",
		wha_per: "",
		nom_emp: "",
		nom_sec: "",
		nom_mun: null,
	};
	const datatable = new Conexion();

	const {
		register: register1,
		handleSubmit: handleSubmit1,
		reset: reset1,
		getValues,
	} = useForm({ defaultValues });

	const toogleLoading = useAppStore((state) => state.toogleLoading);

	const [opensucursal, setopensucursal] = useState(false);
	const [idsucursal, setidsucursal] = useState(0);

	//seltetores
	const [TituloPersona, setTituloPersona] = useState([]);
	const [genero, setgenero] = useState([]);
	const [estadocivil, setestadocivil] = useState([]);
	const [sectores, setsectores] = useState([]);
	const [segmentos, setsegmentos] = useState([]);
	const [empresasData, setempresasData] = useState([]);
	const [departamentoData, setdepartamentoData] = useState([]);
	const [ciudadesData, setciudadesData] = useState([]);
	const [eventosData, seteventosData] = useState([]);

	const confirmarBorado = () => {
		alertaconfirmarBorado(Swal, deleteRegistro);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	//PARAMETROS
	useEffect(() => {
		datatable
			.gettable("parametros/parametros/titulo_persona")
			.then((data) => setTituloPersona(data));
		datatable
			.gettable("parametros/parametros/genero")
			.then((data) => setgenero(data));
		datatable
			.gettable("parametros/parametros/estadocivil")
			.then((data) => setestadocivil(data));
		datatable
			.gettable("parametros/ciudades")
			.then((data) => setciudadesData(data));

		datatable
			.gettable("parametros/departamentos")
			.then((data) => setdepartamentoData(data));
		datatable
			.gettable("parametros/sector")
			.then((data) => setsectores(data));
		datatable
			.gettable("parametros/segmento")
			.then((data) => setsegmentos(data));
		datatable
			.gettable("parametros/empresas")
			.then((data) => setempresasData(data));
		datatable
			.gettable("parametros/eventos")
			.then((data) => seteventosData(data));
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
	}, [idregistro, open, opensucursal]);

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
						<h2>Formulario personas</h2>
						<div>
							<form
								id='formPersona'
								method='post'
								noValidate='novalidate'>
								<input
									type='hidden'
									name='ultimo_id'
									id='ultimo_id'
									defaultValue={71681}
								/>
								<div className='contTwo'>
									<p>
										<label htmlFor='tit-per'>Título</label>
										<select
											{...register1("cod_tit_per")}
											className='SELECT valid'
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
											{TituloPersona.map(
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
										<label htmlFor='nom-per'>Nombres</label>
										<input
											type='text'
											{...register1("nom_per", {
												required: true,
											})}
										/>
									</p>
									<p>
										<label htmlFor='ape-per'>
											Apellidos
										</label>
										<input
											type='text'
											{...register1("ape_per")}
										/>
									</p>
									<p>
										<label htmlFor='cod_gen_per'>
											Género
										</label>
										<select
											{...register1("cod_gen_per")}
											className='SELECT valid'
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
											{genero.map((item, index) => {
												return (
													<option
														key={index}
														value={item?.id}>
														{item?.name}
													</option>
												);
											})}
										</select>
									</p>
									<p>
										<label htmlFor='pro_per'>
											Profesión
										</label>
										<input
											type='text'
											{...register1("pro_per")}
										/>
									</p>
									<div className='col2'>
										<p>
											<label htmlFor='cod_civ_per'>
												Estado civil
											</label>
											<select
												{...register1("cod_civ_per")}
												className='SELECT valid'
												aria-invalid='false'>
												<option value={0}>
													Seleccione..
												</option>
												{estadocivil.map(
													(item, index) => {
														return (
															<option
																key={index}
																value={
																	item?.id
																}>
																{item?.name}
															</option>
														);
													}
												)}
											</select>
										</p>
										<p>
											<label>&nbsp;</label>
											<a
												href='crear_conyuge.php?codigo_maestro=71681'
												className='btnExtra'
												id='toggleFC'>
												Información Cónyuge
											</a>
										</p>
									</div>
									<p>
										<label htmlFor='mai_per'>
											Correo electrónico
										</label>
										<input
											type='text'
											{...register1("mai_per")}
										/>
									</p>
									<p>
										<label htmlFor='twt_per'>Twitter</label>
										<input
											type='text'
											{...register1("twt_per")}
										/>
									</p>
									<p>
										<label htmlFor='cel_per'>Celular</label>
										<input
											type='text'
											{...register1("cel_per")}
										/>
									</p>
									<p>
										<label htmlFor='wha_per'>
											Whatsapp
										</label>
										<input
											type='text'
											{...register1("wha_per")}
										/>
									</p>
									<p>
										<label htmlFor='cod_dep_per'>
											Departamento
										</label>
										<select
											{...register1("cod_dep_per")}
											className='SELECT valid'
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
										<label htmlFor='cod_cui_per'>
											Ciudad de residencia
										</label>
										<select
											{...register1("cod_cui_per")}
											className='SELECT valid'
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
									<p>
										<label htmlFor='dir_per'>
											Dirección de residencia
										</label>
										<input
											type='text'
											{...register1("dir_per")}
										/>
									</p>
									<p>
										<label htmlFor='dir_corr_per'>
											Dirección de correspondencia
										</label>
										<input
											type='text'
											{...register1("dir_corr_per")}
										/>
									</p>
									<p>
										<label htmlFor='tof_per'>
											Teléfono fijo
										</label>
										<input
											type='text'
											{...register1("tof_per")}
										/>
									</p>
									<p className='cRight Btn-crea-asistente '>
										<a
											href='#'
											className='btnExtra'
											id='btn-newasis'>
											Añadir Asistente
										</a>
									</p>
									<div className='div-asis'></div>
									<p>
										<label htmlFor='sect-per'>Sector</label>
										<select
											{...register1("sec_per")}
											className='SELECT valid'
											aria-invalid='false'>
											<option value={0}>
												Seleccione..
											</option>
											{sectores.map((item, index) => {
												return (
													<option
														key={index}
														value={item?.id}>
														{item?.nom_sec}
													</option>
												);
											})}
										</select>
									</p>
									<ul id='contSegm' className='hiddenB'>
										<li>
											<label htmlFor='segm-per'>
												Segmentos
											</label>
										</li>
										<li className='contRemove'>
											<select
												{...register1("segmento")}
												className='SELECT valid'
												aria-invalid='false'>
												<option value={0}>
													Seleccione..
												</option>
												{segmentos.map(
													(item, index) => {
														return (
															<option
																key={index}
																value={
																	item?.id
																}>
																{item?.nom_seg}
															</option>
														);
													}
												)}
											</select>
											<span className='btnMas'>+</span>
										</li>
									</ul>
									<p className='cRight'>
										<a
											href='#contSegm'
											className='btnExtra addField'>
											Añadir segmento adicional a esta
											persona
										</a>
									</p>
								</div>
								
								<div className='contTwo'>
									<ul id='contEvent' className='hiddenB'>
										<li>
											<label htmlFor='event-per'>
												Añadir eventos
											</label>
										</li>
										<li
											className='contRemove'
											style={{ display: "none" }}>
											<div className='col2'>
												<p>
													<select
														{...register1(
															"segmento"
														)}
														className='SELECT valid'
														aria-invalid='false'>
														<option value={0}>
															Seleccione..
														</option>
														{eventosData.map(
															(item, index) => {
																return (
																	<option
																		key={
																			index
																		}
																		value={
																			item?.id
																		}>
																		{
																			item?.nom_eve
																		}
																	</option>
																);
															}
														)}
													</select>
												</p>
												<p>
													<label className='gCheck'>
														Aplica protocolo
														<input
															type='checkbox'
															id='prot-per'
															name='prot-per'
														/>
													</label>
												</p>
											</div>
											<span className='btnMas'>+</span>
										</li>
									</ul>
									<input
										type='hidden'
										id='total_eventos'
										name='total_eventos'
									/>
									<button
										type='button'
										onclick='temporal()'
										style={{ display: "none" }}>
										Click Me!
									</button>
									<p className='cRight'>
										<a
											href='#contEvent'
											className='btnExtra addField'>
											Añadir eventos adicionales a esta
											persona
										</a>
									</p>
									<p>&nbsp;</p>
									<ul id='contEmpre' className='hiddenB'>
										<li className='contRemove'>
											<p>
												<label>Empresa</label>
												<select
													{...register1("sector")}
													className='SELECT valid'
													aria-invalid='false'>
													<option value={0}>
														Seleccione..
													</option>
													{empresasData.map(
														(item, index) => {
															return (
																<option
																	key={index}
																	value={
																		item?.id
																	}>
																	{
																		item?.nom_emp
																	}
																</option>
															);
														}
													)}
												</select>
											</p>
											<p>
												<label>Sucursal</label>
												<select
													id='sucur'
													name='sucur'
													disabled=''>
													<option>
														Seleccione...
													</option>
												</select>
											</p>
											<p>
												<label>
													<input
														type='checkbox'
														id='prin-emp'
														name='prin-emp'
														className='checkDireccion'
													/>{" "}
													Empresa principal
												</label>
											</p>
											<p>
												<label>
													Departamento o sección
												</label>
												<input
													type='text'
													placeholder='|'
													id='dep-emp'
													name='dep-emp'
												/>
											</p>
											<p>
												<label>Cargo</label>
												<input
													type='text'
													placeholder='|'
													id='car-emp'
													name='car-emp'
												/>
											</p>
											<p>
												<label>
													Correo electrónico
													corporativo
												</label>
												<input
													type='text'
													placeholder='|'
													id='mail-emp'
													name='mail-emp'
												/>
											</p>
											<p>
												<label>Teléfono oficina</label>
												<input
													type='text'
													placeholder='|'
													id='tel-emp'
													name='tel-emp'
												/>
											</p>
											<p>
												<label>Direccion</label>
												<input
													type='text'
													placeholder='|'
													id='dir-emp'
													name='dir-emp'
												/>
											</p>
											<span className='btnMas'>+</span>
										</li>
									</ul>
									<p className='cRight'>
										<a
											href='#contEmpre'
											className='btnExtra addField'>
											Añadir empresa
										</a>
									</p>
									<p>&nbsp;</p>
									<input
										id='arreglo_empesa_caja'
										name='arreglo_empesa_caja'
										type='hidden'
									/>
									{/*<button type="button" onClick="verificar_empre()" >Click Me!</button>*/}
									<p>
										<label htmlFor='obs-per'>
											Observaciones
										</label>
										<textarea
											placeholder='|'
											maxLength={500}
											className='maxLength'
											id='obs-per'
											name='obs-per'
											defaultValue={""}
										/>
										<span className='numCarac'>
											<strong>0</strong> caracteres de{" "}
											<strong>500</strong>
										</span>
									</p>
									<p>
										<label htmlFor='obs-hebeas'>
											Habeas data
										</label>
										<textarea
											placeholder='|'
											maxLength={128}
											className='maxLength'
											id='obs-hebeas'
											name='obs-hebeas'
											defaultValue={""}
										/>
									</p>
								</div>
								<input
									id='arreglo_segmento_caja'
									name='arreglo_segmento_caja'
									type='hidden'
								/>
								<div className='contBtns'>
									<input
										type='submit'
										defaultValue='Guardar información'
										className='btnDark'
									/>
								</div>
							</form>
						</div>
					</div>

					{/* <div className='gForm triB'>
						
						<h2>Formulario personas </h2>
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
					</div> */}
				</div>
				{/* <Sucursal
					idregistro={idsucursal}
					open={opensucursal}
					setOpen={setopensucursal}
					Tabla={Tabla}
					codigoPadre={idregistro}
				/> */}
			</Modal>
		</>
	);
};

/**
 * idregistro, open, setOpen, Tabla
 *
 */
