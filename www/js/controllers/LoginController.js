app.controller('LoginController',function($state,$sanitize) {
        var self=this;
//        var mDay = Date();
//        mDay = mDay.getDay(); 
        
    
        self.getDay = function(){
            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var d = new Date();
            console.log(d)
            return days[d.getDay()].toLowerCase();

        };
    
        self.day = self.getDay();
//        self.getDay();
        self.join=function()
        {
          console.log("join!!! "+$sanitize(self.nickname));
            
            
            //sanitize the nickname
            var nickname=$sanitize(self.nickname);
            if(nickname)
            {
                console.log("chegou aqui");
                $state.go('chat',{nickname:nickname});
            }
        };
        
        
    });