const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Fill dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "PKR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Flag update
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  if (!countryCode) return;

  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Convert currency
btn.addEventListener("click", async (e) => {
  e.preventDefault();

  let amountInput = document.querySelector(".amount input");
  let amtVal = Number(amountInput.value);

  // validation
  if (isNaN(amtVal) || amtVal <= 0) {
    Swal.fire({
      title: "Invalid Amount",
      text: "Enter a value greater than 0",
      icon: "error",
    });
    return;
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    btn.innerText = "Converting...";

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.rates[toCurr.value];

    if (!rate) {
      Swal.fire({
        title: "Error",
        text: "Currency not supported",
        icon: "error",
      });
      return;
    }

    let result = amtVal * rate;

    // 🔥 FIXED: 1 currency rate always correct
    msg.innerHTML = `
      1 ${fromCurr.value} = ${rate.toFixed(4)} ${toCurr.value} <br>
      ${amtVal} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}
    `;

    Swal.fire({
      title: "Converted",
      text: `${result.toFixed(2)} ${toCurr.value}`,
      icon: "success",
    });

  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "API failed",
      icon: "error",
    });

  } finally {
    btn.innerText = "Get Exchange Rate";
  }
});