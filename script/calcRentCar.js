import {
  getCurrentDate,
  checkDrivingId,
  checkPickupLocation,
  checkRentDate,
  checkReturnLocation,
  checkReturnDate,
  checkSameDate,
  checkDataTrickster,
  checkFindCar,
} from "./validation.js";

const fuel = 6.6;
const rentalPrice = 5;
const vatTax = 0.23;

(function () {
  const form = document.getElementById("form");
  const slider = form.querySelector("input[name=slider]");
  const spanSlider = form.querySelector("div label span");
  slider.addEventListener("input", () => {
    spanSlider.textContent = ` ${slider.value} Km`;
  });
})();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  checkDrivingId();
  checkPickupLocation();
  checkRentDate();
  checkReturnLocation();
  checkReturnDate();
  checkSameDate();
  checkDataTrickster();
  checkFindCar();
  console.log(checkDrivingId());
  console.log(checkPickupLocation());
  console.log(checkRentDate());
  console.log(checkReturnLocation());
  console.log(checkReturnDate());
  console.log(checkSameDate());
  console.log(checkDataTrickster());
  console.log(checkFindCar());
  if (
    checkDrivingId() === true &&
    checkPickupLocation() === true &&
    checkRentDate() === true &&
    checkReturnLocation() === true &&
    checkReturnDate() === true &&
    checkSameDate() === true &&
    checkDataTrickster() === true &&
    checkFindCar() === true
  ) {
    console.log("OK");
  } else {
    console.log("error");
  }
});

//     function getModelTaxAndCombustion() {
//       const form = document.getElementById("form");
//       const carList = form.querySelector("select[name=carList]");
//       if (carList.value === "basic") {
//         const tab = [1, 6];
//         return tab;
//       }
//       if (carList.value === "standard") {
//         const tab = [1.3, 7.3];
//         return tab;
//       }
//       if (carList.value === "medium") {
//         const tab = [1.6, 9.6];
//         return tab;
//       }
//       if (carList.value === "premium") {
//         const tab = [2, 12];
//         return tab;
//       }
//     }
//     function calcCombustionFuel() {
//       const slider = form.querySelector("input[name=slider]");
//       return (slider.value * combustion) / 100;
//     }
//     function calcDiffDays() {
//       const [wrapperStartRent, startRent, startRentError] = getStartRent();
//       const [wrapperEndRent, endRent, endRentError] = getEndRent();
//       let startDate = new Date(startRent.value);
//       let endDate = new Date(endRent.value);
//       let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//       diffDays = Math.abs((startDate.getTime() - endDate.getTime()) / oneDay);
//       return diffDays;
//     }
//     function resultNetto() {
//       const [modelTax, combustion] = getModelTaxAndCombustion();
//       const [wrapperDriving, drivingId, driveIdError] = getDrivingId();
//       let result =
//         rentalPrice * modelTax * calcDiffDays() + calcCombustionFuel();
//       if (drivingId.value > 2017) {
//         result = result + result * 0.2;
//         return result.toFixed(2);
//       } else {
//         return result.toFixed(2);
//       }
//     }
//     function resultBrutto(resultNetto) {
//       const brutto = Number(resultNetto) * vatTax;
//       result = Number(resultNetto) + brutto;
//       return result.toFixed(2);
//     }

//     document.getElementById("raport").innerHTML = `
//     OK
//     `;
//   } else {
//     document.getElementById("raport").innerHTML = "";
//   }
// });
// <h1>Raport rent<h1>
// <p>Distance to go: ${distance.value} Km</p>
// <p>Days of rent: ${calcDiffDays()} Days</p>
// <p>Rental price: ${rentalPrice} Zł</p>
// <p>Model tax: ${modelTax} Zł</p>
// <p>Fuel consumption: ${combustion} L/100km</p>
// <p>Netto cost: ${resultNetto()} zł</p>
// <p>Brutto cost: ${resultBrutto(resultNetto())} Zł</p>
