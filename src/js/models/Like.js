export default class Like{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = { id, title, author, img };
        this.likes.push(like);
        //persist the data in the local storage
        this.persistData();
        return like;
    };

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1); 

        //persist the data in the local storage
        this.persistData();
    };

    isLiked(id){ //for displaying if one recipe is liked
        return this.likes.findIndex(el => el.id === id) !== -1;
    };

    getNumLikes(){
        return this.likes.length;
    };

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };

    getData(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage){
            this.likes = storage;
        } 
    }
}