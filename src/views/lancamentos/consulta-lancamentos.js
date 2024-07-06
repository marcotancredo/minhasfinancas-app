import React from 'react';
import withRouter from "../../components/withrouter";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";

import * as messages from "../../components/toastr";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';


class ConsultaLancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showDeleteDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do ano é obrigatório')
            return;
        }
        const usuarioLogado = LocalStorageService.obterItemJSON('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                const lista = response.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado")
                }
                this.setState({lancamentos: lista})
            }).catch((error) => {
            messages.mensagemErro(error.response.data);
        })
    }

    editar = (id) => {
        this.navegarPara(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showDeleteDialog: true, lancamentoDeletar: lancamento});
    }

    cancelaExclusão = () => {
        this.setState({showDeleteDialog: false, lancamentoDeletar: {}});
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(() => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({lancamentos: lancamentos, showDeleteDialog: false, lancamentoDeletar: {}});

                messages.mensagemSucesso('Lançamento removido com sucesso');
            }).catch(() => {
            messages.mensagemErro('Ocorreu um erro ao tentar remover o lançamento');
        });
    }

    navegarPara = (url) => {
        this.props.router.navigate(url);
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);

                if (index > -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamentos});
                }
                messages.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render() {
        const tiposLancamento = this.service.obterListaTiposLancamento();

        const meses = this.service.obterListaMeses();

        const deleteDialogFooter = (
            <div>
                <Button label="Confirma" icon="pi pi-check" onClick={this.deletar}></Button>
                <Button label="Cancela" icon="pi pi-times" onClick={this.cancelaExclusão}
                        className="p-button-secondary"></Button>
            </div>
        )

        return (
            <Card title="Consulta lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <form>
                                <fieldset>
                                    <FormGroup label="Ano: *" htmlFor="inputAno">
                                        <input type="text" className="form-control" id="inputAno"
                                               value={this.state.ano}
                                               onChange={e => this.setState({ano: e.target.value})}
                                               aria-describedby="anoHelp" placeholder="Digite o Ano"/>
                                    </FormGroup>
                                    <FormGroup label="Mês: " htmlFor="inputMes">
                                        <SelectMenu className="form-control"
                                                    value={this.state.mes}
                                                    onChange={e => this.setState({mes: e.target.value})}
                                                    lista={meses}/>
                                    </FormGroup>
                                    <FormGroup label="Descricao: " htmlFor="inputDescricao">
                                        <input type="text" className="form-control" id="inputDescricao"
                                               value={this.state.descricao}
                                               onChange={e => this.setState({descricao: e.target.value})}
                                               aria-describedby="anoHelp" placeholder="Digite a descrição"/>
                                    </FormGroup>
                                    <FormGroup label="Tipo de Lançamento: " htmlFor="inputTipoLancamento">
                                        <SelectMenu className="form-control"
                                                    value={this.state.tipo}
                                                    onChange={e => this.setState({tipo: e.target.value})}
                                                    lista={tiposLancamento}/>
                                    </FormGroup>

                                    <button type="button"
                                            onClick={this.buscar} className="btn btn-success">
                                        <i className="pi pi-search"></i> Buscar
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                            onClick={() => this.navegarPara('/cadastro-lancamentos')}>
                                        <i className="pi pi-plus"></i> Cadastrar
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              editAction={this.editar}
                                              deleteAction={this.abrirConfirmacao}
                                              alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showDeleteDialog}
                            style={{width: '50vw'}}
                            footer={deleteDialogFooter}
                            onHide={() => {
                                if (!this.state.showDeleteDialog) return;
                                this.setState({showDeleteDialog: false});
                            }}>
                        Confirma a exclusão deste lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);