/* 

  add below code to bootstrap/dist/js/bootstrap.bundle.js to make the nav item active

  by Seerat Ahmed Khan 

*/

$(document).ready(function() {
  $(document).on('click', '.nav-item a', function (e) {
      $(this).parent().addClass('active').siblings().removeClass('active');
  });
});