import { RenderRoutes } from "./router";
import { Header } from "./componentes/global/Header";
import { Footer } from "./componentes/global/Footer";
import { useAppStore } from "./stores/app.store";
import { Login } from "./pages/Login";

function App() {
	const session = useAppStore((state) => state.login);
	// console.log(session);
	return (
		<>
			{session ? (
				<>  
					<Header />
					<RenderRoutes />
					<Footer />
				</>
			) : (
				<Login />
			)}
		</>
	);
}

export default App;
