import axios from 'axios';
export default class Search{
    constructor(query){
        this.query = query;
    }

    async getRecipe(){
        try {
            const res = await axios({
                "method":"GET",
                "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key":"6254e2e442msh734c64054f6c642p1b8196jsn949ae6b44e00",
                "useQueryString":true
                },"params":{
                "query":this.query,
                "addRecipeInformation":"true",
                "number":"50"
                }
                });
            this.result = res.data.results; //把结果直接储存在这个object里
        } catch(error){
            alert(error);
        }
    }


}