import { elements } from "./base";

const createIngredientHTML = ingredient => {
  return `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${ingredient.measures.metric.amount}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.measures.metric.unitShort}</span>
            ${ingredient.name}
        </div>
    </li>
    `;
};

const addClassToUL = ins => {
    let newIns = ins;
    if(ins.includes('<ul>')){
       newIns = ins.replace('<ul>', '<ul class="recipe__instruction-text">')
    }
    return newIns;
};


export const renderRecipe = recipe => {
  const markup = `
    <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servingPeople
                }</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredientHTML(el)).join('')}               
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">Recipe Summary</h2>
            <p class="recipe__directions-text">
                ${recipe.summary}
            </p>
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                ${ addClassToUL(recipe.instruction)  }
            </p>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${
                  recipe.author
                }</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${
              recipe.url
            }" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
  elements.recipeArea.insertAdjacentHTML("afterbegin", markup);
};

export const updateServingAndIngredient = recipe => {
    
    document.querySelector('.recipe__info-data--people').textContent = recipe.servingPeople;

    const ingredientCounts = Array.from(document.querySelectorAll('.recipe__count'));
    ingredientCounts.forEach((el, index) => {
        el.textContent = recipe.ingredients[index].measures.metric.amount;
    });
}
