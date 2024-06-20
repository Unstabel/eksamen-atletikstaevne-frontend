import React, { useState } from "react";
import "./App.css";
import BookGokartButton from "./components/GokartReservationButton";
import BookMinigolfButton from "./components/MinigolfReservationButton";
import BookPaintballButton from "./components/PaintballReservationButton";
import BookClimbingButton from "./components/ClimbingReservationButton";
import {MainComponent} from "./components/AcitivityOverview";

export default function App() {
    const [selectedView, setSelectedView] = useState("homepage");


    function handleSelected(selected: string) {
        setSelectedView(selected);
    }

    return (
        <>
            <div className="outer-div-style">
                <img className="logo-image" src={require("./images/adventurexp-homepage-image.jpg")}/>
                <div className="header-style">
                    <h2 className="title-style">AdventureXP</h2>
                </div>
                <div style={{display: "flex"}}>
                    <div style={{flex: 1, padding: 10}}>
                        <Buttons onSelected={handleSelected}/>
                    </div>
                    <div className="button-style">
                        {selectedView === "homepage" ?
                            <p>Welcome to the Team TL AdventureXP website!
                                <br/>
                                <img className="homepage-image" src={require("./images/adventurexp-homepage-image.jpg")} alt=""/>
                                <br/>
                                Chose one of the activities from the panel on the left side to start your reservation
                            </p> : null}
                        {selectedView === "gokart" ? <p>AdventureXP Go-kart <BookGokartButton/></p> : null}
                        {selectedView === "minigolf" ? <p>AdventureXP Mini-golf <BookMinigolfButton/></p> : null}
                        {selectedView === "paintball" ? <p>AdventureXP Paintball <BookPaintballButton/></p> : null}
                        {selectedView === "climbing" ? <p>AdventureXP Climbing <BookClimbingButton/></p> : null}
                        {selectedView === "overview" ? <p><MainComponent/></p> : null}
                        {/* make new pages for the buttons here  */}
                    </div>
                </div>
            </div>
        </>
    );
}
type ButtonProps = {
    onSelected: (selected: string) => void;
};
const Buttons = (props: ButtonProps) => {
    const { onSelected: handleSelected} = props;
    return (
        <>
            <button className="btn-w100" onClick={() => handleSelected("homepage")}>
                Homepage
            </button>
            <button className="btn-w100" onClick={() => handleSelected("gokart")}>
                Go-kart
            </button>
            <button className="btn-w100" onClick={() => handleSelected("minigolf")}>
                Mini-golf
            </button>
            <button className="btn-w100" onClick={() => handleSelected("paintball")}>
                Paintball
            </button>
            <button className="btn-w100" onClick={() => handleSelected("climbing")}>
                Climbing
            </button>
            <button className="btn-w100" onClick={() => handleSelected("overview")}>
                Overview
            </button>
        </>
    );
};
