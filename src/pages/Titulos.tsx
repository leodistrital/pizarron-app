

export const Titulos = () => {
  return (
    <>
    <section className="gContent">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>Panel de control titulos</h2>
    <div className="contBtns">
      <a
        href="crear_titulos.php?ini=10000"
        className="btnDark fancyForm cboxElement"
      >
        Crear título
      </a>
    </div>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Buscar</h2>
    <div>
      <form id="formBusqTitulo" method="post" >
        <p>
          <label>Seleccione el título</label>
          <select
            name="tit_per"
            id="tit_per"
            aria-required="true"
            aria-invalid="false"
            className="valid"
          >
            <option value={0} >
              Seleccione..
            </option>{" "}
            <option value={3}>DOCTORA</option> <option value={2}>DOCTOR</option>{" "}
            <option value={1}>CORONEL</option>{" "}
            <option value={4}>GENERAL</option>{" "}
            <option value={5}>INGENIERO</option>{" "}
            <option value={6}>MAESTRO</option> <option value={7}>MAYOR</option>{" "}
            <option value={8}>MONSEÑOR</option> <option value={9}>PADRE</option>{" "}
            <option value={10}>SARGENTO</option>{" "}
            <option value={11}>SEÑOR</option>{" "}
            <option value={13}>SEÑOR EMBAJADOR</option>{" "}
            <option value={14}>SEÑORA</option>{" "}
            <option value={15}>SEÑORA EMBAJADORA</option>{" "}
            <option value={16}>SEÑORITA</option>{" "}
            <option value={17}>TITULO</option>
          </select>{" "}
        </p>
        <div className="contBtns">
          <input
            type="button"
            id="resetBusq"
            defaultValue="Anular Búsqueda"
            className="btnDark"
          />
          <input type="submit" defaultValue="Buscar" className="btnDark" />
          <input
            type="hidden"
            name="ti"
            id="ti"
            defaultValue="cHJvdG9jb2xvdGlwbz01M3Byb3RvY29sbw=="
          />
        </div>
      </form>
    </div>
  </div>
  {/*Fin Formulario seccion*/}
  {/*Resultados*/}
  <div id="divResult" className="contResults">
    <table>
      <thead>
        <tr>
          <th>
            <a href="#" className="orderAsc">
              Título
            </a>
          </th>
          <th>
            <a href="#" className="orderDes">
              Total participantes
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a
              href="crear_titulos.php?edi=cHJvdG9jb2xvY29uc0VkPTY0cHJvdG9jb2xv"
              className="fancyForm cboxElement"
            >
              MAYOR
            </a>
          </td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </div>
  {/*Fin Resultados*/}
</section>

    </>
  )
}
