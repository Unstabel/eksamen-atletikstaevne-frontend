import React, { useState, useEffect } from 'react';

interface ResultatEditFormProps {
  resultat: any;
  onUpdate: (updatedResultat: any) => void;
  onCancel: () => void;
  deltagerOptions: { id: number; navn: string }[];
  disciplinOptions: { id: number; navn: string }[];
}

const ResultatEditForm: React.FC<ResultatEditFormProps> = ({
  resultat,
  onUpdate,
  onCancel,
  deltagerOptions,
  disciplinOptions,
}) => {
  const [updatedResultat, setUpdatedResultat] = useState(resultat);

  useEffect(() => {
    setUpdatedResultat(resultat);
  }, [resultat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedResultat((prevResultat: any) => ({
      ...prevResultat,
      [name]: name === 'deltager' || name === 'disciplin' ? { id: parseInt(value) } : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(updatedResultat);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Deltager:
        <select
          name="deltager"
          value={updatedResultat.deltager.id}
          onChange={handleInputChange}
          required
        >
          <option value="">Vælg deltager</option>
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
          name="disciplin"
          value={updatedResultat.disciplin.id}
          onChange={handleInputChange}
          required
        >
          <option value="">Vælg disciplin</option>
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
          value={updatedResultat.resultattype}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Dato:
        <input
          type="date"
          name="dato"
          value={updatedResultat.dato}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Resultatværdi:
        <input
          type="text"
          name="resultatværdi"
          value={updatedResultat.resultatværdi}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ResultatEditForm;