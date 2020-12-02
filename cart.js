//varibles
const cartBtn= document.querySelector(".cartbtn");
const addcart= document.querySelector(".btn");
const clearcart= document.querySelector(".clearcart");
const cartItems= document.querySelector(".col4");
const cartTot= document.querySelector(".carttot");
const cartContent= document.querySelector(".cartinfo");
const productsDom= document.querySelector(".row");
 console.log(addcart);
//cart
let cart=[];
// button
let CartButtonsDom= [];

//getting products
class product{
   async getProducts(){
       try{
        let result= await fetch('product.json');
        let data= await result.json();
        let products= data.item;
        products=products.map(item=>{
            const{title,price}=item.fields;
            const{id}=item.sys
            const image=item.fields.image.field.file.url;
            
            return{title,price,id,image}
        })
        return products;
       }
       catch(error){
           console.log(error);

       }
    
    }

}

//display products

class UI{

    displayProducts(products){
        let result='';
        products.forEach(product=>{
            result+=`
            <!--Single Products Details-->

<div class="smallcontainer singlepro">
    <div class="row">
        <div class="col2">
            <img src=${products.image}>
        </div>
        <div class="col2">
            <p>Sport / Shoe</p>
            <h1>${products.title}</h1>
            <h3>$${products.price}</h3>
            <select>
                <option >Select Size</option>
                <option >5</option>
                <option >6</option>
                <option >7</option>
                <option >8</option>
            </select><br>
            <input type="number" value="1">
            <a href="cart.html" class="btn"> Add To Cart</a>

            
            
        </div>
    </div>

</div>`
        })
        
        //console.log(products);
        productsDom.innerHTML=result;
        getCartButton();{
            const addcartButton = [...document.querySelector(".btn")]; 
            CartButtonsDom=addcartButton;
           // console.log(addcartButton);
           addcartButton.forEach(button=>{
               let id=addcart.dataset.id;
               let inCart=cart.find(item=> item.id==id);
               //console.log(id);
               if(inCart){
                   addcart.innerText="Add cart";
                   addcart.disabled=true;
               }
               
                   addcart.addEventListener('click',(event)=>{
                       event.target.innerText='Add cart';
                       event.target.disabled=true;

                       // get product from products
                       let cartItem={...storage.getProduct(id), amount: 1};
                       
                       //add products to the cart
                       cart=[...cart, cartItem];
                       // save cart in local storage
                       storage.saveCart(cart)
                       //set cart values
                       this.setCartValues(cart);
                       //display cart item
                       this.addCartItem(cartItems);
                       //show the cart
                       this.showCart();


                   })
               
           })

        }

    }
    
    setCartValues(cart){
        let tempTot=0;
        let itemTot=0;
        cart.map(item=>{
            tempTot=item.price*item.amount;
            itemTot=item.amount;
        })
        cartTot.innerText=parseFloat(tempTot.toFixed(2))
        cartItems.innerText=itemTot;
    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('smallcontainer');
        div.innerHTML=`
        <table>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Sub Total</th>
        </tr>
        <tr>
            <td>
                <div class="cartinfo">
                    <img src=${item.image} >
                </div>
                <div>
                    <p>${item.title}</p>
                    <small>Price:$${item.price}</small>
                    <br>
                    <a href="" data id=${item.id}>Remove</a>
                </div>

            </td>
            <td><input type="number" value="1" id="quantity" onkeyup="getSubTot()"></td>
            <td id="subtot"></td>
        </tr>
        </table>
        `
        cartContent.appendChild(div);
}
showCart(){
    productsDom.classList.add('row');
}
    }
    

//Local Storage
class storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products))
    }

    static getProduct(id){
        let products=JSON.parse(localStorage.getItem('products'));
        return products.find(product=>product.id==id);
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }

}

document.addEventListener("DOMContentLoader",()=>{
const ui=new UI();
const Product=new product();

// get all poducts
product.getProducts().then(products=>{
ui.displayProducts(products);
storage.saveProducts(products);
}).then(()=>{
    ui.getCartButton
});
});