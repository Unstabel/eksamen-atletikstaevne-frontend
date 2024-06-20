import React, { useState } from "react";
import ReactDOM from "react-dom";
import BookGokartForm from "./GokartReservationForm";

const BookGokartButton = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    return (
        <div>
            <br/>
            <p>In Adventure XP we offer go-kart as one of our fun activities.</p>
            <br/>
            <p>Here you can make a reservation for you and your friends or family.</p>
            <br/>
            <p>Please note that all participants has to be 12 years or older to participate.</p>
            <br/>
            <img className="activity-image" src={require("../images/adventurexp-gokart.jpg")} alt=""/>
            <br/>
            <button className="btn-w100" type="button" onClick={handleClick}>
                Make Go-Kart Reservation
            </button>
            {showForm &&
                ReactDOM.createPortal(
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleClose}>
                                    &times;
                                </span>
                                <BookGokartForm/>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BookGokartButton;
