let orders = [
    {
        id: '1',
        name:'John',
        address:'Ranchi'
    },
    {
        id: '2',
        name: 'Sam',
        address: 'Bangalore'
    },
]

function getOrders() {
    return orders;
}

function createOrder(order) {
    orders.push(order);
    return order;
}

function getOrderById(id) {
    return orders.filter((order) => order.id == id)[0]
}

function updateOrderById(id, newOrder) {
    let updated = false;

    console.log('Updating order', id, newOrder)
    orders = orders.map((order) =>{
        console.log('matching with', id, order.id == id)

        if (order.id == id) {
            updated = true 
            console.log('matched updating')

            return {...newOrder, id}
        }

        return order
    })

    return updated
}

function deleteOrderById(id) {
    orders = orders.filter((order) => order.id != id)
    return true
}

module.exports = {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
}