document.addEventListener("DOMContentLoaded", function () {
  let extendDifficult = 1;
  let pivotofDifficult = 0;

  let lastceilsRow = 2;
  let ceilsRow = 2;
  let calculationCeils = Math.pow(ceilsRow, 2);

  // Point User
  let pointUsr = 0;

  // Set widt
  let width = 500;

  // Var TrueCeil
  let trueCeil = 0;

  // root Time
  let rootTime = 15;
  // Bug Color
  let increaseopacity = 0.02;

  //Default root
  let defaultOpacity = 1;
  // Get Box to draw
  let boxGame = document.getElementsByClassName("bigBox")[0];

  function resetGame() {
    lastceilsRow = 2;
    ceilsRow = 2;
    calculationCeils = Math.pow(ceilsRow, 2);
    increaseopacity = 0.02;
    pointUsr = 0;
    extendDifficult = 1;
    pivotofDifficult = 0;
    defaultOpacity = 1;
    rootTime = 15;
    Update();
  }
  function Update() {
    let point = document.getElementById("point");
    point.innerHTML = "0";
    boxGame.innerHTML = "";
  }
  Update();
  // Declare CreateBox Ceil

  function createBox(className, EdgeCeil, R, G, B, differOpacity) {
    let ceil = document.createElement("div");

    ceil.setAttribute("class", className);
    ceil.setAttribute("cursor", "pointer");
    ceil.setAttribute(
      "style",
      `cursor : pointer; width: ${EdgeCeil}px; height: ${EdgeCeil}px; background: rgba(${R},${G},${B},${differOpacity});`
    );

    return ceil;
  }

  let drawCeils = function (
    countCeilsofRow,
    calculationCeils,
    widthBox,
    boxBlock
  ) {
    boxBlock.innerHTML = "";
    let lengthEdgeCeil = widthBox / countCeilsofRow;
    // true Ceil
    trueCeil = Math.floor(Math.random() * calculationCeils);

    // Get R - G -B
    let Red = Math.floor(Math.random() * 255);
    let Green = Math.floor(Math.random() * 255);
    let Blue = Math.floor(Math.random() * 255);

    // Declare Opacity Root

    // Draw Ceil
    for (let i = 0; i < calculationCeils; i++) {
      if (i == trueCeil) {
        let opacityVal = defaultOpacity - increaseopacity;
        console.log(opacityVal);

        // Create True ceil
        let ceil = createBox(
          "ceil",
          lengthEdgeCeil,
          Red,
          Green,
          Blue,
          opacityVal
        );
        boxBlock.appendChild(ceil);
      } else {
        //Create Wrong Ceil
        let ceil = createBox("ceil", lengthEdgeCeil, Red, Green, Blue, 1);

        boxBlock.appendChild(ceil);
      }
    }
  };
  function changeColorCeil(boxBlock, ceilsOfRow, widthBox) {
    // Get Block ceil
    let arrC = document.getElementsByClassName("ceil");
    let ceilRowNow = ceilsOfRow !== lastceilsRow ? ceilsOfRow : lastceilsRow;

    let calculationOfceils = ceilRowNow * ceilRowNow;

    trueCeil = Math.floor(Math.random() * ceilRowNow);

    let R = Math.floor(Math.random() * 255);

    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);

    // Declare Opacity Root
    let defaultOpacity = 1;

    let EdgeCeil = widthBox / ceilsOfRow;
    let checkFillOpacCeil = false;
    for (let i = 0; i < arrC.length; i++) {
      if (i == trueCeil) {
        let opacityVal = defaultOpacity - increaseopacity;

        arrC[i].setAttribute(
          "style",
          `cursor : pointer; width: ${EdgeCeil}px; height: ${EdgeCeil}px; background: rgba(${R},${G},${B},${opacityVal});`
        );
        checkFillOpacCeil = true;
      } else {
        arrC[i].setAttribute(
          "style",
          `cursor : pointer; width: ${EdgeCeil}px; height: ${EdgeCeil}px; background: rgba(${R},${G},${B},${defaultOpacity});`
        );
      }
    }
    if (ceilsOfRow !== lastceilsRow) {
      for (let i = arrC.length; i < calculationOfceils; i++) {
        if (i == trueCeil) {
          if (checkFillOpacCeil == true) {
            let opacityVal = defaultOpacity - increaseopacity;
            let ceil = createBox("ceil", EdgeCeil, R, G, B, opacityVal);
          }

          boxBlock.appendChild(ceil);
        } else {
          let ceil = createBox("ceil", EdgeCeil, R, G, B, defaultOpacity);
          boxBlock.appendChild(ceil);
        }
      }
      // let arrCeil = document.getElementsByClassName("ceil");
      // console.log(arrCeil);

      addClickForCeil(arrC, ceilRowNow);
    }
  }
  function addClickForCeil(ArrC, start) {
    for (let index = start; index < ArrC.length; index++) {
      ArrC[index].addEventListener("click", function () {
        positionClick = 0;
        let ceilClick = this;
        for (
          positionClick = 0;
          (ceilClick = ceilClick.previousElementSibling);
          positionClick++
        );

        if (positionClick == trueCeil) {
          // User click true Ceil so we continue that fucking game

          // Reset Clock
          rootTime = 15;

          // Increasse Opacity
          increaseopacity += 0.005;

          if (pivotofDifficult == extendDifficult) {
            extendDifficult++;
            pivotofDifficult = 0;
          }
          changeColorCeil(boxGame, extendDifficult + 1, width);

          // Change point
          pointUsr++;

          let point = document.getElementById("point");
          point.innerText = pointUsr + "";

          // Pivot Difficulty
          pivotofDifficult++;
        } else {
          rootTime -= 3;
        }
      });
    }
  }

  function startGame() {
    drawCeils(ceilsRow, calculationCeils, width, boxGame);

    // Get block Ceil element
    let ArrCeil = document.getElementsByClassName("ceil");

    // Add Them click behavior
    addClickForCeil(ArrCeil, 0);
  }

  function playAgain() {
    resetGame();
    startGame();
    rootTime = 15;
    let timeleft = document.getElementById("timeleft");
    let tools = document.getElementsByClassName("gameLayout__toolsGame");
    // console.log(tools[0]);
    tools[0].setAttribute("style", "display:block;");
    let runningGame = setInterval(function () {
      rootTime -= 0.1;
      timeleft.innerText = rootTime.toFixed(1) + " sec";

      if (rootTime <= 0) {
        boxGame.innerHTML = "";
        let tools = document.getElementsByClassName("gameLayout__toolsGame");
        // console.log(tools[0]);
        tools[0].setAttribute("style", "display:none;");

        let losingBox = document.createElement("img");
        losingBox.setAttribute("src", "gameover.png");
        losingBox.setAttribute("style", "width:100%;opacity:1;");

        boxGame.appendChild(losingBox);
        clearInterval(runningGame);
        boxGame.innerHTML += ` <div class="button" style = "text-align:center">
                <button id = "again" alt ="Play Again?">Play Again?</button>
            </div>`;

        let getButton = document.getElementById("again");
        console.log(getButton);
        getButton.onclick = function () {
          playAgain();
        };
      }
    }, 100);
  }
  startGame();

  let timeleft = document.getElementById("timeleft");

  let runningGame = setInterval(function () {
    rootTime -= 0.1;
    timeleft.innerText = rootTime.toFixed(1) + " sec";

    if (rootTime <= 0) {
      boxGame.innerHTML = "";
      let tools = document.getElementsByClassName("gameLayout__toolsGame");
      // console.log(tools[0]);
      tools[0].setAttribute("style", "display:none;");

      let losingBox = document.createElement("img");
      losingBox.setAttribute("src", "gameover.png");
      losingBox.setAttribute("style", "width:100%;opacity:1;");

      boxGame.appendChild(losingBox);
      clearInterval(runningGame);
      boxGame.innerHTML += ` <div class="button" style = "text-align:center">
                <button id = "again" alt ="Play Again?">Play Again?</button>
            </div>`;

      let getButton = document.getElementById("again");
      getButton.onclick = function () {
        playAgain();
      };
      // console.log(getButton);
    }
  }, 100);
});
