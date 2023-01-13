document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
});

var submitBtn = document.querySelector("#submitBtn");
var card1 = document.querySelector("#card1");
var card2 = document.querySelector("#card2");
var card3 = document.querySelector("#card3");
var card4 = document.querySelector("#card4");
var card5 = document.querySelector("#card5");
var instruct1 = document.querySelector('#instruct1');
var instruct2 = document.querySelector('#instruct2');
var instruct3 = document.querySelector('#instruct3');
var instruct4 = document.querySelector('#instruct4');
var instruct5 = document.querySelector('#instruct5');
var ingred1 = document.querySelector('#ingred1');
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f22fe07855mshbcbd682b9e3da6ap1cac5ajsn940b652f81a9',
        'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
    }
};

function handleFormSubmit() {
    var searchEl = document.querySelector('#recipe').value;
    var allergenEl = document.querySelector('#allergen').value;
    console.log(searchEl);
    console.log(allergenEl);

    getRecipes(searchEl);
}

function getRecipes(recipe) {
    var recipeURL = "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=" + recipe + "&offset=4"
    var allergenEl = document.querySelector('#allergen').value;
    var cardArr = [card1, card2, card3, card4, card5]
    var instructArr = [instruct1, instruct2, instruct3, instruct4, instruct5];
    var allergyAlert = document.querySelector('#card')
    console.log(recipeURL)

    fetch(recipeURL, options)
        .then(function (response) {
            if (!response.ok) {
                console.error("you messed up");
                return
            } else {
                console.log(response);
                return response.json();
            }
        })
        .then(function (recResult) {
            console.log(recResult);
            console.log(recResult[0].ingredients)
            var ingredArray = recResult[0].ingredients.split("|");
            console.log(ingredArray);
            console.log(ingredArray.length)
            for(i=0; i<cardArr.length; i++) {
                cardArr[i].textContent = recResult[i].title;
                instructArr[i].textContent = recResult[i].instructions;
                


            
            //     for (i=0; i<ingredArray.length; i++ ){
            //     console.log(ingredArray[i].includes(allergenEl))
            //     if (ingredArray[i].includes(allergenEl)){
            //         allergyAlert.classList.add("red-text")
            //         break;
            //     }
            // }
            
            }


            
        })

    checkAllergen();
}

function checkAllergen() {
    var allergenEl = document.querySelector('#allergen').value;
    console.log(allergenEl);

}
console.log(submitBtn);
submitBtn.addEventListener('click', handleFormSubmit);



// Attempt to add checkbox
