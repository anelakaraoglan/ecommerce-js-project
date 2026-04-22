const form = document.querySelector('.create-form');
const titleInput = document.querySelector('#title-input')
const categoryInput = document.querySelector('#category-create-input');
const priceInput = document.querySelector('#price-input');


// we must update the product with the given id
// we must fetch the product data from the API and populate the form fields (GET request)
// when the form is submitted, we must send a PUT request to the API to update the product

const params = new URLSearchParams(window.location.search);
const Id = params.get('productId');

document.addEventListener('DOMContentLoaded', async () => {

    // JS has this built-in object called URLSearchParams
    // it helps us parse the query parameters from the URL

 

    //alert(Id);

    const response = await fetch(`http://localhost:3000/products/${Id}`);

    //only in API requests .json() is used to convert JSON data into JS object   
    const date = await response.json();

    //populate the form fields with the fetched data
    titleInput.value = date.title;
    categoryInput.value = date.category;
    priceInput.value = date.price;
});

// from now on its similar to create.js but with PUT request
// we want to catch the form submit event

form.addEventListener('submit', async (e) => {

    // prevent the default event(refreshing the webpage) from happening
    e.preventDefault();


    // we want to create the object that we want to send to the db.json

    const newProduct = {
        title: titleInput.value,
        category: categoryInput.value,
        price: priceInput.value
    }

    // ^ 2 THINGS DIFFERENT BETWEEN POST(CREATE) AND PATCH(UPDATE)
    // METHOD HAS TO BE PATCH
    // YOUR URL REQUIRES THE ID OF THE PRODUCT YOU WANT TO UPDATE


    try {
        const response = await fetch(`http://localhost:3000/products/${Id}`, {
            // method is one of GET, POST, PUT, PATCH, DELETE
            method: "PATCH",
            // body is what you want to send to backend, in this case we want to send the object we created
            body: JSON.stringify(newProduct)
        })

        if(response.ok){
            window.location.pathname = '/index.html'
        }
    }
    catch(err){
        console.error(err)
        alert(err.message)
    }
})

