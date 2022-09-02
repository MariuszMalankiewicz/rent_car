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
const howKm = document.getElementById('howKm');
const fuel = 6.60;
const rentalPrice = 5;

const drivingLicence = document.getElementById("drivingId");
const startRent = document.getElementById("startRent");
const endRent = document.getElementById("endRent");
const model = document.getElementById("carList");
const localization = document.getElementById("location");
let flag;
// slider value
function sliderValue() {
    howKm.addEventListener("input", ()=>{
        document.getElementById('kmSpan').innerHTML = ` ${howKm.value} km`;
    })
}
// Set min att to date
function minTodayDate(){
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
}
// check info
function checkDriving()
{
    if(drivingLicence.value < 1960 || drivingLicence.value > 2022){
        document.getElementById("limit").innerHTML = "choose form 1960 to 2022";
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
function SameDate()
{
    if(startRent.value === endRent.value && startRent.value != '' && endRent.value != ''){
        document.getElementById("infoEndRent").innerHTML = "min 24 hour";
        flag = false;
    }
}
function DateTrickster() {
    if(startRent.value > endRent.value && startRent.value != '' && endRent.value != ''){
        document.getElementById("infoEndRent").innerHTML = "you are a trickster";
        flag = false;
    }
}
sliderValue();
minTodayDate();
// check send
document.getElementById('rent').addEventListener('click', (e)=>{
    e.preventDefault();
    checkDriving();
    checkFirstDate();
    checkSecoundDate();
    drivingExperience();
    SameDate();
    DateTrickster();

    console.log(flag);
    if(flag === true){
        let rezult;
        let diffDays;

        function CalcModelTax() {
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
        }
        // diff Date
        function calcDiffDays(){
            let date1 = new Date(startRent.value)
            let date2 = new Date(endRent.value)
            let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            diffDays = Math.abs((date1.getTime() - date2.getTime()) / (oneDay));
        }
        // driveId < 5 20% more
        function CheckExpDriveId() {
            if(drivingLicence.value > 2017){
                rezult += rezult * 0.2;
                less5dID = 'yes'
            }else{
                less5dID = 'no'
            }     
        }
        // check count car if < 3 then 15% pay more
        function calcCountCar() {
            if(model.value === "premium" && localization.value === "rzeszow"){
                rezult += rezult * 0.15;
                lessCar = "yes"
            }else[
                lessCar = "no"
            ]
        }
        // math
        function calcRezult() {
            rezult = rentalPrice * modelTax * diffDays;
        }




        CalcModelTax();
        calcDiffDays();
        calcRezult()
        CheckExpDriveId();
        calcCountCar();



        
        document.getElementById("raport").innerHTML=
        `
        How day: ${diffDays} </br></br>

        How Km: ${howKm.value} </br>
        Fuel price: ${fuel} zł </br></br>

        Model tax: ${modelTax} zł </br>
        Rental tax per day: ${rentalPrice} zł </br></br>
        

        Less than 5 years old driving license (20% more): ${less5dID} </br>
        Less than 3 cars (15% more): ${lessCar} </br></br>

        City: ${localization.value} </br></br>

        Rezult netto: ${rezult}zł </br>
        Rezult brutto: ${rezult += rezult * 0.23} zł </br>
        `
    }else{
        document.getElementById("raport").innerHTML = '';
        return;
    }


})

    





        
