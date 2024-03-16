
import Modal from "react-responsive-modal";
import { useAppStore } from "../../stores/app.store";

export const Footer = () => {
	let posicion = "none";
	const isloading = useAppStore((state) => state.isloading);
	// const esatado = useAppStore((state) => state);

	// posicion = isloading ? "block" : "none";
	posicion= "block";

	return (
		<>
		<Modal  open={isloading} 
		
					center
					showCloseIcon={false}
					classNames={{
          modal: 'customModal',
        }}
		>
			<div
				className='gLoading'
				style={{ display: posicion, marginTop: "0px" }}></div>
		</Modal>

		{/* <pre>{ JSON.stringify(esatado)  }</pre> */}
		</>
	);
};
