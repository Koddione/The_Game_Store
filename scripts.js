const steamContainer = document.getElementById("steamGames");
const modalAddGame = document.querySelector(".modal-window");
const btnAddGame = document.getElementById("addGame");
const btnCloseModelWindow = document.getElementById("modalClose");
const btnOpenModelWindow = document.getElementById("OpenModelWindow");
const inputAddLink = document.getElementById("addLink");
const inputAddName = document.getElementById("addName");
const inputAddDiscription = document.getElementById("addDiscr");
const modalWindowCart = document.querySelector(".bcShadowGame");
const btnCloseCart = document.getElementById("closeCart");

const spanCartName = document.getElementById("cartName");
const spanCartDiscription = document.getElementById("cartDiscription");
const spanCartPrice = document.getElementById("cartPrice");
const spanCartLink = document.getElementById("cartLink");
const btnAddToCart = document.getElementById("addToCart");

const gamesList = [];
const cartGames = [];
fetch("dataBase/gameList.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((el) => {
      gamesList.push(el);
    });

    render();
  })
  .catch((err) => {
    console.error("Ошибка:", err);
  });

class ObjectGames {
  constructor(element) {
    try {
      this.scrImg = element.scrImg || "undefined.jpg";
      this.nameGame = element.nameGame || "Not Name";
      this.discription = element.discription || "Not discription";
    } catch (err) {
      console.error("Ошибка при инициализации объекта игры:", err);
      this.scrImg = "undefined.jpg";
      this.nameGame = "Not Name";
      this.discription = "Not discription";
    }
  }

  fnAddGame(index) {
    const imagePath = `/img/${this.scrImg}`;

    return `<div class="games-block" data-index=${index}>
                <div class="pictures">
                   <img src="${imagePath}" onerror="this.onerror=null; this.src='/img/undefined.jpg'" alt="${this.nameGame}">   
                </div>
                <div class="nameGame"><span>${this.nameGame}</span></div>
                <div class="discription"><span>${this.discription}</span></div>
             </div>`;
  }
}

const newGame = new ObjectGames({
  scrImg: "#",
  nameGame: "#",
  discription: "#",
});
function render() {
  steamContainer.innerHTML = ``;
  for (let i = 0; i < gamesList.length; i++) {
    const newGame = new ObjectGames(gamesList[i]);

    steamContainer.insertAdjacentHTML("beforeend", newGame.fnAddGame(i));
  }
}

btnOpenModelWindow.addEventListener("click", () => {
  modalAddGame.style.display = "block";
});
btnCloseModelWindow.addEventListener("click", () => {
  modalAddGame.style.display = "none";
});
btnCloseCart.addEventListener("click", () => {
  modalWindowCart.style.display = "none";
});
btnAddGame.addEventListener("click", () => {
  gamesList.push({
    scrImg: inputAddLink.value,
    nameGame: inputAddName.value,
    discription: inputAddDiscription.value,
  });

  inputAddLink.value = "";
  inputAddName.value = "";
  inputAddDiscription.value = "";
  modalAddGame.style.display = "none";
  render();

  const jsonData = JSON.stringify(gamesList, null, 2);
});

steamContainer.addEventListener("click", (event) => {
  const gameBlock = event.target.closest(".games-block");
  if (gameBlock) {
    const gameIndex = Number(gameBlock.getAttribute("data-index"));

    if (gameIndex >= 0 && gameIndex < gamesList.length) {
      const game = gamesList[gameIndex];
      if (game.index === gameIndex) {
        modalWindowCart.style.display = "flex";

        spanCartName.textContent = game.nameGame;
        spanCartDiscription.textContent = game.discription;
        spanCartPrice.textContent = game.price;
        spanCartLink.href = game.link;
        btnAddToCart.addEventListener("click", () => {
          cartGames.push(game);
          modalWindowCart.style.display = "none";
        });
      }
    }
  }
});
