import { useEffect, useState } from "react";


import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { alertaGuardado ,  alertaconfirmarBorado } from '../../service/alertas';

export const Formulario = () => {

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
	};

    	const [open, setOpen] = useState(false);
const {
		register: register1,
		handleSubmit: handleSubmit1,
		reset: reset1,
	} = useForm({});

    const [departamentoData, setdepartamentoData] = useState([]);



	const crearRegistro = () => {
		setidregistro(0);
		reset1({ defaultValues });
		setOpen(true);
	};

    const confirmarBorado = () => {
		alertaconfirmarBorado(Swal, deleteRegistro);
	};

    const onCloseModal = () => {
		setOpen(false);
	};

    useEffect(() => {
		datatable
			.gettable("parametros/ciudades")
			.then((data) => setciudadesData(data));

		datatable
			.gettable("parametros/departamentos")
			.then((data) => setdepartamentoData(data));
	}, []);


    	/**OPERACIONES */
	//BUSACRDOR
	const onSubmitBuscador = handleSubmit((data) => {
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

	//CREAR Y EDITAR
	const onSubmitpost = handleSubmit1((data) => {
		// console.log(data);
		toogleLoading(true);
		if (idregistro == 0) {
			datatable.getCrearItem(Tabla, data).then(({ resp }) => {
				alertaGuardado(resp.status, Swal, setOpen);
			});
		} else {
			// console.log("eta editando");
			datatable
				.getEditarItem(Tabla, data, idregistro)
				.then(({ resp }) => {
					alertaGuardado(resp.status, Swal, setOpen);
				});
		}
		toogleLoading(false);
	});

	//BUSCAR UN ID PARA EDITAR
	const editProduct = (id = 0) => {
		// console.log(id);
		setidregistro(id);
		if (id > 0) {
			toogleLoading(true);
			datatable.getItem(Tabla, id).then(({ data }) => {
				console.log(data);
				reset1(data);
				setOpen(true);
				toogleLoading(false);
			});
		}
	};

	//ELIMINAR
	const deleteRegistro = () => {
		toogleLoading(true);
		datatable.getEliminarItem(Tabla, idregistro).then((data) => {
			setOpen(false);
			toogleLoading(false);
		});
	};
	/**OPERACIONES */


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
						<h2>Formulario empresas nuevas </h2>
						<div>
							<form onSubmit={onSubmitpost}>
								<div className='col2'>
									<p>
										<label htmlFor='nom'>Nombre</label>
										<input
											type='text'
											{...register1("nom_emp")}
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

								<div className='listSucur'>
									<label>Listado de sucursales:</label>
									<ul>
										<li>
											<a
												href='#'
												className='openEditSurc'>
												MI sucirsal
											</a>
										</li>
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
										<input
											type='button'
											defaultValue='Eliminar  empresa'
											className='btnDark  deleteReg'
											onClick={confirmarBorado}
										/>
									)}

									<a
										href='#'
										className='btnDark'
										id='toggleFC'>
										Crear sucursal
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal>
    </>
  )
}
