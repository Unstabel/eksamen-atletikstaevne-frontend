import React, { useState, useEffect } from 'react';
import DetailModal from './DeltagerInfo';
import EditModal from './DeltagerEdit';
import DeltagerForm from './DeltagerForm';

interface Participant {
  id: number;
  navn: string;
  køn: string;
  alder: number;
  klub: string;
}

const DeltagerRenderer = (): JSX.Element => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [clubFilter, setClubFilter] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('http://localhost:8080/deltager');
        if (!response.ok) {
          throw new Error('Failed to fetch participants data');
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Error fetching participants data:', error);
      }
    };

    fetchParticipants();
  }, []);

  const handleDetails = (participant: Participant) => {
    setSelectedParticipant(participant);
    setDetailModalVisible(true);
  };

  const handleEdit = (participant: Participant) => {
    setSelectedParticipant(participant);
    setEditModalVisible(true);
  };

  const handleUpdate = (updatedParticipant: Participant) => {
    const updatedParticipants = participants.map((p) =>
      p.id === updatedParticipant.id ? updatedParticipant : p
    );
    setParticipants(updatedParticipants);
    setEditModalVisible(false);
  };

  const handleDelete = async (participant: Participant) => {
    try {
      const response = await fetch(`http://localhost:8080/deltager/${participant.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete participant');
      }
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  const handleModalClose = () => {
    setDetailModalVisible(false);
    setEditModalVisible(false);
  };

  const handleCreate = async (newParticipant: Participant) => {
    try {
      const response = await fetch('http://localhost:8080/deltager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParticipant),
      });
      if (!response.ok) {
        throw new Error('Failed to create participant');
      }
      const createdParticipant: Participant = await response.json();
      setParticipants([...participants, createdParticipant]);
    } catch (error) {
      console.error('Error creating participant:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getAgeGroup = (age: number): string => {
    if (age >= 6 && age <= 9) {
      return 'Børn (6-9)';
    } else if (age >= 10 && age <= 13) {
      return 'Unge (10-13)';
    } else if (age >= 14 && age <= 22) {
      return 'Junior (14-22)';
    } else if (age >= 23 && age <= 40) {
      return 'Voksne (23-40)';
    } else {
      return 'Senior (41+)';
    }
  };

  const filterParticipants = () => {
    let filtered = participants.filter((participant) =>
      participant.navn.toLowerCase().includes(filter.toLowerCase())
    );

    if (genderFilter) {
      filtered = filtered.filter((participant) => participant.køn === genderFilter);
    }

    if (ageGroupFilter) {
      filtered = filtered.filter((participant) => getAgeGroup(participant.alder) === ageGroupFilter);
    }


    return filtered;
  };

  return (
    <div>
      <div>
        <p>Create Participant</p>
        <DeltagerForm onCreate={handleCreate} />
      </div>
      <br />
      <p>Participants List</p>
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
      />

      <div>
        <label>Filter by Gender:</label>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
  <label>Filter by Age Group:</label>
  <select value={ageGroupFilter} onChange={(e) => setAgeGroupFilter(e.target.value)}>
    <option value="">All</option>
    <option value="Børn (6-9)">Børn (6-9)</option>
    <option value="Unge (10-13)">Unge (10-13)</option>
    <option value="Junior (14-22)">Junior (14-22)</option>
    <option value="Voksne (23-40)">Voksne (23-40)</option>
    <option value="Senior (41+)">Senior (41+)</option>
  </select>
</div>

      {/* Tilføj yderligere filtreringsmuligheder efter aldersklasse og klub her */}

      <ul>
        {filterParticipants().map((participant) => (
          <li key={participant.id}>
            <div>
              <strong>{participant.navn}</strong>
              <button onClick={() => handleDetails(participant)}>Detaljer</button>
              <button onClick={() => handleEdit(participant)}>Rediger</button>
              <button onClick={() => handleDelete(participant)}>Slet</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedParticipant && (
        <DetailModal
          participant={selectedParticipant}
          visible={detailModalVisible}
          onClose={handleModalClose}
        />
      )}

      {selectedParticipant && (
        <EditModal
          participant={selectedParticipant}
          visible={editModalVisible}
          onUpdate={handleUpdate}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DeltagerRenderer;