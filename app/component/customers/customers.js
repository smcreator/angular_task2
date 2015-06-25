angular.module('component.customersModule',[
    'mongodb-factory'
])
.directive('customers', function(mongodbFactory, customersFactory) {
    return {
        restrict: 'E',
        templateUrl: 'app/component/customers/customers.html',
        link: function($scope) {
            $scope.clearState = function () {
                $scope.isCreate = false;
                $scope.isEdit = false;

                $scope.customer = {};
            };
            $scope.create = function () {
                $scope.clearState();
                $scope.isCreate = true;

                $scope.customer.action = "Add new customer";
            };
            $scope.edit = function (item) {
                $scope.clearState();
                $scope.isEdit = true;

                $scope.customer = item;
                $scope.customer.action = "Edit customer";
            };
            $scope.delete = function (item) {
                $scope.clearState();
                customersFactory.deleteCustomer(item);
            };

            $scope.clearState();
            customersFactory.listCustomers().then(function () {
                $scope.customers = customersFactory.customers;
            });
        }
    };
})
.directive('customersUpdate', function(mongodbFactory, customersFactory) {
    return {
        restrict: 'E',
        templateUrl: 'app/component/customers/customers-update.html',
        link: function($scope) {
            $scope.addConfirm = function (item) {
                $scope.clearState();
                item.name = item.firstName + " " + item.lastName;
                customersFactory.addCustomer(item);
            };
            $scope.editConfirm = function (item) {
                $scope.clearState();
                item.name = item.firstName + " " + item.lastName;
                customersFactory.updateCustomer(item);
            };
        }
    }
})
.directive('customerOrders',function($state, customersFactory){
    return{
        scope:true,
        templateUrl:'app/component/customers/customer-orders.html',
        link: function($scope) {
            $scope.removeOrder = function(customer, order){
                alert('remove order ' + customer.id + ":" + order.id);
            }
        }
    }
})
.filter('sum', function(){
    return function(items){
        if (typeof items === 'undefined') return;
        var result = 0;
        items.forEach(function(item){
            result = result + ((item.price || 0) * (item.count || 0));
        });
        return result;
    }
});