jQuery(document).ready(function(){
   console.log("Im ready!");
   var menuBtn = jQuery('.hamburger');
      menuBtn.on('click', function(e){
      e.preventDefault();
         jQuery('#mainMenu').slideToggle('slow');
            //addClass('open-mc');
   });
});