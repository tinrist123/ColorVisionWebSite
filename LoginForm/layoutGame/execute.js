document.addEventListener("DOMContentLoaded", function () {
  let extendDifficult = 1;
  let pivotofDifficult = 0;

  let ceilsRow = 2;
  let calculationCeils = Math.pow(ceilsRow, 2);

  // Set widt
  let width = 500;

  // Bug Color
  let increaseopacity = 0.05;

  // Add More Ceil to be difficult
  if (pivotofDifficult == extendDifficult) {
    extendDifficult++;
  } else pivotofDifficult != extendDifficult;
  {
    // Get Box to draw
    let boxGame = document.getElementsByClassName("bigBox")[0];
    // console.log(boxGame);

    // length of Edge Ceil
    let lengthEdgeCeil = width / ceilsRow;

    // wrong Ceil
    let wrongCeil = Math.floor(Math.random() * calculationCeils);

    // Get R - G -B
    let Red = Math.floor(Math.random() * 255);
    let Green = Math.floor(Math.random() * 255);
    let Blue = Math.floor(Math.random() * 255);
    // Declare Opacity Root
    let defaultOpacity = 0.8;

    // Draw Ceil
    for (let i = 0; i < calculationCeils; i++) {
      if (i == wrongCeil) {
        let opacityVal = increaseopacity + defaultOpacity;
        boxGame.innerHTML += `<div
              class="ceil"
              style="cursor : pointer; width: ${lengthEdgeCeil}px; height: ${lengthEdgeCeil}px; background: rgba(${Red},${Green},${Blue},${opacityVal});"
            ></div>`;
      } else {
        boxGame.innerHTML += `<div
              class="ceil"
              style="cursor : pointer; width: ${lengthEdgeCeil}px; height: ${lengthEdgeCeil}px; background: rgba(${Red},${Green},${Blue});"
            ></div>`;
      }
    }

    // Declare Ceils.Array
    let ArrCeil = document.getElementsByClassName("ceil");

    for (let index = 0; index < ArrCeil.length; index++) {
      ArrCeil[index].addEventListener("click", function () {
        let positionClick = 0;
        let ceilClick = this;
        for (
          positionClick;
          (ceilClick = ceilClick.previousElementSibling);
          positionClick++
        );
        // console.log(positionClick);
        checkClickUser();
      });
    }
  }
});
