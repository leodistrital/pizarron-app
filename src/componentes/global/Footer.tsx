
import Modal from "react-responsive-modal";
import { useAppStore } from "../../stores/app.store";

export const Footer = () => {
	let posicion = "none";
	const isloading = useAppStore((state) => state.isloading);

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
		</>
	);
};
