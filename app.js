const city = {
    rzeszow:{
        basic:{
            count: 15,
        },
        standard:{
            count: 10,
        },
        medium:{
            count: 5,
        },
        premium:{
            count: 1,
        }
    },
    krakow:{
        basic:{
            count: 30,
        },
        standard:{
            count: 15,
        },
        medium:{
            count: 10,
        },
        premium:{
            count: 3,
        }
    }
}
const howKm = document.getElementById('howKm');
const fuel = 6.60;
const rentalPrice = 5;
const vatTax = 0.23;

const drivingLicence = document.getElementById("drivingId");
const startRent = document.getElementById("startRent");
const endRent = document.getElementById("endRent");
const model = document.getElementById("carList");
const localization = document.getElementById("location");
let flag = false;

function sliderValue() {
    howKm.addEventListener("input", ()=>{
        document.getElementById('kmSpan').innerHTML = ` ${howKm.value} km`;
    })
}
function currentDate(){
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
    return today = yyyy + '-' + mm + '-' + dd;
}
function currentYear() {
    let today = new Date();
    let yyyy = today.getFullYear();
    return yyyy;
}
function setMinAttDate(callback) {
    startRent.setAttribute("min", callback);
    endRent.setAttribute("min", callback);
}
function setMaxAttDate(callback) {
    drivingLicence.setAttribute("max", callback);
}
sliderValue();
setMaxAttDate(currentYear());
setMinAttDate(currentDate());
// check
function checkDriving(callback)
{
    if(drivingLicence.value < 1960 || drivingLicence.value > callback){
        document.getElementById("limit").innerHTML = `choose form 1960 to ${callback}`;
        flag = false;
    }
    else{
        document.getElementById("limit").innerHTML = "";
        flag = true; 
    }
}
function checkFirstDate()  
{
    // first date
    if(startRent.value === ''){
        document.getElementById("infoStartRent").innerHTML = "choose date!";
        flag = false;
    }else{
        document.getElementById("infoStartRent").innerHTML = "";
        flag = true;
    }    
}
function checkSecoundDate() {
    if(endRent.value === ''){
        document.getElementById("infoEndRent").innerHTML = "choose date!";
        flag = false;
    }else{
        document.getElementById("infoEndRent").innerHTML = "";
        flag = true;
    }
}
function drivingExperience()
{
    if(drivingLicence.value > 2019 && model.value === "premium"){
        document.getElementById("carListError").innerHTML = "you have too little driving experience";
        flag = false;
    }else{
        document.getElementById("carListError").innerHTML = "";
    }
}
function sameDate()
{
    if(startRent.value === endRent.value && startRent.value != '' && endRent.value != ''){
        document.getElementById("infoEndRent").innerHTML = "min 24 hour";
        flag = false;
    }
}
function dateTrickster() {
    if(startRent.value > endRent.value && startRent.value != '' && endRent.value != ''){
        document.getElementById("infoEndRent").innerHTML = "you are a trickster";
        flag = false;
    }
}

document.getElementById('rent').addEventListener('click', (e)=>{
    e.preventDefault();

    checkDriving(currentYear());
    checkFirstDate();
    checkSecoundDate();
    drivingExperience();
    sameDate();
    dateTrickster();
    console.log(flag);
    if(flag){
        let result;   

        function getModel(){
            return model.value;
        }
        function getModelTaxAndCombustion(calback) {
            if(calback === "basic"){
                const tab = [1, 6];
                return tab;
            }
            if(calback === "standard"){
                const tab = [1.3, 7.3];
                return tab;
            }
            if(calback === "medium"){
                const tab = [1.6, 9.6];
                return tab;
            }
            if(calback === "premium"){
                const tab = [2, 12];
                return tab;
            }
        }
        // zwraca ile pali na 100km
        function calcCombustionFuel() {
            const [modelTax, combustion] = getModelTaxAndCombustion(getModel());
            return (howKm.value * combustion)/100
        }
        // zwraca na ile dni wypozyczenie
        function calcDiffDays(){
            let startDate = new Date(startRent.value)
            let endDate = new Date(endRent.value)
            let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            diffDays = Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay));
            return diffDays;
        }

        // driveId < 5 20% more
        function get20PercentTax() {
            if(drivingLicence.value > 2017){
                result += result * 0.2;}
        }
        // check count car if < 3 then 15% pay more
        function calcCountCar() {
            if(model.value === "premium" && localization.value === "rzeszow"){
                result += result * 0.15;
            }
        }


        // function resultNetto() {
        //     result = (rentalPrice * getModelTax() * calcDiffDays()) + calcCombustionFuel();
        //     return result.toFixed(2);
        // }
        // function resultBrutto() {
        //     result += result * vatTax;
        //     return result.toFixed(2);
        // }

        // TEST!!!

        function resultNetto() {
            const [modelTax, combustion] = getModelTaxAndCombustion(getModel());
            return  ((rentalPrice * modelTax * calcDiffDays()) + calcCombustionFuel()).toFixed(2);
        }
        function ResultBrutto(callback){
            (callback * vatTax).toFixed(2) + callback
        }

        console.log(resultNetto());
        console.log(ResultBrutto(resultNetto()));





        // //////////////////////////////////////////////

        
        // Fuel consumption model: ${getCombustion()} l </br></br>
        // Model tax: ${getModelTax()} zł </br>

        // Result netto: ${resultNetto()} zł </br>
        // Result brutto: ${resultBrutto()} zł </br>
        get20PercentTax();
        
        calcCountCar();

        document.getElementById("raport").innerHTML=
        `
        Rent car for: ${calcDiffDays()} days </br></br>

        Distance to go: ${howKm.value} km </br>
        Fuel price: ${fuel} zł </br>
        
        
        
        Car rental tax: ${rentalPrice} zł </br></br>

        City: ${localization.value} </br></br>


        `
    }else{
        document.getElementById("raport").innerHTML = '';
        return;
    }

    
})

    





        
