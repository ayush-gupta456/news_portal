const newsContainer = document.getElementById('news-result');
const searchInput = document.getElementById('search-input');

fetch('https://saurav.tech/NewsAPI/everything/cnn.json')
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
    function filterArticles(query) {
      const filteredArticles = articles.filter(article => {
        return article.title.toLowerCase().includes(query.toLowerCase());
      });
      displayArticles(filteredArticles);
    }

    function displayArticles(articles) {
      newsContainer.innerHTML = '';

      articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');

        const articleImage = document.createElement('img');
        articleImage.src = article.urlToImage || 'https://via.placeholder.com/100';
        newsArticle.appendChild(articleImage);

        const articleLink = document.createElement('a');
        articleLink.href = article.url;
        articleLink.target = '_blank';
        articleLink.textContent = article.title;
        newsArticle.appendChild(articleLink);

        newsContainer.appendChild(newsArticle);
      });
    }
    displayArticles(articles);

    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      filterArticles(query);
    });
  })
  .catch(error => {
    console.error('Error fetching news:', error);
    const errorElement = document.createElement('p');
    errorElement.textContent = 'An error occurred while fetching news.';
    newsContainer.appendChild(errorElement);
  });
  