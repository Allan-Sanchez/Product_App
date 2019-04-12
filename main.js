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
            newProduct.push(products);
            localStorage.setItem('products',JSON.stringify(newProduct));
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
        console.log(products);
    }
}

if (localStorage.getItem('products') !== null || localStorage.getItem('products') !== null) {
    let products = JSON.parse(localStorage.getItem('products'));
    const ui = new UI();
    ui.showProducts(products);
    console.log('listo');
}
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
