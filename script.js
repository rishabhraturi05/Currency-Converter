const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".select_country select");
const btn = document.querySelector(".convert_btn");
const msg = document.querySelector(".msg");

let from = document.querySelector(".from select");
let to = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name == "from_currency" && currCode == "USD") {
            newOption.selected = "USD";
        }
        else if (select.name == "to_currency" && currCode == "INR") {
            newOption.selected = "INR";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e) => {
        changeFlag(e.target);
    });
}

const changeFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg = element.parentElement.querySelector("img");
    newImg.src = newSrc;
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    calculateExchangeRate(e);
});

calculateExchangeRate = async(e) => {
    let amtVal = document.querySelector(".amount input").value;
    if (amtVal == "" || amtVal <= 0) {
        amtVal = 1;
    }
    let response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`);

    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    
    let finalAmt = (amtVal * rate);
    msg.innerText = `Exchange Rate: amtVal ${from.value} = ${finalAmt.toFixed(5)} ${to.value}`;
};

window.addEventListener("load", () => {
  calculateExchangeRate();
});


