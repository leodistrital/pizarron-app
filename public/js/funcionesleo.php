<?

function crear_persona_leo()
{
	printArray($_POST);
	echo $_POST['nom-per'];
	echo "persona creada";



}


function editar_persona_leo()
{
	
	$campos = "cod_tit_per='" . $_REQUEST["tit-per"] . "', nom_per='" . correcion_html_utf8($_REQUEST["nom-per"]) . "' ,  ape_per='" . correcion_html_utf8($_REQUEST["ape-per"]) . "', cod_gen_per='" . $_REQUEST["gen-per"] . "', pro_per='" . correcion_html_utf8($_REQUEST["prof-per"]) . "',  cod_civ_per='" . $_REQUEST["civ-per"] . "',  mai_per='" . $_REQUEST["mail-per"] . "', tof_per='" . $_REQUEST["tel-per"] . "', twt_per='" . $_REQUEST["twi-per"] . "', cel_per='" . $_REQUEST["cel-per"] . "', cod_cui_per='" . $_REQUEST["ciud-per"] . "', dir_per='" . correcion_html_utf8($_REQUEST["dir-per"]) . "',  obs_per='" . correcion_html_utf8($_REQUEST["obs-per"]) . "' , sec_per='" . $_REQUEST["sect-per"] . "', cod_dep_per='" . $_REQUEST["dep"] . "', temp_per=0 , hab_per='" . $_REQUEST["obs-hebeas"] . "' , wha_per='" . $_REQUEST["wha-per"] . "' ";
	$error = editar_registro("personas", $campos, "cod_per", $_REQUEST['ultimo_id'], $int_con);
	
	editar_empresa_leo();
	editar_segmento_leo();
	editar_evento_leo();
}



function borrar_persona_leo()
{
	//$codigo =$_REQUEST['codigo'];
	//exit;
	$campos = "reg_eli=1";
	$error = editar_registro("personas", $campos, "cod_per", $_REQUEST['codigo'], $int_con);

}



function editar_conyugue_leo($operacion = "", $conyugue = '')
{

	if ($_REQUEST['operacion'] == 'borrar') {
		$campos = "reg_eli='1'  ";
		$error = editar_registro("personas", $campos, "cod_per", $_REQUEST['conyugue'], $int_con);

	} else {
		$campos = "nom_per='" . correcion_html_utf8($_REQUEST["nom-c"]) . "', ape_per='" . correcion_html_utf8($_REQUEST["ape-c"]) . "' ,  mai_per='" . $_REQUEST["mail-c"] . "', tof_per='" . $_REQUEST["tel-c"] . "', obs_per='" . $_REQUEST["obs-c"] . "',   coy_per='" . $_REQUEST["ultimo_id_padre"] . "' , temp_per=0 ";
		$error = editar_registro("personas", $campos, "cod_per", $_REQUEST['ultimo_id_conyugue'], $int_con);
	}


}



function editar_asistente($operacion = "")
{
	$codigo_maestro = $_REQUEST['codigo'];
	echo $codigo_asistente = $_REQUEST['ultimo_id_conyugue'];
	//printArray($_POST);
	//echo $codigo_maestro."***";
	//exit;
	if ($operacion == 'crear') {
		$campos = " coy_per,  asis_per  ";
		$valores = " '" . $codigo_maestro . "', '1' ";
		echo $ultimo_iddet = insertar_registros_det("personas", $campos, $valores, "");
	}

	if ($operacion == 'borrar') {
		$campos = "reg_eli=1";
		$error = editar_registro("personas", $campos, "cod_per", $_REQUEST['id_asistente'], $int_con);
	}


	if ($operacion == 'crear_persona') {
		//echo "leo   ";
		$campos = " nom_per='" . correcion_html_utf8($_REQUEST["nom-c"]) . "', ape_per='" . correcion_html_utf8($_REQUEST["ape-c"]) . "', mai_per='" . $_REQUEST["mail-c"] . "', tof_per='" . $_REQUEST["tel-c"] . "', dir_corr_per='" . $_REQUEST["dir_corr"] . "', obs_per='" . correcion_html_utf8($_REQUEST["obs-c"]) . "' , reg_per='" . $_REQUEST["reciberegalo"] . "' ";
		//echo "----";
		$error = editar_registro("personas", $campos, "cod_per", $codigo_asistente, $int_con);
	}
	//exit;

}


function editar_evento_leo()
{
	$db = new Database();
	$codigo_maestro = $_REQUEST['ultimo_id'];
	$sql = "update  d_evento_persona set reg_eli = 1  where cod_per_devp='$codigo_maestro'";


	$db->query($sql);

	$campos_leo = "reg_eli = 1";
	$error = editar_registro("d_evento_persona", $campos_leo, "cod_per_devp", $codigo_maestro, "");

	$arreglo_eventos = explode("||", $_REQUEST['total_eventos']);
	for ($i = 0; $i < count($arreglo_eventos) - 1; $i++) {
		$arreglo_datos = explode("@@", $arreglo_eventos[$i]);
		$campos = " cod_per_devp,  cod_eve_devp, pro_devp  ";
		$valores = " '" . $codigo_maestro . "', '" . $arreglo_datos[0] . "', '" . $arreglo_datos[1] . "' ";
		$ultimo_iddet = insertar_registros_det("d_evento_persona", $campos, $valores, "");
	}
}




function editar_empresa_leo()
{
	$db = new Database();
	$codigo_maestro = $_REQUEST['ultimo_id'];
	$sql = "update d_empresa_persona set reg_eli = 1  where cod_per_dpe='$codigo_maestro'";
	$db->query($sql);
	//echo $_REQUEST['arreglo_empesa_caja'];
	$arreglo_empresas = explode("@@", $_REQUEST['arreglo_empesa_caja']);
	for ($i = 0; $i < count($arreglo_empresas) - 1; $i++) {
		$arreglo_datos = explode("||", $arreglo_empresas[$i]);
		//print_r($arreglo_datos);
		if ($arreglo_datos[0] > 0) {
			$campos = " cod_per_dpe , cod_emp, cod_suc, pri_dpe ,  dep_dep,  	car_dpe, mail_dpe , tel_dpe , dir_dpe ";
			if ($arreglo_datos[2] == 'true')
				$empresa_principal = 1;
			else
				$empresa_principal = 0;

			$valores = " '" . $codigo_maestro . "', '" . $arreglo_datos[0] . "', '" . $arreglo_datos[1] . "', '" . $empresa_principal . "','" . correcion_html_utf8($arreglo_datos[3]) . "','" . correcion_html_utf8($arreglo_datos[4]) . "' ,'" . correcion_html_utf8($arreglo_datos[5]) . "'  ,'" . correcion_html_utf8($arreglo_datos[6]) . "' ,'" . correcion_html_utf8($arreglo_datos[7]) . "'   ";
			$ultimo_iddet = insertar_registros_det("d_empresa_persona", $campos, $valores, "");
		}
	}
}


function editar_segmento_leo()
{
	$db = new Database();
	$codigo_maestro = $_REQUEST['ultimo_id'];
	$sql = "update d_segmento_persona set reg_eli = 1  where cod_per_dse='$codigo_maestro'";
	$db->query($sql);
	/*echo $_REQUEST['arreglo_empesa_caja'];
	$arreglo_empresas = explode("||",$_REQUEST['arreglo_segmento_caja']);
	
	print_r($arreglo_empresas);
	 */
	$campos = " cod_per_dse , cod_seg_dse  ";
	$cantidadSegmentos = conteo_registro_sql('segmento', '');

	$eventosDeSegmentos = $_REQUEST['segm-per'];
	for ($i = 0; $i <= $cantidadSegmentos; $i++) {
		if (!empty($_REQUEST["segm-per-$i"])) {
			$eventosDeSegmentos .= "||" . $_REQUEST["segm-per-$i"];
		}
	}

	$arreglo_empresas = explode("||", $eventosDeSegmentos);
	//print_r($arreglo_empresas);
	for ($i = 0; $i < count($arreglo_empresas); $i++) {		
		//echo $arreglo_empresas[$i]."******";
		if (!empty($arreglo_empresas[$i])) {
			$valores = " '" . $codigo_maestro . "', '" . $arreglo_empresas[$i] . "'  ";
			$ultimo_iddet = insertar_registros_det("d_segmento_persona", $campos, $valores, "");
		}
	}
}

function editar_corresp()
{
	$db = new Database();
	$codigo_maestro = $_REQUEST["codPers"];
	$direccion_corres = correcion_html_utf8($_REQUEST["dir_corr"]);
	$direccion_corres = explode('|@|', $direccion_corres);
	$tipo = $direccion_corres[0];
	$codigo = $direccion_corres[1];
	$direccion = $direccion_corres[2];
	$sql = "update personas set dir_corr_per = '$direccion', tipo_dir_per = '$tipo', cod_dir_per = '$codigo'  where cod_per='$codigo_maestro'";
	$db->query($sql);
}

function crear_segmento()
{
	$campos = " nom_seg";
	$valores = " '" . correcion_html_utf8($_POST['nom_seg']) . "'";
	$ultimo_iddet = insertar_registros_det("segmento", $campos, $valores, "");
}

function editar_segmento()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " nom_seg='" . correcion_html_utf8($_POST['nom_seg']) . "'";
	editar_registro('segmento', $campos, 'cod_seg', $codigo_Edicion, "");
}

function borrar_segmento()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " reg_eli='1'";
	editar_registro('segmento', $campos, 'cod_seg', $codigo_Edicion, "");
}

function borrar_evento()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " reg_eli='1'";
	editar_registro('eventos', $campos, 'cod_eve', $codigo_Edicion, "");
}

function crear_sector()
{
	$campos = " nom_sec";
	$valores = " '" . correcion_html_utf8($_POST['nom_sec']) . "'";
	$ultimo_iddet = insertar_registros_det("sector", $campos, $valores, "");
}

function editar_sector()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " nom_sec='" . correcion_html_utf8($_POST['nom_sec']) . "'";
	editar_registro('sector', $campos, 'cod_sec', $codigo_Edicion, "");
}

function borrar_sector()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " reg_eli='1'";
	editar_registro('sector', $campos, 'cod_sec', $codigo_Edicion, "");
}

function crear_titulo()
{
	$campos = " nom_para,nom_op_para";
	$valores = " 'titulo_persona','" . correcion_html_utf8($_POST['nom_tit']) . "'";
	$ultimo_iddet = insertar_registros("parametros", $campos, $valores, "");

	$cantidad = conteo_registro_sql('parametros', " and nom_para='titulo_persona'");
	$cantidadId = $cantidad + 1;

	$campos_edicion = " val_op_para='" . $cantidadId . "'";
	editar_registro('parametros', $campos_edicion, 'cod_para', $ultimo_iddet, "");


}

function editar_titulo()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " nom_op_para='" . correcion_html_utf8($_POST['nom_tit']) . "'";
	editar_registro('parametros', $campos, 'cod_para', $codigo_Edicion, "");
}

function borrar_titulo()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " reg_eli='1'";
	editar_registro('parametros', $campos, 'cod_para', $codigo_Edicion, "");
}

function editar_perfil()
{
	decode_get2_get($_REQUEST['ti']);
	$codigo_Edicion = $_REQUEST['tipo'];
	$campos = " pas_usu='" . encode_this_get(correcion_html_utf8($_POST['nueva1'])) . "', spas='" . md5(correcion_html_utf8($_POST['nueva1'])) . "'";
	editar_registro('usuario', $campos, 'cod_usu', $codigo_Edicion, "");
}

function recuperar_perfil()
{
	$correo = $_REQUEST['mail'];
	$db = new Database();
	$sql = "select * from usuario where reg_eli=0 and nom_usu='$correo' ORDER BY cod_usu DESC limit 0,1";
	$db->query($sql);
	$db->next_row();
	$codigoUsuario = $db->cod_usu;
	$nombreUsuario = $db->nombre_usu;
	$nuevaClave = generateRandomString(7);
	$titulo = "Recordar datos de ingreso - Protocolo Simón Bolívar";
	$mensaje = "<p>Señor(a) $nombreUsuario</p>
	<p> Le recordamos su usuario y contraseña para que pueda acceder a Protocolo Simón Bolívar<br>
		Usuario: $correo  <br>
		Contraseña: $nuevaClave 
	</p>
	<p> Atentamente <br> <br>
		Protocolo Simón Bolívar
	</p>
";
	
	//enviar_correoPSB($mensaje, $correo, $titulo);



	/*$campos=" pas_usu='".encode_this_get(correcion_html_utf8($nuevaClave))."', spas='".md5(correcion_html_utf8($nuevaClave))."'" ;
	editar_registro('usuario',$campos,'cod_usu',$codigoUsuario,""); 
	 */



}


function generateRandomString($length = 7)
{
	return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
}

function enviar_correoPSB($mensaje, $correo, $titulo)
{
	$cabeceras = 'MIME-Version: 1.0' . "\r\n";
	$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$para = $correo;
	$cabeceras .= 'To: ' . $para . ' Premios Simón Bolívar' . "\r\n";
	$cabeceras .= 'From: PSB - Nueva Clave  <no-replay@segurosbolivar.com>' . "\r\n";

	if (mail($para, $titulo, $mensaje, $cabeceras)) {
		$r = 1;
	}
}

?>