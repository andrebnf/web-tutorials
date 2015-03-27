$(document).ready(function() {
	$("html, body").scrollTop(0);	

	$('.root-item').click(function(){
		// if (this.getAttribute("class").indexOf("has-sub-menu") >= 0){
		// 	$(this).next().slideDown("fast");
		// };

		if ($('.hidden-menu').is(':visible')){
			$('.hidden-menu').slideUp("fast");
		};

		if (!$(this).next().is(':visible') && this.getAttribute("class").indexOf("has-sub-menu") >= 0){
			$(this).next().slideDown("fast");
		};

		var redirect = this.getAttribute("data-redirect");
		if (redirect != null) {
		  $("html, body").scrollTop(0);	
			if(redirect.length > 0){
				closeAside();
				window.location = './#/'+redirect; 
			};
		};
	});

	$('.sub-menu-container a').click(function(e){
		if ($(this).hasClass("disabled")){
			e.preventDefault();
		} else {
			closeAside();
			resetSubMenuColors();
		 $("html, body").scrollTop(0);
		}
		// this.style.backgroundColor="rgb(202, 237, 247)";
	});

	// $( "#menu-btn" ).click(function() { //FOR RESPONSIVE CONTENT
	  // openAside(); // INLINE CALL
	// });

	$( "#close-menu" ).click(function(){
		closeAside();
	});

	$( window ).resize(function() {
		var w = window.innerWidth;
		if (w > 800) {
			if (!$('aside').is(":visible")) {
				$('aside').show();
			};
			if ($(".responsive-modal").is(":visible")){
				$(".responsive-modal").hide();
			};
		} else {
			if ($('aside').is(":visible")) {
				$(".responsive-modal").show();
			};
		};

		//
	});

});
var timeout;
var options_hidden = true;
function showDownloadOptions(ele){
	// console.log(ele);
	clearTimeout(timeout);

	if(!options_hidden) {
		hideDownloadOptions(ele);
		options_hidden = true;
		return;
  }
  options_hidden = false;
	var check = true;
	var next = ele;
	var i = 1;
	while (check){	
		next = $(next).next();
		if (next.length == 0){
			check = false;
			continue;
		}
		var top = (i == 1 ? 57 : i * 52);
		i++;
		$(next).animate({'top': top+'px'},200);
	}

	timeout = setTimeout(function(){ 
		hideDownloadOptions(ele);
	}, 10000);
	// console.log($(ele).next());
}

function hideDownloadOptions(ele){
	var btn_list = ele.parentNode.children;
	for (var i = 1; i < btn_list.length; i++) {
		$(btn_list[i]).animate({'top': '10px'},200);
	};
}

function showDownloadTooltip(ele){
	var tp = $(ele).find('.tooltip');
	if (!$(tp).is(':visible')){
		$(ele).find('.tooltip').fadeIn("fast");
	}
}
function hideDownloadTooltip(ele){
	var tp = $(ele).find('.tooltip');
	if ($(tp).is(':visible')){
		$(ele).find('.tooltip').fadeOut("fast");
	}
}

// angular.element(document).ready(function () {
// 		menuBarsMiddle();
// });

// function menuBarsMiddle(){
// 	console.log('aaaa');
// 	if ($("#menu-btn").is(":visible")) {
// 		var hm = document.getElementById("menu-btn").offsetHeight;
// 		console.log(hm);
// 		document.getElementById("menu-bars").style.marginTop = Math.floor(hm/2) - 15 + "px";
// 	};
// }

function fixToTopBtn(){
	var h = document.documentElement.scrollTop || document.body.scrollTop;
	if (h > $(window).height()){
		document.getElementById("top-scroll").style.display="block";
	} else {
		document.getElementById("top-scroll").style.display="none";
	}
}

function gotoSection(t){
	var el = t.getAttribute("data-scroll");
	$("html, body").animate({ scrollTop: document.getElementById(el).offsetTop - 20 }, "medium");
}

function openAside(){
	$('aside').stop(true,true).show("slide", { direction: "left" }, "medium");
	// $(".responsive-modal").fadeIn();
	document.getElementsByClassName("responsive-modal")[0].style.display="block";
	document.body.style.overflow="hidden";
	// $('body').css("overflow", "hidden");
}

function closeAside(){
	if ($(".responsive-modal").is(":visible")){
		document.getElementsByClassName("responsive-modal")[0].style.display="none";
		// $(".responsive-modal").fadeOut();
		$('aside').stop(true,true).hide("slide", { direction: "left" }, "medium");
		// $('body').css("overflow", "auto");
		document.body.style.overflow="auto";
	}
}

function slideUpAfterSlidedDown(){
	// if(this.id =="tuts"){
		resetMenuColors();
	// };
	$('.hidden-menu').slideUp("fast");
	$('.root-item').unbind("click",slideUpAfterSlidedDown);
};

function resetMenuColors(){
	var all = document.getElementsByClassName("root-item");
	for(var i = 0; i < all.length; i++){
		all[i].style.color="#666";
		all[i].childNodes[0].childNodes[0].style.color="#666";
	};
};

function resetSubMenuColors(){
	var el = $('.hidden-menu');
	var alist = $(el).find('a');
	for (var i = alist.length - 1; i >= 0; i--) {
		alist[i].style.backgroundColor="";
		alist[i].style.color="#666";
	};
};

function resetStyle(){
	resetSubMenuColors();
	resetMenuColors();
};

function highlightMenu(n_menu){
	var menu = document.getElementsByClassName('root-item')[n_menu];
	menu.style.color="rgb(127, 132, 161)";
	menu.childNodes[0].childNodes[0].style.color="rgb(127, 132, 161)";
};

function highlightSubMenu(class_name, n_menu){
	var a = $('.'+class_name+'-hidden a')[n_menu];
	a.style.backgroundColor="rgb(127, 132, 161)";
	a.style.color="white";
	$(a.parentNode.parentNode).show();

}

function highlightOnLocation(){
	resetStyle();
  $("html, body").scrollTop(0);	


	var loc = window.location.hash.split('/')[1];
	switch(loc){
		case "presentation":
			highlightMenu(0);
			$('.hidden-menu').hide;
			break;

		case "article":
			highlightMenu(1);
			// if (el.find('.hidden-menu').length != 0){
				// alert('oii');
			// }
			var el = document.getElementsByClassName('root-item')[1];
			var hm_list = document.getElementsByClassName("hidden-menu");
			if ($(el).next().hasClass("hidden-menu")){
				for (var i = 0; i < hm_list.length; i++){
					if ($(hm_list[i]).is(":visible") && hm_list[i] != el){
						hm_list[i].style.display="none";
					}
				}
			}
			var art = window.location.hash.split('/')[2];
			highlightSubMenu("article", art-1);
			// $('#tuts').bind("click",slideUpAfterSlidedDown);
			break;

		case "tutorial":
			highlightMenu(2);
			var tut = window.location.hash.split('/')[2];
			highlightSubMenu("tutorial", tut-1);
			// $('#tuts').bind("click",slideUpAfterSlidedDown);
			break;

		case "monitor":
			highlightMenu(3);
			break;

		case "about":
			highlightMenu(4);
			break;

		default:
			var ri = document.getElementsByClassName('root-item')[0];
			ri.style.color="rgb(127, 132, 161)";
			ri.childNodes[0].childNodes[0].style.color="rgb(127, 132, 161)";
			break;
	};
}
