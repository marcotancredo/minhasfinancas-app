import React from 'react'
import Card from '../components/card.js'
import FormGroup from '../components/form-group.js'
import {withRouter} from '../components/withrouter';
import UsuarioService from "../app/service/usuarioService";

import {mensagemErro} from '../components/toastr'
import {AuthContext} from "../main/provedorAutenticacao";

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = async () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then((response) => {
            this.context.iniciarSessao(response.data);
            this.props.router.navigate('/home');
        }).catch((error) => {
            mensagemErro(error.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.router.navigate('/cadastro-usuarios');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                       value={this.state.email}
                                                       onChange={e => this.setState({email: e.target.value})}
                                                       aria-describedby="emailHelp" placeholder="Digite o Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" className="form-control"
                                                       value={this.state.senha}
                                                       onChange={e => this.setState({senha: e.target.value})}
                                                       id="exampleInputPassword1" placeholder="Password"/>
                                            </FormGroup>
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => this.entrar()}>
                                                <i className="pi pi-sign-in"></i> Entrar
                                            </button>
                                            <button type="button" className="btn btn-danger"
                                                    onClick={() => this.prepareCadastrar()}>
                                                <i className="pi pi-plus"></i> Cadastrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);