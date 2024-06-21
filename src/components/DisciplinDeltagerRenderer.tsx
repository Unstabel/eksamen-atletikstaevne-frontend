import React, { useState, useEffect } from 'react';

interface DeltagerDisciplin {
  id: number;
  deltager: {
    id: number;
    navn: string;
    køn: string;
    alder: number;
    klub: string;
  };
  disciplin: {
    id: number;
    navn: string;
    resultattype: string;
  };
}

const DeltagerDisciplinerList: React.FC = () => {
  const [deltagerDiscipliner, setDeltagerDiscipliner] = useState<DeltagerDisciplin[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeltagerDiscipliner = async () => {
      try {
        const response = await fetch('http://localhost:8080/deltagerDisciplin');
        if (!response.ok) {
          throw new Error('Failed to fetch deltager discipliner data');
        }
        const data = await response.json();
        setDeltagerDiscipliner(data);
      } catch (error) {
        console.error('Error fetching deltager discipliner data:', error);
        setError('Failed to fetch deltager discipliner data. Please try again later.');
      }
    };

    fetchDeltagerDiscipliner();
  }, []);

  const handleDeleteDeltagerDisciplin = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/deltagerDisciplin/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete deltager disciplin');
      }
      // Opdater deltagerDiscipliner-listen efter sletning
      setDeltagerDiscipliner((prevDeltagerDiscipliner) =>
        prevDeltagerDiscipliner.filter((item) => item.id !== id)
      );
      console.log('Deltager disciplin deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting deltager disciplin:', error);
    }
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Deltager Discipliner</h2>

      {deltagerDiscipliner.map((item) => (
        <div key={item.id}>
          <h3>{item.deltager.navn}</h3>

          <ul>
            <li key={item.disciplin.id}>
              <strong>{item.disciplin.navn}</strong>
              <p>Resultattype: {item.disciplin.resultattype}</p>
              <button onClick={() => handleDeleteDeltagerDisciplin(item.id)}>Delete</button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DeltagerDisciplinerList;