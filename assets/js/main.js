const mainRow = document.querySelector("#mainrow");
const counter = document.querySelector(".counter > span");

counter.innerHTML = JSON.parse(localStorage.getItem("basket"))
  ? JSON.parse(localStorage.getItem("basket")).length
  : 0;

const products = [
  {
    id: 0,
    count: 1,
    name: "Volvo xc90",
    price: 100000,
    img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-volvo-xc90-mmp-1-1603304643.jpg",
  },
  {
    id: 1,
    count: 1,
    name: "Volvo xc60",
    price: 80000,
    img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-vilvo-xc60-mmp-1-1615394783.jpg?crop=0.764xw:1.00xh;0.119xw,0&resize=640:*",
  },
  {
    id: 2,
    count: 1,
    name: "Volvo xc40",
    price: 60000,
    img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-volvo-xc40-mmp-1-1598474101.jpg",
  },
  {
    id: 3,
    count: 1,
    name: "Volvo c40",
    price: 60000,
    img: "https://ev-database.org/img/auto/Volvo_C40_Recharge/Volvo_C40_Recharge-01@2x.jpg",
  },
];

function renderProducts() {
  products.forEach((product) => {
    const { img, id, name, price } = product;
    const col = document.createElement("div");
    const card = document.createElement("div");
    const cart = document.createElement("div");
    const cartIcon = document.createElement("i");
    const imageContainer = document.createElement("img");
    const cardBody = document.createElement("div");
    const title = document.createElement("h5");
    const priceContainer = document.createElement("p");

    cart.classList.add("card--cart");
    cart.setAttribute("id", id);
    title.classList.add("card-title");
    priceContainer.classList.add("card-text");
    cartIcon.classList.add("fas");
    cartIcon.classList.add("fa-cart-plus");
    imageContainer.classList.add("card--image");
    imageContainer.classList.add("card-img-top");
    col.classList.add("col");
    card.classList.add("card");
    cardBody.classList.add("card-body");

    if (isItemInBasket(id)) {
      cart.classList.add("active--cart");
    }

    imageContainer.setAttribute("src", img);

    title.innerHTML = name;
    priceContainer.innerHTML = price;

    cart.onclick = () => handleProductClick(product)

    cardBody.appendChild(title);
    cardBody.appendChild(priceContainer);
    cart.appendChild(cartIcon);

    card.appendChild(cart);
    card.appendChild(imageContainer);
    card.appendChild(cardBody);
    col.appendChild(card);
    mainRow.appendChild(col);
  });
}

renderProducts();

function handleProductClick(product) {
  let localItems = JSON.parse(localStorage.getItem("basket")) || [];
  const element = document.getElementById(product.id);

  if (localItems.some((item) => item.id === product.id)) {
    const isConfirmed = confirm("Are you sure to delete?");

    if (isConfirmed) {
      element.classList.remove("active--cart");
      localItems = localItems.filter((item) => item.id !== product.id);
    } else {
      alert("HAHAHA");
    }
  } else {
    element.classList.add("active--cart");
    localItems.push(product);
  }

  counter.innerHTML = localItems.length;

  localStorage.setItem("basket", JSON.stringify(localItems));
}

function isItemInBasket(id) {
  return JSON.parse(localStorage.getItem("basket"))
    ? JSON.parse(localStorage.getItem("basket")).some((item) => item.id === id)
    : false;
}
