import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/app.store";
import { Conexion } from "../service/Conexion";
import { Formulario } from "../componentes/segmentos/Formulario";
import { Buscador } from "../componentes/segmentos/Buscador";
import { Resultados } from "../componentes/segmentos/Resultados";

export const Segmentos = () => {
	const datatable = new Conexion();
	const Tabla = "segmento";
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
			.gettable("parametros/segmento")
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
					<h2>Panel de control segmentos</h2>
					<div className='contBtns'>
						<a
							onClick={() => editProduct(0)}
							href='#'
							className='btnDark fancyForm cboxElement'>
							Crear segmento
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
