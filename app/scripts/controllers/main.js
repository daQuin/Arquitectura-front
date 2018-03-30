(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')

    .controller('MainCtrl', [
      '$mdDialog',
      '$http',
      MainCtrl
    ]);

  function MainCtrl($mdDialog, $http) {

    var vm = this;
    vm.listaMensajes = [];
    vm.listaUsuarios = [];
     vm.nombre ="";
    vm.mensaje = {
      texto: '',
      remitente: '',
      destinatario: ''
    };

    vm.cargarMensajes = cargarMensajes;
    vm.enviarMensaje = enviarMensaje;


    function mostrarLogin(ev) {
      $mdDialog.show({
          targetEvent: ev,
          controllerAs: 'dialog',
          controller: 'LoginCtrl',
          clickOutsideToClose: false,
          templateUrl: 'views/login.html',
          parent: angular.element(document.body),
          fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(rta) {
          console.log(rta.id);
          vm.nombre = rta;
          vm.mensaje.remitente = rta.id;
          cargarUsuarios();
        });
    }
    // http://localhost:1337

    function cargarUsuarios() {
      return $http
        .get('https://d880ac9b.ngrok.io/usuario')
        .then(function(usuarios) {
          _.forEach(usuarios.data, function(usuario) {
            if (usuario.id !== vm.mensaje.remitente) {
              vm.listaUsuarios.push(usuario);
            }
          });
          return vm.listaUsuarios;
        });
    }

    function cargarMensajes(destino) {
console.log(destino);
      vm.listaMensajes = [];
      vm.mensaje.destinatario = destino;
      return $http
        .get('https://d880ac9b.ngrok.io/mensaje', {
          where: {
            or: [{
              remitente: vm.mensaje.remitente,
              destinatario: vm.mensaje.destinatario
            }, {
              remitente: vm.mensaje.destinatario,
              destinatario: vm.mensaje.remitente
            }]
          }
        })
        .then(function(mensajes) {
          vm.listaMensajes = mensajes.data;
          console.log(vm.listaMensajes);
          return vm.listaMensajes;
        });
    }
    {
      // texto:vm.mensaje.texto,
      // destinatario:vm.mensaje.destinatario,
      // remitente:vm.mensaje.remitente
    }
    function enviarMensaje() {
      console.log(vm.mensaje);
      return $http
        .post('https://d880ac9b.ngrok.io/mensaje',vm.mensaje)
        .then(function(pepe) {
          console.log(pepe);
          vm.mensaje.texto = '';
         cargarMensajes(vm.mensaje.destino);
        });
    }
    mostrarLogin(vm);



  }

})();
