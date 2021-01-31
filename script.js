const rates = [{ base: "GBP", currency: "£" }, { base: "IDR", currency: "Rp" }, { base: "ILS", currency: "₪" }, { base: "DKK", currency: "kr" }, { base: "CHF", currency: "CHF" }, { base: "CZK", currency: "Kč" }, { base: "THB", currency: "฿" }, { base: "HRK", currency: "kn" }, { base: "EUR", currency: "€" }, { base: "MYR", currency: "RM" }, { base: "CNY", currency: "¥" }, { base: "BGN", currency: "лв" }, { base: "PHP", currency: "₱" }, { base: "PLN", currency: "zł" }, { base: "BRL", currency: "\R$" }, { base: "RON", currency: "lei" }, { base: "JPY", currency: "¥" }, { base: "RUB", currency: "₽" }, { base: "KRW", currency: "₩" }, { base: "USD", currency: "$" }, { base: "HUF", currency: "Ft" }, { base: "ZAR", currency: "R" }] 

let canCall = true;

const baseURL = (base, symbol = "BRL") => {
  return `https://api.ratesapi.io/api/latest?base=${base}&symbols=${symbol}`;
}

function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

const interval = setInterval(()=>{
  canCall = true
}, 1000)

document.onmouseup = document.onkeyup = document.onselectionchange = () => {
  let val = getSelectionText();
  if (val == '') return

  rates.forEach(rate => {
    const currency = rate.currency.replace("$", "\\$")
    const regex = new RegExp(`^${currency}\\s?(\\d+)[.,](\\d+)?,?(\\d{2})$`)
    if (regex.test(val)) {
      console.log(rate, regex);
      const number = Number(val.replace(/\D/g, "")) / 100;
      canCall && fetchData({ base: rate.base, value: number });
    }
  })
};

async function fetchData({base, value}) {
  canCall = false;
  let data;
  await fetch(baseURL(base))
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      data = res.rates["BRL"].toFixed(2);
    })
  alert(`Convertendo.....\n
        essa moeda esta em ${data}\n
        ${value}*${data}=R$${value*data}`)
  console.log(data * value);
}

/*
chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
*/