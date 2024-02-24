import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import {
	alertaGuardado,
	alertaconfirmarBorado,
	alertaconfirmarBoradoConID,
} from "../../service/alertas";
import { Conexion } from "../../service/Conexion";
import { useAppStore } from "../../stores/app.store";
import { Conyugue } from "../../pages/Conyugue";
import { Asistente } from "../../pages/Asistente";

// import { DevTool } from "@hookform/devtools";

export const Formulario = ({ idregistro, open, setOpen, Tabla }) => {
	const defaultValues = {
		id: "",
		cod_tit_per: "",
		nom_per: "",
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
		asistentes: [],
		segementos: [],
		eventos: [],
		empresas: [],
	};
	const datatable = new Conexion();

	const {
		register: register1,
		setValue: setValue1,
		handleSubmit: handleSubmit1,
		reset: reset1,
		getValues,
		control,
	} = useForm({ defaultValues });

	const toogleLoading = useAppStore((state) => state.toogleLoading);

	// const [opensucursal, setopensucursal] = useState(false);
	// const [idsucursal, setidsucursal] = useState(0);

	//seltetores
	const [TituloPersona, setTituloPersona] = useState([]);
	const [genero, setgenero] = useState([]);
	const [estadocivil, setestadocivil] = useState([]);
	const [sectores, setsectores] = useState([]);
	const [segmentos, setsegmentos] = useState([]);
	const [empresasData, setempresasData] = useState([]);
	const [sucursalesData, setsucursalesData] = useState([]);
	const [sucursalesFiltrado, setsucursalesFiltrado] = useState([]);
	const [departamentoData, setdepartamentoData] = useState([]);
	const [ciudadesData, setciudadesData] = useState([]);
	const [ciudadesDataselecciona, setciudadesDataselecciona] = useState([]);
	const [eventosData, seteventosData] = useState([]);
	// const [idconyugue, setidconyugue] = useState(0);
	const [cambioAsistente, setcambioAsistente] = useState(0);
	const [openconyugue, setopenconyugue] = useState(false);
	const [openAsistente, setopenAsistente] = useState(false);
	const [asistenteActivo, setasistenteActivo] = useState(0);

	const { fields, append, remove } = useFieldArray({
		name: "segementos",
		control: control,
	});

	const {
		fields: fieldseventos,
		append: appendeventos,
		remove: removeeentos,
	} = useFieldArray({
		name: "eventos",
		control: control,
	});

	const {
		fields: fieldsempresa,
		append: appendempresa,
		remove: removeempresa,
	} = useFieldArray({
		name: "empresas",
		control: control,
	});

	const onCloseModal = () => {
		setOpen(false);
	};

	//PARAMETROS
	useEffect(() => {
		console.log({ idregistro });
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
		datatable.gettable("parametros/empresas").then((data) => {
			const empresas = data.filter((empresa) => empresa.cod_pad_emp == 0);
			setempresasData(empresas);
			setsucursalesData(data);
			// const empresasSucursal = data.filter(
			// 	(empresa) => empresa.cod_pad_emp != 0
			// );
			// setsucursalesData(empresasSucursal);
		});
		datatable
			.gettable("parametros/eventos")
			.then((data) => seteventosData(data));

		// console.log(getValues());
	}, []);

	//CARGA INICIAL
	useEffect(() => {
		if (idregistro > 0) {
			toogleLoading(true);
			datatable.getItem(Tabla, idregistro).then(({ data }) => {
				console.log(data);
				reset1(data);
				// console.log(getValues("sucursales").length);
				toogleLoading(false);

				/** funciones para edicion */
				// console.log(data.cod_dep_per);
		
				setciudadesDataselecciona(
					ciudadesData.filter(
						(ciudad) => ciudad.cod_dep_mun == data?.cod_dep_per
					)
				);
			});
		} else {
			reset1(defaultValues);
		}
		// console.log(idregistro);
	}, [idregistro, open, openconyugue, cambioAsistente, openAsistente]);

	//CREAR Y EDITAR
	const onSubmitpost = handleSubmit1((data) => {
		// console.log(data);
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

	const editContygue = () => {
		setopenconyugue(true);
	};
	const editAsistente = (id = 0) => {
		setasistenteActivo(id);
		setopenAsistente(true);
	};

	//ELIMINAR
	const confirmarBorado = () => {
		alertaconfirmarBorado(Swal, deleteRegistro);
	};
	const deleteRegistro = () => {
		console.log("borrando....");
		toogleLoading(true);
		datatable.getEliminarItem(Tabla, idregistro).then(() => {
			setOpen(false);
			toogleLoading(false);
		});
	};

	const crearAsistente = (idregistro) => {
		const dataAsistemte = {
			asis_per: 1,
			coy_per: idregistro,
		};
		console.log(idregistro, dataAsistemte);
		toogleLoading(true);
		datatable.getCrearItem(Tabla, dataAsistemte).then(() => {
			// alertaGuardado(resp.status, Swal, setOpen);
			setcambioAsistente(cambioAsistente + 1);
			toogleLoading(false);
			console.log(cambioAsistente);
		});
	};

	const confirmarBoradoAsistente = (id) => {
		alertaconfirmarBoradoConID(Swal, deleteAsistente, id);
	};

	const deleteAsistente = (id) => {
		toogleLoading(true);
		datatable.getEliminarItem(Tabla, id).then(() => {
			setcambioAsistente(cambioAsistente - 1);
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
						<h2>Formulario personas</h2>
						<div>
							<form
								id='formPersona'
								method='post'
								noValidate='novalidate'>
								<div className='contTwo'>
									<p>
										<label htmlFor='cod_tit_per'>
											Título
										</label>
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
											{idregistro > 0 && (
												<a
													onClick={() =>
														editContygue()
													}
													href='#'
													className='btnExtra'
													id='toggleFC'>
													Información Cónyuge{" "}
												</a>
											)}
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
										{idregistro > 0 && (
											<a
												href='#'
												className='btnExtra'
												id='btn-newasis'
												onClick={() => {
													crearAsistente(idregistro);
												}}>
												Añadir Asistente
											</a>
										)}
										{/* 
										<pre>
											{JSON.stringify(
												getValues("asistentes"),
												null,
												2
											)}
										</pre> */}
									</p>
									<div className='div-asis'>
										{getValues("asistentes").map(
											(item, index) => {
												return (
													<p
														key={index}
														className='model-asis'
														id={`div_sis_${item?.id}`}>
														<label>&nbsp;</label>
														<a
															onClick={() => {
																editAsistente(
																	item?.id
																);
															}}
															href='#'
															className='btnExtra abrir_fan_asis'>
															Información
															Asistente
														</a>
														{item?.nom_per}
														{item?.ape_per}
														<span
															className='remove'
															onClick={() => {
																confirmarBoradoAsistente(
																	item?.id
																);
															}}>
															x
														</span>
													</p>
												);
											}
										)}
									</div>
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
										<li className='hidden'>
											{fields?.length > 0 && (
												<label htmlFor='segm-per'>
													Segmentos
												</label>
											)}
										</li>

										<li></li>

										{fields.map((item, index) => {
											return (
												<li
													key={item.id}
													className='contRemove'>
													<select
														{...register1(
															`segementos.${index}.cod_seg_dse`
														)}
														className='SELECT valid'
														aria-invalid='false'>
														<option value={0}>
															Seleccione..
														</option>
														{segmentos.map(
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
																			item?.nom_seg
																		}
																	</option>
																);
															}
														)}
													</select>
													<span
														className='remove'
														onClick={() => {
															remove(index);
														}}>
														x
													</span>
												</li>
											);
										})}
									</ul>
									<p className='cRight'>
										<a
											onClick={() => {
												append({
													cod_seg_dse: 0,
													cod_per_dse: idregistro,
												});
											}}
											href='#'
											className='btnExtra addField'>
											Añadir segmento a esta persona
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
										<li></li>
										{fieldseventos.map((item, index) => {
											return (
												<li
													className='contRemove'
													key={item.id}>
													<div className='col2'>
														<p>
															<select
																{...register1(
																	`eventos.${index}.cod_eve_devp`
																)}
																className='SELECT valid'
																aria-invalid='false'>
																<option
																	value={0}>
																	Seleccione..
																</option>
																{eventosData.map(
																	(
																		item,
																		index
																	) => {
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
																	{...register1(
																		`eventos.${index}.pro_devp1`
																	)}
																	type='checkbox'
																	onChange={(
																		e
																	) => {
																		setValue1(
																			`eventos.${index}.pro_devp`,
																			Number(
																				e
																					.target
																					.checked
																			)
																		);
																		// console.log(
																		// 	getValues(
																		// 		"eventos"
																		// 	)
																		// );
																	}}
																	name={`eventos.${index}.pro_devp`}
																	defaultChecked={parseInt(
																		item.pro_devp,
																		2
																	)}
																/>
																<input
																	style={{
																		marginLeft:
																			"15px",
																	}}
																	{...register1(
																		`eventos.${index}.pro_devp`
																	)}
																	type='hidden'
																	name={`eventos.${index}.pro_devp`}
																/>
															</label>
														</p>
													</div>
													<span
														className='remove'
														onClick={() => {
															removeeentos(index);
														}}>
														x
													</span>
												</li>
											);
										})}
									</ul>

									<p className='cRight'>
										<a
											onClick={() => {
												appendeventos({
													cod_eve_devp: 0,
													pro_devp: false,
												});
											}}
											href='#'
											className='btnExtra addField'>
											Añadir eventos a esta persona
										</a>
									</p>
									<p>&nbsp;</p>
								

									<ul id='contEmpre' className='hiddenB'>
										<li></li>
										{fieldsempresa.map((item, index) => {
											return (
												<li
													className='contRemove'
													key={item.id}>
													<p>
														<label>Empresa</label>

														<select
															{...register1(
																`empresas.${index}.cod_emp`
															)}
															onChange={(e) => {
																// console.log(e.target.value);
																let data = sucursalesData.filter(
																	(ciudad) =>
																		ciudad.cod_pad_emp ==
																		e.target
																			.value
																);
																// console.log(data);
																setsucursalesFiltrado(
																	data
																);
															}}
															className='SELECT valid'
															aria-invalid='false'>
															<option value={0}>
																Seleccione..
															</option>
															{empresasData.map(
																(
																	item,
																	index
																) => {
																	return (
																		<option
																			key={
																				index
																			}
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
															{...register1(
																`empresas.${index}.cod_suc`
															)}
															disabled=''>
															<option value={0}>
																Seleccione...
															</option>
															{sucursalesFiltrado.map(
																(
																	item,
																	index
																) => {
																	return (
																		<option
																			key={
																				index
																			}
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
														<label>
															<input
																type='checkbox'
																{...register1(
																	`empresas.${index}.pri_dpe1`
																)}
																onChange={(
																	e
																) => {
																	setValue1(
																		`empresas.${index}.pri_dpe`,
																		Number(
																			e
																				.target
																				.checked
																		)
																	);
																}}
																className='checkDireccion'
																name={`empresas.${index}.pri_dpe`}
																defaultChecked={parseInt(
																	item.pri_dpe,
																	2
																)}
															/>
															<input
																style={{
																	marginLeft:
																		"15px",
																}}
																{...register1(
																	`empresas.${index}.pri_dpe`
																)}
																type='hidden'
																name={`empresas.${index}.pri_dpe`}
															/>
															Empresa principal
														</label>
													</p>
													<p>
														<label>
															Departamento o
															sección
														</label>
														<input
															type='text'
															placeholder='|'
															{...register1(
																`empresas.${index}.dep_dep`
															)}
														/>
													</p>
													<p>
														<label>Cargo</label>
														<input
															type='text'
															placeholder='|'
															{...register1(
																`empresas.${index}.car_dpe`
															)}
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
															{...register1(
																`empresas.${index}.mail_dpe`
															)}
														/>
													</p>
													<p>
														<label>
															Teléfono oficina
														</label>
														<input
															type='text'
															placeholder='|'
															{...register1(
																`empresas.${index}.tel_dpe`
															)}
														/>
													</p>
													<p>
														<label>Direccion</label>
														<input
															type='text'
															placeholder='|'
															{...register1(
																`empresas.${index}.dir_dpe`
															)}
														/>
													</p>
													<span
														className='remove'
														onClick={() => {
															removeempresa(
																index
															);
														}}>
														x
													</span>
												</li>
											);
										})}
									</ul>
									<p className='cRight'>
										<a
											onClick={() => {
												appendempresa({
													car_dpe: "",
													cod_emp: 0,
													cod_suc: 0,
													dep_dep: "",
													dir_dpe: "",
													mail_dpe: "",
													pri_dpe: false,
													tel_dpe: "",
												});
												getValues("empresas");
											}}
											href='#'
											className='btnExtra addField'>
											Añadir empresa
										</a>
									</p>

									<p>
										<label htmlFor='obs-per'>
											Observaciones
										</label>
										<textarea
											placeholder='|'
											maxLength={500}
											className='maxLength'
											{...register1("obs_per")}
										/>
										<span className='numCarac'>
											<strong>0</strong> caracteres de
											<strong>500</strong>
										</span>
									</p>
									<p>
										<label htmlFor='hab_per'>
											Habeas data
										</label>
										<textarea
											placeholder='|'
											maxLength={128}
											className='maxLength'
											{...register1("hab_per")}
										/>
									</p>
								</div>

								<div className='contBtns'>
									<input
										type='submit'
										className='btnDark'
										value='Guardar'
										onClick={onSubmitpost}
									/>
									{idregistro > 0 && (
										<>
											<input
												type='button'
												defaultValue='Eliminar contacto'
												className='btnDark  deleteReg'
												onClick={confirmarBorado}
											/>
										</>
									)}
								</div>
							</form>
						</div>

						{/* <DevTool control={control} /> */}
					</div>
				</div>

				<Conyugue
					idregistro={getValues("conyugue")}
					open={openconyugue}
					setOpen={setopenconyugue}
					Tabla={Tabla}
					codigoPadre={idregistro}
				/>
				<Asistente
					idregistro={asistenteActivo}
					open={openAsistente}
					setOpen={setopenAsistente}
					Tabla={Tabla}
					codigoPadre={idregistro}
				/>
			</Modal>
		</>
	);
};
