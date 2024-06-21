import React, { useState, useEffect } from 'react';
import DisciplinDeltagerCreate from './DisciplinDeltagerCreate';

interface Disciplin {
  id: number;
  navn: string;
}

const DisciplinRenderer: React.FC = () => {
  const [discipliner, setDiscipliner] = useState<Disciplin[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [deltagerOptions, setDeltagerOptions] = useState<{ id: number; navn: string }[]>([]);
  const [disciplinOptions, setDisciplinOptions] = useState<{ id: number; navn: string }[]>([]);

  useEffect(() => {
    const fetchDiscipliner = async () => {
      try {
        const response = await fetch('http://localhost:8080/disciplin');
        if (!response.ok) {
          throw new Error('Failed to fetch discipliner data');
        }
        const data = await response.json();
        setDiscipliner(data);
        setDisciplinOptions(data);
      } catch (error) {
        console.error('Error fetching discipliner data:', error);
      }
    };
    const fetchDeltagers = async () => {
        try {
          const response = await fetch('http://localhost:8080/deltager');
          if (!response.ok) {
            throw new Error('Failed to fetch deltagers');
          }
          const data = await response.json();
          setDeltagerOptions(data);
        } catch (error) {
          console.error('Error fetching deltagers:', error);
        }
      };
    fetchDeltagers();
    fetchDiscipliner();
  }, []);

  const handleOpenCreateModal = () => { 
    setCreateModalVisible(true);
  };
  const handleModalClose = () => {
    setCreateModalVisible(false);
  };

  return (
    <div>
      <h2>Discipliner</h2>
      <button onClick={handleOpenCreateModal}>Opret Disciplin</button>

      <ul>
        {discipliner.map((disciplin) => (
          <li key={disciplin.id}>
            <div>
              <strong>{disciplin.navn}</strong>
            </div>
          </li>
        ))}
      </ul>
      {disciplinOptions && (
        <DisciplinDeltagerCreate
        disciplinOptions={disciplinOptions}
        deltagerOptions={deltagerOptions}
          visible={createModalVisible}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DisciplinRenderer;