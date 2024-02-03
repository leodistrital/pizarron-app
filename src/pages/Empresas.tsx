import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/app.store";
import { Conexion } from "../service/Conexion";
import { Formulario } from "../componentes/empresas/Formulario";
import { Buscador } from "../componentes/empresas/Buscador";
import { Resultados } from "../componentes/empresas/Resultados";

export const Empresas = () => {
	const datatable = new Conexion();
	const Tabla = "empresas";
	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const [dataResultado, setdataResultado] = useState([]);
	const [open, setOpen] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [idregistro, setidregistro] = useState(0);
	const [ciudadesData, setciudadesData] = useState([]);

	const editProduct = (id = 0) => {
		// console.log(id);
		setidregistro(id);
		setOpen(true);
	};

	/**Efecto solo para paremetros del formulario */
	useEffect(() => {
		datatable
			.gettable("parametros/ciudades")
			.then((data) => setciudadesData(data));
	}, []);

	//BUSCADOR
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
					<h2>Panel de control empresas</h2>
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
					ciudadesData={ciudadesData}
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
