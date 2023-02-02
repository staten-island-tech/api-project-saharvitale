// // function greet (name){
// //     const greetPromise = new Promise(function (resolve, reject){
// //         resolve(`hello ${name}`);
// //     })
// //     return greetPromise;
// // }

// // const suzie = greet("suzie");

// // suzie.then((result)=> {
// //     console.log(result);
// // });


// const URL = "https://api.catboys.com/8ball";

// async function getData(URL){
//     try{const response = await fetch(URL);
//         const data = await response.json(); // makes the data into json object we can use 
//         // console.log(data);     logs data in console 
//         document.getElementById("api-response").textContent = data.response;
//     }catch (error){
//         console.log(error);
//     }}
    
// getData(URL);
import "../styles/style.css";

const meme= document.getElementById("meme");
const title= document.getElementById("title");
const getMemeBtn= document.getElementById("get-meme-btn");


//api url
const url = "https://meme-api.com/gimme/";
//array of subreddits of ur choice
let subreddits= ["catmemes", "anime", "dankmemes"]

//get  random meme
let getMeme = () => {
// choose random subreddit from subreddits array
    let randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
   //fetch data from the api
   fetch(url + randomSubreddit)
   .then((resp) => resp.json())
   .then((data) => {
    const memeImg = new Image();
    //display meme img and title only after img loads
    memeImg.onload = () => {
        memeImg.src = data.url;
        document.getElementById("title").textContent = data.title;
    }
    memeImg.src = data.url;
   });
};
//call getMeme() on button click and widnow reload
getMemeBtn.addEventListener("click", getMeme);
window.addEventListener("load", getMeme);