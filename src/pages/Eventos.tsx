import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/app.store";
import { Conexion } from "../service/Conexion";
import { Formulario } from "../componentes/eventos/Formulario";
import { Buscador } from "../componentes/eventos/Buscador";
import { Resultados } from "../componentes/eventos/Resultados";

export const Eventos = () => {
	const datatable = new Conexion();
	const Tabla = "eventos";
	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const [dataResultado, setdataResultado] = useState([]);
	const [open, setOpen] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [idregistro, setidregistro] = useState(0);
	const [eventosData, seteventosData] = useState([]);

	const editProduct = (id = 0) => {
		// console.log(id);
		setidregistro(id);
		setOpen(true);
	};

	/**Efecto solo para paremetros del formulario */
	useEffect(() => {
		datatable
			.gettable("parametros/eventos")
			.then((data) => seteventosData(data));
	}, []);

	//BUSCADOR
	const onSubmitBuscador = handleSubmit((data) => {
		toogleLoading(true);
    console.log(data);
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

	return (
		<>
			<Formulario
				idregistro={idregistro}
				open={open}
				setOpen={setOpen}
				Tabla={Tabla}
			/>
			<section className='gContent'>
				<div className='gTitle'>
					<h2>Panel de control eventos</h2>
					<div className='contBtns'>
						<a
							onClick={() => editProduct(0)}
							href='#'
							className='btnDark fancyForm cboxElement'>
							Crear empresa
						</a>
					</div>
				</div>
				<Buscador
					onSubmitBuscador={onSubmitBuscador}
					register={register}
					eventosData={eventosData}
					reset={reset}
				/>
				<Resultados
					dataResultado={dataResultado}
					editProduct={editProduct}
				/>
			</section>
		</>
	);
};
