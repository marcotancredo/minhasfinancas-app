import React from 'react'
import Card from '../components/card'
import FormGroup from "../components/form-group";
import withRouter from "../components/withrouter";
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from "../components/toastr";
import * as messages from "../components/toastr";

class CadastroUsuario extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const {nome, email, senha, senhaRepeticao} = this.state;
        const usuario = {nome, email, senha, senhaRepeticao};

        try {
            this.service.validar(usuario);
        }catch(erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario).then((response) => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema');
            this.navegarParaLogin();
        }).catch((error) => {
            mensagemErro(error.response.data)
        });
    }

    navegarParaLogin() {
        this.props.router.navigate('/login');
    }

    cancelar = () => {
        this.navegarParaLogin();
    }

    render() {
        return (
            <Card title={"Cadastro de Usuario"}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" className="form-control" id="inputNome" name="nome"
                                       onChange={e => this.setState({nome: e.target.value})}
                                       aria-describedby="nomeHelp" placeholder="Digite o Nome"/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" className="form-control" id="inputEmail" name="email"
                                       onChange={e => this.setState({email: e.target.value})}
                                       aria-describedby="emailHelp" placeholder="Digite o Email"/>
                            </FormGroup>


                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" className="form-control" id="inputSenha" name="senha"
                                       onChange={e => this.setState({senha: e.target.value})}
                                       placeholder="Senha"/>
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" className="form-control" id="inputRepitaSenha"
                                       name="senhaRepeticao"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})}
                                       placeholder="Senha"/>
                            </FormGroup>

                            <button type="button" className="btn btn-success"
                                    onClick={this.cadastrar}>
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={this.cancelar}>
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario);