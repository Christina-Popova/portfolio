$(function(){
    moveBlock();

    function moveBlock(){
        var windowHeight = $(window).height();
        var wrap = $('#wrapper');
        var maxWidth = wrap.width();
        var maxHeight = windowHeight - (wrap.outerHeight() - wrap.height());
        var btn = $('span.btn');
        var minWidth = btn.width();
        var minHeight = btn.height();
        var startX = 0;
        var startY = 0;
        var flag;

        btn.on('mousedown', function(e) {
            startX = e.pageX;
            startY = e.pageY;
            flag = true;
        });

        $(document).on('mousemove', wrap,function(e){
            if (flag) {
                var parent = btn.parent();
                var newX = e.pageX;
                var newY = e.pageY;
                var newWidth = parent.width() + newX - startX;
                var newHeight = parent.height() + newY - startY;

                if (newWidth <= maxWidth && newWidth >= minWidth) {
                    parent.css('width', newWidth + 'px');
                    startX = newX;
                }

                if (newHeight <= maxHeight && newHeight >= minHeight) {
                    parent.css('height', newHeight + 'px');
                    startY = newY;
                }
            }
        }).on('mouseup', function(e){
            flag = false;
        });

    }
});








