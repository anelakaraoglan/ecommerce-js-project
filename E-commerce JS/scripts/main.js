// GETTING THE ELEMENTS
const grid = document.querySelector('.grid');
const categoryInput = document.querySelector('#category-input')

var products = [];

// Application Programming Interface
/*

    Used to read, create, update and delete data from an external source. 

*/




// let's fetch some data when the page first loads

document.addEventListener('DOMContentLoaded', async () => {

    //^ fetch is a function that we use to get some data from anywhere on the internet

    //* A promise is something that ensures us that a value will be given at some point in the future, but at the moment we don't have that value.

    //? Asynchronous Function (async function) => when you run a function but that function requires some time and needs to be waited to be finished, it's called an async function for example: fetch

    //! So, to wait out for these, we need " async - await " keywords.

    const response = await fetch('http://localhost:3000/products')

    // console.log("res:", response) // => this response currently doesn't have readable data, so we will have to convert it ourselves

    const data = await response.json();

    console.log(data)

    //* json server sends our products array directly as the "data" itself
    products = data

    //^ HOWEVER, some api we find on the internet 

    renderProducts();
})



categoryInput.addEventListener('change', async () => {

    let response;

    if (categoryInput.value != "") {
        response = await fetch(`https://dummyjson.com/products/category/${categoryInput.value}`)
    }
    else {
        response = await fetch(`https://dummyjson.com/products`)
    }

    const data = await response.json();

    products = data.products;

    renderProducts();

})


const renderProducts = () => {

    // ^ FIRST WE CLEAR ALL PRODUCTS
    grid.innerHTML = ""

    // for(let product of products)
    products.forEach((item) => {
        const newCard = `
            <div class="card" data-productId=${item.id}>
                <img src="${item.images ? item.images[0] : 'https://picsum.photos/200'}">
                <h4>${item.title}</h4>
                <h4 class="category">${item.category}</h4>
                <span class="price">$${item.price}</span>
                <button class="remove-btn">
                    Remove
                </button>
                <a 
                    class="update-btn"
                    href="/update.html?productId=${item.id}"
                >
                    Update
                </a>
                <div class="buttons">
                    <button class="btn">Add to Favorites</button>
                    <button class="btn">Add to Cart</button>
                </div>
            </div>
        `

        grid.insertAdjacentHTML('afterbegin', newCard)

    })

    const removeBtns = document.querySelectorAll('.remove-btn')

    removeBtns.forEach((button) => {

        button.addEventListener('click', async (e) => {
            const card = e.target.closest('.card');
            card.remove();
            e.preventDefault()

            await fetch(`http://localhost:3000/products/${card.dataset.productid}`,
                {
                    method: "DELETE"
                }
            )
        })

    })

}