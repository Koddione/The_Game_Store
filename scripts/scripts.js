const steamContainer = document.getElementById("steamGames");
const modalAddGame = document.querySelector(".modal-window");
const btnAddGame = document.getElementById("addGame");
const btnCloseModelWindow = document.getElementById("modalClose");
const btnOpenModelWindow = document.getElementById("OpenModelWindow");
const inputAddLink = document.getElementById("addLink");
const inputAddName = document.getElementById("addName");
const inputAddPrice = document.getElementById("addPrice");
const inputAddDiscription = document.getElementById("addDiscr");
const modalWindowCart = document.querySelector(".bcShadowGame");
const btnCloseCart = document.getElementById("closeCart");

const spanCartName = document.getElementById("cartName");
const spanCartDiscription = document.getElementById("cartDiscription");
const spanCartPrice = document.getElementById("cartPrice");
const spanCartLink = document.getElementById("cartLink");
const btnAddToCart = document.getElementById("addToCart");

const cartNameBottom = document.getElementById("cartNameBottom");
const cartPriceBottom = document.getElementById("cartPriceBottom");
const cartTextAreaBottom = document.getElementById("CartTextArea");
const cartQuantityBottom = document.getElementById("cartQuantityBottom");

const gamesList = [];
const cartGames = [];
fetch("../dataBase/gameList.json")
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
    const imagePath = `../img/${this.scrImg}`;

    return `<div class="games-block" data-index=${index}>
                <div class="pictures">
                   <img src="${imagePath}" onerror="this.onerror=null; this.src='../img/undefined.jpg'" alt="${this.nameGame}">   
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
    price: inputAddPrice.value,
  });

  inputAddLink.value = "";
  inputAddName.value = "";
  inputAddDiscription.value = "";
  modalAddGame.style.display = "none";
  render();
});

let currentGame = null;

function handleAddToCart() {
  if (!currentGame) return;

  const gameExistsIndex = cartGames.findIndex(
    (item) => item.nameGame === currentGame.nameGame
  );

  if (gameExistsIndex !== -1) {
    cartGames[gameExistsIndex].quantity =
      (cartGames[gameExistsIndex].quantity || 1) + 1;
    console.log(`Количество игры "${currentGame.nameGame}" увеличено.`);
  } else {
    currentGame.quantity = 1;
    cartGames.push(currentGame);
    console.log(`Игра "${currentGame.nameGame}" добавлена в корзину.`);
  }

  modalWindowCart.style.display = "none";
}

steamContainer.addEventListener("click", (event) => {
  const gameBlock = event.target.closest(".games-block");
  if (gameBlock) {
    const gameIndex = Number(gameBlock.getAttribute("data-index"));

    if (gameIndex >= 0 && gameIndex < gamesList.length) {
      currentGame = gamesList[gameIndex];

      modalWindowCart.style.display = "flex";

      spanCartName.textContent = currentGame.nameGame;
      spanCartDiscription.textContent = currentGame.discription;
      spanCartPrice.textContent = currentGame.price;
      spanCartLink.href = currentGame.link;

      btnAddToCart.removeEventListener("click", handleAddToCart);

      btnAddToCart.addEventListener("click", handleAddToCart);
    }
  }
});
