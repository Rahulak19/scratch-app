import React, { useState } from "react";
import "../styles/displayArea.scss";
import Animate from "../components/Animate";
import SpritesPage from "./SpritesPage";

export default function DisplayArea() {
  const [secondSprite, setSecondSprite] = useState(false);
  return (
    <>
      <div className="display__area">
        <div className="mid__head">Sprite Display</div>
        <div className="display__area__container">
          <div className="display__canvas">
            <Animate secondSprite={secondSprite} />
          </div>
          <div className="display__sprite">
            <div className="select__sprit__header">Select Sprite</div>
            <div className="display__sprites">
              <SpritesPage
                secondSprite={secondSprite}
                setSecondSprite={setSecondSprite}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
