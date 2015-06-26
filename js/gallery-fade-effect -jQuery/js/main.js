$(function(){

    slider('div.gallery-block');

    function slider(galleryName){

        $(galleryName).each(function(){
            var galleryBlock = $(this);
            var galleryList = galleryBlock.find('ul.gallery');
            var galleryItems = galleryList.children('li');
            var count = galleryList.children('li').length;

            galleryBlock.append(createControl(count));
            var control = galleryBlock.find('.control');


            // initialization set
            var current = 0;
            setActive(current);
            var flag = true;


            //event handlers
                    control
                        .on('click', 'li a', function(){
                    if (flag){
                        flag = false;
                        current = galleryList.find("li.active").index();
                        var next =  $(this).parent().index();
                        if (current !== next ) {
                            sliderShow(current, next);
                        } else {
                            flag = true;
                        }
                        current = next;
                    }
                })
                .on('click', 'a.next', function(){
                    if (flag){
                        flag = false;
                        var next = current;
                        if( ++next !== count){
                            sliderShow(current, next);
                        } else {
                            next = 0;
                            sliderShow(current, next);
                        }
                        current = next;
                    }
                })
                .on('click', 'a.prev', function(){
                    if (flag) {
                        flag = false;
                        var prev = current;
                        if (--prev >= 0) {
                            sliderShow(current, prev);
                        } else {
                            prev = count - 1;
                            sliderShow(current, prev);
                        }
                        current = prev;
                    }
                });


            // set active page
            function setActive (index){
                galleryList.find("li").removeClass('active').css('opacity','0');
                galleryList.find("li").eq(index).addClass('active').css('opacity','1');
            }


            // slider show
            function sliderShow (current, next){
                galleryItems.eq(current).animate({opacity: 0}, 1000, function(){
                });
                galleryItems.eq(next).animate({opacity: 1}, 1000, function(){
                    flag=true;
                    setActive(next);
                });
            }

        });

    }


    // create a paging-block
    function createControl (count){

        var content = "<div class='control'>";
        content += "<a class='prev' href='#'>previous</a>";
        content += '<ul>';
        for (var i=0; i < count; i++){
            content += "<li><a href='#'>" + (i+1) + "</a></li>";
        }
        content += '</ul>';
        content +="<a class='next' href='#'>next</a>";
        content += "</div>";
        return content;
    }

});

