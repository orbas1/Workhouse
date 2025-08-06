const quotes = [
  { content: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
  { content: 'Life is what happens when you\u2019re busy making other plans.', author: 'John Lennon' },
  { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' }
];

async function fetchRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

module.exports = { fetchRandomQuote };
