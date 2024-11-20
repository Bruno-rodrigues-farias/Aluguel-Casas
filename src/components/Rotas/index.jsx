import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context';
import Login from '../Login';
import Cadastro from '../Cadastro';
import Casas from '../Casas';
import PaginaAdmin from '../PaginaAdmin';
import Alugadas from '../Casas/Alugadas';

export default function Rotas() {
  const { user } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  // Simula o carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simula o carregamento por 500ms
    return () => clearTimeout(timer);
  }, []);

  // Enquanto carrega, exibe um "loading spinner" ou tela de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se o usuário não estiver logado, redireciona para o login
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // Se o usuário for 'locador', pode acessar a página admin, mas também pode acessar a página casas
  if (user?.user?.tipo === 'locador') {
    return (
      <Routes>
        <Route path="/" element={<PaginaAdmin />} />
        <Route path="/casas" element={<Casas />} /> {/* Adicionado */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // Se o usuário for outro tipo (não locador), pode acessar a página casas
  return (
    <Routes>
      <Route path="/" element={<Casas />} />
      <Route path="/casas" element={<Casas />} />
      <Route path="/alugadas" element={<Alugadas />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
