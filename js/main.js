$(document).ready(function(){
    SetSwitchTab();
	SetUpTabClickJump();
	SetUpStarTravelHover();
    //星星排行的日，周，月，总点击事件
    starRankTab();
    $(".tab2_rankList").children(":odd").css("background-color","#eefafd");
	starRankDisplay();
	fansContributionDisplay();
});

// set up tab switch
function SetSwitchTab(){
    $(".tabs li a").bind("click",function(){
        $(".tabs li a").removeClass("active");
        $(this).addClass("active");
        $(".main_content .content").hide();
        $("#" + $(this).attr("name")).show();
    })
}

//set up listener on the star travel page;
function SetUpStarTravelHover(){
	var cells = $("#tab3 .rank_cells .week_cell");
	$.each(cells,function(index,value){
		var cell = $(this);
		cell.hover(function(){
			var hoverLayer = $("#tab3 .hoverlayer");
			var x = cell.position().left;
			var y = cell.position().top;
			var fx = 0;
			var fy = 0;
			switch(index+1){
				case 1:
					fx = x + 100;
					fy = y +50;
					break;
				case 2:
					fx = x +100;
					fy = y + 50;
					break;
				case 3:
					fx = x - 242;
					fy = y + 50;
					break;
				case 4:
					fx = x + 130;
					fy = y - 60 ; 
					break;
				case 5:
					fx = x -50;
					fy = y;
					break;
				default:
					
					break;
			}
			hoverLayer.css({display:"block",top:fy+"px",left:fx+"px"});
			hoverLayer.hover(function(){
				$(this).css({display:"block"});
			},function(){
				$(this).css({display:"none"});
			});
		},function(){	
			var hoverLayer = $("#tab3 .hoverlayer");
			hoverLayer.css({display:"none"});
		});
	});
	var cell = $("#tab3 .sjmonth_rank .sjrank_content");
	cell.hover(function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.css({display:"block",top:"55px",left:"330px"});
		hoverLayer.unbind("hover");
		hoverLayer.hover(function(){
			$(this).css({display:"block"});
		},function(){
			$(this).css({display:"none"});
		});
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

//星星排行的日，周，月，总点击事件
function starRankTab() {
    var tab = $(".tab2_main .tab_style");
    tab.find("a").bind("click",function(){
        var parent = $(this).parent().parent();
        if($(this).attr('id').length>0){
            parent.find("a").removeClass("active");
            $(this).addClass("active");
        }
        //主播星星排行
        var zhubo = $(".tab2_zhuboRank");
        var whichTab = $(this).attr("id");
        switch(whichTab){
            case "1":
                zhubo.find(".tab2_rankList").css({'display':'none'});
                zhubo.find("#day1").css({'display':'block'});
                break;
            case "2":
                zhubo.find(".tab2_rankList").css({'display':'none'});
                zhubo.find("#week1").css({'display':'block'});
                break;
            case "3":
                zhubo.find(".tab2_rankList").css({'display':'none'});
                zhubo.find("#month1").css({'display':'block'});
                break;
            case "4":
                zhubo.find(".tab2_rankList").css({'display':'none'});
                zhubo.find("#all1").css({'display':'block'});
                break;
        }
        //粉丝贡献排行
        var fans = $(".fansRank");
        switch(whichTab){
            case "5":
                fans.find(".tab2_rankList").css({'display':'none'});
                fans.find("#day2").css({'display':'block'});
                break;
            case "6":
                fans.find(".tab2_rankList").css({'display':'none'});
                fans.find("#week2").css({'display':'block'});
                break;
            case "7":
                fans.find(".tab2_rankList").css({'display':'none'});
                fans.find("#month2").css({'display':'block'});
                break;
            case "8":
                fans.find(".tab2_rankList").css({'display':'none'});
                fans.find("#all2").css({'display':'block'});
                break;
        }
    });
}

//设置星星排行的数据显示
function starRankDisplay(){
	
	var starRank = {
	day:[
		"梦幻西游梦幻西游",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名",
		"我是第七名"
	],
	week:[
		"大话西游大话西游",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名"	
	],
	year:[ 
		"DotaDotaDotaDota",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名"		
	],
	ALL:[
		"2009200920092009",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名"		
	]
	};
	var i = 1;
	for(;i <= starRank.day.length;i++)
	{
		$(".tab2_zhuboRank .tab2_rankList#day1 #day1-"+i+" span:last-child").text(starRank.day[i-1]);
		switch(i){
			case 1: case 2: case 3:
				break;
			case 4: case 5: case 6: case 7: case 8: case 9: case 10:
				$(".tab2_zhuboRank .tab2_rankList#day1 #day1-"+i+" span:first-child").text(i);
				break;
		}
	}
	for(;i<=10 ;i++)
	{
		$(".tab2_zhuboRank .tab2_rankList#day1 #day1-"+i).css("display","none");
	}
}


//设置粉丝贡献的数据显示
function fansContributionDisplay(){
	var bestFan = {
		name:"梦幻西游大话西游",
		number:123456
	};
	$(".tab4_bestFanStyle").find(".tab4_bestFan .name").text(bestFan.name);
	$(".tab4_bestFanStyle").find(".tab4_bestFan .number").text("x"+bestFan.number);
	
	var dynamicState ={
		name:"CCC",
		day:22,
		reward:90,
		rank:2
	};
	
	$(".tab4_content .name#name1").text(dynamicState.name);
	$(".tab4_content .name#numOfDay1").text(dynamicState.day);
	$(".tab4_content .name#percent1").text(dynamicState.reward+"%");
	$(".tab4_content .rank#rank1").text(dynamicState.rank);
	
}
