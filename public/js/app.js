
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty
        notie.alert({
            text: 'Successfully added to cart',
            position: 'bottom'
        })
    })
}

addToCart.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)         //this is for accessing data attribute present in html file
        // console.log(pizza)                          //is we not use JSON Parse,we have string in pizza
        updateCart(pizza)       //we calling fn to update cart page
    })
})