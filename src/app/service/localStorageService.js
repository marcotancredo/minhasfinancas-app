export default class LocalStorageService {
    static adicionarItemParseString(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor));
    };

    static adicionarItem(chave, valor) {
        localStorage.setItem(chave, valor);
    };

    static obterItemString(chave) {
        return localStorage.getItem(chave);
    };

    static obterItemJSON(chave) {
        return JSON.parse(localStorage.getItem(chave));
    };

    static removerItem(chave) {
        localStorage.removeItem(chave);
    }
}