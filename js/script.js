'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.list.list-horizontal',
  optArticleAuthorsSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const listOfTitles = document.querySelector(optTitleListSelector);
  listOfTitles.innerHTML = '';

  /* for each article */
  const articles = [
    ...document.querySelectorAll(optArticleSelector + customSelector),
  ];

  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleID = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */
    const titleOfArticle = article.querySelector(optTitleSelector).textContent;

    /* create HTML of the link */
    let linkHTML = `<li><a href="#${articleID}"><span>${titleOfArticle}</span></a></li>`;

    /* insert link into html variable */
    html = html + linkHTML;
  }
  listOfTitles.innerHTML = html;

  const links = [...document.querySelectorAll('.titles a')];

  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeAricles = document.querySelectorAll('.post.active');
    for (let activeAricle of activeAricles) {
      activeAricle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleID = clickedElement.getAttribute('href').substring(1);

    /* find the correct article using the selector (value of 'href' attribute) */
    const article = document.getElementById(articleID);

    /* add class 'active' to the correct article */
    article.classList.add('active');
  };

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = [...document.querySelectorAll(optArticleSelector)];
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      let linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  }

  /* END LOOP: for every article: */

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.substring(5);

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    console.log(links);
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
}

generateTags();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const author = clickedElement.textContent;
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active authirs link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  console.log(authorLinks);
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with author selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
}

function generateAuthors() {
  const articles = [...document.querySelectorAll(optArticleSelector)];

  for (let article of articles) {
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    /* get authors from data-authors attribute */
    const author = article.getAttribute('data-author');
    authorWrapper.innerHTML = `by <a href="#author-${author}">${author}</a>`;
  }

  function addClickListenersToAuthors() {
    const links = document.querySelectorAll('a[href^="#author-"]');
    console.log(links);
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();
}

generateAuthors();
