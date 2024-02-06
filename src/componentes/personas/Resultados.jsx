export const Resultados = ({ dataResultado, editProduct }) => {
	return (
		<>
			{dataResultado.length > 0 && (
				<div id='divResult' className='contResults'>
					<table>
						<thead>
							<tr>
								<th>
									<a href='#' className='orderDes'>
										Sector
									</a>
								</th>
								<th>
									<a href='#' className='orderAsc'>
										Nombres
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Apellidos
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Ciudad
									</a>
								</th>
								<th className='fijo'>
									<a href='#' className='orderDes'>
										Empresa
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Teléfono
									</a>
								</th>
								<th className='fijo'>
									<a href='#' className='orderDes'>
										Email
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Celular
									</a>
								</th>
							</tr>
						</thead>
						<tbody>
							{dataResultado.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item?.nom_sec}</td>
										<td>
											<a
												onClick={() =>
													editProduct(item?.id)
												}
												href='#'
												className='fancyForm cboxElement'>
												{item?.nom_per}
											</a>
										</td>
										<td>{item?.ape_per}</td>
										<td>{item?.nom_mun}</td>
										<td>{item?.nom_emp}</td>
										<td>{item?.tof_per}</td>
										<td>{item?.mai_per}</td>
										<td>{item?.cel_per}</td>
									</tr>
								);
							})}

						</tbody>
					</table>
				</div>
			)}
		</>
	);
};
