const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

//show loading 
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hide loading 
function complete() {
    if(!loader.hidden){
        quoteContainer.hidden= false;
        loader.hidden=true;
    }
}


// show new quote 
function newQuote(){
    //pick random number and pick random quote
    let quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    
    
    // cheking author field is unknown and replace it with UNKOWN
    if (!quote.author) {
        authorText.textContent="Unknown"
    }else{
        authorText.textContent=quote.author;
    }

    //chesking quote length to determine styleing
    if(quote.text.length > 70){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }


    // authorText.textContent = quote.author;
    quoteText.textContent  = quote.text ; 
    complete();
}

let apiQuotes =[];



//get quotes from api  

async function getQuotes(){
    loading()
    const apiUrl= "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
        
    } catch(error){
        //catch error here
        
    }
}


//tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,"_balnk");
}

// event lisner
newQuoteBtn.addEventListener("click",newQuote);
twitterBtn.addEventListener("click", tweetQuote);


// on load   
getQuotes();


 