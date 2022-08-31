const city = {
    rzeszow:{
        basic:{
            fuelUse: 6,
            count: 15,
        },
        standard:{
            fuelUse: 7.3,
            count: 10,
        },
        medium:{
            fuelUse: 9.6,
            count: 5,
        },
        premium:{
            fuelUse: 12,
            count: 1,
        }
    },
    krakow:{
        basic:{
            fuelUse: 6,
            count: 30,
        },
        standard:{
            fuelUse: 7.3,
            count: 15,
        },
        medium:{
            fuelUse: 9.6,
            count: 10,
        },
        premium:{
            fuelUse: 12,
            count: 3,
        }
    }
}


// range slider
const howKm = document.getElementById('howKm');
const kmSpan = document.getElementById('kmSpan');

const fuel = 6.60;
const rentalPrice = 5;

const drivingLicence = document.getElementById("drivingId");
const startRent = document.getElementById("startRent");
const endRent = document.getElementById("endRent");
const model = document.getElementById("carList");
const localization = document.getElementById("location");

let rezult = '';
// error
const limit = document.getElementById("limit");
const carListError = document.getElementById("carListError");


// slider value
howKm.addEventListener("input", ()=>{
    kmSpan.innerHTML = ` ${howKm.value} km`;
})

// time
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
   dd = '0' + dd;
}
if (mm < 10) {
   mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;

startRent.setAttribute("min", today);
endRent.setAttribute("min", today);


// check send
document.getElementById('rent').addEventListener('click', (e)=>{
    e.preventDefault();
    // driveID check
    if(drivingLicence.value < 1960 || drivingLicence.value > 2022){
        drivingLicence.style.borderColor = "red"
        limit.innerHTML = "choose form 1960 to 2022";
        return
    }
    else{
        drivingLicence.style.borderColor = "green"
        limit.innerHTML = "";
        // first date
        if(startRent.value === ''){
            startRent.style.borderColor = "red";
            document.getElementById("infoStartRent").innerHTML = "choose date!";
        }else{
            startRent.style.borderColor = "green";
            document.getElementById("infoStartRent").innerHTML = "";
            // secound date
            if(endRent.value === ''){
                endRent.style.borderColor = "red";
                document.getElementById("infoEndRent").innerHTML = "choose date!";
            }else{
                endRent.style.borderColor = "green";
                document.getElementById("infoEndRent").innerHTML = "";
                // date === date
                if(startRent.value === endRent.value){
                    document.getElementById("infoEndRent").innerHTML = "min 24 hour";
                }else{
                    document.getElementById("infoEndRent").innerHTML = "";
                        if(model.value === ''){
                            model.style.borderColor = "red"
                            carListError.innerHTML = "choose model";
                        }else{
                            model.style.borderColor = "green"
                            carListError.innerHTML = "";
                            if(localization.value === ""){
                                localization.style.borderColor = "red"
                                document.getElementById("locationInfo").innerHTML = "choose location";
                            }else{
                                localization.style.borderColor = "green"
                                document.getElementById("locationInfo").innerHTML = "";
                                if(drivingLicence.value < 2020 && model.value === "premium"){
                                    model.style.borderColor = "red"
                                    carListError.innerHTML = "you have too little driving experience";
                                }else{
                                    model.style.borderColor = "green"
                                    carListError.innerHTML = "";
                                if(model.value === "basic"){
                                    modelTax = 1;
                                }
                                else if(model.value === "standard"){
                                    modelTax = 1.3
                                }
                                else if(model.value === "medium"){
                                    modelTax = 1.6
                                }
                                else if(model.value === "premium"){
                                    modelTax = 2
                                }
                                // check date
                                let date1 = new Date(startRent.value)
                                let date2 = new Date(endRent.value)
                                let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                                let diffDays = Math.abs((date1.getTime() - date2.getTime()) / (oneDay));

                                // math
                                rezult = rentalPrice * modelTax * diffDays;

                                 // driveId < 5 20% more
                                if(drivingLicence.value < 2018){
                                    rezult += rezult * 0.2;
                                    less5dID = 'yes'
                                }else{
                                    less5dID = 'no'
                                }
                                document.getElementById("raport").innerHTML=`
                                Rental tax: ${rentalPrice} zł </br>
                                How day: ${diffDays} day </br>
                                Model tax: ${modelTax} zł </br>
                                Fuel: ${fuel} zł </br>
                                How Km: ${howKm.value} zł </br>
                                less than 5 years old driving license: ${less5dID} <br>
                                City: ${localization.value} </br>
                                Rezult netto: ${rezult}zł </br>
                                Rezult brutto: ${rezult += rezult * 0.23} zł </br>
                                `
                            }
                        }
                    }
                }
            }
        }
    }
})

    





        
