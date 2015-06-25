angular.module('mongodb-factory', ['ngResource'])
.provider('mongodbFactory', function (mongodbConfigs) {
    this.setConfigs = function (_mongodbConfigs) {
        angular.extend(mongodbConfigs, _mongodbConfigs);
    };
    this.$get = function ($resource) {
        var cfg = mongodbConfigs;
        var url = [cfg.url, cfg.dataBase, 'collections', cfg.collection, ':id'].join('/');
        return $resource(url, {apiKey: cfg.apiKey}, {
            update: {method: 'PUT'}
        });
    };
})
.constant('mongodbConfigs',  {
    url: 'https://api.mongolab.com/api/1/databases',
    collection: 'customers',
    dataBase: null,
    apiKey: null
})
.factory('customersFactory', function(mongodbFactory){
    return {
        customers: [],
        listCustomers: function() {
            var that = this;
            return mongodbFactory.query().$promise.then(function (result) {
                console.log("listCustomers.response");
                that.customers = result;
            });
        },
        addCustomer: function(item) {
            var that = this;
            var newItem={
                id: new Date(),
                firstName: item.firstName,
                lastName: item.lastName,
                name: item.name,
                city: item.city,
                gender: item.gender,
                orders:[]
            };
            return mongodbFactory.save(newItem).$promise.then(function(result){
                newItem.id = result.id;
                that.customers.push(newItem);
                //console.log(result);
            });
        },
        updateCustomer: function(item) {
            var that = this;
            return mongodbFactory.update(
                {
                    id: item._id.$oid
                }, item);
        },
        deleteCustomer: function (item) {
            var that = this;
            mongodbFactory.remove({id: item._id.$oid});
            that.customers.splice(that.customers.indexOf(item), 1);
        }
    };
});