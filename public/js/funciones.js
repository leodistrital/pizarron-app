var tWorkPath="menus/data.files/";

function detectarCarga(){ 
	//document.getElementById("imgLOAD").style.display="none";
	var element= document.getElementById("loading");
	document.getElementById("loading").style.display = "block";
	if(element!=null){
		fade(element);
	}
}


function detectarCargaInterna(){ 
	//document.getElementById("imgLOAD").style.display="none";
	var element= document.getElementById("loading");
	document.getElementById("loading").style.display = "block";

}

function detectarCargaCerrar(){ 
	var element= document.getElementById("loading");
		var op = 1;  // initial opacity
	var timer = setInterval(function () {
		clearInterval(timer);
			element.style.display = 'none';


		
		//element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		//op -= op * 0.1;
	}, 100);

}



function fade(element) {
	var op = 1;  // initial opacity
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			element.style.display = 'none';
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 700);

}



function MM_jumpMenu(targ,selObj,restore){ //v3.0
	eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
	if (restore) selObj.selectedIndex=0;
}



function MM_jumpMenu(targ,selObj,restore){ //v3.0
	eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
	if (restore) selObj.selectedIndex=0;
}

function cambio(op) {

	if(op==1) {	
		document.getElementById('act_pag').value=1   ;	
	}

	if(op==2) {
		if(document.getElementById('act_pag').value >1  ) {
			document.getElementById('act_pag').value=parseInt(document.getElementById('act_pag').value) - 1;
		}
	}

	if(op==3) {

		if( parseInt(document.getElementById('cant_pag').value)  > parseInt(document.getElementById('act_pag').value)  ) {	
			document.getElementById('act_pag').value=parseInt(document.getElementById('act_pag').value) + 1;
		}
	}

	if(op==4) {	
		document.getElementById('act_pag').value=document.getElementById('cant_pag').value   ;
	}

	document.forma.submit();
}



function buscar()
{
		//alert(document.getElementById('texto').value)
		//return false;
		if(document.getElementById('campos').value == -1)
		{
			document.getElementById('busquedas').value="";
			document.getElementById('cant_pag').value =1;
			document.getElementById('act_pag').value =1;
			document.forma.submit();
		}
		else 
		{

			if(document.getElementById('texto').value=="" || document.getElementById('campos').value==0)
			{
				alert("Complete los Parametros, Gracias")
				return false;
			}

			else
			{
				document.getElementById('busquedas').value= document.getElementById('campos').value + "|" + document.getElementById('texto').value ;
				document.getElementById('cant_pag').value =1;
				document.getElementById('act_pag').value =1;
				document.forma.submit();
			}
		}
}



function cambio_1(cant_pag,act_pag) {  //para el manejo de loas imagenes de paginacion
var pag=cant_pag ;
var aux=0;
	if(cant_pag <= 1) {	
		document.getElementById('ultimo').style.display="none";
		document.getElementById('siguiente').style.display="none";
		document.getElementById('primero').style.display="none";
		document.getElementById('regresar').style.display="none";
		aux=1;
	}

	if(act_pag == 1  &  aux==0) {	
		document.getElementById('ultimo').style.display="inline";
		document.getElementById('siguiente').style.display="inline";
		document.getElementById('primero').style.display="none";
		document.getElementById('regresar').style.display="none";
		aux=1;
	}

	if(act_pag >1 && cant_pag> act_pag &  aux==0) {	
		document.getElementById('ultimo').style.display="inline";
		document.getElementById('siguiente').style.display="inline";
		document.getElementById('primero').style.display="inline";
		document.getElementById('regresar').style.display="inline";
		aux=1;
	}

	if(cant_pag >= act_pag  &  aux==0) {	
		document.getElementById('ultimo').style.display="none";
		document.getElementById('siguiente').style.display="none";
		document.getElementById('primero').style.display="inline";
		document.getElementById('regresar').style.display="inline";
		aux=1;
	}
}

function cambio_guardar() {	

	var mensaje=datos_completos();
	if (mensaje==true) {
		document.getElementById('barra_h').style.display="none";
		document.getElementById('guardar').value=1;
		document.forma.submit();
	}
	else
		alert('Complete el Formulario, Gracias')
}



function validaInt(a){
	if (event.keyCode>47 & event.keyCode<58) {
			return true;
	}
	else{
		return false;
	}
}


function ValidaSoloNumeros() {
	

 if ((event.keyCode < 48) || (event.keyCode > 57)) 
  event.returnValue = false;
}


function validaInt_evento(a,obj){
	var vandera=0;
	if(event.keyCode ==13 && vandera==0 ) {
		document.getElementById(obj).focus();
	}
	else {
		if (event.keyCode>47 & event.keyCode<58) {
			return true;
		}
		else{
			return false;
		}
	}
}


function valida_evento(a,obj){
	var vandera=0;
	if(event.keyCode ==13 && vandera==0 ) {
		document.getElementById(obj).focus();
	}
}


function confirmar(codigo)
{
	if(confirm("¿Esta seguro de Eliminar el Registro?.")) 
	{
		document.getElementById('eliminacion').value=1;
		document.getElementById('eli_codigo').value=codigo;
		document.forma.submit();		
	} 
} 

	

function validaFloat(obj){

if (event.keyCode==46 && obj.value=="")
	obj.value="0";


if (event.keyCode==46 && obj.value!="")
{
	if(obj.value.indexOf(".")>-1)
	return false;
}


if (event.keyCode > 47 & event.keyCode < 58){
	var cero = parseInt(obj.value.substring(0,1));
	var segundo = obj.value.substring(1,2);
	if( cero == 0 & segundo != ".") return false;
}

if (event.keyCode>47 & event.keyCode<58 || event.keyCode==46)
	return true;
else
	return false;

}





function validaValue(obj){
	var arreglo = obj.value.split(".");

	if(obj.value.substring(0,1) == ".")  
		obj.value = "0" + obj.value;
	if(parseInt(arreglo[1]) == 0) 
		obj.value = parseInt(arreglo[0]);
	
	if(obj.value.substring(obj.value.length - 1,obj.value.length) == ".")  
		obj.value = obj.value.substring(0,obj.value.length - 1);
	
	if(isNaN(obj.value)) 
		obj.value = 0;
		
	if(obj.value=="0.0")
		obj.value = 0;
}





function checks(boton,obj){
	if (document.getElementById(boton).value=='Marcar') {
		document.getElementById(boton).value='Desmarcar';
		var final=document.getElementById('cantidad_checks').value;
		for (i = 1; i <= final; i++)
			document.getElementById(obj+i).checked=true;
	}
	else {
		document.getElementById(boton).value='Marcar';
		var final=document.getElementById('cantidad_checks').value;
		for (i = 1; i <= final; i++)
			document.getElementById(obj+i).checked=false;
	}
}



function imprimir(usuario,codigo,pagina) {
	var ruta =pagina+"?usuario="+ usuario + "&&codigo=" + codigo ;
	window.open(ruta,"imprimir","toolbar=no,scrollbars=no , width=650,height=650 ");
}





function validarmas(e) { 
    tecla = (document.all) ? e.keyCode : e.which; 
    if (tecla==8) return true; //Tecla de retroceso (para poder borrar) 
    //patron =/[A-Za-z]/; // Solo acepta letras 
    patron = /\d/; // Solo acepta números 
  //  patron = /\w/; // Acepta números y letras 
    //patron = /\D/; // No acepta números 
    te = String.fromCharCode(tecla); 
    return patron.test(te);  
}  





function validarint(e){
opc = false;
var nav4 = window.Event ? true : false;
//var tecla = nav4 ? evt.which : evt.keyCode;
var tecla = (document.all) ? e.keyCode : e.which;
alert(tecla)
if (tecla==8) return true; //Tecla de retroceso (para poder borrar) 
if (tecla > 47 && tecla < 58)
		opc = true;
return opc;
}





function solonumeros(e)
{
 var key;

 if(window.event) // IE
 {
  key = e.keyCode;
  alert('ex')
 }
  else if(e.which) // Netscape/Firefox/Opera
 {
  key = e.which;
  alert('fire')
 }

alert(key)
 if (key < 48 || key > 57) 
    {
      return false;
    }

 return true;
}

function validaIntleo(){
var tecla = e.which ;
alert(tecla)
}




function soloNumeros_nuevo(evt){
//asignamos el valor de la tecla a keynum
if(window.event){// IE
keynum = evt.keyCode;
}else{
keynum = evt.which;
}
//comprobamos si se encuentra en el rango
if(keynum>47 && keynum<58){
return true;
}else{
return false;
}
}


function soloLetras(e){
   key = e.keyCode || e.which;
   tecla = String.fromCharCode(key).toLowerCase();
   letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
   //especiales = [8,37,39,46];
   especiales = [8];
	//alert(key)
   tecla_especial = false
   for(var i in especiales){
		if(key == especiales[i]){
			tecla_especial = true;
			break;
		}
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial){
		return false;
	}
}






function ValidNum(e) {
    var tecla= document.all ? tecla = e.keyCode : tecla = e.which;
    return ((tecla > 47 && tecla < 58) || tecla == 46);
}


function validafloatpili(e, obj){

opc = false;
tecla = (document.all) ? e.keyCode : e.which;
if (tecla==8) return true; //Tecla de retroceso (para poder borrar) 

if (tecla > 47 && tecla < 58)
	opc = true;
	if (obj.value.search("[.*]") == -1 && obj.value.length != 0)
		if (tecla == 46)
			opc = true;

return opc;

}


function validarEmail2(obj) {
	valor=obj.value;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)){
		return (true)
	} 
	else {
		alert("La dirección de email es incorrecta.");
		obj.focus();
		return (false);
	}
}


function preocesar_ajax(parametos){
	$.ajax({ 
		   async:true, 
           type: "POST",
		   dataType: "html", 
           contentType: "application/x-www-form-urlencoded", 
		   //contentType: 'application/json',
           url:"ajax/libajax.php", 
           data:parametos, 
          // beforeSend:inicioEnvio, 
           success:llegadaDatos, 
		   //complete
           timeout:4000,
		   complete: completa_uno   
           //error:problemas 
         }); 	
		 	 
}


function buscar_ruta(rut){
	
	//alert(rut)
	
	detectarCarga();
	if(document.getElementById('caja_busqueda_envio'))
	{
		//alert(22)
		if($("#caja_busqueda_envio").value != "")
		{
			document.getElementById('caja_busqueda_envio').value=document.getElementById('caja_busqueda').value;
			if(document.getElementById('filt_medio'))
			{

				if($("#filt_medio").value != 0 || $("#filt_categoria").value != 0 || $("#filt_estado").value != 0 || $("#filt_mpublicacion").value != 0 )
				{
					var rut = rut + "&filt_medio=" + document.getElementById('filt_medio').value+ "&filt_categoria="+ document.getElementById('filt_categoria').value+ "&filt_estado="+ document.getElementById('filt_estado').value+"&filt_mpublicacion="+ document.getElementById('filt_mpublicacion').value+"&regpg="+document.getElementById('selector_cantidad').value+ "&buscando=" + document.getElementById('caja_busqueda_envio').value ;
				}
			}
		else
			{
				
				var rut = rut + "&buscando=" + document.getElementById('caja_busqueda_envio').value+"&regpg="+document.getElementById('selector_cantidad').value ;
			}
		}
	}

	if(document.getElementById('filt_medio')){

	if($("#caja_busqueda_envio").value !="" || $("#filt_medio").value != 0 || $("#filt_categoria").value != 0 || $("#filt_estado").value != 0 || $("#filt_mpublicacion").value != 0 )
		{
			var rut = rut + "&buscando=" + document.getElementById('caja_busqueda_envio').value+"&filt_medio=" + document.getElementById('filt_medio').value+ "&filt_categoria="+ document.getElementById('filt_categoria').value+ "&filt_estado="+ document.getElementById('filt_estado').value+"&filt_mpublicacion="+ document.getElementById('filt_mpublicacion').value+"&regpg="+document.getElementById('selector_cantidad').value ;
			
		}
	}






	if(rut!=''){
		//var w=1;
		window.location=rut+"&filt_medio1=" + document.getElementById('filt_medio1').value+ "&filt_categoria1="+ document.getElementById('filt_categoria1').value+ "&filt_estado1="+ document.getElementById('filt_estado1').value+"&filt_mpublicacion1="+ document.getElementById('filt_mpublicacion1').value;
		
		
	}
	else{
		return false
	}
}

function buscar_ruta_man(rut){
	detectarCarga();
	if(rut!=''){ window.location=rut; } else{ return false; }
}


function resalte(id){
alert(id)	
}

function sin_resalte(id){
alert(id)	
}


function  evento_check(id_tr,obj){	
//alert(obj.checked)
	if(obj.checked==true){
		$('#'+id_tr).css("background", "#EBEBEB");	
		//document.getElementById(id_tr).style.background='#EBEBEB'
	}
	else {
		$('#'+id_tr).css("background", "#FBFBFB");	
		//document.getElementById(id_tr).style.background='#'
	}
}

function marcar_filar(){
$("#check_todos").click(function(event){
		if($("#check_todos").is(":checked")==true){
			$('.chkfila').trigger('click');
		}
		
		if($("#check_todos").is(":checked")==false){
			//alert(2)
			//var leo=id_tr
			//var chks=$("input:checkbox");
			//var leo='id_tr_1';
			$('.tr-fila').css("background", "#FBFBFB");	
			//alert($('.'+leo).attr("background"))
			//alert($('#id_tr_1').attr("style.background"))
			//$('.'+leo).css("background", "#333");
			//$('.'+leo).removeAttr("background");
			//$('.'+leo).attr("background","#333");
			//$('.chkfila').removeAttr("background")
			$('.chkfila').removeAttr("checked");	
			//	$('.chkfila').css("background", "#333");	
			//chks.removeAttr("background=''");	
		}	
	});
}


function enviar_edicion(rut,id_reg,id_consulta){
	//alert(rut+"&id_regs="+id_reg)
	window.location=rut+"&id_regs="+id_reg;
}

function enviar_eliminacion(rut,id_reg){
	window.location=rut+"?id_regs="+id_reg;
}

function iniciar_busqueda(ruta,id_inter){
	//alert(ruta)
	//alert(id_inter)
	if($("#caja_busqueda").value != "")
	{
		document.getElementById('caja_busqueda_envio').value=document.getElementById('caja_busqueda').value;
		var ruta_envio= ruta+ id_inter+"&buscando=" + document.getElementById('caja_busqueda_envio').value ;
		buscar_ruta(ruta_envio);
	}
}


function iniciar_ventana(){
	$(function(){
		// Dialog
		$('#dialog').dialog({
			autoOpen: false,
			width: 300,
			resizable: false,
			modal: true,
			title: "Datos Incompletos",
			draggable: false,
		//	closeText: 'hide', 
		//	stack: false ,
		//	show: "slide",
			buttons: {
				"Aceptar": function() {
					$(this).dialog("close");
				}
				//"Cancel": function() {
				//	$(this).dialog("close");
				//},
				//"ayuda": function() {
					//$(this).dialog("close");
				//}
			}
		});
	});
}


function iniciar_Eliminacion(){
$(function(){
		// Dialog
		$('#dialog_del').dialog({
			autoOpen: false,
			width: 300,
			resizable: false,
			modal: true,
			title: "Borrar Registro",
			draggable: false,
		//	closeText: 'hide', 
		//	stack: false ,
		//	show: "slide",
			buttons: {
				"Eliminar": function() {
					$(this).dialog("close");
					//var comp = document.getElementById().value
					go_consulta();
				},
				"Cancelar": function() {
					$(this).dialog("close");
				}
				//"Cancel": function() {
				//	$(this).dialog("close");
				//},
				//"ayuda": function() {
					//$(this).dialog("close");
				//}
			}
		});
	});	
}



function go_consulta(){
	var rutas=document.getElementById('ruta_consulta').value;
	rutas= rutas+ '&id_eliminacion='+ document.getElementById('id_regs').value;
	window.location =rutas;
}



function consulta_eliminacion(ruta,id_reg){
	
if(confirm("Esta seguro de Eliminar el Registro?.")) 
	{
		ruta=ruta+'&id_eliminacion='+id_reg;
		window.location =ruta;		
	} 	
	
	
}



function confrimar_Eliminacion(){
	//alert(3)
	$('#dialog_del').dialog('open');
		return false;
}


function open_editor(form_name,field_name,sitio_id){
	url2 = "spaw/scripts/editor.php?parent_form="+form_name+"&parent_field="+field_name+"&sitio_id="+sitio_id;
	window.open(url2,'editorWindow','toolbars=no,scrollbars=yes,resizable=yes,width=750,height=500');
}


function open_editor_v2(form_name,field_name,plantilla){
	url2 = "editor2/edit.php?parent_form="+form_name+"&parent_field="+field_name+"&id="+plantilla;
	var myWindow=window.open(url2,'editorWindow','toolbars=no,scrollbars=no,resizable=no,width=800,height=500');
	myWindow.focus();
	//myWindow.opener.document.getElementById().value=
}


function open_editor_v2_plan(form_name,field_name,plantilla){
	url2 = "editor2/edit.php?parent_form="+form_name+"&parent_field="+field_name+"&plantilla="+plantilla;
	var myWindow=window.open(url2,'editorWindow','toolbars=no,scrollbars=no,resizable=no,width=800,height=500');
	myWindow.focus();
	//myWindow.opener.document.getElementById().value=
}


function iniciar_checks(){
	$("#todos_consultar").click(function() {
		if($('#todos_consultar').is(':checked') == true){
			$(".consl").attr("checked", "checked");;
		} else {
			$(".consl").removeAttr("checked");
		}
	});
	
	$("#todos_insertar").click(function() {
		if($('#todos_insertar').is(':checked') == true){
			$(".insert").attr("checked", "checked");;
		} else {
			$(".insert").removeAttr("checked");
		}
	});
		
	$("#todos_editar").click(function() {
		if($('#todos_editar').is(':checked') == true){
			$(".edit").attr("checked", "checked");;
		} else {
			$(".edit").removeAttr("checked");
		}
	});
	
	$("#todos_eliminar").click(function() {
		if($('#todos_eliminar').is(':checked') == true){
			$(".elimi").attr("checked", "checked");;
		} else {
			$(".elimi").removeAttr("checked");
		}
	});	
}


function eliminar_imagen(obj_contenedor,obj_edicion){
	obj_contenedor='img_contine_edicion_'+obj_contenedor; 
	document.getElementById(obj_edicion).value="ELIMINADO"
	document.getElementById(obj_contenedor).style.display="none";

}

function mostar_imagen(accion,imagen){
	if(accion=='mostar')
		window.open(imagen,"ventana");
		
	if(accion=='descargar')
		window.open('descarga.php?file='+imagen,"ventana");	
		
}


//////////////////////////////////////////////////
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
   
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}


function open_galeria(obj){
	estado_ven_gal();
	//document.getElementById("contenedor_imagenes_gal").style.display = "none";
}


function mostrar_pie(obj, obj_img, ruta ,caja_text_pie,obj_texto){
	//alert(ruta)
	document.getElementById('img_para_pie').src=ruta;
	document.getElementById('txt_pie').value=document.getElementById(obj_img).title;
	document.getElementById('id_caja_imagen').value=obj_img;
	document.getElementById('id_temp_texto').value=obj_texto;
}

function cerrar_pie(){
	obj_img=document.getElementById('id_caja_imagen').value;
	obj_text=document.getElementById('id_temp_texto').value;
	document.getElementById(obj_img).title = document.getElementById('txt_pie').value;
	document.getElementById(obj_text).value = document.getElementById('txt_pie').value;
	document.getElementById('txt_pie').value="";	
}


function recorer_galeria(){
	document.getElementById('gal_datos').value='';
	var topmenu = document.getElementById("image-list");
	var items = topmenu.getElementsByTagName("li");	
	if(items){
		var items_cajas = topmenu.getElementsByTagName("input");	
		var items_fotos = topmenu.getElementsByTagName("img");	
		var cantidad = items.length;
		for(i=0;i<cantidad;i++)
		{
			document.getElementById('gal_datos').value = document.getElementById('gal_datos').value + '@@@'+ items_fotos[i].id + '&&&' + document.getElementById(items_cajas[i].id).value;
		}	
	}
}


function solonumeros2(obj,e) { // 1 
	tecla_codigo = (document.all) ? e.keyCode : e.which; // 2 
	if(tecla_codigo==8)
		return true;
	patron =/[\d.]/;
	tecla_valor = String.fromCharCode(tecla_codigo);
	var datos=obj.value;
	control=(tecla_codigo==46 && (/[.]/).test(datos))?false:true
	return patron.test(tecla_valor) && control;
}

function comprueba_extension(formulario, archivo) { 
	//comprueba_extension(forma, forma.bpdf_pos.value)
   extensiones_permitidas = new Array(".doc", ".docx", ".pdf"); 
   mierror = ""; 
   if (!archivo) {
	   //alert(1)
      	mierror = "No has seleccionado ningún archivo"; 
		var no_valida =1;
   }else{ 
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      permitida = false; 
      for (var i = 0; i < extensiones_permitidas.length; i++) { 
         if (extensiones_permitidas[i] == extension) { 
         permitida = true; 
         break; 
         } 
      } 
      if (!permitida) { 
         mierror = "Comprueba la extension de los archivos a subir. \nSolo se pueden subir archivos con extensiones: " + extensiones_permitidas.join(); 
      	}else{ 
        // alert ("Todo correcto. Voy a submitir el formulario."); 
         return 1; 
      	} 
   } 
   
   if(no_valida==1){
	   return 0;
   }
   
   else {
		alert (mierror); 
		return 0; 
   }
} 

function open_galeria(obj){
	estado_ven_gal();
	//document.getElementById("contenedor_imagenes_gal").style.display = "none";
}


function verifica_reloj(){
	document.getElementById('reloj_espera').click();	
}






function comprueba_extension_imagen( archivo) { 
   extensiones_permitidas = new Array(".gif", ".jpg", ".png", ".jpeg"); 
   mierror = ""; 
   if (!archivo) { 
      //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario 
      	mierror = "No has seleccionado ningún archivo"; 
   }else{ 
      //recupero la extensión de este nombre de archivo 
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      //alert (extension); 
      //compruebo si la extensión está entre las permitidas 
      permitida = false; 
      for (var i = 0; i < extensiones_permitidas.length; i++) { 
         if (extensiones_permitidas[i] == extension) { 
         permitida = true; 
         break; 
         } 
      } 
      if (!permitida) { 
         mierror = "Comprueba la extension de los archivos a subir. \nSolo se pueden subir archivos con extensiones: " + extensiones_permitidas.join(); 
		 alert(mierror)
		return 0;	
      	}else{ 
         	 //submito! 
         //alert ("Todo correcto. Voy a submitir el formulario."); 
        // formulario.submit(); 
         return 1; 
      	} 
   } 
   //si estoy aqui es que no se ha podido submitir 
   //alert (mierror); 
   return 0; 
}

function ocultar_mostrar(div1, div2, estado)
{
	
	var est= document.getElementById(estado).value;
	var obj1= document.getElementById(div1);
	var obj2= document.getElementById(div2);
	

	if(est==1)
	{	
		obj1.style.display='inline';
		obj2.style.display='none';
	}
	else
	{
		obj1.style.display='inline';
		obj2.style.display='inline';

	}
}
function recorrer(obj, clase){
	var total='';
	$('.'+ clase).each(function(indice, elemento) {
		total=total+'&&'+$(elemento).val();
	}); 
	document.getElementById(obj).value=total;
}

function procesar_ajax_clave(parametos){
	$.ajax({ 
		   async:true, 
           type: "POST",
		   dataType: "html", 
           contentType: "application/x-www-form-urlencoded", 
		   //contentType: 'application/json',
           url:"ajax/libajax.php", 
           data:parametos, 
          // beforeSend:inicioEnvio, 
           success:llegadaDatos, 
		   //complete
           timeout:4000,
		   complete: completa_uno   
           //error:problemas 
         }); 	
		 	 
}

function enviar()
{
	
		if($("#con_1").val()!="" && $("#con_2").val()!="")
		{
			if($("#con_1").val() == $("#con_2").val())
			{
				$("#main_fform").submit();
			}
			else
			{
				$("#warning").show();
				$("#warning").html("Las contraseñas deben coincidir.");
			}
		}
		else
		{
			$("#warning").show();
			$("#warning").html("Por favor, diligencie los dos campos.");
		}
}

function fun_reabrir (cod){

		if(confirm("Esta seguro de enviar a edici\u00f3n?.")) 
	{
		$.post( "reabrir_trabajo.php", { tipo_trabajo: cod})
		.done(function( data ) {
		location.href="consolidado_trabajos.php";	
		});
	}




}