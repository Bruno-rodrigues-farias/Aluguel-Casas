import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3333');

const VotingApp = () => {
    const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });

    useEffect(() => {
        // Receber votos atualizados
        socket.on('updateVotes', (newVotes) => {
            setVotes(newVotes);
        });

        return () => socket.disconnect();
    }, []);

    const handleVote = (option) => {
        socket.emit('vote', option);
    };

    return (
        <div>
            <h1>Sistema de Votação</h1>
            <button onClick={() => handleVote('optionA')}>Votar em A</button>
            <button onClick={() => handleVote('optionB')}>Votar em B</button>
            <h2>Resultados:</h2>
            <p>Opção A: {votes.optionA}</p>
            <p>Opção B: {votes.optionB}</p>
        </div>
    );
};

export default VotingApp;
