import React, { useState } from "react";
import ReactDOM from "react-dom";
import BookMinigolfForm from "./MinigolfReservationForm";

const BookMinigolfButton = () => {
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
            <p>In Adventure XP we offer mini-golf as one of our fun activities.</p>
            <br/>
            <p>Here you can make a reservation for you and your friends or family.</p>
            <br/>
            <img className="activity-image" src={require("../images/adventurexp-minigolf.jpg")} alt=""/>
            <br/>
            <button className="btn-w100" type="button" onClick={handleClick}>
                Make Mini-Golf Reservation
            </button>
            {showForm &&
                ReactDOM.createPortal(
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleClose}>
                                    &times;
                                </span>
                                <BookMinigolfForm/>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BookMinigolfButton;
