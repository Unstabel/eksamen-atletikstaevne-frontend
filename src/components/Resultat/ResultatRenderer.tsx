import React, { useState, useEffect } from 'react';
import ResultatForm from './ResultatForm';
import ResultatEditForm from './ResultatEdit';

interface Resultat {
  id: number;
  deltager: { id: number; navn: string; køn: string; alder: number };
  disciplin: { id: number; navn: string };
  resultattype: string;
  dato: string;
  resultatværdi: string;
}

interface Disciplin {
  id: number;
  navn: string;
}

const ResultatRenderer: React.FC = () => {
  const [resultater, setResultater] = useState<Resultat[]>([]);
  const [selectedDisciplin, setSelectedDisciplin] = useState<number | null>(null);
  const [filterKøn, setFilterKøn] = useState<string>('');
  const [filterAlder, setFilterAlder] = useState<{ min: number; max: number } | null>(null);
  const [editingResultat, setEditingResultat] = useState<Resultat | null>(null);
  const [deltagerOptions, setDeltagerOptions] = useState<{ id: number; navn: string }[]>([]);
  const [disciplinOptions, setDisciplinOptions] = useState<{ id: number; navn: string }[]>([]);

  useEffect(() => {
    const fetchResultater = async () => {
      try {
        const response = await fetch('http://localhost:8080/resultat');
        if (!response.ok) {
          throw new Error('Failed to fetch resultater data');
        }
        const data = await response.json();
        setResultater(data);
      } catch (error) {
        console.error('Error fetching resultater data:', error);
      }
    };

    const fetchDisciplins = async () => {
      try {
        const response = await fetch('http://localhost:8080/disciplin');
        if (!response.ok) {
          throw new Error('Failed to fetch disciplines');
        }
        const data = await response.json();
        setDisciplinOptions(data);
      } catch (error) {
        console.error('Error fetching disciplines:', error);
      }
    };

    const fetchDeltagers = async () => {
      try {
        const response = await fetch('http://localhost:8080/deltager');
        if (!response.ok) {
          throw new Error('Failed to fetch deltagers');
        }
        const data = await response.json();
        setDeltagerOptions(data.map((deltager: any) => ({ id: deltager.id, navn: deltager.navn })));
      } catch (error) {
        console.error('Error fetching deltagers:', error);
      }
    };

    fetchResultater();
    fetchDisciplins();
    fetchDeltagers();
  }, []);

  const handleCreateResultat = async (newResultat: any) => {
    try {
      const response = await fetch('http://localhost:8080/resultat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResultat),
      });
      if (!response.ok) {
        throw new Error('Failed to create result');
      }
      const createdResultat: Resultat = await response.json();
      setResultater((prevResultater) => [...prevResultater, createdResultat]);
      console.log('Result created successfully:', createdResultat);
    } catch (error) {
      console.error('Error creating result:', error);
    }
  };

  const handleUpdateResultat = async (updatedResultat: any) => {
    try {
      const response = await fetch(`http://localhost:8080/resultat/${updatedResultat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedResultat),
      });
      if (!response.ok) {
        throw new Error('Failed to update result');
      }
      const data = await response.json();
      setResultater((prevResultater) =>
        prevResultater.map((resultat) =>
          resultat.id === data.id ? data : resultat
        )
      );
      setEditingResultat(null);
      console.log('Result updated successfully:', data);
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  const handleDeleteResultat = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/resultat/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete result');
      }
      setResultater((prevResultater) => prevResultater.filter((resultat) => resultat.id !== id));
      console.log('Result deleted successfully');
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  const filteredAndSortedResultater = resultater
    .filter((resultat) => {
      if (selectedDisciplin && resultat.disciplin.id !== selectedDisciplin) {
        return false;
      }
      if (filterKøn && resultat.deltager.køn !== filterKøn) {
        return false;
      }
      if (
        filterAlder &&
        (resultat.deltager.alder < filterAlder.min || resultat.deltager.alder > filterAlder.max)
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => parseFloat(a.resultatværdi) - parseFloat(b.resultatværdi));

  return (
    <div>
      <h2>Resultater</h2>


      <ResultatForm onCreate={handleCreateResultat} 
      deltagerOptions={deltagerOptions}
      disciplinOptions={disciplinOptions}/>
      
      <div>
        <label>
          Filter by Disciplin:
          <select
            value={selectedDisciplin ?? ''}
            onChange={(e) => setSelectedDisciplin(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">All Disciplines</option>
            {disciplinOptions.map((disciplin) => (
              <option key={disciplin.id} value={disciplin.id}>
                {disciplin.navn}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by Gender:
          <select value={filterKøn} onChange={(e) => setFilterKøn(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Filter by Age Group:
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setFilterAlder(null);
              } else {
                const [min, max] = value.split('-').map(Number);
                setFilterAlder({ min, max });
              }
            }}
          >
            <option value="">All Ages</option>
            <option value="0-12">0-12</option>
            <option value="13-17">13-17</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
            <option value="65-74">65-74</option>
            <option value="75+">75+</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredAndSortedResultater.map((resultat) => (
          <li key={resultat.id}>
            <strong>{resultat.deltager.navn}</strong> - {resultat.disciplin.navn} - {resultat.resultattype} - {resultat.dato} - {resultat.resultatværdi}
            <button onClick={() => setEditingResultat(resultat)}>Edit</button>
            <button onClick={() => handleDeleteResultat(resultat.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingResultat && (
        <ResultatEditForm
          resultat={editingResultat}
          onUpdate={handleUpdateResultat}
          onCancel={() => setEditingResultat(null)}
          deltagerOptions={deltagerOptions}
          disciplinOptions={disciplinOptions}
        />
      )}
    </div>
  );
};

export default ResultatRenderer;