let productDiv = document.querySelector(".product");
let categoryListDiv = document.querySelector(".categoryList");
let checkCat = ["men's clothing","jewelery","electronics","women's clothing"];
let allCat = [];

let displayProduct = async (allCheckCat=[]) => {
    productDiv.innerHTML = "";
    categoryListDiv.innerHTML = "";
    let product = await fetch('https://fakestoreapi.com/products');
    let finalProduct= await product.json();
  
    console.log("data", finalProduct);    

    finalProduct.forEach(item => {
        if(!allCat.includes(item.category)) {       
            categoryListDiv.innerHTML += `<label for=""><input type="checkbox" onClick="categoryFilter()" value=${item.category}>${item.category}</label>`;
            allCat.push(item.category);
        }

        if(allCheckCat.length == 0){
            allCheckCat = allCat;
        }
        if(allCheckCat.includes(item.category)){
            productDiv.innerHTML += `<div class="productItems">
                    <img src="${item.image}" alt="${item.title}" />                
                    <h3>${item.title}</h3>  
                    <p>$${item.price} | ${item.rating.rate}</p>              
                </div>`;
        }
    });


}

displayProduct();

let categoryFilter = () => {
    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkdata = [];
    checkInput.forEach((e) => {
        if(e.checked){
            checkdata.push(e.value);            
        }
    });
    displayProduct(checkdata);
}
