export async function convertUsd(amount, currency) {
  const url = window.env?.CURRENCY_API || import.meta.env.VITE_CURRENCY_API;
  const res = await fetch(url);
  const data = await res.json();
  const rate = data.rates[currency];
  return rate ? amount * rate : amount;
}
