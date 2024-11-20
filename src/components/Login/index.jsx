import './index.css';

import {MyContext} from '../Context'

import { useState, useContext } from "react";
import { Link } from 'react-router-dom';

export default function Login() {

    const {Login} = useContext(MyContext);

const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');



async function fazerLogin(){
   Login(email, senha)
}

    return (
        <div className='container'>
            <h1 className='title'>Página de Login</h1>

            <div className='containerLogin'>
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
                onClick={fazerLogin}
                >Entrar</button>
            <Link to="/cadastro">Não posssui uma conta? Cadastre-se</Link>
            </div>

        </div>
    );
}