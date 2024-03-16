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
										Nombre
									</a>
								</th>
								<th>
									<a href='#' className='orderAsc'>
										Total
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
												{item?.nom_eve}
											</a>
										</td>
										<td>
											{item?.total}
										</td>
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
