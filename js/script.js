"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  /* remove contents of titleList */
  const listOfTitles = document.querySelector(optTitleListSelector);
  listOfTitles.innerHTML = "";

  /* for each article */
  const articles = [...document.querySelectorAll(optArticleSelector)];

  for (let article of articles) {
    /* get the article id */
    const articleID = article.getAttribute("id");

    /* find the title element */
    /* get the title from the title element */
    const titleOfArticle = article.querySelector(optTitleSelector).textContent;

    /* create HTML of the link */
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${articleID}"><span>${titleOfArticle}</span></a>`;
    listOfTitles.appendChild(li);
  }

  const links = [...document.querySelectorAll(".titles a")];

  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add("active");

    /* remove class 'active' from all articles */
    const activeAricles = document.querySelectorAll(".post.active");
    for (let activeAricle of activeAricles) {
      activeAricle.classList.remove("active");
    }
    /* get 'href' attribute from the clicked link */
    const articleID = clickedElement.getAttribute("href").substring(1);

    /* find the correct article using the selector (value of 'href' attribute) */
    const article = document.getElementById(articleID);

    /* add class 'active' to the correct article */
    article.classList.add("active");
  };

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();
