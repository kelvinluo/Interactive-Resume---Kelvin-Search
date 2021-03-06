     var newX, newY, intendedDirection; //global
      var endding = false;
      var win = false;
      var currentX = 0, currentY = 0;
	  var musicOn = true;
      $(function() {
                $(".scott").animateSprite({
                    fps: 15,
          animations: {
              front_statics:[30, 31, 32, 33, 34],
            back_statics:[36, 37, 38, 39, 35],
            right_side_statics:[40, 41, 42, 43, 44],
            right_front_side_statics:[46, 47, 48, 49, 45],
            left_side_statics:[50, 51, 52, 53, 54],
            left_front_side_statics:[56, 57, 58, 59, 55],
            front: [1, 2, 3, 4, 0],
                back: [6, 7, 8, 9, 5],
            right_side: [11, 12, 13, 14, 10],
            right_front_side: [16, 17, 18, 19, 15],
            left_side: [21, 22, 23, 24, 20],
            left_front_side: [26, 27, 28, 29, 25]
              },
                    loop: true
                })
            }); 
      
      
            $(document).ready(function() {
			document.getElementById("music").style.left= $(window).width()/2 - 10 + "px";
        $('body').fadeIn(3000);
        $('#currentContainer').fadeIn(3000);
        $('#fox').fadeIn(3000);
		$('#music').fadeIn(3000);

		$('#music').click(function() {
			
			if (musicOn == true){
			$('#music1').trigger('pause');
			   musicOn = false;
			}
			else{
				 musicOn = true;
				 $('#music1').trigger('play');
			}
        });
		
                var arr = [];
            document.getElementsByTagName("body")[0].style.cursor = "url('images/mousePointer.cur'), auto";
                for (var x = 0; x < 12; x++) { // generate the map
                    arr[x] = [];
                    for (var y = 0; y < 12; y++) {
                        if (x === 0 || x === 11 || y === 0 || y === 11) { // invisible border for escape
                            arr[x][y] = $('<div>').addClass("platform_exit").attr("id", x + "-" + y);
                        }
                        else {
                            arr[x][y] = $('<div>').addClass("platform").attr("id", x + "-" + y);
                        }
                        arr[x][y].appendTo('div.container');
                    }
                }
//                    setTimeout(function() {       
//                     $('<div class="platform"/>').appendTo('div.container');
//                    }, 25*i);
                cat_x = getRandInt(); // called only once on load
                cat_y = getRandInt();
                intendedDirection = Math.floor((Math.random() * 4) + 1); // randomly selects a direction to start 1-4
                $("div#" + cat_x + "-" + cat_y).addClass("active");
                for (var z = 0; z < 8; z++) { // generate z initial blocks
                    var randX = Math.floor((Math.random() * 10) + 1);
                    var randY = Math.floor((Math.random() * 10) + 1);
                    if ($("div#" + randX + "-" + randY).hasClass("active")) {
                        z--; // increment one more time to randomly generate a fence
                    }
                    else {
                        $("div#" + randX + "-" + randY).addClass("blocked");
                    }
                }
        //////////////////////////////
        

        
        //Initial position
        var fox_pos = $('.fox');
        var screen_width = $(window).width();
        
        var fox_x = 0;
        if (y <= 5){
              fox_x = screen_width/2 - (6 - cat_y)*43 - (5 - cat_y)*4;
        }
        else{
            fox_x = screen_width/2 + (cat_y - 6)*43 + (cat_y - 6)*4;
        }
        var fox_y = (cat_x)*33 + (cat_x + 1)*4 - 5;
        
        document.getElementById("fox").style.left = fox_x + "px";
        document.getElementById("fox").style.top = fox_y + "px";
        currentX = cat_x;
        currentY = cat_y;
        //////////////////////////////
        
        
        $(".platform").click(function() {
          if (!endding){
             $(this).addClass("blocked");
             findPath(cat_x, cat_y, intendedDirection);
       var color = "#FFFFFF";
       var randInt = Math.floor(Math.random() * 6) + 1;
       switch(randInt){
               case 1:
                  color = "#4973A7";
                  break;
               case 2:
                  color = "#AD6643";
                  break;
               case 3:
                  color = "#3BB545";
                  break;
               case 4:
                  color = "#48A888";
                  break;
               case 5:
                  color = "#AF6641";
                  break;
               case 6:
                  color = "#61628F";
                  break;
       }
       document.getElementById("currentContainer").style.backgroundColor=color;
       document.body.style.backgroundColor=color;
          }
                    
                });
        $(window).resize(function(){
        
        var fox_x = 0;
        if (y <= 5){
              fox_x = screen_width/2 - (6 - currentY)*43 - (5 - currentY)*4;
        }
        else{
            fox_x = screen_width/2 + (currentY - 6)*43 + (currentY - 6)*4;
        }
        var fox_y = (currentX)*33 + (currentX + 1)*4 - 5;
        document.getElementById("fox").style.left = fox_x + "px";
        document.getElementById("fox").style.top = fox_y + "px";
        });
            });
      
      
      
            function findPath(x, y, direction) { //NOTE: x is up/down. y is left/right. x-1 is up 1. y-1 is left 1      
                var pathFinding;
                var randSide = Math.floor((Math.random() * 2) + 1);    
                switch (direction) {
                    case 1:
                        randSide == 1 ? pathFinding = [1, 2, 4, 3] : pathFinding = [1, 4, 2, 3];
                        break;
                    case 2:
                        randSide == 1 ? pathFinding = [2, 1, 3, 4] : pathFinding = [2, 3, 1, 4];
                        break;
                    case 3:
                        randSide == 1 ? pathFinding = [3, 2, 4, 1] : pathFinding = [3, 4, 2, 1];
                        break;
                    case 4:
                        randSide == 1 ? pathFinding = [4, 3, 1, 2] : pathFinding = [4, 1, 3, 2];
                        break;
                }
        
                for (i = 0; i < 4; i++) {
                    if (window["direction".concat(pathFinding[i])](x, y)) {
                        $("div#" + x + "-" + y).removeClass("active") // moved. Change preoccupied color to neutral
                        $("div#" + newX + "-" + newY).addClass("active"); // new position
                        if ($("div#" + newX + "-" + newY).hasClass("platform_exit")) {
                endding = true;
                            
                        }

            cat_x = newX;
            cat_y = newY;
            
                        intendedDirection = pathFinding[i]; // gets intended direction
                        break;
                    }
                    else if (i >= 3) { // last loop and break didn't trigger so all paths failed.
                        $('body').fadeOut(3000);
        			$('#currentContainer').fadeOut(3000);
        			$('#fox').fadeOut(3000);
					$('#music').fadeOut(3000);
					var myVar=setTimeout(function () {window.location.href = './hex.html';
					}, 3000);
            win = true;
                    }
                }
        
        var moveDirection = 0;
        
            //Animation
            if (x > newX){
               moveDirection = 1;
            }
            else if (x < newX){
               moveDirection = 2;
            }
            else if (y > newY){
               moveDirection = 3;
            }
            else if (y < newY){
               moveDirection = 4;
            }
        //////////////////////////////////
        /////////////////////////////////
        //Position Changing #Block 43X43px, margin 6px
        
        if (endding){
             endFox(moveDirection, x, y);
        }
        else if (!win){
           moveFox(moveDirection, x, y);
        }
            }
        //////////////////////////////////
        /////////////////////////////////
            //NOTE: positioned in way that opposite directions are placed furthest apart
      
      function moveFox (direction, x, y){
              var fox_pos = $('.fox');
            var screen_width = $(window).width();
            var screen_height = $(window).height();
        var fox_x = 0;
        if (y <= 5){
              fox_x = screen_width/2 - (6 - y)*43 - (5 - y)*4;
        }
        else{
            fox_x = screen_width/2 + (y - 6)*43 + (y - 6)*4;
        }
        var fox_y = (x)*33 + (x + 1)*4 - 5;
            
            var x_dif = 47/3;
            var y_dif = 37/3;
            
            if (direction == 1){
               //alert("Up")
               y_dif = -y_dif;
               x_dif = 0;
               $(".scott").animateSprite('play', 'back')
            }
            else if (direction == 2){
            //Animation
               $(".scott").animateSprite('play', 'front')
               x_dif = 0;
            }
            else if (direction == 3){
                 //alert("Left")
               $(".scott").animateSprite('play', 'left_side')
               x_dif = -x_dif;
               y_dif = 0;
            }
            else if (direction == 4){
               //alert("Right")
               $(".scott").animateSprite('play', 'right_side')
               y_dif = 0;
            }
            fox_y += y_dif;
            fox_x += x_dif;
            
            var myVar=setTimeout(function () {myTimer1()}, 100);
               function myTimer1() {
                              document.getElementById("fox").style.top = fox_y + "px";
                      document.getElementById("fox").style.left = fox_x + "px";
                      fox_y += y_dif;
                      fox_x += x_dif;
                      var myVar2=setTimeout(function () {myTimer2()}, 100);
                   }
            
            
            function myTimer2() {
                           
                                   document.getElementById("fox").style.top = fox_y + "px";
                           document.getElementById("fox").style.left = fox_x + "px";
                         fox_y += y_dif;
                           fox_x += x_dif;
                         var myVar3=setTimeout(function () {myTimer3()}, 100);
                      }
            
            
               function myTimer3() {
                              document.getElementById("fox").style.top = fox_y + "px";
                      document.getElementById("fox").style.left = fox_x + "px";
                      switch (direction){
                      case 1: 
                           $(".scott").animateSprite('play', 'back_statics')
                         break;
                      case 2:
                           $(".scott").animateSprite('play', 'front_statics')
                         break;
                      case 3:
                           $(".scott").animateSprite('play', 'left_side_statics')
                         break;
                      case 4:
                           $(".scott").animateSprite('play', 'right_side_statics')
                         break;
                      }
            }
            currentX = x;
            currentY = y;
      }
      
      function endFox (direction, x, y){
              var fox_pos = $('.fox');
            var screen_width = $(window).width();
            var screen_height = $(window).height();
        var fox_x = 0;
        if (y <= 5){
              fox_x = screen_width/2 - (6 - y)*43 - (5 - y)*4;
        }
        else{
            fox_x = screen_width/2 + (y - 6)*43 + (y - 6)*4;
        }
        var fox_y = (x)*33 + (x + 1)*4 - 10;
            
            
            
            var end = false;
            $(".scott").animateSprite('fps', 13)
            var endLoop = setInterval(function(){
            
            var x_dif = 47/3;
            var y_dif = 37/3;
            
            if (direction == 1){
               //alert("Up")
               y_dif = -y_dif;
               x_dif = 0;
               $(".scott").animateSprite('play', 'back')
            }
            else if (direction == 2){
            //Animation
               $(".scott").animateSprite('play', 'front')
               x_dif = 0;
            }
            else if (direction == 3){
                 //alert("Left")
               $(".scott").animateSprite('play', 'left_side')
               x_dif = -x_dif;
               y_dif = 0;
            }
            else if (direction == 4){
               //alert("Right")
               $(".scott").animateSprite('play', 'right_side')
               y_dif = 0;
            }
            fox_y += y_dif;
            fox_x += x_dif;
            
            var myVar=setTimeout(function () {myTimer1()}, 100);
               function myTimer1() {
                              document.getElementById("fox").style.top = fox_y + "px";
                      document.getElementById("fox").style.left = fox_x + "px";
                      fox_y += y_dif;
                      fox_x += x_dif;
                      var myVar2=setTimeout(function () {myTimer2()}, 100);
                   }
            
            
            function myTimer2() {
                           
                                   document.getElementById("fox").style.top = fox_y + "px";
                           document.getElementById("fox").style.left = fox_x + "px";
                         fox_y += y_dif;
                           fox_x += x_dif;
                         var myVar3=setTimeout(function () {myTimer3()}, 100);
                      }
            
            
               function myTimer3() {
                              document.getElementById("fox").style.top = fox_y + "px";
                      document.getElementById("fox").style.left = fox_x + "px";
            }
			if (fox_y < 0 || fox_y > screen_height || fox_x < 0 || fox_y < screen_width){
					$('body').fadeOut(3000);
        			$('#currentContainer').fadeOut(3000);
        			$('#fox').fadeOut(3000);
					$('#music').fadeOut(3000);
					var myVar=setTimeout(function () {window.location.href = './index.html';
					}, 3000);}
			}, 320);
      }
      
            function direction1(x, y) {
                if (!$("div#" + x + "-" + (y - 1)).hasClass("blocked")) { // left
                    newX = x;
                    newY = y - 1;
                    return true;
                }
                return false;
            }
      
            function direction2(x, y) {
                if (!$("div#" + (x + 1) + "-" + y).hasClass("blocked")) { // down
                    newX = x + 1;
                    newY = y;
                    return true;
                }
                return false;
            }
            function direction3(x, y) {
                if (!$("div#" + x + "-" + (y + 1)).hasClass("blocked")) { // right
                    newX = x;
                    newY = y + 1;
                    return true;
                }
                return false;
            }
            function direction4(x, y) {
                if (!$("div#" + (x - 1) + "-" + y).hasClass("blocked")) { // up
                    newX = x - 1;
                    newY = y;
                    return true;
                }
                return false;
            }

            function getRandInt() { // returns random # 4-5
                return Math.floor((Math.random() * 5) + 4);
            }