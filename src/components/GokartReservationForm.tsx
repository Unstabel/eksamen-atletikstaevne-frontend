import React, { useState, ChangeEvent, FormEvent } from 'react';

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const BookGokartForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        participants: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        childKarts: '',
        adultKarts: ''
    });
    const [formClosed, setFormClosed] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://adventurexp.azurewebsites.net/gokart', {
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
                Child Karts (under 140cm):
                <input
                    type="number"
                    name="childKarts"
                    value={formData.childKarts}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                Adult Karts (over 140cm):
                <input
                    type="number"
                    name="adultKarts"
                    value={formData.adultKarts}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <br/>
            <label>
                I agree that all participants
                <br/>
                are over the age of 12
                <input type="checkbox" name="age" required={true} onChange={handleChange}/>
            </label>
            <br/>
            <br/>
            <button className="btn-w100" type="submit">Submit</button>
        </form>
    );
};

export default BookGokartForm;
