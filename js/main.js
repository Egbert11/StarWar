$(document).ready(function(){

	SetUpTabClickJump();
	SetUpStarTravelHover();

});

//set up listener on the star travel page;
function SetUpStarTravelHover(){
	var cells = $("#tab3 .rank_cells .week_cell");
	$.each(cells,function(index,value){
		var cell = $(this);
		cell.hover(function(){
			var hoverLayer = $("#tab3 .hoverlayer");
			var x = cell.position().left;
			var y = cell.position().top;
			hoverLayer.css({display:"block",top:(y+55)+"px",left:(x+100)+"px"});
		},function(){
			
			var hoverLayer = $("#tab3 .hoverlayer");
			hoverLayer.css({display:"none"});
		});
	});
	var cell = $("#tab3 .sjmonth_rank .sjrank_content");
	cell.hover(function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.css({display:"block",top:"55px",left:"360px"});
	},function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.css({display:"none"});
	});
}

//bind the click function with the tab jump effect; 
function SetUpTabClickJump(){
	
	var tabs = $(".tabs li a");
	$.each(tabs,function(index,value){
		$(this).click(function(){
			var nowSelectedTab = $(".tabs .active");
			nowSelectedTab.removeClass("active");
			$(this).addClass("active");
			var contents = $(".content");
			$.each(contents,function(index,value){
				$(this).removeClass('cactive');
			});
			var nIndex = index + 1;
			var nowContent = $("#tab"+nIndex);
			nowContent.addClass('cactive');
		});
	});
}

