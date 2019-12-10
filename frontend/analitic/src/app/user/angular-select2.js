angular.module('app-analitic', ['willcrisis.angular-select2'])
      .controller('LocationController', function($scope) {
        $scope.selected = null;
        $scope.multipleSelected = [2];
        $scope.disabled = false;
        $scope.list = [{
          id: 1,
          name: 'John'
        }, {
          id: 2,
          name: 'Mary'
        }, {
          id: 3,
          name: 'Scott'
        }, {
          id: 4,
          name: 'Drew'
        }, {
          id: 5,
          name: 'Jackson'
        }]
      });
