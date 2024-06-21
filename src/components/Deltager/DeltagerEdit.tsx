import React, { useState, useEffect } from "react";
import Modal from "../Modal";

interface Participant {
  id: number;
  navn: string;
  køn: string;
  alder: number;
  klub: string;
}

interface EditModalProps {
  participant: Participant;
  visible: boolean;
  onUpdate: (updatedParticipant: Participant) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  participant,
  visible,
  onUpdate,
  onClose,
}) => {
  const [editedParticipant, setEditedParticipant] = useState<Participant>(
    participant
  );

  // Opdater editedParticipant, når participant ændres
  useEffect(() => {
    setEditedParticipant(participant);
  }, [participant]);

  // Funktion til at håndtere ændringer i inputfelter
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedParticipant({
      ...editedParticipant,
      [name]: value,
    });
  };

  // Funktion til at håndtere opdatering af deltageroplysninger
  const handleUpdate = () => {
    onUpdate(editedParticipant);
  };

  // Funktion til at håndtere lukning af modal og nulstilling af editedParticipant
  const handleClose = () => {
    setEditedParticipant(participant); // Nulstil til den oprindelige deltager
    onClose();
  };

  return (
    <Modal visible={visible} onClose={handleClose}>
      <h2>Edit Participant</h2>
      <label>
        Name:
        <input
          type="text"
          name="navn"
          value={editedParticipant.navn}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          name="køn"
          value={editedParticipant.køn}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="alder"
          value={editedParticipant.alder.toString()}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Club:
        <input
          type="text"
          name="klub"
          value={editedParticipant.klub}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleClose}>Cancel</button>
    </Modal>
  );
};

export default EditModal;