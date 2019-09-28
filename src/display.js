const content = document.getElementById('content');
const main = document.createElement('div');
const listGrid = document.createElement('div');
const itemsGrid = document.createElement('div');
const blankItem = document.createElement('p');
const newItemBtn = document.createElement('button');
const newListBtn = document.createElement('p');


const createDisplay = function() {
    main.setAttribute('id', 'main');
    listGrid.setAttribute('id', 'listGrid');
    itemsGrid.setAttribute('id', 'itemsGrid');
    
    content.appendChild(main);
    main.appendChild(listGrid);
    main.appendChild(itemsGrid);
}

const displayListGrid = function() {
    listGrid.appendChild(newListBtn).classList.add(`newList`);
    newListBtn.textContent = '+ New List';

    masterList.listArray.forEach((list, index, theListArray) => {
        listGrid.appendChild(document.createElement('p')).classList.add(`list${index}`);
        document.querySelector(`.list${index}`).textContent = list.name;
    });
};

const displayItems = function(listIndex) {
    document.querySelector(`.list${listIndex}`).classList.add('currentList');   // highlight the current selected list

    itemsGrid.appendChild(newItemBtn);  // create a new item button
    newItemBtn.classList.add(`newItem`);
    newItemBtn.textContent = '+';
    itemsGrid.appendChild(blankItem).classList.add(`item`);

    masterList.listArray[listIndex].items.forEach((item, index, itemsArray) => {   // render all items to the list
        itemsGrid.appendChild(document.createElement('button')).classList.add(`itemCheck${index}`);   // create a checkbox for every item
        itemsGrid.appendChild(document.createElement('p')).classList.add(`item${index}`);   // create a <p> element with class "item" for every item

        document.querySelector(`.itemCheck${index}`).textContent = ``;
        document.querySelector(`.item${index}`).textContent = `${item.title}`;

        if (item.note !== undefined) {
        document.querySelector(`.item${index}`).appendChild(document.createElement('p')).classList.add(`note${index}`);   // creates a <p> element with class "note" for every item
        document.querySelector(`.note${index}`).textContent = `${item.note}`;
        }       

        // document.querySelector(`.item${index}`).insertAdjacentHTML('afterend', '<a href="/home" class="active">Home</a>');
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
    console.log('display has been refreshed'.toUpperCase());
};

const createListeners = (function() {
    // const lists = document.querySelectorAll("[class^='list']");
    
    const startListListeners = function() {
        let listIndex;
        
        listGrid.addEventListener('click', clickList, false);

        // for (let index = 0; index < listGrid.children.length; index++) {
        //     listGrid.children[index].onclick = function() {
        //         console.log(index);
        //         listIndex = index;
        //         console.log(`listIndex: ${listIndex}`);
        //     }
        // }

        function clickList(e) {
            let targetIndex = '';
            if (e.target.className === 'newList' && e.target !== e.currentTarget) {
                console.log('NEWWWW LISTTTT');
            } else if (e.target !== e.currentTarget) {   // click the child of a parent node
                targetIndex = String(e.target.className).substr(4,1);
                console.log(`targetIndex is: ${targetIndex}`);
                console.log(e.target);
                refreshDisplay();
                // createDisplay();
                displayListGrid();
                displayItems(targetIndex);
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
    //             displayItems(listIndex);
    //         });
    //     });
    // };   
    return {
        startListListeners
    };
})();

// create the header
const appHeader = document.createElement('h1');
appHeader.textContent = 'DO IT.';
content.insertBefore(appHeader, main.childNodes[0]);

// document.body.insertAdjacentHTML('beforebegin', '<center><h1>☑ DOOO EEEET.</h1><center>');  // change or delete this later
createDisplay();
displayListGrid();
displayItems(0);
createListeners.startListListeners();
