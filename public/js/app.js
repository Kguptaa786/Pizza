// import { initAdmin } from './admin'
// import axios from 'axios'
let addToCart = document.querySelectorAll('.add-to-cart')       //a class name at homepage 
let cartCounter = document.querySelector('#cartCounter')        //a id name at navbar


function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {     //axios is used to send http request from js file
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

//at orders.ejs page we showing alert message when order placed we need to remove it after some time
function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">
                    <p>${order._id}</p>
                    <div>${renderItems(order.items)}</div>
                </td>
                <td class="border px-4 py-2">${order.customerId.name}</td>
                <td class="border px-4 py-2">${order.address}</td>
                <td class="border px-4 py-2">
                    <div class="">
                        <form action="/admin/order/status" method="POST">
                            <input type="hidden" name="orderId" value="${order._id}">
                            <select name="status" onchange="this.form.submit()">
                                <option value="order_placed"
                                    ${order.status === 'order_placed' ? 'selected' : ''}>
                                    Placed</option>
                                <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                                    Confirmed</option>
                                <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                                    Prepared</option>
                                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                                    Delivered
                                </option>
                                <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                                    Completed
                                </option>
                            </select>
                        </form>
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${moment(order.createdAt).format('hh:mm A')}
                </td>
                <td class="border px-4 py-2">
                    ${order.paymentStatus ? 'paid' : 'Not paid'}
                </td>
            </tr>
        `
        }).join('')
    }
}

initAdmin()