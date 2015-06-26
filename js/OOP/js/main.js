
$(function(){

    function noMoneyNoHoney(){
        //TODO: Find out why the amount of honey in the hive is not increasing.
        function Bee(capacity, hive) {
            this.capacity = capacity;
            this.hive = hive;
        }

        function Hive() {
            this.pollen = 100;
        }

        Hive.prototype.addPollen = function(pollen) {
            this.pollen += pollen;
        };

        Hive.prototype.getPollen = function() {
            return this.pollen;
        };

        Bee.prototype.unloadPollen = function() {
            this.hive.addPollen(this.capacity);
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        function createBlock(className, text, src) {
            var divBlock = $('<div>').addClass(className);
            var img = $('<img>', {
                src: src,
                alt: "img"
            });
            var p = $('<p>', {
                text: text
            });
            var b  = $('<b>', {
                class: 'qty'
            });
            p.append(b);

            divBlock.append(img,p);
            return divBlock;
        };

        function createHive() {
            var hive = new Hive ();
            var text = 'Quantity pollen in hive: ';
            var src = "images/hive.gif";
            var content = createBlock('hive', text, src);
            $('body').append(content);
            $('.hive .qty').text(hive.getPollen());

            return hive;
        }

        function createBee () {
            var bee = new Bee(getRandomInt(1, 10), hive);
            var text = 'My capacity is ' + bee.capacity;
            var src = "images/bee.png";
            var content = createBlock('bee', text, src);
            $('body').append(content);

            var maxTop = $(window).height() - $(".bee").height();
            var maxLeft =  $(window).width() - $(".bee").width();
            var hiveWidth = $(".hive").width();
            var hiveHeight = $(".hive").height();

            content.css('top', getRandomInt(0, maxTop)+'px');
            content.css('left', getRandomInt(hiveWidth, maxLeft) +'px');

            $('.bee').animate({left: hiveWidth *0.5, top: hiveHeight*0.5 }, 2000, function(){
                bee.unloadPollen();
                $('.hive .qty').text(hive.getPollen());
                $(this).remove();
            });

        }

        var hive = createHive();

        $('.btn').on('click', function(){
            createBee();
        });

    }

    noMoneyNoHoney();

});



























