angular.module('test-application.templates', []);
angular.module('test-application', [
    'component.ajax-error',
    'component.app-version',
    'component.first-component',
    'test-application.templates',
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'mongodb-factory',
    'component.menu-module',
    'component.customersModule',
    'component.ordersModule'
]).config(function ($stateProvider, $urlRouterProvider, mongodbFactoryProvider){
    mongodbFactoryProvider.setConfigs({
        dataBase:'customer_orders',
        apiKey:'rMLrElZcWkO5HU4Il5PJ1D1h4eFdGQW4'
    });
    $stateProvider
        .state('index',{
            url:'/',
            template:'<customers/>'
        })
        .state('customers',{
            url:'/customers',
            template:'<customers/>'
        })
        .state('orders',{
            url:'/orders',
            template:'<orders/>'
        })
        .state('customerDetails',{
            url:'/customerDetails/:id',
            template:'<customer-detail/>'
        })
        .state('editOrder',{
            url:'/editOrder/:orderId/:customerId/',
            template:'<edit-order/>'
        });
    $urlRouterProvider.otherwise('/');
});