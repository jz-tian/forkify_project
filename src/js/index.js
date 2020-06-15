import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeViews';
import * as listView from './views/listView';
import * as likeView from './views/likeViews';
import { elements, renderLoader, clearLoader } from './views/base';

/* global state of the app
* - search object
* - current recipe object
* - shopping list object
* - liked recipes
*/
const state = {};

//restore the liked recipes when page reloads
window.addEventListener('load', () => {
    state.likes = new Like();

    //从浏览器储存里把数据恢复
    state.likes.getData();

    likeView.toggleLikeMenu(state.likes.getNumLikes());

    //render已有的likes
    state.likes.likes.forEach(el => {
        likeView.renderLike(el);
    });
})

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
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

//search controller
const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch {
            alert('Error happened when loading recipes!');
        }
    }
}

//adding shopping list
const controlList = () => {
    if(!state.list){
        state.list = new List();
    }
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.measures.metric.amount, el.measures.metric.unitShort, el.name); //这个方法写的时候特意让他把新加的item return回来
        listView.renderItem(item);
    })
}

const controlLike = () => {
    if(!state.likes){
        state.likes = new Like();
    }

    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)){
        //user hasn't liked the current recipe
        //Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);
        //toggle the like button
        likeView.toggleLikeBut(true);

        //Add like to the UI list
        likeView.renderLike(newLike);
    } else {
        //user has already liked the current recipe
        //Remove like to the state
        state.likes.deleteLike(currentID);
        
        //toggle the like button
        likeView.toggleLikeBut(false);

        //Remove like to the UI list
        likeView.deleteLike(currentID);
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); //给window添加两个callback相同的eventlistener

//handling add or decrease serving people in the recipe。 这是另一种event delegation，这样可以在一片区域给一堆元素加不同的event listener，基于点的是哪里
elements.recipeArea.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){ //如果点击的是带该class的按钮或者其任意子元素
        if(state.recipe.servingPeople > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingAndIngredient(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingAndIngredient(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike(); //这是加收藏的button
    }
});

//handles delete and update the shopping list
elements.shoppingList.addEventListener('click', el => {
    const id = el.target.closest('.shopping__item').dataset.itemid;

    if(el.target.matches('.shopping__delete, .shopping__delete *')){
        //delete state
        state.list.deleteItem(id);

        //delete user interface
        listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    };
});