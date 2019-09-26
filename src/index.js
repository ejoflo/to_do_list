const listFactory = function(name) {
    const list = Object.create(listFactory.proto);

    list.name = name;
    list.items = [];

    return list;
};

listFactory.proto = {
    getListName: function() {
        return this.name;
    },

    addItem: function(listItem) {
        const itemArray = this.items.concat([listItem]);
        // console.log(this.items);
        return itemArray;
    }
};

const getNewListName = function() {   // gets the user provided list name
    let listName = prompt('What is the name of this list?');
    return listName;
}

const newList = function(listName) {   // create a new list from user provided input
    let newUserList = listFactory(listName);
    return newUserList;
};

const itemFactory = function(title, note, date, priority) {
    const item = Object.create(itemFactory.proto);
    
    item.title = title;
    item.note = note;
    item.date = date;
    item.priority = priority;

    return item;
};
    
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

const getNewItemInfo = function() {   // gets the user provided item name
    let newItemInfoArray = [];
    let itemTitle = prompt('Please describe this item.');
    let itemNote = prompt('Add a note to this item.');
    let itemDate = prompt('When is this item due?', '9/25');
    let itemPriority = prompt('Is this a priorty?', 'true or false') === 'true' ? true : false;  
    
    newItemInfoArray = [itemTitle, itemNote, itemDate, itemPriority];
    return newItemInfoArray;
};

const newItem = function(itemInfo) {   // creates a new item from user provided input
    let newUserItem = itemFactory(itemInfo[0],itemInfo[1],itemInfo[2],itemInfo[3]);
    return newUserItem;
};

const addItemToList = function(listName, item) {   // adds an item to a specified list
    listName.items = listName.addItem(item);
    return listName.items;
}

const initList = function() {   // initializes app with a default list
    const myList = listFactory('My List');
    const currentDate = new Date();

    myList.items = myList.addItem(itemFactory('To add a list item, click the + button.', 'This line is reserved for notes.', `Due: ${currentDate.getMonth()+1}/${currentDate.getDate()} `, false));
    myList.items = myList.addItem(itemFactory('To create a list, click on the list icon.'));
    console.log(myList);
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
// initList();

