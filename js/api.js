    // let api_key = '7d9aa6bb655a92e48d15853900e2a928';
    let search = document.getElementById('search-button');

// Fetch data from API endpoint
    search.addEventListener('click', () => {
        let keyword = document.getElementById('search_box').value;
    try {
    fetch('https://gnews.io/api/v4/search?q=' + `${keyword}` + '&lang?=en&country=us&token=7d9aa6bb655a92e48d15853900e2a928')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
// Store API data in variables
        let articles = data.articles;
    articles.forEach(function(story){
        let title = story.title;
        let description = story.description;
        let image = story.image;
        let story_url = story.source.url;

// Pass data to createCard function
        createCards(title, description, story_url);
        console.log(story_url);
    })
    });
} catch (error) {
    console.log( `There was an error: ${error}`);
}
});

// Creates card elements
function createCards(title, description, image, story_url) {
    let news_container = document.getElementById('news_container');
    let row = document.createElement('div');
    row.className = 'row';
    let col = document.createElement('div');
    col.className = 'col s12 m6';

    let card_body = document.createElement('div');
    card_body.className = 'news-body card teal darken-2';
    let content = document.createElement('div');
    content.className  = 'news-content card-content white-text';
    let span = document.createElement('span');
    span.className  = 'news-title card-title';
    let text = document.createElement('p');
    let action = document.createElement('div');
    action.className = 'news-link card-action  teal lighten-1';
    let source_url = document.createElement('a');
    source_url.className = 'white-text darken-5';

    console.log(source_url);






    news_container.appendChild(row);
    row.appendChild(col);
    col.appendChild(card_body);
    card_body.appendChild(content);
    content.appendChild(span);
    content.appendChild(text);
    span.textContent = title;
    text.textContent = description;
// Error: href is undefined
    source_url.setAttribute('href', `${story_url}`);
    source_url.innerText = "Link to source";
    text.appendChild(source_url);
};