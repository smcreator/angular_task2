angular.module('component.ordersModule', [
    'mongodb-factory'
])
.directive('orders',function(customersFactory){
    return {
        restrict: 'E',
        templateUrl: 'app/component/orders/orders.html',
        link: function($scope) {
            customersFactory.listCustomers().then(function () {
                $scope.customers = customersFactory.customers;
            });
        }
    }
});
