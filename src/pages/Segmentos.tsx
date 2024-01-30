

export const Segmentos = () => {
  return (
    <>
    <section className="gContent">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>Panel de control segmentos</h2>
    <div className="contBtns">
      <a
        href="crear_segmento.php?ini=10000"
        className="btnDark fancyForm cboxElement"
      >
        Crear segmento
      </a>
    </div>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Buscar</h2>
    <div>
      <form id="formBusqSegmento" method="post" >
        <p>
          <label>Seleccione el segmento</label>
          <select
            name="segm"
            id="segm"
            className="SELECT valid"
            aria-required="true"
            aria-invalid="false"
          >
            <option value={0} >
              Seleccione..
            </option>{" "}
            <option value={26}>BECAS Y ESTIMULOS PNPSB</option>{" "}
            <option value={4}>CARICATURISTA</option>{" "}
            <option value={3}>COLUMNISTA</option>{" "}
            <option value={1}>DECANO DE COMUNICACIÓN</option>{" "}
            <option value={9}>DIRECTOR DE MEDIO</option>{" "}
            <option value={11}>EDITOR DE MEDIO</option>{" "}
            <option value={20}>GANADOR 2013</option>{" "}
            <option value={19}>GANADOR 2014</option>{" "}
            <option value={18}>GANADOR 2015</option>{" "}
            <option value={30}>GANADOR 2016</option>{" "}
            <option value={32}>GANADOR 2017</option>{" "}
            <option value={37}>GANADOR 2018</option>{" "}
            <option value={38}>GANADOR 2019</option>{" "}
            <option value={39}>GANADOR 2020</option>{" "}
            <option value={40}>GANADOR 2021</option>{" "}
            <option value={45}>GANADOR 2022</option>{" "}
            <option value={46}>GANADOR 2023</option>{" "}
            <option value={29}>GANADORES 1975-2012</option>{" "}
            <option value={10}>GERENTE DE MEDIO</option>{" "}
            <option value={41}>INACTIVO BANCOS</option>{" "}
            <option value={43}>INACTIVO EMPRESARIAL</option>{" "}
            <option value={42}>INACTIVO SEGUROS</option>{" "}
            <option value={44}>JUNTAS GRUPO BOLÍVAR</option>{" "}
            <option value={27}>JURADO PREMIO</option>{" "}
            <option value={17}>LIBRO PERIODÍSTICO</option>{" "}
            <option value={5}>PERIODISTA CULTURAL</option>{" "}
            <option value={25}>PERIODISTA DEL AÑO</option>{" "}
            <option value={6}>PERIODISTA SOCIALES</option>{" "}
            <option value={31}>REGALO ESPECIAL</option>{" "}
            <option value={28}>REPORTERO GRAFICO</option>{" "}
            <option value={24}>VIDA Y OBRA</option>
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
            defaultValue="cHJvdG9jb2xvdGlwbz01MXByb3RvY29sbw=="
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
              Segmento
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
              href="crear_segmento.php?edi=cHJvdG9jb2xvY29uc0VkPTFwcm90b2NvbG8="
              className="fancyForm cboxElement"
            >
              DECANO DE COMUNICACIÓN
            </a>
          </td>
          <td>76</td>
        </tr>
      </tbody>
    </table>
  </div>
  {/*Fin Resultados*/}
</section>

    </>
  )
}
