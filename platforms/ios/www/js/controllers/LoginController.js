app.controller('LoginController',function($state, $sanitize, $cordovaOauth) {
    var self=this;

    self.getDay = function(){
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var d = new Date();
        return days[d.getDay()].toLowerCase();

    };

    self.day = self.getDay();
    //        self.getDay();
    self.join=function()
    {
        //sanitize the nickname
        var nickname=null;//$sanitize(self.nickname);
        
        //tLh7fVjU07o5W3S8UXekb7ghF
//        $cordovaOauth.twitter('tLh7fVjU07o5W3S8UXekb7ghF', 'CNloUzobGLuBi6WMlfWCDRrw1CsnfeCwUAPIppFGEArBd1viud').then(
//        function(result){
//            console.log(result);
//            var dt = JSON.stringify(result);
//            self.nickname = result;
//        }, function(error){self.nickname = error});
//        
//        return;
        
        
        $cordovaOauth.facebook('1034727146621345', ['email']).then(
        function(result){
            console.log(result);
            var dt = JSON.stringify(result);
            self.nickname = dt;
        }, function(error){self.nickname = error});
        
        return;
        if(nickname)
        {
            console.log("chegou aqui");
            $state.go('chat',{nickname:nickname});
        }
    };


});