let cart=document.querySelectorAll(".add-cart");
let products = [
    
    {id: "1", name: "Gold high heal sandle",price: 25.00,inCart: 0},
    { id: "2", name: "Red high heals sandle", price: 20.00, inCart: 0 },
    { id: "3", name: "Cream normal heal sandle",  price: 18.00, inCart: 0 },
    { id: "4", name: "Perple flat sandle",  price: 10.00, inCart: 0 },
    { id: "5", name: "Cream squre style shoe",  price: 25.00, inCart: 0 },
    { id: "6", name: "Meroon Normal heal court shoe",  price: 20.00, inCart: 0 },
    {id: "7", name: "Orange color casual shoe",price: 18.00,inCart: 0},
    { id: "8", name: "Light Brown flat court shoe", price: 22.00, inCart: 0 },
    { id: "9", name: "Brown color leather slipper",  price: 25.00, inCart: 0 },
    { id: "10", name: "Black color cashual slipper",  price: 20.00, inCart: 0 },
    { id: "11", name: "Brown color imported cashual slipper",  price: 18.00, inCart: 0 },
    { id: "12", name: "Brown color imported leather slipper",  price: 10.00, inCart: 0 },
    { id: "13", name: "Light Brown color casual shoe",  price: 25.00, inCart: 0 },
    { id: "14", name: "Black color casual shoe",  price: 20.00, inCart: 0 },
    { id: "15", name: "Brown color office shoe",  price: 18.00, inCart: 0 },
    { id: "16", name: "Black Color office shoe",  price: 22.00, inCart: 0 },

  ];
  for (let i = 0; i < cart.length; i++)
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}
function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
  
    productNumbers = parseInt(productNumbers);
  
    if (productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
      document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector(".cart span").textContent = 1;
    }
  
    setItems(product);
  }


function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }

    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = { [product.id]: product };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    console.log("cost", cartCost);
  
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
      localStorage.setItem("totalCost", product.price);
    }
  }


  