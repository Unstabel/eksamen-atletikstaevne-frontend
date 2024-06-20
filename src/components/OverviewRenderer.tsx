import React from 'react';

interface Entity {
    id: number;
    name: string;
    participants: number;
    date: number[];
    timeStart: number[];
    timeEnd: number[];
    balls?: number;
    AdultKarts?: number;
    ChildKarts?: number;
}

interface OverviewProps {
    entities: Entity[];
    selectedView: string;
    refreshData: () => void;
}

export function Overview({ entities, selectedView, refreshData }: OverviewProps & { selectedView: string, refreshData: () => void }) {
    const handleDelete = async (id: number, activity: string) => {
        console.log(activity, id);
        try {
            const response = await fetch(`https://adventurexp.azurewebsites.net/${activity}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            console.log("Delete Success");
            // After successful deletion, refresh the data
            refreshData();
        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
        }
    };

    return (
        <div>
            <p>Overview of {selectedView}</p>
            <div>
                {entities.map((entity) => (
                    <div className="overview-item" key={entity.id}>
                        <div>Name: {entity.name}</div>
                        <div>Participants: {entity.participants}</div>
                        <div>Date: {entity.date[0]}-{entity.date[1]}-{entity.date[2]}</div>
                        <div>Start Time: {entity.timeStart[0]}:{entity.timeStart[1]}</div>
                        <div>End Time: {entity.timeEnd[0]}:{entity.timeEnd[1]}</div>
                        {entity.balls && <div>Balls: {entity.balls}</div>}
                        {entity.ChildKarts && <div>Child Karts: {entity.ChildKarts}</div>}
                        {entity.AdultKarts && <div>Adult Karts: {entity.AdultKarts}</div>}
                        <button onClick={() => handleDelete(entity.id, selectedView)}>Delete</button>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    );
}
