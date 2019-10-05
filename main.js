/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const masterList = (function() {\n    const listArray = [];\n    \n    const getNewListName = () => {   // gets the user provided list name\n        let listName = prompt('What is the name of this list?');\n        return listName;\n    };\n\n    const addNewList = (newListName) => {   // create a new list from user provided input\n        let newUserList = listFactory(newListName);\n        listArray.push(newUserList);\n    };\n\n    const removeList = (listIndex) => {   // permanently removes a list from the \"master\" array\n        let deletedList = listArray.splice(listIndex, 1); // can use as purgatory\n        console.log (deletedList);\n    };\n\n    const getLists = () => {\n        console.log('Master List Array contains:');\n        console.log(listArray);\n    };\n\n    return {\n        listArray, addNewList, getNewListName, removeList, getLists\n    };\n})();\n\nconst listFactory = function(name) {\n    const list = Object.create(listFactory.proto);\n\n    list.name = name;\n    list.items = [];\n\n    return list;\n};\n\nlistFactory.proto = {\n    getListName: function() {\n        return this.name;\n    },\n\n    renameList: function(newListName) {   // gets the user provided list name\n        return this.name = newListName;\n    },\n\n    addItem: function(listItem) {\n        return this.items = this.items.concat([listItem]);\n    },\n\n    removeItem: function(itemIndex) {\n        return this.items.splice(itemIndex, 1);\n    }\n};\n\nconst itemFactory = function(title, note, date, priority, done) {\n    const item = Object.create(itemFactory.proto);\n    \n    item.title = title;\n    item.note = note;\n    item.date = date;\n    item.priority = priority;\n    item.done = done;\n\n    return item;\n};\n    \nitemFactory.proto = {    \n    getTitle: function() {\n        return this.title;\n    },\n\n    changeTitle: function(newTitle) {\n        return this.title = newTitle;\n    },\n\n    getNote: function() {\n        return this.note;\n    },\n\n    changeNote: function(newNote) {\n        return this.note = newNote;\n    },\n\n    getDueDate: function() {\n        return this.date;\n    },\n\n    changeDueDate: function(newDueDate) {\n        return this.date = newDueDate;\n    },\n\n    getPriority: function() {\n        return this.priority;\n    },\n\n    changePriority: function() {\n        return this.priority = (this.priority === true) ? false : true;\n    },\n\n    getDoneStatus: function() {\n        return this.done;\n    },\n\n    changeDoneStatus: function() {\n        return this.done = true;\n    },\n    \n    viewDetails: function() {\n        console.table([this.title, this.note, this.date, this.priority, this.done]);\n    }\n};\n\nconst getNewItemInfo = function() {   // gets the user provided item name\n    let newItemInfoArray = [];\n    let itemTitle = prompt('Please describe this item.');\n    let itemNote = prompt('Add a note to this item.');\n    let itemDate = prompt('When is this item due?', '9/25');\n    let itemPriority = false;  \n    let itemDone = false;\n    \n    newItemInfoArray = [itemTitle, itemNote, itemDate, itemPriority, itemDone];\n\n    return newItemInfoArray;\n};\n\nconst newItem = function(itemInfo) {   // creates a new item from user provided input\n    let newUserItem = itemFactory(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4]);\n    return newUserItem;\n};\n\nconst addItemToList = function(listName, item) {   // adds an item to a specified list\n    listName.items = listName.addItem(item);\n    return listName.items;\n}\n\nconst assignItemToList = function(fromListName, itemIndex, toListName) {   // assigns item from one list to another\n    let itemToMove = fromListName.items.splice(itemIndex, 1);\n    toListName.items.push(itemToMove[0]);\n    console.log(toListName);\n}\n\nconst initList = (function() {   // initializes app with a default list\n    const currentDate = new Date();\n\n    // Initialize My List\n    masterList.addNewList('My List');\n    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To add a list item, click the + button.', 'This line is reserved for notes.', `Due: ${currentDate.getMonth()+1}/${currentDate.getDate()} `, false));\n    masterList.listArray[0].items = masterList.listArray[0].addItem(itemFactory('To create a list, click on + New List.'));\n\n    // Initialize Buy List\n    masterList.addNewList('Buy List');\n    let buyInfo = itemFactory('Detergent', 'If possible, get Downy.');\n    let moreBuyInfo = itemFactory('Kimchi Ramen', 'Look for extra spicy', '7/21', true, false);\n    let evenMoreBuyInfo = itemFactory('Soft Soap', 'Get the melon scented one', '10/25', true, false);\n\n    masterList.listArray[1].items = masterList.listArray[1].addItem(buyInfo);\n    masterList.listArray[1].items = masterList.listArray[1].addItem(moreBuyInfo);\n    masterList.listArray[1].items = masterList.listArray[1].addItem(evenMoreBuyInfo);\n\n    // Initialize Wish List\n    masterList.addNewList('Wish List');\n    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Nintendo Switch'));\n    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Xbox One'));\n    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('PlayStation 4'));\n    masterList.listArray[2].items = masterList.listArray[2].addItem(itemFactory('Oculus Rift'));\n\n    // Initialize Vacation Agenda\n    masterList.addNewList('Vacation Itinerary');\n    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Check out music venue', 'Find out what bands are playing', '7/21', true, false));\n    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Eat at new pizza spot', 'I heard their combo is dope', '7/22', true, false));\n    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Visit the old landmark', 'Located by the dog park', '7/23', true, false));\n    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Shop at the antique store', 'Look for the wooden keychains', '7/24', true, false));\n    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Try the artisan coffee', 'Jacob said to get the nitro brew. If Janet is working, ask her for the ultra craft cold brew.', '7/25', true, false));\n    masterList.listArray[3].items = masterList.listArray[3].addItem(itemFactory('Pack up your stuff :(', 'Not looking forward to leaving', '7/26', true, false));\n})();\n\nconsole.log(masterList.getLists());\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });