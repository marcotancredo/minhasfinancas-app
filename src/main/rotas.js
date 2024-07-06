import React from 'react'

import {Route, Routes, HashRouter} from 'react-router-dom'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import AuthService from "../app/service/authService";

import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';



function RotaAutenticada () {
    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthService.isUsuarioAutenticado()) {
            navigate('/login');
        }
    }, [navigate]);

    return AuthService.isUsuarioAutenticado() ? <Outlet /> : null;
}


function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
                <Route element={<RotaAutenticada/>}>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/consulta-lancamentos" element={<ConsultaLancamentos/>}/>
                    <Route path="/cadastro-lancamentos/:id?" element={<CadastroLancamentos/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default Rotas;