$(document).ready(function () {
  $('.open-btn').click(function () {
      $('.sidebar').css("left", "0");
      $('.overlay').addClass('active');
  });

  $('.close-btn, .overlay').click(function () {
      $('.sidebar').css("left", "-280px");
      $('.overlay').removeClass('active');
  });

  $('.menu-open-btn').click(function () {
      $('.menu-sidebar').css("left", "-100%");
  });

  $('.navbar-toggler').click(function () {
      $('.menu-sidebar').css("left","0");
  });

});


$('document').ready(function () {
  $('#showDetails').click(function() {
    // $('#details').removeClass('shadow-sm');
    // $('#details').addClass('shadow');
    $('#detailsDropdown').toggle();
  })
});

// $(document).on("click", function(event){
//   if(!$(event.target).closest("#details").length){
//     $('#detailsDropdown').hide();
//   }
// });

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
