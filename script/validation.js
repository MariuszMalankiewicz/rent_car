function validation() {
  function getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    today = `${yyyy}-${mm}-${dd}`;
    const currentDate = [today, yyyy, mm, dd];
    return currentDate;
  }

  (function () {
    const form = document.getElementById("form");
    const rentDate = form.querySelector("input[name=rentDate]");
    const returnDate = form.querySelector("input[name=returnDate]");
    const drivingLicence = form.querySelector("input[name=drivingLicence]");
    const [today, , ,] = getCurrentDate();
    rentDate.setAttribute("min", today);
    rentDate.setAttribute("value", today);
    returnDate.setAttribute("min", today);
    const [, yyyy, ,] = getCurrentDate();
    drivingLicence.setAttribute("value", yyyy);
    drivingLicence.setAttribute("max", yyyy);
    drivingLicence.setAttribute("min", yyyy - 60);
  })();
  function checkDrivingId() {
    const form = document.getElementById("form");
    const drivingLicence = form.querySelector("input[name=drivingLicence]");
    const spanError = form.querySelectorAll("span");
    const [, yyyy, ,] = getCurrentDate();
    if (drivingLicence.value < 1960 || drivingLicence.value > yyyy) {
      spanError[1].innerHTML = `choose form ${yyyy - 60} to ${yyyy}`;
      return false;
    } else {
      spanError[1].innerHTML = "";
      return true;
    }
  }
  function checkPickupLocation() {
    const form = document.getElementById("form");
    const pickupLocation = form.querySelector("select[name=pickuplocation]");
    const spanError = form.querySelectorAll("span");
    if (pickupLocation.value === "") {
      spanError[2].innerHTML = "choose pickup location";
      return false;
    } else {
      spanError[2].innerHTML = "";
      return true;
    }
  }
  function checkRentDate() {
    const form = document.getElementById("form");
    const rentDate = form.querySelector("input[name=rentDate]");
    const spanError = form.querySelectorAll("span");

    if (rentDate.value === "") {
      spanError[3].innerHTML = "choose rent date";
      return false;
    } else {
      spanError[3].innerHTML = "";
      return true;
    }
  }
  function checkReturnLocation() {
    const form = document.getElementById("form");
    const returnLocation = form.querySelector("select[name=Returnlocation]");
    const spanError = form.querySelectorAll("span");
    if (returnLocation.value === "") {
      spanError[4].innerHTML = "choose return location";
      return false;
    } else {
      spanError[4].innerHTML = "";
      return true;
    }
  }
  function checkReturnDate() {
    const form = document.getElementById("form");
    const returnDate = form.querySelector("input[name=returnDate]");
    const spanError = form.querySelectorAll("span");

    if (returnDate.value === "") {
      spanError[5].innerHTML = "choose return date";
      return false;
    } else {
      spanError[5].innerHTML = "";
      return true;
    }
  }
  function checkSameDate() {
    const form = document.getElementById("form");
    const rentDate = form.querySelector("input[name=rentDate]");
    const returnDate = form.querySelector("input[name=returnDate]");
    const spanError = form.querySelectorAll("span");
    if (
      rentDate.value === returnDate.value &&
      rentDate.value != "" &&
      returnDate.value != ""
    ) {
      spanError[5].innerHTML = "min 24 hour!";
      return false;
    } else {
      return true;
    }
  }
  function checkDataTrickster() {
    const form = document.getElementById("form");
    const rentDate = form.querySelector("input[name=rentDate]");
    const returnDate = form.querySelector("input[name=returnDate]");
    const spanError = form.querySelectorAll("span");
    if (
      rentDate.value > returnDate.value &&
      rentDate.value != "" &&
      returnDate.value != ""
    ) {
      spanError[5].innerHTML = "something went wrong check dates";
      return false;
    } else {
      return true;
    }
  }
  function checkFindCar() {
    const form = document.getElementById("form");
    const carList = form.querySelector("select[name=carList]");
    const spanError = form.querySelectorAll("span");
    if (carList.value === "") {
      spanError[6].innerHTML = "select yours car";
      return false;
    } else {
      spanError[6].innerHTML = "";
      return true;
    }
  }
  function checkDrivingExperience() {
    const form = document.getElementById("form");
    const drivingLicence = form.querySelector("input[name=drivingLicence]");
    const carList = form.querySelector("select[name=carList]");
    const spanError = form.querySelectorAll("span");
    const [, yyyy, ,] = getCurrentDate();
    if (drivingLicence.value > yyyy - 3 && carList.value == 3) {
      spanError[6].innerHTML = "you have too little driving experience";
      return false;
    } else {
      spanError[6].innerHTML = "";
      return true;
    }
  }
  if (
    checkDrivingId() === true &&
    checkPickupLocation() === true &&
    checkRentDate() === true &&
    checkReturnLocation() === true &&
    checkReturnDate() === true &&
    checkSameDate() === true &&
    checkDataTrickster() === true &&
    checkFindCar() === true &&
    checkDrivingExperience() === true
  ) {
    return true;
  } else return false;
}
export { validation };
