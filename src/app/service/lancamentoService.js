import Apiservice from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

export default class LancamentoService extends Apiservice {
    constructor() {
        super("/api/lancamentos");
    }

    consultar(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`

        if (lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if (lancamentoFiltro.tipo) {
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if (lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if (lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if (lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(params)
    }

    obterListaMeses() {
        return [
            {label: 'Selecione..', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12},
        ];
    }

    obterListaTiposLancamento() {
        return [
            {label: 'Selecione..', value: ''},
            {label: 'Receita', value: 'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ];
    }

    deletar(id) {
        return this.delete(`/${id}`);
    }

    salvar(lancamento) {
        return this.post('', lancamento);
    }

    obterPorId(id) {
        return this.get(`/${id}`);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    validar(lancamento) {
        const erros = [];

        if (!lancamento.ano) {
            erros.push("Informe o ano");
        }

        if (!lancamento.mes) {
            erros.push("Informe o mês");
        }

        if (!lancamento.descricao) {
            erros.push("Informe a descrição");
        }

        if (!lancamento.valor) {
            erros.push("Informe o valor");
        }

        if (!lancamento.tipo) {
            erros.push("Informe o tipo");
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, { status });
    }
};