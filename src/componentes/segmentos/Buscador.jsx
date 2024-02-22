export const Buscador = ({
	onSubmitBuscador,
	register,
	eventosData,
	reset,
}) => {
	return (
		<>
			<div className='gForm triB'>
				<h2>Buscar</h2>
				<div>
					<form onSubmit={onSubmitBuscador}>
						<p>
							<label>Seleccione el segmento</label>
							<select className='SELECT' {...register("id")}>
								<option value={0} selected='selected'>
									Seleccione..
								</option>
								{eventosData.map((item, index) => {
									return (
										<option key={index} value={item?.id}>
											{item?.nom_seg}
										</option>
									);
								})}
							</select>
						</p>

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
								value='Buscar'
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
