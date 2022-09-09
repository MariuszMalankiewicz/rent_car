const fuel = 6.60;
const rentalPrice = 5;
const vatTax = 0.23;
// Get
function getKm() {
    const wrapperDistance = document.getElementById('wrapperDistance');
    const distance = wrapperDistance.getElementsByTagName('input');
    return distance;
}
function sliderValue(getKm) {
    getKm.addEventListener("input", ()=>{
        // document.getElementById('kmSpan').innerHTML = ` ${howKm.value} km`;
        console.log(getKm);
    })    
}
sliderValue(getKm());


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
    today = yyyy + '-' + mm + '-' + dd;
    const tab = [dd, mm, yyyy, today]
    return tab;
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
function setMinAndMaxAttDate(getStartRent, getEndRent, getDriveId) {
    const [dd, mm, yyyy, today] = currentDate()
    getStartRent.setAttribute("min", today);
    getEndRent.setAttribute("min", today);
    getDriveId.setAttribute("max", yyyy);
}

setMinAndMaxAttDate(getStartRent(), getEndRent(), getDriveId());
// check
function checkDriving(getDriveId)
{
    const [dd, mm, yyyy, today] = currentDate();
    if(getDriveId.value < 1960 || getDriveId.value > yyyy){
        document.getElementById("limit").innerHTML = `choose form 1960 to ${yyyy}`;
        return false;
    }
    else{
        document.getElementById("limit").innerHTML = "";
        return true; 
    }
}
function checkFirstDate(getStartRent){   
    if(getStartRent.value === ''){
        document.getElementById("infoStartRent").innerHTML = "choose date!";
        return false;
    }else{
        document.getElementById("infoStartRent").innerHTML = "";
        return true;
    }    
}
function checkSecoundDate(getEndRent) {
    if(getEndRent.value === ''){
        document.getElementById("infoEndRent").innerHTML = "choose date!";
        return false;
    }else{
        document.getElementById("infoEndRent").innerHTML = "";
        return true;
    }
}
function drivingExperience(getModel, getDriveId)
{
    if(getDriveId.value > 2019 && getModel === "premium"){
        document.getElementById("carListError").innerHTML = "you have too little driving experience";
        return false;
    }else{
        document.getElementById("carListError").innerHTML = "";
        return true;
    }
}
function sameDate()
{
    if(startRent.value === endRent.value && startRent.value != '' && endRent.value != ''){
        document.getElementById("infoEndRent").innerHTML = "min 24 hour";
        return false;
    }else{
        document.getElementById("infoEndRent").innerHTML = "";
        return true;
    }
}
function dateTrickster() {
    if(startRent.value > endRent.value && startRent.value != '' && endRent.value != ''){
        document.getElementById("infoEndRent").innerHTML = "you are a trickster";
        return false;
    }else{
        document.getElementById("infoEndRent").innerHTML = "";
        return true;
    }
}
document.getElementById('rent').addEventListener('click', (e)=>{
    e.preventDefault();
    if(checkDriving(getDriveId()) === true && checkFirstDate(getStartRent()) === true && checkSecoundDate(getEndRent()) === true && drivingExperience(getModel(), getDriveId()) === true && sameDate() === true && dateTrickster() === true){

        function getModelTaxAndCombustion(getModel) {
            if(getModel === "basic"){
                const tab = [1, 6];
                return tab;
            }
            if(getModel === "standard"){
                const tab = [1.3, 7.3];
                return tab;
            }
            if(getModel === "medium"){
                const tab = [1.6, 9.6];
                return tab;
            }
            if(getModel === "premium"){
                const tab = [2, 12];
                return tab;
            }
        }
        function calcCombustionFuel(getKm) {
            const [modelTax, combustion] = getModelTaxAndCombustion(getModel());
            return (getKm.value * combustion)/100
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
            const result = ((rentalPrice * modelTax * calcDiffDays()) + calcCombustionFuel(getKm()));
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
    }
})
        // driveId < 5 20% more
        // function get20PercentTax(getDriveId) {
        //     if(getDriveId.value > 2017){
        //         result += result * 0.2;}
        // }