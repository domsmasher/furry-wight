admin.controller('ItemsListCtrl', function ($scope, itemsService) {
    itemsService.getItems(function (items) {
        $scope.items = items;
    });
});

admin.controller('ItemsAddCtrl', function ($scope) {
    $scope.insertItem = function () {

    };
});