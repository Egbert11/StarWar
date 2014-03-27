// JavaScript Document
$(function(){
	//星星排行的日，周，月，总点击事件
	starRankTab();
	
	$(".tab2_rankList").children(":odd").css("background-color","#eefafd");
});

//星星排行的日，周，月，总点击事件
function starRankTab() {
	var tab = $(".tab2_main .tab_style");
	tab.find("span").bind("click",function(){
		var parent = $(this).parent();
		if($(this).attr('id').length>0){
			parent.find("span").removeClass("active");
			$(this).addClass("active");
		}
		//主播星星排行
		var zhubo = $(".tab2_zhuboRank");
		var whichTab = $(this).attr("id");
		switch(whichTab){
			case "1":
				zhubo.find(".tab2_rankList").css({'display':'none'});
				zhubo.find("#day").css({'display':'block'});
				break;
			case "2":
				zhubo.find(".tab2_rankList").css({'display':'none'});
				zhubo.find("#week").css({'display':'block'});
				break;
			case "3":
				zhubo.find(".tab2_rankList").css({'display':'none'});
				zhubo.find("#month").css({'display':'block'});
				break;
			case "4":
				zhubo.find(".tab2_rankList").css({'display':'none'});
				zhubo.find("#all").css({'display':'block'});
				break;
		}
		//粉丝贡献排行
		var fans = $(".fansRank");
		switch(whichTab){
			case "5":
				fans.find(".tab2_rankList").css({'display':'none'});
				fans.find("#day").css({'display':'block'});
				break;
			case "6":
				fans.find(".tab2_rankList").css({'display':'none'});
				fans.find("#week").css({'display':'block'});
				break;
			case "7":
				fans.find(".tab2_rankList").css({'display':'none'});
				fans.find("#month").css({'display':'block'});
				break;
			case "8":
				fans.find(".tab2_rankList").css({'display':'none'});
				fans.find("#all").css({'display':'block'});
				break;
		}
	});
}