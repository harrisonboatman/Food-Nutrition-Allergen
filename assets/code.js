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
var nutr0 = document.querySelector('#nutrContent0');
var nutr1 = document.querySelector('#nutrContent1');
var nutr2 = document.querySelector('#nutrContent2');
var nutr3 = document.querySelector('#nutrContent3');
var nutr4 = document.querySelector('#nutrContent4');
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
    var allergenEl = document.querySelector('#allergen').value.toLowerCase();
    var cardArr = [card1, card2, card3, card4, card5]
    var instructArr = [instruct1, instruct2, instruct3, instruct4, instruct5];
    var allergyAlert = document.querySelector('#card')
    console.log(recipeURL)
    console.log(allergenEl)

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
            for(i=0; i<cardArr.length; i++) {
                cardArr[i].textContent = recResult[i].title;
                instructArr[i].textContent = recResult[i].instructions;
                var ingredArray = recResult[i].ingredients.split("|");
                console.log(ingredArray);
                console.log(ingredArray.length)


                for (let i = 0;  i < recResult.length; i++) {
                    const ingredientList = recResult[i].ingredients;
                    console.log(ingredientList)

                    var containsAllergen = ingredientList.includes(allergenEl)
                console.log(containsAllergen)
               
                var warning1 = document.getElementById('warning1')
                var warning2 = document.getElementById('warning2')
                var warning3 = document.getElementById('warning3')
                var warning4 = document.getElementById('warning4')
                var warning5 = document.getElementById('warning5')

                    if(containsAllergen === true) {
                        warning1.style.display = 'block'
                        warning2.style.display = 'block'
                        warning3.style.display = 'block'
                        warning4.style.display = 'block'
                        warning5.style.display = 'block'
                    } else {
                        warning1.style.display = 'none'
                        warning2.style.display = 'none'
                        warning3.style.display = 'none'
                        warning4.style.display = 'none'
                        warning5.style.display = 'none'
                    }
                }         

                showIngredients(`modal${i}`,ingredArray)
                checkNutrition(recipe, `nutrModal${i}`);
            }            
        }).then (displayCards)

    

}

function showIngredients(modalId, ingredientList) {
console.log(ingredientList)
    var ingredientHtml = '';

    for (var i=0; i<ingredientList.length; i++){
        ingredientHtml += `<li>${ingredientList[i]}</li>`
    }

    var html = `   
    <div class="modal-content">
        <h4>Ingredients</h4>
        <ul>
        ${ingredientHtml}
        </ul>
    </div>`

    var modalEl = document.getElementById(modalId)

    modalEl.innerHTML = html
}



function checkNutrition(recipe, modalID) {
    var nutrURL = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=' + recipe;
    console.log(nutrURL)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f22fe07855mshbcbd682b9e3da6ap1cac5ajsn940b652f81a9',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };
    fetch(nutrURL, options)
    .then(function (response){
        if (!response.ok){
            console.error("YOU MESSED UP")
        } else {
            console.log(response)
            return response.json()
        }
    })
        .then(function (Nutrit){
            console.log(Nutrit)
            console.log(Nutrit.hints[0].food.nutrients);
            var nutrHTML = ''
            console.log(Nutrit.hints.length)
            var nutrArr = [nutr0, nutr1, nutr2, nutr3, nutr4];
            for( i=0; i<5; i++){
                var nutrString = JSON.stringify(Nutrit.hints[i].food.nutrients);
            var nutrSplit = nutrString.split(',');
            nutrHTML += `<li>${nutrSplit[i]}</li>`
            console.log(nutrHTML)

            }
            var html = `   
            <div class="modal-content">
                <h4>Ingredients</h4>
                <ul>
                ${nutrHTML}
                </ul>
            </div>`
            console.log(html)

            var modalEle = document.getElementById(modalID)
            modalEle.innerHTML = html
        })
        

}
console.log(submitBtn);
submitBtn.addEventListener('click', handleFormSubmit);



function displayCards() {
    var T = document.getElementById("displayClick");
    T.style.display = "block";


} 

document.addEventListener('DOMContentLoaded', function() {    var elems = document.querySelectorAll('.modal');    var instances = M.Modal.init(elems, options);  });


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
  });
