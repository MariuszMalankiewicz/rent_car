const howKm = document.getElementById('howKm');
const fuel = 6.60;
const rentalPrice = 5;
const vatTax = 0.23;



// Get
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
function getModel(){
    const model = document.getElementById("carList");
    return model.value;
}
function getDriveId(){
    const drivingLicence = document.getElementById("drivingId");
    return drivingLicence;
}
function getStartRent() {
    const startRent = document.getElementById("startRent");
    return startRent;
}
function getEndRent() {
    const endRent = document.getElementById("endRent");
    return endRent;
}
// set
function setMinAttDate(getStartRent, getEndRent, currentDate) {
    getStartRent.setAttribute("min", currentDate);
    getEndRent.setAttribute("min", currentDate);
}
function setMaxAttDate(currentYear, getDriveId) {
    getDriveId.setAttribute("max", currentYear);
}
sliderValue();
setMaxAttDate(currentYear(), getDriveId());
setMinAttDate(getStartRent(), getEndRent(), currentDate());



// check
function checkDriving(currentYear, getDriveId)
{
    if(getDriveId.value < 1960 || getDriveId.value > currentYear){
        document.getElementById("limit").innerHTML = `choose form 1960 to ${currentYear}`;
        return flag = false;
    }
    else{
        document.getElementById("limit").innerHTML = "";
        return flag = true; 
    }
}
function checkFirstDate(getStartRent){   
    if(getStartRent.value === ''){
        document.getElementById("infoStartRent").innerHTML = "choose date!";
        return flag = false;
    }else{
        document.getElementById("infoStartRent").innerHTML = "";
        return flag = true;
    }    
}
function checkSecoundDate(getEndRent) {
    if(getEndRent.value === ''){
        document.getElementById("infoEndRent").innerHTML = "choose date!";
        return flag = false;
    }else{
        document.getElementById("infoEndRent").innerHTML = "";
        return flag = true;
    }
}

function drivingExperience(getModel, getDriveId)
{
    if(getDriveId.value > 2019 && getModel === "premium"){
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

    
    
    drivingExperience(getModel(), getDriveId());
    sameDate();
    dateTrickster();
    if(checkDriving(currentYear(), getDriveId()) === true && checkFirstDate(getStartRent()) === true && checkSecoundDate(getEndRent()) === true){

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
        function calcCombustionFuel() {
            const [modelTax, combustion] = getModelTaxAndCombustion(getModel());
            return (howKm.value * combustion)/100
        }
        function calcDiffDays(){
            let startDate = new Date(startRent.value)
            let endDate = new Date(endRent.value)
            let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            diffDays = Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay));
            return diffDays;
        }
        function resultNetto() {
            const [modelTax, combustion] = getModelTaxAndCombustion(getModel());
            const result = ((rentalPrice * modelTax * calcDiffDays()) + calcCombustionFuel());
            return result.toFixed(2);
        }
        function resultBrutto(resultNetto){
            const brutto = Number(resultNetto) * vatTax;
            result = Number(resultNetto) + brutto;
            return result.toFixed(2);
        }
        console.log(resultNetto());
        console.log(resultBrutto(resultNetto()));

        document.getElementById("raport").innerHTML=
        `ok
        `
    }else{
        document.getElementById("raport").innerHTML = '';
        return;
    }

    
})


        // driveId < 5 20% more
        // function get20PercentTax(getDriveId) {
        //     if(getDriveId.value > 2017){
        //         result += result * 0.2;}
        // }