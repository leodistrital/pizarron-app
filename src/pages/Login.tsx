import { useForm } from "react-hook-form";
import { Footer } from "../componentes/global/footer";
import { useAppStore } from "../stores/app.store";

export const Login = () => {
    const toogleLoading = useAppStore((state) => state.toogleLoading);
    const estado = useAppStore((state) => state);

	const { register, handleSubmit , formState: { errors , isDirty , isValid}
     } = useForm();

	const onSubmit = handleSubmit((data) => {
       console.log(estado);
		// console.log("enviado");
		// console.log({ data });
        toogleLoading(true);
         console.log(estado);
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
										{...register("password" , {
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
