
import { useAppStore } from "../../stores/app.store";

export const Footer = () => {
	let posicion = "none";
	const isloading = useAppStore((state) => state.isloading);

	posicion = isloading ? "block" : "none";

	return (
		<>
			<div
				className='gLoading'
				style={{ display: posicion, marginTop: "0px" }}></div>
		</>
	);
};
