import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/app.store";
import { Conexion } from "../service/Conexion";

import { Formulario } from "../componentes/personas/Formulario";
import { Buscador } from "../componentes/personas/Buscador";
import { Resultados } from "../componentes/personas/Resultados";

export const Personas = () => {
	const [idregistro, setidregistro] = useState(0);
	const [open, setOpen] = useState(false);
	const Tabla = "personas";   
	const datatable = new Conexion();
	const [dataResultado, setdataResultado] = useState([]);
	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const { register, handleSubmit, reset } = useForm();

	// const [empresasData, setempresasData] = useState([]);
	// const [sectoresData, setsectoresData] = useState([]);
	// const [segmentosData, setsegmentosData] = useState([]);

	//BUSCADOR
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

	const editProduct = (id = 0) => {
		// console.log(id);
		setidregistro(id);
		setOpen(true);
	};

	return (
		<>
			<Formulario
				idregistro={idregistro}
				open={open}
				setOpen={setOpen}
				Tabla={Tabla}
			/>
			<section className='gContent'>
				{/*Titulo seccion*/}
				<div className='gTitle'>
					<h2>Panel de control personas</h2>
					<div className='contBtns'>
						<a
							href='#'
							className='btnDark fancyForm cboxElement'
							onClick={() => editProduct(0)}>
							Crear persona
						</a>
					</div>
				</div>
				{/*Fin Titulo seccion*/}
				{/*Formulario seccion*/}

				<Buscador
					onSubmitBuscador={onSubmitBuscador}
					register={register}
					// ciudadesData={ciudadesData}
					reset={reset}
				/>

				{/*Resultados*/}
				<Resultados
					dataResultado={dataResultado}
					editProduct={editProduct}
				/>
			</section>
		</>
	);
};
