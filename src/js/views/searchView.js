import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const renderResults = ( recipes, page = 1 , resultsPerPage = 10) => { //分页
    //render result for the current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //render the buttons for pages
    renderButtons(page, recipes.length, resultsPerPage);
};

export const clearInput = () => {
    elements.searchInput.value = ''; //清空搜索框
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = ''; //清空已有的搜索结果
    elements.searchResultPages.innerHTML = ' '; //清空已有的翻页按钮
};

export const hightlightSelector = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {el.classList.remove('result__link--active')});
    
   // document.querySelector(`.results__link[href*="${id}"]`).classList.add('result__link--active'); //这是个css selector
}

const renderRecipe = (recipe) => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.id}">
        <figure class="results__fig">
            <img src="${recipe.image}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${regularRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.sourceName === null ? 'UNKNOWN RESOURCE' : recipe.sourceName}</p>
        </div>
    </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const regularRecipeTitle = (title, limit = 17) => {  //limitted length of the recipe title that                                                         will be displayed
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) =>{
            if( acc + cur.length <= limit ){
                newTitle.push(cur);
            }
            return acc + cur.length;  //更新acc，记录单词的长度综合
        }, 0); //用空格把一整句话的每个单词分开
        return `${newTitle.join(' ')} ...`; //将数组所有元素用括号中的间隔组合起来
    }
    return title;
     
};

const createButtons = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}> 
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>        
    </button>`; //那个data-goto是把这个按钮会导到的页码存起来

const renderButtons = (page, numResults, resultsPerPage) => {

    const pageTotalNum = Math.ceil(numResults/resultsPerPage);
    let button;
    if(page === 1 && pageTotalNum > 1){
        //just need the button to go to next page
        button = createButtons(page, 'next');
    }else if (page === pageTotalNum && pageTotalNum > 1){
        //only need the button to go to the previous page
        button = createButtons(page, 'prev');
    }else if (page > 1 && page < pageTotalNum){
        button = `${createButtons(page, 'next')}
                  ${createButtons(page, 'prev')}`;
    }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};