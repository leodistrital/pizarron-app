export const alertaGuardado = (status, Swal, setOpen) => {
	if (status == "Ok")
		Swal.fire({
			title: "Registro exitoso",
			confirmButtonText: "Continuar",
			confirmButtonColor: "#4a2a42",
		}).then((result) => {
			if (result.isConfirmed) {
				setOpen(false);
			}
		});
};



export const alertaconfirmarBorado = ( Swal, deleteRegistro) => {
	Swal.fire({
			title:
				"<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>",
			showDenyButton: true,
			confirmButtonText: `Si, eliminar registro`,
			denyButtonText: `No, cancelar esta acción`,
			customClass: {
				confirmButton: "btnDarkcustom",
				denyButton: "btnDarkcustom",
				title: "titulocustom",
			},
		}).then((result) => {
			if (result.isConfirmed) {
                // console.log('confirmado ');
                // console.log(deleteRegistro);
				deleteRegistro();
				
			}
		});
};



export const alertaconfirmarBoradoConID = ( Swal, deleteRegistro,id) => {
	Swal.fire({
			title:
				"<p>Este registro se eliminará del sistema. <br>¿Esta seguro de eliminar el registro?</p>",
			showDenyButton: true,
			confirmButtonText: `Si, eliminar registro`,
			denyButtonText: `No, cancelar esta acción`,
			customClass: {
				confirmButton: "btnDarkcustom",
				denyButton: "btnDarkcustom",
				title: "titulocustom",
			},
		}).then((result) => {
			if (result.isConfirmed) {
                // console.log('confirmado ');
                // console.log(deleteRegistro);
				deleteRegistro(id);
				
			}
		});
};
