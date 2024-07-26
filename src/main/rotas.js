import React, {useEffect} from 'react'

import {BrowserRouter, Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {AuthConsumer} from "./provedorAutenticacao";

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import LandingPage from "../views/landingPage";


function RotaAutenticada(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isUsuarioAutenticado) {
            navigate('/login');
        }
    }, [navigate, props.isUsuarioAutenticado]);

    return props.isUsuarioAutenticado ? <Outlet/> : null;
}


function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
                <Route exact element={<RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado}/>}>
                    <Route exact path="/home" element={<Home/>}></Route>
                    <Route exact path="/consulta-lancamentos" element={<ConsultaLancamentos/>}/>
                    <Route exact path="/cadastro-lancamentos/:id?" element={<CadastroLancamentos/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
);