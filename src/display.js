import { masterList, itemFactory } from './data.js';

const content = document.getElementById('content');
const main = document.createElement('div');
const listGrid = document.createElement('div');
const itemsGrid = document.createElement('div');

// creates html elements for the listSettings and items
const createDisplay = function() {
    main.setAttribute('id', 'main');
    listGrid.setAttribute('id', 'listGrid');
    itemsGrid.setAttribute('id', 'itemsGrid');
    
    content.appendChild(main);
    main.appendChild(listGrid);
    main.appendChild(itemsGrid);
};

// creates an input box when clicking + New List
const displayNewListInput = function() {
    const newListInput = document.createElement('input');
    const newListInputConfirmBtn = document.createElement('button');
    const newListInputCancelBtn = document.createElement('button');

    newListInput.setAttribute('type', 'text');   
    newListInput.classList.add(`newListInput`);
    newListInput.setAttribute('name', 'newListName');
    newListInput.setAttribute('placeholder', 'Name your list');
    newListInput.setAttribute('size', '10');
    newListInput.setAttribute('maxlength', '30');

    listGrid.removeChild(listGrid.firstChild);
    listGrid.insertAdjacentElement('afterbegin', newListInput);   // replace + New List with a New List input box
    
    newListInput.insertAdjacentElement('afterend', newListInputConfirmBtn);   // create a confirmation button next to New List input
    newListInputConfirmBtn.classList.add('newListInputConfirmBtn');
    newListInputConfirmBtn.textContent = '+';

    newListInputConfirmBtn.insertAdjacentElement('afterend', newListInputCancelBtn);   // create a cancel button next to confirm button
    newListInputCancelBtn.classList.add('newListInputCancelBtn');
    newListInputCancelBtn.textContent = 'x';

    newListInput.focus();
};

// creates an input box when clicking + New item
const displayNewItemInput = function() {
    const newItemInputTitle = document.createElement('input');
    const newItemInputCancelBtn = document.createElement('button');
    const newItemArea = document.querySelector('.newItem');

    newItemInputTitle.setAttribute('type', 'text');   // create a new item title input box
    newItemInputTitle.classList.add(`newItemInput`);
    newItemInputTitle.setAttribute('name', 'newItemTitle');
    newItemInputTitle.setAttribute('placeholder', 'Describe your item here');
    newItemInputTitle.setAttribute('size', '10');
    newItemInputTitle.setAttribute('maxlength', '150');

    newItemArea.replaceWith(newItemInputTitle);

    newItemInputTitle.insertAdjacentElement('afterend', newItemInputCancelBtn);   // create a cancel button next to confirm button
    newItemInputCancelBtn.classList.add('newItemInputCancelBtn');
    newItemInputCancelBtn.textContent = 'X';

    newItemInputTitle.focus();
};

// creates an input box for a new note when clicking + New item
const displayNewItemInputNote = function() {
    const newItemInputNote = document.createElement('input');

    newItemInputNote.setAttribute('type', 'text');   // create a new item note input box
    newItemInputNote.classList.add(`newItemInputNote`);
    newItemInputNote.setAttribute('name', 'newItemNote');
    newItemInputNote.setAttribute('placeholder', 'Add a note here');
    newItemInputNote.setAttribute('size', '10');
    newItemInputNote.setAttribute('maxlength', '150');

    document.querySelector('.newItemInput').insertAdjacentElement('afterend', newItemInputNote);
};

// creates an input box for a due date when clicking + New item
const displayNewItemInputDate = function() {
    const newItemInputDate = document.createElement('div');
    const newItemInputDateHeader = document.createElement('p');
    const newItemInputDateMonth = document.createElement('input');
    const newItemInputDateDay = document.createElement('input');
    const newItemInputDateYear = document.createElement('input');

    newItemInputDate.setAttribute('id', 'newItemInputDate');

    newItemInputDateHeader.classList.add(`newItemInputDateValue`);
    newItemInputDateHeader.style.cssText = 'font-size: 8pt; font-weight: bold; color: rgb(198, 78, 116)';
    newItemInputDateHeader.textContent = 'Due Date:';
    
    newItemInputDateMonth.setAttribute('type', 'text');
    newItemInputDateMonth.classList.add(`newItemInputDateValue`);
    newItemInputDateMonth.setAttribute('name', 'newItemDateMonth');
    newItemInputDateMonth.setAttribute('placeholder', 'MM');
    newItemInputDateMonth.setAttribute('size', '2');
    newItemInputDateMonth.setAttribute('maxlength', '2');

    newItemInputDateDay.setAttribute('type', 'text');   // create a new item note input box
    newItemInputDateDay.classList.add(`newItemInputDateValue`);
    newItemInputDateDay.setAttribute('name', 'newItemDateDay');
    newItemInputDateDay.setAttribute('placeholder', 'DD');
    newItemInputDateDay.setAttribute('size', '2');
    newItemInputDateDay.setAttribute('maxlength', '2');

    newItemInputDateYear.setAttribute('type', 'text');   // create a new item note input box
    newItemInputDateYear.classList.add(`newItemInputDateValue`);
    newItemInputDateYear.setAttribute('name', 'newItemDateYear');
    newItemInputDateYear.setAttribute('placeholder', 'YY');
    newItemInputDateYear.setAttribute('size', '2');
    newItemInputDateYear.setAttribute('maxlength', '2');

    document.querySelector('.newItemInputNote').insertAdjacentElement('afterend', newItemInputDate);
    newItemInputDate.appendChild(newItemInputDateHeader);
    newItemInputDate.appendChild(newItemInputDateMonth);
    newItemInputDate.appendChild(newItemInputDateDay);
    newItemInputDate.appendChild(newItemInputDateYear);
};

// returns the new list name
const appendNewList = function() {
    const newListToAdd = document.getElementsByClassName('newListInput');
    const newListName = newListToAdd.newListName;
    let newNameOfList = newListName.value;

    if (newNameOfList === '') {
        alert("Name of list can't be empty.");
        listGrid.firstChild.focus();   // put focus back on input box
        return false;
    } else {
        return newNameOfList;
    }
};

// returns the new item title
const appendNewItem = function() {
    const newItemToAdd = document.getElementsByClassName('newItemInput');
    const newItemNoteToAdd = document.getElementsByClassName('newItemInputNote');
    const newItemDate = document.querySelectorAll('.newItemInputDateValue');
    const newItemTitle = newItemToAdd.newItemTitle;
    const newItemNote = newItemNoteToAdd.newItemNote;

    let newTitleOfItem = newItemTitle.value;
    let newNoteOfItem = newItemNote.value;
    let newDateMonthOfItem = newItemDate[1].value;
    let newDateDayOfItem = newItemDate[2].value;
    let newDateYearOfItem = newItemDate[3].value;
    let itemInfo = [newTitleOfItem, newNoteOfItem, `${newDateMonthOfItem}/${newDateDayOfItem}/${newDateYearOfItem}`];

    if (newTitleOfItem === '') {
        alert("Name of item can't be empty.");
        itemsGrid.firstChild.nextSibling.focus();   // put focus back on input box
        return false;
    
    // check to see if the characters entered are digits
    } else if (newDateMonthOfItem.charCodeAt(0) < 48 || newDateMonthOfItem.charCodeAt(0) > 57
        || newDateMonthOfItem.charCodeAt(1) < 48 || newDateMonthOfItem.charCodeAt(1) > 57
        || newDateDayOfItem.charCodeAt(0) < 48 || newDateDayOfItem.charCodeAt(0) > 57
        || newDateDayOfItem.charCodeAt(1) < 48 || newDateDayOfItem.charCodeAt(1) > 57
        || newDateYearOfItem.charCodeAt(0) < 48 || newDateYearOfItem.charCodeAt(0) > 57
        || newDateYearOfItem.charCodeAt(1) < 48 || newDateYearOfItem.charCodeAt(1) > 57)  {
        alert("Please enter a valid date.");
        return false;
    
    // check to see if the characters entered are valid values for dates
    } else if (newDateMonthOfItem === '' || newDateMonthOfItem < 1 || newDateMonthOfItem > 12
        || newDateDayOfItem === '' || newDateDayOfItem < 1 || newDateDayOfItem > 31 
        || newDateYearOfItem === '' || newDateYearOfItem < 0 || newDateYearOfItem.length < 2) {
        alert("Please enter a valid date.");
        return false;

    } else {
        return itemInfo;
    }
};

// creates an input box for editing a list name
const displayEditListInput = function(listIndex) {
    const editListInput = document.createElement('input');
    const listToEdit = document.querySelector(`.list${listIndex}`);

    editListInput.setAttribute('type', 'text');   
    editListInput.classList.add(`editListInput${listIndex}`);
    editListInput.setAttribute('name', 'editListName');
    editListInput.setAttribute('size', '10');
    editListInput.setAttribute('maxlength', '30');
    
    listToEdit.replaceWith(editListInput);
    editListInput.value = masterList.listArray[listIndex].name;
    editListInput.focus();
};

// creates an input box for editing an item title
const displayEditItemInput = function(listIndex, itemIndex) {
    const editItem = document.createElement('p');
    const editItemInputTitle = document.createElement('input');
    const editItemInputNote = document.createElement('input');
    const itemTitleToEdit = document.querySelector(`#item${itemIndex}`);
    // const itemNoteToEdit = document.querySelector(`.note${itemIndex}`);

    editItem.setAttribute('id', `editItem${itemIndex}`);

    editItemInputTitle.setAttribute('type', 'text');   // create a new item title input box
    editItemInputTitle.classList.add(`editItemInputTitle${itemIndex}`);
    editItemInputTitle.setAttribute('name', 'editItemTitle');
    editItemInputTitle.setAttribute('size', '10');
    editItemInputTitle.setAttribute('maxlength', '150');

    editItemInputNote.setAttribute('type', 'text');   // create a new item note input box
    editItemInputNote.classList.add(`editItemInputNote${itemIndex}`);
    editItemInputNote.setAttribute('name', 'editItemNote');
    editItemInputNote.setAttribute('size', '10');
    editItemInputNote.setAttribute('maxlength', '150');
    
    itemTitleToEdit.replaceWith(editItem);
    editItem.appendChild(editItemInputTitle);

    editItemInputTitle.value = masterList.listArray[listIndex].items[itemIndex].title;
    editItemInputNote.value = masterList.listArray[listIndex].items[itemIndex].note;
    
    if (editItemInputNote.value !== 'undefined') {
        editItem.appendChild(editItemInputNote);
        // editItemInputTitle.insertAdjacentElement('afterend', editItemInputNote);
    }
    
    editItemInputTitle.focus();
}

// returnes the edited list name
const updateListName = function(listIndex) {
    const listToEdit = document.getElementsByClassName(`editListInput${listIndex}`);
    const updatedListName = listToEdit.editListName;   // the "name" property of the <input>

    let newNameOfList = updatedListName.value;

    if (newNameOfList === '') {
        alert("Name of list can't be empty.");
        return false;
    } else {
        return newNameOfList;
    }
};

// creates an edit "confirm" button
const displayEditListButtons = function(listIndex) {
    const editButton = document.createElement('button');

    document.querySelector(`.listEditBtn${listIndex}`).remove();
    document.querySelector(`.listSettingsBtn${listIndex}`).insertAdjacentElement('afterend', editButton).classList.add(`editSaveBtn${listIndex}`);
    document.querySelector(`.listSettingsBtn${listIndex}`).nextSibling.textContent = 'SAVE';
};

// creates and displays the + New List button
const displayNewListButton = function() {
    const newListBtn = document.createElement('p');

    listGrid.insertAdjacentElement('afterbegin', newListBtn);
    newListBtn.classList.add(`newList`);
    newListBtn.textContent = '+ New List';
};

// creates list settings buttons: edit and delete
const displayListButtons = function() {
    const listSettings = document.querySelectorAll("[class^='listSettingsBtn']");

    listSettings.forEach((list, listIndex) => {
        list.insertAdjacentElement('afterend', document.createElement('button'));
        list.nextSibling.classList.add(`listEditBtn${listIndex}`);
        list.nextSibling.textContent = 'EDIT';
        
        list.nextSibling.insertAdjacentElement('afterend', document.createElement('button'));
        list.nextSibling.nextSibling.classList.add(`listDeleteBtn${listIndex}`);
        list.nextSibling.nextSibling.textContent = 'X';
    });
};

// creates item settings buttons
const displayItemsButtons = function() {
    const itemSettings = document.querySelectorAll("[class^='itemSettingsBtn']");

    itemSettings.forEach((item, itemIndex) => {
        item.insertAdjacentElement('afterend', document.createElement('button'));
        item.nextSibling.classList.add(`itemEditBtn${itemIndex}`);
        item.nextSibling.textContent = 'EDIT';
        
        item.nextSibling.insertAdjacentElement('afterend', document.createElement('button'));
        item.nextSibling.nextSibling.classList.add(`itemDeleteBtn${itemIndex}`);
        item.nextSibling.nextSibling.textContent = 'X';
    });
};

// creates and fills the page with all lists
const displayListGrid = function() {
    displayNewListButton();

    masterList.listArray.forEach((list, index, theListArray) => {   // populate the list grid with all listSettings in master array
        listGrid.appendChild(document.createElement('p')).classList.add(`list${index}`);
        document.querySelector(`.list${index}`).textContent = list.name;
    });

    const listSettings = document.querySelectorAll("[class^='list']");
    const settingsSymbol = '\u{22EE}'; // the ellipsis: ⋮

    listSettings.forEach((list, listIndex) => {   // create a settings button next to each list
        list.insertAdjacentElement('afterend', document.createElement('button')); 
        list.nextSibling.classList.add(`listSettingsBtn${listIndex}`);
        list.nextSibling.textContent = settingsSymbol;
    });
};

// highlights the current selected list
const highlightList = function(listIndex) {
    document.querySelector(`.list${listIndex}`).classList.add('currentList');
};

// display the current list's items
const displayItemsGrid = function(listIndex) {   
    const newItemBtn = document.createElement('button');
    const blankItem = document.createElement('p');
    const prioritySymbol = '\u{2691}';   // warning sign ⚠
    const settingsSymbol = '\u{22EE}';   // the ellipsis: ⋮
    
    itemsGrid.appendChild(newItemBtn);  // create a new item button
    newItemBtn.classList.add(`newItemButton`);
    newItemBtn.textContent = '+';
    itemsGrid.appendChild(blankItem).classList.add(`newItem`);   // create a new blank item

    if (listIndex >= 0) {   // if there is at least 1 list on the page 
    masterList.listArray[listIndex].items.forEach((item, index, itemsArray) => {   // render all items to the list
        const itemCheckBox = document.createElement('button');
        const itemTitle = document.createElement('p');
        const itemDate = document.createElement('p');
        const itemNote = document.createElement('p');
        const itemPriority = document.createElement('p');
        const itemSettingsBtn = document.createElement('button');
        
        itemsGrid.appendChild(itemCheckBox).classList.add(`itemCheck${index}`);   // create a checkbox for every item
        itemsGrid.appendChild(itemTitle).setAttribute('id', `item${index}`);   // create a <p> element with class "item" for every item
        itemsGrid.appendChild(itemPriority);
        itemsGrid.appendChild(itemSettingsBtn).classList.add(`itemSettingsBtn${index}`);   // create an item settings button for every item

        itemCheckBox.textContent = ``;
        itemTitle.textContent = `${item.title}`;
        itemPriority.textContent = `!!!`;
        itemSettingsBtn.textContent = settingsSymbol;

        if (item.priority === false || item.priority === undefined) {
            itemPriority.classList.add(`notPriority${index}`);   // create a <p> element with priority inactive

        } else {
            itemTitle.classList.add('itemPriority');   // change item color to red
            itemPriority.classList.add(`priority${index}`);   // create a <p> element with priority active
        }

        if (item.note !== undefined && item.date !== undefined) {   // if a date and note exists
            itemTitle.insertAdjacentElement('beforeend', itemNote);
            itemNote.insertAdjacentElement('afterend', itemDate)
            itemNote.classList.add(`note${index}`);   
            itemDate.classList.add(`date${index}`);
            itemNote.textContent = `${item.note}`;
            itemDate.textContent = `Due: ${item.date}`;

        } else if (item.note !== undefined) {   // if only a note exists
            itemTitle.insertAdjacentElement('beforeend', itemNote);
            itemNote.classList.add(`note${index}`);
            itemNote.textContent = `${item.note}`;

        } else if (item.date !== undefined) {   // if only a due date exists
            itemTitle.insertAdjacentElement('beforeend', itemDate);
            itemDate.classList.add(`date${index}`);
            itemDate.textContent = `Due: ${item.date}`;
        }   

        if (item.done === true) {
            itemTitle.classList.add('itemDone');   // create a <p> element with "done" inactive
            itemCheckBox.classList.add('itemCheckDone');
            itemCheckBox.textContent = `X`;

        } else {
            itemTitle.classList.remove('itemDone');
            itemCheckBox.classList.remove('itemCheckDone');
        }
    });
    }
};

// wipe the list and items grids clean
const refreshDisplay = function() {
    document.querySelectorAll('#itemsGrid').forEach((item, itemIndex) => {
        while (itemsGrid.firstChild) {
            itemsGrid.removeChild(itemsGrid.firstChild);
        }
    });

    document.querySelectorAll('#listGrid').forEach((list, itemIndex) => {
        while (listGrid.firstChild) {
            listGrid.removeChild(listGrid.firstChild);
          }
    });
};

// create button listeners for the list grid
const createListeners = (function() {
    let lastClickedList = 0;   // store the last clicked list
    let deletedList;
    let addNewItemBtnClicked = false;
    let listSettingBtnClicked = false;

    const startListListeners = function() {
        listGrid.addEventListener('click', clickListGrid, false);
        itemsGrid.addEventListener('click', clickItemGrid, false);

        const getTargetIndex = function(event, listElement) {   // return the index of a clicked element
            let targetIndex = '';
            
            if (listElement && listElement.indexOf('currentList') === -1) {   // checks if an index has been passed. if not, gets index from element click.
                targetIndex = String(listElement).replace(/[^0-9]/g,'');
            
            } else if (listElement && listElement.indexOf('currentList') > -1) {   // checks if an index has been passed and if it is the current list
                targetIndex = String(listElement).replace(/[^0-9]/g,'');
            
            } else if (event.target.className.indexOf('currentList') > -1) {
                targetIndex = String(event.target.className).replace(/[^0-9]/g,'');

            } else {
                targetIndex = String(event.target.className).replace(/[^0-9]/g,'');
            }
            return +targetIndex;
        };
        
        function clickListGrid(e) {   // handles all clicks on the Lists
            const lists = listGrid.querySelectorAll("p[class^='list']");
            let listElements = Array.from(lists);   // put all .list elements in an array

            if (listElements.indexOf(e.target) >= 0 && e.target !== e.currentTarget) {   // click a list element
                lastClickedList = getTargetIndex(e, e.target.className);
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex(e));
                highlightList(getTargetIndex(e));

            } else if (e.target.className === 'newList' && e.target !== e.currentTarget) {   // click the "new list" button
                displayNewListInput();

            } else if (e.target.className === 'newListInputConfirmBtn' && e.target !== e.currentTarget) {   // click the "add new list" button
                // document.querySelector('.newListInput').focus();

                if (appendNewList() !== false) {   // if the new list name is not empty
                    masterList.addNewList(appendNewList());
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(getTargetIndex(e, listGrid.lastChild.className));
                    highlightList(getTargetIndex(e, listGrid.lastChild.className));
                    lastClickedList = getTargetIndex(e, listGrid.lastChild.className);
                }

            } else if (e.target.className === 'newListInputCancelBtn' && e.target !== e.currentTarget) {   // click the "cancel new list" button
                if (e.target.className === listGrid.lastChild.className) {
                    refreshDisplay();
                    displayNewListButton();
                    displayItemsGrid();

                } else {
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                }
            }
            
            if (listSettingBtnClicked === true) {   // handles all clicks on the list settings
            
                if (e.target.className.indexOf('listEditBtn') > -1 && e.target !== e.currentTarget) {   // press the edit list button    
                    lastClickedList = getTargetIndex(e, e.target.className);   // gets the index of list whose edit button was clicked

                    if (e.target.className !== `editSaveBtn${lastClickedList}`) {
                        displayEditListInput(lastClickedList);
                        displayEditListButtons(lastClickedList);  // might be better to revert to changing the classname to editSaveBtn${listIndex}.
                        listSettingBtnClicked = true;
                    } 

                } else if (e.target.className === `editSaveBtn${getTargetIndex(e, e.target.className)}` && e.target !== e.currentTarget) {
                    lastClickedList = getTargetIndex(e, e.target.className);   // gets the index of list whose edit button was clicked
                    masterList.listArray[lastClickedList].renameList(updateListName(lastClickedList));
                    lastClickedList = getTargetIndex(e, e.target.className);   // gets the index of list whose save button was clicked
                    refreshDisplay();
                    displayListGrid();
                    displayListButtons();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                    listSettingBtnClicked = true;

                } else if (e.target.className.indexOf('listDeleteBtn') > -1 && e.target !== e.currentTarget) {   // press the delete list button and remove the list based on its index
                    deletedList = getTargetIndex(e);
                    masterList.removeList(getTargetIndex(e));
                    refreshDisplay();
                    displayListGrid();

                    if (listGrid.lastChild.className === 'newList') {   // all lists were deleted
                        displayItemsGrid();   // just show the "add item" button and empty item

                    } else if (getTargetIndex(e, e.target.className) < lastClickedList || deletedList > getTargetIndex(e, listGrid.lastChild.className) && getTargetIndex(e, e.target.className) === lastClickedList) {
                        lastClickedList--;
                        displayItemsGrid(lastClickedList);
                        highlightList(lastClickedList);
                    
                    } else if (getTargetIndex(e, e.target.className) > lastClickedList || getTargetIndex(e, e.target.className) === lastClickedList) {
                        displayItemsGrid(lastClickedList);
                        highlightList(lastClickedList);
                    }
                    listSettingBtnClicked = false;

                } else if (e.target.className !== `editListInput${getTargetIndex(e, e.target.className)}`) {   // refresh the list if the list settings button was clicked
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                    listSettingBtnClicked = false;
                }

            } else if (e.target.className === `listSettingsBtn${getTargetIndex(e, e.target.className)}`) {   // if the list settings button is not open
                listSettingBtnClicked = true;
                refreshDisplay();
                displayListGrid();
                displayListButtons();
                displayItemsGrid(lastClickedList);
                highlightList(lastClickedList);
            }
            e.stopPropagation();
        }

        function clickItemGrid(e) {   // handles all clicks on the items

            // click on + new item button
            if (addNewItemBtnClicked === true && itemsGrid.firstChild.nextSibling.className === 'newItem') {   // if clicking on something after clicking the + button
                
                console.log('conditional');
                console.log(itemsGrid.firstChild.nextSibling.nextSibling);
                
                addNewItemBtnClicked = false;
                displayNewItemInput();
                displayNewItemInputNote();

            } else if (e.target.className === 'newItemButton' && addNewItemBtnClicked === false) {
                addNewItemBtnClicked = true;
                displayNewItemInput();
                displayNewItemInputNote();
                displayNewItemInputDate();

            } else if (e.target.className === 'newItemButton' && addNewItemBtnClicked === true) {

                if (appendNewItem() !== false) {   // if the new item name is not empty
                    masterList.listArray[lastClickedList].items = masterList.listArray[lastClickedList].addItem(itemFactory(appendNewItem()[0], appendNewItem()[1], appendNewItem()[2]));
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                    addNewItemBtnClicked = false;
                }

            } else if (e.target.className === 'newItemInputCancelBtn') {   // new item cancel button is clicked
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(lastClickedList);
                highlightList(lastClickedList);
                addNewItemBtnClicked = false;
            }

            // click on the item settings button
            if (e.target.className === `itemSettingsBtn${getTargetIndex(e, e.target.className)}`) {
                displayItemsButtons();
            }

            console.log(e.target.className);

            // click on the item
            if (e.target.id === `item${getTargetIndex(e, e.target.id)}`) {
                // console.log(`you clicked on item ${getTargetIndex(e, e.target.className)}`);
                displayEditItemInput(lastClickedList, getTargetIndex(e, e.target.id));
            }

            // click on the item's priority
            if (e.target.className === `notPriority${getTargetIndex(e, e.target.className)}`) {
                masterList.listArray[lastClickedList].items[getTargetIndex(e, e.target.className)].priority = true;
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                    addNewItemBtnClicked = false;
            } else if (e.target.className === `priority${getTargetIndex(e, e.target.className)}`) {
                masterList.listArray[lastClickedList].items[getTargetIndex(e, e.target.className)].priority = false;
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                    addNewItemBtnClicked = false;
            }

            // click on item checkbox
            // if (e.target.className === `itemCheck${getTargetIndex(e, e.target.className)}`) { 
            if (e.target.className.indexOf('itemCheck') > -1) { 
                // make the item red/checked
                if (masterList.listArray[lastClickedList].items[getTargetIndex(e, e.target.className)].done !== true) {
                    masterList.listArray[lastClickedList].items[getTargetIndex(e, e.target.className)].done = true;
                 
                } else if (e.target.className.indexOf('itemCheckDone') > -1) {
                    console.log(e.target.classList);
                    masterList.listArray[lastClickedList].items[getTargetIndex(e, e.target.className)].done = false;
                    // e.target.classList.remove('itemDone');
                }

                console.log(`you clicked on item checkbox ${getTargetIndex(e, e.target.className)}`);
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(lastClickedList);
                highlightList(lastClickedList);
                addNewItemBtnClicked = false;
            }
            e.stopPropagation();
        }
    } 
    return { 
        startListListeners 
    };
})();

// initializes app display
const initDisplay = (() => {
    const appHeader = document.createElement('h1');   // create the header
    const checkMark = '\u{2713}';   // the ellipsis: ⋮

    appHeader.textContent = `${checkMark} DO.`;
    content.insertBefore(appHeader, main.childNodes[0]);

    createDisplay();
    displayListGrid();
    displayItemsGrid(0);
    highlightList(0);
    createListeners.startListListeners();
})();

export { initDisplay }
