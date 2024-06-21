import React, { useState } from "react";
import "./App.css";
import DeltagerRenderer from "./components/Deltager/DeltagerRenderer";
import ResultatRenderer from "./components/Resultat/ResultatRenderer";
import DisciplinRenderer from "./components/Disciplin/DisciplinRenderer";
import DeltagerDisciplinerList from "./components/DisciplinDeltagerRenderer";

export default function App() {
    const [selectedView, setSelectedView] = useState("homepage");


    function handleSelected(selected: string) {
        setSelectedView(selected);
    }

    return (
        <>
            <div className="outer-div-style">
                <div className="header-style">
                    <h2 className="title-style">Atletik</h2>
                </div>
                <div style={{display: "flex"}}>
                    <div style={{flex: 1, padding: 10}}>
                        <Buttons onSelected={handleSelected}/>
                    </div>
                    <div className="button-style">
                        {selectedView === "homepage" ?
                            <p>Atletik Stævne
                                <br/>
                                <br/>
                            </p> : null}
                        {selectedView === "deltager" ? <p><DeltagerRenderer/></p> : null}
                        {selectedView === "resultat" ? <p><ResultatRenderer/></p> : null}
                        {selectedView === "disciplin" ? <p><DisciplinRenderer/></p> : null}
                        {selectedView === "dsc" ? <p><DeltagerDisciplinerList/></p> : null}
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
            <button className="btn-w100" onClick={() => handleSelected("deltager")}>
                Deltager
            </button>
            <button className="btn-w100" onClick={() => handleSelected("resultat")}>
                Resultater
            </button>
            <button className="btn-w100" onClick={() => handleSelected("disciplin")}>
                Discipliner
            </button>
            <button className="btn-w100" onClick={() => handleSelected("dsc")}>
                Discipliner+Deltagere
            </button>
        </>
    );
};
