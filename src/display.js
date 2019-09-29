const content = document.getElementById('content');
const main = document.createElement('div');
const listGrid = document.createElement('div');
const itemsGrid = document.createElement('div');
const blankItem = document.createElement('p');
const newItemBtn = document.createElement('button');
const newListBtn = document.createElement('p');
const newListInput = document.createElement('input');
const newListInputBtn = document.createElement('button');

// creates html elements for the lists and items
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
    
    newListInput.focus();
    // create two buttons: confirm / cancel
    // confirm adds the new list then
        // reverts the new list element
    // cancel clears the new list name
        // reverts the new list element
};

const appendNewList = function() {
    const newListToAdd = document.getElementsByClassName('newListInput');
    const newListName = newListToAdd.newListName;
    let newNameOfList = newListName.value;

    return newNameOfList;
};

// creates and displays the + New List button
const displayNewListButton = function() {
    listGrid.insertAdjacentElement('afterbegin', newListBtn);
    newListBtn.classList.add(`newList`);
    newListBtn.textContent = '+ New List';
};

const displayListGrid = function() {
    displayNewListButton();

    masterList.listArray.forEach((list, index, theListArray) => {
        listGrid.appendChild(document.createElement('p')).classList.add(`list${index}`);
        document.querySelector(`.list${index}`).textContent = list.name;
    });
};

const displayItemsGrid = function(listIndex) {   // display the current list's items
    document.querySelector(`.list${listIndex}`).classList.add('currentList');   // highlight the current selected list

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

const refreshDisplay = function() {   // wipe the lists and items grids clean
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
    // const lists = document.querySelectorAll("[class^='list']");
    
    const startListListeners = function() {
        listGrid.addEventListener('click', clickList, false);

        // for (let index = 0; index < listGrid.children.length; index++) {
        //     listGrid.children[index].onclick = function() {
        //         console.log(index);
        //         listIndex = index;
        //         console.log(`listIndex: ${listIndex}`);
        //     }
        // }

        function clickList(e) {
            
            const getTargetIndex = function(listElement) {
                let targetIndex = '';

                if (listElement) {
                    targetIndex = String(listElement).substr(4,1);
                } else {
                    targetIndex = String(e.target.className).substr(4,1);
                }
                
                // if (targetIndex === '') {
                //     targetIndex = String(e.target.className).substr(4,1);
                // } else {
                //     targetIndex = String(listElement).substr(4,1);
                // }
                
                return targetIndex;
            };
            
            if (e.target.className === 'newList' && e.target !== e.currentTarget) {   // click the "new list" button
                console.log('RUN displayNewListInput FUNCTION'); // run displayNewListInput function
                displayNewListInput();
                // listGrid.removeEventListener('click', clickList);
            
            } else if (e.target !== e.currentTarget && e.target.className !== 'newListInput' && e.target.className !== 'newListInputBtn') {   // click the child of a parent node
                console.log(`targetIndex is: ${getTargetIndex()}`);
                console.log(e.target);
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex());
            
            } else if (e.target.className === 'newListInputBtn' && e.target !== e.currentTarget) {   // click the "add new list" button
                masterList.addNewList(appendNewList());                
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex(listGrid.lastChild.className));
            }
        e.stopPropagation();
        }
    }
    
    // const startListListeners = function() {
    //     console.log(document.querySelectorAll("[class^='list']"));
    //     document.querySelectorAll("[class^='list']").forEach((list, listIndex, listArray) => {
    //         list.addEventListener('click', function listClicks() {   
    //             console.log(list);
    //             refreshDisplay();
    //             // createDisplay();
    //             displayListGrid();
    //             displayItemsGrid(listIndex);
    //         });
    //     });
    // };   

    return {
        startListListeners
    };
})();

const initDisplay = (() => {
    // create the header
    const appHeader = document.createElement('h1');
    appHeader.textContent = '☑☑☑';
    content.insertBefore(appHeader, main.childNodes[0]);

    // document.body.insertAdjacentHTML('beforebegin', '<center><h1>☑ DOOO EEEET.</h1><center>');  // change or delete this later
    createDisplay();
    displayListGrid();
    displayItemsGrid(0);
    createListeners.startListListeners();
})();

