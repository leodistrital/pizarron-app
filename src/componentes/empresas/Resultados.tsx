export const Resultados = ({ dataResultado, editProduct }) => {
	return (
		<>
			{dataResultado.length > 0 && (
				<div id='divResult' className='contResults'>
					<table>
						<thead>
							<tr>
								<th>
									<a href='#' className='orderAsc'>
										Empresa
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Dirección
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Teléfono
									</a>
								</th>
								<th>
									<a href='#' className='orderDes'>
										Sitio web
									</a>
								</th>
							</tr>
						</thead>
						<tbody>
							{dataResultado.map((item, index) => {
								return (
									<tr key={index}>
										<td>
											<a
												onClick={() =>
													editProduct(item?.id)
												}
												href='#'
												className='fancyForm cboxElement'>
												{item?.nom_emp}
											</a>
										</td>
										<td>{item?.dir_emp}</td>
										<td>{item?.tel_emp}</td>
										<td>{item?.web_emp}</td>
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
