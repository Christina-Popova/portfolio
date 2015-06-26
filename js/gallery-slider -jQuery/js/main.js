$(function(){

    slider('div.gallery-block');

    function slider(galleryName){

        $(galleryName).each(function(){
            var galleryBlock = $(this);
            var galleryList = galleryBlock.find('ul.gallery');
            var count = galleryBlock.find('div.box').length;
            var width =  parseInt(galleryList.find('li').css('width'));

            galleryBlock.append(createControl(count));
            var control = galleryBlock.find('.control');


            // create clone first slide for organize circular
            galleryList.find("li:first-child").clone().appendTo(galleryList);


            // initialization set
            var current = 0;
            setActive(current);
            var flag = true;


            //event handlers
            control
                .on('click', 'li a', function(){
                    if (flag){
                        flag = false;
                        current =  $(this).parent().index();
                        setActive(current);
                        sliderShow(current);
                    }
                })
                .on('click', 'a.next', function(){
                    if (flag){
                        flag = false;
                        if( ++current !== count){
                            setActive(current);
                            sliderShow(current);
                        } else {
                            current = 0;
                            setActive(current);
                            sliderShow(count, function (){
                                galleryList.css('margin-left', '0px');
                            });
                        }
                    }

                })
                .on('click', 'a.prev', function(){
                    if (flag) {
                        flag = false;
                        if (--current >= 0) {
                            setActive(current);
                            sliderShow(current);
                        } else {
                            current = count - 1;
                            setActive(current);
                            galleryList.css("margin-left", - width *count + "px");
                            sliderShow(current);
                        }
                    }

                });


            // set active page
            function setActive (index){
                control.find("ul li").removeClass('active').eq(index).addClass('active');
            }


            // slider show
            function sliderShow (current, callback){
                galleryList.animate({marginLeft: - current * width}, 500, function(){
                    flag=true;
                    if (callback) {
                        callback();
                    }
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

