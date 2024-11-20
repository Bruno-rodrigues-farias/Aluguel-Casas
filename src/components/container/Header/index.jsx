import './index.css'
import { useContext } from 'react';
import { MyContext } from '../../Context';
export default function Header() {

    const {Logout} = useContext(MyContext);

   async function sairdaconta() {
       await Logout();
    }
    return (
        <div>
             <nav className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/alugadas">Minhas casas Alugadas</a></li>
                    <li><button onClick={sairdaconta} className="buttonSair">Sair da conta</button></li>
                </ul>
            </nav>
        </div>
    )
}