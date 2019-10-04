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
    const newListInputBtn = document.createElement('button');
    const newListInputCancelBtn = document.createElement('button');

    newListInput.setAttribute('type', 'text');   
    newListInput.classList.add(`newListInput`);
    newListInput.setAttribute('name', 'newListName');
    newListInput.setAttribute('size', '10');
    newListInput.setAttribute('maxlength', '30');

    listGrid.removeChild(listGrid.firstChild);
    listGrid.insertAdjacentElement('afterbegin', newListInput);   // replace + New List with a New List input box
    
    newListInput.insertAdjacentElement('afterend', newListInputBtn);   // create a confirmation button next to New List input
    newListInputBtn.classList.add('newListInputBtn');
    newListInputBtn.textContent = '+';

    newListInputBtn.insertAdjacentElement('afterend', newListInputCancelBtn);   // create a confirmation button next to New List input
    newListInputCancelBtn.classList.add('newListInputCancelBtn');
    newListInputCancelBtn.textContent = 'X';

    newListInput.focus();
};

const appendNewList = function() {
    const newListToAdd = document.getElementsByClassName('newListInput');
    const newListName = newListToAdd.newListName;
    let newNameOfList = newListName.value;

    if (newNameOfList === '') {
        alert("Name of list can't be empty.");
        return false;
    } else {
        return newNameOfList;
    }
};

const displayEditListInput = function(listIndex) {
    const editListInput = document.createElement('input');
    const listToEdit = document.querySelector(`.list${listIndex}`);

    editListInput.setAttribute('type', 'text');   
    editListInput.classList.add(`editListInput`);
    editListInput.setAttribute('name', 'editListName');
    editListInput.setAttribute('size', '10');
    editListInput.setAttribute('maxlength', '30');
    
    listToEdit.replaceWith(editListInput);
    editListInput.value = masterList.listArray[listIndex].name;
    editListInput.focus();

    // replace listEditBtn*
    // replace listDeleteBtn*

    // get the index of listElement that was passed
    // remove all elements with that index
    // insert the edit input box where the old element was
    
/*
    newListInput.insertAdjacentElement('afterend', newListInputBtn);   // create a confirmation button next to New List input
    newListInputBtn.classList.add('newListInputBtn');
    newListInputBtn.textContent = '+';

    newListInputBtn.insertAdjacentElement('afterend', newListInputCancelBtn);   // create a confirmation button next to New List input
    newListInputCancelBtn.classList.add('newListInputCancelBtn');
    newListInputCancelBtn.textContent = 'X';
*/


    // replace the "list to edit" with an input box containing its name
    // change the "EDIT" button to a confirmation button
    // change the "DELETE" button to a cancel
    // confirmation saves the name and updates the master list array
    // clicking 

};

const updateListName = function() {
    const listToEdit = document.getElementsByClassName('editListInput');
    const updatedListName = listToEdit.editListName;   // the "name" property of the <input>

    console.log(document.getElementsByClassName('editListInput'));

    console.log(updatedListName);

    let newNameOfList = updatedListName.value;

    if (newNameOfList === '') {
        alert("Name of list can't be empty.");
        return false;
    } else {
        return newNameOfList;
    }
};

const displayEditListButtons = function(listIndex) {
    const editButton = document.createElement('button');

    document.querySelector(`.listEditBtn${listIndex}`).remove();
    document.querySelector(`.listSettingsBtn${listIndex}`).insertAdjacentElement('afterend', editButton).classList.add(`editConfirmBtn${listIndex}`);
    document.querySelector(`.listSettingsBtn${listIndex}`).nextSibling.textContent = 'SAVE';
}

// creates and displays the + New List button
const displayNewListButton = function() {
    const newListBtn = document.createElement('p');

    listGrid.insertAdjacentElement('afterbegin', newListBtn);
    newListBtn.classList.add(`newList`);
    newListBtn.textContent = '+ New List';
};

const displayListButtons = function() {
    const listSettings = document.querySelectorAll("[class^='listSettingsBtn']");

    listSettings.forEach((list, listIndex) => {   // create edit and delete buttons next to each list
        list.insertAdjacentElement('afterend', document.createElement('button'));
        list.nextSibling.classList.add(`listEditBtn${listIndex}`);
        list.nextSibling.textContent = 'E';
        
        list.nextSibling.insertAdjacentElement('afterend', document.createElement('button'));
        list.nextSibling.nextSibling.classList.add(`listDeleteBtn${listIndex}`);
        list.nextSibling.nextSibling.textContent = '-';
    });
};

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

const highlightList = function(listIndex) {
    document.querySelector(`.list${listIndex}`).classList.add('currentList');   // highlight the current selected list
}

// display the current list's items
const displayItemsGrid = function(listIndex) {   
    const newItemBtn = document.createElement('button');
    const blankItem = document.createElement('p');
    
    itemsGrid.appendChild(newItemBtn);  // create a new item button
    newItemBtn.classList.add(`newItemButton`);
    newItemBtn.textContent = '+';
    itemsGrid.appendChild(blankItem).classList.add(`newItem`);   // create a new blank item

    if (listIndex >= 0) {   // run the code below only if there is at least 1 list on the page 
    masterList.listArray[listIndex].items.forEach((item, index, itemsArray) => {   // render all items to the list
        itemsGrid.appendChild(document.createElement('button')).classList.add(`itemCheck${index}`);   // create a checkbox for every item
        itemsGrid.appendChild(document.createElement('p')).classList.add(`item${index}`);   // create a <p> element with class "item" for every item

        document.querySelector(`.itemCheck${index}`).textContent = ``;
        document.querySelector(`.item${index}`).textContent = `${item.title}`;

        if (item.note !== undefined) {
        document.querySelector(`.item${index}`).appendChild(document.createElement('p')).classList.add(`note${index}`);   // creates a <p> element with class "note" for every item
        document.querySelector(`.note${index}`).textContent = `${item.note}`;
        }       
    });
    }
};

const newItemDOM = function() {
    const form = document.querySelector('form');
    const titleInput = form.titleInput;
    const authorInput = form.authorInput;
    const pagesInput = form.pagesInput;
    const readYesInput = form.readYesInput;
    
    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = +pagesInput.value;
    let newRead = readYesInput.checked;
    let newBook;

    if (newRead === true) {
        newRead = 'Yes';
    } else {
        newRead = 'No';
    }

    newBook = new Book (newTitle, newAuthor, newPages, newRead);

    addBookToLibrary(newBook);
    clearLibrary();
    render(myLibrary);
    createListeners();
};

const refreshDisplay = function() {   // wipe the listSettings and items grids clean
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

let listSettingBtnClicked;

const createListeners = (function() {
    let lastClickedList = 0;   // store the last clicked list

    const startListListeners = function() {
        listGrid.addEventListener('click', clickListGrid, false);
        listGrid.addEventListener('click', clickListSettings, false);

        const getTargetIndex = function(event, listElement) {   // return the index of a clicked element
            let targetIndex = '';
            
            // checks if an index has been passed. if not, gets index from element click.
            if (listElement && listElement.indexOf('currentList') === -1) {       
                targetIndex = String(listElement).replace(/[^0-9]/g,'');
            
            // checks if an index has been passed and if it is the current list
            } else if (listElement && listElement.indexOf('currentList') > -1) {
                targetIndex = String(listElement).replace(/[^0-9]/g,'');
            
            } else if (event.target.className.indexOf('currentList') > -1) {
                targetIndex = String(event.target.className).replace(/[^0-9]/g,'');

            } else {
                targetIndex = String(event.target.className).replace(/[^0-9]/g,'');
            }
            
            return +targetIndex;
        };
        
        function clickListGrid(e) {
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

            } else if (e.target.className === 'newListInputBtn' && e.target !== e.currentTarget) {   // click the "add new list" button
                document.querySelector('.newListInput').focus();

                if (appendNewList() !== false) {
                    masterList.addNewList(appendNewList());
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(getTargetIndex(e, listGrid.lastChild.className));
                    highlightList(getTargetIndex(e, listGrid.lastChild.className));
                    lastClickedList = getTargetIndex(e, listGrid.lastChild.className);
                }

            } else if (e.target.className === 'newListInputCancelBtn' && e.target !== e.currentTarget) {   // click the "cancel new list" button
                
                console.log(listGrid.lastChild.className);

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
            e.stopPropagation();
        }

        function clickListSettings(e) {   // handles all clicks on the List Settings button
            let deletedList;

            if (listSettingBtnClicked === true) {
                if (e.target.className.indexOf('listEditBtn') > -1 && e.target !== e.currentTarget) {   // press the edit list button    
                    
                    lastClickedList = getTargetIndex(e, e.target.className);   // gets the index of list whose edit button was clicked
                    
                    console.log(e.target.className);

                    if (e.target.className !== `editConfirmBtn${lastClickedList}`) {
                        displayEditListInput(lastClickedList);
                        displayEditListButtons(lastClickedList);  // might be better to revert to changing the classname to editConfirmBtn${listIndex}.
                        listSettingBtnClicked = true;   // if the list settings button was already clicked, close it
                    } 

                } else if (e.target.className === `editConfirmBtn${lastClickedList}` && e.target !== e.currentTarget) {
                    lastClickedList = getTargetIndex(e, e.target.className);   // gets the index of list whose edit button was clicked
                    masterList.listArray[lastClickedList].renameList(updateListName());
                    
                    refreshDisplay();
                    displayListGrid();
                    displayListButtons();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);

                    listSettingBtnClicked = true;   // if the list settings button was already clicked, close it

                } else if (e.target.className.indexOf('listDeleteBtn') > -1 && e.target !== e.currentTarget) {   // press the delete list button and remove the list based on its index
                    deletedList = getTargetIndex(e);
                    masterList.removeList(getTargetIndex(e));
                    refreshDisplay();
                    displayListGrid();

                    if (listGrid.lastChild.className === 'newList') {   // all lists were deleted
                        
                        console.log('all lists were deleted')
                        
                        displayItemsGrid();   // just show the "add item" button and empty item

                    } else if (getTargetIndex(e, e.target.className) < lastClickedList || deletedList > getTargetIndex(e, listGrid.lastChild.className) && getTargetIndex(e, e.target.className) === lastClickedList) {

                        console.log ('deleted list was a HIGHER on the list than the highlighted list or this deleted list was LAST on the page');

                        lastClickedList--;
                        displayItemsGrid(lastClickedList);
                        highlightList(lastClickedList);
                    
                    } else if (getTargetIndex(e, e.target.className) > lastClickedList || getTargetIndex(e, e.target.className) === lastClickedList) {
                        
                        console.log ('deleted list was LOWER on the list than the highlighted list OR highlighted list was deleted');
                        
                        displayItemsGrid(lastClickedList);
                        highlightList(lastClickedList);
                    }

                console.log('you reached the end of the conditionals.');

                listSettingBtnClicked = false;   // if the list settings button was already clicked, close it

                } else if (e.target.className !== 'editListInput') {   // refresh the list if the list settings button was clicked
                    refreshDisplay();
                    displayListGrid();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);
                    listSettingBtnClicked = false;   // if the list settings button was already clicked, close it
                }
                
            // refreshDisplay();
            // displayListGrid();

            // listSettingBtnClicked = false;   // if the list settings button was already clicked, close it
                
            // is this a list settings button?
            // } else if (e.target.className.indexOf("listSettingsBtn") > -1 && e.target !== e.currentTarget) {
            } else {   // if listSettingBtnClicked is
                console.log('HERE!');

                listSettingBtnClicked = true;
                console.log({listSettingBtnClicked});
                refreshDisplay();
                displayListGrid();
                displayListButtons();
                displayItemsGrid(lastClickedList);
                highlightList(lastClickedList);
            }

            console.log('WE OUT');
            console.log({listSettingBtnClicked});

            e.stopPropagation();
        }
    } 
    return { 
        startListListeners 
    };
})();

const initDisplay = (() => {
    // create the header
    const appHeader = document.createElement('h1');
    const checkMark = '\u{2713}'; // the ellipsis: ⋮

    appHeader.textContent = `DO. ${checkMark}`;
    content.insertBefore(appHeader, main.childNodes[0]);

    createDisplay();
    displayListGrid();
    // displayListButtons();
    displayItemsGrid(0);
    highlightList(0);
    createListeners.startListListeners();
})();

