

export const Cuenta = () => {
  return (
    <>
    <section className="gContent cTwo">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>MI CUENTA</h2>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Cambio de contraseña</h2>
    <div>
      <form id="formPerfil" method="post" >
        <p>
          <label>Nueva clave</label>
          <input type="password" placeholder="|" id="nueva1" name="nueva1" />
        </p>
        <p>
          <label>Confirmar nueva clave</label>
          <input type="password" placeholder="|" id="nueva2" name="nueva2" />
        </p>
        <div className="contBtns">
          <input
            type="hidden"
            name="ti"
            id="ti"
            defaultValue="cHJvdG9jb2xvdGlwbz0zcHJvdG9jb2xv"
          />
          <input type="submit" defaultValue="Cambiar" className="btnDark" />
        </div>
      </form>
    </div>
  </div>
  {/*Fin Formulario seccion*/}
</section>

    </>
  )
}
