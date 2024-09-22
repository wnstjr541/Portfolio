
let moving=$('.best-box-full .best-box'),
imgWidth=moving.find('.best-box1').width()+60,
setIntervalId=undefined;

function sliding(){
    setIntervalId=setInterval(() => {
        moving.animate({left:-imgWidth},500, function(){
            $(this).children('div:first').insertAfter($(this).children('div:last'));
            $(this).css({left:0});
        });
    }, 2000);
}
sliding();
// 호버시 정지

$('.best-box-full').on({'mouseover':function(){
clearInterval(setIntervalId);
},'mouseout':function(){
sliding();
}
});

$('#left').on({'mouseover':function(){
clearInterval(setIntervalId);
},'mouseout':function(){
sliding();
}
});

$('#right').on({'mouseover':function(){
clearInterval(setIntervalId);
},'mouseout':function(){
sliding();
}
});

// 클릭시 액션설정

function left(){
    
    moving.find('div:last').insertBefore(moving.find('div:first'));
    moving.css({left: -imgWidth}).stop().animate({left:0},500)
}

function right(){
    moving.animate({left:-imgWidth},500, function(){
    $(this).children('div:first').insertAfter($(this).children('div:last'));
    $(this).css({left:0});
});
}



$('#left').click(function(){
left();
return false;
});
$('#right').click(function(){
right();
return false;
});