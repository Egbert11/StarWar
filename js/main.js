$(document).ready(function(){
    SetSwitchTab();
	SetUpTabClickJump();
	SetUpStarTravelHover();
    //星星排行的日，周，月，总点击事件
    starRankTab();
    $(".tab2_rankList").children(":odd").css("background-color","#eefafd");
	starRankDisplay();
	fansContributionDisplay();
	FetchAndSetBannerData();
	FetchAndSetStarJourneyPageData("2014-03");
});

// set up tab switch
function SetSwitchTab(){
    $(".tabs li").on("a","click",function(){
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
		cell.unbind('hover');
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
					fx = x - 152;
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
    var zhuboNav = $(".zhuboRank .tab_style");
    zhuboNav.delegate("li a", "click",function(){
        zhuboNav.find("a").removeClass("active");
        var name = $(this).addClass("active").attr("name");

        $(".zhuboRank ul.tab2_rankList").hide();
        $(".zhuboRank").find("ul[name="+name+"]").show();
    });

    var fansNav = $(".fansRank .tab_style");
    fansNav.delegate("li a", "click",function(){
        fansNav.find("a").removeClass("active");
        var name = $(this).addClass("active").attr("name");

        $(".fansRank ul.tab2_rankList").hide();
        $(".fansRank").find("ul[name="+name+"]").show();
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

//get the data from banner;
function FetchAndSetBannerData(){
	
	//fetchDataFromServer
	//$.ajax();		
	//
	//mock it up with fake data.
	data = {
		avatar:"2333.png",
		anchor_name:"herokingsley",
		anchor_rank:6,
		anchor_renqi:123,
		anchor_fo:2333333
	};
	//update the content of the anchor info
	var pic = $(".banner .avatar");
	//pic.attr("src",data.avatar);
	var pinfo = $(".pinfo_content");
	var person_name = pinfo.find(".person_name");
	person_name.html(data.anchor_name);
	var contentArr = pinfo.find(".sub_info_content");
	var anchorRank = contentArr[0];
	$(anchorRank).html("LV"+data.anchor_rank);
	var anchorRenqi = contentArr[1];
	$(anchorRenqi).html(data.anchor_renqi);
	var anchorfo = contentArr[2];
	$(anchorfo).html(data.anchor_fo);

	d = {
		a:10,
		b:11,
		c:13,
		d:14,
		e:15
	};
	//update the value of the star rank col
	var rankcol = $(".banner .star_rank"); 	
	var rcontentArr = rankcol.find(".sub_info_content");
	var todayMei = rcontentArr[0];
	$(todayMei).html(d.a);
	var todayren = rcontentArr[1];
	$(todayren).html(d.b);
	var todaystar = rcontentArr[2];
	$(todaystar).html(d.c);
	var weekstar = rcontentArr[3];
	$(weekstar).html(d.d);
	var monthzong = rcontentArr[4];
	$(monthzong).html(d.e);

	//setup star journey data;
	//
	var j = {
		a:10,
		aa:"2011-10-09",
		b:15,
		bb:"1111-11-11",
		c:20,
		cc:"1234-05-06"
	};	

	var starJourney = $(".banner .star_journey");
	var rankArr = starJourney.find(".sub_info_content");
	var dateArr = starJourney.find(".journey_date");
	var zongbang = rankArr[0];
	$(zongbang).html(j.a);
	var zongbangdate = dateArr[0];
	$(zongbangdate).html(j.aa);
	var monthbang = rankArr[1];
	$(monthbang).html(j.b);
	var monthbangdate = dateArr[1];
	$(monthbangdate).html(j.bb);
	var weekbang = rankArr[2];
	var weekbangdate = dateArr[2];
	$(weekbang).html(j.c);
	$(weekbangdate).html(j.cc);
}

//set up the data of tab3
function FetchAndSetStarJourneyPageData(timestamp){

	//give a time stamp and set the responding data.
	//$.ajax();	
	var data = {
		month_rank:10,
		week_rank:[{
			datestamp:"2014 1.1-7",
			rank:10
		},{
			datestamp:"2014 1.8-14",
			rank:11
		},{
			datestamp:"2014 1.15-21",
			rank:12
		},{
			datestamp:"2014 1.22-28",
			rank:13
		},{
			datestamp:"2014 1.29-32",
			rank:14
		}]
	};

	var tab3 = $("#tab3")
	var monthrank = tab3.find(".sjmonth_rank .sub_info_content");
	monthrank.html(data.month_rank);
	var weekrank = $("#tab3 .sjweek_rank");
	weekrank.empty();
	weekrank.append('<span class="sjrank_title">明星周榜</span>');
	weekrank.append('<div class="rank_cells"></div>');

	var cells = $("#tab3 .rank_cells");
	var l = data.week_rank.length;
		
	for (var i=0;i< 5;i++){
		var index = i+1;
		var key = "#week_cell" + index;
		var cell_str  = '<div id="' + "week_cell" + index + '"></div>';
		cells.append(cell_str);
		var cell = cells.find(key);
		if (index > l){
			cell.addClass("week_cell_empty");
			cell.append("");
			continue;
		}
		cell.addClass("week_cell");
		cell.append('<span class="week_cell_date">'+data.week_rank[i].datestamp+'</span><br/>');
		cell.append('<span class="week_icon"></span>');	
		cell.append('<span class="sub_info_title">明星周榜第<span class="sub_info_content">'+data.week_rank[i].rank+'</span>名</span>');
		//celldate.html(data.week_rank[i].datestamp);
//		var cellrank = cell.find(".sub_info_content");
//		cellrank.html(data.week_rank[i].rank);
	}	
}


