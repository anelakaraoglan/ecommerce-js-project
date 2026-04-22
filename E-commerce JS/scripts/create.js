const form = document.querySelector('.create-form');
const titleInput = document.querySelector('#title-input')
const categoryInput = document.querySelector('#category-create-input');
const priceInput = document.querySelector('#price-input');

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

    // now we can send a POST request to the db.json to actually create this object in the backend

    // if we dont declare it as a POST request it will be GET by default
    // api requests are async so we have to await them

    // * When you store/send value somewhere, you need it to be in JSON format.
    // * JSON is like a cardboard box, when you want to send an item to someone you have to wrap it up with a box.
    // to turn JS into JSON => JSON.stringify(yourJsObject)

    // ^ When you want to change/update a value you need it to be in JS format.
    // ^ JS is like unboxed format, when you want to add something to the box or take something out you need to open the box. (make it JS)
    // to turn JSON into JS => JSON.parse(yourJSONObject)

    try {
        const response = await fetch('http://localhost:3000/products', {
            // method is one of GET, POST, PUT, PATCH, DELETE
            method: "POST",
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

