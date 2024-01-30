
export const Sectores = () => {
  return (
    <>
    <section className="gContent">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>Panel de control sector</h2>
    <div className="contBtns">
      <a
        href="crear_sector.php?ini=10000"
        className="btnDark fancyForm cboxElement"
      >
        Crear sector
      </a>
    </div>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Buscar</h2>
    <div>
      <form id="formBusqSector" method="post" >
        <p>
          <label>Seleccione el sector</label>
          <select
            name="sect"
            id="sect"
            className="SELECT valid"
            aria-required="true"
            aria-invalid="false"
          >
            <option value={0} >
              Seleccione..
            </option>{" "}
            <option value={3}>EDUCACION</option>{" "}
            <option value={5}>FAMILIA CORTES</option>{" "}
            <option value={26}>FUNDACION BOLIVAR DAVIVIENDA</option>{" "}
            <option value={27}>GANADORES PREMIO</option>{" "}
            <option value={12}>GRUPO BOLIVAR</option>{" "}
            <option value={21}>INACTIVO</option>{" "}
            <option value={25}>JURADO PREMIO</option>{" "}
            <option value={13}>MEDIOS DE COMUNICACION</option>{" "}
            <option value={24}>OTROS</option>
          </select>
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
            defaultValue="cHJvdG9jb2xvdGlwbz01MnByb3RvY29sbw=="
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
              Sector
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
              href="crear_sector.php?edi=cHJvdG9jb2xvY29uc0VkPTI2cHJvdG9jb2xv"
              className="fancyForm cboxElement"
            >
              FUNDACION BOLIVAR DAVIVIENDA
            </a>
          </td>
          <td>58</td>
        </tr>
      </tbody>
    </table>
  </div>
  {/*Fin Resultados*/}
</section>

    </>
  )
}
