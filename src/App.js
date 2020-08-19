import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProject(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo Projeto',
      owner: 'Eduardo Pina'
    });
    setProject([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const index = projects.findIndex(project => project.id === id);
    if (index < 0) return;
    projects.splice(index, 1);
    setProject([...projects]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project =>
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
