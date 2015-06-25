angular.module('menuModule',[])
.directive('menu',function(){
    return{
        restrict:"E",
        transclude: true,
        templateUrl: 'app/component/menu/menu.html',
        link: function(scope){
            scope.active='customers';
            scope.title = 'Customer orders management app';
        }
    }
});