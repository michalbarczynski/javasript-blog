'use strict';

function titleClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    console.log('Link was clicked!');
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelektor = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelektor);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log(targetArticle);
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
        titleList.innerHTML = '';
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id'); //nie rozumiem działania

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML; //przeanalizować tę linię
        /* get the title from the title element */

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; //przeanalizować tę linię

        /* insert link into titleList */
        titleList.insertAdjacentHTML("beforebegin", linkHTML); //przeanalizowac sytnax dlaczego beforebegin
        html = html + linkHTML;
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
    console.log(links);
}

generateTitleLinks();
