const port = '5000'

const serevrurl = 'http://localhost:'+port

const requests = {
    usersapi : serevrurl+'/users',
    clientsapi : serevrurl+'/clients',
    productsapi : serevrurl+'/products',
    categoriesapi : serevrurl+'/categories',
    ordersapi : serevrurl+'/orders',
}

export default requests