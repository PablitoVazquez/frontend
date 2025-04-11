import { genericRequest } from "../utils/genericRequest"
import { Excursion } from "../interfaces/Excursion";
import { Usuario } from "../interfaces/Usuario";

export const deleteexcursion = async (id_excursion: number) =>{
    return await genericRequest(`/api/excursiones/${id_excursion}`, `DELETE`, undefined, true)
}

export const putExcursion = async (id_excursion: number, data: any) => {
    return await genericRequest(`/api/excursiones/${id_excursion}`, `PUT`, data, true);
};

export const postExcursion = async (data: Excursion) => {
    return await genericRequest(`/api/excursiones`, `POST`, data, true);
};

export const getReservas = async () => {
    return await genericRequest(`/api/reservas`, `GET`, undefined, true);
};

export const postUsuario = async (data: Usuario) => {
    return await genericRequest(`/api/register`, `POST`, data, true);
};



