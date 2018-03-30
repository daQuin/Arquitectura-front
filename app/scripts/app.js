(function() {

  'use strict';

  /**
   * @ngdoc overview
   * @name frontendApp
   * @description
   * # frontendApp
   *
   * Main module of the application.
   */
  angular
    .module('frontendApp', [
      'ngTouch',
      'ui.router',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngMaterial',
      'ngMessages'
    ])
    .config([
      '$stateProvider',
      Config
    ]);

  function Config($stateProvider) {
    $stateProvider
      .state({
        url: '/',
        name: 'Main',
        controllerAs: 'main',
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      });
  }

})();
