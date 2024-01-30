<? session_start();
include("funcionesleo.php");
if (file_exists("buscador/buscador.php")) {
	include("buscador/buscador.php");
}

if (file_exists("../buscador/buscador.php")) {
	include("../buscador/buscador.php");
}
?>

<?
$codigo_usuario = isset($global[2]) ? $global[2] : null;

function paginar($sql)
{
	$db = new Database();
	$db->query($sql);
	return $db->num_rows();
}


function reemplazar($busquedas)
{
	$busquedas = str_replace(" like '%", "|", $busquedas);
	$busquedas = str_replace("%'", "", $busquedas);
	return $busquedas;
}


function reemplazar_1($busquedas)
{
	$busquedas = str_replace("|", " like '%", $busquedas);
	$busquedas = $busquedas . "%'";
	return $busquedas;
}


function combo($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $i = 0)
{
	$db = new Database();
	$sql = "select * from " . $tabla . " where reg_eli=0 order by " . $nombre . ' ASC';
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT' data-num='" . $i . "'>";
	if ($valor_edicion == 0) {
		echo "<option value='0' selected='selected'>Seleccione..</option>";
	}

	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor) {
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->$nombre . "</option>";
		} else {
			echo " <option value=" . $db->$valor . ">" . $db->$nombre . "</option>";
		}
	}



	echo "</select>";
	$db->close();
}

function combo_empresa($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $evento, $where, $orden, $i = 0)
{
	if (empty($where)) $condicion = " where reg_eli=0 ";
	else $condicion = $where . " and reg_eli=0 ";

	$db = new Database();
	$sql = "select " . $valor . ", " . $nombre . " as nombre  from " . $tabla . " " . $condicion . " order by " . $orden;
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' $evento  data-num='" . $i . "'  >";
	if ($valor_edicion == 0) {
		echo "<option value='0' selected='selected'>Seleccione..</option>";
	}
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->nombre . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . $db->nombre . "</option>";
	}
	echo "</select>";
	$db->close();
}

function combo_orden($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $orden)
{
	$db = new Database();
	$sql = "select * from " . $tabla . " where reg_eli=0 order by " . $orden;
	//exit;
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT'>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . pcadena($db->$nombre) . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . pcadena($db->$nombre) . "</option>";
	}
	echo "</select>";
	$db->close();
}

function combo_clase($nombre_obj, $tabla, $valor, $nombre, $clase, $orden)
{
	$db = new Database();
	$sql = "select * from " . $tabla . " where reg_eli=0 ORDER BY " . $orden;
	//exit;
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='$clase'>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . pcadena($db->$nombre) . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . pcadena($db->$nombre) . "</option>";
	}
	echo "</select>";
	$db->close();
}



function combo_evento_where($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $evento, $where, $orden)
{
	if (empty($where)) $condicion = " where reg_eli=0 ";
	else $condicion = $where . " and reg_eli=0 ";

	$db = new Database();
	$sql = "select " . $valor . ", " . $nombre . " as nombre  from " . $tabla . " " . $condicion . " order by " . $orden;
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT'  $evento  >";
	echo "<option value='0' selected='selected'>Seleccione..</option>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->nombre . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . $db->nombre . "</option>";
	}
	echo "</select>";
	$db->close();
}


function combo_evento_1($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $evento, $orden, $default)
{
	$db = new Database();
	$sql = "select " . $valor . ", " . $nombre . " as nombre  from " . $tabla . " where reg_eli=0 order by " . $orden;
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT'  $evento  >";
	if ($default == 1) {
		echo "<option value='0' selected='selected'>Seleccione..</option>";
	}
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->nombre . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . $db->nombre . "</option>";
	}
	echo "</select>";
	$db->close();
}



function inicio()
{
	echo '	<script type="text/javascript" src="js/funciones.js"></script>
			<script type="text/javascript" src="js/jquery.js"></script>
			<script type="text/javascript" src="js/jquery.autocomplete.js"></script>
			<script type="text/javascript" src="js/tablesort.min.js"></script>
			
			';
}



function inicio_man()
{
	echo '<meta charset="UTF-8" />
	<title>Gestor 2 Mottif</title>
	<link href="css/reset.css" rel="stylesheet" type="text/css" />
	<link href="css/layout.css" rel="stylesheet" type="text/css" />
	<!--[if IE 7]>
		<link href="css/styleie7.css" rel="stylesheet" type="text/css" />
	<![endif]-->
	<!--[if IE 8]>
		<link href="css/styleie8.css" rel="stylesheet" type="text/css" />
	<![endif]-->
	<!--[if IE 9]>
		<link href="css/styleie9.css" rel="stylesheet" type="text/css" />
	<![endif]-->	
	<link rel="stylesheet" type="text/css" href="css/jquery.autocomplete.css">
	<link rel="stylesheet" type="text/css" href="css/autocomplete.css">
	<link type="text/css" href="css/smoothness/jquery-ui-1.8.24.custom.css" rel="stylesheet" />
	<script type="text/javascript" src="js/funciones.js"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/jquery.autocomplete.js"></script>
	<script type="text/javascript" src="jss/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="jss/jquery-ui-1.8.24.custom.min.js"></script>	
	<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css?v=2.1.2" media="screen" />
	<script type="text/javascript" src="js/jquery.fancybox.js?v=2.1.3"></script>
	<script src="js/int_float.js"></script>
	<script type="text/javascript" src="calendario/javascript/calendar.js"></script>
	<script type="text/javascript" src="calendario/javascript/calendar-es.js"></script>
	<script type="text/javascript" src="calendario/javascript/calendar-setup.js"></script>
	<link rel="stylesheet" type="text/css" media="all" href="calendario/styles/calendar-win2k-cold-1.css" title="win2k-cold-1" />
	<script type="text/javascript" src="multiselect/chosen.jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="multiselect/chosen.css">
	<link rel="stylesheet" media="screen" type="text/css" href="apps/color picker/css/colorpicker.css" />
	<script type="text/javascript" src="apps/color picker/js/colorpicker.js"></script>
	
	<!--[if lt IE 9]>
	<script>
	document.createElement("header");
	document.createElement("nav");
	document.createElement("section");
	document.createElement("article");
	document.createElement("aside");
	document.createElement("footer");
	document.createElement("hgroup");
	</script>
	<![endif]-->
	 <script>
    $(document).ready(function(){
        $(".entero").numeric();
        $(".decimal").numeric(","); 
   })
   
   </script>
	';
}



function escribe_sql($sql)
{
}



function insertar($tabla, $compos, $valores, $interfaz)
{
	$compos = limpiarCadena($compos);
	$sql = "insert into $tabla $compos values $valores ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->affected_rows();
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 1, $sql, $interfaz,'0');
	return $retorno;
}

function noti_exito()
{
	echo '<span class="notificacion">La informaci&oacute;n del registro se ha guardado correctamente
</span>';
}

function fecha_servidor()
{
	$anio = @date("Y");
	$mes = @date("m");
	$dia = @date("d");
	$hora = @date("H") - 1;
	$minuto = @date("i") - 20;
	if ($minuto < 0) {
		$minuto = 60 + ($minuto);
		$hora--;
	}
	if ($hora < 0) {
		$hora = 0;
	}
	$seg = @date("s");
	if ($hora < 10) {
		$hora = "0" . $hora;
	}
	if ($minuto < 10) {
		$minuto = "0" . $minuto;
	}
	$da = $anio . "-" . $mes . "-" . $dia . " " . $hora . ":" . $minuto . ":" . $seg;
	return $da;
}


function insertar_registros($tabla, $compos, $valores, $interfaz)
{
	$fecharegistro = fecha_servidor();
	$complemto_campos = ", fec_crea, usu_acce, reg_eli , fec_modif ";
	//$complemto_datos=",'".date("Y-m-d h:i:s")."', '".$_SESSION["global"][2]."', '0', '".date("Y-m-d h:i:s")."' ";
	$complemto_datos = ",'" . $fecharegistro . "', '" . $_SESSION["global"][2] . "', '0', '" . $fecharegistro . "' ";
	$complemto_datos = limpiarCadena($complemto_datos);
	$sql = "insert into $tabla ($compos $complemto_campos) values ($valores $complemto_datos) ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->insert_id();
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 1, $sql, $interfaz, $retorno);
	return $retorno;
}




function editar($tabla, $compos, $where_campo, $where_valor, $interfaz)
{
	$sql = "UPDATE  $tabla  set $compos where $where_campo=$where_valor ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->Errno;
	if ($retorno == 0)
		$retorno = 1;
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 2, $sql, $interfaz);
	return $retorno;
}


function editar_registro($tabla, $compos, $where_campo, $where_valor, $interfaz)
{
	$fechaModi = fecha_servidor();
	$complemto_campos = ",fec_modif='" . $fechaModi . "', usu_acce='" . $_SESSION["global"][2] . "' ";
	echo $sql = "UPDATE  $tabla set $compos $complemto_campos where $where_campo=$where_valor ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->Errno;
	if ($retorno == 0) {
		$retorno = 1;
	}
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 2, $sql, $interfaz, $where_valor);
	return $retorno;
}

function editar_registro_where($tabla, $compos, $where_campo, $where_valor, $interfaz, $where_general)
{
	$fechaModi = fecha_servidor();
	$complemto_campos = ",fec_modif='" . $fechaModi . "', usu_acce='" . $_SESSION["global"][2] . "' ";
	echo $sql = "UPDATE  $tabla set $compos $complemto_campos where $where_campo=$where_valor  $where_general";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->Errno;
	if ($retorno == 0) {
		$retorno = 1;
	}
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 2, $sql, $interfaz, $where_valor);
	return $retorno;
}

function editar_registro_esp($tabla, $compos, $where_campo, $where_valor, $interfaz)
{
	$complemto_campos = ",fec_modif='" . date("Y-m-d h:i:s") . "', usu_acce='" . $_SESSION["global"][2] . "' ";
	$sql = "UPDATE  $tabla set $compos $complemto_campos where $where_campo=$where_valor ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->Errno;
	if ($retorno == 0) {
		$retorno = 1;
	}
	$db->close();
	//escribe_sql($sql);
	//auditoria ($tabla,2,$sql,$interfaz,$where_valor);
	return $retorno;
}



function eliminar($tabla, $codigo, $campo, $interfaz)
{
	$complemto_campos = ",fec_modif='" . date("Y-m-d h:i:s") . "', usu_acce='0' ";
	$sql = "UPDATE  $tabla set reg_eli=1  where $campo=$codigo  ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->Errno;
	if ($retorno == 0) {
		$retorno = 1;
	}
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 3, $sql, $interfaz, $codigo);
	return $retorno;
}

function getUserLanguage()
{
	$idioma = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 2);
	return $idioma;
}

function auditoria_cliente()
{
	$ip_cliente = $_SERVER['REMOTE_ADDR'];
	$idi_cliente = $user_language = getUserLanguage();
	$info = detect();
	$sistemaope = "Sistema operativo: " . $info["os"];
	$navegador = "Navegador: " . $info["browser"];
	return $ip_cliente . "-@@-" . $idi_cliente . "-@@-" . $sistemaope . "-@@-" . $navegador;
}
function detect()
{
	$browser = array("IE", "OPERA", "MOZILLA", "NETSCAPE", "FIREFOX", "SAFARI", "CHROME");
	$os = array("WIN", "MAC", "LINUX");

	# definimos unos valores por defecto para el navegador y el sistema operativo
	$info['browser'] = "OTHER";
	$info['os'] = "OTHER";

	# buscamos el navegador con su sistema operativo
	foreach ($browser as $parent) {
		$s = strpos(strtoupper($_SERVER['HTTP_USER_AGENT']), $parent);
		$f = $s + strlen($parent);
		$version = substr($_SERVER['HTTP_USER_AGENT'], $f, 15);
		$version = preg_replace('/[^0-9,.]/', '', $version);
		if ($s) {
			$info['browser'] = $parent;
			$info['version'] = $version;
		}
	}

	# obtenemos el sistema operativo
	foreach ($os as $val) {
		if (strpos(strtoupper($_SERVER['HTTP_USER_AGENT']), $val) !== false)
			$info['os'] = $val;
	}

	# devolvemos el array de valores
	return $info;
}


function auditoria($tabla, $codigo, $sql, $interfaz, $id_registro)
{
	$interfaz_1 = explode("?", $interfaz);
	$interfaz = $interfaz_1[0];

	if (empty($_SESSION["global"][2]))
		$codigo_usuario = 0;
	else
		$codigo_usuario = $_SESSION["global"][2];

	$sql = str_replace("\"", "'", $sql);

	$interfaz = clasificar_auditoria($interfaz);
	$codigo_proyecto = 1;
	/*$fecha= date("Y-m-d H:i:s");
	
	$fecha = strtotime ( '-80 minute' , strtotime ( $fecha ) ) ;*/
	$fecha = fecha_servidor();

	$datos_cliente = auditoria_cliente();

	$sql1 = "INSERT INTO auditoria (cod_usu_aud ,nom_tab_aud ,fec_aud ,transaccion ,sql_aud,id_reg_aud, cliente_aud) VALUES ($codigo_usuario,'$interfaz','$fecha',$codigo,\"$sql\", '$id_registro', '$datos_cliente') ";
	//exit;
	$db = new Database();
	$db->query($sql1);
	escribe_sql($sql1);
}

function clasificar_auditoria($interfaz)
{
	$sql = " SELECT nom_int FROM interfaz WHERE  rut_int='$interfaz' ";
	$db = new Database();
	$db->query($sql);
	$db->next_row();
	//return $db->nom_int;
	return "pruebas";
}


function completar($codigo, $tam)
{
	$a = strlen($codigo);
	for ($i = $a; $i < $tam; $i++) {
		$codigo = "0" . $codigo;
	}
	return $codigo;
}


function insertar_maestro($tabla, $compos, $valores, $interfaz)
{
	$sql = "insert into $tabla $compos values $valores ";
	$db = new Database();
	$db->query($sql);
	$retorno = $db->insert_id();
	$db->close();
	escribe_sql($sql);
	auditoria($tabla, 1, $sql, $interfaz);
	return $retorno;
}


function combo_sql($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $sql)
{

	$db = new Database();
	$db->query($sql);

	echo " <select name='" . $nombre_obj . "'  id='" . $nombre_obj . "' class='SELECT'>";
	echo " <option value=''>Seleccione</option>";

	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->$nombre . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . $db->$nombre . "</option>";
	}
	echo "</select>";
	$db->close();
}


function combo_sql_evento($nombre_obj, $tabla, $valor, $nombre, $valor_edicion = 0, $sql, $evento)
{
	$db = new Database();
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT' " . $evento . " >";
	echo "<option value='0' selected='selected'>Seleccione..</option>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->$nombre . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . $db->$nombre . "</option>";
	}
	echo "</select>";
	$db->close();
}



function combo_sql_evento_no_edita($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $sql, $evento)
{
	$db = new Database();
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT' " . $evento . " >";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . $db->$nombre . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . $db->$nombre . "</option>";
	}
	echo "</select>";
	$db->close();
}



function enviar_alerta($subject, $msg)
{
	$db = new Database();
	$sql = "SELECT * FROM rsocial  limit 1";
	$db->query($sql);
	if ($db->next_row()) {
		$mail_envio = $db->email;
	}
	envar_correo($mail_envio, $msg, $subject);
}



function envar_correo($mail_envio, $msg, $subject)
{
	include("email.inc.php");
	$e = new Email();
	$e->isHTML = true;
	$e->setEmailFrom("Alertas Automaticas", "$mail_envio");
	$e->addEmailFor("Administrador", "$mail_envio");
	$e->setSubject("$subject");
	$e->setBody($msg);
	if ($e->send()) {
		$a = 1;
	} else {
		echo "No enviado";
	}

	/*$eol="\r\n";
	$mime_boundary=md5(time());
	# Common Headers
	$fromaddress=$mail_envio;
	$headers = "From:  ".$fromname."<".$fromaddress.">".$eol;
	if( $cc != "" ) $headers .= $cc;
	$headers .= "Reply-To: ".$fromname."<".$fromaddress.">".$eol;
	$headers .= "Return-Path: ".$fromname."<".$fromaddress.">".$eol;    // these two to set reply address
	$headers .= "Message-ID: <".time()."-".$fromaddress.">".$eol;
	$headers .= "X-Mailer: PHP v".phpversion().$eol;          // These two to help avoid spam-filters
	$headers .= 'MIME-Version: 1.0'.$eol.$eol;
	$msg .=$body."<br>".$eol.$eol;
	$msg .=$eol."<br>"."Atentamente,<br> "."<br>"."<br>".$eol.$eol."e-mail: ".$fromaddress."<br>"." ".$fromname."<br>".$eol.$eol;
	$msg .= "--".$htmlalt_mime_boundary."--".$eol.$eol;
	include_once("class.phpmailer.php");
	$sendmail = new PHPMailer();
	$sendmail->IsSMTP();
	$sendmail->Host = "";
	$sendmail->Port = 25;
	$sendmail->AddAddress ($mail_envio);
	$sendmail->SMTPAuth = true;
	$sendmail->Username = "leonardo@kaome.com";
	$sendmail->Password = "leonardo";
	$sendmail->From = ("leonardo@kaome.com");
	$sendmail->FromName = "|||| Envio Automaticos ||||"." ";
	$sendmail->Timeout = 18000000; 
	$sendmail->IsHTML(true);
	$sendmail->Subject = "- ALERTA - ".$subject;
	$sendmail->Body = $msg;
	$sendmail->Send();*/
}



function combo_parametro($nombre_obj, $nom_parametro, $valor_edicion, $evento)
{
	$db = new Database();
	$sql = "select * from  parametros where nom_para='$nom_parametro' and  reg_eli=0";
	//exit;
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "'  " . $evento . " >";
	echo "<option value='0' selected='selected'>Seleccione..</option>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->val_op_para)
			echo " <option value='" . $db->val_op_para . "' selected='selected'>" . $db->nom_op_para . "</option>";
		else
			echo " <option value='" . $db->val_op_para . "'>" . $db->nom_op_para . "</option>";
	}
	echo "</select>";
	$db->close();
}


function combo_parametro_filtrado($nombre_obj, $nom_parametro, $valor_edicion, $evento, $ultimo_id, $c_tabla, $n_tabla)
{
	$db = new Database();
	if (!empty($ultimo_id)) $filtro = "or $c_tabla=$ultimo_id";
	$sql = "select * from  parametros left join $n_tabla on ($nombre_obj=val_op_para) where nom_para='$nom_parametro' and  parametros.reg_eli=0 and ($c_tabla is null $filtro)";
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT' " . $evento . " >";
	echo "<option value='0' selected='selected'>Seleccione..</option>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->val_op_para)
			echo " <option value='" . $db->val_op_para . "' selected='selected'>" . $db->nom_op_para . "</option>";
		else
			echo " <option value='" . $db->val_op_para . "'>" . $db->nom_op_para . "</option>";
	}
	echo "</select>";
	$db->close();
}

function pcadena($cadena)
{
	return ucfirst(strtolower($cadena));
}


function nombre_repetido($nombre_usuario, $codigo)
{
	$db = new Database();
	$sql = "SELECT   log_usu FROM   usuario where log_usu='$nombre_usuario' and cod_usu!=$codigo ";
	$db->query($sql);
	if ($db->num_rows() > 0) {
		echo "1";
	} else
		echo "0";
}


function encrypt($string, $key)
{
	$result = '';
	for ($i = 0; $i < strlen($string); $i++) {
		$char = substr($string, $i, 1);
		$keychar = substr($key, ($i % strlen($key)) - 1, 1);
		$char = chr(ord($char) + ord($keychar));
		$result .= $char;
	}
	return base64_encode($result);
}


function decrypt($string, $key)
{
	$result = '';
	for ($i = 0; $i < strlen($string); $i++) {
		$char = substr($string, $i, 1);
		$keychar = substr($key, ($i % strlen($key)) - 1, 1);
		$char = chr(ord($char) + ord($keychar));
		$result .= $char;
	}
	return base64_encode($result);
}




function validar_ingreso($usu, $pass)
{
	$db = new Database();
	$sql = "SELECT * FROM  usuario inner join  perfil on usuario.cod_per_usu=perfil.cod_per    WHERE susu='$usu'  AND spas='$pass'   and usuario.reg_eli!=1";
	//exit;
	$db->query($sql);
	if ($db->num_rows() > 0) {
		while ($db->next_row()) {
			echo "1";
			$_SESSION["global"][3] = coversion_html_utf8($db->nom_usu);
			$_SESSION["global"][4] = $db->log_pro;
			$_SESSION["global"][2] = $db->cod_usu;
			$_SESSION["global"][5] = $db->cod_per_usu;
			$_SESSION["global"][6] = $db->nom_per;
			$_SESSION["global"][7] = $db->conce_usu;
			$_SESSION["global"][8] = $db->cod_ciu;
			auditoria("login", 10, $sql, 0, 0);
		}
	} else
		echo "0";
}



function autor_reg($usu_id)
{
	$db = new Database();
	$sql = "SELECT * FROM  usuario where cod_usu='$usu_id'  ";
	$db->query($sql);
	if ($db->next_row()) {
		echo $db->nom_usu;
	}
}


function ultimoid($col, $tabla)
{
	$db = new Database();
	$sql = "SELECT max($col) as ultimo_id FROM  $tabla ";
	$db->query($sql);
	if ($db->next_row()) {
		return $db->ultimo_id;
	}
}



function agr_editor($id_objeto, $contenido)
{
	$contenido = html_leer($contenido);
	echo "<textarea name='$id_objeto' id='$id_objeto' cols='45' rows='4' class='textfield02' style='display:none' >$contenido</textarea> <input type='button' name='editor_desc' class='btn_editor_html' value='Editor HTML' onclick='open_editor_v2(enviar_forma.name,\"$id_objeto\",\"1\")' /> <label id='" . $id_objeto . "_muestra' ></label> ";
}

function ver_editor($contenido)
{
	echo "<div class='ver_editor' id='div_info' style='display:none' >$contenido</div>";
}



function agr_editor_plantilla($id_objeto, $contenido, $plantilla)
{
	echo "<textarea name='$id_objeto' id='$id_objeto' cols='45' rows='4' class='textfield02' style='display:none' >$contenido</textarea> <input type='button' name='editor_desc' class='btn_editor_html' value='Editor HTML' onclick='open_editor_v2_plan(enviar_forma.name,\"$id_objeto\",\"$plantilla\" )' /> <label id='" . $id_objeto . "_muestra' >" . substr($contenido_111, 1, 30) . "</label> ";
}


function subir_imagen($archivo_subio, $ruta, $valor_edicion)
{
	echo $nombre_archivo = limpiar_string($archivo_subio['name']);
	$un = uniqid();
	echo $nombre_archivo = $un . "__" . $nombre_archivo;
	if (!empty($archivo_subio['name'])) {
		copy($archivo_subio['tmp_name'], $ruta . $nombre_archivo);
	} else {
		$nombre_archivo = $valor_edicion;
	}

	if ($valor_edicion == "ELIMINADO")
		$nombre_archivo = "";

	return $nombre_archivo;
}



function subir_imagen_esp($archivo_subio, $ruta, $valor_edicion)
{
	$db = new Database();
	$nombre_archivo = $db->html_correccion($archivo_subio['name']);
	$un = uniqid();
	$nombre_archivo = $un . "_" . $nombre_archivo;

	if (!empty($archivo_subio['name'])) {
		copy($archivo_subio['tmp_name'], $ruta . $nombre_archivo);
	} else {
		$nombre_archivo = $valor_edicion;
	}

	if ($valor_edicion == "ELIMINADO")
		$nombre_archivo = "";

	return $nombre_archivo;
}



function tamano_archivo($peso, $decimales = 2)
{
	$clase = array(" Bytes", " KB", " MB", " GB", " TB");
	return round($peso / pow(1024, ($i = floor(log($peso, 1024)))), $decimales) . $clase[$i];
}


function campo_imagen($nom_obj, $nom_obj_edicion, $valor_edicion, $ruta, $peso = 5000)
{
	if (!empty($valor_edicion) and file_exists($ruta . $valor_edicion)) {
		$datos_arc = explode(".", $valor_edicion);
		$pro = getimagesize($ruta . $valor_edicion);
		$nombre_archivo = $ruta . $valor_edicion; // nombre archivo
		$peso_total_archivo = $peso_archivo = filesize($nombre_archivo); // obtenemos su peso en bytes
		$peso_archivo = tamano_archivo($peso_archivo);  // mo
		$fec_file = date("F d, Y - H:i:s", filemtime($nombre_archivo));
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='$valor_edicion' />";
		echo " <div class='container_imagen' id='img_contine_edicion_$nom_obj'>           <hr />
						<div class='left_content'>
							<a href='#' title='Eliminar' class='eliminar replaced_txt' onclick='eliminar_imagen(\"$nom_obj\",\"$nom_obj_edicion\")' >Eliminar</a>
							<a href='#' id='muestra_$nom_obj'  onclick='mostar_imagen(\"mostar\",\"$ruta/$valor_edicion\")'  title='Clic para ver la imagen original'>
							<img src='$ruta/$valor_edicion' width='140' ></a>
						</div>
						<div class='right_content'>
							<ul>
								<li>Dimensiones: $pro[0] x $pro[1] px</li>
		 						<li>Nombre: $valor_edicion</li>";

		echo "					<li>Tama&ntilde;o: $peso_archivo";

		if ($peso < intval($peso_total_archivo / 1000)) {
			echo "<span style='background-color:#FF3' > (Tamaño no Valido)</span>";
		}
		echo " </li> ";

		echo "						<li>&Uacute;ltima modificaci&oacute;n: $fec_file</li>
								<li class='descargar'   onclick='mostar_imagen(\"descargar\",\"$ruta/$valor_edicion\")' ><a href='#'>Descargar</a></li>
							</ul>
						</div>
						<div class='cleat_float'></div>
				  <hr />
			</div>";
	} else {
		echo "<input type='file' name='$nom_obj' id='$nom_obj' class='boton' />";
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='$valor_edicion' />";
	}
}

include("SimpleImage.php");

function copiar_img($ruta_original = "", $nombre_archivo = "", $ruta_copia = "", $tamano = 0)
{
	if (!empty($nombre_archivo)) {
		if ($tamano > 0) {
			$image = new SimpleImage();
			$image->load($ruta_original . $nombre_archivo);
			$image->resizeToHeight($tamano);
			$image->save($ruta_copia . $nombre_archivo);
		} else {
			copy($ruta_original . $nombre_archivo, $ruta_copia . $nombre_archivo);
		}
	}
}


function correcion_html_utf8($String)
{
	$String = str_replace("¡", "&#161;", $String); //Signo de exclamación abierta.&iexcl;
	$String = str_replace("¢", "&#162;", $String); //Signo de centavo.&cent;
	$String = str_replace("£", "&#163;", $String); //Signo de libra esterlina.&pound;
	$String = str_replace("¤", "&#164;", $String); //Signo monetario.&curren;
	$String = str_replace("¥", "&#165;", $String); //Signo del yen.&yen;
	$String = str_replace("¦", "&#166;", $String); //Barra vertical partida.&brvbar;
	$String = str_replace("§", "&#167;", $String); //Signo de sección.&sect;
	$String = str_replace("¨", "&#168;", $String); //Diéresis.&uml;
	$String = str_replace("©", "&#169;", $String); //Signo de derecho de copia.&copy;
	$String = str_replace("ª", "&#170;", $String); //Indicador ordinal femenino.&ordf;
	$String = str_replace("«", "&#171;", $String); //Signo de comillas francesas de apertura.&laquo;
	$String = str_replace("¬", "&#172;", $String); //Signo de negación.&not;
	$String = str_replace("", "&#173;", $String); //Guión separador de sílabas.&shy;
	$String = str_replace("®", "&#174;", $String); //Signo de marca registrada.&reg;
	$String = str_replace("¯", "&#175;", $String); //Macrón.&macr;
	$String = str_replace("°", "&#176;", $String); //Signo de grado.&deg;
	$String = str_replace("±", "&#177;", $String); //Signo de más-menos.&plusmn;
	$String = str_replace("²", "&#178;", $String); //Superíndice dos.&sup2;
	$String = str_replace("³", "&#179;", $String); //Superíndice tres.&sup3;
	$String = str_replace("´", "&#180;", $String); //Acento agudo.&acute;
	$String = str_replace("µ", "&#181;", $String); //Signo de micro.&micro;
	$String = str_replace("¶", "&#182;", $String); //Signo de calderón.&para;
	$String = str_replace("·", "&#183;", $String); //Punto centrado.&middot;
	$String = str_replace("¸", "&#184;", $String); //Cedilla.&cedil;
	$String = str_replace("¹", "&#185;", $String); //Superíndice 1.&sup1;
	$String = str_replace("º", "&#186;", $String); //Indicador ordinal masculino.&ordm;
	$String = str_replace("»", "&#187;", $String); //Signo de comillas francesas de cierre.&raquo;
	$String = str_replace("¼", "&#188;", $String); //Fracción vulgar de un cuarto.&frac14;
	$String = str_replace("½", "&#189;", $String); //Fracción vulgar de un medio.&frac12;
	$String = str_replace("¾", "&#190;", $String); //Fracción vulgar de tres cuartos.&frac34;
	$String = str_replace("¿", "&#191;", $String); //Signo de interrogación abierta.&iquest;
	$String = str_replace("×", "&#215;", $String); //Signo de multiplicación.&times;
	$String = str_replace("÷", "&#247;", $String); //Signo de división.&divide;
	$String = str_replace("À", "&#192;", $String); //A mayúscula con acento grave.&Agrave;
	$String = str_replace("Á", "&#193;", $String); //A mayúscula con acento agudo.&Aacute;
	$String = str_replace("Â", "&#194;", $String); //A mayúscula con circunflejo.&Acirc;
	$String = str_replace("Ã", "&#195;", $String); //A mayúscula con tilde.&Atilde;
	$String = str_replace("Ä", "&#196;", $String); //A mayúscula con diéresis.&Auml;
	$String = str_replace("Å", "&#197;", $String); //A mayúscula con círculo encima.&Aring;
	$String = str_replace("Æ", "&#198;", $String); //AE mayúscula.&AElig;
	$String = str_replace("Ç", "&#199;", $String); //C mayúscula con cedilla.&Ccedil;
	$String = str_replace("È", "&#200;", $String); //E mayúscula con acento grave.&Egrave;
	$String = str_replace("É", "&#201;", $String); //E mayúscula con acento agudo.&Eacute;
	$String = str_replace("Ê", "&#202;", $String); //E mayúscula con circunflejo.&Ecirc;
	$String = str_replace("Ë", "&#203;", $String); //E mayúscula con diéresis.&Euml;
	$String = str_replace("Ì", "&#204;", $String); //I mayúscula con acento grave.&Igrave;
	$String = str_replace("Í", "&#205;", $String); //I mayúscula con acento agudo.&Iacute;
	$String = str_replace("Î", "&#206;", $String); //I mayúscula con circunflejo.&Icirc;
	$String = str_replace("Ï", "&#207;", $String); //I mayúscula con diéresis.&Iuml;
	$String = str_replace("Ð", "&#208;", $String); //ETH mayúscula.&ETH;
	$String = str_replace("Ñ", "&#209;", $String); //N mayúscula con tilde.&Ntilde;
	$String = str_replace("Ò", "&#210;", $String); //O mayúscula con acento grave.&Ograve;
	$String = str_replace("Ó", "&#211;", $String); //O mayúscula con acento agudo.&Oacute;
	$String = str_replace("Ô", "&#212;", $String); //O mayúscula con circunflejo.&Ocirc;
	$String = str_replace("Õ", "&#213;", $String); //O mayúscula con tilde.&Otilde;
	$String = str_replace("Ö", "&#214;", $String); //O mayúscula con diéresis.&Ouml;
	$String = str_replace("Ø", "&#216;", $String); //O mayúscula con barra inclinada.&Oslash;
	$String = str_replace("Ù", "&#217;", $String); //U mayúscula con acento grave.&Ugrave;
	$String = str_replace("Ú", "&#218;", $String); //U mayúscula con acento agudo.&Uacute;
	$String = str_replace("Û", "&#219;", $String); //U mayúscula con circunflejo.&Ucirc;
	$String = str_replace("Ü", "&#220;", $String); //U mayúscula con diéresis.&Uuml;
	$String = str_replace("Ý", "&#221;", $String); //Y mayúscula con acento agudo.&Yacute;
	$String = str_replace("Þ", "&#222;", $String); //Thorn mayúscula.&THORN;
	$String = str_replace("ß", "&#223;", $String); //S aguda alemana.&szlig;
	$String = str_replace("à", "&#224;", $String); //a minúscula con acento grave.&agrave;
	$String = str_replace("á", "&#225;", $String); //a minúscula con acento agudo.&aacute;
	$String = str_replace("â", "&#226;", $String); //a minúscula con circunflejo.&acirc;
	$String = str_replace("ã", "&#227;", $String); //a minúscula con tilde.&atilde;
	$String = str_replace("ä", "&#228;", $String); //a minúscula con diéresis.&auml;
	$String = str_replace("å", "&#229;", $String); //a minúscula con círculo encima.&aring;
	$String = str_replace("æ", "&#230;", $String); //ae minúscula.&aelig;
	$String = str_replace("ç", "&#231;", $String); //c minúscula con cedilla.&ccedil;
	$String = str_replace("è", "&#232;", $String); //e minúscula con acento grave.&egrave;
	$String = str_replace("é", "&#233;", $String); //e minúscula con acento agudo.&eacute;
	$String = str_replace("ê", "&#234;", $String); //e minúscula con circunflejo.&ecirc;
	$String = str_replace("ë", "&#235;", $String); //e minúscula con diéresis.&euml;
	$String = str_replace("ì", "&#236;", $String); //i minúscula con acento grave.&igrave;
	$String = str_replace("í", "&#237;", $String); //i minúscula con acento agudo.&iacute;
	$String = str_replace("î", "&#238;", $String); //i minúscula con circunflejo.&icirc;
	$String = str_replace("ï", "&#239;", $String); //i minúscula con diéresis.&iuml;
	$String = str_replace("ð", "&#240;", $String); //eth minúscula.&eth;
	$String = str_replace("ñ", "&#241;", $String); //n minúscula con tilde.&ntilde;
	$String = str_replace("ò", "&#242;", $String); //o minúscula con acento grave.&ograve;
	$String = str_replace("ó", "&#243;", $String); //o minúscula con acento agudo.&oacute;
	$String = str_replace("ô", "&#244;", $String); //o minúscula con circunflejo.&ocirc;
	$String = str_replace("õ", "&#245;", $String); //o minúscula con tilde.&otilde;
	$String = str_replace("ö", "&#246;", $String); //o minúscula con diéresis.&ouml;
	$String = str_replace("ø", "&#248;", $String); //o minúscula con barra inclinada.&oslash;
	$String = str_replace("ù", "&#249;", $String); //u minúscula con acento grave.&ugrave;
	$String = str_replace("ú", "&#250;", $String); //u minúscula con acento agudo.&uacute;
	$String = str_replace("û", "&#251;", $String); //u minúscula con circunflejo.&ucirc;
	$String = str_replace("ü", "&#252;", $String); //u minúscula con diéresis.&uuml;
	$String = str_replace("ý", "&#253;", $String); //y minúscula con acento agudo.&yacute;
	$String = str_replace("þ", "&#254;", $String); //thorn minúscula.&thorn;
	$String = str_replace("ÿ", "&#255;", $String); //y minúscula con diéresis.&yuml;
	$String = str_replace("Œ", "&#338;", $String); //OE Mayúscula.&OElig;
	$String = str_replace("œ", "&#339;", $String); //oe minúscula.&oelig;
	$String = str_replace("Ÿ", "&#376;", $String); //Y mayúscula con diéresis.&Yuml;
	$String = str_replace("ˆ", "&#710;", $String); //Acento circunflejo.&circ;
	$String = str_replace("˜", "&#732;", $String); //Tilde.&tilde;
	$String = str_replace("–", "&#8211;", $String); //Guiún corto.&ndash;
	$String = str_replace("—", "&#8212;", $String); //Guiún largo.&mdash;
	$String = str_replace("'", "&#8216;", $String); //Comilla simple izquierda.&lsquo;
	$String = str_replace("'", "&#8217;", $String); //Comilla simple derecha.&rsquo;
	$String = str_replace("‚", "&#8218;", $String); //Comilla simple inferior.&sbquo;
	$String = str_replace("\"", "&#8221;", $String); //Comillas doble derecha.&rdquo;
	$String = str_replace("\"", "&#8222;", $String); //Comillas doble inferior.&bdquo;
	$String = str_replace("†", "&#8224;", $String); //Daga.&dagger;
	$String = str_replace("‡", "&#8225;", $String); //Daga doble.&Dagger;
	$String = str_replace("…", "&#8230;", $String); //Elipsis horizontal.&hellip;
	$String = str_replace("‰", "&#8240;", $String); //Signo de por mil.&permil;
	$String = str_replace("‹", "&#8249;", $String); //Signo izquierdo de una cita.&lsaquo;
	$String = str_replace("›", "&#8250;", $String); //Signo derecho de una cita.&rsaquo;
	$String = str_replace("€", "&#8364;", $String); //Euro.&euro;
	$String = str_replace("™", "&#8482;", $String); //Marca registrada.&trade;
	$String = str_replace(" & ", "&#38;", $String); //Marca registrada.&trade;
	return ($String);
}


function coversion_html_utf8($String)
{
	$String = str_replace("&#161;", "¡", $String); //Signo de exclamación abierta.&iexcl;
	$String = str_replace("&#162;", "¢", $String); //Signo de centavo.&cent;
	$String = str_replace("&#163;", "£", $String); //Signo de libra esterlina.&pound;
	$String = str_replace("&#164;", "¤", $String); //Signo monetario.&curren;
	$String = str_replace("&#165;", "¥", $String); //Signo del yen.&yen;
	$String = str_replace("&#166;", "¦", $String); //Barra vertical partida.&brvbar;
	$String = str_replace("&#167;", "§", $String); //Signo de sección.&sect;
	$String = str_replace("&#168;", "¨", $String); //Diéresis.&uml;
	$String = str_replace("&#169;", "©", $String); //Signo de derecho de copia.&copy;
	$String = str_replace("&#170;", "ª", $String); //Indicador ordinal femenino.&ordf;
	$String = str_replace("&#171;", "«", $String); //Signo de comillas francesas de apertura.&laquo;
	$String = str_replace("&#172;", "¬", $String); //Signo de negación.&not;
	$String = str_replace("&#173;", "", $String); //Guión separador de sílabas.&shy;
	$String = str_replace("&#174;", "®", $String); //Signo de marca registrada.&reg;
	$String = str_replace("&#175;", "¯", $String); //Macrón.&macr;
	$String = str_replace("&#176;", "°", $String); //Signo de grado.&deg;
	$String = str_replace("&#177;", "±", $String); //Signo de más-menos.&plusmn;
	$String = str_replace("&#178;", "²", $String); //Superíndice dos.&sup2;
	$String = str_replace("&#179;", "³", $String); //Superíndice tres.&sup3;
	$String = str_replace("&#180;", "´", $String); //Acento agudo.&acute;
	$String = str_replace("&#181;", "µ", $String); //Signo de micro.&micro;
	$String = str_replace("&#182;", "¶", $String); //Signo de calderón.&para;
	$String = str_replace("&#183;", "·", $String); //Punto centrado.&middot;
	$String = str_replace("&#184;", "¸", $String); //Cedilla.&cedil;
	$String = str_replace("&#185;", "¹", $String); //Superíndice 1.&sup1;
	$String = str_replace("&#186;", "º", $String); //Indicador ordinal masculino.&ordm;
	$String = str_replace("&#187;", "»", $String); //Signo de comillas francesas de cierre.&raquo;
	$String = str_replace("&#188;", "¼", $String); //Fracción vulgar de un cuarto.&frac14;
	$String = str_replace("&#189;", "½", $String); //Fracción vulgar de un medio.&frac12;
	$String = str_replace("&#190;", "¾", $String); //Fracción vulgar de tres cuartos.&frac34;
	$String = str_replace("&#191;", "¿", $String); //Signo de interrogación abierta.&iquest;
	$String = str_replace("&#215;", "×", $String); //Signo de multiplicación.&times;
	$String = str_replace("&#247;", "÷", $String); //Signo de división.&divide;
	$String = str_replace("&#192;", "À", $String); //A mayúscula con acento grave.&Agrave;
	$String = str_replace("&#193;", "Á", $String); //A mayúscula con acento agudo.&Aacute;
	$String = str_replace("&#194;", "Â", $String); //A mayúscula con circunflejo.&Acirc;
	$String = str_replace("&#195;", "Ã", $String); //A mayúscula con tilde.&Atilde;
	$String = str_replace("&#196;", "Ä", $String); //A mayúscula con diéresis.&Auml;
	$String = str_replace("&#197;", "Å", $String); //A mayúscula con círculo encima.&Aring;
	$String = str_replace("&#198;", "Æ", $String); //AE mayúscula.&AElig;
	$String = str_replace("&#199;", "Ç", $String); //C mayúscula con cedilla.&Ccedil;
	$String = str_replace("&#200;", "È", $String); //E mayúscula con acento grave.&Egrave;
	$String = str_replace("&#201;", "É", $String); //E mayúscula con acento agudo.&Eacute;
	$String = str_replace("&#202;", "Ê", $String); //E mayúscula con circunflejo.&Ecirc;
	$String = str_replace("&#203;", "Ë", $String); //E mayúscula con diéresis.&Euml;
	$String = str_replace("&#204;", "Ì", $String); //I mayúscula con acento grave.&Igrave;
	$String = str_replace("&#205;", "Í", $String); //I mayúscula con acento agudo.&Iacute;
	$String = str_replace("&#206;", "Î", $String); //I mayúscula con circunflejo.&Icirc;
	$String = str_replace("&#207;", "Ï", $String); //I mayúscula con diéresis.&Iuml;
	$String = str_replace("&#208;", "Ð", $String); //ETH mayúscula.&ETH;
	$String = str_replace("&#209;", "Ñ", $String); //N mayúscula con tilde.&Ntilde;
	$String = str_replace("&#210;", "Ò", $String); //O mayúscula con acento grave.&Ograve;
	$String = str_replace("&#211;", "Ó", $String); //O mayúscula con acento agudo.&Oacute;
	$String = str_replace("&#212;", "Ô", $String); //O mayúscula con circunflejo.&Ocirc;
	$String = str_replace("&#213;", "Õ", $String); //O mayúscula con tilde.&Otilde;
	$String = str_replace("&#214;", "Ö", $String); //O mayúscula con diéresis.&Ouml;
	$String = str_replace("&#216;", "Ø", $String); //O mayúscula con barra inclinada.&Oslash;
	$String = str_replace("&#217;", "Ù", $String); //U mayúscula con acento grave.&Ugrave;
	$String = str_replace("&#218;", "Ú", $String); //U mayúscula con acento agudo.&Uacute;
	$String = str_replace("&#219;", "Û", $String); //U mayúscula con circunflejo.&Ucirc;
	$String = str_replace("&#220;", "Ü", $String); //U mayúscula con diéresis.&Uuml;
	$String = str_replace("&#221;", "Ý", $String); //Y mayúscula con acento agudo.&Yacute;
	$String = str_replace("&#222;", "Þ", $String); //Thorn mayúscula.&THORN;
	$String = str_replace("&#223;", "ß", $String); //S aguda alemana.&szlig;
	$String = str_replace("&#224;", "à", $String); //a minúscula con acento grave.&agrave;
	$String = str_replace("&#225;", "á", $String); //a minúscula con acento agudo.&aacute;
	$String = str_replace("&#226;", "â", $String); //a minúscula con circunflejo.&acirc;
	$String = str_replace("&#227;", "ã", $String); //a minúscula con tilde.&atilde;
	$String = str_replace("&#228;", "ä", $String); //a minúscula con diéresis.&auml;
	$String = str_replace("&#229;", "å", $String); //a minúscula con círculo encima.&aring;
	$String = str_replace("&#230;", "æ", $String); //ae minúscula.&aelig;
	$String = str_replace("&#231;", "ç", $String); //c minúscula con cedilla.&ccedil;
	$String = str_replace("&#232;", "è", $String); //e minúscula con acento grave.&egrave;
	$String = str_replace("&#233;", "é", $String); //e minúscula con acento agudo.&eacute;
	$String = str_replace("&#234;", "ê", $String); //e minúscula con circunflejo.&ecirc;
	$String = str_replace("&#235;", "ë", $String); //e minúscula con diéresis.&euml;
	$String = str_replace("&#236;", "ì", $String); //i minúscula con acento grave.&igrave;
	$String = str_replace("&#237;", "í", $String); //i minúscula con acento agudo.&iacute;
	$String = str_replace("&#238;", "î", $String); //i minúscula con circunflejo.&icirc;
	$String = str_replace("&#239;", "ï", $String); //i minúscula con diéresis.&iuml;
	$String = str_replace("&#240;", "ð", $String); //eth minúscula.&eth;
	$String = str_replace("&#241;", "ñ", $String); //n minúscula con tilde.&ntilde;
	$String = str_replace("&#242;", "ò", $String); //o minúscula con acento grave.&ograve;
	$String = str_replace("&#243;", "ó", $String); //o minúscula con acento agudo.&oacute;
	$String = str_replace("&#244;", "ô", $String); //o minúscula con circunflejo.&ocirc;
	$String = str_replace("&#245;", "õ", $String); //o minúscula con tilde.&otilde;
	$String = str_replace("&#246;", "ö", $String); //o minúscula con diéresis.&ouml;
	$String = str_replace("&#248;", "ø", $String); //o minúscula con barra inclinada.&oslash;
	$String = str_replace("&#249;", "ù", $String); //u minúscula con acento grave.&ugrave;
	$String = str_replace("&#250;", "ú", $String); //u minúscula con acento agudo.&uacute;
	$String = str_replace("&#251;", "û", $String); //u minúscula con circunflejo.&ucirc;
	$String = str_replace("&#252;", "ü", $String); //u minúscula con diéresis.&uuml;
	$String = str_replace("&#253;", "ý", $String); //y minúscula con acento agudo.&yacute;
	$String = str_replace("&#254;", "þ", $String); //thorn minúscula.&thorn;
	$String = str_replace("&#255;", "ÿ", $String); //y minúscula con diéresis.&yuml;
	$String = str_replace("&#338;", "Œ", $String); //OE Mayúscula.&OElig;
	$String = str_replace("&#339;", "œ", $String); //oe minúscula.&oelig;
	$String = str_replace("&#376;", "Ÿ", $String); //Y mayúscula con diéresis.&Yuml;
	$String = str_replace("&#710;", "ˆ", $String); //Acento circunflejo.&circ;
	$String = str_replace("&#732;", "˜", $String); //Tilde.&tilde;
	$String = str_replace("&#8211;", "–", $String); //Guiún corto.&ndash;
	$String = str_replace("&#8212;", "—", $String); //Guiún largo.&mdash;
	$String = str_replace("&#8216;", "'", $String); //Comilla simple izquierda.&lsquo;
	$String = str_replace("&#8217;", "'", $String); //Comilla simple derecha.&rsquo;
	$String = str_replace("&#8218;", "‚", $String); //Comilla simple inferior.&sbquo;
	$String = str_replace("&#8221;", "\"", $String); //Comillas doble derecha.&rdquo;
	$String = str_replace("&#8222;", "\"", $String); //Comillas doble inferior.&bdquo;
	$String = str_replace("&#8224;", "†", $String); //Daga.&dagger;
	$String = str_replace("&#8225;", "‡", $String); //Daga doble.&Dagger;
	$String = str_replace("&#8230;", "…", $String); //Elipsis horizontal.&hellip;
	$String = str_replace("&#8240;", "‰", $String); //Signo de por mil.&permil;
	$String = str_replace("&#8249;", "‹", $String); //Signo izquierdo de una cita.&lsaquo;
	$String = str_replace("&#8250;", "›", $String); //Signo derecho de una cita.&rsaquo;
	$String = str_replace("&#8364;", "€", $String); //Euro.&euro;
	$String = str_replace("&#8482;", "™", $String); //Marca registrada.&trade;
	$String = str_replace("&#38;", "&", $String); //Marca registrada.&trade;
	return ($String);
}

function correccion_tildes($String)
{
	$String = str_replace("á", "&aacute;", $String); //a minúscula con acento agudo.&aacute;
	$String = str_replace("é", "&eacute;", $String); //e minúscula con acento agudo.&eacute;
	$String = str_replace("í", "&iacute;", $String); //i minúscula con acento agudo.&iacute;
	$String = str_replace("ó", "&oacute;", $String); //o minúscula con acento agudo.&oacute;
	$String = str_replace("ú", "&uacute;", $String); //u minúscula con acento agudo.&uacute;
	$String = str_replace("ñ", "&ntilde;", $String); //n minúscula con tilde.&ntilde;
	$String = str_replace("Á", "&Aacute", $String); //A mayúscula con acento agudo.&Aacute;
	$String = str_replace("É", "&Eacute", $String); //E mayúscula con acento agudo.&Eacute;
	$String = str_replace("Í", "&Iacute", $String); //I mayúscula con acento agudo.&Iacute;
	$String = str_replace("Ó", "&Oacute", $String); //O mayúscula con acento agudo.&Oacute;
	$String = str_replace("Ú", "&Uacute", $String); //U mayúscula con acento agudo.&Uacute;
	$String = str_replace("Ñ", "&Ntilde", $String); //N mayúscula con tilde.&Ntilde;
	return ($String);
}



function con_acciones_reg($interfaz_man, $id_reg, $editar_interfaz, $eliminar_interfaz, $interfaz_con)
{
	echo "<ul>";
	if ($editar_interfaz == 1) {
		echo "<li><a href='#' onClick='enviar_edicion(\"$interfaz_man\",\"$id_reg\",\" \")'>Detalles</a></li>";
	}
	if ($eliminar_interfaz == 1) {
		echo "<li><a href='#' onClick='consulta_eliminacion(\"$interfaz_con\",\"$id_reg\")' >Eliminar</a></li>";
	}
	echo "</ul> ";
}



function con_acciones_reg_esp($interfaz_man, $id_reg, $editar_interfaz, $eliminar_interfaz, $interfaz_con, $id_maestra)
{
	echo "<ul>";
	if ($editar_interfaz == 1) {
		echo "<li><a href='#' onClick='enviar_edicion(\"$interfaz_man\",\"$id_reg\",\" \")'>Detalles</a></li>";
	}
	if ($eliminar_interfaz == 1) {
		echo "<li><a href='#' onClick='consulta_eliminacion(\"$interfaz_con\",\"$id_maestra\")' >Eliminar</a></li>";
	}
	echo "</ul> ";
}


function con_acciones_reg_diapositiva($interfaz_man, $id_reg, $editar_interfaz, $eliminar_interfaz, $interfaz_con)
{
	echo "<ul>";
	if ($editar_interfaz == 1) {
		echo "<li><a href='#' onClick='enviar_edicion(\"$interfaz_man\",\"0\",\" \")'>Crear Diapositiva</a></li>";
	}
	if ($eliminar_interfaz == 1) {
		echo "<li><a href='#' onClick='consulta_eliminacion(\"$interfaz_con\",\"$id_reg\")' >Eliminar</a></li>";
	}
	echo "</ul> ";
}



function con_acciones_reg_gen($interfaz_man, $id_reg, $editar_interfaz, $eliminar_interfaz, $interfaz_con)
{
	if ($editar_interfaz == 1) {
		echo " onClick='enviar_edicion(\"$interfaz_man\",\"$id_reg\",\" \")' ";
	}
}



function buscar_ajax($case_bus)
{
	echo "
<script language='javascript'>
$(document).ready(function() {
	marcar_filar()
	 $('#caja_busqueda').autocomplete('ajax/libajax.php', {
                matchContains: true,
				extraParams:{ funcion:\"$case_bus\" },
                mustMatch: true,
				width: 300,
                minChars: 2,
                //selectFirst: true,
				autoFill:true,
				max:15,
				mustMatch:true
        }); 
	$('#caja_busqueda').result(function(event, data, formatted) {
		   if(data){
				var i=0;
		   }
	});
});
</script>";
}


function buscador_consulta($ruta, $valor, $valor_session = "")
{
	echo "
	<input type='text' placeholder='Buscar'  id='caja_busqueda' value='$valor'/>
	<input type='button' value='buscar'  id='bot_buscar_lupa'  onClick='buscar_ruta(\"$ruta\");' />
	<input type='hidden' class='input_text'  id='caja_busqueda_envio' name='caja_busqueda_envio' value='$valor'/>
";
}

function buscador_consulta_oculto($ruta, $valor)
{
	echo "	
<p class='busqueda'>
	<input type='text' class='input_text'  id='caja_busqueda'/>
	<input type='hidden' class='input_text'  id='caja_busqueda_envio' value='$valor'/>
	<input type='button'  id='bot_buscar_lupa'  onClick='buscar_ruta(\"$ruta\");' />
</p>	
";
}



function formato_fecha($fecha, $op)
{ // nombre_dia |  nombre_mes | dia | mes | ano  

	if (!empty($fecha) and !empty($op)) {
		$ano = (int) substr($fecha, 0, 4);
		$mes = (int) substr($fecha, 5, 2);
		$dia = (int) substr($fecha, 8, 2);
		setlocale(LC_ALL, "es_ES");
		$nombre_mes = strftime("%B", mktime(0, 0, 0, $mes, 1, 2000));
		$dia_nombre = date("l", strtotime($fecha));
		if ($dia == "Monday") $dia_nombre = "lunes";
		if ($dia == "Tuesday") $dia_nombre = "martes";
		if ($dia == "Wednesday") $dia_nombre = "miercoles";
		if ($dia == "Thursday") $dia_nombre = "jueves";
		if ($dia == "Friday") $dia_nombre = "viernes";
		if ($dia == "Saturday") $dia_nombre = "sabado";
		if ($dia == "Sunday") $dia_nombre = "domingo";
		if ($op == "nombre_dia")
			$dato = $dia_nombre;

		if ($op == "nombre_mes")
			$dato = $nombre_mes;

		if ($op == "dia")
			if ($dia > 0 and $dia < 10)
				$dato = "0" . $dia;
			else
				$dato = $dia;

		if ($op == "mes")
			if ($mes > 0 and $mes < 10)
				$dato = "0" . $mes;
			else
				$dato = $mes;
		if ($op == "ano")
			$dato = $ano;

		return $dato;
	} else
		return $dato = "";
}
function formato_fecha2($fecha, $op, $idioma)
{ // nombre_dia |  nombre_mes | dia | mes | ano  // idioma=en o es

	if (!empty($fecha) and !empty($op)) {
		$ano = (int) substr($fecha, 0, 4);
		$mes = (int) substr($fecha, 5, 2);
		$dia = (int) substr($fecha, 8, 2);
		if ($idioma == "es")
			setlocale(LC_TIME, 'spanish');
		if ($idioma == "en")
			setlocale(LC_TIME, 'US');
		$nombre_mes = strftime("%B", mktime(0, 0, 0, $mes, 1, 2000));
		$dia_nombre = date("l", strtotime($fecha));
		if ($dia == "Monday") $dia_nombre = "lunes";
		if ($dia == "Tuesday") $dia_nombre = "martes";
		if ($dia == "Wednesday") $dia_nombre = "miercoles";
		if ($dia == "Thursday") $dia_nombre = "jueves";
		if ($dia == "Friday") $dia_nombre = "viernes";
		if ($dia == "Saturday") $dia_nombre = "sabado";
		if ($dia == "Sunday") $dia_nombre = "domingo";
		if ($op == "nombre_dia")
			$dato = $dia_nombre;

		if ($op == "nombre_mes")
			$dato = $nombre_mes;

		if ($op == "dia")
			$dato = $dia;

		if ($op == "mes")
			$dato = $mes;

		if ($op == "ano")
			$dato = $ano;

		return $dato;
	} else
		return $dato = "";
}




function agregar_galeria($id_objeto, $ruta, $codigo)
{
	$db_gal = new Database();
	if ($codigo != "") {
		$sql = "SELECT * FROM d_galeria where id_gal_dga=$codigo  ";
		$db_gal->query($sql);
		while ($db_gal->next_row()) {
			$total_datos = $total_datos . "@@@" . $db_gal->img_dga . "&&&" . $db_gal->com_dga;
			$id_li = str_replace("img_dgal_", "", $db_gal->img_dga);
			$nombre_imagen = $db_gal->img_dga;
			$pie_foto = $db_gal->tit_dga;
			$galeria_html .= " <li id='$id_li' class='xxxx'>";
			$galeria_html .= " <a class='eliminar' title='Eliminar' onclick='descartar(\"$id_li\")'></a> ";
			$galeria_html .= " <a onclick='mostrar_pie(\"$nombre_imagen\", \"$nombre_imagen\" , \"$ruta/$nombre_imagen\" , \"text_pie_$id_li\" , \"text_pie_texto_$id_li\" )' href='#inline_gsl' class='editar fancybox2' title='Pie de foto'>Editar</a>  ";
			$galeria_html .= " <img src='$ruta/$nombre_imagen' title='$pie_foto' id='$nombre_imagen'>  ";
			$galeria_html .= " <input type='hidden' id='text_pie_texto_$id_li' value='$pie_foto'>   ";
			$galeria_html .= " </li>";
		}
	}

	echo "<input type='button' id='btn_$id_objeto' class='btn_editor_html' value='Adjuntar Imagenes' onclick='open_galeria(\"btn_$id_objeto\")'/>";
	echo "<textarea id='gal_datos' name='gal_datos' style='display:none'>$total_datos</textarea>";
	include("det_galeria.php");
}

function guardar_galeria($codigo, $fotos, $ruta_imagen1, $mini_ruta, $tam_rezi)
{
	$archivos_gal = preg_split("@@", $fotos);
	for ($i = 1; $i < count($archivos_gal); $i++) {
		copy("uploads_temp/" . $archivos_gal[$i], $ruta_imagen1 . $archivos_gal[$i]);
		@copiar_img($ruta_imagen1, $archivos_gal[$i], $mini_ruta, 120);
	}
}


function borrar_detalle($id, $tabla, $llave)
{
	$db = new Database();
	$sql = "delete from $tabla  where $llave='$id'  ";
	$db->query($sql);
}



function campo_archivo($nom_obj, $nom_obj_edicion, $valor_edicion, $ruta)
{
	if (!empty($valor_edicion) and file_exists($ruta . $valor_edicion)) {
		$datos_arc = explode(".", $valor_edicion);
		$nom_arc = explode("__", $valor_edicion);
		$nom_arc_fin = $nom_arc[1];
		$nombre_archivo = $ruta . $valor_edicion; // nombre archivo
		$peso_archivo = @filesize($nombre_archivo); // obtenemos su peso en bytes
		$peso_archivo = @tamano_archivo($peso_archivo);  // mo
		$fec_file = date("F d, Y - H:i:s", filemtime($nombre_archivo));
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='$valor_edicion' />";
		echo " <div class='container_imagen' id='img_contine_edicion_$nom_obj'>           <hr />
						<div class='left_content'>
							<a href='#' title='Eliminar' class='eliminar replaced_txt' onclick='eliminar_imagen(\"$nom_obj\",\"$nom_obj_edicion\")'>Eliminar</a>
							<a href='#' id='muestra_$nom_obj'  onclick='mostar_imagen(\"mostar\",\"$ruta/$valor_edicion\")'  title='Clic para ver la imagen original'>
							<img src='images/documento.png' width='70'></a>
						</div>
						<div class='right_content'>
							<ul>
								<li>Nombre: $nom_arc_fin</li>
								<li>Tama&ntilde;o: $peso_archivo</li>                            
								<li>&Uacute;ltima modificaci&oacute;n: $fec_file</li>
								<li class='descargar'   onclick='mostar_imagen(\"descargar\",\"$ruta/$valor_edicion\")' ><a href='#'>Descargar</a></li>
							</ul>
						</div>
						<div class='cleat_float'></div>
				  <hr />
				  </div>";
	} else {
		echo "<input type='file' name='$nom_obj' id='$nom_obj' class='boton' />";
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='$valor_edicion' />";
	}
}


function campo_archivo_esp($nom_obj, $nom_obj_edicion, $valor_edicion, $ruta, $id_documento = 0)
{
	$bandera = 0;
	if (file_exists($ruta . $valor_edicion) and !empty($valor_edicion)) {
		$bandera = 1;
		$datos_arc = explode(".", $valor_edicion);
		$nom_arc = explode("_", $valor_edicion);
		$nom_arc_fin = $nom_arc[1];
		$nombre_archivo = $ruta . $valor_edicion; // nombre archivo
		$peso_archivo = @filesize($nombre_archivo); // obtenemos su peso en bytes
		$peso_archivo = @tamano_archivo($peso_archivo);  // mo
		$fec_file = date("F d, Y - H:i:s", filemtime($nombre_archivo));
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='$valor_edicion' />";
		echo " <div class='container_imagen' id='img_contine_edicion_$nom_obj'>           <hr />
			   <div class='left_content'>
				<a href='#' title='Eliminar' class='eliminar replaced_txt' onclick='eliminar_imagen(\"$nom_obj\",\"$nom_obj_edicion\")'>Eliminar</a>
			<a href='#' id='muestra_$nom_obj'  onclick='mostar_imagen(\"mostar\",\"$ruta/$valor_edicion\")'  title='Clic para ver la imagen original'>
				<img src='images/documento.png' width='70'></a>
			</div>
			<div class='right_content'>
				<ul>					
					<li>Nombre: $nom_arc_fin</li>
					<li>Tama&ntilde;o: $peso_archivo</li>                            
					<li>&Uacute;ltima modificaci&oacute;n: $fec_file</li>
					<li class='descargar'   onclick='mostar_imagen(\"descargar\",\"$ruta/$valor_edicion\")' ><a href='#'>Descargar</a></li>
				</ul>
			</div>
			<div class='cleat_float'></div>
			 <hr />
			 </div>";
	} else {
		echo "<input type='file' name='$nom_obj' id='$nom_obj' class='boton' />";
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='link' />";
		echo "<input type='hidden' name='anexo_id_$id_documento' id='anexo_id_$id_documento'  value='$id_documento' />";
	}
}



function campo_archivo_jur($nom_obj, $nom_obj_edicion, $valor_edicion, $ruta, $id_documento = 0)
{
	$bandera = 0;
	if (file_exists($ruta . $valor_edicion) and !empty($valor_edicion)) {
		$bandera = 1;
		$datos_arc = explode(".", $valor_edicion);
		$nom_arc = explode("_", $valor_edicion);
		$nom_arc_fin = $nom_arc[1];
		$nombre_archivo = $ruta . $valor_edicion; // nombre archivo
		$peso_archivo = @filesize($nombre_archivo); // obtenemos su peso en bytes
		$peso_archivo = @tamano_archivo($peso_archivo);  // mo
		$fec_file = date("F d, Y - H:i:s", filemtime($nombre_archivo));
		$extencion = tipo_extension($valor_edicion);
		echo "<input type='hidden' name='$nom_obj_edicion' id='$nom_obj_edicion'  value='$valor_edicion' />";
		echo " <div class='container_imagen' id='img_contine_edicion_$nom_obj'>           <hr />
			   <div class='left_content'>
			
			<a href='#' id='muestra_$nom_obj'  onclick='mostar_imagen(\"mostar\",\"$ruta/$valor_edicion\")'  title='Clic para ver la imagen original'>
				<img src='images/extensiones/$extencion' width='70'></a>
			</div>
			<div class='right_content'>
				<ul>
					<li class='descargar'   onclick='mostar_imagen(\"descargar\",\"$ruta/$valor_edicion\")' ><a href='#'>Descargar</a></li>
				</ul>
			</div>
			<div class='cleat_float'></div>
			 <hr />
			 </div>";
	}
}

function tipo_extension($valor_edicion)
{
	$tam = count($valor_edicion);
	$dato = substr($valor_edicion, $tam - 5, 5);
	$dato_total = explode(".", $dato);
	$dato = $dato_total[1];
	$sql = "select nom_op_para from parametros where nom_para='extension' and val_op_para='$dato' ";
	$db = new Database();
	$db->query($sql);
	if ($db->next_row()) {
		$dato = $db->nom_op_para;
	}
	return $dato;
}


function agregar_detalles($nom_objeto, $sql_general, $sql_detalles, $codigo_relacion = 0)
{

	if (empty($codigo_relacion))
		$codigo_relacion = 0;

	echo "<a  href='barra_detalle_docs.php?refencia=datos_$nom_objeto' class='fancybox fancybox.iframe'>Agregar</a>";
	if ($codigo_relacion != '') {
		$db = new Database();
		$db->query($sql_detalles);
		while ($db->next_row()) {
			$valor = $valor . $db->valor . "@@";
		}
	}
	$todo_cod = $sql_general . "|@|@" . $sql_detalles . "|@|@" . $nom_objeto;
	echo "<input name='datos_$nom_objeto'  type='hidden' id='datos_$nom_objeto' value='$todo_cod' />";
	echo "<input name='$nom_objeto'  type='hidden' id='$nom_objeto' value='$valor' />";
}



function insertar_detalles($tabla, $compos, $valores)
{
	$sql = "insert into $tabla ($compos) values ($valores) ";
	$db = new Database();
	$db->query($sql);
}


function borrar_detalles($tabla, $col_llave, $codigo)
{
	$db = new Database();
	$sql = "DELETE FROM  $tabla  WHERE $col_llave = $codigo ";
	$db->query($sql);
}


/*
function insertar_registros_det($tabla,$compos,$valores,$interfaz) {
	$complemto_campos=", fec_crea, usu_acce, reg_eli , fec_modif ";
	$complemto_datos=",'".date("Y-m-d h:i:s")."', '".$_SESSION["global"][2]."', '0', '".date("Y-m-d h:i:s")."' ";
	echo $sql="insert into $tabla ($compos $complemto_campos) values ($valores $complemto_datos) ";
	$db33= new  Database();
	$db33->query($sql);
}*/


function insertar_registros_det($tabla, $compos, $valores, $interfaz)
{
	$complemto_campos = ", fec_crea, usu_acce, reg_eli , fec_modif ";
	$complemto_datos = ",'" . date("Y-m-d h:i:s") . "', '" . $_SESSION["global"][2] . "', '0', '" . date("Y-m-d h:i:s") . "' ";
	$sql = "insert into $tabla ($compos $complemto_campos) values ($valores $complemto_datos) ";
	//echo "----";
	$db33 = new Database();
	$db33->query($sql);
	//echo $db33->insert_id();
	return $db33->insert_id();
}




function geturl_red($red, $tit = "", $descipcion = "", $imagen = "")
{
	$domain = $_SERVER['HTTP_HOST'];
	$url = "http://" . $domain . $_SERVER['REQUEST_URI'];
	$url = str_replace("&idi=es", "", $url);
	$url = str_replace("&idi=en", "", $url);
	$imagen = "http://www.womenslinkworldwide.org/wlw/sitio/administrador/doc_casos/" . $imagen;
	$titulo = $tit;
	$descipcion = correcion_html_utf8($descipcion);

	if ($red == "facebook") {
		$mensaje_red = "http://www.facebook.com/sharer.php?s=100&&p[title]=$titulo&&p[url]=$url&&p[images][0]=$imagen&&p[summary]=$descipcion";
	}


	if ($red == "twitter") {
		$mensaje_red = "http://twitter.com/home?status=$url ";
	}

	return $mensaje_red;
}



function geturl_red_com($red, $tit = "", $descipcion = "", $imagen = "")
{

	$domain = $_SERVER['HTTP_HOST'];
	$url = "http://" . $domain . $_SERVER['REQUEST_URI'];
	$imagen = "http://www.womenslinkworldwide.org/wlw/sitio/administrador/doc_casos/" . $imagen;
	$titulo = $tit;
	$descipcion = correcion_html_utf8($descipcion);

	if ($red == "facebook") {
		$mensaje_red = "http://www.facebook.com/sharer.php?s=100&&p[title]=$titulo&&p[url]=$url&&p[images][0]=$imagen&&p[summary]=$descipcion";
	}


	if ($red == "twitter") {
		$mensaje_red = "http://twitter.com/home?status=idi=en&" . $_SERVER['REQUEST_URI'] . "";
	}

	return $mensaje_red;
}


function contador_casos($caso)
{
	$db = new Database();
	$sql = " SELECT vis_cas as total  FROM caso   WHERE id_cas='$caso' ";
	$db->query($sql);
	if ($db->next_row()) {
		$total = $db->total + 1;
	}
	$sql = "UPDATE caso  SET vis_cas=$total  WHERE id_cas='$caso' ";
	$db->query($sql);
}



function geturl($datos)
{
	$domain = $_SERVER['HTTP_HOST'];
	$url = "http://" . $domain . $_SERVER['REQUEST_URI'] . "?" . $datos;
	return $url;
}



function html_guardar($html)
{
	$html_temp = str_replace("\"", "@**@", $html);
	$html_temp = str_replace("'", "*@@*", $html_temp);
	return $html_temp;
}


function html_leer($html)
{
	$html_temp = str_replace("@**@", "\"", $html);
	$html_temp = str_replace("*@@*", "'", $html_temp);
	return $html_temp;
}


function getCurrentUrl()
{
	$domain = $_SERVER['HTTP_HOST'];
	$url = "http://" . $domain . $_SERVER['REQUEST_URI'];
	$url = str_replace("&idi=es", "", $url);
	$url = str_replace("&idi=en", "", $url);
	return $url;
}

function video_image($url)
{
	$image_url = parse_url($url);
	if ($image_url['host'] == 'www.youtube.com' || $image_url['host'] == 'youtube.com') {
		$array = explode("&", $image_url['query']);
		return "http://img.youtube.com/vi/" . substr($array[0], 2) . "/0.jpg";
	} else if ($image_url['host'] == 'www.vimeo.com' || $image_url['host'] == 'vimeo.com') {
		$hash = unserialize(file_get_contents("http://vimeo.com/api/v2/video/" . substr($image_url['path'], 1) . ".php"));
		return $hash[0]["thumbnail_large"];
	}
}



function fb_comment_count($url, $id_caso)
{
	$url = str_replace("&idi=es", "", $url);
	$url = str_replace("&idi=en", "", $url);
	$url = str_replace("&#comentario", "", $url);
	$url = str_replace("&#imagenes", "", $url);
	$url = str_replace("#vinculos", "", $url);
	$url = str_replace("#video", "", $url);
	$url = str_replace("&", "", $url);
	$json = json_decode(file_get_contents('https://graph.facebook.com/?ids=' . $url));
	$cantidad_comentarios = ($json->$url->comments) ? $json->$url->comments : 0;
	actua_count_comnetario($cantidad_comentarios, $id_caso);
}


function actua_count_comnetario($cantidad_comentarios, $id_caso)
{
	$db = new Database();
	$sql = "select * from  caso  where id_cas='$id_caso' ";
	$db->query($sql);
	if ($db->next_row()) {
		$cantidad_anterior = $db->com_face_cas;
	}
	if ($cantidad_anterior < $cantidad_comentarios) {
		$sql = "update  caso  set com_face_cas= '$cantidad_comentarios'  where id_cas='$id_caso' ";
		$db->query($sql);
	}
}


function limitar_texto($cadena, $tamano)
{
	if (strlen($cadena) > $tamano) {
		$cadena = substr($cadena, 0, $tamano);
		return $cadena . " [...]";
	} else {
		return $cadena;
	}
}

function combo_tabla($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $filtro = "", $orden = "")
{
	$db = new Database();
	if ($filtro !== "") $filtro = " and " . $filtro;
	$sql = "select * from " . $tabla . " where reg_eli=0   $filtro  $orden ";
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT'>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . coversion_html_utf8($db->$nombre) . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . coversion_html_utf8($db->$nombre) . "</option>";
	}
	echo "</select>";
	$db->close();
}


function combo_tabla_renualt($nombre_obj, $tabla, $valor, $nombre, $valor_edicion, $filtro = "", $orden = "")
{
	$db = new Database();
	if ($filtro !== "") $filtro = " and " . $filtro;
	$sql = "select * from " . $tabla . " where reg_eli=0   $filtro  $orden  ";
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT'>";
	while ($db->next_row()) {
		if ($valor_edicion == $db->$valor)
			echo " <option value=" . $db->$valor . " selected='selected'>" . pcadena($db->$nombre) . "</option>";
		//else
		//	 echo" <option value=".$db->$valor.">".pcadena($db->$nombre)."</option>";
	}
	echo "</select>";
	$db->close();
}

function desc_extencion($archivo)
{
	$aux = explode(".", $archivo);
	$total = count($aux) - 1;
	$extension_archivo = $aux[$total];
	$clase_botton_ori = "es_7";
	if ($extension_archivo == "docx" or $extension_archivo == "doc") $clase_botton_ori = "es_1";
	if ($extension_archivo == "pdf") $clase_botton_ori = "es_3";
	if ($extension_archivo == "JPG" or $extension_archivo == "jpg" or $extension_archivo == "jpeg" or $extension_archivo == "bmp") $clase_botton_ori = "es_10";
	return $clase_botton_ori;
}



function liquida_mante($modelo, $kilometraje, $conce)
{
	$db = new Database();
	$sql = "select * from precios_concesionario where id_mod_pre=$modelo and lbl_pre=$kilometraje and reg_eli=0 ";
	$db->query($sql);
	if ($db->next_row()) {
		$codigo_detalles = $db->id_pre;
		$tiempo_servicio = $db->tiem_pre;
	}

	//echo "<br>";
	$sql = "select sum(((qty_drep * val_drep)*1.16)) as total from detalle_precio where id_pre_dpre='$codigo_detalles'  and reg_eli=0";
	$db->query($sql);
	if ($db->next_row()) {
		$total_inventario = $db->total;
	}

	$sql = "select val_hora , com_con from consecionarios where id=$conce and reg_eli=0";
	$db->query($sql);
	if ($db->next_row()) {
		$valor_hora_conce = $db->val_hora;
		$valor_comision = $db->com_con;
	}

	$total_man_obra = ($tiempo_servicio * $valor_hora_conce);


	$total_man_obra = $total_man_obra * 1.16;
	$total_carro = $total_man_obra + $total_inventario;


	/*--parte de la comision-*/
	$porcentaje_total = $total_carro / 100;
	$porcentaje_total = $porcentaje_total * ($valor_comision);
	$total_carro = $total_carro + ($porcentaje_total);
	/*--parte de la comision-*/



	$temp = $total_carro / 1000;
	$decimales = explode(".", $temp);
	if ($decimales[1] == 0) {
		$total_carro = $decimales[0] * 1000;
	} else {
		$total_carro = ($decimales[0] + 1) * 1000;
	}


	return round($total_carro / 1000.0, 0) * 1000;
	//$redo= round ($num/1000.0,0)* 1000;
}




function buscar_idioma($espanol, $ingles, $idioma)
{

	if ($idioma == 'ingles') {
		return $ingles;
	} else
		return $espanol;
}



function traducir($idioma, $cadena)
{
	$cadena = correcion_html_utf8($cadena);
	$db = new Database();
	$db_aux = new Database();
	if ($idioma == "espanol") {
		$sql = "select * from label where ( es_lab LIKE _utf8 '$cadena' COLLATE utf8_general_ci ) and reg_eli=0 ";
		$db->query($sql);
		//echo $db->num_rows();
		if ($db->num_rows() > 0) {

			if ($db->next_row()) {
				echo $db->esp_lab;
			}
		} else {
			$db_aux->query("INSERT INTO `label` ( `es_lab` , esp_lab ) VALUES ( '$cadena' , '$cadena' ) ");
			$sql = "select * from label where ( es_lab LIKE _utf8 '%$cadena%' COLLATE utf8_general_ci ) and reg_eli=0 ";
			$db->query($sql);
			if ($db->num_rows() > 0) {
				//echo "******";
				echo $db->esp_lab;
			}
		}
	}

	if ($idioma == "ingles") {

		$sql = "select * from label where ( es_lab LIKE _utf8 '$cadena' COLLATE utf8_general_ci ) and reg_eli=0 ";
		//echo "<input type='text' value='$cadena'>";
		$db->query($sql);
		if ($db->next_row()) {
			echo $db->in_lab;
		}
	}
}





function combo_pais_idoma($nombre_obj, $valor_edicion, $idioma = "", $vento = "")
{
	if ($idioma == 'espanol' || $idioma == '')
		$campo = 'nom_pai';
	if ($idioma == 'ingles')
		$campo = 'nom_pai_ing';

	$db = new Database();
	$sql = "select * from pais  order by des_pai    desc   ";
	$db->query($sql);
	echo " <select name='" . $nombre_obj . "' id='" . $nombre_obj . "' class='SELECT'  $vento >";
	while ($db->next_row()) {

		//	if($valor_edicion==$db->$valor) 
		//		echo" <option value=".$db->$valor." selected='selected'>".coversion_html_utf8($db->$campo)."</option>";
		//	else
		echo " <option value=" . $db->id_pai . ">" . coversion_html_utf8($db->$campo) . "</option>";
	}
	echo "</select>";
	$db->close();
}








function inicio_formulario_acre()
{
	echo " <meta charset='UTF-8'>
<meta name='description' content='FICCI'>
<meta name='keywords' content='Cine, Cartagena'>
<meta name='viewport' content='user-scalable=no'>
<title>54º Festival Internacional de Cine de Cartagena de Indias</title>
<link rel='stylesheet' href='stylesheets/reset.css'><!-- Reset -->
<link rel='stylesheet' href='stylesheets/styles.css'><!-- Generales -->
<!-- Fuentes -->
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet prefetch' type='text/css'>

<script src='javascripts/jquery-1.8.1.min.js' type='text/javascript' ></script><!-- JQuery -->
<script src='javascripts/jquery-ui-1.8.23.custom.min.js' type='text/javascript'></script><!-- JQuery UI-->
<script src='http://code.jquery.com/ui/1.10.3/jquery-ui.js'></script>
<script src='javascripts/js.js'></script>
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js'></script>
<script src='http://malsup.github.com/jquery.form.js'></script>
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js'></script>
<script src='http://malsup.github.com/jquery.form.js'></script>
<script src='http://code.jquery.com/ui/1.10.3/jquery-ui.js'></script>
<link rel='stylesheet prefetch' href='http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css'>



<!--[if IE 8]>
	<link href='stylesheets/styleie8.css' rel='stylesheet'  />
<![endif]-->
<!--[if IE 9]>
    <link href='stylesheets/styleie9.css' rel='stylesheet' />
<![endif]-->
<!--[if IE]>
	<script>
    	document.createElement('header');		document.createElement('footer');        document.createElement('section');
        document.createElement('nav');          document.createElement('article');       document.createElement('figure');
        document.createElement('figcaption');   document.createElement('aside');
    </script>
<![endif]-->
";
}



function encode_this_get($string)
{
	$string = utf8_encode($string);
	$control = "protocolo"; //defino la llave para encriptar la cadena, cambiarla por la que deseamos usar
	$string = $control . $string . $control; //concateno la llave para encriptar la cadena
	$string = base64_encode($string); //codifico la cadena
	return ($string);
}



function decode_inscripcion($string)
{
	//echo "*******".$string;

	//$cad = preg_split("[?]",$string); //separo la url desde el ?
	//echo $string = $cad[1]; //capturo la url desde el separador ? en adelante
	//echo "= parte 1";
	//echo "---------";
	$string = base64_decode($string); //decodifico la cadena
	//echo $string."-------------";
	$control = "protocolo"; //defino la llave con la que fue encriptada la cadena,, cambiarla por la que deseamos usar
	$string = str_replace($control, "", "$string"); //quito la llave de la cadena	
	//procedo a dejar cada variable en el $_GET
	//$cad_get = preg_split("[&]",$string); //separo la url por &
	//foreach($cad_get as $value)
	//{
	//	$val_get = preg_split("[=]",$value); //asigno los valosres al GET
	//	$_REQUEST[$val_get[0]]=utf8_decode($val_get[1]);
	//}
	//
	return $string;
}



function decode_get2_get($string)
{

	$string = base64_decode($string); //decodifico la cadena
	//echo $string."-------------";
	$control = "protocolo"; //defino la llave con la que fue encriptada la cadena,, cambiarla por la que deseamos usar
	$string = str_replace($control, "", "$string"); //quito la llave de la cadena	
	//procedo a dejar cada variable en el $_GET
	$cad_get = preg_split("[&]", $string); //separo la url por &
	foreach ($cad_get as $value) {
		$val_get = preg_split("[=]", $value); //asigno los valosres al GET
		$_REQUEST[$val_get[0]] = utf8_decode($val_get[1]);
	}
}

function decode_get2_base($string)
{

	$string = base64_decode($string); //decodifico la cadena

	$control = "protocolo"; //defino la llave con la que fue encriptada la cadena,, cambiarla por la que deseamos usar
	$string = str_replace($control, "", "$string"); //quito la llave de la cadena
	return ($string);
}



function limpiarCadena($valor)
{
	$valor = str_ireplace("SELECT", "", $valor);
	$valor = str_ireplace("COPY", "", $valor);
	$valor = str_ireplace("DELETE", "", $valor);
	$valor = str_ireplace("DROP", "", $valor);
	$valor = str_ireplace("DUMP", "", $valor);
	$valor = str_ireplace("UNION", "", $valor);
	$valor = str_ireplace(" OR ", "", $valor);
	$valor = str_ireplace("%", "", $valor);
	$valor = str_ireplace("LIKE", "", $valor);
	$valor = str_ireplace("--", "", $valor);
	$valor = str_ireplace("^", "", $valor);
	$valor = str_ireplace("[", "", $valor);
	$valor = str_ireplace("]", "", $valor);
	$valor = str_ireplace("\\", "", $valor);
	$valor = str_ireplace("!", "", $valor);
	$valor = str_ireplace("¡", "", $valor);
	$valor = str_ireplace("?", "", $valor);
	$valor = str_ireplace("=", "", $valor);
	$valor = str_ireplace("&", "", $valor);
	return $valor;
}


function getCurrentUrlPaginado()
{
	$domain = $_SERVER['HTTP_HOST'];
	$url = "http://" . $domain . $_SERVER['REQUEST_URI'];
	$temp = explode("?p=", $url);
	$url = $temp[0];
	return $url;
}

function is_array_empty($mixed)
{
	if (is_array($mixed)) {
		foreach ($mixed as $value) {
			if (!is_array_empty($value)) {
				return false;
			}
		}
	} elseif (!empty($mixed)) {
		return false;
	}

	return true;
}
/*
$ruta_imagen="../images/galeria/";
$ruta_thumb="../images/galeria/thumbnail/";
$nombre_imagen_ori="52b855e69daed__DSC0468.jpg";
resizeCropImage(240,130,$ruta_imagen,$nombre_imagen_ori, $ruta_thumb);*/
function resizeCropImage($nw, $nh, $ruta_original, $nombre_archivo, $ruta_destino, $backcolor = array(0, 0, 0))
{

	$ruta_destino .= $nombre_archivo;
	$source = $ruta_original . $nombre_archivo;
	$size = getimagesize($source);
	$w = $size[0];
	$h = $size[1];

	$filename = $source;
	$size = getimagesize($filename);

	switch ($size['mime']) {
		case "image/gif":
			$simg = imagecreatefromgif($source);
			break;
		case "image/jpeg":
			$simg = imagecreatefromjpeg($source);
			break;
		case "image/png":
			$simg = imagecreatefrompng($source);
			break;
	}
	$dimg = imagecreatetruecolor($nw, $nh);
	$green = imagecolorallocate($dimg, $backcolor[0], $backcolor[1], $backcolor[2]);
	imagefilledrectangle($dimg, 0, 0, $nw, $nh, $green);
	$wm = $w / $nw;
	$hm = $h / $nh;
	$h_height = $nh / 2;
	$w_height = $nw / 2;
	if ($w > $h) {
		$adjusted_width = $w / $hm;
		$half_width = $adjusted_width / 2;
		$int_width = $half_width - $w_height;
		imagecopyresampled($dimg, $simg, -$int_width, 0, 0, 0, $adjusted_width, $nh, $w, $h);
	} elseif (($w < $h) || ($w == $h)) {

		$adjusted_height = $h / $wm;
		$half_height = $adjusted_height / 2;
		$int_height = $half_height - $h_height;
		imagecopyresampled($dimg, $simg, 0, -$int_height, 0, 0, $nw, $adjusted_height, $w, $h);
	} else {
		imagecopyresampled($dimg, $simg, 0, 0, 0, 0, $nw, $nh, $w, $h);
	}
	if ($ruta_destino != "")
		imagejpeg($dimg, $ruta_destino, 80);
	else
		return $dimg;
}
function combo_tabla_multi($nombre_obj, $tabla, $valor, $nombre, $tabla_rela, $cod_relacion, $cate_rel = "", $cod_interna, $cod_recu, $filtro = "", $orden = "", $cate = "", $id_int = "") //hay que usar el jquery chosen.js
{
	echo "<input type='hidden' name='" . $nombre_obj . "' id='" . $nombre_obj . "'>";
	$db = new Database();
	if ($cate_rel != "" and $cate != "") $categoria = " $cate_rel='$cate' and";
	if ($id_int == "") $id_int = "0";

	$sql = " select *  , ifnull(( SELECT   $cod_relacion FROM   $tabla_rela   where  $categoria $cod_interna=$valor and $cod_recu= '$id_int' limit 1) , 0 ) as existe  from $tabla where $tabla.reg_eli=0";

	$db->query($sql);

	echo " <select data-placeholder='Buscar' id='" . $nombre_obj . "' multiple class='" . $nombre_obj . "'>";
	while ($db->next_row()) {
		if ($db->existe != 0)
			echo " <option value=" . $db->$valor . " selected>" . limitar_texto(coversion_html_utf8($db->$nombre), 20) . "</option>";
		else
			echo " <option value=" . $db->$valor . ">" . limitar_texto(coversion_html_utf8($db->$nombre), 20) . "</option>";
	}
	echo "</select>";


	$db->close();


	echo "<script type='text/javascript'>
	$( document ).ready(function() {
		$('." . $nombre_obj . "').chosen({
			no_results_text:'Oops, nothing found!',
			varleo : '" . $tabla . "',
			clase_tipo: '" . $nombre_obj . "'
		  });
	});
	</script>";
}
function agregar_recurso($obj, $cod_cate, $categoria = "")
{
	borrar_recursos('relacion_logos', $cod_cate, "id_cat_rel", $categoria);
	if (!empty($_REQUEST[$obj])) {
		$campos = " id_cat_rel,	cat_rel,	id_log_rel,	ord_rel ";

		$id = preg_split("/&&\d@@/", $_REQUEST[$obj]); //apartir de 1
		for ($i = 1; $i < count($id); $i++) {
			$valores = " '" . $cod_cate . "','" . $categoria . "','" . $id[$i] . "','" . $i . "' ";
			$ultimo_iddet = insertar_registros_det("relacion_logos", $campos, $valores, $int_con);
		}
	}
}
function agregar_recurso2($obj, $cod_cate, $tabla, $cod_interna, $cod_recurso)
{
	borrar_recursos($tabla, $cod_cate, "cod_pel_rel", "");

	if (!empty($_REQUEST[$obj])) {
		$campos = " $cod_interna,$cod_recurso,ord_rel ";

		$id = preg_split("/&&\d@@/", $_REQUEST[$obj]); //apartir de 1
		for ($i = 1; $i < count($id); $i++) {
			$valores = " '" . $cod_cate . "','" . $id[$i] . "','" . $i . "' ";
			$ultimo_iddet = insertar_registros_det($tabla, $campos, $valores, $int_con);
		}
	}
}

function borrar_recursos($tabla, $cod_cate, $col_relacion, $campo = "")
{
	$db = new Database();
	if ($campo != "") $filtro = "and cat_rel='$campo'";
	else $filtro = "";
	$sql = "delete from $tabla  where $col_relacion='$cod_cate'  $filtro";
	$db->query($sql);
}
function obtener_extencion($archivo)
{
	$extension = explode(".", $archivo);
	$extension = end($extension);
	return $extension;
}
function limpiar_string($String)
{

	$String = str_replace("Á", "A", $String);
	$String = str_replace("À", "A", $String);
	$String = str_replace("É", "E", $String);
	$String = str_replace("È", "E", $String);
	$String = str_replace("Í", "I", $String);
	$String = str_replace("Ì", "I", $String);
	$String = str_replace("Ó", "O", $String);
	$String = str_replace("Ò", "O", $String);
	$String = str_replace("Ú", "U", $String);
	$String = str_replace("Ù", "U", $String);
	$String = str_replace("á", "a", $String);
	$String = str_replace("à", "a", $String);
	$String = str_replace("é", "e", $String);
	$String = str_replace("è", "e", $String);
	$String = str_replace("í", "i", $String);
	$String = str_replace("ì", "i", $String);
	$String = str_replace("ó", "o", $String);
	$String = str_replace("ò", "o", $String);
	$String = str_replace("ú", "u", $String);
	$String = str_replace("ù", "u", $String);
	$String = str_replace("Ä", "A", $String);
	$String = str_replace("Â", "A", $String);
	$String = str_replace("Ë", "E", $String);
	$String = str_replace("Ê", "E", $String);
	$String = str_replace("Ï", "I", $String);
	$String = str_replace("Ö", "O", $String);
	$String = str_replace("Ô", "O", $String);
	$String = str_replace("Ü", "U", $String);
	$String = str_replace("Û", "U", $String);
	$String = str_replace("ä", "a", $String);
	$String = str_replace("â", "a", $String);
	$String = str_replace("ë", "e", $String);
	$String = str_replace("ê", "e", $String);
	$String = str_replace("ï", "i", $String);
	$String = str_replace("î", "i", $String);
	$String = str_replace("ö", "o", $String);
	$String = str_replace("ü", "u", $String);
	$String = str_replace("û", "u", $String);
	$String = str_replace("å", "a", $String);
	$String = str_replace("Ñ", "N", $String);
	$String = str_replace("Õ", "O", $String);
	$String = str_replace("ã", "a", $String);
	$String = str_replace("ñ", "n", $String);
	$String = str_replace("Ý", "Y", $String);
	$String = str_replace("õ", "o", $String);
	$String = str_replace("ý", "y", $String);
	$String = str_replace(" ", "_", $String);
	$String = str_replace("[", "_", $String);
	$String = str_replace("]", "_", $String);
	$String = str_replace("(", "_", $String);
	$String = str_replace(")", "_", $String);
	$String = str_replace("^", "_", $String);

	//echo $String;;
	return ($String);
}
function enviar_correo($mensaje, $correo, $titulo)
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

function create_zip($files = array(), $destination, $overwrite = false, $ruta)
{

	//if the zip file already exists and overwrite is false, return false
	if (file_exists($destination) && !$overwrite) {
		return false;
	}
	//vars
	$valid_files = array();
	//if files were passed in...
	if (is_array($files)) {
		//cycle through each file
		foreach ($files as $file) {
			$file = $ruta . $file;
			//make sure the file exists
			if (file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}
	//if we have good files...
	if (count($valid_files)) {

		//create the archive
		$zip = new ZipArchive();
		if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {

			return false;
		}
		//add the files
		foreach ($valid_files as $file) {


			$zip->addFile($file, $file);
		}
		//debug
		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

		//close the zip -- done!
		$zip->close();

		//check to make sure the file exists
		return file_exists($destination);
	} else {
		return false;
	}
}

function resizeCropImagePorcentual($tmarca, $ruta_original, $nombre_archivo, $ruta_destino, $backcolor = array(0, 0, 0))
{

	$ruta_destino .= $nombre_archivo;
	$source = $ruta_original . $nombre_archivo;
	$size = getimagesize($source);
	$w = $size[0];
	$h = $size[1];

	$filename = $source;
	$size = getimagesize($filename);

	switch ($size['mime']) {
		case "image/gif":
			$simg = imagecreatefromgif($source);
			break;
		case "image/jpeg":
			$simg = imagecreatefromjpeg($source);
			break;
		case "image/png":
			$simg = imagecreatefrompng($source);
			break;
	}

	if ($h < $w) {
		$nh = ($h * $tmarca) / $w;
		$nw = $tmarca;
		round($nh);
	}
	if ($w < $h || ($w == $h)) {
		$nw = ($w * $tmarca) / $h;
		round($nw);
		$nh = $tmarca;
	}

	$dimg = imagecreatetruecolor($nw, $nh);
	$green = imagecolorallocate($dimg, $backcolor[0], $backcolor[1], $backcolor[2]);
	imagefilledrectangle($dimg, 0, 0, $nw, $nh, $green);
	//imagecopyresampled($dimg,$simg,-$int_width,0,0,0,$adjusted_width,$nh,$w,$h);
	imagecopyresampled($dimg, $simg, 0, 0, 0, 0, $nw, $nh, $w, $h);
	if ($ruta_destino != "")
		imagejpeg($dimg, $ruta_destino, 80);
	else
		return $dimg;
}

function menu($tabla = "")
{
	if (empty($tabla)) $tabla = "menu";
	$sql = "select * from $tabla where pad_men=0 and reg_eli=0 order by ord_men asc";
	$menu = new DataBase();
	$menu->query($sql);
	echo "<ul>";
	$nivel = 0;
	while ($menu->next_row()) {
		if ($menu->num_rows() > 0) {
			echo "<li><a href='" . $menu->url_men . "'><span>" . $menu->tit_men . "</span></a>";
			menu_hijos($menu->cod_men, $nivel + 1, $tabla);
			echo "</li>";
		}
	}
	echo "</ul>";
}
function menu_hijos($padre, $nivel, $tabla)
{
	$sql = "SELECT a.cod_men,a.tit_men,a.url_men,Cuenta.Count from " . $tabla . " a LEFT OUTER JOIN (SELECT pad_men, COUNT(*) AS Count FROM " . $tabla . " WHERE reg_eli=0 GROUP BY pad_men ORDER BY ord_men ASC) Cuenta ON a.cod_men=Cuenta.pad_men WHERE a.pad_men=" . $padre . " and reg_eli=0 ORDER BY ord_men ASC";
	$sub_menu = new DataBase();
	$sub_menu->query($sql);
	echo "<ul>";
	while ($sub_menu->next_row()) {
		if ($sub_menu->num_rows() > 0) {
			echo "<li><a href='" . $sub_menu->url_men . "'>" . $sub_menu->tit_men . "</a>";
			menu_hijos($sub_menu->cod_men, $nivel + 1, $tabla);
			echo "</li>";
		}
	}
	echo "</ul>";
}

function buscar_campo($columna, $interfaz, $orden)
{

	if (empty($orden)) $orden = "1";
	if (empty($columna)) $orden = "1";

	if ($orden == 1) $orden = "DESC";
	else $orden = "ASC";

	if ($interfaz == 'c_trabajos') {
		if ($columna == 1) return " ORDER BY cod_tra $orden";
		if ($columna == 2) return " ORDER BY nombre_reg $orden";
		if ($columna == 4) return " ORDER BY titulo_tra $orden";
		if ($columna == 5) return " ORDER BY medio_tra $orden";
		if ($columna == 6) return " ORDER BY nom_cat $orden";
		if ($columna == 8) return " ORDER BY nom_mun $orden";
	}
}

function conteo_registro_sql($tabla, $condicion)
{

	$db = new Database();
	$sql = "SELECT * FROM  $tabla  WHERE reg_eli!=1 $condicion";
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}



function validar_ingreso_clave($codigo, $pass)
{
	$db = new Database();
	echo $sql = "SELECT * FROM  usuario WHERE spas='$pass' and cod_usu=$codigo and reg_eli!=1";
	exit;
	$db->query($sql);
	if ($db->num_rows() > 0) {
		while ($db->next_row()) {
			echo "1";
			auditoria("loginfrontclave", 10, $sql, 0, 0);
		}
	} else
		echo "0";
}

function upload_image($nombre_archivo, $ruta)
{
	$nombre_archivo_1 = limpiar_string($nombre_archivo['name']);
	$un = uniqid();
	$nombre_archivo_1 = $un . "__" . $nombre_archivo_1;


	// Hacemos una condicion en la que solo permitiremos que se suban imagenes y que sean menores a 20 KB
	if ((($nombre_archivo["type"] == "image/png") || ($nombre_archivo["type"] == "image/jpeg") || ($nombre_archivo["type"] == "application/pdf"))) {

		//Si es que hubo un error en la subida, mostrarlo, de la variable $_FILES podemos extraer el valor de [error], que almacena un valor booleano (1 o 0).
		if ($nombre_archivo["error"] > 0) {
			$nombre_archivo["error"] . "<br />";
		} else {
			// Si no hubo ningun error, hacemos otra condicion para asegurarnos que el archivo no sea repetido
			if (file_exists($ruta . $nombre_archivo_1)) {
				$nombre_archivo_1 . " ya existe. ";
			} else {
				// Si no es un archivo repetido y no hubo ningun error, procedemos a subir a la carpeta /archivos, seguido de eso mostramos la imagen subida
				move_uploaded_file(
					$nombre_archivo["tmp_name"],
					$ruta . $nombre_archivo_1
				);


				return $nombre_archivo_1;
			}
		}
	} else {
		// Si el usuario intenta subir algo que no es una imagen o una imagen que pesa mas de 20 KB mostramos este mensaje

	}
}

function nombre_registro_sql($tabla, $campo, $condicion)
{

	$db = new Database();
	$sql = "SELECT $campo as name FROM  $tabla  WHERE reg_eli!=1 $condicion";
	$db->query($sql);
	$db->next_row();
	return $db->name;
	$db->close();
}

function cambiar_password_usu()
{
	$valores = "  pas_usu='" . $_REQUEST["con_1"] . "',  spas='" . md5($_REQUEST["con_1"]) . "' ";

	$respuesta = editar_registro("usuario", $valores, "cod_usu", $_REQUEST["id_usuario"], "");
	return $respuesta;
}

function estado_trabajo_simon($trabajo, $estado, $tipo_trabajo)
{

	$bandera = 0;
	$sql = "select * from trabajos where cod_tra=$trabajo and reg_eli=0  and doc1_tra!='' ";
	$busca = new DataBase();
	$busca->query($sql);
	$certificado = $busca->num_rows();
	while ($busca->next_row()) {
		$tipo_trabajo = $busca->tipo_tra;
	}
	if ($estado == 'certificado') {

		if ($certificado > 0) return 'OK';
		else return 'NO';
	}

	$sql = "select * from entregas where que_tra_en=$trabajo and reg_eli=0   ";
	$busca->query($sql);
	$cantidad_entregas = $busca->num_rows();

	if ($estado == 'entregas') {

		if ($cantidad_entregas > 0) return 'OK';
		else return 'NO';
	}

	$sql = "select * from trabajos where cod_tra=$trabajo and reg_eli=0  and medios_tra!='' ";
	$busca->query($sql);
	$cantidad_medios = $busca->num_rows();

	if ($estado == 'medios') {

		if ($cantidad_medios > 0) return 'OK';
		else return 'NO';
	}



	$sql = "select *  from rel_trabajos  inner join registro_usuario on rel_trabajos.cod_reg=registro_usuario.cod_reg  where cod_tra=$trabajo and registro_usuario.reg_eli=0 and rel_trabajos.rol_rel!=1";
	$busca->query($sql);
	$cantidad_autores = $busca->num_rows();


	if ($estado == 'autores') {
		if ($tipo_trabajo == 1) {

			if ($cantidad_autores > 0) return 'OK';
			else return 'NO';
		}

		if ($tipo_trabajo == 2) {

			if ($cantidad_autores > 1) return 'OK';
			else return 'NO';
		}
	}
}

function conteo_registro_innersql($tabla, $inner, $condicion)
{

	$db = new Database();
	$sql = "SELECT * FROM  $tabla $inner WHERE $tabla.reg_eli!=1 $condicion";
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}

function conteo_vista_1($medio, $notin, $categoria, $estado, $reg_esp)
{


	$db = new Database();
	if ($estado == 4 and $reg_esp == 0) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab IS NULL AND categoria_tra='$categoria' and cod_medio_tra='$medio' and categoria_tra not in ($notin) GROUP BY trabajos.cod_tra";
	}
	if ($estado != 4 and $reg_esp == 0) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab='$estado' AND categoria_tra='$categoria' and cod_medio_tra='$medio' and categoria_tra not in ($notin) GROUP BY trabajos.cod_tra";
	}

	if ($estado == 4 and $reg_esp == 1) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab IS NULL  and cod_medio_tra='$medio' and categoria_tra  in ($notin) GROUP BY trabajos.cod_tra";
	}
	if ($estado != 4 and $reg_esp == 1) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab='$estado'  and cod_medio_tra='$medio' and categoria_tra  in ($notin) GROUP BY trabajos.cod_tra";
	}
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}

function conteo_vista_2($medio, $notin, $categoria, $reg_esp)
{

	$db = new Database();
	if ($reg_esp == 1) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND  cod_medio_tra='$medio'  and categoria_tra  in ($notin) GROUP BY trabajos.cod_tra";
	} else {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND  cod_medio_tra='$medio' AND categoria_tra='$categoria' and categoria_tra not in ($notin) GROUP BY trabajos.cod_tra";
	}
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}

function conteo_vista_3($medio, $notin, $estado, $reg_esp)
{


	$db = new Database();
	if ($estado == 4 and $reg_esp == 0) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab IS NULL  and cod_medio_tra='$medio' and categoria_tra not in ($notin) GROUP BY trabajos.cod_tra";
	}
	if ($estado != 4 and $reg_esp == 0) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab='$estado'  and cod_medio_tra='$medio' and categoria_tra not in ($notin) GROUP BY trabajos.cod_tra";
	}
	if ($estado == 4 and $reg_esp == 1) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab IS NULL   and categoria_tra  in ($notin) GROUP BY trabajos.cod_tra";
	}
	if ($estado != 4 and $reg_esp == 1) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND esta_trab_rtrab='$estado'   and categoria_tra  in ($notin) GROUP BY trabajos.cod_tra";
	}
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}

function conteo_vista_4($medio, $notin, $reg_esp)
{

	$db = new Database();
	if ($reg_esp == 0) {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''  AND  cod_medio_tra='$medio'  and categoria_tra not in ($notin) GROUP BY trabajos.cod_tra, medio_tra ";
	} else {
		$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''    and categoria_tra  in ($notin) GROUP BY trabajos.cod_tra, medio_tra ";
	}
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}

function conteo_vista_ciudades($medio)
{

	$db = new Database();
	$sql = "SELECT COUNT( * )  FROM trabajos INNER JOIN categorias ON trabajos.categoria_tra = categorias.cod_cat INNER JOIN rel_trabajos ON trabajos.cod_tra = rel_trabajos.cod_tra INNER JOIN registro_usuario ON rel_trabajos.cod_reg = registro_usuario.cod_reg INNER JOIN medios ON trabajos.cod_medio_tra = medios.cod_med LEFT JOIN revision_trabajos ON cod_trab_rtrab = trabajos.cod_tra WHERE trabajos.reg_eli !=1 AND registro_usuario.reg_eli =0 AND rel_trabajos.reg_eli =0 AND trabajos.fin_tra =1 AND trabajos.titulo_tra <> '' AND registro_usuario.nombre_reg <> ''    AND  cod_medio_tra='$medio' GROUP BY trabajos.cod_tra, cod_med ";
	$db->query($sql);
	return $db->num_rows();
	$db->close();
}


function crear_persona()
{
	printArray($_POST);
	echo $_POST['nom-per'];
	echo "persona creada";
}


function editar_persona()
{

	echo $_POST['nom-per'];
	echo "persona editada";
}

function editar_conyugue()
{
	printArray($_POST);
	/*
ultimo_id_conyugue => 114 
---nom-c => 1111
---tel-c => 
---ape-c => 
---mail-c => 
usu-c => 
obs-c => sesdwewe
ultimo_id_padre
	 */
	$campos = "nom_per='" . correcion_html_utf8($_REQUEST["nom-c"]) . "', ape_per='" . correcion_html_utf8($_REQUEST["ape-c"]) . "' ,  mai_per='" . $_REQUEST["mail-c"] . "', tof_per='" . $_REQUEST["tel-c"] . "', obs_per='" . $_REQUEST["obs-c"] . "',   coy_per='" . $_REQUEST["ultimo_id_padre"] . "' , temp_per=0 ";
	$error = editar_registro("personas", $campos, "cod_per", $_REQUEST['ultimo_id_conyugue'], $int_con);
}



function printArray($array)
{
	foreach ($array as $key => $value) {
		echo "$key => $value";
		if (is_array($value)) { //If $value is an array, print it as well!
			printArray($value);
		}
	}
}

function crear_empresa()
{
	$campos = " nom_emp,	dir_emp, mai_emp, cod_sec_emp, cod_ciu_emp, tel_emp, web_emp, obs_emp, cod_dep_emp	 ";
	$valores = " '" . correcion_html_utf8($_POST['nom']) . "','" . correcion_html_utf8($_POST['dir']) . "','" . $_POST['mail'] . "','" . $_POST['sect'] . "', '" . $_POST['ciud'] . "', '" . $_POST['tel'] . "', '" . $_POST['web'] . "', '" . correcion_html_utf8($_POST['obs']) . "', '" . $_POST['dep'] . "' ";
	$ultimo_iddet = insertar_registros_det("empresas", $campos, $valores, "");
}

function crear_empresa_sucursa()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];

	decode_get2_get($_REQUEST['edis']);
	$codigo_EdicionSuc = $_REQUEST['consEdSuc'];


	if ($codigo_EdicionSuc == '000') {
		$campos = " nom_emp,	dir_emp, mai_emp, cod_sec_emp, cod_ciu_emp, tel_emp, web_emp, obs_emp, cod_pad_emp, cod_dep_emp	 ";
		$valores = " '" . correcion_html_utf8($_POST['nom']) . "','" . correcion_html_utf8($_POST['dir']) . "','" . $_POST['mail'] . "','" . $_POST['sect'] . "', '" . $_POST['ciud'] . "', '" . $_POST['tel'] . "', '" . $_POST['web'] . "', '" . correcion_html_utf8($_POST['obs']) . "', '" . $codigo_Edicion . "', '" . $_POST['dep'] . "' ";
		$ultimo_iddet = insertar_registros_det("empresas", $campos, $valores, "");
	} else {
		$campos = " nom_emp='" . correcion_html_utf8($_POST['nom']) . "',dir_emp='" . correcion_html_utf8($_POST['dir']) . "',mai_emp='" . $_POST['mail'] . "',cod_sec_emp='" . $_POST['sect'] . "', cod_ciu_emp='" . $_POST['ciud'] . "',tel_emp='" . $_POST['tel'] . "', web_emp='" . $_POST['web'] . "', obs_emp='" . correcion_html_utf8($_POST['obs']) . "', cod_dep_emp='" . $_POST['dep'] . "' ";
		editar_registro('empresas', $campos, 'cod_emp', $codigo_EdicionSuc, "");
	}
}
function borrar_surcursal()
{
	decode_get2_get($_REQUEST['edis']);
	$codigo_EdicionSuc = $_REQUEST['consEdSuc'];

	$campos = "reg_eli=1";
	$error = editar_registro("empresas", $campos, "cod_emp", $codigo_EdicionSuc, '');
}

function borrar_empresa()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = "reg_eli=1";
	$error = editar_registro("empresas", $campos, "cod_emp", $codigo_Edicion, '');
}



function editar_empresa()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];


	//echo $_POST['dep']."-dep   ";
	//echo $_POST['ciud']."-ciudad   ";

	$campos = " nom_emp='" . correcion_html_utf8($_POST['nom']) . "',dir_emp='" . correcion_html_utf8($_POST['dir']) . "',mai_emp='" . $_POST['mail'] . "',cod_sec_emp='" . $_POST['sect'] . "', cod_ciu_emp='" . $_POST['ciud'] . "',tel_emp='" . $_POST['tel'] . "', web_emp='" . $_POST['web'] . "', obs_emp='" . correcion_html_utf8($_POST['obs']) . "', cod_dep_emp='" . $_POST['dep'] . "' ";

	//echo "----";
	//exit;
	editar_registro('empresas', $campos, 'cod_emp', $codigo_Edicion, "");


	$campos_dpersoEmpre = " dir_dpe='" . correcion_html_utf8($_POST['dir']) . "', tel_dpe='" . $_POST['tel'] . "'";
	editar_registro_where('d_empresa_persona', $campos_dpersoEmpre, 'cod_emp', $codigo_Edicion, "", " and reg_eli=0 and cod_suc=0");

	$campos_dCorreEmpre = " dir_corr_per='" . correcion_html_utf8($_POST['dir']) . "'";
	editar_registro_where('personas', $campos_dCorreEmpre, 'cod_dir_per', $codigo_Edicion, "", " and reg_eli=0 and tipo_dir_per=1");
}

function editar_empresa_sucursa()
{
	decode_get2_get($_REQUEST['edis']);
	$codigo_EdicionSuc = $_REQUEST['consEdSuc'];

	$campos = " nom_emp='" . correcion_html_utf8($_POST['nom']) . "',dir_emp='" . correcion_html_utf8($_POST['dir']) . "',mai_emp='" . $_POST['mail'] . "',cod_sec_emp='" . $_POST['sect'] . "', cod_ciu_emp='" . $_POST['ciud'] . "',tel_emp='" . $_POST['tel'] . "', web_emp='" . $_POST['web'] . "', obs_emp='" . correcion_html_utf8($_POST['obs']) . "', cod_dep_emp='" . $_POST['dep'] . "' ";
	editar_registro('empresas', $campos, 'cod_emp', $codigo_EdicionSuc, "");

	$campos_dpersoEmpre = " dir_dpe='" . correcion_html_utf8($_POST['dir']) . "', tel_dpe='" . $_POST['tel'] . "'";
	editar_registro_where('d_empresa_persona', $campos_dpersoEmpre, 'cod_suc', $codigo_EdicionSuc, "", " and reg_eli=0 and cod_suc!=0");

	$campos_dCorreEmpre = " dir_corr_per='" . correcion_html_utf8($_POST['dir']) . "'";
	editar_registro_where('personas', $campos_dCorreEmpre, 'cod_dir_per', $codigo_Edicion, "", " and reg_eli=0 and tipo_dir_per=1");
}

function crear_evento()
{
	$campos = " nom_eve, tip_eve_eve, pro_eve, com_eve";
	$valores = " '" . correcion_html_utf8($_POST['nom']) . "', '" . $_POST['tip'] . "', '" . $_POST['pro_eve'] . "', '" . correcion_html_utf8($_POST['obs']) . "'";
	$ultimo_iddet = insertar_registros_det("eventos", $campos, $valores, "");
}

function editar_evento()
{
	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];
	$campos = " nom_eve='" . correcion_html_utf8($_POST['nom']) . "', tip_eve_eve='" . $_POST['tip'] . "', pro_eve='" . $_POST['pro_eve'] . "', com_eve='" . correcion_html_utf8($_POST['obs']) . "' ";
	editar_registro('eventos', $campos, 'cod_eve', $codigo_Edicion, "");
}

function html_conversion_caracter($String)
{
	$String = str_replace("Á", "&Aacute;", $String);
	$String = str_replace("À", "&Agrave;", $String);
	$String = str_replace("É", "&Eacute;", $String);
	$String = str_replace("È", "&Egrave;", $String);
	$String = str_replace("Í", "&Iacute;", $String);
	$String = str_replace("Ì", "&Igrave;", $String);
	$String = str_replace("Ó", "&Oacute;", $String);
	$String = str_replace("Ò", "&Ograve;", $String);
	$String = str_replace("Ú", "&Uacute;", $String);
	$String = str_replace("Ù", "&Ugrave;", $String);
	$String = str_replace("á", "&aacute;", $String);
	$String = str_replace("à", "&agrave;", $String);
	$String = str_replace("é", "&eacute;", $String);
	$String = str_replace("è", "&egrave;", $String);
	$String = str_replace("í", "&iacute;", $String);
	$String = str_replace("ì", "&igrave;", $String);
	$String = str_replace("ó", "&oacute;", $String);
	$String = str_replace("ò", "&ograve;", $String);
	$String = str_replace("ú", "&uacute;", $String);
	$String = str_replace("ù", "&ugrave;", $String);
	$String = str_replace("Ä", "&Auml;", $String);
	$String = str_replace("Â", "&Acirc;", $String);
	$String = str_replace("Ë", "&Euml;", $String);
	$String = str_replace("Ê", "&Ecirc;", $String);
	$String = str_replace("Ï", "&Iuml;", $String);
	$String = str_replace("Ö", "&Ouml;", $String);
	$String = str_replace("Ô", "&Ocirc;", $String);
	$String = str_replace("Ü", "&Uuml;", $String);
	$String = str_replace("Û", "&Ucirc;", $String);
	$String = str_replace("ä", "&auml;", $String);
	$String = str_replace("â", "&acirc;", $String);
	$String = str_replace("ë", "&euml;", $String);
	$String = str_replace("ê", "&ecirc;", $String);
	$String = str_replace("ï", "&iuml;", $String);
	$String = str_replace("î", "&icirc;", $String);
	$String = str_replace("ö", "&ouml;", $String);
	$String = str_replace("ü", "&uuml;", $String);
	$String = str_replace("û", "&ucirc;", $String);
	$String = str_replace("å", "&aring;", $String);
	$String = str_replace("Ñ", "&Ntilde;", $String);
	$String = str_replace("Õ", "&Otilde;", $String);
	$String = str_replace("ã", "&atilde;", $String);
	$String = str_replace("ñ", "&ntilde;", $String);
	$String = str_replace("Ý", "&Yacute;", $String);
	$String = str_replace("õ", "&otilde;", $String);
	$String = str_replace("ý", "&yacute;", $String);
	$String = str_replace("ÿ", '&yuml;', $String); //y minúscula con diéresis;
	$String = str_replace('“', '&quot;', $String); //comillas de citación - arriba izquierda;
	$String = str_replace('”', '&quot;', $String); //comillas de citación - arriba derecha;
	$String = str_replace('„', '&quot;', $String); //comillas de citación - abajo;
	$String = str_replace('"', '&quot;', $String); //comillas dobles;
	$String = str_replace("‘", '&quot;', $String); //comilla izquierda - citación
	$String = str_replace("’", '&quot;', $String); //comilla derecha - citación;
	$String = str_replace("«", '&laquo;', $String); //comillas anguladas de apertura;
	$String = str_replace("»", '&raquo;', $String); //comillas anguladas de cierre;
	$String = str_replace("º", '&ordm;', $String); //género masculino - indicador ordinal m.;
	$String = str_replace("©", '&copy;', $String); //signo de derechos de autor - copyright;
	$String = str_replace("ª", '&ordf;', $String); //género feminino - indicador ordinal f.;
	$String = str_replace("¡", '&iexcl;', $String); //signo de apertura de exclamación;
	$String = str_replace(" & ", '&amp;', $String); //signo "&" / ampersand;
	$String = str_replace("<", '&lt;', $String); //signo de menor que;
	$String = str_replace(">", '&gt;', $String); //signo de mayor que;
	$String = str_replace("€", '&euro;', $String); //signo de euro;
	$String = str_replace("ø", '&oslash;', $String); //o barrada minúscula;
	$String = str_replace("÷", '&divide;', $String); //signo de división 
	$String = str_replace("æ", '&aelig;', $String); //diptongo ae minúscula (ligadura)
	$String = str_replace("±", '&plusmn;', $String); //signo de más o menos
	$String = str_replace("²", '&sup2;', $String); //superíndice dos - cuadrado
	$String = str_replace("³", '&sup3;', $String); //superíndice tres - cúbico
	$String = str_replace("´", '&acute;', $String); //acento agudo - agudo espaciado
	$String = str_replace("µ", '&micro;', $String); //signo de micro
	$String = str_replace("¶", '&para;', $String); //signo de fin de párrafo
	$String = str_replace("·", '&middot;', $String); //punto medio - coma Georgiana
	$String = str_replace("¸", '&cedil;', $String); //cedilla
	$String = str_replace("¹", '&sup1;', $String); //superíndice uno
	$String = str_replace("¼", '&frac14;', $String); //fracción un cuarto
	$String = str_replace("½", '&frac12;', $String); //fracción medio - mitad
	$String = str_replace("¾", '&frac34;', $String); //fracción tres cuartos
	$String = str_replace("¿", '&iquest;', $String); //signo de interrogación - apertura
	$String = str_replace("¯", '&macr;', $String); //signo de interrogación - apertura
	$String = str_replace("¯", '-', $String); //signo de interrogación - apertura
	$String = str_replace("—", '--', $String); //signo de interrogación - apertura


	return ($String);
}

function buscar_registro($campo, $codigo, $tabla, $campo_llave)
{
	$db = new Database();
	$sql = "SELECT $campo as campo_nombre  FROM  $tabla WHERE $campo_llave=$codigo and reg_eli=0";
	$db->query($sql);
	if ($db->next_row()) {
		return $db->campo_nombre;
	}
}

function buscar_resultados($where)
{
	$db = new Database();

	//$sql="SELECT * FROM personas LEFT JOIN d_evento_persona ON cod_per_devp=cod_per LEFT JOIN eventos ON cod_eve_devp = cod_eve  LEFT JOIN d_segmento_persona ON cod_per_dse=cod_per LEFT JOIN segmento ON cod_seg_dse = cod_seg WHERE personas.reg_eli=0 and personas.temp_per=0 AND d_evento_persona.reg_eli=0  $where group by cod_per ORDER BY nom_per, ape_per ASC ";
	$sql = "SELECT cod_per, cod_civ_per,  cod_gen_per, cod_dir_per, pro_devp, (

SELECT nom_op_para
FROM parametros
WHERE val_op_para = cod_tit_per
AND nom_para = 'titulo_persona'
) AS titulo, CONCAT( nom_per, ' ', ape_per ) AS nombre_completo, departamentos.`nom_dep` , ciudades.nom_mun, dir_corr_per, tipo_dir_per, (

SELECT nom_emp
FROM `empresas`
WHERE `cod_emp` = cod_dir_per
) AS empresa, ( SELECT nom_sec FROM sector WHERE  cod_sec=sec_per) as sector
FROM personas
left JOIN d_evento_persona ON cod_per_devp = cod_per
left JOIN eventos ON cod_eve_devp = cod_eve
LEFT JOIN departamentos ON cod_dep_per = cod_dep
LEFT JOIN ciudades ON cod_cui_per = cod_mun
WHERE personas.reg_eli =0 AND temp_per =0 AND asis_per !=1
$where
GROUP BY cod_per";


	$db->query($sql);
	return $db->num_rows();
	$db->close();
}

function buscar_resultadosRendimiento($where)
{
	$db = new Database();

	//$sql="SELECT * FROM personas LEFT JOIN d_evento_persona ON cod_per_devp=cod_per LEFT JOIN eventos ON cod_eve_devp = cod_eve  LEFT JOIN d_segmento_persona ON cod_per_dse=cod_per LEFT JOIN segmento ON cod_seg_dse = cod_seg WHERE personas.reg_eli=0 and personas.temp_per=0 AND d_evento_persona.reg_eli=0  $where group by cod_per ORDER BY nom_per, ape_per ASC ";
	$sql = "SELECT cod_per, cod_civ_per,  cod_gen_per,  (SELECT nom_op_para
FROM parametros WHERE val_op_para = cod_tit_per AND nom_para = 'titulo_persona'
) AS titulo, CONCAT( nom_per, ' ', ape_per ) AS nombre_completo, dir_corr_per, tipo_dir_per, (

SELECT nom_emp
FROM `empresas`
WHERE `cod_emp` = cod_dir_per
) AS empresa, ( SELECT nom_sec FROM sector WHERE  cod_sec=sec_per) as sector
FROM personas

WHERE personas.reg_eli =0 AND temp_per =0 AND asis_per !=1
$where
GROUP BY cod_per";




	$db->query($sql);
	return $db->num_rows();
	$db->close();
}


function buscar_resultados_segmentos($where)
{
	$db = new Database();

	//$sql="SELECT * FROM personas LEFT JOIN d_evento_persona ON cod_per_devp=cod_per LEFT JOIN eventos ON cod_eve_devp = cod_eve  LEFT JOIN d_segmento_persona ON cod_per_dse=cod_per LEFT JOIN segmento ON cod_seg_dse = cod_seg WHERE personas.reg_eli=0 and personas.temp_per=0 AND d_evento_persona.reg_eli=0  $where group by cod_per ORDER BY nom_per, ape_per ASC ";
	$sql = "SELECT cod_per, cod_civ_per,  cod_gen_per, cod_dir_per, pro_devp, (

SELECT nom_op_para
FROM parametros
WHERE val_op_para = cod_tit_per
AND nom_para = 'titulo_persona'
) AS titulo, CONCAT( nom_per, ' ', ape_per ) AS nombre_completo, departamentos.`nom_dep` , ciudades.nom_mun, dir_corr_per, tipo_dir_per, (

SELECT nom_emp
FROM `empresas`
WHERE `cod_emp` = cod_dir_per
) AS empresa, ( SELECT nom_sec FROM sector WHERE  cod_sec=sec_per) as sector
FROM personas
INNER JOIN d_evento_persona ON cod_per_devp = cod_per
INNER JOIN eventos ON cod_eve_devp = cod_eve
INNER JOIN d_segmento_persona ON cod_per_dse=cod_per 
INNER JOIN segmento ON cod_seg_dse = cod_seg
LEFT JOIN departamentos ON cod_dep_per = cod_dep
LEFT JOIN ciudades ON cod_cui_per = cod_mun
WHERE personas.reg_eli =0
AND d_evento_persona.reg_eli =0
$where
GROUP BY cod_per";

	$db->query($sql);
	return $db->num_rows();
	$db->close();
}


function buscarConyugue($coy_per)
{
	$campo = "concat(nom_per, ' ' , ape_per)";
	$codigo = $coy_per;
	$tabla = "personas";
	$campo_llave = "cod_per";
	return buscar_registro($campo, $codigo, $tabla, $campo_llave);
}



function crear_envio()
{

	$nombreImg = '';
	if (!empty($_FILES['myfile']['name'])) {
		$dir_subida = '../imgenvios/';
		$fichero_subido = $dir_subida . basename($_FILES['myfile']['name']);
		$nombreImg = basename($_FILES['myfile']['name']);
		// echo  $_FILES['myfile']['tmp_name'];
		// echo "***";
		// echo getcwd();
		if (move_uploaded_file($_FILES['myfile']['tmp_name'], $fichero_subido)) {
			// echo "El fichero es válido y se subió con éxito.\n";
		} else {
			// echo "¡Posible ataque de subida de ficheros!\n";
		}
	}

	$campos = " nom_env , des_env, img_env  , cod_eve_env ";
	$valores = " '" . correcion_html_utf8($_POST['nom']) . "', '" . correcion_html_utf8($_POST['obs']) . "', '" . $nombreImg . "' , '" . $_POST['event-per']  . "'";
	$ultimo_iddet = insertar_registros_det("envios", $campos, $valores, "");
}

function editar_envio()
{


	decode_get2_get($_REQUEST['edi']);
	$codigo_Edicion = $_REQUEST['consEd'];

	$nombreImg = '';
	if (!empty($_FILES['myfile']['name'])) {
		$dir_subida = '../imgenvios/';
		$fichero_subido = $dir_subida . basename($_FILES['myfile']['name']);
		$nombreImg = basename($_FILES['myfile']['name']);
		// echo  $_FILES['myfile']['tmp_name'];
		// echo "***";
		// echo getcwd();
		if (move_uploaded_file($_FILES['myfile']['tmp_name'], $fichero_subido)) {
			// echo "El fichero es válido y se subió con éxito.\n";
		} else {
			// echo "¡Posible ataque de subida de ficheros!\n";

		}
		$campos = " nom_env='" . correcion_html_utf8($_POST['nom']) . "', des_env='" . correcion_html_utf8($_POST['obs']) . "', img_env='" . $nombreImg  . "', cod_eve_env='" . $_POST['event-per']  . "' ";
		editar_registro('envios', $campos, 'cod_env', $codigo_Edicion, "");
	} else {
		$campos = " nom_env='" . correcion_html_utf8($_POST['nom']) . "', des_env='" . correcion_html_utf8($_POST['obs']) . "',  cod_eve_env='" . $_POST['event-per']  . "' ";
		editar_registro('envios', $campos, 'cod_env', $codigo_Edicion, "");
	}
}
?>
