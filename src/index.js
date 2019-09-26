function listFactory(name) {
    const list = Object.create(listFactory.proto);
    list.name = name;
    list.items = [];
    return list;
}

listFactory.proto = {
    getListName: function() {
        return this.name;
    },

    addItem: function(listItem) {
        console.log(this.items);
        return this.items.concat([listItem]);
    }
}

function itemFactory(title, note, date, priority) {
	let item = Object.create(itemFactory.proto);
    item.title = title;
    item.note = note;
    item.date = date;
    item.priority = priority;
    return item;
}
    
itemFactory.proto = {    
    getTitle: function() {
        return this.title;
    },

    getNote: function() {
        return this.note;
    },

    getDate: function() {
        return this.date;
    },

    getPriority: function() {
        return this.priority;
    },
    
    viewDetails: function() {
        console.table([this.title, this.note, this.date, this.priority]);
    }
};

let taskOne = itemFactory('1. this is the name of your task', 'random note that will be entered here');
let taskTwo = itemFactory('2. second task reporting in', 'some note we can write', '7/21/79', true);
let buyList = listFactory('Buy List');
let wishList = listFactory('Wish List');

buyList.items = buyList.addItem(taskOne);
buyList.items = buyList.addItem(taskTwo);

wishList.items = wishList.addItem(itemFactory('Nintendo Switch'));
wishList.items = wishList.addItem(itemFactory('Xbox One'));
wishList.items = wishList.addItem(itemFactory('PlayStation 4'));
wishList.items = wishList.addItem(itemFactory('Oculus Rift'));

console.log(buyList);
console.log(wishList);

