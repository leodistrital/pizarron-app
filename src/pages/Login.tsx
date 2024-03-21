import { useForm } from "react-hook-form";
import { Footer } from "../componentes/global/Footer";
import { useAppStore } from "../stores/app.store";
import { Conexion } from "../service/Conexion";
import Swal from "sweetalert2";
import { liginError } from "../service/alertas";

export const Login = () => {
	const datatable = new Conexion();
	const toogleLoading = useAppStore((state) => state.toogleLoading);
	const login = useAppStore((state) => state.iniciar);
	// const estado = useAppStore((state) => state);

	const {
		register,
		handleSubmit,
		
	} = useForm();

	const onSubmit = handleSubmit((data) => {
		//    console.log(data);
		toogleLoading(true);
		datatable.getlogin("", data).then((resp) => {
			// console.log(resp);
			if (resp == 0) {
				// console.log("no puede seguir");
				liginError(Swal);
			} else {
				// console.log("puede seguir");
				console.log(resp.perfil);
				login(resp.usuario, resp.token, resp.perfil ,  resp.usertoken);
			}
			toogleLoading(false);
		});
		// console.log("enviado");
		// console.log({ data });
		// toogleLoading(true);
		// console.log(estado);
	});
	return (
		<>
			<div className='contLogin'>
				<div className='vAlign'>
					<div className='gForm triB'>
						<h2>Ingreso de usuario</h2>
						<div>
							<form id='formlogin' onSubmit={onSubmit}>
								<p>
									<label htmlFor='usu'>Usuario</label>
									<input
										type='text'
										placeholder='|'
										id='username'
										{...register("username", {
											required: true,
										})}
									/>
								</p>
								<p>
									<label htmlFor='pass'>Contraseña</label>
									<input
										type='password'
										placeholder='|'
										id='password'
										{...register("password", {
											required: true,
										})}
									/>
								</p>

								<p>
									<input
										type='submit'
										defaultValue='Ingresar'
										className='btnGeneral'
									/>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
