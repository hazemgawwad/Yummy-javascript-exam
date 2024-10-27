// html element
let contmeal = document.querySelector(".mealContainer");
let DisplyContainer = document.getElementById("DisplyContainer");
let Search = $(".Search");
let Categories = $(".Categories");
let Area = $(".Area");
let Ingredients = $(".Ingredients");
let Contact = $(".Contact");
// app variable
let nameInputTouched = false;   
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
// function

async function getCategories() {
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  DisplyContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}
function displayCategories(arry) {
  let meals = "";
  $(".inner-loading-screen").fadeOut(300);
  for (let i = 0; i < 25; i++) {
    meals = `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-[0px] ">
      <div
      onclick="getCategoryMeals('${arry[i].strCategory}')"
        class="inner relative group overflow-hidden rounded-[10px] m-[10px] cursor-pointer"
      >
      
        <img src="${arry[i].strCategoryThumb}" alt="" class="w-[100%] group" />
        <figcaption
          class="bg-white/80 py-[20px] flex flex-col justify-center items-center absolute w-full h-full group-hover:translate-y-[-100%] transition-all duration-[.7s]"
       >
        <h3 class=" text-center text-[28px] mt-[20px] font-bold py-[15px]" >${
          arry[i].strCategory
        }</h3>
          <p
              class="text-black  text-[16px]  h-[100%] text-center px-[20px]"
          >
            ${arry[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}
          </p>
        </figcaption>
      </div>
    </div>`;
    contmeal.innerHTML += meals;
  }
}


async function getArea() {
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  DisplyContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);
  displayArea(respone.meals);
  $(".inner-loading-screen").fadeOut(300);
}

function displayArea(arry) {
  let meals = "";
  for (let i = 0; i < arry.length; i++) {
    meals = `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-[0px] ">
      <div onclick="getAreaMeals('${arry[i].strArea}')" class="rounded-2 text-center cursor-pointer my-[10px]">
         <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
         <h3 class="text-[18px] text-white">${arry[i].strArea}</h3>
     </div>
    </div>`;
    contmeal.innerHTML += meals;
  }
}

async function getIngredients() {
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  DisplyContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

function displayIngredients(arry) {
  let meals = "";
  for (let i = 0; i < arry.length; i++) {
    meals = `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-[15px] my-[10px]">
      <div onclick="getIngredientsMeals('${
        arry[i].strIngredient
      }')" class="rounded-2 text-center cursor-pointer text-[28px]">
        <i class="fa-solid fa-drumstick-bite fa-4x  text-white"></i>
         <h3 class="text-[28px] text-white">${arry[i].strIngredient}</h3>
         <p class="text-[16px] text-white">${arry[i].strDescription
           .split(" ")
           .slice(0, 20)
           .join(" ")}</p>
     </div>
    </div>`;
    contmeal.innerHTML += meals;
  }
}


async function getCategoryMeals(category) {
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  disblay(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
async function getAreaMeals(area) {
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  disblay(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
async function getIngredientsMeals(ingredients) {
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  disblay(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}


async function getMealDetails(mealID) {
  closeSideNav();
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  DisplyContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  DisplyContainer.innerHTML = "";
  $(".inner-loading-screen").fadeOut(300);
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info mr-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger mr-2 p-1">${tags[i]}</li>`;
  }

  let MealDetails = ` <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="mt-[10px] text-white font-bold text-[32px] ">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="m-[10px] text-white font-bold text-[32px] ">Instructions</h2>
                <p class=" text-white ">${meal.strInstructions}</p>
                <h3 class=" text-white my-2 "><span class="fw-bolder text-white text-[28px] font-normal ">Area : </span>${meal.strArea}</h3>
                <h3 class=" text-white "><span class="fw-bolder text-white text-[28px] font-normal ">Category : </span>${meal.strCategory}</h3>
                <h3 class=" text-white my-2 text-[28px] "> Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3 class="my-[10px] text-white  text-[28px]">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap m-0">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  contmeal.innerHTML = MealDetails;
}
// search 
async function searchByName(term) {
  closeSideNav();
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? disblay(response.meals) : disblay([]);
  $(".inner-loading-screen").fadeOut(300);
}
async function searchByFLetter(term) {
  closeSideNav();
  contmeal.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? disblay(response.meals) : disblay([]);
  $(".inner-loading-screen").fadeOut(300);
}
function showSearchInputs() {
  $(".inner-loading-screen").fadeOut(300);
  DisplyContainer.innerHTML = `
    <div class="row py-4  ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white mb-[15px]" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  contmeal.innerHTML = "";
}

// Contacts 
function showContacts() {
  DisplyContainer.innerHTML = "";
  $(".inner-loading-screen").fadeOut(300);
  contmeal.innerHTML = `
      <div class="container contact min-vh-100">
      <div class="position-absolute top-50 start-50 translate-middle">
        <form class="row g-4 py-4">
          <div class="col-md-6">
            <input
              type="text"
              placeholder="Enter Your Name"
              class="form-control p-2"
              id="nameInput"
              onkeyup="inputsValidation()"
            />
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              Special characters and numbers not allowed
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="email"
              placeholder="Enter Your Email"
              class="form-control p-2"
              id="emailInput"
              onkeyup="inputsValidation()"
            />
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not valid *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="text"
              placeholder="Enter Your Phone"
              class="form-control p-2"
              id="phoneInput"
              onkeyup="inputsValidation()"
            />
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="number"
              placeholder="Enter Your Age"
              class="form-control p-2"
              id="ageInput"
              onkeyup="inputsValidation()"
            />
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid age
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="password"
              placeholder="Enter Your Passward"
              class="form-control p-2"
              id="passwordInput"
              onkeyup="inputsValidation()"
            />
            <div
              id="passwordAlert"
              class="alert alert-danger w-100 mt-2 d-none"
            >
              Enter valid password *Minimum 8 characters, at least 1
              letter and 1 number:*
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="password"
              placeholder="Enter Your Repassward"
              class="form-control p-2"
              id="repasswordInput"
              onkeyup="inputsValidation()"
            />
            <div
              id="repasswordAlert"
              class="alert alert-danger w-100 mt-2 d-none"
            >
              Enter valid repassword
            </div>
          </div>
        </form>
        <button
          type="submit"
          disabled=""
          id="submitBtn"
          class="btn btn-outline-danger px-2 mt-2 position-absolute top-100 start-50 translate-middle"
        >
          Submit
        </button>
      </div>
    </div>
  `;

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(nameInput.value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    phoneInput.value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value);
}

function repasswordValidation() {
  return repasswordInput.value == passwordInput.value;
}
// Nav 
function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: "0px",
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: "0px",
        },
        (i + 5) * 100
      );
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: `-${boxWidth}px`,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: "300px",
    },
    500
  );
}

closeSideNav();

function disblay(arry) {
  let meals = "";
  $(".inner-loading-screen").fadeOut(300);
  for (let i = 0; i < 20; i++) {
    meals = `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-[0px]">
            <div
            onclick="getMealDetails('${arry[i].idMeal}')"
              class="inner relative group overflow-hidden rounded-[10px] m-[10px] cursor-pointer"
            >
              <img src="${arry[i].strMealThumb}" alt="" class="w-[100%] group" />
              <figcaption
                class="bg-white/80 absolute flex  items-center w-full h-full group-hover:translate-y-[-100%] transition-all duration-[.7s]"
              >
                <h3
                  class="text-black  text-[28px] font-bold  ps-[10px]"
                >
                  ${arry[i].strMeal}
                </h3>
              </figcaption>
            </div>
          </div>`;
    contmeal.innerHTML += meals;
  }
}


async function getResponse() {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let dataresponse = await response.json();
  console.log(dataresponse.meals);
  disblay(dataresponse.meals);
}



// events

$(".side-nav-menu i.open-close-icon").on("click", () => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
Search.on("click", function () {
  showSearchInputs();
  closeSideNav();
});
Area.on("click", function () {
  getArea();
  closeSideNav();
});
Categories.on("click", function () {
  getCategories();
  closeSideNav();
});

Ingredients.on("click", function () {
  getIngredients();
  closeSideNav();
});

Contact.on("click", function () {
  showContacts();
  closeSideNav();
});
