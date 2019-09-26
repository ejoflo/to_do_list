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

eval("function listFactory(name) {\n    const list = Object.create(listFactory.proto);\n    list.name = name;\n    list.items = [];\n    return list;\n}\n\nlistFactory.proto = {\n    getListName: function() {\n        return this.name;\n    },\n\n    addItem: function(listItem) {\n        console.log(this.items);\n        return this.items.concat([listItem]);\n    }\n}\n\nfunction itemFactory(title, note, date, priority) {\n\tlet item = Object.create(itemFactory.proto);\n    item.title = title;\n    item.note = note;\n    item.date = date;\n    item.priority = priority;\n    return item;\n}\n    \nitemFactory.proto = {    \n    getTitle: function() {\n        return this.title;\n    },\n\n    getNote: function() {\n        return this.note;\n    },\n\n    getDate: function() {\n        return this.date;\n    },\n\n    getPriority: function() {\n        return this.priority;\n    },\n    \n    viewDetails: function() {\n        console.table([this.title, this.note, this.date, this.priority]);\n    }\n};\n\nlet taskOne = itemFactory('1. this is the name of your task', 'random note that will be entered here');\nlet taskTwo = itemFactory('2. second task reporting in', 'some note we can write', '7/21/79', true);\nlet buyList = listFactory('Buy List');\nlet wishList = listFactory('Wish List');\n\nbuyList.items = buyList.addItem(taskOne);\nbuyList.items = buyList.addItem(taskTwo);\n\nwishList.items = wishList.addItem(itemFactory('Nintendo Switch'));\nwishList.items = wishList.addItem(itemFactory('Xbox One'));\nwishList.items = wishList.addItem(itemFactory('PlayStation 4'));\nwishList.items = wishList.addItem(itemFactory('Oculus Rift'));\n\nconsole.log(buyList);\nconsole.log(wishList);\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });