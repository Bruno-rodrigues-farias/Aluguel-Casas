import api from "../api";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../Context";
import '../Casas/index.css';
import Header from "../container/Header";

export default function Casas() {
    const [casas, setCasas] = useState([]);
    const { alugarCasas } = useContext(MyContext);

    useEffect(() => {
        const fetchCasas = async () => {
            try {
                const response = await api.get('/listar/casas');
                setCasas(response.data);

                console.log(response.data);
                
            } catch (error) {
                console.error("Erro ao listar casas:", error);
            }
        };
        fetchCasas();
    }, []);

    // Função para alugar casas
    async function AlugarCasas(casaId) {
        try {
            await alugarCasas(casaId); // Faz a requisição para alugar a casa

            // Atualiza o estado local para refletir a alteração
            setCasas((prevCasas) => 
                prevCasas.map((casa) =>
                    casa.id === casaId ? { ...casa, disponivel: false } : casa
                )
            );
        } catch (error) {
            console.error("Erro ao alugar a casa:", error);
        }
    }

    return (
        <div className="containerCasa">
            {/* Barra de navegação fixa */}
            <Header />

            <h1 className="titleCasa">Casas para alugar</h1>

            {/* Grid de casas */}
            <div className="gridCasas">
                {casas.map((casa) => (
                    <div key={casa.id} className="cardCasa">
                        <div className="divImagem"></div>
                        <h4>Endereço: {casa.endereco}</h4>
                        <h4>Cidade: {casa.cidade}</h4>
                        <h4>Estado: {casa.estado}</h4>
                        <h4>Quartos: {casa.quartos}</h4>
                        <h4>Banheiros: {casa.banheiro}</h4>
                        <h4>Valor: {casa.valor}</h4>
                        {casa.disponivel ? (
                            <button className="buttonAlugar" onClick={() => AlugarCasas(casa.id)} >Alugar</button>
                        ) : (
                            <h4 className="indisponivel">Indisponível</h4>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
