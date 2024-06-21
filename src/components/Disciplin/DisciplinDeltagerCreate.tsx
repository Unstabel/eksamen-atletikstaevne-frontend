import React, { useState } from 'react';

interface DisciplinDeltagerCreateProps {
  deltagerOptions: { id: number; navn: string }[];
  disciplinOptions: { id: number; navn: string }[];
  visible: boolean;
  onClose: () => void;
}

const DisciplinDeltagerCreate: React.FC<DisciplinDeltagerCreateProps> = ({
  deltagerOptions,
  disciplinOptions,
  visible,
  onClose,
}) => {
  const [selectedDeltagerId, setSelectedDeltagerId] = useState<number | null>(null);
  const [selectedDisciplinId, setSelectedDisciplinId] = useState<number | null>(null);

  const handleDeltagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeltagerId(Number(e.target.value));
  };

  const handleDisciplinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDisciplinId(Number(e.target.value));
  };

  const handleAddDisciplinToDeltager = async () => {
    if (!selectedDeltagerId || !selectedDisciplinId) {
      alert('Please select a deltager and a disciplin.');
      return; // Early return if either id is not selected
    }

    try {
      const response = await fetch('http://localhost:8080/deltagerDisciplin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deltager: { id: selectedDeltagerId },
          disciplin: { id: selectedDisciplinId },
        }),
      });
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Failed to add disciplin to deltager.');
      }
      console.log('Disciplin added successfully.');
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error('Error adding disciplin to deltager:', error);
    }
  };

  // Ensure that the modal content is only rendered when `visible` is true
  if (!visible) {
    return null; // Return null if modal is not visible
  }

  return (
    <div>
      <h3>Add Disciplin to Deltager</h3>

      <label>Select Deltager:</label>
      <select onChange={handleDeltagerChange}>
        <option value="">Select a deltager</option>
        {deltagerOptions.map((deltager) => (
          <option key={deltager.id} value={deltager.id}>
            {deltager.navn}
          </option>
        ))}
      </select>

      <label>Select Disciplin:</label>
      <select onChange={handleDisciplinChange}>
        <option value="">Select a disciplin</option>
        {disciplinOptions.map((disciplin) => (
          <option key={disciplin.id} value={disciplin.id}>
            {disciplin.navn}
          </option>
        ))}
      </select>

      <button onClick={handleAddDisciplinToDeltager}>Add Disciplin to Deltager</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DisciplinDeltagerCreate;