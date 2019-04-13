// class principal
class Product{
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//class user interface UI
class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.classList = 'card text-center mb-4';
        element.innerHTML = `
                <div class="card-header">Product</div>
                <div class="card-body">
                    <span class="m-5"><strong>Name: </strong>${product.name}</span>
                    <span class="m-5"><strong>Price: </strong>${product.price}</span>
                    <span class="m-5"><strong>Year: </strong>${product.year}</span>
                    <button class="btn btn-danger btn-sm" name="delete">Delete</button>
                </div>
        `;
        productList.appendChild(element);
        let products = [];
        products.push(product);  
        
        if (localStorage.getItem('products') === null ||localStorage.getItem('products') === '') {
            localStorage.setItem('products',JSON.stringify(products));
        }else {
            let newProduct = JSON.parse(localStorage.getItem('products'));
            newProduct.forEach(plus => {
                products.push(plus); 
            });
            localStorage.setItem('products',JSON.stringify(products));
        }
        this.resetForm();
        this.showMessage('product added successfully','success');
    }

    resetForm(){
        document.getElementById('product-from').reset();
    }

    deleteProduct(element){
        if (element.name === "delete") {
            element.parentElement.parentElement.remove();
            this.showMessage('product deleted successfully','info');
        }
    }
    showMessage(message, type){
        const div = document.createElement('div');
        div.classList = `alert alert-${type} mt-4`;
        div.appendChild(document.createTextNode(message));

        //showing in DOM
        const  container =document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div,app);
        
        //remove alert
        setTimeout( () => document.querySelector('.alert').remove(),3000);
    }
    showProducts(products){
       const list = document.getElementById('product-list');
            
           for (const item of products) {
            let newDiv = document.createElement('div');
               newDiv.classList = 'card text-center mb-4';
               newDiv.innerHTML = `
                                <div class="card-header">Product</div>
                                <div class="card-body">
                                    <span class="m-5"><strong>Name: </strong>${item.name}</span>
                                    <span class="m-5"><strong>Price: </strong>${item.price}</span>
                                    <span class="m-5"><strong>Year: </strong>${item.year}</span>
                                    <button class="btn btn-danger btn-sm" name="delete">Delete</button>
                                </div>
                                `;
            list.appendChild(newDiv);
        }

    }
}

//
// window.onload = function () {  };
document.addEventListener('DOMContentLoaded',(e) => {
  
    if (localStorage.getItem('products') !== null || localStorage.getItem('products') !== '') {
        let products = JSON.parse(localStorage.getItem('products'));
        const ui = new UI();
        ui.showProducts(products);
    }
});

// DOM event
document.getElementById('product-from').addEventListener('submit',(e) => {
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    
    const product = new Product(name,price,year);
    const ui = new UI();
    if (name === '' || price === '' || year ==='') {
        return  ui.showMessage('product fields please','danger');
    }
    ui.addProduct(product);
    
    e.preventDefault();
});

//DELETE event
document.getElementById('product-list').addEventListener('click',(e) => {
    const ui = new UI();
    ui.deleteProduct(e.target);
});
