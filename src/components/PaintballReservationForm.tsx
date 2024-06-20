import React, { useState, ChangeEvent, FormEvent } from 'react';

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const BookPaintballForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        participants: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        balls: ''
    });
    const [formClosed, setFormClosed] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://adventurexp.azurewebsites.net/paintball', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            console.log('Data submitted');
            setFormClosed(true);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    if (formClosed) {
        return <p>Your reservation has successfully been submitted!</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Fill out your information</p>
            <br/>
            <label>
                Name:
                <input type="text" name="name" required={true} value={formData.name} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Participants:
                <input type="number" name="participants" required={true} value={formData.participants}
                       onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Date:
                <input type="date" name="date" required={true} value={formData.date} onChange={handleChange} min={getCurrentDate()}/>
            </label>
            <br/>
            <label>
                Time Start:
                <input type="time" name="timeStart" required={true} value={formData.timeStart} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Time End:
                <input type="time" name="timeEnd" required={true} value={formData.timeEnd} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Balls per person:
                <select
                    name="balls"
                    required={true}
                    value={formData.balls}
                    onChange={handleChange}
                >
                    <option value="" disabled selected>Select number of balls</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                </select>
            </label>
            <br/>
            <br/>
            <label>
                I agree that all participants
                <br/>
                are over the age of 16
                <input type="checkbox" name="age" required={true} onChange={handleChange}/>
            </label>
            <br/>
            <br/>
            <button className="btn-w100" type="submit">Submit</button>
        </form>
    );
};

export default BookPaintballForm;
