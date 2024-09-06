// import React, { useEffect, useRef, useContext } from "react";
// import { ActionContext } from "../context/ActionProvider";
// import CatSprite from "../assets/CatSprite.svg";
// import Ball from "../assets/Ball.svg";

// export default function Animate(props) {
//   const { secondSprite } = props;
//   const { actions } = useContext(ActionContext);
//   const canvasRef = useRef(null);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Set canvas dimensions to fill the parent div
//     canvas.width = canvas.parentElement.clientWidth;
//     canvas.height = canvas.parentElement.clientHeight;

//     // Load cat and ball images
//     const catImg = new Image();
//     const ballImg = new Image();
//     catImg.src = CatSprite;
//     ballImg.src = Ball;

//     // Set initial positions and angles for both cat and ball
//     let catX = canvas.width / 2;
//     let catY = canvas.height / 2;
//     let catAngle = 0;

//     let ballX = canvas.width / 4;
//     let ballY = canvas.height / 4;
//     let ballAngle = 0;

//     // Function to draw both sprites at their current positions and rotations
//     const drawSprites = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Set the desired size for the cat sprite
//       const catWidth = catImg.width / 2; // Scale the cat width (adjust as needed)
//       const catHeight = catImg.height / 2; // Scale the cat height (adjust as needed)

//       // Draw the cat sprite
//       ctx.save();
//       ctx.translate(catX, catY);
//       ctx.rotate((catAngle * Math.PI) / 180);
//       ctx.drawImage(
//         catImg,
//         -catWidth / 2, // Adjust the position based on new width
//         -catHeight / 2, // Adjust the position based on new height
//         catWidth, // Use the scaled width
//         catHeight // Use the scaled height
//       );
//       ctx.restore();

//       // Set the desired size for the ball sprite
//       const ballWidth = ballImg.width / 16; // Scale the ball width (adjust as needed)
//       const ballHeight = ballImg.height / 16; // Scale the ball height (adjust as needed)

//       // Draw the ball sprite
//       ctx.save();
//       ctx.translate(ballX, ballY);
//       ctx.rotate((ballAngle * Math.PI) / 180);
//       ctx.drawImage(
//         ballImg,
//         -ballWidth / 2, // Adjust the position based on new width
//         -ballHeight / 2, // Adjust the position based on new height
//         ballWidth, // Use the scaled width
//         ballHeight // Use the scaled height
//       );
//       ctx.restore();
//     };

//     // Only draw the sprites after both images are loaded
//     catImg.onload = () => {
//       ballImg.onload = () => {
//         drawSprites();
//       };
//     };

//     // Function to execute the actions for both cat and ball
//     const executeActions = () => {
//       const runActions = () => {
//         // Actions for the cat (actionNo 1)
//         const catActions =
//           actions.find((actionBlock) => actionBlock.actionNo === 1)?.data || [];

//         // Actions for the ball (actionNo 2)
//         const ballActions =
//           actions.find((actionBlock) => actionBlock.actionNo === 2)?.data || [];

//         catActions.forEach((action, index) => {
//           setTimeout(() => {
//             switch (action.type) {
//               case "move":
//                 catX += action.value * Math.cos((catAngle * Math.PI) / 180);
//                 catY += action.value * Math.sin((catAngle * Math.PI) / 180);
//                 break;
//               case "turn":
//                 if (action.description === "left") {
//                   catAngle -= action.value;
//                 } else if (action.description === "right") {
//                   catAngle += action.value;
//                 }
//                 break;
//               case "goto":
//                 catX = action.x;
//                 catY = action.y;
//                 break;
//               case "repeat":
//                 clearInterval(intervalRef.current); // Stop any previous loops
//                 intervalRef.current = setInterval(
//                   runActions,
//                   catActions.length * 500
//                 );
//                 return; // Prevent further execution of the current loop
//               default:
//                 break;
//             }
//             drawSprites(); // Redraw both sprites after each action
//           }, index * 500);
//         });

//         ballActions.forEach((action, index) => {
//           setTimeout(() => {
//             switch (action.type) {
//               case "move":
//                 ballX += action.value * Math.cos((ballAngle * Math.PI) / 180);
//                 ballY += action.value * Math.sin((ballAngle * Math.PI) / 180);
//                 break;
//               case "turn":
//                 if (action.description === "left") {
//                   ballAngle -= action.value;
//                 } else if (action.description === "right") {
//                   ballAngle += action.value;
//                 }
//                 break;
//               case "goto":
//                 ballX = action.x;
//                 ballY = action.y;
//                 break;
//               case "repeat":
//                 clearInterval(intervalRef.current); // Stop any previous loops
//                 intervalRef.current = setInterval(
//                   runActions,
//                   ballActions.length * 500
//                 );
//                 return; // Prevent further execution of the current loop
//               default:
//                 break;
//             }
//             drawSprites(); // Redraw both sprites after each action
//           }, index * 500);
//         });
//       };

//       runActions();
//     };

//     // Function to reset both the cat and the ball sprites to their initial positions
//     const resetSprites = () => {
//       clearInterval(intervalRef.current); // Stop any ongoing repeat loop
//       catX = canvas.width / 2;
//       catY = canvas.height / 2;
//       catAngle = 0;

//       ballX = canvas.width / 4;
//       ballY = canvas.height / 4;
//       ballAngle = 0;

//       drawSprites();
//     };

//     const playButton = document.querySelector(".play__button");
//     const resetButton = document.querySelector(".rst__button");
//     playButton.addEventListener("click", executeActions);
//     resetButton.addEventListener("click", resetSprites);

//     return () => {
//       playButton.removeEventListener("click", executeActions);
//       resetButton.removeEventListener("click", resetSprites);
//       clearInterval(intervalRef.current); // Cleanup interval on unmount
//     };
//   }, [actions]);

//   return (
//     <div className="animate-container">
//       <div className="play__btn">
//         <button className="rst__button">Reset</button>
//         <button className="play__button">Play</button>
//       </div>
//       <canvas ref={canvasRef} />
//     </div>
//   );
// }

import React, { useEffect, useRef, useContext, useState } from "react";
import { ActionContext } from "../context/ActionProvider";
import CatSprite from "../assets/CatSprite.svg";
import Ball from "../assets/Ball.svg";

export default function Animate(props) {
  const { secondSprite } = props;
  const { actions, updateActions } = useContext(ActionContext);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [isDraggingCat, setIsDraggingCat] = useState(false);
  const [isDraggingBall, setIsDraggingBall] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const catImg = new Image();
    const ballImg = new Image();
    catImg.src = CatSprite;
    ballImg.src = Ball;

    let catX = canvas.width / 2;
    let catY = canvas.height / 2;
    let catAngle = 0;

    let ballX = canvas.width / 3;
    let ballY = canvas.height / 3;
    let ballAngle = 0;

    let offsetX, offsetY;

    const drawSprites = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const catWidth = catImg.width / 2;
      const catHeight = catImg.height / 2;

      ctx.save();
      ctx.translate(catX, catY);
      ctx.rotate((catAngle * Math.PI) / 180);
      ctx.drawImage(catImg, -catWidth / 2, -catHeight / 2, catWidth, catHeight);
      ctx.restore();

      if (secondSprite) {
        const ballWidth = ballImg.width / 16;
        const ballHeight = ballImg.height / 16;

        ctx.save();
        ctx.translate(ballX, ballY);
        ctx.rotate((ballAngle * Math.PI) / 180);
        ctx.drawImage(
          ballImg,
          -ballWidth / 2,
          -ballHeight / 2,
          ballWidth,
          ballHeight
        );
        ctx.restore();
      }
    };

    catImg.onload = () => {
      if (secondSprite) {
        ballImg.onload = drawSprites;
      } else {
        drawSprites();
      }
    };

    const checkCollision = () => {
      const catWidth = catImg.width / 2;
      const catHeight = catImg.height / 2;
      const ballWidth = ballImg.width / 16;
      const ballHeight = ballImg.height / 16;

      const catCenterX = catX;
      const catCenterY = catY;
      const ballCenterX = ballX;
      const ballCenterY = ballY;

      const distX = catCenterX - ballCenterX;
      const distY = catCenterY - ballCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      return distance < (catWidth + ballWidth) / 2;
    };

    const executeActions = () => {
      const runActions = () => {
        const catActions =
          actions.find((actionBlock) => actionBlock.actionNo === 1)?.data || [];
        const ballActions =
          actions.find((actionBlock) => actionBlock.actionNo === 2)?.data || [];

        catActions.forEach((action, index) => {
          setTimeout(() => {
            switch (action.type) {
              case "move":
                catX += action.value * Math.cos((catAngle * Math.PI) / 180);
                catY += action.value * Math.sin((catAngle * Math.PI) / 180);
                break;
              case "turn":
                catAngle +=
                  action.description === "left" ? -action.value : action.value;
                break;
              case "goto":
                catX = action.x;
                catY = action.y;
                break;
              default:
                break;
            }
            drawSprites();
            if (secondSprite && checkCollision()) {
              swapActions();
            }
          }, index * 500);
        });

        ballActions.forEach((action, index) => {
          setTimeout(() => {
            if (secondSprite) {
              switch (action.type) {
                case "move":
                  ballX += action.value * Math.cos((ballAngle * Math.PI) / 180);
                  ballY += action.value * Math.sin((ballAngle * Math.PI) / 180);
                  break;
                case "turn":
                  ballAngle +=
                    action.description === "left"
                      ? -action.value
                      : action.value;
                  break;
                case "goto":
                  ballX = action.x;
                  ballY = action.y;
                  break;
                default:
                  break;
              }
              drawSprites();
              if (checkCollision()) {
                swapActions();
              }
            }
          }, index * 500);
        });
      };

      runActions();
    };

    const swapActions = () => {
      const updatedActions = [...actions];
      const catActions =
        updatedActions.find((actionBlock) => actionBlock.actionNo === 1)
          ?.data || [];
      const ballActions =
        updatedActions.find((actionBlock) => actionBlock.actionNo === 2)
          ?.data || [];

      // Swap actions
      const temp = [...catActions];
      const catActionIndex = updatedActions.findIndex(
        (actionBlock) => actionBlock.actionNo === 1
      );
      const ballActionIndex = updatedActions.findIndex(
        (actionBlock) => actionBlock.actionNo === 2
      );
      updatedActions[catActionIndex].data = [...ballActions];
      updatedActions[ballActionIndex].data = [...temp];

      // Update the context
      updateActions(updatedActions);
    };

    const resetSprites = () => {
      clearInterval(intervalRef.current);
      catX = canvas.width / 2;
      catY = canvas.height / 2;
      catAngle = 0;

      ballX = canvas.width / 3;
      ballY = canvas.height / 3;
      ballAngle = 0;

      drawSprites();
    };

    // Drag and drop logic
    const isInsideSprite = (
      x,
      y,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight
    ) => {
      return (
        x >= spriteX - spriteWidth / 2 &&
        x <= spriteX + spriteWidth / 2 &&
        y >= spriteY - spriteHeight / 2 &&
        y <= spriteY + spriteHeight / 2
      );
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const catWidth = catImg.width / 2;
      const catHeight = catImg.height / 2;

      if (isInsideSprite(mouseX, mouseY, catX, catY, catWidth, catHeight)) {
        setIsDraggingCat(true);
        offsetX = mouseX - catX;
        offsetY = mouseY - catY;
      } else if (secondSprite) {
        const ballWidth = ballImg.width / 16;
        const ballHeight = ballImg.height / 16;
        if (
          isInsideSprite(mouseX, mouseY, ballX, ballY, ballWidth, ballHeight)
        ) {
          setIsDraggingBall(true);
          offsetX = mouseX - ballX;
          offsetY = mouseY - ballY;
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!isDraggingCat && !isDraggingBall) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDraggingCat) {
        catX = mouseX - offsetX;
        catY = mouseY - offsetY;
      } else if (isDraggingBall) {
        ballX = mouseX - offsetX;
        ballY = mouseY - offsetY;
      }

      drawSprites();
    };

    const handleMouseUp = () => {
      setIsDraggingCat(false);
      setIsDraggingBall(false);

      if (secondSprite && checkCollision()) {
        swapActions();
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    const playButton = document.querySelector(".play__button");
    const resetButton = document.querySelector(".rst__button");
    playButton.addEventListener("click", executeActions);
    resetButton.addEventListener("click", resetSprites);

    return () => {
      playButton.removeEventListener("click", executeActions);
      resetButton.removeEventListener("click", resetSprites);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalRef.current);
    };
  }, [actions, secondSprite]);

  return (
    <div className="animate-container">
      <div className="play__btn">
        <button className="rst__button">Reset</button>
        <button className="play__button">Play</button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}
