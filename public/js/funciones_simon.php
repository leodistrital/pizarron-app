<?php

include "funciones.php";
function crear_usuario($_REQUEST)
{
//$nacimiento = $_REQUEST['anio_na']."-".$_REQUEST['mes_na']."-".$_REQUEST['dia_na'];
	
	$campos=" email_reg,password1_reg, password2_reg";
		$valores=" '".$_REQUEST['mail_reg']."','".$_REQUEST['pass1_reg']."',MD5(MD5('".$_REQUEST['pass1_reg']."')) ";
		
		$ultimo_id=insertar_registros("registro_usuario",$campos,$valores,"0");
		
		return $ultimo_id;
}
function cambiar_password($_REQUEST)
{
	$valores=" password1_reg='".$_REQUEST["con_1"]."',password2_reg=MD5(MD5('".correcion_html_utf8($_REQUEST["con_1"])."'))";
		
 		 $respuesta=editar_registro("registro_usuario",$valores,"cod_reg",$_REQUEST["id_usuario"],"");
			return $respuesta;
}
function registrar_datos_personales($_REQUEST,$perfil,$funcion)
{
	$nacimiento = $_REQUEST['anio_na']."-".$_REQUEST['mes_na']."-".$_REQUEST['dia_na'];
		$valores=" funcion_reg='".correcion_html_utf8($funcion)."',nombre_reg='".correcion_html_utf8($_REQUEST["nombre_reg"])."',apellidos_reg='".correcion_html_utf8($_REQUEST["apellidos_reg"])."' ,nacimiento_reg='".$nacimiento."',genero_reg='".$_REQUEST["genero_reg"]."',nacionalidad_reg='".$_REQUEST["nacionalidad_reg"]."' ,ciudad_na_reg='".$_REQUEST["ciudad_na_reg"]."', tipo_doc_reg='".$_REQUEST["tipo_doc_reg"]."',  no_doc_reg='".$_REQUEST["no_doc_reg"]."', archivo_doc_reg='".$_REQUEST["archivo_doc_reg"]."', pais_resi_reg='".$_REQUEST["pais_resi_reg"]."',  cuidad_resi_reg='".$_REQUEST["ciudad_resi_reg"]."', direccion_reg='".correcion_html_utf8($_REQUEST["direccion_reg"])."', tel_fijo_reg='".$_REQUEST["tel_fijo_reg"]."',tel_movil_reg='".$_REQUEST["tel_movil_reg"]."',foto_reg='".$_REQUEST["foto_reg"]."' ";
		
 		 $respuesta=editar_registro("registro_usuario",$valores,"cod_reg",$_REQUEST["id_user"],"");
		//echo "Respuesta es ".$respuesta;
		return $respuesta;
}

function registrar_info_academica($_REQUEST)
{
		$valores=" nivel_reg='".$_REQUEST["nivel_reg"]."',titulo_reg='".correcion_html_utf8($_REQUEST["titulo_reg"])."',universidad_reg='".correcion_html_utf8($_REQUEST["universidad_reg"])."' ,grado_reg='".$_REQUEST["grado_reg"]."' ";
		
 		 $respuesta=editar_registro("registro_usuario",$valores,"cod_reg",$_REQUEST["id_user"],"");
		return $respuesta;
}

function registrar_info_profesional($_REQUEST)
{
		$valores=" cargo_reg='".$_REQUEST["cargo_reg"]."',profesion_reg='".$_REQUEST["profes_reg"]."', empresa_reg='".correcion_html_utf8($_REQUEST["empresa_reg"])."' ,pais_empresa_reg='".$_REQUEST["pais_empresa_reg"]."',ciudad_empresa_reg='".$_REQUEST["ciudad_empresa_reg"]."',direccion_empresa_reg='".$_REQUEST["direccion_empresa_reg"]."',tel_empresa_reg='".$_REQUEST["tel_empresa_reg"]."',experiencia_reg='".$_REQUEST["experiencia_reg"]."' ";
		
 		 $respuesta=editar_registro("registro_usuario",$valores,"cod_reg",$_REQUEST["id_user"],"");
		return $respuesta;
}
function registrar_trabajo($_REQUEST)
{
	$campos=" categoria_tra,tipo_tra";
		$valores=" '".$_REQUEST['categoria_tra']."','".$_REQUEST["tipo_tra"]."' ";
		
		$ultimo_id=insertar_registros("trabajos",$campos,$valores,"0");
		
		$relacion = relacionar_usuario_trabajo($ultimo_id,$_REQUEST["id_user"],1);
		//echo "Trabajo registrado es ".$ultimo_id;
		if($relacion>0)
		{
			$respuesta = $ultimo_id;
		}
		else
		{
			$respuesta=0;
		}
		return $respuesta;
}
function finalizar_info_trabajo($_REQUEST)
{
		$valores=" titulo_tra='".correcion_html_utf8($_REQUEST["titulo_tra"])."',medio_tra='".$_REQUEST["medio_tra"]."',fecha_em_tra='".$_REQUEST["fecha_em_tra"]."' ,sinopsis_tra='".correcion_html_utf8($_REQUEST["sinopsis_tra"])."',doc1_tra='".$_REQUEST["doc1_tra"]."',doc2_tra='".$_REQUEST["doc2_tra"]."',medios_tra='".$_REQUEST["medios_tra"]."',duracion_tra='".$_REQUEST["duracion_tra"]."' ,completo_tra='1' ";
		
 		 $respuesta=editar_registro("trabajos",$valores,"cod_tra",$_REQUEST["id_trabajo_r"],"");
		 
		 //Trabajo finalizado
		 //Envio una notificación con el resumen de inscripción
	$s  ="SELECT * FROM rel_trabajos INNER JOIN registro_usuario ON(rel_trabajos.cod_reg = registro_usuario.cod_reg) WHERE rel_trabajos.cod_tra='".$_REQUEST["id_trabajo_r"]."' AND rol_rel='1'";
	$mm = new Database();
	$mm->query($s);
	
	if($mm->next_row())
	{
		$para = $mm->email_reg;
		$nombre = $mm->nombre_reg." ".$mm->apellidos_reg;
	}
	
	$cc = "SELECT * FROM categorias WHERE cod_cat='".$_REQUEST['categ_trabajo_r']."'";
	$c = new Database();
	$c->query($cc);
	
	if($c->next_row()){
		$categoriadeltrabajo = $c->nom_cat;
		
		}
	$tiposm = array();
	$tiposm['prensa'] = 'Periodismo escrito (Impreso)';
	$tiposm['internet'] = 'Periodismo escrito (Digital)';
	$tiposm['radio'] = 'Radio';
	$tiposm['television'] = 'Televisi&oacute;n';
	$msj ='<p>'.$nombre.',</p>
    <p>Ha inscrito un trabajo al Premio Nacional de Periodismo Sim&oacute;n Bol&iacute;var.</p>
    <p>Este es un resumen de la inscripci&oacute;n:</p>
    <p>Recuerde   que tiene la posibilidad de registrar o eliminar trabajos y editar la   informaci&oacute;n de su cuenta hasta el 23 de mayo de 2014 a las 11:59 p.m.</p>
	<p><strong>T&iacute;tulo del trabajo:</strong> '.$_REQUEST["titulo_tra"].'</p>
	<p><strong>Tipo de medio:</strong> '.$tiposm[$_REQUEST["medio_tra"]].'</p>
	<p><strong>Categor&iacute;a:</strong> '.$categoriadeltrabajo.'</p>
	<p><strong>Medios en los que fue publicado:</strong> '.$_REQUEST["medios_tra"].'</p>
	<p><strong>Certificado de emisi&oacute;n / Publicaci&oacute;n:</strong> '.$_REQUEST["doc1_tra"].'</p>
	<p><strong>Sinopsis:</strong> '.$_REQUEST["sinopsis_tra"].'</p>
	<br/>
	<p><strong>Entregas del trabajo:</strong></p>';
	
	$ns = new Database();
	$nsa = "SELECT * FROM entregas WHERE que_tra_en='".$_REQUEST["id_trabajo_r"]."' AND reg_eli=0";
	$ns->query($nsa);
	$contt = 1;
	while($ns->next_row()){
			$msj.='<p><strong>Entrega '.$contt.'</strong></p>
				<p><strong>Fecha de la entrega: </strong> '.$ns->fecha_en.'</p>
				<p><strong>Contenido de la entrega: </strong> '.$ns->original_en.' - '.$ns->contenido_en.'</p>
			';
		$contt++;
		}
    $msj.='<hr/></p><p>Cordialmente,</p>
    <p><strong>Premio Nacional de Periodismo Sim&oacute;n Bol&iacute;var</strong>  </p>';
	$titulo  = "Trabajo inscrito";
		$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		
		// Cabeceras adicionales
		$cabeceras .= 'To: '.$para.'' . "\r\n";
		$cabeceras .= 'From: Premio Nacional de Periodismo Simón Bolivar <premios.simon.bolivar@segurosbolivar.com>' . "\r\n";
		
		// Mail it
		mail($para, $titulo,$msj, $cabeceras);
 
		return $respuesta;
}
function relacionar_usuario_trabajo($id_trabajo,$id_user,$rol)
{
		//$valores=" trabajo_reg='".$id_trabajo."' ";
		$campos=" cod_reg,cod_tra, rol_rel";
		$valores=" '".$id_user."','".$id_trabajo."', '".$rol."' ";
		
		$ultimo_id=insertar_registros("rel_trabajos",$campos,$valores,"0");
 		 //$respuesta=editar_registro("registro_usuario",$valores,"cod_reg",$id_user,"");
		return $ultimo_id;
}

function registrar_participante($_REQUEST,$perfil)
{
	$respuesta = 0;
	$idregistrado = crear_usuario($_REQUEST);
	
	if($idregistrado>0){
		$_REQUEST["id_user"] = $idregistrado;
		$respp = registrar_datos_personales($_REQUEST,$perfil,$_REQUEST['funcion_reg']);
		if($respp>0)
		{
			$respp2 = relacionar_usuario_trabajo($_REQUEST['id_trabajo_r'],$idregistrado,2);
			if($respp2>0)
			{
				$respuesta = 1;
			}
			
		}
	}
	
		return $respuesta;
}

function registrar_pregunta($_REQUEST)
{	
	$campos=" que_pre_res,que_tra_res, respuesta_res";
		$valores=" '".$_REQUEST['pregunta']."','".$_REQUEST['trabajo']."','".$_REQUEST['respuesta']."' ";
		
		$ultimo_id=insertar_registros("respuestas",$campos,$valores,"0");
		
		return $ultimo_id;
}

function registrar_entrega($_REQUEST)
{	
	$campos=" que_tra_en,tit_en, fecha_en,contenido_en,original_en";
		$valores=" '".$_REQUEST['trabajo']."','".$_REQUEST['titulo']."','".$_REQUEST['fecha']."','".$_REQUEST['contenido']."','".$_REQUEST['contenido2']."' ";
		
		$ultimo_id=insertar_registros("entregas",$campos,$valores,"0");
		
		return $ultimo_id;
}

function frontend_login($_REQUEST)
{
	$sql = "SELECT * FROM registro_usuario WHERE email_reg='".$_REQUEST['usuario']."' AND password2_reg=MD5(MD5('".$_REQUEST['password']."'))";
	$respuesta=0;
	$loginobj = new Database();
	$loginobj->query($sql);
	if($loginobj->next_row())
	{
		$respuesta = $loginobj->cod_reg;
	}
	return $respuesta;
}

function eliminar_trabajo($id)
{
	eliminar("rel_trabajos", $id, "cod_tra","0");
}
function eliminar_participante($id)
{
	eliminar("rel_trabajos", $id, "cod_reg","0");
}
function limpiar_entregas($id)
{
	$dd = new Database();
	$dd->query("SELECT * FROM entregas WHERE que_tra_en='".$id."'");
	while($dd->next_row()){
		eliminar("entregas", $dd->cod_en, "cod_en","0");
	}
}
function limpiar_respuestas($id)
{
	$dd = new Database();
	$dd->query("SELECT * FROM respuestas WHERE que_tra_res='".$id."'");
	while($dd->next_row()){
		eliminar("respuestas", $dd->cod_res, "cod_res","0");
	}
}

function notificacion_registro($id)
{
	$s  ="SELECT * FROM registro_usuario WHERE cod_reg='".$id."'";
	$mm = new Database();
	$mm->query($s);
	
	if($mm->next_row())
	{
		$para = $mm->email_reg;
		$nombre = $mm->nombre_reg." ".$mm->apellidos_reg;
	}
	
	$msj ='<p>'.$nombre.',</p>
    <p>Su inscripci&oacute;n al Premio Nacional de Periodismo Sim&oacute;n Bol&iacute;var se ha realizado con &eacute;xito.</p>
    <p>Para iniciar sesi&oacute;n de su cuenta, puede ingresar en el siguiente <strong><a href="http://premiosimonbolivar.com">enlace</a></strong>. Su usuario es <strong>'.$para.'</strong></p>
    <p>Recuerde   que tiene la posibilidad de registrar o eliminar trabajos y editar la   informaci&oacute;n de su cuenta hasta el 23 de mayo de 2014 a las 11:59 p.m.</p>
    <p>Cordialmente,</p>
    <p><strong>Premio Nacional de Periodismo Sim&oacute;n Bol&iacute;var</strong>  </p>';
	$titulo  = "Se ha registrado exitosamente";
		$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		
		// Cabeceras adicionales
		$cabeceras .= 'To: '.$para.'' . "\r\n";
		$cabeceras .= 'From: Premio Nacional de Periodismo Simón Bolivar <premios.simon.bolivar@segurosbolivar.com>' . "\r\n";
		
		// Mail it
		mail($para, $titulo,$msj, $cabeceras);
}

function vinculo_contrasena($email)
{

	$s  ="SELECT * FROM registro_usuario WHERE email_reg='".$email."'";
	$mm = new Database();
	$mm->query($s);
	
	if($mm->next_row())
	{
		$id = $mm->cod_reg;
	}
	$para = $email;
	$msj ='<p>Estimado usuario,</p>
    <p>Hemos recibido una solicitud para restablecer su contrase&ntilde;a, para realizar esta acci&oacute;n, por favor haga clic en el siguiente v&iacute;nculo y asigne una nueva.</p>
    <p><strong><a href="https://clientes.mottif.com/simon_forms/ass_pass.php?n='.encode_this_get("usu=".$id).'">Restablecer contrase&ntilde;a</a></strong>.</p>
    <p>Cordialmente,</p>
    <p><strong>Premio Nacional de Periodismo Sim&oacute;n Bol&iacute;var</strong>  </p>';
	$titulo  = utf8_decode("Restablecer contraseña");
	$from = utf8_decode("Premio Nacional de Periodismo Simón Bolivar");
	//$titulo = "=?ISO-8859-1?B?".base64_encode($titulo)."=?=";
		$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		
		// Cabeceras adicionales
		$cabeceras .= 'To: '.$para.'' . "\r\n";
		$cabeceras .= 'From: '.$from.' <premios.simon.bolivar@segurosbolivar.com>' . "\r\n";
		
		// Mail it
		mail($para, $titulo, $msj, $cabeceras);
}
?>