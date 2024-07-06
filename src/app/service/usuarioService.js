import Apiservice from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends Apiservice {
    constructor() {
        super("/api/usuarios");
    }

    autenticar(credenciais) {
        return this.post("/autenticar", credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('', usuario);
    }

    validar(usuario) {
        const regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        const erros = [];

        if (!usuario.nome) {
            erros.push('O campo nome é obrigatório');
        }

        if (!usuario.email) {
            erros.push('O campo email é obrigatório');
        } else if (!regexEmail.test(usuario.email)) {
            erros.push('Informe um e-mail válido');
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Os campos de senha são obrigatórios');
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas devem ser iguais');
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;