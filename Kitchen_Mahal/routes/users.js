var express = require('express');
var router = express.Router();
var fs = require("fs");
var session;
/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

/* GET customers listing. */
router.get('/', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/customers.json', 'utf8').trim();
    var customers = JSON.parse(json);
    res.end(JSON.stringify(customers));
});

router.post("/add", function (req, res) {
    var config = require('config');
    var customers = loadCustomers();
    var customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        contactNo: req.body.contactNo,
        address: req.body.address,
        zipcode: req.body.zipcode,
        state: req.body.state,
        username: req.body.username,
        password: req.body.password
    };
    customers.push(customer);
    fs.writeFileSync(config.dataPath + '/customers.json', JSON.stringify(customers), "utf8");
    var response = {
        customer: customer,
        error: ""
    };
    res.end(JSON.stringify(response));
});

function loadCustomers() {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/customers.json', 'utf8').trim();
    var customers = JSON.parse(json);
    return customers;
}

/* GET drinks listing. */
router.get('/drinks', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/drinks.json', 'utf8').trim();
    var drinks = JSON.parse(json);
    res.end(JSON.stringify(drinks));
});

/* GET appetizer listing. */
router.get('/appetizer', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/appetizer.json', 'utf8').trim();
    var appetizer = JSON.parse(json);
    res.end(JSON.stringify(appetizer));
});

/* GET entrees listing. */
router.get('/entrees', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/entrees.json', 'utf8').trim();
    var entrees = JSON.parse(json);
    res.end(JSON.stringify(entrees));
});

/* GET deserts listing. */
router.get('/deserts', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/deserts.json', 'utf8').trim();
    var deserts = JSON.parse(json);
    res.end(JSON.stringify(deserts));
});

router.post('/tablereservation', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/tablereservation.json', 'utf8').trim();
    var tableReservations = JSON.parse(json);
    var availability = false;
    var response;
    for (var i = 0; i < tableReservations.length; i++) {
        if (!(tableReservations[i].date == req.body.date && tableReservations[i].time == req.body.time)) {
            availability = true;
        } else {
            availability = false;
            response = {
                error: "Not Available",
            };
            break;
        }
    }
    if (availability == true) {
        var newReservation = {
            people: req.body.people,
            date: req.body.date,
            time: req.body.time
        };
        tableReservations.push(newReservation);
        fs.writeFileSync(config.dataPath + '/tablereservation.json', JSON.stringify(tableReservations), "utf8");
        response = {
            newReservation: newReservation,
        };
    }
    res.end(JSON.stringify(response));
});

router.post('/contactus', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/contactus.json', 'utf8').trim();
    var userMessages = JSON.parse(json);
    var userMessage = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    };
    userMessages.push(userMessage);
    fs.writeFileSync(config.dataPath + '/contactus.json', JSON.stringify(userMessages), "utf8");
    var response = {
        userMessage: userMessage,
        error: ""
    };
    res.end(JSON.stringify(response));
});

router.post('/signin', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/customers.json', 'utf8').trim();
    var customers = JSON.parse(json);
    var status = false;
    var response;
    for (var i = 0; i < customers.length; i++) {
        if (req.body.username == customers[i].username && req.body.password == customers[i].password) {
            status = true;
            break;
        } else {
            status = false;
            response = {
                error: "Username and password incorrect"
            };
        }
    }

    if (status == true) {
        session = req.session;
        session.loginAs = req.body.username;
        session.save();
        response = {
            username: req.session.loginAs ? req.session.loginAs : "Not logged on"
        };
    }
    res.end(JSON.stringify(response));
});

/* GET username. */
router.get('/username', function (req, res) {
    res.send(req.session.loginAs ? req.session.loginAs : "Not logged on");
});

router.get('/logout', function (req, res) {
    delete req.session.loginAs;
    res.end("logged out");
});

router.post('/orders', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    var order = {
        username : req.session.loginAs,
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
    };
    orders.push(order);
    fs.writeFileSync(config.dataPath + '/orders.json', JSON.stringify(orders), "utf8");
    var response = {
        order: order,
        error: ""
    };
    res.end(JSON.stringify(response));
});

/* GET cart listing. */
router.get('/cart', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    var cartOrders = [];
    for(var i = 0; i < orders.length; i++){
        if(orders[i].username == req.session.loginAs){
            cartOrders.push(orders[i]);
        } 
    }
    res.end(JSON.stringify(cartOrders));
});

router.post('/deletefromcart', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    for(var i = 0; i < orders.length; i++){
        if (orders[i].foodId == req.body.foodId) {
            orders.splice(i, 1);
        }
    }
    fs.writeFileSync(config.dataPath + '/orders.json', JSON.stringify(orders), "utf8");
    res.end("Record deleted");
});

router.post('/onPaymentRemoveFromCart', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].username == req.session.loginAs) {
            orders.splice(i);
        }
    }
    fs.writeFileSync(config.dataPath + '/orders.json', JSON.stringify(orders), "utf8");
    res.end("Payment Done!!!Enjoy Your Food");
});

router.post('/checkout', function (req, res) {
    
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/customers.json', 'utf8').trim();
    var customers = JSON.parse(json);
    var json2 = fs.readFileSync(config.dataPath + '/orderHistory.json', 'utf8').trim();
    var orderHistorys = JSON.parse(json2);
    var Email = "";
    var Address = "";
    var response;
    var OrderId = Math.floor((Math.random()*50) + 1);
    var OrderDate = new Date();
    if (req.session.loginAs) {
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].username == req.session.loginAs) {
                Email = customers[i].emailAddress;
                Address = customers[i].address + ", " + customers[i].state + "-" + customers[i].zipcode;
            }
        }
        var orderHistory = {
            orderId: OrderId,
            orderDate: OrderDate,
            username: req.session.loginAs,
            emailAddress: Email,
            address: Address,
            totalAmount: req.body.totalAmount
        };
        orderHistorys.push(orderHistory);
        fs.writeFileSync(config.dataPath + '/orderHistory.json', JSON.stringify(orderHistorys), "utf8");
        response = {
            success: "Order History Created"
        };
    } else {
        response = {
            error: "Please login before checkout"
        };
    }

    res.end(JSON.stringify(response));
});

router.get('/orderHistory', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orderHistory.json', 'utf8').trim();
    var orderHistory = JSON.parse(json);
    var orderHistoryDisplay = [];
    for(var i = 0; i < orderHistory.length; i++){
        if(orderHistory[i].username == req.session.loginAs){
            orderHistoryDisplay.push(orderHistory[i]);
        } 
    }
    res.end(JSON.stringify(orderHistoryDisplay));
});

module.exports = router;