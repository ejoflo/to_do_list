const content = document.getElementById('content');
const main = document.createElement('div');
const listGrid = document.createElement('div');
const itemsGrid = document.createElement('div');

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
    newListInputCancelBtn.textContent = 'x';
    
    newListInput.focus();
};

const appendNewList = function() {
    const newListToAdd = document.getElementsByClassName('newListInput');
    const newListName = newListToAdd.newListName;
    let newNameOfList = newListName.value;

    return newNameOfList;
};

// creates and displays the + New List button
const displayNewListButton = function() {
    const newListBtn = document.createElement('p');

    listGrid.insertAdjacentElement('afterbegin', newListBtn);
    newListBtn.classList.add(`newList`);
    newListBtn.textContent = '+ New List';
};

const displayListButtons = function() {
    const lists = document.querySelectorAll("[class^='list']");;
    const listEditBtn = document.createElement('button');
    const listDeleteBtn = document.createElement('button');    

    lists.forEach((list, listIndex) => {
        console.log(lists[0]);
        lists[listIndex].insertAdjacentElement('afterend', document.createElement('button'));   // create an edit button next to current list
        lists[listIndex].nextSibling.classList.add(`listEditBtn${listIndex}`);
        lists[listIndex].nextSibling.textContent = 'E';
        
        lists[listIndex].nextSibling.insertAdjacentElement('afterend', document.createElement('button'));   // create a delete button next to edit button
        lists[listIndex].nextSibling.nextSibling.classList.add(`listDeleteBtn${listIndex}`);
        lists[listIndex].nextSibling.nextSibling.textContent = 'X';

    });
};

const displayListGrid = function() {
    displayNewListButton();

    masterList.listArray.forEach((list, index, theListArray) => {
        listGrid.appendChild(document.createElement('p')).classList.add(`list${index}`);
        document.querySelector(`.list${index}`).textContent = list.name;
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
    let lastList = 'list0';   // store the last clicked list

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

                if (listElement) {   // checks if an index has been passed. if not, gets index from element click.
                    targetIndex = String(listElement).substr(4,1);
                } else {
                    targetIndex = String(e.target.className).substr(4,1);
                }
                return targetIndex;
            };
            
            if (e.target.className === 'newList' && e.target !== e.currentTarget) {   // click the "new list" button
                displayNewListInput();
                console.log(lastList);

            } else if (e.target !== e.currentTarget && e.target.className !== 'newListInput' && e.target.className !== 'newListInputBtn' && e.target.className !== 'newListInputCancelBtn') {   // click the child of a parent node
                lastList = e.target.className;
                console.log(lastList);
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex());
                highlightList(getTargetIndex());                
            
            } else if (e.target.className === 'newListInputBtn' && e.target !== e.currentTarget) {   // click the "add new list" button
                console.log(lastList);
                lastList = e.target.className;
                masterList.addNewList(appendNewList());                
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex(listGrid.lastChild.className));
                highlightList(getTargetIndex(listGrid.lastChild.className));


            } else if (e.target.className === 'newListInputCancelBtn' && e.target !== e.currentTarget) {   // click the "cancel new list" button           
                console.log(`cancel: ${lastList}`);
                // lastList = 'list0';
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex(lastList));
                highlightList(getTargetIndex(lastList));
            }
        e.stopPropagation();
        }
    } 
    return { startListListeners };
})();

const initDisplay = (() => {
    // create the header
    const appHeader = document.createElement('h1');
    appHeader.textContent = '☑☑☑';
    content.insertBefore(appHeader, main.childNodes[0]);

    createDisplay();
    displayListGrid();
    displayListButtons();
    displayItemsGrid(0);
    highlightList(0);
    createListeners.startListListeners();
})();

