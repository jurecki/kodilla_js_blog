"use strict";

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

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
