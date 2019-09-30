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
        console.log(list);
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

    listSettings.forEach((list, listIndex) => {   // create a settings button next to each list
        console.log(list);
        list.insertAdjacentElement('afterend', document.createElement('button')); 
        list.nextSibling.classList.add(`listSettingsBtn${listIndex}`);
        list.nextSibling.textContent = '⋮';
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
    let lastList = 'list0';   // store the last clicked list
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

            if (listElement && listElement.indexOf('currentList') === -1) {   // checks if an index has been passed. if not, gets index from element click.
                console.log(listElement.replace(/[^0-9]/g,''));
                console.log('The element passed was not a current list.');
                console.log(`listElement: ${listElement}`);
                
                // targetIndex = String(listElement).substr((listElement.length - 1), 1);
                targetIndex = String(listElement).replace(/[^0-9]/g,'');
            
            } else if (listElement && listElement.indexOf('currentList') > -1) {   // checks if an index has been passed and if it is the current list
                console.log ('The element/variable passed was a current list.');
                console.log(`listElement: ${listElement}`);
                
                // targetIndex = String(listElement).substr(4,1);
                targetIndex = String(listElement).replace(/[^0-9]/g,'');
            
            } else if (event.target.className.indexOf('currentList') > -1) {
                console.log(`The clicked element was a current list.`);
                console.log (`e.target.className: ${event.target.className}`);
                
                // targetIndex = String(e.target.className).substr(4,1);
                targetIndex = String(event.target.className).replace(/[^0-9]/g,'');

            } else {
                console.log(`Everything else clicked. ${String(event.target.className).substr((event.target.className.length - 1),1)}`);
                console.log (`event.target.className: ${event.target.className}`);

                // targetIndex = String(e.target.className).substr((e.target.className.length - 1), 1);
                targetIndex = String(event.target.className).replace(/[^0-9]/g,'');
            }
            return targetIndex;
        };
        
        // function clickListGrid(e) {
        //     if (e.target.className === 'newList' && e.target !== e.currentTarget) {   // click the "new list" button
        //         // console.log(`Clicked the NEW list button / lastList: ${lastList}`);
        //         displayNewListInput();
        //         // console.log(`lastList: ${lastList}`);          

        //     } else if (e.target.className === 'newListInputBtn' && e.target !== e.currentTarget) {   // click the "add new list" button
        //         // console.log(`Clicked the ADD new list button / lastList: ${lastList}`);
        //         // console.log(listGrid.lastChild.className);
        //         // lastList = e.target.className;
        //         document.querySelector('.newListInput').focus();

        //         if (appendNewList() !== false) {
        //             // console.log(`appendNewList is not blank. / displayItemsGrid with index of ${listGrid.lastChild.className}`);
        //             masterList.addNewList(appendNewList());
        //             refreshDisplay();
        //             displayListGrid();
        //             displayItemsGrid(getTargetIndex(e, listGrid.lastChild.className));
        //             highlightList(getTargetIndex(e, listGrid.lastChild.className));
        //             lastList = listGrid.lastChild.className;
        //         }

        //     } else if (e.target.className === 'newListInputCancelBtn' && e.target !== e.currentTarget) {   // click the "cancel new list" button
        //         // console.log(`Clicked the CANCEL new list button / lastList: ${lastList}`);
        //         refreshDisplay();
        //         displayListGrid();
        //         displayItemsGrid(getTargetIndex(e, lastList));
        //         highlightList(getTargetIndex(e, lastList));

        //     } else if (e.target !== e.currentTarget && e.target.className !== 'newListInput' && e.target.className !== 'newListInputBtn' && e.target.className !== 'newListInputCancelBtn' && e.target.className.indexOf("listSettingsBtn") < 0 && e.target.className.indexOf("listDeleteBtn") < 0)  {   // click the child of a parent node
        //         // console.log(`Clicked anywhere on the list grid / lastList: ${lastList}`);

        //         console.log(e.target.className.indexOf("listSettingsBtn") > -1); // is this a list settings button?

        //         lastList = e.target.className;
        //         refreshDisplay();
        //         displayListGrid();
        //         displayItemsGrid(getTargetIndex(e));
        //         highlightList(getTargetIndex(e));      
        //     }
        // e.stopPropagation();
        // }
    
        function clickListGrid(e) {
            const lists = listGrid.querySelectorAll("p[class^='list']");
            let listElements = Array.from(lists);   // put all .list elements in an array


            if (listElements.indexOf(e.target) >= 0 && e.target !== e.currentTarget) {   // click a list element
                // console.log(listGrid.querySelectorAll("[class^='list']"));
                console.log(listElements.indexOf(e.target));
                console.log(listGrid.querySelectorAll("p[class^='list']"));

                lastList = e.target.className;
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
                    lastList = listGrid.lastChild.className;
                }

            } else if (e.target.className === 'newListInputCancelBtn' && e.target !== e.currentTarget) {   // click the "cancel new list" button
                refreshDisplay();
                displayListGrid();
                displayItemsGrid(getTargetIndex(e, lastList));
                highlightList(getTargetIndex(e, lastList));
            } 
            e.stopPropagation();
        }

        function clickListSettings(e) {
            // const listSettings = document.querySelectorAll("[class^='listSettingsBtn']");

        if (listSettingBtnClicked === true) {   // if the list settings button was already clicked, close it
            
            if (e.target.className.indexOf('listDeleteBtn') > -1) {
                console.log(e.target.className);
                masterList.removeList(getTargetIndex(e));
                // if the
             
            }
            refreshDisplay();
            displayListGrid();
            displayItemsGrid(getTargetIndex(e, lastList));
            highlightList(getTargetIndex(e, lastList));
            listSettingBtnClicked = false;
            console.log(listSettingBtnClicked);
            
        } else if (e.target.className.indexOf("listSettingsBtn") > -1 && e.target !== e.currentTarget) {   // is this a list settings button?
                listSettingBtnClicked = true;
                console.log(listSettingBtnClicked);
                refreshDisplay();
                displayListGrid();
                displayListButtons();
                displayItemsGrid(getTargetIndex(e, lastList));
                highlightList(getTargetIndex(e, lastList));

                // console.log(`Clicked the NEW list button / lastList: ${lastList}`);
                // displayNewListInput();
                // console.log(`lastList: ${lastList}`);          
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
    appHeader.textContent = '☑☑☑';
    content.insertBefore(appHeader, main.childNodes[0]);

    createDisplay();
    displayListGrid();
    // displayListButtons();
    displayItemsGrid(0);
    highlightList(0);
    createListeners.startListListeners();
})();

