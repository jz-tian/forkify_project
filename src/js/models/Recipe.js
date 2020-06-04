import axios from 'axios';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios({
                "method":"GET",
                "url":`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.id}/information`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key":"6254e2e442msh734c64054f6c642p1b8196jsn949ae6b44e00",
                "useQueryString":true
                }
                });
            console.log(res);
            this.title = res.data.title;
            this.author = res.data.creditsText;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            this.instruction = res.data.instructions;
            this.summary = res.data.summary;
            this.cookingTime = res.data.readyInMinutes;
            this.servingPeople = res.data.servings;

        }catch{
            console.log(error)
        }
    }
}