describe('factory-test', function() {
    beforeEach(module('templates'));
    beforeEach(module('ui.router'));
    //beforeEach(module('customersModule'));

    beforeEach(module('mongodb-factory', function (mongodbFactoryProvider) {
        mongodbFactoryProvider.setConfigs({
            dataBase: 'customer_orders',
            apiKey: 'rMLrElZcWkO5HU4Il5PJ1D1h4eFdGQW4'
        });
    }));

    beforeEach(inject(function ($httpBackend) {
        var url = 'https://api.mongolab.com/api/1/databases/customer_orders/collections/for_test?apiKey=rMLrElZcWkO5HU4Il5PJ1D1h4eFdGQW4';
        $httpBackend.whenGET(url).respond(200, [{}]);
    }));

    it('Check factory instance', inject(function(customersFactory){
        expect(customersFactory).toBeDefined();
        expect(customersFactory.listCustomers).toBeDefined();

        console.log("Factory is correct.");
    }));

    it('Factory.loadCustomers', inject(function(customersFactory){
        customersFactory.listCustomers();
        var customers = customersFactory.customers;
        expect(customers.length).toBe(0);
        console.log(customers);
    }));
});