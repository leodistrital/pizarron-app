<?
/*$sql ="SELECT * FROM $tabla  WHERE $col_llave = '$codigo' ";
$dbdatos= new  Database();
$dbdatos->query($sql);
$dbdatos->next_row();*/
//echo $_SESSION["global"][5];
//echo $_REQUEST["id_consulta"]."*******************";
$sql =" SELECT * FROM permisos INNER JOIN interfaz ON permisos.cod_int_per = interfaz.cod_int  where cod_int_per='".$_REQUEST["id_consulta"]."' and cod_usu_per='".$_SESSION["global"][5]."'";
//exit;
$db= new  Database();
$db->query($sql);
if($db->next_row()){
	//grupo de datatos
	$nombre_interfaz=$db->nom_int;
	$codigo_interfaz=$db->cod_int_per;
	$codigo_modulo=$db->cod_mod_int;
	$codigo_orden=$db->ord_int;
	$consulta_interfaz=$db->con_per;
	$editar_interfaz=$db->edi_per;
	$insertar_interfaz=$db->ins_per;
	$eliminar_interfaz=$db->eli_per;
	//grupo de datatos
}

if($consulta_interfaz==0){
	/*$salida_login="<script language='javascript'>window.location=login.php;</script>";*/
    header('Location: login.php');
}
?>


<?
if(!empty($_REQUEST['regpg'])){
	$cant_reg_pag=$_REQUEST['regpg'];
}

//echo $cant_reg_pag."-------".$_REQUEST['regpg'];

?>