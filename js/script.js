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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks () {
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
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    //titleList.insertAdjacentHTML('beforebegin', linkHTML); <--- przeanalizowac sytnax, co ja miałem tym zrobić
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
  console.log(links);
}

generateTitleLinks();
//watch:eslint jak zapisać task



function generateTitleLinks (customSelector = '') {


function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#' + articleTags + '">cat</a></li>' //sprawdzić czy działa
      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    const tags = document.querySelectorAll('.list-horizontal a');
    for (let tag of tags) {
      tag.addEventListener('click', tagClickHandler); //sprawdzić logikę linii
    }
    /* END LOOP: for every article: */
  }
}


generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = document.querySelectorAll('a.active[href^="#tag-"]'); //sprawdzić czy działa
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.list-horizontal a .active');

  /* START LOOP: for each active tag link */
  for (activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */
  for (foundTagLink of foundTagLinks) {
    /* add class active */

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  /* START LOOP: for each link */
  for (link of links) {
    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  }
}
//addClickListenersToTags();
