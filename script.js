const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");



for(let select of dropdowns) {
    for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD") {
        newOption.selected = true;
    }else if(select.name === "to" && currCode === "PKR") {
        newOption.selected = true;
    }
    select.append(newOption);
 }

 select.addEventListener("change",(e) => {
    updateFlag(e.target);
 })
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc; 
    

}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVle = amount.value;
     
});