app.controller('LoginController',function($state, $sanitize, $cordovaOauth) {
    var self=this;

    self.getDay = function(){
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var d = new Date();
        return days[d.getDay()].toLowerCase();

    };

    self.day = self.getDay();
    //        self.getDay();
    self.fbLogin = function(){
        $cordovaOauth.facebook('1034727146621345', ['email']).then(
        function(result){
            console.log(result);
            var dt = JSON.stringify(result);
            self.nickname = dt;
        }, function(error){self.nickname = error});
    }
    
    self.twLogin = function(){
        var nickname=null;//$sanitize(self.nickname);
        $cordovaOauth.twitter('tLh7fVjU07o5W3S8UXekb7ghF', 'CNloUzobGLuBi6WMlfWCDRrw1CsnfeCwUAPIppFGEArBd1viud').then(
        function(result){
            console.log(result);
            var dt = JSON.stringify(result);
            self.nickname = result;
        }, function(error){self.nickname = error});    
    }
    self.join=function()
    {
        //sanitize the nickname
        var nickname=$sanitize(self.nickname);
        
        if(nickname)
        {
            console.log("chegou aqui");
            $state.go('chat',{nickname:nickname});
        }
    };


});