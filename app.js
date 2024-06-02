// selects
const cardContainer = document.querySelector(".card-container");

const makeCard = async () => {
  const res = await axios.get("https://api.tvmaze.com/shows");
  const data = res.data;
  const array = [];
  for (let i = 0; i < 32; i++) {
    array.push(data[i]);
  }
  console.log(array);
  array.forEach((ele) => {
    console.log(ele);
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
  });
};
makeCard();
