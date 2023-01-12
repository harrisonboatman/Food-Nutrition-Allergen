var submitBtn = document.querySelector("#submitBtn")

function handleFormSubmit () {
    var searchEl = document.querySelector('#search-input').value; 
    var allergenEl = document.querySelector('#allergen-input').value;
    console.log(searchEl);
    console.log(allergenEl);

    getRecipes(searchEl);
}

function getRecipes (recipe);
var repiceURL = ""

    fetch(recipeURL)
    .then(function(response){
        if (!response.ok) {
            console.error("you messed up");
            return
        } else {
            console.log(response);
            response.json();
        }
    })
    .then(function(recResult){
        console.log(recResult);
        
    })

submitBtn.addEventListener('click', handleFormSubmit);

// var instance = M.FormSelect.getInstance(elem);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems, options);
//   });

//   // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });

