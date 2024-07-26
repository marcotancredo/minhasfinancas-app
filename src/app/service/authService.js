import LocalStorageService from "./localStorageService";
import {jwtDecode} from "jwt-decode"
import Apiservice from "../apiservice";

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN = '_access_token'

export default class AuthService {
    static isUsuarioAutenticado() {
        const token = LocalStorageService.obterItemString(TOKEN);
        if (!token) {
            return false;
        }
        const decodeToken = jwtDecode(token);
        const expiration = decodeToken.exp;
        return !(Date.now() >= (expiration * 1000));
    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem(USUARIO_LOGADO);
        LocalStorageService.removerItem(TOKEN);
    }

    static logar(usuario, token) {
        LocalStorageService.adicionarItemParseString(USUARIO_LOGADO, usuario);
        LocalStorageService.adicionarItem(TOKEN, token);
        Apiservice.registrarToken(token)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.obterItemJSON(USUARIO_LOGADO);
    }

    static refreshSession() {
        const token = LocalStorageService.obterItemString(TOKEN);
        const usuario = AuthService.obterUsuarioAutenticado();

        AuthService.logar(usuario, token);
        return usuario;
    }
}