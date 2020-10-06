

/********************************************************/
// https://www.youtube.com/watch?v=NhYMlbKgQzU
/*-------------------------------------------------------*/
// Object

let book = {
  title : "Book",
  price : 19.99,
  bookInfo = function(){
    console.log(this.title + " " + this.price );
  }

  // short version
  bookInfo(){
    console.log(this.title + " " + this.price );
  }

  // 'this' will use window object.. not work !
  // bookInfo = () => {
  //  console.log(this.title + " " + this.price );
  // }

}

/*-------------------------------------------------------*/
// Random
// returns a random integer from 0 to 99
Math.round(Math.random * 100)
Math.floor(Math.random() * 100);     

// Random number between min and max
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*-------------------------------------------------------*/
// Stack & Heap
// Stack : primitive data store ex) var a = "moon"
// Heap : Store reference data ex) a = { title: "book" }
// b = a;
// b pointer will point variable a
// store variable pointer to Stack and store value to Heap
// so if you change a and b will be changed also.

/*-------------------------------------------------------*/
// Constructor
function book(t,p){
    this.title = t;
    this.price = p;
}
let a = new book("book1", 1.99);
let b = new book("book2", 2.99);

/*-------------------------------------------------------*/
// same as $.attr()
let link = document.querySelector("a");
console.log(link.getAttribute("href));
link.setAttribute("href", "https://google.com);
link.setAttribute("class","success");
link.classList.add("mystyle");
link.classList.remove("mystyle");
link.classList.toggle("mystyle");
link.setAttribute("style","color: #00ff00");
link.style.margin = "50px";
link.innerText = "google";

link.innerText ===> only visible text
link.textContent ===> all text

link.textContent.includes("goo");


/********************************************************/
// https://www.youtube.com/watch?v=aNDfsHQ5Gts&list=PL4cUxeG/********************************************************/kcC9jx2TTZk3IGWKSbtugYdrlu&index=2
/*-------------------------------------------------------*/

const request = new XMLHttpRequest();
request.addEventListener('readystatechange', () => {
  console.log(request, request.readyState);
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
  // 0	UNSENT	Client has been created. open() not called yet.
  // 1	OPENED	open() has been called.
  // 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
  // 3	LOADING	Downloading; responseText holds partial data.
  // 4	DONE	The operation is complete.  


  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  if(request.readyState === 4 && request.status === 200 ){
    console.log(request.responseText);
  }
});
request.open('GET', 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9c8e60bee636401f933ebf731951ada9');
request.send();


// NO More XMLHttpRequest.... USE fetch API