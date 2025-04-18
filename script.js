//Elements references
const productsContainer = document.getElementById("productsContainer");
const feedbackElement = document.getElementById("feedback");
const cartContainer = document.getElementById("CartContainer");
const clearcartBtn = document.getElementById("Clearcart");
const sortbypriceBtn = document.getElementById("sorting");

//default products
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 500,
    },
    {
        id: 2,
        name: "MathsBook",
        price: 200,  
    },
    {
        id: 3,
        name: "SmartPhone",
        price: 400,
    },
    {
        id: 4,
        name: "SmartWatch",
        price: 5000,
    },
    {
        id: 5,
        name: "HeadPhones",
        price: 300,
    },
];

//empty cart
const cart = [];

let timerId;

//used to reset the timer(user feedback)
clearcartBtn.addEventListener("click", Clearcart);

sortbypriceBtn.addEventListener("click",sortByprice);

function Clearcart(){
    cart.length = 0;
    renderCartDetails();
    updateUserFeedback("Cart is Cleared!", "success");
}

function sortByprice(){
    cart.sort(function(item1, item2){
        return item1.price-item2.price;
        });
        renderCartDetails();
}

function renderproductDetails(){
products.forEach(function(product){
const {id, name, price} = product;
let divElement = document.createElement("div");
divElement.className = "product-row";
divElement.innerHTML =`
<p>${name} -Rs. ${price}</p>
<button onclick="addtocart(${id})">Add to Cart</button>
`;
  
  productsContainer.appendChild(divElement);
  
});


const testingbtn = document.getElementById('testing');
testingbtn.addEventListener('click', function() {
    console.log('clicked on testing button');
});
}

function renderCartDetails(){
    cartContainer.innerHTML="";
    cart.forEach(function(product) {
    const{ id, name, price}= product;
    const cartItemRow =`
      <div class="product-row">
      <p>${name} -Rs. ${price}</p>
      <button onclick="removeFromCart(${id})">Remove</button>
      </div>
    `;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });
//   let totalprice = 0;
  console.log("cart", cart);
//   for(i=0; i< cart.length;i++){
//     totalprice = totalprice +cart[i].price;
//   }

  const totalprice = cart.reduce(function(accu,currentprodu){
    return accu + currentprodu.price;
  },0)
  document.getElementById("totalprice").textContent=`Rs.${totalprice}`;
}

//add to cart
function addtocart(id){
    // console.log("add to cart clicked", id);

    //check if the product is already available in the card.
 
    const productToAdd = products.find((product)=> product.id === id);

    if (cart.some((product)=> product.id === id)){

        updateUserFeedback(`${productToAdd.name} already added to the Cart!`,"error");
            return ;
    }
    // const productToAdd = products.find(function(product){
        // return product.id ===id;
    // });
    // console.log(producToAdd);
    cart.push(productToAdd);
    console.log(cart);
    renderCartDetails()

    // feedbackElement.textContent =`${name}is added to the Cart!`;
     updateUserFeedback(`${productToAdd.name} is added to the Cart!`, "success");
}

function removeFromCart(id){
    console.log(id);
    const product = cart.find((product) => product.id === id);

    // const UpdatedCart = cart.filter(function(product){
    //     return product.id!=id;
    // });
    // console.log(UpdatedCart);
    const productIndex = cart.findIndex((product) => product.id === id);
    cart.splice(productIndex, 1);

    updateUserFeedback(`${product.name} is removed from the Cart!`, "error");
    renderCartDetails();
}

function updateUserFeedback(msg, type){
    clearTimeout(timerId);
    feedbackElement.style.display="block";
    //type - success(green), error(red)//

    if(type==="success"){
        feedbackElement.style.backgroundColor="green"
    };
    if(type==="error"){
        feedbackElement.style.backgroundColor="red"
    }
feedbackElement.textContent =msg;

timerId = setTimeout(function(){
  feedbackElement.style.display="none";
}, 3000)
};

//rendering products
renderproductDetails();