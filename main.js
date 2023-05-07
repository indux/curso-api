const limit = "limit=3";

const randomAPI = `https://api.thecatapi.com/v1/images/search?${limit}`;
const favoriteAPI = "https://api.thecatapi.com/v1/favourites";
const uploadAPI = "https://api.thecatapi.com/v1/images/upload";
const deleteFavoriteAPI = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.querySelector(".error");
const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const image3 = document.querySelector("#image3");
const button = document.querySelector(".button");
const favoriteBtnOne = document.querySelector(".favoriteButton1");
const favoriteBtnTwo = document.querySelector(".favoriteButton2");
const favoriteBtnThree = document.querySelector(".favoriteButton3");
const sectionFavorite = document.querySelector("#favoriteCat");
const form = document.querySelector("#uploadingForm");
const formButton = document.querySelector(".formButton");

async function getCat() {
  const response = await fetch(randomAPI);
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerText = `Hubo un error: ${response.status}`;
  } else {
    image1.src = data[0].url;
    image2.src = data[1].url;
    image3.src = data[2].url;

    favoriteBtnOne.onclick = () => saveCat(data[0].id);
    favoriteBtnTwo.onclick = () => saveCat(data[1].id);
    favoriteBtnThree.onclick = () => saveCat(data[2].id);
  }
}
getCat();
button.onclick = () => getCat();

async function favoriteCat() {
  const response = await fetch(favoriteAPI, {
    method: "GET",
    headers: {
      "X-API-KEY":
        "live_hR34c4PdMhFiKFMQSnQJg0hWle3qJdworGmAiSBY1DqL0ct1MUdZVdrk3ZuMiAZ5",
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerText = `Hubo un error: ${response.status}`;
  } else {
    const arrTitleFavorite = [];
    const arrDivFavorite = [];

    sectionFavorite.innerHTML = "";
    const divFavoriteSection = document.createElement("div");
    const titleFavoriteSection = document.createElement("h2");
    const subtitleFavoriteSection = document.createElement("p");
    const titleText = document.createTextNode("Favoritos");
    const subtitleText = document.createTextNode("Los gatitos favoritos.");

    divFavoriteSection.className = "text-container";
    titleFavoriteSection.className = "title_container";
    subtitleFavoriteSection.className = "description_container";

    titleFavoriteSection.append(titleText);
    subtitleFavoriteSection.append(subtitleText);
    divFavoriteSection.append(titleFavoriteSection, subtitleFavoriteSection);

    arrTitleFavorite.push(divFavoriteSection);
    sectionFavorite.append(...arrTitleFavorite);

    data.forEach((cat) => {
      const divFavorite = document.createElement("div");
      const imgFavorite = document.createElement("img");
      const divButtonFavorite = document.createElement("div");
      const buttonFavorite = document.createElement("button");
      const buttonTextFavorite = document.createTextNode(
        "Remover de favoritos"
      );

      imgFavorite.src = cat.image.url;

      imgFavorite.id = "image1";
      divFavorite.className = "image-container";
      divButtonFavorite.className = "button-container";
      buttonFavorite.className = "button";
      buttonFavorite.onclick = () => deleteFavoriteCat(cat.id);

      buttonFavorite.append(buttonTextFavorite);
      divButtonFavorite.append(buttonFavorite);
      divFavorite.append(imgFavorite, divButtonFavorite);

      arrDivFavorite.push(divFavorite);
    });
    sectionFavorite.append(...arrDivFavorite);
  }
}
favoriteCat();

async function saveCat(id) {
  const response = await fetch(favoriteAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY":
        "live_hR34c4PdMhFiKFMQSnQJg0hWle3qJdworGmAiSBY1DqL0ct1MUdZVdrk3ZuMiAZ5",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await response.json();

  if (response.status !== 200 || response.status !== 201) {
    spanError.innerText = "Hubo un error";
  } else {
    favoriteCat();
  }
}

async function deleteFavoriteCat(id) {
  const response = await fetch(deleteFavoriteAPI(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY":
        "live_hR34c4PdMhFiKFMQSnQJg0hWle3qJdworGmAiSBY1DqL0ct1MUdZVdrk3ZuMiAZ5",
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerText = "Hubo un error";
  } else {
    favoriteCat();
  }
}

async function uploadCat() {
  const formData = new FormData(form);

  const response = await fetch(uploadAPI, {
    method: "POST",
    headers: {
      "X-API-KEY":
        "live_hR34c4PdMhFiKFMQSnQJg0hWle3qJdworGmAiSBY1DqL0ct1MUdZVdrk3ZuMiAZ5",
    },
    body: formData,
  });
  const data = await response.json();

  saveCat(data.id);
  favoriteCat();
}
