import { Link } from "react-router-dom"
import Casas from '../Casas'

export default function PaginaAdmin() {
    return (
        <div>
           
            <Casas />
            <Link to="/casas">Feed de Casas</Link>
        </div>
    )
}