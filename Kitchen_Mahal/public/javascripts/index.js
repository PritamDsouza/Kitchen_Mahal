var module = angular.module("KitchenMahal", ["ui.router", "ngResource"]);

module.config(
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/Home");
        $stateProvider.state(
            "Home", {
                url: "/Home",
                views: {
                    main: {
                        templateUrl: "pages/home.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Aboutus", {
                url: "/Aboutus",
                views: {
                    main: {
                        templateUrl: "pages/aboutus.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Menu", {
                url: "/Menu",
                views: {
                    main: {
                        templateUrl: "pages/menu.html",
                    }
                }
            }
        );
        $stateProvider.state(
            "TableReservation", {
                url: "/TableReservation",
                views: {
                    main: {
                        templateUrl: "pages/tableReservation.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Contactus", {
                url: "/Contactus",
                views: {
                    main: {
                        templateUrl: "pages/contactus.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Drinks", {
                url: "/Drinks",
                views: {
                    main: {
                        templateUrl: "pages/drinks.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Appetizer", {
                url: "/Appetizer",
                views: {
                    main: {
                        templateUrl: "pages/appetizer.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Entrees", {
                url: "/Entrees",
                views: {
                    main: {
                        templateUrl: "pages/entrees.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Deserts", {
                url: "/Deserts",
                views: {
                    main: {
                        templateUrl: "pages/deserts.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "username", {
                url: "/username",
                views: {
                    loginAs: {
                        templateUrl: "pages/username.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "SignUp", {
                url: "/SignUp",
                views: {
                    main: {
                        templateUrl: "pages/signup.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Logout", {
                url: "/Logout",
                views: {
                    main: {
                        templateUrl: "pages/home.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Orders", {
                url: "/Orders",
                views: {
                    main: {
                        templateUrl: "pages/orders.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Checkout", {
                url: "/Checkout",
                views: {
                    main: {
                        templateUrl: "pages/checkoutPage.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "OrderHistory", {
                url: "/OrderHistory",
                views: {
                    main: {
                        templateUrl: "pages/orderHistory.html"
                    }
                }
            }
        );
    }
);

module.controller("addCustomers", function ($scope, $resource) {
    $scope.save = function () {
        var request = $resource("/users/add");
        request.save(
            {
                firstName: $scope.FirstName,
                lastName: $scope.LastName,
                emailAddress: $scope.EmailAddress,
                contactNo: $scope.ContactNo,
                address: $scope.Address,
                zipcode: $scope.ZipCode,
                state: $scope.State,
                username: $scope.UserName,
                password: $scope.Password
            }, function (response) {
                if (response.error) {
                    $scope.error = response.error;
                } else {
                    $scope.message = "Customer has been successfully added.";
                    $scope.FirstName = "";
                    $scope.LastName = "";
                    $scope.EmailAddress = "";
                    $scope.ContactNo = "";
                    $scope.Address = "";
                    $scope.ZipCode = "";
                    $scope.State = "";
                    $scope.UserName = "";
                    $scope.Password = "";
                }
            });
    }
});

module.controller("drinksItems", function ($scope, $resource) {
    var request = $resource("/users/drinks");
    request.query(function (data) {
        $scope.items = data;
    });
    $scope.addToCart = function (item, quantity){
        var request = $resource("/users/orders");
        if (quantity > 0) {
            quantity = quantity;
        }
        else {
            quantity = 1;
        }
        var totalPrice = Math.round((quantity * item.price)*100) / 100;
        request.save(
            {
                foodId: item.drinkId,
                foodName: item.drinkName,
                imageUrl: item.imageURL,
                price: item.price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                alert(item.drinkName + ": Added to Orders");
            });
        
    }
});

module.controller("appetizerItems", function ($scope, $resource) {
    var request = $resource("/users/appetizer");
    request.query(function (data) {
        $scope.items = data;
    });
    $scope.addToCart = function (item, quantity){
        var request = $resource("/users/orders");
        if (quantity > 0) {
            quantity = quantity;
        }
        else {
            quantity = 1;
        }
        var totalPrice = Math.round((quantity * item.price) * 100) / 100;
        request.save(
            {
                foodId: item.appetizerId,
                foodName: item.appetizerName,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                alert(item.appetizerName + ": Added to Orders");
            });
        
    }
});

module.controller("entreesItems", function ($scope, $resource) {
    var request = $resource("/users/entrees");
    request.query(function (data) {
        $scope.items = data;
    });
    $scope.addToCart = function (item, quantity){
        var request = $resource("/users/orders");
        if (quantity > 0) {
            quantity = quantity;
        }
        else {
            quantity = 1;
        }
        var totalPrice = Math.round((quantity * item.price) * 100) / 100;
        request.save(
            {
                foodId: item.entreeId,
                foodName: item.entreeName,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                alert(item.entreeName + ": Added to Orders");
            });
    }
});

module.controller("desertsItems", function ($scope, $resource) {
    var request = $resource("/users/deserts");
    request.query(function (data) {
        $scope.items = data;
    });
    $scope.addToCart = function (item, quantity){
        var request = $resource("/users/orders");
        if (quantity > 0) {
            quantity = quantity;
        }
        else {
            quantity = 1;
        }
        var totalPrice = Math.round((quantity * item.price) * 100) / 100;
        request.save(
            {
                foodId: item.desertId,
                foodName: item.desertName,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                alert(item.desertName + ": Added to Orders");
            });
    }
});

module.controller("tableReservation", function ($scope, $resource) {
    $scope.checkAvailability = function () {
        var request = $resource("/users/tablereservation");
        request.save(
            {
                people: $scope.People,
                date: ((($scope.BookingDate).getMonth() + 1) + "/" + ($scope.BookingDate).getDate() + "/" + ($scope.BookingDate).getFullYear()),
                time: $scope.BookingTime
            }, function (response) {
                if (response.error == "Not Available") {
                    $scope.message = "Not Available, Please alter the selection!!!";
                } else {
                    $scope.message = "Congratulations!!! Table has been successfully booked.";
                }
            });
    }
});

module.controller("contactUs", function ($scope, $resource) {
    $scope.saveMessage = function () {
        var request = $resource("/users/contactus");
        request.save(
            {
                name: $scope.Name,
                email: $scope.Email,
                message: $scope.Message
            }, function (response) {
                if (response.error) {
                     response.error;
                } else {
                    $scope.message = "Message Successfully Sent.";
                    $scope.Name = "";
                    $scope.Email = "";
                    $scope.Message = "";
                }
            });
    }
});

module.controller("loginCustomer", function ($scope, $http, $resource) {
    $http.get("/users/username").then(function(data){
        if(data.data != "Not logged on"){
            $scope.username = data.data;
            $scope.currentUserLoggedIn = true;
        } else{
            $scope.currentUserLoggedIn = false;
        }
    });
    $scope.signin = function () {
        var request = $resource("/users/signin");
        request.save(
            {
                username: $scope.UserName,
                password: $scope.Password
            }, function (response) {
                if (response.error) {
                    $scope.message = response.error;
                } else {
                    $scope.currentUserLoggedIn = true;
                    $scope.username = response.username;
                    $scope.UserName = "";
                    $scope.Password = "";
                    location.reload();
                }
            });
    }
    $scope.logout = function () {
        $http.get("/users/logout").then(function(data){
         $scope.message = data.data;
        location.reload();
    });
    }
});

module.controller("cart", function ($scope, $resource) {
    var request = $resource("/users/cart");
    request.query(function (data) {
        $scope.items = data;
    });
    $scope.removeItem = function (foodId) {
        var request = $resource("/users/deletefromcart");
        request.save(
            {
                foodId: foodId
            }, function (response) {
                $scope.message = response;
                location.reload();
            });
    }
    $scope.checkout = function (items) {
        var request = $resource("/users/checkout");
        var totalAmount = 0;
        for(var i = 0; i < items.length;i++){
            totalAmount += +(items[i].totalPrice);
        }
        totalAmount = Math.round(totalAmount * 100) / 100;
        request.save(
            {
                totalAmount : totalAmount
            }, function (response) {
                if (response.error) {
                    $scope.message = response.error;
                    $scope.showCheckoutPage = false;
                    alert($scope.message);
                } else {
                    $scope.message = response.success;
                    $scope.showCheckoutPage = true;
                    $scope.totalAmount = totalAmount;
                }
            });
    }
    $scope.DisplayPaymentMessage = function () {
        var request = $resource("/users/onPaymentRemoveFromCart");
        request.save(
            {
            }, function (response) {
                location.reload();
                alert("Payment Done!!!Enjoy Your Food");
            });
    }
});

module.controller("OrderHistory", function ($scope, $resource) {
    var request = $resource("/users/orderHistory");
    request.query(function (data) {
       $scope.items = data;
    });
});
