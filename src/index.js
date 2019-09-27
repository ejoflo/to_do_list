const masterList = (function() {
    const listArray = [];
    
    const getNewListName = () => {   // gets the user provided list name
        let listName = prompt('What is the name of this list?');
        return listName;
    };

    const addNewList = (newListName) => {   // create a new list from user provided input
        let newUserList = listFactory(newListName);
        listArray.push(newUserList);
    };

    const removeList = (listIndex) => {   // permanently removes a list from the "master" array
        let deletedList = listArray.splice(listIndex, 1); // can use as purgatory
        console.log (deletedList);
    };

    const getLists = () => {
        console.log('Master List Array contains:');
        console.log(listArray);
    };

    return {
        listArray, addNewList, getNewListName, removeList, getLists
    };
})();

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

    renameList: function(newListName) {   // gets the user provided list name
        return this.name = newListName;
    },

    addItem: function(listItem) {
        return this.items = this.items.concat([listItem]);
    },

    removeItem: function(itemIndex) {
        return this.items.splice(itemIndex, 1);
    }
};

const itemFactory = function(title, note, date, priority, done) {
    const item = Object.create(itemFactory.proto);
    
    item.title = title;
    item.note = note;
    item.date = date;
    item.priority = priority;
    item.done = done;

    return item;
};
    
itemFactory.proto = {    
    getTitle: function() {
        return this.title;
    },

    changeTitle: function(newTitle) {
        return this.title = newTitle;
    },

    getNote: function() {
        return this.note;
    },

    changeNote: function(newNote) {
        return this.note = newNote;
    },

    getDueDate: function() {
        return this.date;
    },

    changeDueDate: function(newDueDate) {
        return this.date = newDueDate;
    },

    getPriority: function() {
        return this.priority;
    },

    changePriority: function() {
        return this.priority = (this.priority === true) ? false : true;
    },

    getDoneStatus: function() {
        return this.done;
    },

    changeDoneStatus: function() {
        return this.done = true;
    },
    
    viewDetails: function() {
        console.table([this.title, this.note, this.date, this.priority, this.done]);
    }
};

const getNewItemInfo = function() {   // gets the user provided item name
    let newItemInfoArray = [];
    let itemTitle = prompt('Please describe this item.');
    let itemNote = prompt('Add a note to this item.');
    let itemDate = prompt('When is this item due?', '9/25');
    let itemPriority = false;  
    let itemDone = false;
    
    newItemInfoArray = [itemTitle, itemNote, itemDate, itemPriority, itemDone];

    return newItemInfoArray;
};

const newItem = function(itemInfo) {   // creates a new item from user provided input
    let newUserItem = itemFactory(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4]);
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

const initList = (function() {   // initializes app with a default list
    const currentDate = new Date();

    // Initialize My List
    masterList.addNewList('My List');
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To add a list item, click the + button.', 'This line is reserved for notes.', `Due: ${currentDate.getMonth()+1}/${currentDate.getDate()} `, false));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To create a list, click on the list icon.'));

    // Initialize Buy List
    masterList.addNewList('Buy List');
    let buyInfo = itemFactory('Detergent', 'If possible, get Downy.');
    let moreBuyInfo = itemFactory('Kimchi Ramen', 'Look for extra spicy', '7/21', true, false);
    masterList.listArray[1].items = masterList.listArray[1].addItem(buyInfo);
    masterList.listArray[1].items = masterList.listArray[1].addItem(moreBuyInfo);

    // Initialize Wish List
    masterList.addNewList('Wish List');
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Nintendo Switch'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Xbox One'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('PlayStation 4'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Oculus Rift'));
})();

console.log(masterList.getLists());
