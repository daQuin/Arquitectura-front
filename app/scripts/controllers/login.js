(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:LoginCtrl
   * @description
   * # LoginCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('LoginCtrl', [
      '$mdDialog',
      '$mdToast',
      '$http',
      LoginCtrl
    ]);

  function LoginCtrl($mdDialog, $mdToast, $http) {

    var vm = this;

    vm.usuario = '';
    vm.submit = submit;

    function submit() {
      if (!_.isEmpty(vm.usuario)) {
        var data = {
          usuario: vm.usuario
        };
        return $http
          .get('https://d880ac9b.ngrok.io/usuario', {
            params: data
          })
          .then(function(rta) {
            if (rta && rta.data && _.isEmpty(rta.data)) {
              return $http
                .post('https://d880ac9b.ngrok.io/usuario', data)
                .then(function(nuevo) {
                  $mdDialog.hide(nuevo.data);
                });
            } else if (rta && rta.data) {
              $mdDialog.hide(rta.data[0]);
            }
          });
      } else {
        return $mdToast.show(
          $mdToast.simple()
          .textContent('Por favor digite un nombre de usuario.')
          .hideDelay(3000)
        );
      }
    }

  }

})();
