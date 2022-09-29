import { validation } from "./validation.js";
const priceFuel = 6.6;
const rentalPrice = 20;
const vatTax = 1.23;
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
  carList.innerHTML += `<option value="${car.id}">Mark: ${car.mark}, Model: ${car.model}, Category: ${car.category}, Combsustion: ${car.combsustion}, Avalibility: ${car.avalibility}</option>`;
});
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  validation();
  if (validation() === true) {
    function getCarInformation() {
      const form = document.getElementById("form");
      const carList = form.querySelector("select[name=carList]");
      const category = cars[carList.value].category;
      const combsustion = cars[carList.value].combsustion;
      const avalibility = cars[carList.value].avalibility;
      return [category, combsustion, avalibility];
    }
    function getModelTax() {
      const [category, ,] = getCarInformation();
      if (category === "Basic") {
        return 1;
      }
      if (category === "Standard") {
        return 1.3;
      }
      if (category === "Medium") {
        return 1.6;
      }
      if (category === "Premium") {
        return 2;
      }
    }
    function calcCombustionFuel() {
      const form = document.getElementById("form");
      const slider = form.querySelector("input[name=slider]");
      const [, combsustion] = getCarInformation();
      let literPer100Km = (slider.value * combsustion) / 100;
      literPer100Km = literPer100Km * priceFuel;
      return literPer100Km.toFixed(2);
    }
    function calcDiffDays() {
      const form = document.getElementById("form");
      let rentDate = form.querySelector("input[name=rentDate]");
      let returnDate = form.querySelector("input[name=returnDate]");
      rentDate = new Date(rentDate.value);
      returnDate = new Date(returnDate.value);
      let oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.abs(
        (rentDate.getTime() - returnDate.getTime()) / oneDay
      );
      return diffDays;
    }
    function resultNetto() {
      const [, , avalibility] = getCarInformation();
      let result =
        rentalPrice * calcDiffDays() * getModelTax() +
        Number(calcCombustionFuel());
      const form = document.getElementById("form");
      const drivingLicence = form.querySelector("input[name=drivingLicence]");
      if (drivingLicence.value > 2017) {
        result = result * 1.2;
      }
      if (avalibility < 3) {
        result = result * 1.15;
      }
      return result.toFixed(2);
    }
    function resultBrutto(resultNetto) {
      let result = Number(resultNetto) * vatTax;
      return result.toFixed(2);
    }
    document.querySelector(".raport").innerHTML = `
    <h1>Raport rent<h1>
    `;
  } else {
    document.querySelector(".raport").innerHTML = "";
  }
});

{
  /* 
<p>Distance to go: ${distance.value} Km</p>
<p>Days of rent: ${calcDiffDays()} Days</p>
<p>Rental price: ${rentalPrice} Zł</p>
<p>Model tax: ${modelTax} Zł</p>
<p>Fuel consumption: ${combustion} L/100km</p>
<p>Netto cost: ${resultNetto()} zł</p>
<p>Brutto cost: ${resultBrutto(resultNetto())} Zł</p>
 */
}
