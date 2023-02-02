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

const DOM = {
    reponse: document.querySelector(".api-reponse"),
    Input: document.querySelector(".UserInput"),
    submit: document.querySelector("#form"),
    list: document.querySelector(".list"),
  };

const URL = `https://www.themealdb.com/api/json/v1/1/categories.php`;

async function getData(URL) {
  try {
    const MealInfo = await fetch(URL);

    if (MealInfo.status <= 199 || MealInfo.status >= 300) {
      throw new Error(MealInfo);
    } else {
      MealList();
      getInfo();
    }
  } catch (error) {
    console.log(error);
    console.log("Nope");
  }
}

function ClearInput() {
  document.querySelector(".UserInput").value = "";
}

function removal(event) {
  event.target.parentElement.remove();
}

DOM.submit.addEventListener("submit", async function (abc) {
  abc.preventDefault();
  await getInfo();
  ClearInput();
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", removal);
  });
});

async function MealList() {
  const MealInfo = await fetch(URL);
  const MealData = await MealInfo.json();
  MealData.categories.forEach((el) => {
    DOM.list.insertAdjacentHTML("beforeend", `<li>${el.strCategory}</li>`);
  });
}
//displays list of meals available in api

async function getInfo() {
  const MealInfo = await fetch(URL);
  const MealData = await MealInfo.json();
  let UserInputIM = DOM.Input.value;
  const UserInput = UserInputIM.charAt(0).toUpperCase() + UserInputIM.slice(1);

  MealData.categories
    .filter((el) => el.strCategory == `${UserInput}`)
    .map((el) => {
      DOM.reponse.insertAdjacentHTML(
        "beforeend",
        `<div class="suu">
            <img src="${el.strCategoryThumb}" alt="">
            <h1>${el.strCategory}</h3>
            <h3>description: ${el.strCategoryDescription}</h3>
            <button class="remove">Clear</button>
          
          </div>`
      );
    });
}

getData(URL);