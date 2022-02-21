'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list';

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
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages() {
    titleList.innerHTML = '';
  }
  clearMessages();

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; //przeanalizować tę linię
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    //titleList.insertAdjacentHTML('beforebegin', linkHTML); <--- przeanalizowac sytnax, co ja miałem tym zrobić
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}


function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const wrapper = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) { //tu coś nie gra w tej pętli
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + linkHTML;
      if(allTags.indexOf(linkHTML) == -1){
        allTags.push(linkHTML);
      }
    }
    wrapper.innerHTML = html;
    const tags = document.querySelectorAll('.list list-horizontal');

    const tagList = document.querySelector(optTagsListSelector);
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

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
  //const links = document.querySelectorAll('.tags'); <-- chyba źle
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);
    let html = '';
    const articleAuthors = article.getAttribute('data-author');
    const linkHTML = '<li><a href="#">' + author + '</a></li>';
    html = html + linkHTML;
    /*for (let author of articleAuthors) {} */
    authorsWrapper.innerHTML = html;
  }
}
generateAuthors();


/*
function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');

  const author = href.replace('#tag-', '');
  const activeAuthor = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  //const links = document.querySelectorAll('.tags'); <-- chyba źle
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToAuthors();


Oprócz poprawnego wykonania poleceń z tego submodułu Twoim zadaniem jest zrobienie kilku rzeczy związanych z autorami artykułów, czyli:
•	w każdym artykule dodaj autora w atrybucie data-author (usuń autora z wrappera .post-author),
•	wyświetl autora jako link we wrapperze post-author, pod tytułem artykułu,
•	powiąż kliknięcie w link do autora z wygenerowaniem przefiltrowanej listy artykułów.
Dla uproszczenia niech każdy autor ma tylko imię i nazwisko – bez kropek, myślników czy drugich imion.
Wskazówki
1.	Potrzebujesz napisać funkcję generateAuthors, wzorując się na generateTags,
2.	Funkcja generateAuthors będzie prostsza niż generateTags, ponieważ jest tylko jeden autor artykułu – nie musisz dzielić tego pola funkcją split, ani wykonywać pętli podobnej do tej iterującej po tagach. Dla każdego artykułu będzie tylko jeden link do autora.
3.	Napisz też funkcje addClickListenersToAuthors i authorClickHandler, wzorując się na addClickListenersToTags i tagClickHandler.
4.	Nie musisz w żaden sposób zmieniać funkcji generateTitleLinks – wystarczy, że w funkcji authorClickHandler wywołasz ją z odpowiednim argumentem. Pamiętaj, że w tym wypadku w selektorze atrybutu użyjesz łącznika = zamiast ~=.
5.	Nie zapomnij dodać nowej stałej ustawień – optArticleAuthorSelector.
6.	Usuń przykładową zawartość listy autorów z kodu HTML – nie będzie nam już potrzebna.

*/


