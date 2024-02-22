import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Personas } from "../pages/Personas";
import { Eventos } from "../pages/Eventos";
import { Empresas } from "../pages/Empresas";
import { Reportes } from '../pages/Reportes';
import { Segmentos } from "../pages/Segmentos";
import { Sectores } from "../pages/Sectores";
import { Cuenta } from "../pages/Cuenta";
import { Titulos } from "../pages/Titulos";

export const RenderRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					index
					element={
						<React.Suspense fallback={<>...</>}>
							<Personas />
						</React.Suspense>
					}
				/>
				<Route
					path='empresas'
					element={
						<React.Suspense fallback={<>...</>}>
							<Empresas />
						</React.Suspense>
					}
				/>
				<Route
					path='eventos'
					element={
						<React.Suspense fallback={<>...</>}>
							<Eventos />
						</React.Suspense>
					}
				/>
				<Route
					path='reportes'
					element={
						<React.Suspense fallback={<>...</>}>
							<Reportes />
						</React.Suspense>
					}
				/>
				<Route
					path='segmentos'
					element={
						<React.Suspense fallback={<>...</>}>
							<Segmentos />
						</React.Suspense>
					}
				/>
				<Route
					path='sectores'
					element={
						<React.Suspense fallback={<>...</>}>
							<Sectores />
						</React.Suspense>
					}
				/>
				<Route
					path='titulos'
					element={
						<React.Suspense fallback={<>...</>}>
							<Titulos />
						</React.Suspense>
					}
				/>
				<Route
					path='cuenta'
					element={
						<React.Suspense fallback={<>...</>}>
							<Cuenta />
						</React.Suspense>
					}
				/>
				{/* <Route
					path='login'
					element={
						<React.Suspense fallback={<>...</>}>
							<Login />
						</React.Suspense>
					}
				/> */}
				<Route path='*' element={<Personas />} />
			</Routes>
		</>
	);
};
