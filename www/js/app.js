var app=angular.module('cangaco-chat-client', ['ionic','btford.socket-io', 'ngCordovaOauth', 'firebase'])
.run(function($ionicPlatform, $rootScope) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
          $rootScope.data = {};
          $rootScope.roomName = "";
      });
    })
    .config(function($stateProvider, $urlRouterProvider)
    {

      $stateProvider
      .state('chat', {
        url: "/chat/:nickname",
        templateUrl: "templates/chat.html"
      })
      .state('choose', {
        url: "/choose",
        controller:"ChooseController",
        templateUrl: "templates/choose.html"
      })
      .state('mapchat', {
        url: "/mapchat",
        controller:"MapChatController",
        templateUrl: "templates/mapchat.html"
      })
      .state('login', {
        url: "/",
        templateUrl: "templates/login.html"
      });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');
    })