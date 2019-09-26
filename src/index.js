let listArray = [];


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

const removeList = function(listIndex) {   // permanently removes a list from the "master" array
    let updatedArray = listArray.splice(listIndex, 1); // can use as purgatory
    return updatedArray;
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

    changePriority: function() {
        console.log(this);
        console.log(this.priority);
        return this.priority = (this.priority === true) ? false : true;

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
    // let itemPriority = prompt('Is this a priorty?', 'true or false') === 'true' ? true : false;  
    let itemPriority = false;  
    
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

const assignItemToList = function(fromListName, itemIndex, toListName) {   // assigns item from one list to another
    let itemToMove = fromListName.items.splice(itemIndex, 1);
    toListName.items.push(itemToMove[0]);
    console.log(toListName);

}

const markItemComplete = function(obj) {

};

const initList = (function() {   // initializes app with a default list
    const myList = listFactory('My List');
    const currentDate = new Date();

    myList.items = myList.addItem(itemFactory('To add a list item, click the + button.', 'This line is reserved for notes.', `Due: ${currentDate.getMonth()+1}/${currentDate.getDate()} `, false));
    myList.items = myList.addItem(itemFactory('To create a list, click on the list icon.'));
    listArray.push(myList);
})();


let buyInfo = itemFactory('Detergent', 'If possible, get Downy.');
let moreBuyInfo = itemFactory('Kimchi Ramen', 'Look for extra spicy', '7/21', true);
let buyList = listFactory('Buy List');
let wishList = listFactory('Wish List');

buyList.items = buyList.addItem(buyInfo);
buyList.items = buyList.addItem(moreBuyInfo);

wishList.items = wishList.addItem(itemFactory('Nintendo Switch'));
wishList.items = wishList.addItem(itemFactory('Xbox One'));
wishList.items = wishList.addItem(itemFactory('PlayStation 4'));
wishList.items = wishList.addItem(itemFactory('Oculus Rift'));

// add all lists to a "master" list array
listArray.push(wishList);
listArray.push(buyList);

console.log(buyList);
console.log(wishList);
console.log(listArray);


