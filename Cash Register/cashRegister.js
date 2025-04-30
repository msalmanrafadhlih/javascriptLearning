let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash").value);
  const changeDueDiv = document.getElementById("change-due");
  const changeRequired = +(cash - price).toFixed(2);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueDiv.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const register = cid.reverse().map(([unit, amount]) => [unit, amount]);

  let change = [];
  let remaining = changeRequired;

  for (let [unit, amount] of register) {
    let unitValue = currencyUnits[unit];
    let amountAvailable = amount;
    let amountToGive = 0;

    while (remaining >= unitValue && amountAvailable >= unitValue) {
      remaining = +(remaining - unitValue).toFixed(2);
      amountAvailable = +(amountAvailable - unitValue).toFixed(2);
      amountToGive = +(amountToGive + unitValue).toFixed(2);
    }

    if (amountToGive > 0) {
      change.push([unit, amountToGive]);
    }
  }

  const totalChangeGiven = +change.reduce((sum, [_, amt]) => sum + amt, 0).toFixed(2);
  const totalInDrawer = +cid.reduce((sum, [_, amt]) => sum + amt, 0).toFixed(2);

  if (totalChangeGiven < changeRequired || remaining > 0) {
    changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (totalChangeGiven === totalInDrawer) {
    let closedChange = cid.reverse().filter(([unit, amt]) => amt > 0);
    const message = "Status: CLOSED " + closedChange.map(([u, a]) => `${u}: $${a.toFixed(2)}`).join(" ");
    changeDueDiv.textContent = message;
  } else {
    const message = "Status: OPEN " + change.map(([u, a]) => `${u}: $${a.toFixed(2)}`).join(" ");
    changeDueDiv.textContent = message;
  }
});
