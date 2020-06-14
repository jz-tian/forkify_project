import uniqid from 'uniqid';

export default class List{
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id : uniqid(),
            count, 
            unit, 
            ingredient
        }
        this.items.push(item);

        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        //eg [2,4,8].splice(1,1) => returns 4, original array becomes [2, 8] 参数是从第几位开始，走几位
        this.items.splice(index, 1); //如果前面加return那会得到被删掉的那个item
    }

    updateCount(id, newCount){
        this.items.find(el => el.id = id).count = newCount;
    }
}