//Formularios
$(document).ready(function(){
	validateLogin();
	validateOlvClave();
	resetBusqueda();
	formBusqPersona();
	formBusqEmpresa();
	formBusqEvento();
	validateFormReporte();
	itemsDinamicos();
	formBusqSegmento();
	formBusqSector();
	formBusqTitulo();
	validateformPerfil();
	
	
});

//Formulario login
function validateLogin(){
	var formLogin = $('#formLogin');
	if(formLogin.length){
		formLogin.validate({
			rules:{
				usu:"required",
				pass:"required"
			},
			submitHandler:function(){
				window.location.href="inicio.php";
			}
		});
	}
}

//reset busqueda
function resetBusqueda(){

	var resetBusq = $('#resetBusq');
	
	if(resetBusq.length){
		resetBusq.on('click',function(e){
			$(":text").val('');
			$('select').val('0');
			e.preventDefault();
			$('#divResult').empty();
		});
	}

}

//Formulario olvido clave
function validateOlvClave(){
	var formOlvClave = $('#formOlvClave');
	if(formOlvClave.length){
		formOlvClave.validate({
			rules:{
				mail:{required:true,email:true}
			},
			submitHandler:function(form){
				$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=perfil&&operacion=recuperar_perfil",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				})  .done (function(result){
					
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formOlvClave,'Registro exitoso',mensaje,closeFancy);
				});


				
			}
		});
	}
}


//formulario busqueda personas
function formBusqPersona(){
	var formBusqPersona = $('#formBusqPersona');
	if(formBusqPersona.length){
		var divResult = $('#divResult');
		formBusqPersona.validate({
			rules:{
				//nom:"required"
			},
			submitHandler:function(form){
			
				
					$.ajax({
					type:"POST",
					url:"result.php",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					divResult.html(resp);
					openFormFancy();
				});
			}
		});
	}
}

//Formulario nueva persona
function validateFormPersona(){
	var formPersona = $('#formPersona');
	if(formPersona.length){
		formPersona.validate({
			rules:{
				"nom-per":"required"

				/*"tit-per":"required",*/
				/*"nom-per":"required",*/

				/*"ape-per":"required",
				"gen-per":"required",
				"prof-per":"required",
				"civ-per":"required",
				"mail-per":{required:true,email:true},
				"twi-per":"required",
				"cel-per":{required:true,number:true},
				"ciud-per":"required",
				"dir-per":"required",
				"tel-per":{required:true,number:true},
				"sect-per":"required",
				"segm-per":"required",
				"event-per":"required",*/
				/*"emp-per":"required",
				"dep-emp":"required",
				"car-emp":"required",
				"mail-emp":{required:true,email:true},
				"tel-emp":{required:true,number:true},
				"obs-per":"required"*/
			},
			submitHandler:function(form){

				//console.log(formPersona.serialize())
				verificar_empre();
				virificar_eventos(formPersona);
				verificar_even();

				$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=persona&&operacion=crear_persona",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				})  .done (function(result){
					//var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					/*var mensaje = '<div class="gForm"><p><label>Confirmar dirección de correspondencia</label><select><option>Seleccione...</option></select></p>'
					createAlert(formPersona,'Confirmar',mensaje,persona2);
					*/
					var mensaje ='<p>Confirmar dirección de correspondencia</p>';
					createAlertConfirma(formPersona,'Confirmar',mensaje,corresp);
				});


				
			}
		});
		
		//Eliminar registro
		var deleteReg = formPersona.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formPersona,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_persona);
			});
		}
		
		//toggle form conyuge
		$('#toggleFC').on('click',function(e){
			e.preventDefault();
			openFormConyuge($(this).attr('href'));
		});
		itemsDinamicos();
		cargarEvento();
		cargarCiudades(formPersona, 'ciud-per');

	}
}




function borrar_persona(){
$.ajax({
	  type: "POST",
	  url:"ajax/libajax.php?funcion=persona&&operacion=borrar_persona",
	  data:  {"codigo":  $('#ultimo_id').val()}
	  
}).done(function(){closeFancy();} ) ;

}



//funcion persona 2
function persona2(){
	var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
	createAlert($('#formPersona'),'Registro exitoso',mensaje,closeFancy);
}


//Formulario conyuge
function validateFormConyuge(){
	var formConyuge = $('#formConyuge');
	if(formConyuge.length){
		formConyuge.validate({
			rules:{
				"nom-c":"required",
				//"ape-c":"required",
				//"tel-c":{required:true,number:true},
				//"mail-c":{required:true,email:true},
				//"usu-c":"required",
				"obs-c":"required"
			},
			submitHandler:function(form){
				
				//console.log(formConyuge.serialize())
				$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=conyugue&&operacion=crear_persona",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				})  .done (function(result){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formConyuge,'Registro exitoso',mensaje,closeFormConyuge);
				});




				



			}
		});
		
		//Eliminar registro
		var deleteReg = formConyuge.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formConyuge,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',closeFormConyuge);
			});
		}
		
		//toggle form conyuge
		$('#contFC .btnClose').on('click',function(e){
			e.preventDefault();
			closeFormConyuge();
		});
		//textarea length
		loadMaxlength($('.maxLength'), 128);
	}
}
//toogle form conyuge
function openFormConyuge(url){
	$.ajax({
		url:url,
		method:"POST",
		dataType:"html"
	}).done(function(resp){
		$('#contFC').html(resp).fadeIn(200,function(){
			validateFormConyuge();
		});
	});
}
function closeFormConyuge(){
	$('#contFC').fadeOut(200,function(){
		$('#contFC').empty();
	});
}



//formulario busqueda empresa
function formBusqEmpresa(){
	var formBusqEmpresa = $('#formBusqEmpresa');
	if(formBusqEmpresa.length){
		var divResult = $('#divResult');
		formBusqEmpresa.validate({
			rules:{
				//nom:"required"
			},
			submitHandler:function(form){
			
				
					$.ajax({
					type:"POST",
					url:"result.php",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					divResult.html(resp);
					openFormFancy();
				});
			}
		
		});
	}
}

//Formulario nueva empresa
function validateFormEmpresa(){
	var formEmpresa = $('#formEmpresa');
	if(formEmpresa.length){
		formEmpresa.validate({
			rules:{
				nom:"required"
				//ciud:"required",
				//dir:"required",
				//tel:{required:true},
				//mail:{required:true,email:true},
				//web:{required:true,url:true},
				//sect:"required",
				//obs:"required"
			},
				submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=empresa&&operacion=crear_empresa",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formEmpresa,'Registro exitoso',mensaje,closeFancy);
				});
			}
		});
		
		//Eliminar registro
		var deleteReg = formEmpresa.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formEmpresa,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_empresa);
			});
		}
		
		//toggle form sucursal
		$('#toggleFC, .openEditSurc').on('click',function(e){
			e.preventDefault();
			openFormSucursal($(this).attr('href'));
		});
		cargarCiudades(formEmpresa, 'ciud');

	}
}
//Formulario nueva sucursal
function validateFormSucursal(){
	var formSucursal = $('#formSucursal');
	if(formSucursal.length){
		formSucursal.validate({
			rules:{
				nom:"required",
				ciud:"required"
				//dir:"required",
				//tel:{required:true},
				//mail:{required:true,email:true},
				//web:{required:true,url:true}
				//sect:"required",
				//obs:"required"
			},
				submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=surcursal&&operacion=crear_empresa_sucursal",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formSucursal,'Registro exitoso',mensaje,closeFancy);
				});
				console.log('ok')
			}
		});
		
		//Eliminar registro
		var deleteReg = formSucursal.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formSucursal,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_sucursal);
			});
		}


		
		//toggle form conyuge
		$('#contFC .btnClose').on('click',function(e){
			e.preventDefault();
			closeFormSucursal();
		});
		//textarea length
		loadMaxlength($('.maxLength'), 128);
	}
}
//Borrar Sucursal

function borrar_sucursal(){
$.ajax({
	  type: "POST",
	  url:"ajax/libajax.php?funcion=surcursal&&operacion=borrar_sucursal",
	  data:  {"edis":  $('#edis').val()}
	  
}).done(function(){closeFancy();} ) ;
}
//Borrar empresa
function borrar_empresa ()
{
	$.ajax({
		  type: "POST",
		  url:"ajax/libajax.php?funcion=empresa&&operacion=borrar_empresa",
		  data:  {"edi":  $('#edi').val()}
		  
	}).done(function(){closeFancy();} ) ;
}
//toogle form sucursal
function openFormSucursal(url){
	$.ajax({
		url:url,
		method:"POST",
		dataType:"html"
	}).done(function(resp){
		$('#contFC').html(resp).fadeIn(200,function(){
			validateFormSucursal();
		});
	});
}
function closeFormSucursal(){
	$('#contFC').fadeOut(200,function(){
		$('#contFC').empty();
	});
}


//function externa eliminar registro
function ejemplo(){
	alert($('#edi').val())
	
	$.ajax({
	  type: "POST",
	  url:"ajax/libajax.php?funcion=regEli&&operacion=act_empresa",
	  data: $('#edi').val(),
	  success: success
	});

	closeFancy();
}


//formulario busqueda evento
function formBusqEvento(){
	var formBusqEvento = $('#formBusqEvento');
	if(formBusqEvento.length){
		var divResult = $('#divResult');
		formBusqEvento.validate({
			rules:{
				even:"required"
			},
				submitHandler:function(form){
			
				
					$.ajax({
					type:"POST",
					url:"result.php",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					divResult.html(resp);
					openFormFancy();
				});
			}
		});
	}
}

//Formulario nuevo evento
function validateFormEvento(){
	var formEvento = $('#formEvento');
	if(formEvento.length){
		formEvento.validate({
			rules:{
				nom:"required",
				//tip:"required",
				obs:"required"
			},
					submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=evento&&operacion=crear_evento",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formEvento,'Registro exitoso',mensaje,closeFancy);
				});
			}
		});
		
		//Eliminar registro
		var deleteReg = formEvento.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formEvento,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_evento);
			});
		}
	}
}

//Borrar evento
function borrar_evento ()
{
	$.ajax({
		  type: "POST",
		  url:"ajax/libajax.php?funcion=evento&&operacion=borrar_evento",
		  data:  {"edi":  $('#edi').val()}
		  
	}).done(function(){closeFancy();} ) ;
}

//Formulario reporte
function validateFormReporte(){
	var formBusqReporte = $('#formBusqReporte');
	if(formBusqReporte.length){
		var divResult = $('#divResult');
		formBusqReporte.validate({
			rules:{
				/*even:"required",
				sect:"required",
				segm:"required"
				*/
			},
				submitHandler:function(form){

					if($("#prev").val()!=1)
					{
						validar_checks();
						$.ajax({
							type:"POST",
							url:"result.php",
							data:new FormData(form),
							cache: false,
							contentType: false,
							processData: false,
							success:function(){},
							beforeSend:function(){
						      gLoading('open');
						    },
							error:function(){
								alert('ocurrio un error')
							},
							complete:function(){
								gLoading('close');
							},

						}).done(function(resp){
							divResult.html(resp);
							openFormFancy();
						});
						
					}
					else
					{
						//Boton generar reporte
						 $("#prev").val('0');
						$.ajax({
						type:"post",
							url:"result_proceso.php",
							data:new FormData(form),
							cache: false,
							contentType: false,
							processData: false,
							success:function(){},
							beforeSend:function(){
							gLoading('open');
							},
							error:function(){
							//alert('ocurrio un error')
							},
							complete:function(){
							gLoading('close');
							},

							}).done(function(result){
							createAlert(formBusqReporte,'Reporte creado','<p>El reporte se ha creado exitosamente y se ha descargado a su disco duro. <br><br>Importe el archivo a excel para visualizarlo y modificarlo.</p>');
							window.open("result_excel.php");

						});
					}
			}
		});
		
		formBusqReporte.find('#genExcel').on('click',function(){
			 $("#prev").val('1');
			 $("#formBusqReporte").submit();	
		});

		
		



	}
}



//items dinamicos
function itemsDinamicos(){
	var btnMas = $('.contRemove .btnMas');
	if(btnMas.length){
		btnMas.on('click',function(e){
			e.preventDefault();
			createItem($(this));
		});
	}
		var addField = $('.addField');
	if(addField.length){
		addField.each(function(){
			$(this).on('click',function(e){
				e.preventDefault();
				$($(this).attr('href')+' .contRemove .btnMas').click();
			});
		});
	}


/**/


	var remove = $('.remove');
	if(remove.length){
		remove.on('click',function(e){
		e.preventDefault();
		removeItem($(this));
	});
	}
	
}


function createItem(btn){
	var item = btn.parents('.contRemove'), content = btn.parents('ul');
	if(item.find('select').val()==""){item.find('select').focus();return false}
	var html = item.clone();
	html.removeAttr('style');
	if(html.find('.btnMas')){html.find('.btnMas').remove();html.append('<span class="remove">x</span>')}
	//if(html.find('label.error')){html.find('label.error').remove()}
	if(html.find('select')){
		var select = html.find('select');
		if(select.hasClass('error')){return false}
		select.each(function(){
			if(html.find('label[for='+$(this).attr('id')+']')){html.find('label[for='+$(this).attr('id')+']').remove()}
			var ultimo = content.find('li:last-child select'), cont = 1;
			if(ultimo.data('num')){cont = ultimo.data('num')}
			$(this).attr('id',$(this).attr('id')+'-'+(cont+1)).attr('name',$(this).attr('name')+'-'+(cont+1)).data('num',cont+1);
			//$(this).find('option').each(function(){if($(this).val()==""){$(this).remove()}});
		});
	}
	if(html.find('input')){
		var input = html.find('input');
		if(input.hasClass('error')){return false}
		input.each(function(){
			var ultimo = content.find('li:last-child input'), cont = 1;
			if(ultimo.data('num')){cont = ultimo.data('num')}
			$(this).attr('id',$(this).attr('id')+'-'+(cont+1)).attr('name',$(this).attr('name')+'-'+(cont+1)).data('num',cont+1).val('');
		});
	}
	
	content.append(html);
	html.find('.remove').on('click',function(e){
		e.preventDefault();
		removeItem($(this));
	});
	var elemto=html.find('.findSuc');
	if(elemto.length)
	{
		cargarEvento(elemto);
	}

	
}


function removeItem(btn){
	btn.parents('.contRemove').remove();
}

//mensaje alerta general
function createAlert(form,titulo,contenido,funcionExt){
	form.append('<div id="gAlert">'+contenido+'</div>');
	var gAlert = $('#gAlert');
	gAlert.dialog({
		title:titulo,
		modal:true,draggable:false,resizable:false,closeOnEscape:false,dialogClass:"noClose",width: 400,
		buttons:{
			Aceptar:function(){
				if(funcionExt){funcionExt()}
				$(this).dialog("close").dialog("destroy");
				gAlert.remove();
			}
		}
	});
}
//mensaje alerta eliminar
function createAlertElim(form,titulo,contenido,funcionExt){
	form.append('<div id="gAlert">'+contenido+'</div>');
	var gAlert = $('#gAlert');
	gAlert.dialog({
		title:titulo,
		modal:true,draggable:false,resizable:false,closeOnEscape:false,dialogClass:"noClose",width: 500,
		buttons:{
			"Si, eliminar registro":function(){
				if(funcionExt){funcionExt()}
				$(this).dialog("close").dialog("destroy");
				gAlert.remove();
				createAlert($('body'),'Confirmación','<p>El registro se ha eliminado exitosamente!</p>');
			},
			"No, cancelar esta acción":function(){
				$(this).dialog("close").dialog("destroy");
				gAlert.remove();
			}
		}
	});
}

//cerrar fancy
function closeFancy(){
	$.colorbox.close();
}

//Alerta de confirmacion
function createAlertConfirma(form,titulo,contenido,funcionExt){
	form.append('<div id="gAlert">'+contenido+'</div>');
	var gAlert = $('#gAlert');
	gAlert.dialog({
		title:titulo,
		modal:true,draggable:false,resizable:false,closeOnEscape:false,dialogClass:"noClose",width: 400,
		buttons:{
			"Aceptar":function(){
				$(this).dialog("close").dialog("destroy");
				gAlert.remove();
				if(funcionExt){funcionExt(form)}
			},
			"Cancelar":function(){
				$(this).dialog("close").dialog("destroy");
				gAlert.remove();
				closeFancy();
			}
		}
	});
}

//funcion confirmacion corresp
function corresp(form){
	$.ajax({
		type:"POST",
		url:"correspondencia.php",
		data: {para:form.find('#ultimo_id').val()},
		dataType:'html',
		success:function(){},
		beforeSend:function(){
			gLoading('open');
		},
		error:function(){},
		complete:function(){}
	}).done(function(result){
		closeFancy();
		createFormCorres(form,'Confirmar',result);
		validateFormCorresp();
		gLoading('close');
	});
}

function createFormCorres(form,titulo,contenido){
	form.append('<div id="gAlert">'+contenido+'</div>');
	var gAlert = $('#gAlert');
	gAlert.dialog({
		title:titulo,
		modal:true,draggable:false,resizable:false,closeOnEscape:false,dialogClass:"noClose",width: 500
	});
}

function validateFormCorresp(){
	var formCorresp = $('#formCorresp');
	if(formCorresp.length){
		formCorresp.validate({
			rules:{
				dir_corr:"required"
			},
			submitHandler:function(form){
				
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=correspondencia&&operacion=editar_correspondecia",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){},
					error:function(){},
					complete:function(){}
				}).done(function(resp){
					//cerrar dialog
					closeDialogCorres();
				});

				
			}
		});
	}
}

//cerrar dialog form correspondencia
function closeDialogCorres(){
	var dialogCorr = $('#gAlert');
	dialogCorr.dialog("close").dialog("destroy");
	dialogCorr.remove();
}

function cargarEvento(elem)
{
	if(elem){

		var findSuc =elem;
	}
	else
	{
		var findSuc = $('.findSuc');
	}
	
	if(findSuc.length)
	{
		findSuc.on('change',function()
		{
			var selectSuc=$(this).parents('.contRemove').find("select[id^='sucur']");
			var ValorEmpre=$(this).val();

			
			$.ajax({
				type:"POST",
				url:"buscar_surcursal.php",
				data: {para:ValorEmpre},
				dataType:'html',
				success:function(){},
				beforeSend:function(){},
				error:function(){},
				complete:function(){}
			}).done(function(result){
				
				var resT=$.trim(result);
				if(resT!='false'){
					selectSuc.removeAttr('disabled').html(result);
					cargarEventoSucursal(selectSuc);

				}
				else
				{	
					selectSuc.html('<option value="">Seleccione..</option>').attr('disabled','disabled'); 
				}
				buscarDatos(selectSuc, ValorEmpre);

				
			});


		});
	}
}

function buscarDatos(selectSuc, resutados)
{

	
	var Telefono=selectSuc.parents('.contRemove').find("input[id^='tel-emp']");
	var Direccion=selectSuc.parents('.contRemove').find("input[id^='dir-emp']");
	
	$.ajax({
		type:"POST",
		url:"buscar_datos.php",
		data: {para:resutados},
		dataType:'json',
		success:function(){},
		beforeSend:function(){},
		error:function(){},
		complete:function(){}
	}).done(function(result){
		if(result!=null){
			Telefono.val(result[0].tel);
			Direccion.val(result[0].direc);
		}
		else
		{
			Telefono.val('');
			Direccion.val('');
		}
	});
	

}

function cargarEventoSucursal(selectSuc)
{
	selectSuc.unbind();
	selectSuc.on('change',function()
	{
		buscarDatos(selectSuc, $(this).val());
	});
	
}

function cargarCiudades(form, campo)
{
	var findDepartamento = $('#dep');
	
	if(findDepartamento.length)
	{
		findDepartamento.on('change',function()
		{
			var selectCiud=form.find('#'+campo);
			var ValorDepartamento=$(this).val();
			$.ajax({
				type:"POST",
				url:"buscar_ciudades.php",
				data: {para:ValorDepartamento},
				dataType:'html',
				success:function(){},
				beforeSend:function(){},
				error:function(){},
				complete:function(){}
			}).done(function(result){
				var resT=$.trim(result);
				if(resT!='false'){
					selectCiud.removeAttr('disabled').html(result);
				}
				else
				{	
					selectCiud.html('<option value="">Seleccione..</option>').attr('disabled','disabled'); 
				}	
			});
		});
	}
}
//formulario busqueda segmento
function formBusqSegmento(){
	var formBusqSegmento = $('#formBusqSegmento');
	if(formBusqSegmento.length){
		var divResult = $('#divResult');
		formBusqSegmento.validate({
			rules:{
				segm:"required"
			},
				submitHandler:function(form){	
					$.ajax({
					type:"POST",
					url:"result.php",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					divResult.html(resp);
					openFormFancy();
				});
			}
		});
	}
}

//Formulario nuevo segmento
function validateFormSegmento(){
	var formSegmento = $('#formSegmento');
	if(formSegmento.length){
		formSegmento.validate({
			rules:{
				nom_seg:"required"
			},
					submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=segmento&&operacion=crear_segmento",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formSegmento,'Registro exitoso',mensaje,closeFancy);
				});
			}
		});
		
		//Eliminar registro
		var deleteReg = formSegmento.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formSegmento,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_segmento);
			});
		}
	}
}

//Borrar segmento
function borrar_segmento ()
{
	$.ajax({
		  type: "POST",
		  url:"ajax/libajax.php?funcion=segmento&&operacion=borrar_segmento",
		  data:  {"edi":  $('#edi').val()}
		  
	}).done(function(){closeFancy();} ) ;
}

// funcion busqueda sector
function formBusqSector(){
	var formBusqSector = $('#formBusqSector');
	if(formBusqSector.length){
		var divResult = $('#divResult');
		formBusqSector.validate({
			rules:{
				sect:"required"
			},
				submitHandler:function(form){	
					$.ajax({
					type:"POST",
					url:"result.php",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					divResult.html(resp);
					openFormFancy();
				});
			}
		});
	}
}

//Formulario nuevo sector
function validateFormSector(){
	var formSector = $('#formSector');
	if(formSector.length){
		formSector.validate({
			rules:{
				nom_sec:"required"
			},
					submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=sector&&operacion=crear_sector",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formSector,'Registro exitoso',mensaje,closeFancy);
				});
			}
		});
		
		//Eliminar registro
		var deleteReg = formSector.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formSector,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_sector);
			});
		}
	}
}

//Borrar segmento
function borrar_sector ()
{
	$.ajax({
		  type: "POST",
		  url:"ajax/libajax.php?funcion=sector&&operacion=borrar_sector",
		  data:  {"edi":  $('#edi').val()}
		  
	}).done(function(){closeFancy();} ) ;
}



// funcion busqueda sector
function formBusqTitulo(){
	var formBusqTitulo = $('#formBusqTitulo');
	if(formBusqTitulo.length){
		var divResult = $('#divResult');
		formBusqTitulo.validate({
			rules:{
				tit_per:"required"
			},
				submitHandler:function(form){	
					$.ajax({
					type:"POST",
					url:"result.php",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					divResult.html(resp);
					openFormFancy();
				});
			}
		});
	}
}

//Formulario nuevo titulo
function validateFormTitulo(){
	var formTitulo = $('#formTitulo');
	if(formTitulo.length){
		formTitulo.validate({
			rules:{
				nom_tit:"required"
			},
					submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=titulo&&operacion=crear_titulo",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){
						alert('ocurrio un error')
					},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formTitulo,'Registro exitoso',mensaje,closeFancy);
				});
			}
		});
		
		//Eliminar registro
		var deleteReg = formTitulo.find('.deleteReg');
		if(deleteReg.length){
			deleteReg.on('click',function(){
				createAlertElim(formTitulo,'Confirmación','<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>',borrar_titulo);
			});
		}
	}
}

//Borrar titulo
function borrar_titulo ()
{
	$.ajax({
		  type: "POST",
		  url:"ajax/libajax.php?funcion=titulo&&operacion=borrar_titulo",
		  data:  {"edi":  $('#edi').val()}
		  
	}).done(function(){closeFancy();} ) ;
}
//Formulario de perfil.
function validateformPerfil(){
	var formPerfil = $('#formPerfil');
	if(formPerfil.length){
		formPerfil.validate({
			errorElement:'span',
			rules:{
				
				nueva1:"required",
				nueva2:{required:true,equalTo:"#nueva1"}
			},
			messages:{
				
				nueva1:"* Campo Obligatorio",
				nueva2:{required:"* Campo Obligatorio",equalTo:"* Las contraseñas no coinciden"}
			},
				submitHandler:function(form){
					$.ajax({
					type:"POST",
					url:"ajax/libajax.php?funcion=perfil&&operacion=editar_perfil",
					data:new FormData(form),
					cache: false,
					contentType: false,
					processData: false,
					success:function(){},
					beforeSend:function(){
				      gLoading('open');
				    },
					error:function(){},
					complete:function(){
						gLoading('close');
					},

				}).done(function(resp){
					var mensaje = '<p>La información se ha almacenado exitosamente en nuestra base de datos. <br><br>Presione aceptar para continuar.</p>';
					createAlert(formPerfil,'Registro exitoso',mensaje,closeFancy);
				});
			}
		});
	}
}




function validar_checks(){

	/*if( $('#12_tit').is(':checked')==false and $('#1_nom').is(':checked')==false ){
		alert(0)
	}*/

	//alert($('#12_tit').is(':checked'))
	if($('#12_tit').is(':checked')==false && $('#1_nom').is(':checked')==false && $('#2_ape').is(':checked')==false && $('#3_email').is(':checked')==false && $('#4_cel').is(':checked')==false && $('#5_gen').is(':checked')==false && $('#6_prof').is(':checked')==false && $('#7_estc').is(':checked')==false && $('#8_nomc').is(':checked')==false && $('#9_ciur').is(':checked')==false ){
		
		$('#12_tit').prop('checked',true);
		$('#1_nom').prop('checked',true);
		$('#2_ape').prop('checked',true);
		$('#3_email').prop('checked',true);
		$('#4_cel').prop('checked',true);
		$('#5_gen').prop('checked',true);
		$('#6_prof').prop('checked',true);
		$('#7_estc').prop('checked',true);
		$('#8_nomc').prop('checked',true);
		$('#9_ciur').prop('checked',true);	
	}
	
}

