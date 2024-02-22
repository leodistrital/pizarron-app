import { useEffect, useState } from "react";
import { Conexion } from "../../service/Conexion";
export const Buscador = ({
	onSubmitBuscador,
	register,
	reset,
}) => {
	const datatable = new Conexion();
	const [eventos, seteventos] = useState([]);
	const [sectores, setsectores] = useState([]);
	const [segmentosData, setsegmentosData] = useState([]);

	/**Efecto solo para paremetros del formulario */
	useEffect(() => {
		datatable
			.gettable("parametros/eventos")
			.then((data) => seteventos(data));
		datatable
			.gettable("parametros/sector")
			.then((data) => setsectores(data));
		datatable
			.gettable("parametros/segmento")
			.then((data) => setsegmentosData(data));
	}, []);

	return (
		<>
			<div className='gForm triB'>
				<h2>Buscar</h2>
				<div>
					<form onSubmit={onSubmitBuscador}>
						<div className='col3'>
							<ul>
								<li>
									<label htmlFor='even'>Eventos</label>
								</li>
								<li className='contRemove'>
									<select
										{...register("eventos")}
										className='SELECT valid'
										aria-invalid='false'>
										<option value={0}>Seleccione..</option>
										{eventos.map((item, index) => {
											return (
												<option
													key={index}
													value={item?.id}>
													{item?.nom_eve}
												</option>
											);
										})}
									</select>
									<span className='btnMas'>+</span>
								</li>
							</ul>
							<ul>
								<li>
									<label htmlFor='sect'>Sectores</label>
								</li>
								<li className='contRemove'>
									<select
										{...register("eventos")}
										className='SELECT valid'
										aria-invalid='false'>
										<option value={0}>Seleccione..</option>{" "}
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
									<span className='btnMas'>+</span>
								</li>
							</ul>
							<ul>
								<li>
									<label htmlFor='segm'>Segmentos</label>
								</li>
								<li className='contRemove'>
									<select
										{...register("eventos")}
										className='SELECT valid'
										aria-invalid='false'>
										<option value={0}>Seleccione..</option>{" "}
										{segmentosData.map((item, index) => {
											return (
												<option
													key={index}
													value={item?.id}>
													{item?.nom_seg}
												</option>
											);
										})}
									</select>
									<span className='btnMas'>+</span>
								</li>
							</ul>
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
								value='Generar Reporte'
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
