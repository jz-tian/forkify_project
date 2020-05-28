import axios from 'axios';

async function getRecipe(query){
    try {
        const res = await axios({
            "method":"GET",
            "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":"6254e2e442msh734c64054f6c642p1b8196jsn949ae6b44e00",
            "useQueryString":true
            },"params":{
            "number":"100",
            "query": query
            }
            });
        console.log(res.data.results);
    } catch(error){
        alert(error);
    }
}

async function getWeather(query){
    try {
        const res = await axios({
            "method":"GET",
            "url":`https://dark-sky.p.rapidapi.com/${query[0]},${query[1]}`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"dark-sky.p.rapidapi.com",
            "x-rapidapi-key":"6254e2e442msh734c64054f6c642p1b8196jsn949ae6b44e00",
            "useQueryString":true
            },"params":{
            "lang":"en",
            "units":"auto"
            }
            });
        
        console.log(res.data.daily.data);
    } catch (error) {
        alert(error);
    }
}
getWeather([39.909058, 116.389181]);
getRecipe('rice');
