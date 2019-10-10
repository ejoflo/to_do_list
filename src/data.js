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

// debug functions
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
}

const loadStoredLists = function() {   // re-creates MasterList using localStorage save data
    const masterListStorage = JSON.parse(localStorage.getItem('masterListStored'));

    masterListStorage.listArray.forEach(function(list, mainIndex) {   // add each list
        masterList.addNewList(list.name);

        list.items.forEach(function(item, index) {   // add each list item with prototypes
            masterList.listArray[mainIndex].addItem(itemFactory(item.title, item.note, item.date, item.priority, item.done));
        });
    });
};

const saveListsToStorage = function() {   // converts masterList to string and saves to localStorage
    localStorage.clear();
    localStorage.setItem('masterListStored', JSON.stringify(masterList));   // creates a key 'MasterListStored' with the valu
};

/*
const initList = (function() {   // initializes app with a default list
    const currentDate = new Date();

    // Initialize My List
    masterList.addNewList('Example List');
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To create a list, click on + New List.'));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To add a list item, click the + button.', 'This line is for notes, and due date is below.', `${currentDate.getMonth()+1}/${currentDate.getDate()}/19`, false));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To edit the settings of a list or item, click on the ellipsis.', 'Click "edit" to make changes. Click the red "x" to delete.'));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('Click on the !!! button to prioritize an item.', undefined, undefined, true, false));
    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To mark an item as complete, click on its checkbox.', undefined, undefined, false, true));

    // Initialize Buy List
    masterList.addNewList('Buy List');
    let buyInfo = itemFactory('Kimchi Ramen', undefined, '7/21/20', true, false);
    let moreBuyInfo = itemFactory('Soft Soap', 'Get the melon scented one', undefined, false, false);
    let evenMoreBuyInfo = itemFactory('Detergent', 'If possible, get something eco-friendly');

    masterList.listArray[1].items = masterList.listArray[1].addItem(buyInfo);
    masterList.listArray[1].items = masterList.listArray[1].addItem(moreBuyInfo);
    masterList.listArray[1].items = masterList.listArray[1].addItem(evenMoreBuyInfo);

    // Initialize Wish List
    masterList.addNewList('Wish List');
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Super Nintendo Switch'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Xbox Two'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('PlayStation 5'));
    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Oculus Rift Next'));

    // Initialize Vacation Agenda
    masterList.addNewList('Vacation Itinerary');
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Check out the local music venue', 'Find out what bands are playing', '6/21/20', false, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Eat at NY pizza spot', 'Combo is highly recommended', '6/22/20', true, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Visit the old landmark', 'Located by the dog park', '6/23/20', false, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Shop at the antique store', 'Look for the wooden keychains', '6/24/20', true, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Try the artisan coffee', 'Jacob said to get the nitro brew. If Janet is working, ask her for the ultra craft cold brew.', '6/25/20', false, false));
    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Pack up your stuff :(', undefined, '6/26/20', true, false));
})();
*/

export { masterList, itemFactory, loadStoredLists, saveListsToStorage }
