// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#category")
const recipeContainer = document.querySelector(".recipe-container")
const recipeDetailsContainer = document.querySelector(
   ".recipe-details-container"
)
const recipeDetailsSection = document.querySelector(".recipe-details-section")
const welcomeSection = document.querySelector(".welcome")

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine)
categorySelect.addEventListener("change", getRecipesByCategory)

// Function Calls
showWelcome()
getCuisines()
getCategories()

// Welcome section
function showWelcome() {
   recipeDetailsContainer.style.display = "none"
}

// Dropdown Functions
function getCuisines() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(r => r.json())
      .then(cuisines => renderCuisineOptions(cuisines.meals))
      .catch(error => console.log(error))
}

function getCategories() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(r => r.json())
      .then(categories => renderCategoryOptions(categories.meals))
      .catch(error => console.log(error))
}

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

// Recipe Collection Functions
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
   welcomeSection.style.display = "none"
   recipeDetailsContainer.style.display = "none"
   recipeContainer.style.display = "grid"
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
   cardDiv.addEventListener("click", e => getRecipeDetails(e, recipeId))

   const image = document.createElement("img")
   image.src = recipeImage

   const title = document.createElement("h3")
   title.textContent = recipeName

   cardDiv.append(image, title)

   recipeContainer.append(cardDiv)
}

// Recipe Detail Functions
function getRecipeDetails(e, recipeId) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(r => r.json())
      .then(recipe => renderRecipeDetails(recipe.meals[0]))
      .catch(error => alert(error))
}

function renderRecipeDetails(recipeDetails) {
   recipeDetailsContainer.style.display = "grid"
   recipeContainer.replaceChildren()

   const {
      strMeal: recipe,
      strArea: cuisine,
      strCategory: category,
      strMealThumb: image,
      strInstructions: directions,
      strYoutube: youTubeLink,
   } = recipeDetails

   // Title Area
   const title = document.createElement("p")
   title.textContent = recipe
   let titleArea = document.querySelector(".recipe-details-title")
   titleArea.replaceChildren()
   titleArea.append(title)

   // Image Area
   const imageArea = document.querySelector(".recipe-details-image")
   const recipeImage = document.createElement("img")
   recipeImage.src = image
   recipeImage.alt = `Image for ${recipe}`
   imageArea.replaceChildren()
   imageArea.append(recipeImage)

   // Ingredients Area
   const ingredientsTitle = document.createElement("h3")
   ingredientsTitle.textContent = "Ingredients"
   ingredientsTitle.style.textDecoration = "underline"
   const ingredientsArea = document.querySelector(".recipe-details-ingredients")
   const ingredientsList = document.createElement("p")
   ingredientsArea.replaceChildren()
   ingredientsList.textContent = "<List of Ingredients will go here>"
   ingredientsArea.append(ingredientsTitle, ingredientsList)

   // Directions Area
   const directionsTitle = document.createElement("h3")
   directionsTitle.textContent = "Directions"
   directionsTitle.style.textDecoration = "underline"
   const directionsArea = document.querySelector(".recipe-details-directions")
   const directionsP = document.createElement("p")
   directionsArea.replaceChildren()
   directionsP.textContent = directions
   directionsArea.append(directionsTitle, directionsP)

   // Resource Area
   const youTubeLinkATag = document.createElement("a")
   youTubeLinkATag.href = youTubeLink
   youTubeLinkATag.text = `How to make ${recipe} on YouTube.`
   const cuisineCategory = document.createElement("p")
   cuisineCategory.textContent = `(Cuisine: ${cuisine}, Category: ${category})`
   const resourcesArea = document.querySelector(".recipe-details-resources")
   resourcesArea.replaceChildren()
   resourcesArea.append(youTubeLinkATag, cuisineCategory)
}
