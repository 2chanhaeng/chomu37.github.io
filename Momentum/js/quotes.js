const quotes = [
    {
    quote: "Life has no limitations, except the ones you make.",
    author: "Les Brown",
    },
    {
    quote: "Life is a lively process of becoming.",
    author: "Gen. Douglas MacArthur",
    },
    {
    quote:
    "Life is what happens while you are busy making other plans.",
    author: "John Lennon",
    },
    {
    quote: "All great changes are preceded by chaos.",
    author: "Deepak Chopra",
    },
    {
    quote: "Change alone is eternal, perpetual, immortal",
    author: "Arthur Shopenhauer",
    },
    {
    quote: "By changing nothing, nothing changes.",
    author: "Tony Robbins",
    },
    {
    quote: "Change is inevitable. Growth is optional.",
    author: "John C. Maxwell",
    },
    {
    quote: "Change your thinking, change your life.",
    author: "Ernest Holmes",
    },
    {
    quote: "Failure is not fatal, but failure to change might be.",
    author: "John Wooden",
    },
    {
    quote: "Nothing is forever except change.",
    author: "Buddha",
    },
];
const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

// get random item from array
const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];
// Math.random : get number from 0 to 1
// Math.floor, Math.round, Math.ceil : 내림, 반올림, 올림
quote.innerText = todayQuote.quote
author.innerText = todayQuote.author