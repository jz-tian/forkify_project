import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeViews';
import { elements, renderLoader, clearLoader } from './views/base';

/* global state of the app
* - search object
* - current recipe object
* - shopping list object
* - liked recipes
*/
const state = {};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    console.log('searching');
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e => { 
    //这里要用delegation，因为一开始在页面上button不存在，而且是动态添加的
    const btn = e.target.closest('.btn-inline');
    console.log(btn); //这个closest会自动找到离target最近的有这个类的元素。这样能保证不管点的是按钮的哪里都可以保证是按钮做出反应
    if(btn){
        const gotoPage = parseInt(btn.dataset.goto, 10); //使用存在html里的按钮指向的页面。后面的parseint里的参数是几进制
        searchView.clearResults();
        searchView.renderResults(state.search.result, gotoPage);
    }
});

const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();
    console.log(query);

    if(query){
        // 2) new search object and add it to state
        state.search = new Search(query);

        // 3) prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4) search for recipes
            await state.search.getRecipe();

            // 5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
            console.log(state.search.result);
        } catch{
            alert('Error happened when searching for recipe list!');
        }
        

    }
}

//recipe controller
const controlRecipe = async () => { 
    const id = window.location.hash.replace('#',''); //得到当前URL里的hash部分，并去掉hash的#符号
    console.log(id);

    if(id){
        //1. prepare UI for changes
        elements.recipeArea.innerHTML = '';
        renderLoader(elements.recipeArea);

        //highlight the selected search list item
        if (state.search) searchView.hightlightSelector(id);

        //2. create a new recipe object
        state.recipe = new Recipe(id);

        try {
            //3. get the recipe data
            await state.recipe.getRecipe();

            //4. render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch {
            alert('Error happened when loading recipes!');
        }
        
    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); //给window添加两个callback相同的eventlistener
