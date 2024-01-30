<?
$sql =" SELECT * FROM usuario INNER JOIN perfil ON perfil.cod_per = usuario.cod_per_usu  where  cod_per_usu='".$_SESSION["global"][5]."'";
$db= new  Database();
$db->query($sql);
$db->next_row();

if($db->num_rows()==0){
   echo "<script>window.location='index.php?timeover=true'; </script>";
}


//echo $cant_reg_pag."-------".$_REQUEST['regpg'];
if(!empty($_REQUEST['regpg1'])) $cambio_pagina=$_REQUEST['regpg1']; else $cambio_pagina=$_REQUEST['regpg'];
$_REQUEST['regpg']=$cambio_pagina;

if(!empty($_REQUEST['filt_medio1'])) $cambio_medio=$_REQUEST['filt_medio1']; else $cambio_medio=$_REQUEST['filt_medio'];
$_REQUEST["filt_medio"]=$cambio_medio;

if(!empty($_REQUEST['filt_categoria1'])) $cambio_categoria=$_REQUEST['filt_categoria1']; else $cambio_categoria=$_REQUEST['filt_categoria'];
$_REQUEST["filt_categoria"]=$cambio_categoria;

if(!empty($_REQUEST['filt_estado1'])) $cambio_estado=$_REQUEST['filt_estado1']; else $cambio_estado=$_REQUEST['filt_estado'];
$_REQUEST["filt_estado"]=$cambio_estado;

if(!empty($_REQUEST['filt_mpublicacion1'])) $cambio_publicacion=$_REQUEST['filt_mpublicacion1']; else $cambio_publicacion=$_REQUEST['filt_mpublicacion'];
$_REQUEST["filt_mpublicacion"]=$cambio_publicacion;


?>