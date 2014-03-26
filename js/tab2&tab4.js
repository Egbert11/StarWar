// JavaScript Document
$(function(){
	var tab = $(".main .tab_style");
	tab.find("span").bind("click",function(){
		var parent = $(this).parent();
		if($(this).attr('id').length>0){
			parent.find("span").removeClass("active");
			$(this).addClass("active");
		}
		//主播星星排行
		var zhubo = $(".zhuboRank");
		var whichTab = $(this).attr("id");
		switch(whichTab){
			case "1":
				zhubo.find(".rankList").css({'display':'none'});
				zhubo.find("#day").css({'display':'block'});
				break;
			case "2":
				zhubo.find(".rankList").css({'display':'none'});
				zhubo.find("#week").css({'display':'block'});
				break;
			case "3":
				zhubo.find(".rankList").css({'display':'none'});
				zhubo.find("#month").css({'display':'block'});
				break;
			case "4":
				zhubo.find(".rankList").css({'display':'none'});
				zhubo.find("#all").css({'display':'block'});
				break;
		}
		//粉丝贡献排行
		var fans = $(".fansRank");
		switch(whichTab){
			case "5":
				fans.find(".rankList").css({'display':'none'});
				fans.find("#day").css({'display':'block'});
				break;
			case "6":
				fans.find(".rankList").css({'display':'none'});
				fans.find("#week").css({'display':'block'});
				break;
			case "7":
				fans.find(".rankList").css({'display':'none'});
				fans.find("#month").css({'display':'block'});
				break;
			case "8":
				fans.find(".rankList").css({'display':'none'});
				fans.find("#all").css({'display':'block'});
				break;
		}
	});
});