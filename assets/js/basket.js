const container = document.querySelector(".conatiner");
const summaryContainer = document.querySelector(".summaryContainer");
const summaryCount = document.querySelector(".summaryCount > span");
const summaryPrice = document.querySelector(".summaryPrice > span");

function renderProducts() {
  const localItems = getLocalItems();
  let price = 0;
  let itemCounts = 0;

  localItems.forEach((item) => {
    const { img, id, count: say, price: qiymet } = item;
    const count = document.createElement("span");
    const row = document.createElement("div");
    const minusButton = document.createElement("button");
    const plusButton = document.createElement("button");
    const image = document.createElement("img");
    const name = document.createElement("h5");

    count.setAttribute("style", "display: flex; justify-content: center");
    image.setAttribute("src", img);
    count.setAttribute("id", id);
    count.innerHTML = getCountOfProduct(id);
    minusButton.innerHTML = "-";
    plusButton.innerHTML = "+";

    minusButton.onclick = () => handleButtonClick("minus", id);
    plusButton.onclick = () => handleButtonClick("plus", id);

    itemCounts += say;
    price += qiymet * say;

    row.appendChild(image);
    row.appendChild(name);
    row.appendChild(plusButton);
    row.appendChild(count);
    row.appendChild(minusButton);
    row.classList.add("row");

    container.appendChild(row);
  });

  summaryCount.innerHTML = itemCounts;
  summaryPrice.innerHTML = price;
}

function getCountOfProduct(id) {
  const localItems = getLocalItems();

  return localItems.find((item) => item.id === id).count;
}

function getLocalItems() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

function handleButtonClick(action, id) {
  let localItems = getLocalItems();
  const element = document.getElementById(id);
  let count = 0;
  let price = 0;

  if (action === "minus") {
    const selectedItem = localItems.find((item) => item.id === id);

    if (selectedItem.count === 1) {
      localItems = localItems.filter((item) => item.id !== id);
      location.reload();
    } else {
      localItems = localItems.map((item) => {
        if (item.id === id && item.count > 0) {
          item.count--;
          element.innerHTML = item.count;
        }

        count += item.count;
        price += item.count * item.price;

        return item;
      });
    }
  } else {
    localItems = localItems.map((item) => {
      if (item.id === id && item.count < 40) {
        item.count++;
        element.innerHTML = item.count;
      }

      count += item.count;
      price += item.count * item.price;

      return item;
    });
  }


  summaryCount.innerHTML = count;
  summaryPrice.innerHTML = price;

  localStorage.setItem("basket", JSON.stringify(localItems));
}

renderProducts();
