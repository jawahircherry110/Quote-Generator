const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const newQuoteBtn = document.getElementById('new-quote')
const twitterBtn = document.getElementById('twitter')
const loader = document.getElementById('loader')

//loader
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}


let apiQuotes = []

function newQuote(){
    loading();
    let quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote)
    if(!quote.author){
        quoteAuthor.textContent='Unknown'
    }else{
         quoteAuthor.textContent= quote.author
    }
   if(quote.text.length > 60){
    quoteText.classList.add('long-quote')
   }else{
    quoteText.classList.remove('long-quote')
   }
    quoteText.textContent= quote.text
    complete();
}
//fetch quotes
async function getQuotes(){
    loading();
   const apiUrl = 'https://type.fit/api/quotes' 
 try{
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
}catch(error){
    //error here
}
}
//twitter
function tweetQuote(){
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
   window.open(twitterUrl, '_blank')
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes()