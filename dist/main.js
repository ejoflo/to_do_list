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

eval("let listArray = [];\n\n\nconst listFactory = function(name) {\n    const list = Object.create(listFactory.proto);\n\n    list.name = name;\n    list.items = [];\n\n    return list;\n};\n\nlistFactory.proto = {\n    getListName: function() {\n        return this.name;\n    },\n\n    addItem: function(listItem) {\n        const itemArray = this.items.concat([listItem]);\n        // console.log(this.items);\n        return itemArray;\n    }\n};\n\nconst getNewListName = function() {   // gets the user provided list name\n    let listName = prompt('What is the name of this list?');\n    return listName;\n}\n\nconst newList = function(listName) {   // create a new list from user provided input\n    let newUserList = listFactory(listName);\n    return newUserList;\n};\n\nconst removeList = function(listIndex) {   // permanently removes a list from the \"master\" array\n    let updatedArray = listArray.splice(listIndex, 1); // can use as purgatory\n    return updatedArray;\n};\n\nconst itemFactory = function(title, note, date, priority) {\n    const item = Object.create(itemFactory.proto);\n    \n    item.title = title;\n    item.note = note;\n    item.date = date;\n    item.priority = priority;\n\n    return item;\n};\n    \nitemFactory.proto = {    \n    getTitle: function() {\n        return this.title;\n    },\n\n    getNote: function() {\n        return this.note;\n    },\n\n    getDate: function() {\n        return this.date;\n    },\n\n    getPriority: function() {\n        return this.priority;\n    },\n\n    changePriority: function() {\n        console.log(this);\n        console.log(this.priority);\n        return this.priority = (this.priority === true) ? false : true;\n\n    },\n    \n    viewDetails: function() {\n        console.table([this.title, this.note, this.date, this.priority]);\n    }\n};\n\nconst getNewItemInfo = function() {   // gets the user provided item name\n    let newItemInfoArray = [];\n    let itemTitle = prompt('Please describe this item.');\n    let itemNote = prompt('Add a note to this item.');\n    let itemDate = prompt('When is this item due?', '9/25');\n    // let itemPriority = prompt('Is this a priorty?', 'true or false') === 'true' ? true : false;  \n    let itemPriority = false;  \n    \n    newItemInfoArray = [itemTitle, itemNote, itemDate, itemPriority];\n\n    return newItemInfoArray;\n};\n\nconst newItem = function(itemInfo) {   // creates a new item from user provided input\n    let newUserItem = itemFactory(itemInfo[0],itemInfo[1],itemInfo[2],itemInfo[3]);\n    return newUserItem;\n};\n\nconst addItemToList = function(listName, item) {   // adds an item to a specified list\n    listName.items = listName.addItem(item);\n    return listName.items;\n}\n\nconst assignItemToList = function(fromListName, itemIndex, toListName) {   // assigns item from one list to another\n    let itemToMove = fromListName.items.splice(itemIndex, 1);\n    toListName.items.push(itemToMove[0]);\n    console.log(toListName);\n\n}\n\nconst markItemComplete = function(obj) {\n\n};\n\nconst initList = (function() {   // initializes app with a default list\n    const myList = listFactory('My List');\n    const currentDate = new Date();\n\n    myList.items = myList.addItem(itemFactory('To add a list item, click the + button.', 'This line is reserved for notes.', `Due: ${currentDate.getMonth()+1}/${currentDate.getDate()} `, false));\n    myList.items = myList.addItem(itemFactory('To create a list, click on the list icon.'));\n    listArray.push(myList);\n})();\n\n\nlet buyInfo = itemFactory('Detergent', 'If possible, get Downy.');\nlet moreBuyInfo = itemFactory('Kimchi Ramen', 'Look for extra spicy', '7/21', true);\nlet buyList = listFactory('Buy List');\nlet wishList = listFactory('Wish List');\n\nbuyList.items = buyList.addItem(buyInfo);\nbuyList.items = buyList.addItem(moreBuyInfo);\n\nwishList.items = wishList.addItem(itemFactory('Nintendo Switch'));\nwishList.items = wishList.addItem(itemFactory('Xbox One'));\nwishList.items = wishList.addItem(itemFactory('PlayStation 4'));\nwishList.items = wishList.addItem(itemFactory('Oculus Rift'));\n\n// add all lists to a \"master\" list array\nlistArray.push(wishList);\nlistArray.push(buyList);\n\nconsole.log(buyList);\nconsole.log(wishList);\nconsole.log(listArray);\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });