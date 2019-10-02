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

// creates and displays the + New List button
const displayNewListButton = function() {
    const newListBtn = document.createElement('p');

    listGrid.insertAdjacentElement('afterbegin', newListBtn);
    newListBtn.classList.add(`newList`);
    newListBtn.textContent = '+ New List';
};

const displayListButtons = function() {
    const listSettings = document.querySelectorAll("[class^='listSettingsBtn']");
// [class^="listEditBtn"]
// [class^="listDeleteBtn"]

    listSettings.forEach((list, listIndex) => {   // create edit and delete buttons next to each list
        // console.log(list);
        list.insertAdjacentElement('afterend', document.createElement('button'));
        list.nextSibling.classList.add(`listEditBtn${listIndex}`);
        list.nextSibling.textContent = 'E';
        
        list.nextSibling.insertAdjacentElement('afterend', document.createElement('button'));
        list.nextSibling.nextSibling.classList.add(`listDeleteBtn${listIndex}`);
        list.nextSibling.nextSibling.textContent = 'X';
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
        // console.log(list);
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

const createListeners = (function() {
    // const listSettings = document.querySelectorAll("[class^='list']");
    let lastClickedList = 0;   // store the last clicked list
    let listSettingBtnClicked;

    const startListListeners = function() {

        listGrid.addEventListener('click', clickListGrid, false);
        listGrid.addEventListener('click', clickListSettings, false);

        // for (let index = 0; index < listGrid.children.length; index++) {
        //     listGrid.children[index].onclick = function() {
        //         console.log(index);
        //         listIndex = index;
        //         console.log(`listIndex: ${listIndex}`);
        //     }
        // }

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
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(lastClickedList);
                highlightList(lastClickedList);
            } 

            e.stopPropagation();
        }

        function clickListSettings(e) {
            let deletedList;

            if (listSettingBtnClicked === true) {   // if the list settings button was already clicked, close it
                
                // press the delete list button and remove the list based on its index
                if (e.target.className.indexOf('listDeleteBtn') > -1) {   
                    deletedList = getTargetIndex(e);
                    masterList.removeList(getTargetIndex(e));
                }
                
                refreshDisplay();
                displayListGrid();
                
                // if the index of the deleted list is higher than the currently highlighted list, subtract the index of the highlighted list (lastClickedList) - 1
                if (getTargetIndex(e, e.target.className) > lastClickedList) {
                    console.log ('WORKS: deleted list was lower on the list than the highlighted list');
                }

                // if the index of the deleted list is lower than the currently highlighted list, keep the index of the highlighted list intact
                if (getTargetIndex(e, e.target.className) < lastClickedList) {
                    console.log ('WORKS: deleted list was a higher on the list than the highlighted list');
                    lastClickedList--;
                }

                // if the index of the deleted list was the last list on the page, and was highlighted, 
                // highlight the last list on the page
                if (deletedList > getTargetIndex(e, listGrid.lastChild.className) && getTargetIndex(e, e.target.className) === lastClickedList) {
                    console.log ('this deleted list was last on the page');
                    lastClickedList--;
                } 

                if (listGrid.lastChild.className === 'newList') {
                    console.log('SHITS FUCKED')
                    console.log({lastClickedList});
                    console.log({deletedList});

                    displayItemsGrid();

                    listSettingBtnClicked = false;

                }

                console.log('you reached the end of the conditionals.');

                displayItemsGrid(lastClickedList);
                highlightList(lastClickedList);
                listSettingBtnClicked = false;

                
            // is this a list settings button?
            } else if (e.target.className.indexOf("listSettingsBtn") > -1 && e.target !== e.currentTarget) {
                    listSettingBtnClicked = true;
                    refreshDisplay();
                    displayListGrid();
                    displayListButtons();
                    displayItemsGrid(lastClickedList);
                    highlightList(lastClickedList);

            }
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
    appHeader.textContent = 'DO.';
    content.insertBefore(appHeader, main.childNodes[0]);

    createDisplay();
    displayListGrid();
    // displayListButtons();
    displayItemsGrid(0);
    highlightList(0);
    createListeners.startListListeners();
})();

