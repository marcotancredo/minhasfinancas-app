import React, {useEffect} from 'react'

import {HashRouter, Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import {AuthConsumer} from "./provedorAutenticacao";


function RotaAutenticada (isUsuarioAutenticado) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUsuarioAutenticado) {
            navigate('/login');
        }
    }, [navigate, isUsuarioAutenticado]);

    return isUsuarioAutenticado ? <Outlet /> : null;
}


function Rotas(props) {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
                <Route element={<RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado}/>}>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/consulta-lancamentos" element={<ConsultaLancamentos/>}/>
                    <Route path="/cadastro-lancamentos/:id?" element={<CadastroLancamentos/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
);