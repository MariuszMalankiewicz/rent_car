const fuel = 6.6;
const rentalPrice = 5;
const vatTax = 0.23;
// Get
function getDistance() {
  const wrapperDistance = document.getElementById("wrapperDistance");
  const distance = wrapperDistance.getElementsByTagName("input")[0];
  const spanText = wrapperDistance.getElementsByTagName("span")[0];
  const tab = [wrapperDistance, distance, spanText];
  return tab;
}
function getDrivingId() {
  const wrapperDriving = document.getElementById("wrapperDriving");
  const drivingId = wrapperDriving.getElementsByTagName("input")[0];
  const driveIdError = wrapperDriving.getElementsByTagName("span")[0];
  const tab = [wrapperDriving, drivingId, driveIdError];
  return tab;
}
function getStartRent() {
  const wrapperStartRent = document.getElementById("wrapperStartRent");
  const startRent = wrapperStartRent.getElementsByTagName("input")[0];
  const startRentError = wrapperStartRent.getElementsByTagName("span")[0];
  const tab = [wrapperStartRent, startRent, startRentError];
  return tab;
}
function getEndRent() {
  const wrapperEndRent = document.getElementById("wrapperEndRent");
  const endRent = wrapperEndRent.getElementsByTagName("input")[0];
  const endRentError = wrapperEndRent.getElementsByTagName("span")[0];
  const tab = [wrapperEndRent, endRent, endRentError];
  return tab;
}
function getModel() {
  const wrapperCarList = document.getElementById("wrapperCarList");
  const model = wrapperCarList.getElementsByTagName("select")[0];
  const modelError = wrapperCarList.getElementsByTagName("span")[0];
  const tab = [wrapperCarList, model, modelError];
  return tab;
}
function getLocation() {
  const wrapperLocation = document.getElementById("wrapperLocation");
  const location = wrapperLocation.getElementsByTagName("select")[0];
  const locationError = wrapperLocation.getElementsByTagName("span")[0];
  const tab = [wrapperLocation, location, locationError];
}
function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  const tab = [dd, mm, yyyy, today];
  return tab;
}
// set
function slider() {
  const [wrapperDistance, distance, spanText] = getDistance();
  distance.addEventListener("input", () => {
    spanText.innerHTML = ` ${distance.value} Km`;
  });
}
function setMinAndMaxDate() {
  const [dd, mm, yyyy, today] = getCurrentDate();
  const [wrapperStartRent, startRent, startRentError] = getStartRent();
  const [wrapperEndRent, endRent, EndRentError] = getEndRent();
  const [wrapperDriving, drivingId, driveIdError] = getDrivingId();
  startRent.setAttribute("min", today);
  endRent.setAttribute("min", today);
  drivingId.setAttribute("max", yyyy);
}
slider();
setMinAndMaxDate();
// Check
function checkDrivingId() {
  const [wrapperDriving, drivingId, driveIdError] = getDrivingId();
  const [dd, mm, yyyy, today] = getCurrentDate();
  if (drivingId.value < 1960 || drivingId.value > yyyy) {
    driveIdError.innerHTML = `choose form 1960 to ${yyyy}`;
    return false;
  } else {
    driveIdError.innerHTML = "";
    return true;
  }
}
function checkFirstDate() {
  const [wrapperStartRent, startRent, startRentError] = getStartRent();
  if (startRent.value === "") {
    startRentError.innerHTML = "choose date!";
    return false;
  } else {
    startRentError.innerHTML = "";
    return true;
  }
}
function checkSecoundDate() {
  const [wrapperEndRent, endRent, endRentError] = getEndRent();
  if (endRent.value === "") {
    endRentError.innerHTML = "choose date!";
    return false;
  } else {
    endRentError.innerHTML = "";
    return true;
  }
}
function checkSameDate() {
  const [wrapperStartRent, startRent, startRentError] = getStartRent();
  const [wrapperEndRent, endRent, endRentError] = getEndRent();
  if (
    startRent.value === endRent.value &&
    startRent.value != "" &&
    endRent.value != ""
  ) {
    endRentError.innerHTML = "min 24 hour!";
    return false;
  } else {
    return true;
  }
}
function checkDataTrickster() {
  const [wrapperStartRent, startRent, startRentError] = getStartRent();
  const [wrapperEndRent, endRent, endRentError] = getEndRent();
  if (
    startRent.value > endRent.value &&
    startRent.value != "" &&
    endRent.value != ""
  ) {
    endRentError.innerHTML = "you are a trickster";
    return false;
  } else {
    return true;
  }
}
function checkDrivingExperience() {
  const [wrapperDriving, drivingId, driveIdError] = getDrivingId();
  const [wrapperCarList, model, modelError] = getModel();
  if (drivingId.value > 2019 && model.value === "premium") {
    modelError.innerHTML = "you have too little driving experience";
    return false;
  } else {
    modelError.innerHTML = "";
    return true;
  }
}
document.getElementById("rent").addEventListener("click", (e) => {
  e.preventDefault();
  if (
    checkDrivingId() === true &&
    checkFirstDate() === true &&
    checkSecoundDate() === true &&
    checkSameDate() === true &&
    checkDataTrickster() === true &&
    checkDrivingExperience() === true
  ) {
    function getModelTaxAndCombustion() {
      tab = [wrapperCarList, model, modelError] = getModel();
      if (model.value === "basic") {
        const tab = [1, 6];
        return tab;
      }
      if (model.value === "standard") {
        const tab = [1.3, 7.3];
        return tab;
      }
      if (model.value === "medium") {
        const tab = [1.6, 9.6];
        return tab;
      }
      if (model.value === "premium") {
        const tab = [2, 12];
        return tab;
      }
    }
    function calcCombustionFuel() {
      const [wrapperDistance, distance, spanText] = getDistance();
      const [modelTax, combustion] = getModelTaxAndCombustion();
      return (distance.value * combustion) / 100;
    }
    function calcDiffDays() {
      const [wrapperStartRent, startRent, startRentError] = getStartRent();
      const [wrapperEndRent, endRent, endRentError] = getEndRent();
      let startDate = new Date(startRent.value);
      let endDate = new Date(endRent.value);
      let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      diffDays = Math.abs((startDate.getTime() - endDate.getTime()) / oneDay);
      return diffDays;
    }
    function resultNetto() {
      const [modelTax, combustion] = getModelTaxAndCombustion();
      const [wrapperDriving, drivingId, driveIdError] = getDrivingId();
      let result =
        rentalPrice * modelTax * calcDiffDays() + calcCombustionFuel();
      if (drivingId.value > 2017) {
        result = result + result * 0.2;
        return result.toFixed(2);
      } else {
        return result.toFixed(2);
      }
    }
    function resultBrutto(resultNetto) {
      const brutto = Number(resultNetto) * vatTax;
      result = Number(resultNetto) + brutto;
      return result.toFixed(2);
    }
    const [wrapperDistance, distance, spanText] = getDistance();
    const [modelTax, combustion] = getModelTaxAndCombustion();

    document.getElementById("raport").innerHTML = `
    <h1>Raport rent<h1>
    <p>Distance to go: ${distance.value} Km</p>
    <p>Days of rent: ${calcDiffDays()} Days</p>
    <p>Rental price: ${rentalPrice} Zł</p>
    <p>Model tax: ${modelTax} Zł</p>
    <p>Fuel consumption: ${combustion} L/100km</p>
    <p>Netto cost: ${resultNetto()} zł</p>
    <p>Brutto cost: ${resultBrutto(resultNetto())} Zł</p>
    `;
  } else {
    document.getElementById("raport").innerHTML = "";
  }
});
