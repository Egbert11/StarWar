$(document).ready(function(){
    SetSwitchTab();
	SetUpTabClickJump();
	SetUpStarTravelHover();
    //星星排行的日，周，月，总点击事件
    starRankTab();
    $(".tab2_rankList").children(":odd").css("background-color","#eefafd");
	
	FetchAndSetBannerData();
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





