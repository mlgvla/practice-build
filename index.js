// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#category")
const recipeContainer = document.querySelector(".recipe-container")

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine)
categorySelect.addEventListener("change", getRecipesByCategory)

// Function Calls
getCuisines()
getCategories()

// Populate Dropdowns
function getCuisines() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(r => r.json())
      .then(cuisines => renderCuisineOptions(cuisines.meals))
      .catch(error => alert(error))
}

function getCategories() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(r => r.json())
      .then(categories => renderCategoryOptions(categories.meals))
      .catch(error => alert(error))
}

// Render Dropdowns
function renderCuisineOptions(cuisines) {
   cuisines.forEach(cuisine => {
      const option = document.createElement("option")
      option.value = cuisine.strArea
      option.textContent = cuisine.strArea
      cuisineSelect.append(option)
   })
}

function renderCategoryOptions(categories) {
   categories.forEach(category => {
      const option = document.createElement("option")
      option.value = category.strCategory
      option.textContent = category.strCategory
      categorySelect.append(option)
   })
}

// Recipe Retrieval Functions
function getRecipesByCuisine(e) {
   const cuisine = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
      .then(r => r.json())
      .then(recipes => renderAllRecipes(recipes.meals))
}

function getRecipesByCategory(e) {
   const category = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(r => r.json())
      .then(recipes => renderAllRecipes(recipes.meals))
}

function renderAllRecipes(recipes) {
    recipeContainer.replaceChildren()
    
    recipes.forEach(recipe => {
        renderRecipeCard(recipe)
    })
    cuisineSelect.value = ""
    categorySelect.value = ""
}

function renderRecipeCard(recipe) {
   const {
      idMeal: recipeId,
      strMeal: recipeName,
      strMealThumb: recipeImage,
   } = recipe

   const cardDiv = document.createElement("div")
   cardDiv.classList.add("card")

   const image = document.createElement("img")
   image.src = recipeImage

   const title = document.createElement("h3")
   title.textContent = recipeName

   cardDiv.append(image, title)

   recipeContainer.append(cardDiv)
}
