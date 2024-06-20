import React from 'react';

const CleanupOldDataButton = () => {
    const handleCleanupOldData = () => {
        fetch('https://adventurexp.azurewebsites.net/cleanupOldData', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Data cleanup successful');
            })
            .catch(error => {
                console.error('Error cleaning up old data:', error);
            });
    };

    return (
        <button onClick={handleCleanupOldData}>
            Cleanup Old Data
        </button>
    );
};

export default CleanupOldDataButton;