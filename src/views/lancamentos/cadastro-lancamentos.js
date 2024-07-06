import React from "react";

import Card from '../../components/card'
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import withrouter from "../../components/withrouter";
import * as messages from '../../components/toastr';

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";


class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        mes: '',
        valor: 0,
        ano: '',
        tipo: '',
        usuario: null,
        status: '',
        atualizando: false
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.router.params;

        if (params.id) {
            this.service.obterPorId(params.id)
                .then((response) => {
                    this.setState({...response.data, atualizando: true});
                }).catch((error) => {
                    messages.mensagemErro(error.response.data)
            })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItemJSON('_usuario_logado');
        const {descricao, valor, mes, ano, tipo} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id};

        try {
            this.service.validar(lancamento);
        } catch(erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service.salvar(lancamento)
            .then(response => {
                this.navegarPara('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento cadastrado com sucesso');
            }).catch((error) => {
                messages.mensagemErro(error.response.data);
        })
    }

    atualizar = () => {
        const {descricao, valor, mes, ano, tipo, id, usuario, status } = this.state;

        const lancamento = {descricao, valor, mes, ano, tipo, id, usuario, status};

        this.service.atualizar(lancamento)
            .then(response => {
                this.navegarPara('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso');
            }).catch((error) => {
            messages.mensagemErro(error.response.data);
        })
    }

    navegarPara = (url) => {
        this.props.router.navigate(url);
    }

    render() {
        const tiposLancamento = this.service.obterListaTiposLancamento();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={ this.state.atualizando ? 'Atualizar lançamento' : 'Cadastrar lançamento'}>
                <div className="row">
                    <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" type="text"
                               name="descricao"
                               className="form-control"
                               value={this.state.descricao}
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input id="inputAno" type="text"
                                   className="form-control"
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses}
                                        className="form-control"
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input id="inputValor" type="text"
                                   className="form-control"
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu id="inpuTipo" lista={tiposLancamento}
                                        className="form-control"
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: *">
                            <input type="text"
                                   className="form-control"
                                   disabled
                                   name="status"
                                   value={this.state.status}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className="btn btn-success">
                                    <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) :
                            (
                                <button onClick={this.submit} className="btn btn-success">
                                    <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={() => this.navegarPara('/consulta-lancamentos')} className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withrouter(CadastroLancamento);