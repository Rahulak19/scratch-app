import React, { useState, useContext, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import { ActionContext } from "../context/ActionProvider";
import CatSprite from "../assets/CatSprite.svg";
import Ball from "../assets/Ball.svg";

export default function Animate(props) {
  const { secondSprite } = props;
  const { actions, setActions } = useContext(ActionContext);

  const [catImage, setCatImage] = useState(null);
  const [ballImage, setBallImage] = useState(null);

  const [catPos, setCatPos] = useState({ x: 50, y: 50, angle: 0 });
  const [ballPos, setBallPos] = useState({ x: 300, y: 50, angle: 0 });

  const catIntervalRef = useRef(null);
  const ballIntervalRef = useRef(null);

  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const loadImage = (src, callback) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => callback(img);
      return img;
    };

    loadImage(CatSprite, setCatImage);
    if (secondSprite) {
      loadImage(Ball, setBallImage);
    }
  }, [secondSprite]);

  const keepWithinBounds = (x, y, width, height) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    return {
      x: Math.max(halfWidth, Math.min(x, stageSize.width - halfWidth)),
      y: Math.max(halfHeight, Math.min(y, stageSize.height - halfHeight)),
    };
  };

  useEffect(() => {
    const updateStageSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateStageSize();
    window.addEventListener("resize", updateStageSize);

    return () => {
      window.removeEventListener("resize", updateStageSize);
    };
  }, []);

  const drawActions = (
    spritePos,
    setPosition,
    setAngle,
    actions,
    spriteImage,
    scaleFactor = 1,
    intervalRef
  ) => {
    let currentPos = { ...spritePos };
    let currentAngle = spritePos.angle;

    const runActions = () => {
      actions.forEach((action, index) => {
        setTimeout(() => {
          console.log(`Executing action ${index + 1}:`, action);

          switch (action.type) {
            case "move":
              const moveX =
                action.value * Math.cos((currentAngle * Math.PI) / 180);
              const moveY =
                action.value * Math.sin((currentAngle * Math.PI) / 180);

              const { x, y } = keepWithinBounds(
                currentPos.x + moveX,
                currentPos.y + moveY,
                spriteImage ? (spriteImage.width / 2) * scaleFactor : 0,
                spriteImage ? (spriteImage.height / 2) * scaleFactor : 0
              );

              currentPos = { ...currentPos, x, y };
              setPosition(currentPos);
              console.log("New position after move:", { x, y });
              break;

            case "turn":
              currentAngle += action.value;
              setAngle(currentAngle);
              console.log("New angle after turn:", currentAngle);
              break;
            case "goto":
              const gotoX = action.x !== undefined ? action.x : currentPos.x;
              const gotoY = action.y !== undefined ? action.y : currentPos.y;

              const newPos = keepWithinBounds(
                gotoX,
                gotoY,
                spriteImage ? spriteImage.width / 2 : 0,
                spriteImage ? spriteImage.height / 2 : 0
              );

              currentPos = { ...currentPos, ...newPos };
              setPosition(currentPos);
              console.log("New position after goto:", newPos);
              break;

            case "repeat":
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                runActions();
              }, actions.length * 500);
              return;

            default:
              break;
          }
        }, index * 500);
      });
    };

    runActions();
  };

  const executeActions = () => {
    const catActions =
      actions.find((actionBlock) => actionBlock.actionNo === 1)?.data || [];
    const ballActions =
      actions.find((actionBlock) => actionBlock.actionNo === 2)?.data || [];

    console.log("Executing cat actions:", catActions);
    console.log("Executing ball actions:", ballActions);

    drawActions(
      catPos,
      (pos) => setCatPos((prev) => ({ ...prev, ...pos })),
      (angle) => setCatPos((prev) => ({ ...prev, angle })),
      catActions,
      catImage,
      1,
      catIntervalRef
    );

    if (secondSprite) {
      drawActions(
        ballPos,
        (pos) => setBallPos((prev) => ({ ...prev, ...pos })),
        (angle) => setBallPos((prev) => ({ ...prev, angle })),
        ballActions,
        ballImage,
        1 / 16,
        ballIntervalRef
      );
    }
  };

  const swapActions = () => {
    const updatedActions = [...actions];
    const catActions =
      updatedActions.find((actionBlock) => actionBlock.actionNo === 1)?.data ||
      [];
    const ballActions =
      updatedActions.find((actionBlock) => actionBlock.actionNo === 2)?.data ||
      [];

    updatedActions.find((actionBlock) => actionBlock.actionNo === 1).data = [
      ...ballActions,
    ];
    updatedActions.find((actionBlock) => actionBlock.actionNo === 2).data = [
      ...catActions,
    ];

    setActions(updatedActions);
  };

  const resetSprites = () => {
    clearInterval(catIntervalRef.current);
    clearInterval(ballIntervalRef.current);
    setCatPos({ x: 50, y: 50, angle: 0 });
    setBallPos({ x: 300, y: 50, angle: 0 });
  };

  const checkCollision = () => {
    if (!catImage || !ballImage) return false;

    const distX =
      catPos.x + catImage.width / 4 - (ballPos.x + ballImage.width / 32);
    const distY =
      catPos.y + catImage.height / 4 - (ballPos.y + ballImage.height / 32);
    const distance = Math.sqrt(distX * distX + distY * distY);

    const catRadius = Math.max(catImage.width / 4, catImage.height / 4);
    const ballRadius = Math.max(ballImage.width / 32, ballImage.height / 32);

    return distance < catRadius + ballRadius;
  };

  useEffect(() => {
    if (secondSprite && checkCollision()) {
      swapActions();
    }
  }, [catPos, ballPos, secondSprite]);

  return (
    <div className="animate-container">
      <div className="play__btn">
        <button className="rst__button" onClick={resetSprites}>
          Reset
        </button>
        <button className="play__button" onClick={executeActions}>
          Play
        </button>
      </div>
      <div
        className="konva__div"
        ref={containerRef}
        style={{
          width: "600px",
          height: "350px",
          // border: "1px solid black",
        }}
      >
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            {catImage && (
              <Image
                image={catImage}
                x={catPos.x || 0}
                y={catPos.y || 0}
                width={catImage.width / 2}
                height={catImage.height / 2}
                rotation={catPos.angle}
                draggable
                onDragMove={(e) => {
                  const { x, y } = keepWithinBounds(
                    e.target.x(),
                    e.target.y(),
                    catImage.width / 2,
                    catImage.height / 2
                  );
                  setCatPos({ ...catPos, x, y });
                }}
              />
            )}
            {secondSprite && ballImage && (
              <Image
                image={ballImage}
                x={ballPos.x || 0}
                y={ballPos.y || 0}
                width={ballImage.width / 16}
                height={ballImage.height / 16}
                rotation={ballPos.angle}
                draggable
                onDragMove={(e) => {
                  const { x, y } = keepWithinBounds(
                    e.target.x(),
                    e.target.y(),
                    ballImage.width / 16,
                    ballImage.height / 16
                  );
                  setBallPos({ ...ballPos, x, y });
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
