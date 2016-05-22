app.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://glowing-heat-2870.firebaseio.com//users");
  return $firebaseAuth(usersRef);
});

app.controller('LoginController',function($state, $sanitize, $cordovaOauth, $http, $firebaseAuth, Auth) {
    var self=this;
    
    self.data = {};
    self.getDay = function(){
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var d = new Date();
        return days[d.getDay()].toLowerCase();

    };

    self.day = self.getDay();
    
    //        self.getDay();
    self.fbLogin = function(){
        authLogin("facebook", function(jsondata){
//            self.data.id = jsondata.twitter.id;
//            self.data.name = jsondata.twitter.displayName;
//            self.data.img = jsondata.twitter.profileImageURL;
        });
    };
    
    self.twLogin = function(){
        authLogin("twitter", function(jsondata){
            self.data.id = jsondata.twitter.id;
            self.data.name = jsondata.twitter.displayName;
            self.data.img = jsondata.twitter.profileImageURL;
        });
    };
    
    self.gLogin = function(){
        authLogin("google", function(jsondata){
            self.data.id = jsondata.google.id;
            self.data.name = jsondata.google.displayName;
            self.data.img = jsondata.google.profileImageURL;
        });
    };
    
    function authLogin(social, callback){
        Auth.$authWithOAuthRedirect(social).then(
        function(authData){
            console.log("pegou google", authData);
        }).catch(function(error) {
          if (error.code === "TRANSPORT_UNAVAILABLE") {
            Auth.$authWithOAuthPopup(social)
                .then(function(authData) {
                var jsondata = JSON.stringify(authData);
                jsondata = JSON.parse(jsondata);
                callback(jsondata);
                console.log(self.data.name);
                self.nickname = self.data.name;
                self.join();
            });
          } else {
            // Another error occurred
            console.log(error);
          }
        });
    };
    
    self.join=function()
    {
        //sanitize the nickname
        var nickname=$sanitize(self.nickname);
        
        if(nickname)
        {
            $state.go('chat',{nickname:nickname});
        }
    };


});