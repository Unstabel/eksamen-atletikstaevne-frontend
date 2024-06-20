import React, { useState } from "react";
import ReactDOM from "react-dom";
import BookClimbingForm from "./ClimbingReservationForm";

const BookClimbingButton = () => {
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
            <p>In Adventure XP we offer climbing as one of our fun activities.</p>
            <br/>
            <p>Here you can make a reservation for you and your friends or family.</p>
            <br/>
            <img className="activity-image" src={require("../images/adventurexp-climbing.jpg")} alt=""/>
            <br/>
            <button className="btn-w100" type="button" onClick={handleClick}>
                Make Climbing Reservation
            </button>
            {showForm &&
                ReactDOM.createPortal(
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleClose}>
                                    &times;
                                </span>
                                <BookClimbingForm/>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BookClimbingButton;
