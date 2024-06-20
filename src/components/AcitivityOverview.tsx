
import CleanupOldDataButton from './CleanupOldDataButton';
import React, {useEffect, useState} from 'react';
import { Overview } from './OverviewRenderer';

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


export function MainComponent() {
    const [selectedView, setSelectedView] = useState<string>("homepage");
    const [activityEntities, setActivityEntities] = useState<Entity[]>([]);
    const [showCurrentDayBookings, setShowCurrentDayBookings] = useState<boolean>(false);

    const fetchActivityData = async (activity: string) => {
        try {
            const response = await fetch(`https://adventurexp.azurewebsites.net/${activity}`);
            if (!response.ok) {
                throw new Error('Failed to fetch activity data');
            }
            const data = await response.json();
            setActivityEntities(data);
        } catch (error) {
            console.error('Error fetching activity data:', error);
        }
    };

    const handleActivityButtonClick = (activity: string) => {
        setSelectedView(activity);
        fetchActivityData(activity);
    };

    const handleShowCurrentDayBookingsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowCurrentDayBookings(event.target.checked);
    };

    // Function to refresh data after deletion
    const refreshData = () => {
        fetchActivityData(selectedView);
    };

    // Filter bookings for the current day if the checkbox is checked
    const filteredActivityEntities = showCurrentDayBookings
        ? activityEntities.filter(entity => {
            const currentDate = new Date();
            const [year, month, day] = entity.date;
            const entityDate = new Date(year, month - 1, day); // Month is 0-based in Date constructor
            return entityDate.toDateString() === currentDate.toDateString();
        })
        : activityEntities;

    // Sort the activityEntities
    const sortedActivityEntities = filteredActivityEntities.sort((a, b) => {
        // Compare dates
        const dateComparison = a.date.toString().localeCompare(b.date.toString());
        if (dateComparison !== 0) {
            return dateComparison;
        }

        // Compare timeStart if available
        if (a.timeStart && b.timeStart) {
            return a.timeStart.toString().localeCompare(b.timeStart.toString());
        }

        // If timeStart is not available, consider them equal
        return 0;
    });

    return (
        <div className="button-style">
            <button onClick={() => handleActivityButtonClick('minigolf')}>Minigolf</button>
            <button onClick={() => handleActivityButtonClick('paintball')}>Paintball</button>
            <button onClick={() => handleActivityButtonClick('climbing')}>Climbing</button>
            <button onClick={() => handleActivityButtonClick('gokart')}>Go-Kart</button>
            <label>
                Show only current day bookings:
                <input
                    type="checkbox"
                    checked={showCurrentDayBookings}
                    onChange={handleShowCurrentDayBookingsChange}
                />
            </label>
            <CleanupOldDataButton />
            <Overview entities={sortedActivityEntities} selectedView={selectedView} refreshData={refreshData} />
        </div>
    );
}
