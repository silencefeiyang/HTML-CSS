$(function(){
  //图片数组
  var imgSrc = ["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg","img/banner4.jpg"];
  //控制点点
  var bannerPoint = $(".changer_banner");
  //循环动态生成点点的a标签
  for(var i = 0 ; i< imgSrc.length-1 ; i++){
    bannerPoint.append("<a href='javascript:;' class='change_list fl'></a>");
  }
  //获取到要移动的父级
  var moveDiv = $(".banner_pic");
  console.log(moveDiv);
  //获取到第一张
  var firstImg = $(".banner_pic img:first");
  //下一张
  var nextImg = $(".banner_pic img:eq(1)");
  var n = 0;
  //点击下一张
  $(".next").click(function(){
    changImg('next')
  })
  //点击上一张
  $(".prev").click(function(){
    changImg('prev',true)
  })
  var index
  //当鼠标移入点点的时候
  $(".changer_banner a").click(function(){
    //记录当前点点的下标
    index = $('.changer_banner a').index(this);
    //给当前的点点添加class
    $('.changer_banner a').removeClass('active');
    $(this).addClass('active');
    if(n<index){
      n = index -1 ;
      changImg('next')
    }
    if(n>index){
      n = index+1;
      changImg('prev');
    }
  })
  console.log(-firstImg.width())
  //移动banner图
  function changImg(status,flag){
    //如果没有运动完，返回
    if(moveDiv.is(':animated'))  return;
    if(status == 'next'){
      //在移动之前将div的left值拉回0；
      moveDiv.css('left',0);
      n = n == imgSrc.length -1 ? 0:++n;
      //控制点点
      $('.changer_banner a').removeClass('active');
      $('.changer_banner a').eq(n).addClass('active');
      moveDiv.animate({left:-firstImg.width()},1000,"linear",function(){
        firstImg.attr('src',imgSrc[n]);
      })
      //要改变的下一张的src
      nextImg.attr('src',imgSrc[n]);
    }
    if(status == "prev"){
      //先让下一张变为上一张
      if(flag)nextImg.attr('src',imgSrc[n]);
      moveDiv.css('left',-firstImg.width());
      n = n == 0? imgSrc.length-1: --n;
      $('.changer_banner a').removeClass('active');
      $('.changer_banner a').eq(n).addClass('active');
      moveDiv.animate({left:0},1000,"linear",function(){
        nextImg.attr('src',imgSrc[n]);
      })
      firstImg.attr('src',imgSrc[n]);
    }
  }
  //自动播放定时器
  var timer = null;
  function auPlay(){
    timer = setInterval(function(){
        changImg('next');
    },2000);
  }
  auPlay();
  //鼠标移入清除定时器
  $('.main_middle').mouseover(function(){
    clearInterval(timer);
  })
  $('.main_middle').mouseout(function(){
    auPlay();
  })
})
