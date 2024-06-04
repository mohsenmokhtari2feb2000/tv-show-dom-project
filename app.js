// selects
const cardContainer = document.querySelector(".card-container");
const homeEle = document.querySelector(".goToHome");
// imports
// import { setItem, getItem } from "../tv-show-dom-project/utils/localstorage.js";
function setItem(key, value) {
  localStorage.setItem(key, value);
}
function getItem(key) {
  localStorage.getItem(key);
}
//! start of program
const makeCard = async () => {
  const res = await axios.get("https://api.tvmaze.com/shows");
  const data = res.data;
  // console.log(res.data);
  const array = [];
  for (let i = 0; i < 98; i++) {
    array.push(data[i]);
  }
  array.forEach((ele) => {
    // console.log(ele);
    const cardEle = document.createElement("div");
    cardEle.setAttribute("class", "card");
    cardContainer.append(cardEle);
    const imgEle = document.createElement("img");
    imgEle.setAttribute("src", `${ele.image.medium}`);
    const pEle1 = document.createElement("p");
    pEle1.setAttribute("class", "card-header");
    pEle1.innerText = `${ele.name}`;
    const pEle2 = document.createElement("p");
    pEle2.setAttribute("class", "info");
    pEle2.innerText = `${ele.genres}`.replaceAll(",", "|");
    const pEle3 = document.createElement("p");
    pEle3.setAttribute("class", "imdb-score");
    pEle3.innerText = `${ele.rating.average}`;
    cardEle.append(imgEle, pEle1, pEle2, pEle3);
    const hiddenEle = document.createElement("span")
    hiddenEle.innerText = `${ele.id}`
    hiddenEle.setAttribute("class","hidden")
    hiddenEle.style.display = "hidden"
    cardEle.append(hiddenEle)
  });
  //! search bar
  const cardsForSearch = document.querySelectorAll(".card");
  const searchEle = document.querySelector(".search");
  searchEle.addEventListener("keyup", (e) => {
    cardsForSearch.forEach((ele) => {
      if (
        !ele.childNodes[1].innerText
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase().trim())
      ) {
        ele.style.display = "none";
      } else {
        ele.style.display = "block";
      }
    });
  });
  // ! relocation over card click
  cardsForSearch.forEach((ele) => {
    ele.addEventListener("click", (e) => {
    console.dir(e.target.parentElement.childNodes[4].innerText)
    localStorage.clear()
    setItem("id",e.target.parentElement.childNodes[4].innerText)
      location.replace("./episodes.html");
    
    });
  });
};
makeCard();
homeEle.addEventListener("click", (e) => {

  location.replace("./index.html");
});
