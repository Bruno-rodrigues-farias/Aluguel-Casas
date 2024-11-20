import './index.css';
import api from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyContext} from '../Context'
import { Link } from 'react-router-dom';

import { useState, useEffect, useContext } from "react";

export default function Cadastro() {

const {Cadastrar} = useContext(MyContext);

const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');



async function CadastrarUser(){
   Cadastrar(nome,email, senha)
}

    return (
        <div className='container'>
            <h1 className='title'>Página de Cadastro</h1>

            <div className='containerLogin'>
                <input type="text" placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className='inputLogin'
                />
                <input type="text" placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='inputLogin'
                />
                <input type="password" placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
                <button className='buttonLogin'
                onClick={CadastrarUser}
                >Cadastrar</button>

                <Link to="/login">Já tem conta? Entrar</Link>
            </div>
        </div>
    );
}