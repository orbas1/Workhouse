async function convertCurrency(amount, target = 'USD') {
  const baseUrl = window.env && window.env.CURRENCY_API;
  if (!baseUrl) return amount;
  const res = await fetch(`${baseUrl}?base=USD&symbols=${target}`);
  if (!res.ok) return amount;
  const data = await res.json();
  const rate = data.rates && data.rates[target];
  return rate ? amount * rate : amount;
}

window.currencyUtils = { convertCurrency };
