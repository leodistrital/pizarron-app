function virificar_empresa(form){
	var bloque_emp=form.find('#contEmpre li');
	bloque_emp.each(function(index, el) {
		//cantidad_empresas = $(this).length 
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[0].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '||');
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[1].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '||');
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[2].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '||');
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[3].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '||');
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[4].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '||');
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[5].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '||');
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + $(this).find('input ,select')[6].value);
		$('#arreglo_empesa_caja').val($('#arreglo_empesa_caja').val() + '@@');
	});
}



function virificar_eventos(form){
	$('#total_eventos').val('');
	var bloque_seg=form.find('#contEvent li.contRemove').slice(1);
	var valor_ck=0;
	bloque_seg.each(function(index, el) {
		//cantidad_empresas = $(this).length 
		$('#total_eventos').val($('#total_eventos').val() + $(this).find('select').val());
		checkbox =  $(this).find('input:checkbox').is(':checked');

		 if (checkbox) {
           valor_ck=1;

        } else {
           valor_ck=0;
        }
		$('#total_eventos').val($('#total_eventos').val() + '@@' + valor_ck + '||');
		//alert($(this).find('select').val())		
	});
}

//
function virificar_segmentos(form){
	var bloque_seg=form.find('#contSegm li.contRemove');
	
	bloque_seg.each(function(index, el) {
		//cantidad_empresas = $(this).length 
		$('#arreglo_segmento_caja').val($('#arreglo_segmento_caja').val() + $(this).find('select').val());
		$('#arreglo_segmento_caja').val($('#arreglo_segmento_caja').val() + '||');
		//alert($(this).find('select').val())		
	});
}

function verificar_even(){

	var formPersona = $('#formPersona');
	virificar_eventos(formPersona);
}

function verificar_empre(){

	var formPersona = $('#formPersona');
	virificar_empresa(formPersona);
}


