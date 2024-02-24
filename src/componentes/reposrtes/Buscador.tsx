import { useEffect, useState } from "react";
import { Conexion } from "../../service/Conexion";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppStore } from "../../stores/app.store";

import { DevTool } from "@hookform/devtools";

export const Buscador = () => {
	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const [descargaexcel, setdescargaexcel] = useState(null);

	const defaultValues = {
		eventos: [],
		sectores: [],
		segmentos: [],
	};

	const {
		register: register1,
		handleSubmit: handleSubmit1,
		reset: reset1,
		control,
	} = useForm({ defaultValues });

	const datatable = new Conexion();

	const [eventosData, seteventos] = useState([]);
	const [sectoresData, setsectores] = useState([]);
	const [segmentosData, setsegmentosData] = useState([]);

	const {
		fields: eventosfields,
		append: appendeventos,
		remove: removeeventos,
	} = useFieldArray({
		name: "eventos",
		control: control,
	});
	const {
		fields: sectoresfields,
		append: appendsectores,
		remove: removesectores,
	} = useFieldArray({
		name: "sectores",
		control: control,
	});
	const {
		fields: segmentosfields,
		append: appendsegementos,
		remove: removesegementos,
	} = useFieldArray({
		name: "segmentos",
		control: control,
	});

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

	//BUSCADOR
	const onSubmitBuscador = handleSubmit1((data) => {
		// console.log(data);
		toogleLoading(true);
		datatable.getCrearItem("reportes", data).then(({ resp }) => {
			// console.log(resp);
			setdescargaexcel(resp.data);
			toogleLoading(false);
			// console.log(descargaexcel?.length);
		});
	});

	const exportExcel = () => {
		// console.log(descargaexcel);
		// console.log(typeof dataSet);
		import("xlsx").then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(descargaexcel);

			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ["data"],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: "xlsx",
				type: "array",
			});
			saveAsExcelFile(excelBuffer, "informe-protocolo");
		});
	};

	const saveAsExcelFile = (buffer, fileName) => {
		let formatoPersonalizado = "";
		import("file-saver").then((module) => {
			if (module && module.default) {
				const EXCEL_TYPE =
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
				const EXCEL_EXTENSION = ".xlsx";
				const data = new Blob([buffer], {
					type: EXCEL_TYPE,
				});

				const fecha = new Date();
				formatoPersonalizado = `${fecha.getDate()}/${
					fecha.getMonth() + 1
				}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;

				module.default.saveAs(
					data,
					fileName +
						"-" +
						formatoPersonalizado +
						EXCEL_EXTENSION
				);
			}
		});
	};

	return (
		<>
			<div className='gForm triB'>
				<h2>Buscar</h2>
				<DevTool control={control} />
				<div>
					<form onSubmit={onSubmitBuscador}>
						<div className='col3'>
							<ul>
								<li className='contRemove'>
									<span
										className='btnMas'
										onClick={() => {
											appendeventos({
												cod_eve: 0,
											});
										}}>
										+
									</span>
								</li>

								<li>
									<label htmlFor='even'>Eventos</label>
								</li>

								{eventosfields.map((item, index) => {
									return (
										<li
											key={item.id}
											className='contRemove'>
											<select
												{...register1(
													`eventos.${index}.cod_eve`
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
																key={index}
																value={
																	item?.id
																}>
																{item?.nom_eve}
															</option>
														);
													}
												)}
											</select>
											<span
												className='remove'
												onClick={() => {
													removeeventos(index);
												}}>
												x
											</span>
										</li>
									);
								})}
							</ul>

							<ul>
								<li className='contRemove'>
									<span
										className='btnMas'
										onClick={() => {
											appendsectores({
												cod_sec: 0,
											});
										}}>
										+
									</span>
								</li>
								<li>
									<label htmlFor='sect'>Sectores</label>
								</li>

								{sectoresfields.map((item, index) => {
									return (
										<li
											key={item.id}
											className='contRemove'>
											<select
												{...register1(
													`sectores.${index}.cod_sec`
												)}
												className='SELECT valid'
												aria-invalid='false'>
												<option value={0}>
													Seleccione..
												</option>
												{sectoresData.map(
													(item, index) => {
														return (
															<option
																key={index}
																value={
																	item?.id
																}>
																{item?.nom_sec}
															</option>
														);
													}
												)}
											</select>
											<span
												className='remove'
												onClick={() => {
													removesectores(index);
												}}>
												x
											</span>
										</li>
									);
								})}
							</ul>
							<ul>
								<li className='contRemove'>
									<span
										className='btnMas'
										onClick={() => {
											appendsegementos({
												cod_seg: 0,
											});
										}}>
										+
									</span>
								</li>
								<li>
									<label htmlFor='segm'>Segmentos</label>
								</li>
								{segmentosfields.map((item, index) => {
									return (
										<li
											key={item.id}
											className='contRemove'>
											<select
												{...register1(
													`segmentos.${index}.cod_seg`
												)}
												className='SELECT valid'
												aria-invalid='false'>
												<option value={0}>
													Seleccione..
												</option>
												{segmentosData.map(
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
											<span
												className='remove'
												onClick={() => {
													removesegementos(index);
												}}>
												x
											</span>
										</li>
									);
								})}
							</ul>
						</div>

						<div className='contBtns'>
							<input
								type='button'
								id='resetBusq'
								defaultValue='Anular Búsqueda'
								className='btnDark'
								onClick={() => reset1()}
							/>
							<input
								type='submit'
								className='btnDark'
								value='Generar Reporte'
								onClick={onSubmitBuscador}
							/>

							<input
								type='submit'
								className='btnDark'
								value='Descargar'
								onClick={exportExcel}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
