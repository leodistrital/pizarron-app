import { create } from "zustand";

interface AppState {
	login: boolean;
	mail: string;
	token: string;
	perfil: number;
	isloading: boolean;
	logout: () => void;
	iniciar: (mail: string, token: string , perfil: number,  usertoken: string) => void;
	toogleLoading: (estado: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
	login: false,
	mail: "",
	token: "",
	usertoken: "",
	perfil: 0,
	isloading: false,
	logout: () =>
		set(() => ({
			login: false,
			mail: "",
			token: "",
		})),

	iniciar: (mail: string, token: string, perfil: number,  usertoken: string) =>
		set(() => ({ login: true, mail: mail, perfil:perfil, token: token, usertoken: usertoken })),

	toogleLoading: (estado) => {
		set(() => ({
			isloading: estado,
		}));
	},
}));
