$(document).ready(function() 
    {
	
			 $("#logo").draggable = false;
		 $("#logo").onmousedown = function(event) {
                event.preventDefault();
                return false;
              };
	
	$(".fancybox").fancybox();
	$(".fancybox").fancybox({
				padding: 0,

				openEffect : 'elastic',
				openSpeed  : 150,

				closeEffect : 'elastic',
				closeSpeed  : 150,

				closeClick : true,
			});
	$(".search_box").shuffleLetters();
	
	$.get("data/projects.txt",function(data){
	  var lines = data.split('\n');
	  for (var i = 0, len = parseInt(lines.length/4); i < len; i++){
	  $('div.project_layout').append('<div class="project_display">\
		 <a href="'
		 +
		 lines[i*4 + 1]
		 +
		'"><img class="project_pic" src="'
		 + 
		 lines[i*4]
		 + 
		 '" alt="Logo" name="me"></a>\
	     <h1 class="project_description">\
		 <a class="hide_link" href="'
		 +
		 lines[i*4 + 1]
		 +
		 '">'
		 +
		 lines[i*4 + 2]
		 +
		 '</a>\
		 </h1>\
	     <h2 class="platform">'
		 +
         lines[i*4 + 3]
		 +
	     '</h2></div>');}
	})
	
	$.get("data/personal.txt",function(data){
	  $('h3.description').html(data);
	})
	
    var sourceSwap = function () {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    }
	
    function size_change(){
         $(".button").css("margin-top", $(".search_box").position().top + 45 + "px");
          }
		
    function result_change(file_name, with_image){
	$(".items").remove();
	$(".preview").remove();
	$.get(file_name, function(data){
    var lines = data.split('\n');
	if (with_image)
	{
		for (var i = 0, len = parseInt(lines.length/5); i < len; i++){
	        $('#result_table').before('<table class="items">\
			                <thead><tr>\
							<td class="item_title" colspan="2">\
							<a class="hide_link" href="http://'
							+
							lines[i*5 + 1]
							+
							'">'
							+ 
							lines[i*5]
							+ 
							'</a></td>\
							</tr></thead>\
						    <tbody><tr>\
							<td rowspan="2"><div class="imgLiquid"><img class="preview_images" src="'
							+
							lines[i*5 + 3]
							+
							'"></div></td>\
							<td class="item_link">'
		                    + 
							lines[i*5 + 1]
							+ 
							'</td>\
							</tr>\
							<tr>\
							<td><div class="text_description_with_image" id="text_description">'
							+ 
							lines[i*5 + 2]
							+ 
							'</div></td>\
							</tr><tbody></table>');
	$('.preview_images').each(function(i, item) {
    var img_width = $(item).width();
	var img_height = $(item).height();
    var div_width = $(item).parent().width();
	var div_height = $(item).parent().height();
    if(img_width >= img_height){
        $(item).width(div_width);
		img_height = $(item).height();
		var new_y = parseInt(div_height/2 - img_height/2);
	    $(item).css({'margin-top': new_y});
    }
	else
	{
        $(item).height(div_height);
		img_width = $(item).width();
		var new_x = parseInt(div_width/2 - img_width/2);
	    $(item).css({'margin-top': new_x});
    }
     });
	}
	}
	else{
	    for (var i = 0, len = parseInt(lines.length/4); i < len; i++){
	        $('#result_table').before('<table class="items"><tr>\
							 <td class="item_title">\
							 <a class="hide_link" href="http://'
							+
							lines[i*4 + 1]
							+ 
							'">'
							+ 
							lines[i*4]
							+ 
							'</a></td>\
							</tr>\
						    <tr>\
							 <td class="item_link">' 
		                    + 
							lines[i*4 + 1]
							+ 
							'</td>\
							</tr>\
							<tr>\
							<td><div class="text_description" id="text_description">'
							+ 
							lines[i*4 + 2]
							+ 
							'</div></td>\
							</tr></table>');
	}
	}
    })
	}
	
	function button_reset(){
	  $("#web").attr('class', 'menu_redirect');
	  $("#skills").attr('class', 'menu_redirect');
	  $("#career").attr('class', 'menu_redirect');
	  $("#projects").attr('class', 'menu_redirect');
	  $("#artwork").attr('class', 'menu_redirect');
	  $("#contact").attr('class', 'menu_redirect');
	}
	result_change("data/results.txt");
    size_change();
    $('img.microphone').hover(sourceSwap, sourceSwap);
    $('img.button').hover(sourceSwap, sourceSwap);

    $(window).on('resize', function(){
                 size_change();
                 });
	
	$("#web").click(function(){
	   button_reset();
	   result_change("data/results.txt");
	   $("#web").attr('class', 'menu_highlight');
	   $("#nav_bar").animate({ left: 128}, 500);
	});
	$("#skills").click(function(){
	   button_reset();
	   result_change("data/skills.txt");
	   $("#skills").attr('class', 'menu_highlight');
	   $("#nav_bar").animate({ left: 185}, 500);
	});
	$("#career").click(function(){
	   button_reset();
	   result_change("data/career.txt");
	   $("#career").attr('class', 'menu_highlight');
	   $("#nav_bar").animate({ left: 244}, 500);
	});
	$("#projects").click(function(){
	   button_reset();
	   result_change("data/project_set.txt");
	   $("#projects").attr('class', 'menu_highlight');
	   $("#nav_bar").animate({ left: 316}, 500);
	});
	$("#artwork").click(function(){
	   button_reset();
	   result_change("data/artwork.txt", true);
	   $("#artwork").attr('class', 'menu_highlight');
	   $("#nav_bar").animate({ left: 388}, 500);
	});
	$("#contact").click(function(){
	   button_reset();
	   result_change("data/contact.txt");
	   $("#contact").attr('class', 'menu_highlight');
	   $("#nav_bar").animate({ left: 462}, 500);
	});
	});