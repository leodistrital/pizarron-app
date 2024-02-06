

export const Buscador = ({onSubmitBuscador ,register ,ciudadesData , reset}) => {
  return (
    <><div className='gForm triB'>
					<h2>Buscar</h2>
					<div>
						<form onSubmit={onSubmitBuscador}>
							<p>
								<label>Nombre de la empresa</label>
								<input
									type='text'
									placeholder='|'
									{...register("nombre" , {
												required: true,
											} )}
								/>
							</p>
							<div className='col2'>
								<p>
									<label>Buscar por Ciudad</label>
									<select
										{...register("ciudad")}
										className='SELECT valid'
										aria-invalid='false'>
										<option value={0}>Seleccione..</option>
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
				</div></>
  )
}
