import React, { useState } from "react";
import "../styles/spritesPage.scss";
import CatSprite from "../assets/CatSprite.svg";
import Ball from "../assets/Ball.svg";

export default function SpritesPage(props) {
  const { secondSprite, setSecondSprite } = props;
  return (
    <>
      <div className="sprites__main">
        <div className="sprite__tags">
          <div className="sprite__tg__1">
            <img className="cat__sp__img" alt="cat-img" src={CatSprite}></img>
          </div>
          <div className="sprite__tg__2">
            {secondSprite ? (
              <>
                <div
                  className="close__btn__x"
                  onClick={() => setSecondSprite(false)}
                >
                  <span className="close__btn__x__span">x</span>
                </div>
                <img className="ball__sp__img" alt="ball" src={Ball}></img>
              </>
            ) : (
              <div className="add__icon" onClick={() => setSecondSprite(true)}>
                +
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
