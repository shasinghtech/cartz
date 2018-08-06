(function($) {
    $(".car-carousel").owlCarousel({
        items: 1,
        singleItem: true,
        itemsScaleUp: true,
        slideSpeed: 500,
        autoPlay: 5000,
        stopOnHover: true,
        navigation: true,
        pagination: false,
        rewindNav: true
    });

    $(".car-short-info .color ul li").on("click", function(e) {
        e.preventDefault();
        var color = $(this).data("color");
        $(".color ul li").removeClass('active');
        $(this).addClass('active');
        $(".car-photo ul li").hide();
        if ($(".car-photo ul li").hasClass(color)) {
            $(".car-photo ul").find('li.' + color).show();
        }
        //alert(color);
    });

})(jQuery);