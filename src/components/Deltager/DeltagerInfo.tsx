import React, { useState } from "react";
import "./DeltagerRenderer";

interface Participant {
    id: number;
    navn: string;
    køn: string;
    alder: number;
    klub: string;
  }

  interface DetailModalProps {
    participant: Participant;
    visible: boolean;
    onClose: () => void;
  }

  const DetailModal: React.FC<DetailModalProps> = ({ participant, onClose, visible }) => {
    const closeModal = () => {
      onClose();
    };

    if (!visible) {
        return null; // Return null if modal should not be visible
      }
  
    return (
      <div className="modal">
        <h2>Detaljer for {participant.navn}</h2>
        <p>Køn: {participant.køn}</p>
        <p>Alder: {participant.alder}</p>
        <p>Klub: {participant.klub}</p>
        <button onClick= {closeModal}>Luk</button>
      </div>
    );
  };

  export default DetailModal;