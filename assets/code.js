$(document).ready(function(){
    $('select').formSelect();
  });

var submitBtn = document.getElementById("#submitBtn")
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f22fe07855mshbcbd682b9e3da6ap1cac5ajsn940b652f81a9',
		'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
	}
};

function handleFormSubmit () {
    var searchEl = document.querySelector('#recipe').value; 
    var allergenEl = document.querySelector('#allergen').value;
    console.log(searchEl);
    console.log(allergenEl);

    getRecipes(searchEl);
}

function getRecipes (recipe) {
var recipeURL = "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=" + recipe + "&offset=4"
console.log(recipeURL)

    fetch(recipeURL, options)
    .then(function(response){
        if (!response.ok) {
            console.error("you messed up");
            return
        } else {
            console.log(response);
            return response.json();
        }
    })
    .then(function(recResult){
        console.log(recResult);
        console.log(recResult[0].ingredients)
        var ingredArray = recResult[0].ingredients.split("|");
        console.log(ingredArray);
    })

    checkAllergen();
}

function checkAllergen(){
    var allergenEl = document.querySelector('#allergen-input').value;
    console.log(allergenEl);

}
console.log(submitBtn)
submitBtn.addEventListener('click', handleFormSubmit);

// Attempt to add checkbox
