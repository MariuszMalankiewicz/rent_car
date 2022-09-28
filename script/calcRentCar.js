import { validation } from "./validation.js";
const fuel = 6.6;
const rentalPrice = 20;
const vatTax = 0.23;

const cars = [
  {
    id: 0,
    mark: "Fiat",
    model: "500",
    location: "Rzeszów, Millenium Hall",
    avalibility: 20,
    combsustion: 6,
    category: "Basic",
  },
  {
    id: 1,
    mark: "Kia",
    model: "Rio",
    location: "Rzeszów, Galeria Rzeszów",
    avalibility: 10,
    combsustion: 8,
    category: "Standard",
  },
  {
    id: 2,
    mark: "Audi",
    model: "A6",
    location: "Rzeszów, Krasne Auchan",
    avalibility: 5,
    combsustion: 12,
    category: "Medium",
  },
  {
    id: 3,
    mark: "Mercedes-Benz",
    model: "Klasa A",
    location: "Rzeszów, Galeria Nowy Świat",
    avalibility: 2,
    combsustion: 18,
    category: "Premium",
  },
];
(function () {
  const form = document.getElementById("form");
  const slider = form.querySelector("input[name=slider]");
  const spanSlider = form.querySelector("div label span");
  slider.addEventListener("input", () => {
    spanSlider.textContent = ` ${slider.value} Km`;
  });
})();
cars.forEach((car) => {
  const form = document.getElementById("form");
  const pickupLocation = form.querySelector("select[name=pickuplocation]");
  const returnLocation = form.querySelector("select[name=Returnlocation]");
  const carList = form.querySelector("select[name=carList]");
  pickupLocation.innerHTML += `<option value="${car.id} ${car.location}">${car.location}</option>`;
  returnLocation.innerHTML += `<option value="${car.id} ${car.location}">${car.location}</option>`;
  carList.innerHTML += `<option value="${car.category} ${car.combsustion} ${car.avalibility}">Mark: ${car.mark}, Model: ${car.model}, Category: ${car.category}, Combsustion: ${car.combsustion}, Avalibility: ${car.avalibility}</option>`;
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  validation();
  if (validation() === true) {
    console.log("OK");
    function getModelTaxAndCombustion() {
      const form = document.getElementById("form");
      const carList = form.querySelector("select[name=carList]");
      console.log(carList.value);
      if (carList.value == 0) {
        return 1;
      }
      if (carList.value == 1) {
        return 1.3;
      }
      if (carList.value == 2) {
        return 1.6;
      }
      if (carList.value == 3) {
        return 2;
      }
    }
    getModelTaxAndCombustion();
    console.log(getModelTaxAndCombustion());
  } else {
    console.log("error");
  }
});

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
