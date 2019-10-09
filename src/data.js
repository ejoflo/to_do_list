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
    masterList.addNewList('Example List');
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To create a list, click on + New List.'));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To add a list item, click the + button.', 'This line is for notes, and due date is below.', `${currentDate.getMonth()+1}/${currentDate.getDate()}/19`, false));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To edit the settings of a list or item, click on the ellipsis.', 'Click "edit" to make changes. Click the red "x" to delete.'));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To mark an item as complete, click on its checkbox.', undefined, undefined, false, true));

    // Initialize Buy List
    masterList.addNewList('Buy List');
    let buyInfo = itemFactory('Detergent', 'If possible, get Downy.');
    let moreBuyInfo = itemFactory('Kimchi Ramen', undefined, '7/21/19', true, false);
    let evenMoreBuyInfo = itemFactory('Soft Soap', 'Get the melon scented one', undefined, false, false);

    masterList.listArray[1].items = masterList.listArray[1].addItem(buyInfo);
    masterList.listArray[1].items = masterList.listArray[1].addItem(moreBuyInfo);
    masterList.listArray[1].items = masterList.listArray[1].addItem(evenMoreBuyInfo);

    // Initialize Wish List
    masterList.addNewList('Wish List');
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Nintendo Switch 2'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Xbox Two'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('PlayStation 5'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Oculus Rift'));

    // Initialize Vacation Agenda
    masterList.addNewList('Vacation Itinerary');
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Check out music venue', 'Find out what bands are playing', '7/21/19', false, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Eat at new pizza spot', 'I heard their combo is dope', '7/22/19', true, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Visit the old landmark', 'Located by the dog park', '7/23/19', false, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Shop at the antique store', 'Look for the wooden keychains', '7/24/19', true, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Try the artisan coffee', 'Jacob said to get the nitro brew. If Janet is working, ask her for the ultra craft cold brew.', '7/25/19', false, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Pack up your stuff :(', 'Not looking forward to leaving', '7/26/19', true, false));
})();

console.log(masterList.getLists());

export { masterList, itemFactory }