import { useEffect, useState } from "react";
import { Conexion } from "../../service/Conexion";

export const Buscador = ({ onSubmitBuscador, register, reset }) => {
	const datatable = new Conexion();
	const [empresasData, setempresasData] = useState([]);
	const [sectoresData, setsectoresData] = useState([]);
	const [segmentosData, setsegmentosData] = useState([]);

	/**Efecto solo para paremetros del formulario */
	useEffect(() => {
		datatable
			.gettable("parametros/empresas")
			.then((data) => setempresasData(data));
		datatable
			.gettable("parametros/sector")
			.then((data) => setsectoresData(data));
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
						<div className='col2'>
							<p>
								<label>Ingrese el nombre</label>
								<input
									type='text'
									placeholder='|'
									{...register("nombre", {
										
									})}
								/>
							</p>
							<p>
								<label>Ingrese el apellido</label>
								<input
									type='text'
									placeholder='|'
									{...register("apellido")}
								/>
							</p>
						</div>

						<div className='col2'>
							<p>
								<label>Ingrese el correo</label>
								<input
									type='text'
									placeholder='|'
									{...register("correo", {
										
									})}
								/>
							</p>
						</div>
						<div className='col3'>
							<p>
								<label>Buscar por Empresa</label>
								<select
									{...register("empresa")}
									className='SELECT valid'
									aria-invalid='false'>
									<option value={0}>Seleccione..</option>
									{empresasData.map((item, index) => {
										return (
											<option
												key={index}
												value={item?.id}>
												{item?.nom_emp}
											</option>
										);
									})}
								</select>
							</p>
							<p>
								<label>Buscar por Sector</label>
								<select
									{...register("sector")}
									className='SELECT valid'
									aria-invalid='false'>
									<option value={0}>Seleccione..</option>
									{sectoresData.map((item, index) => {
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
							<p>
								<label>Seleccione Segmento</label>
								<select
									{...register("ciudad")}
									className='SELECT valid'
									aria-invalid='false'>
									<option value={0}>Seleccione..</option>
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
							</p>
						</div>
						<div className='contBtns'>
							<input
								type='button'
								defaultValue='Anular Búsqueda'
								className='btnDark'
								onClick={() => reset()}
							/>
							<input
								type='submit'
								defaultValue='Buscar'
								className='btnDark'
							/>
							<input
								type='hidden'
								name='ti'
								id='ti'
								defaultValue='cHJvdG9jb2xvdGlwbz0ycHJvdG9jb2xv'
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
