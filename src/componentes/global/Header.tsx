import { NavLink } from "react-router-dom";
import { useAppStore } from "../../stores/app.store";

export const Header = () => {
	const salir = useAppStore((state) => state.logout);
	const mail = useAppStore((state) => state.mail);

	const handleLogOut = () => {
		salir();
	};

	return (
		<header className='pageHeader'>
			<div>
				<h1>PSB - Protocolo</h1>

				<div id='menuSup' className='menuSup'>
					<nav className='mainMenu'>
						<h2>
							Sistema de administración de contactos y eventos
						</h2>
						<ul>
							<li>
								<NavLink
									to={`/`}
									className={({ isActive, isPending }) =>
										isActive
											? "active"
											: isPending
											? "pending"
											: ""
									}>
									Personas
								</NavLink>
							</li>

							<li>
								<NavLink
									to={`/empresas`}
									className={({ isActive, isPending }) =>
										isActive
											? "active"
											: isPending
											? "pending"
											: ""
									}>
									Empresas
								</NavLink>
							</li>

							<li>
								<NavLink
									to={`/eventos`}
									className={({ isActive, isPending }) =>
										isActive
											? "active"
											: isPending
											? "pending"
											: ""
									}>
									Eventos
								</NavLink>
							</li>

							<li>
								<NavLink
									to={`/reportes`}
									className={({ isActive, isPending }) =>
										isActive
											? "active"
											: isPending
											? "pending"
											: ""
									}>
									Reportes
								</NavLink>
							</li>

							<li>
								<a href='#'>Administrar</a>
								<ul>
									{" "}
									<li>
										<NavLink
											to={`/Segmentos`}
											className={({
												isActive,
												isPending,
											}) =>
												isActive
													? "active"
													: isPending
													? "pending"
													: ""
											}>
											Segmentos
										</NavLink>
									</li>
									<li>
										<NavLink
											to={`/sectores`}
											className={({
												isActive,
												isPending,
											}) =>
												isActive
													? "active"
													: isPending
													? "pending"
													: ""
											}>
											sectores
										</NavLink>
									</li>
									<li>
										<NavLink
											to={`/titulos`}
											className={({
												isActive,
												isPending,
											}) =>
												isActive
													? "active"
													: isPending
													? "pending"
													: ""
											}>
											titulos
										</NavLink>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
					{/*Fin Menu principal*/}
					{/*Menu usuario*/}
					<nav className='userMenu'>
						<p>
							<strong>Bienvenido</strong> {mail}
						</p>
						<NavLink to={`/cuenta`} className='btnTwo'>
							MI CUENTA
						</NavLink>

						<NavLink
							to={`/login`}
							className='btnTwo'
							onClick={handleLogOut}>
							CERRAR SESIÓN
						</NavLink>
					</nav>
					{/*Fin Menu usuario*/}
				</div>
			</div>
		</header>
	);
};
