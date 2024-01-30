

export const Eventos = () => {
  return (
    <>
    <section className="gContent">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>Panel de control eventos</h2>
    <div className="contBtns">
      <a
        href="crear_evento.php?ini=10000"
        className="btnDark fancyForm cboxElement"
      >
        Crear evento
      </a>
    </div>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Buscar</h2>
    <div>
      <form id="formBusqEvento" method="post">
        <p>
          <label>Seleccione el evento</label>
          <select
            name="even"
            id="even"
            className="SELECT valid"
            aria-required="true"
            aria-invalid="false"
          >
            <option value={0}>
              Seleccione..
            </option>{" "}
            <option value={5}>BASES</option>{" "}
            <option value={1}>CEREMONIA</option>
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
            defaultValue="cHJvdG9jb2xvdGlwbz0zcHJvdG9jb2xv"
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
              Evento
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
              href="crear_evento.php?edi=cHJvdG9jb2xvY29uc0VkPTVwcm90b2NvbG8="
              className="fancyForm cboxElement"
            >
              BASES
            </a>
          </td>
          <td>10335</td>
        </tr>
      </tbody>
    </table>
  </div>
  {/*Fin Resultados*/}
</section>

    </>
  )
}
