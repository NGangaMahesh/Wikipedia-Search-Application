let searchInput = document.getElementById('searchInput');
let searchResultDisplay = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');
let options = {
    method: 'GET'
};

function createEle(result) {
    spinner.classList.add("d-none");
    let {
        title,
        link,
        description
    } = result;
    let divEle = document.createElement('div');
    searchResultDisplay.appendChild(divEle);

    let anchorTag = document.createElement('a');
    anchorTag.classList.add('result-title');
    divEle.appendChild(anchorTag);
    anchorTag.href = link;
    anchorTag.textContent = title;
    anchorTag.target = '_blank';

    let brEle1 = document.createElement('br');
    divEle.appendChild(brEle1);

    let linkEle = document.createElement('a');
    divEle.appendChild(linkEle);
    linkEle.classList.add('result-url');
    linkEle.textContent = link;
    linkEle.href = link;

    let brEle = document.createElement('br');
    divEle.appendChild(brEle);

    let dispEle = document.createElement('p');
    dispEle.classList.add('link-description');
    divEle.appendChild(dispEle);
    dispEle.textContent = description;

    let hrEle = document.createElement('hr');
    divEle.appendChild(hrEle);
}

function displayResult(search_results) {

    for (let result of search_results) {
        createEle(result);
    }
}

const searchResult = (event) => {
    if (event.key === 'Enter') {
        searchResultDisplay.textContent = '';
        spinner.classList.remove("d-none");
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchInput.value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchInput.addEventListener('keydown', searchResult);