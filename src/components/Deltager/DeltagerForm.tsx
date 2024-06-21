import React, { useState } from "react";

interface Participant {
    id: number;
    navn: string;
    køn: string;
    alder: number;
    klub: string;
  }

interface DeltagerFormProps {
  onCreate: (newParticipant: Participant) => void;
}

const DeltagerForm: React.FC<DeltagerFormProps> = ({ onCreate }) => {
  const [newParticipant, setNewParticipant] = useState({
    id: 0, // Generer id på serveren normalt
    navn: '',
    køn: '',
    alder: 0,
    klub: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewParticipant({
      ...newParticipant,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(newParticipant);
    // Nulstil formularfelter efter oprettelse
    setNewParticipant({
      id: 0,
      navn: '',
      køn: '',
      alder: 0,
      klub: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="navn"
          value={newParticipant.navn}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          name="køn"
          value={newParticipant.køn}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="alder"
          value={newParticipant.alder.toString()}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Club:
        <input
          type="text"
          name="klub"
          value={newParticipant.klub}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default DeltagerForm;