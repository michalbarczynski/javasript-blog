'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorsSelector: '.post-author',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors',
  classCount: 5,
  classPrefix: 'tag-size-'
};



function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts .post'); //('.active')?
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelektor = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelektor);

  targetArticle.classList.add('active');
}


function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML; //przeanalizować tę linię
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //titleList.insertAdjacentHTML('beforebegin', linkHTML); <--- ten sytnax, co ja miałem tym zrobić
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();


function calculateTagsParams(tags){
  const params = {
    min: 999999,
    max: 0
  };

  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;

}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.classCount - 1) + 1 );

  return classNumber + opts.classPrefix;
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(opts.articleSelector);

  for (let article of articles) {

    const wrapper = article.querySelector(opts.articleTagsSelector);
    let allTagsHTML = '';
    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTMLData = {id:tag, title:tag};
      const linkHTML = templates.articleTagLink(linkHTMLData);

      allTagsHTML += linkHTML;

      !allTags.hasOwnProperty(tag) ? allTags[tag] = 1 : allTags[tag]++;
    }

    wrapper.innerHTML = allTagsHTML;
  }
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  const allTagsData = {tags:[]};
  console.log(allTagsData);

  //O CO CHODZI W TEJ PETLI
  for (let tag in allTags) {

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();


function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]'); //"zaczynający się od..."

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }

}
addClickListenersToTags();

/*

Nie musisz w żaden sposób zmieniać funkcji generateTitleLinks – wystarczy, że w funkcji authorClickHandler wywołasz ją z odpowiednim argumentem. Pamiętaj, że w tym wypadku w selektorze atrybutu użyjesz łącznika = zamiast ~=.

*/

function calculateAuthorsParams(authors){
  const params = {
    min: 999999,
    max: 0
  };

  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }

  return params;

}

function calculateAuthorsClass(countAuthor, paramsAuthor){
  const normalizedCount = countAuthor - paramsAuthor.min;
  const normalizedMax = paramsAuthor.max - paramsAuthor.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.classCount - 1) + 1 );

  return classNumber + opts.classPrefix;
}

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(opts.articleSelector);

  for (let article of articles) {
    const authorsWrapper = article.querySelector(opts.articleAuthorsSelector);
    const articleAuthors = article.getAttribute('data-author');
    const linkHTMLData = {id: articleAuthors, title: articleAuthors};
    const linkHTML = templates.articleAuthorLink(linkHTMLData);

    authorsWrapper.innerHTML = linkHTML;

    !allAuthors.hasOwnProperty(articleAuthors) ? allAuthors[articleAuthors] = 1 : allAuthors[articleAuthors]++;
  }
  const authorList = document.querySelector(opts.authorsListSelector);
  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorParams:', authorParams);

  const allAuthorsData = {authors:[]};

  for (let author in allAuthors) {

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorsClass(allAuthors[author], authorParams)
    });
  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  //const links = document.querySelectorAll('a[href="' + href + '"]' == href);
  const links = document.querySelectorAll('a[href="' + href + '"]');

  for (let link of links) {
    link.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');// "elementy, które mają atrybut"
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
    console.log(link);
  }
}
addClickListenersToAuthors();

