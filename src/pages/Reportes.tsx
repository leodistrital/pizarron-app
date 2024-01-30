
export const Reportes = () => {
  return (
    <>
    <section className="gContent">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>Panel de reportes</h2>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Generar reporte</h2>
    <div>
      <form
        id="formBusqReporte"
        name="formBusqReporte"
        method="get"
       
      >
        <div className="col3">
          <ul>
            <li>
              <label htmlFor="even">Eventos</label>
            </li>
            <li className="contRemove">
              <select
                name="even"
                id="even"
                className="SELECT valid"
                aria-invalid="false"
              >
                <option value={0} >
                  Seleccione..
                </option>{" "}
                <option value={5}>BASES</option>{" "}
                <option value={1}>CEREMONIA</option>
              </select>
              <span className="btnMas">+</span>
            </li>
            <li className="contRemove">
              <select
                name="even-2"
                id="even-2"
                className="SELECT valid"
                aria-invalid="false"
              >
                <option value={0} >
                  Seleccione..
                </option>{" "}
                <option value={5}>BASES</option>{" "}
                <option value={1}>CEREMONIA</option>
              </select>
              <span className="remove">x</span>
            </li>
            <li className="contRemove">
              <select
                name="even-3"
                id="even-3"
                className="SELECT valid"
                aria-invalid="false"
              >
                <option value={0} >
                  Seleccione..
                </option>{" "}
                <option value={5}>BASES</option>{" "}
                <option value={1}>CEREMONIA</option>
              </select>
              <span className="remove">x</span>
            </li>
          </ul>
          <ul>
            <li>
              <label htmlFor="sect">Sectores</label>
            </li>
            <li className="contRemove">
              <select
                name="sect"
                id="sect"
                className="SELECT valid"
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
              <span className="btnMas">+</span>
            </li>
            <li className="contRemove">
              <select
                name="sect-2"
                id="sect-2"
                className="SELECT valid"
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
              <span className="remove">x</span>
            </li>
            <li className="contRemove">
              <select
                name="sect-3"
                id="sect-3"
                className="SELECT valid"
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
              <span className="remove">x</span>
            </li>
            <li className="contRemove">
              <select
                name="sect-4"
                id="sect-4"
                className="SELECT valid"
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
              <span className="remove">x</span>
            </li>
          </ul>
          <ul>
            <li>
              <label htmlFor="segm">Segmentos</label>
            </li>
            <li className="contRemove">
              <select
                name="segm"
                id="segm"
                className="SELECT valid"
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
    
              </select>
              <span className="btnMas">+</span>
            </li>
            <li className="contRemove">
              <select
                name="segm-2"
                id="segm-2"
                className="SELECT valid"
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
     
              </select>
              <span className="remove">x</span>
            </li>
            <li className="contRemove">
              <select
                name="segm-3"
                id="segm-3"
                className="SELECT valid"
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
   
              </select>
              <span className="remove">x</span>
            </li>
          </ul>
        </div>
        <div className="contBtns">
          <input
            id="genExcelS"
            type="button"
            defaultValue="Stickers"
            className="btnDark"
          />
          <input
            id="genExcel"
            type="button"
            defaultValue="Informe General"
            className="btnDark"
          />
          <input
            id="genExcelSec"
            type="button"
            defaultValue="Informe Asistentes"
            className="btnDark"
          />
          {/*input type="submit" value="Previsualizar" class="btnDark"*/}
          <input
            type="hidden"
            name="ti"
            id="ti"
            defaultValue="cHJvdG9jb2xvdGlwbz00cHJvdG9jb2xv"
          />
          <input type="hidden" name="prev" id="prev" defaultValue={0} />
        </div>
      </form>
    </div>
  </div>
  {/*Fin Formulario seccion*/}
  {/*Resultados*/}
  <div id="divResult" className="contResults" />
  {/*Fin Resultados*/}
</section>

    </>
  )
}
