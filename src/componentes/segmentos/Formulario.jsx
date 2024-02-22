import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { alertaGuardado, alertaconfirmarBorado } from "../../service/alertas";
import { Conexion } from "../../service/Conexion";
import { useAppStore } from "../../stores/app.store";

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

	// const [ciudadesData, setciudadesData] = useState([]);

	const {
		register: register1,
		handleSubmit: handleSubmit1,
		reset: reset1,
		getValues,
		setValue: setValue1,
	} = useForm({ defaultValues });

	const toogleLoading = useAppStore((state) => state.toogleLoading);

	const confirmarBorado = () => {
		alertaconfirmarBorado(Swal, deleteRegistro);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	//PARAMETROS
	useEffect(() => {
		// datatable
		// 	.gettable("parametros/ciudades")
		// 	.then((data) => setciudadesData(data));
		// datatable
		// 	.gettable("parametros/departamentos")
		// 	.then((data) => setdepartamentoData(data));
	}, []);

	//CARGA INICIAL
	useEffect(() => {
		if (idregistro > 0) {
			toogleLoading(true);
			datatable.getItem(Tabla, idregistro).then(({ data }) => {
				// console.log(data);
				reset1(data);
				// console.log(getValues("sucursales").length);
				toogleLoading(false);
			});
		} else {
			reset1(defaultValues);
		}
	}, [idregistro, open]);

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
						<h2>Formulario segmentos </h2>
						<div>
							<form onSubmit={onSubmitpost}>
								<div className='col2'>
									<p>
										<label htmlFor='nom'>Nombre</label>
										<input
											type='text'
											{...register1("nom_seg", {
												required: true,
											})}
										/>
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
												defaultValue='Eliminar  segmento'
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
