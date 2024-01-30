

export const Personas = () => {
  return (
    <section className="gContent">
  {/*Titulo seccion*/}
  <div className="gTitle">
    <h2>Panel de control personas</h2>
    <div className="contBtns">
      <a
        href="crear_persona.php?ini=10000"
        className="btnDark fancyForm cboxElement"
      >
        Crear persona
      </a>
    </div>
  </div>
  {/*Fin Titulo seccion*/}
  {/*Formulario seccion*/}
  <div className="gForm triB">
    <h2>Buscar</h2>
    <div>
      <form id="formBusqPersona" method="post" >
        <div className="col2">
          <p>
            <label>Ingrese el nombre</label>
            <input
              type="text"
              placeholder="|"
              id="nom"
              name="nom"
              aria-invalid="false"
              className="valid"
            />
          </p>
          <p>
            <label>Ingrese el apellido</label>
            <input type="text" placeholder="|" id="nom2" name="nom2" />
          </p>
        </div>
        <div className="col2">
          <p>
            <label>Ingrese el correo</label>
            <input type="text" placeholder="|" id="mail" name="mail" />
          </p>
        </div>
        <div className="col3">
          <p>
            <label>Buscar por Empresa</label>
            <select name="empresas" id="empresas" className="SELECT">
              <option value={0} >
                Seleccione..
              </option> 
              <option value={1472}>24 HORAS RADIO</option> 
              <option value={1}>90 MINUTOS</option> 
              <option value={4}>ABDON ESPINOSA VALDERRAMA S.A.</option> 
              <option value={5}>ACADEMIA COLOMBIANA DE HISTORIA</option> 
              <option value={6}>ACADEMIA COLOMBIANA DE LA LENGUA</option> 
              <option value={7}>ACADEMIA DE HISTORIA DE CUNDINAMARCA</option> 
              <option value={1311}>ACE BANCA SEGUROS</option> 
              <option value={9}>ACEMI</option> 
              <option value={10}>
                ACNUR- OFICINA DEL ALTO COMISIONADO DE LAS NACIONES UNIDAS PARA
                LOS REFUGIADOS
              </option> 

            </select>
          </p>
          <p>
            <label>Buscar por Sector</label>
            <select name="sector" id="sector" className="SELECT">
              <option value={0} >
                Seleccione..
              </option> 
              <option value={3}>EDUCACION</option> 
              <option value={5}>FAMILIA CORTES</option> 
              <option value={26}>FUNDACION BOLIVAR DAVIVIENDA</option> 
              <option value={27}>GANADORES PREMIO</option> 
              <option value={12}>GRUPO BOLIVAR</option> 
              <option value={21}>INACTIVO</option> 
              <option value={25}>JURADO PREMIO</option> 
              <option value={13}>MEDIOS DE COMUNICACION</option> 
              <option value={24}>OTROS</option>
            </select>
          </p>
          <p>
            <label>Seleccione Segmento</label>
            <select name="segmento" id="segmento" className="SELECT">
              <option value={0} >
                Seleccione..
              </option> 
              <option value={26}>BECAS Y ESTIMULOS PNPSB</option> 
              <option value={4}>CARICATURISTA</option> 
              <option value={3}>COLUMNISTA</option> 
              <option value={1}>DECANO DE COMUNICACIÓN</option> 
              <option value={9}>DIRECTOR DE MEDIO</option> 
             
            </select>
          </p>
        </div>
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
            defaultValue="cHJvdG9jb2xvdGlwbz0ycHJvdG9jb2xv"
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
            <a href="#" className="orderDes">
              Sector
            </a>
          </th>
          <th>
            <a href="#" className="orderAsc">
              Nombres
            </a>
          </th>
          <th>
            <a href="#" className="orderDes">
              Apellidos
            </a>
          </th>
          <th>
            <a href="#" className="orderDes">
              Ciudad
            </a>
          </th>
          <th className="fijo">
            <a href="#" className="orderDes">
              Empresa
            </a>
          </th>
          <th>
            <a href="#" className="orderDes">
              Teléfono
            </a>
          </th>
          <th className="fijo">
            <a href="#" className="orderDes">
              Email
            </a>
          </th>
          <th>
            <a href="#" className="orderDes">
              Celular
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            MEDIOS DE COMUNICACION <input type="hidden" defaultValue={322} />
          </td>
          {/*<td> </td>*/}
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTMyMnByb3RvY29sbw==&&leo=322"
              className="fancyForm cboxElement"
            >
              ALFREDO LEONARDO
            </a>
          </td>
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTMyMnByb3RvY29sbw=="
              className="fancyForm cboxElement"
            >
              VALDOVINO BARRIOS
            </a>
          </td>
          <td>SOLEDAD</td>
          <td />
          <td>(5) 3726270</td>
          <td className="lower">valdovinoalfredo@yahoo.com</td>
          <td>3015257665</td>
        </tr>
        <tr>
          <td>
            GANADORES PREMIO <input type="hidden" defaultValue={698} />
          </td>
          {/*<td> </td>*/}
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTY5OHByb3RvY29sbw==&&leo=698"
              className="fancyForm cboxElement"
            >
              ANDRES LEONARDO
            </a>
          </td>
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTY5OHByb3RvY29sbw=="
              className="fancyForm cboxElement"
            >
              ROSALES GARCIA
            </a>
          </td>
          <td>CHÍA</td>
          <td />
          <td />
          <td className="lower">andresrosalesgarcia@gmail.com</td>
          <td>3103543232 </td>
        </tr>
        <tr>
          <td>
            GANADORES PREMIO <input type="hidden" defaultValue={70312} />
          </td>
          {/*<td> </td>*/}
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTcwMzEycHJvdG9jb2xv&&leo=70312"
              className="fancyForm cboxElement"
            >
              ANDRES LEONARDO
            </a>
          </td>
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTcwMzEycHJvdG9jb2xv"
              className="fancyForm cboxElement"
            >
              VALBUENA BARRERA
            </a>
          </td>
          <td>BUCARAMANGA</td>
          <td>VANGUARDIA </td>
          <td />
          <td className="lower">avalvuena@vanguardia.com.co</td>
          <td>3174086652</td>
        </tr>
        <tr>
          <td>
            MEDIOS DE COMUNICACION <input type="hidden" defaultValue={63344} />
          </td>
          {/*<td> </td>*/}
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTYzMzQ0cHJvdG9jb2xv&&leo=63344"
              className="fancyForm cboxElement"
            >
              BRAYAN LEONARDO
            </a>
          </td>
          <td>
            <a
              href="crear_persona.php?edi=cHJvdG9jb2xvY29uc0VkPTYzMzQ0cHJvdG9jb2xv"
              className="fancyForm cboxElement"
            >
              RAMOS MORA
            </a>
          </td>
          <td>BOGOTA</td>
          <td>CARACOL RADIO </td>
          <td />
          <td className="lower">brayan.ramos@caracol.com.co</td>
          <td />
        </tr>
       
      </tbody>
    </table>
  </div>
</section>

  )
}
