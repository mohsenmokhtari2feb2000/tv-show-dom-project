//! selects
const homeEle = document.querySelector(".goToHome");
const container = document.querySelector(".card-container-episodes");
const selectEle = document.querySelector("#select");
homeEle.addEventListener("click", (e) => {
  location.replace("index.html");
});
const data = localStorage.getItem("id");
const fetch = async () => {
  const res = await axios.get(`https://api.tvmaze.com/shows/${data}/episodes`);

  res.data.forEach((ele) => {
    const cardEle = document.createElement("div");
    cardEle.setAttribute("class", "card-episodes");
    container.append(cardEle);
    const imgEle = document.createElement("img");
    imgEle.setAttribute("src", ele.image.medium);
    imgEle.classList = "img";
    const detail = document.createElement("div");
    cardEle.append(imgEle, detail);
    const pEle = document.createElement("p");
    pEle.innerText = `S${ele.season}E${ele.number} ${ele.name}`;
    const spanEle = document.createElement("span");
    spanEle.innerText = `${ele.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")}`;
    imgEle.addEventListener("mouseenter", (e) => {
      spanEle.classList = "span";
      detail.append(spanEle);
    });
    imgEle.addEventListener("mouseleave", (e) => {
      spanEle.remove();
    });
    const iEle = document.createElement("i");

    iEle.classList = "bi bi-play-circle";
    detail.addEventListener("click", (e) => {
      window.location = `${ele.url}`;
    });
    detail.append(pEle, iEle);
    const optionEle = document.createElement("option");
    optionEle.innerText = `S${ele.season}E${ele.number} ${ele.name}`;
    optionEle.setAttribute("class", "optionEle");
    selectEle.append(optionEle);
  });
  const allOptions = document.querySelectorAll(".optionEle");
  const cardsE = document.querySelectorAll(".card-episodes");
  const selectElec = document.querySelector("#select");
  // console.log(allOptions);
  selectElec.addEventListener("change", (e) => {
    console.dir(e.target.selectedOptions[0].innerText);
    cardsE.forEach((ele) => {
      if (
        ele.childNodes[1].innerText !== e.target.selectedOptions[0].innerText &&
        e.target.selectedOptions[0].innerText != "All Episodes"
      ) {
        ele.style.display = "none";
      } else {
        ele.style.display = "block";
      }
    });
  });

  // allOptions.forEach((element) => {
  //   // console.log(ele);
  //   element.addEventListener("change", (e) => {
  //     cardsE.forEach((ele) => {
  //       console.dir(ele.childNodes[1].innerText);
  //       if (ele.childNodes[1].innerText === element.textContent){
  //         console.log(ele.childNodes[1].innerText);
  //       }
  //     });
  //   });
  // });
};
fetch();
