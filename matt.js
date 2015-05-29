jQuery(document).ready(function(){
   console.log("Jquery is ready!");
   var menuBtn = jQuery('.hamburger');
      menuBtn.on('click', function(e){
      e.preventDefault();
         jQuery('#mainMenu').slideToggle('slow');
   });
});