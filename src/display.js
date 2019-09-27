const contentDiv = document.getElementById('content');
const allLists = document.createElement('h1');

const displayAllLists = function() {
    masterList.listArray.forEach((list, index, theListArray) => {
        console.log(list.name);
        allLists.appendChild(document.createElement('h6')).classList.add(`list${index}`);
        document.querySelector(`.list${index}`).textContent = list.name;
        // allLists.appendChild(singleList);
        // .textContent = list[index]);
    });
};



contentDiv.textContent = 'Just Do Eeeet.';

allLists.textContent = 'Lists go here.';

contentDiv.appendChild(allLists);

displayAllLists();