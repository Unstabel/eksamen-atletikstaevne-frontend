import React, { useState, useEffect } from 'react';

interface ResultatFormProps {
  onCreate: (newResultat: NewResultat) => void;
  deltagerOptions: { id: number; navn: string }[];
  disciplinOptions: { id: number; navn: string }[];
}

interface NewResultat {
    deltager: { id: number };
    disciplin: { id: number };
    resultattype: string;
    dato: string; // Dato som en streng (f.eks. 'YYYY-MM-DD')
    resultatværdi: string;
  }

interface Deltager {
    id: number;
    navn: string;
  }
  
  interface Disciplin {
    id: number;
    navn: string;
  }
const ResultatForm: React.FC<ResultatFormProps> = ({ onCreate, deltagerOptions, disciplinOptions }) => {
  const [formState, setFormState] = useState({
    deltagerId: 0,
    disciplinId: 0,
    resultattype: '',
    dato: '',
    resultatværdi: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'deltagerId' || name === 'disciplinId' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newResultat: NewResultat = {
      deltager: { id: formState.deltagerId },
      disciplin: { id: formState.disciplinId },
      resultattype: formState.resultattype,
      dato: formState.dato,
      resultatværdi: formState.resultatværdi,
    };
    onCreate(newResultat);
    // Nulstil formularfelter efter oprettelse
    setFormState({
      deltagerId: 0,
      disciplinId: 0,
      resultattype: '',
      dato: '',
      resultatværdi: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Deltager:
        <select
          name="deltagerId"
          value={formState.deltagerId}
          onChange={handleInputChange}
          required
        >
          <option value={0}>Vælg deltager</option>
          {deltagerOptions.map((deltager) => (
            <option key={deltager.id} value={deltager.id}>
              {deltager.navn}
            </option>
          ))}
        </select>
      </label>
      <label>
        Disciplin:
        <select
          name="disciplinId"
          value={formState.disciplinId}
          onChange={handleInputChange}
          required
        >
          <option value={0}>Vælg disciplin</option>
          {disciplinOptions.map((disciplin) => (
            <option key={disciplin.id} value={disciplin.id}>
              {disciplin.navn}
            </option>
          ))}
        </select>
      </label>
      <label>
        Resultattype:
        <input
          type="text"
          name="resultattype"
          value={formState.resultattype}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Dato:
        <input
          type="date"
          name="dato"
          value={formState.dato}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Resultatværdi:
        <input
          type="text"
          name="resultatværdi"
          value={formState.resultatværdi}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default ResultatForm;