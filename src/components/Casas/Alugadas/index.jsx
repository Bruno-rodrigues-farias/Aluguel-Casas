import Header from "../../container/Header";
import api from "../../api";
import { useState, useEffect } from "react";
import "./style.css"; // Importando o CSS

export default function Alugadas() {
  const [alugadas, setAlugadas] = useState([]);

  useEffect(() => {
    const fetchCasas = async () => {
      try {
        const response = await api.get('/listar/alugueis');
        setAlugadas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCasas();
  }, []);

  return (
    <div>
      <Header />
      <div className="containercasa">
        <h1 className="title">Minhas Casas Alugadas</h1>
        <div>
          {alugadas.map((alugada) => (
            <div className="card" key={alugada.id}>
              <p>Banheiros: {alugada.casas.banheiro}</p>
              <p>Cidade: {alugada.casas.cidade}</p>
              <p>Valor: R$ {alugada.casas.valor}</p>
              <p>Endereço: {alugada.casas.endereco}</p>
              <p>Quartos: {alugada.casas.quartos}</p>
              <p
                className={`status ${
                  alugada.casas.disponivel ? "disponivel" : "alugada"
                }`}
              >
                {alugada.casas.disponivel ? "Disponível" : "alugada"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
