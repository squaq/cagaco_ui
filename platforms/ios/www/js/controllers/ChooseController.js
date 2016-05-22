var 
choo = app.controller('ChooseController', function($rootScope,$sanitize, $state){
   var self = this;
    
    self.salas = [
        {"name":'recife', 'on': 10}, 
        {"name":'vancouver', 'on': 0}, 
        {"name":'victoria', 'on': 3}];
    
    self.gotoChat = function(room){
        console.log(room);
        console.log($rootScope.data.name);
        var nickname=$rootScope.data.name;
        $rootScope.roomName = room;
        if(nickname)
        {
            $state.go('chat',{nickname:nickname});
        }
    }
    
});