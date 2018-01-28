$(document).ready(function(){
  
  
  var channels =["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "Hehehe","Buenas"];
  
  


//for(var i=0; i<channels.length;i++){
  //for(var i in channels){
  
  //each loop wors similar like a for in or for loor but this iterates inside each element, in this case channels
  $.each(channels,function(i, val){
  
  
  
 $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+channels[i] +'?callback=?').done( function(data) {
   //channels[i] or val is the same befor the callback above
   
 var links =data._links.self;
   var names = links.slice(37, links.length);
   
   
   
  
   
   
 
   
//Here We determine the status and the logo of the channels
   var status;
   var logo;
   var game;
   var description;
  
   //for channels that are offline or don't exist
   if(data.stream==null){
          logo = "https://dummyimage.com/30x30/000000/fff.jpg&text=Offline";

      status= 'Offline';
     game="N/A";
     
     //here we go deeper with for each loop iteration since we need to check another JSON URL inside the first JSON
     $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/'+channels[i] +'?callback=?',function(data2){
       //for channels that don't exist
       if(data2.status ===404|| data2.followers ===0||data2.followers ===undefined ){
        
         status='Not an Account';
         
         $("#channels").append("<div class='row offline '>"+"<div class='col-md-4'>"+"<img class='rounded' src='"+logo+"' width='30' height='30'>"+names+"</div>"+"<div class='col-md-4'>"+status +"</div>"+"<div class='col-md-2'>"+game+"</div>"+"</br></br>"+"</div>"); 
         
         
       }
       else{
         logo=data2.logo;
   $("#channels").append("<div class='row offline'>"+"<div class='col-md-4'>"+"<img class='rounded' src='"+logo+"' width='30' height='30'>"+names+"</div>"+"<div class='col-md-4'>"+status +"</div>"+"<div class='col-md-2'>"+game+"</div>"+"</br></br>"+"</div>"); }
      
     });//JSON 2
     
     
     //search word function in null
$("#search").keyup(function(){
  var search =$("#search").val().toLowerCase();

  var found =[];
  
  //to turn them into lowercase
  var lowerCase =[];
  for(var i=0; i<channels.length;i++){
    lowerCase.push(channels[i].toLowerCase());
    var position= lowerCase[i].indexOf(search);
    
    if(position>=0){
       found.push(lowerCase[i]);
       }
    
   //console.log(found);
}//for loop
  
  var outputString='';
  if(found.length==0){
    outputString ='no names found';
    $("#found").html("");
  }
  
  
  
  else{
    for(var i=0;i<found.length;i++){ 
      var lower =names.toLowerCase();
     //console.log(names);
        
      if(found[i]===lower){
        
        
           $("#found").fadeIn().finish();
     $("#found").html("<div class='row '>"+"<div class='col-md-4'>"+"<img src='"+logo+"' width='30' height='30'>"+names+"</div>"+"<div class='col-md-4'>"+status +"</div>"+"<div class='col-md-2 '>"+game+"</div>"+"</br></br>"+"</div>");
        
   //  $(".row").next().remove();
        $("#channels").fadeOut();
        console.log($("#found"));
      }
      
      
  }//second for loop
     if(search.length===0){
   // location.reload();
     $("#channels").fadeIn().finish();
        $("#found").fadeOut();
      //console.log(search);
    }
      }
  
  
  $("#output").text(outputString);
});//end of search in null
     
     
    
   }
   //online channels
   else{
      logo =data.stream.channel.logo
     status='Online';
     game=data.stream.game;
     description =data.stream.channel.status;
 if(description.length >=30){
   description=description.substr(0,30) +'...';
 }    
     
     $("#channels").prepend("<div class='row online'>"+"<div class='col-md-4'>"+"<img class='img-thumbnail' src='"+logo+"' width='30' height='30'>"+names+"</div>"+"<div class='col-md-4 '>"+"<a href=https://www.twitch.tv/"+names+">"+status +"</a>"+"</div>"+"<div class='col-md-4 font-italic description'>"+game+"- "+description+"</div>"+"</br></br>"+"</div>");
     
     
     //search word function in online channels
$("#search").keyup(function(){
  var search =$("#search").val().toLowerCase();
  
  var found =[];
  
  //to turn them into lowercase
  var lowerCase =[];
  for(var i=0; i<channels.length;i++){
    lowerCase.push(channels[i].toLowerCase());
    var position= lowerCase[i].indexOf(search);
    
    if(position>=0){
       found.push(lowerCase[i]);
       }
    
   //console.log(found);
}//for loop
  
  var outputString='';
  if(found.length==0){
    outputString ='no names found';
    $("#found").html("");
  }
  
  else{
    for(var i=0;i<found.length;i++){ 
      var lower =names.toLowerCase();
     //console.log(names);
      
      if(found[i]==lower){
           $("#found").fadeIn().finish();
    $("#found").html("<div class='row online'>"+"<div class='col-md-4'>"+"<img class='img-thumbnail' src='"+logo+"' width='30' height='30'>"+names+"</div>"+"<div class='col-md-4'>"+"<a href=https://www.twitch.tv/"+names+">"+status +"</a>"+"</div>"+"<div class='col-md-4 font-italic description'>"+game+"- "+description+"</div>"+"</br></br>"+"</div>");
     
        $("#channels").fadeOut();
        
      }
      
      
  }//second for loop
      if(search.length===0){
   // location.reload();
     $("#channels").fadeIn().finish();
         $("#found").fadeOut();
      //console.log(search);
    }
      }
  
  
  $("#output").text(outputString);
});//end of search in online channels
     
     
     
     
     
   }
   
  
   
   
   
    
    
   
   
   
 
   
   
   
  //console.log(data);
   //console.log(game);
  //console.log(description);
   
   //Filters
   $("#active").click(function(){
     if(status == 'Offline'){
      $(".offline").slideUp(1000);
       $(".online").slideDown(1000);
       $(".online").addClass("bounceOutDown");
       
     }if(status == 'Online'){
       $(".offline").slideUp(1000);
       $(".online").slideDown(1000);
       $(".online").addClass("bounceOutDown");
     }
   });//active click
   
    $("#passive").click(function(){
     if(status == 'Online'){
       $(".online").slideUp(1000);
       $(".offline").slideDown(1000);
       $(".offline").addClass("bounceOutDown");
        
       
     }if(status == 'Offline'){
       $(".online").slideUp(1000);
       $(".offline").slideDown(1000);
       $(".offline").addClass("bounceOutDown");
       
     }
   });//passive click
   
    $("#all").click(function(){
     if(status == 'Online' || status == 'Offline'){
       $(".online").slideDown(1000);
       $(".offline").slideDown(1000);
       $(".online").addClass("bounceOutDown");
       $(".offline").addClass("bounceOutDown");
       
     }
   });
   
   
   
   
   
   
   
   
});//JSON 1
    
     
 
   
})//For each Loop

  
  
});//Document ready