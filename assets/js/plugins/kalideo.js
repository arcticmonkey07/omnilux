(function($) {
if ($('.kalideo').length > 0) {
  (function () {
    $kalideo = $('.kalideo');
    var W = $kalideo.width();
    var H = $kalideo.height();
    var L = $kalideo.offset().left;
    var T = $kalideo.offset().top;

    var imageW = 585;
    var imageH = 638;
    $kalideo.mousemove(function (e) {
      var xmin = 200; /* 400 / 2 */
      var xmax = imageW - xmin;

      var ymin = 0;
      var ymax = imageH - 400 * Math.sin(60 * Math.PI / 180); /* imageH - 400*sin(60º) */

      var x = xmin + ((e.pageX - L) / W) * (xmax - (xmin));
      var y = ymin + ((e.pageY - T) / H) * (ymax - ymin);
      setValue(x, y);
    });

    var $divs = $('.triangle >.in >.in >div');

    function setValue(x, y) {
      $divs.css({'transform': 'translate3d(' + -x + 'px,' + -y + 'px,0)'});
    }

    setValue(200, 0)
  }).call(this);
}
})($);
