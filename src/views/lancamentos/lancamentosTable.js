import React from "react";
import formatter from "currency-formatter";


const LancamentosTable = props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{formatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" title="Efetivar"
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={() => props.alterarStatus(lancamento, 'EFETIVADO')}
                            className="btn btn-success">
                        <i className="pi pi-check"></i>
                    </button>
                    <button type="button" title="Cancelar"
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={() => props.alterarStatus(lancamento, 'CANCELADO')}
                            className="btn btn-warning">
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button" title="Editar"
                            onClick={() => props.editAction(lancamento.id)}
                            className="btn btn-primary">
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            onClick={() => props.deleteAction(lancamento)}
                            className="btn btn-danger">
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Data</th>
                <th scope="col">Situação</th>
                <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable;