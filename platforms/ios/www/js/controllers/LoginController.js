app.controller('LoginController',function($state, $sanitize, $cordovaOauth, $http) {
    var self=this;

    self.getDay = function(){
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var d = new Date();
        return days[d.getDay()].toLowerCase();

    };

    self.day = self.getDay();
    //        self.getDay();
    self.fbLogin = function(){
        $cordovaOauth.facebook('2045735352319188', ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(
        function(result){
            console.log(result.access_token);
            displayData(result.access_token);
//            var dt = JSON.stringify(result);
            self.nickname = result.access_token;
        }, function(error){console.log(error);});
    }
    
    function displayData(access_token)
    {
        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
            var name = result.data.name;
            var gender = result.data.gender;
            var picture = result.data.picture;

//            var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive"><thead><tr><th>Field</th><th>Info</th></tr></thead><tbody>';
//            html = html + "<tr><td>" + "Name" + "</td><td>" + name + "</td></tr>";
//            html = html + "<tr><td>" + "Gender" + "</td><td>" + gender + "</td></tr>";
//            html = html + "<tr><td>" + "Picture" + "</td><td><img src='" + picture.data.url + "' /></td></tr>";
//
//            html = html + "</tbody></table>";
//
//            document.getElementById("listTable").innerHTML = html;
            
            console.log(result.data)
            
        }, function(error) {
            alert("Error: " + error);
        });
    }
    
    self.twLogin = function(){
        var nickname=null;//$sanitize(self.nickname);
        $cordovaOauth.twitter('tLh7fVjU07o5W3S8UXekb7ghF', 'CNloUzobGLuBi6WMlfWCDRrw1CsnfeCwUAPIppFGEArBd1viud').then(
        function(result){
            console.log(result);
            var dt = JSON.stringify(result);
            self.nickname = result;
        }, function(error){console.log(error);});    
    }
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