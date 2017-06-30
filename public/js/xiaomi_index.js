(function(){
$(function() { //页面加载完成后
//1:加载头和尾内容
//加载头文件 header.html
//加载脚文件 footer.html
        $("#header").load("data/header.html", function () {
            //找到id为welcome的标签设置其内容为欢迎回来+"名字"
            //找到id为welcome的li设置其内容为欢迎回来+Name;
            var uid = sessionStorage["uid"];
            var n = sessionStorage["loginName"];
            if (uid) {
                welcome.innerHTML = `欢迎回来:${n} <a href="loginout.html">退出登录</a>`;
                $(".none").remove();
            } else {
                welcome.innerHTML = "您好,欢迎来到小米商城";
            }
            //找到是哪个用户登录
            //var uid=sessionStorage["uid"];
            $.ajax({
                type: "GET",
                url: "/selectCount",
                data: {uid: uid},
                success: function (result) {
                    //console.log(result);
                    var cart = `购物车(${result.count})`;
                    sessionStorage["cart"] = cart;
                    $("#cart").html(cart);
                }
            })
            //一:找到第一个搜索框
            searched.onfocus = getFocus;
            function getFocus() {
                $(this).css("borderColor", "#ff6700");
                $(this).next().children().css("borderColor", "#ff6700")
            }

            searched.onblur = function () {
                $(this).css("borderColor", "#A9A9A9");
                $(this).next().children().css("borderColor", "#A9A9A9");
            }

            //二:找到第一个搜索框 将搜索的关键字保存之后跳到product-list.html页面
            $("#btn").on("click", function () {
                var keys = $('#searched').val();
                sessionStorage["keys"] = keys;
                //console.log(typeof keys);
                if (keys != "") {
                    location.href = "product-list.html?key=" + keys;
                }
            });
            document.onkeydown = function () {//方法一
                var e = window.event || arguments[0];
                //alert(e.keyCode);//打桩！
                //接下来判断
                if (e.keyCode == 13) {
                    console.log(1)
                    $("#btn").click();
                    console.log(2)
                }
            }

            //$("#searched").on("keydown",function(e){//方法二
            //    if(e.keyCode==13){
            //        console.log(1);
            //        $("#btn").trigger("click");
            //        console.log(11);
            //    }
            //})
            //三:楼层点亮
            //滚动监听插件$(window).scroolspy(options)
            jQuery.fn.scrollspy = function (options) {
                var $liList = $(options.target).find("li");
                //console.log($liList);
                $liList.on('click', "a", function (e) {
                    e.preventDefault();//阻止事件默认行为;
                    //this=>a
                    //根据a的href属性找到每一个a对应的楼层距离页面顶部的偏移量
                    var floorId = $(this).attr('href');
                    var top = $(floorId).offset().top;
                    $('body').animate({scrollTop: top}, 500);
                });
                //监听页面的滚动事件，进行楼层开关点亮
                //window.onscroll=function(){}
                $(window).scroll(function () {
                    var top = $(window).scrollTop();//获取window距离页面顶部距离
                    //console.log(top);
                    //如果在一楼之上的话，就要把侧边导航隐藏起来，相反如果在四楼之下也要隐藏起来
                    if (top < 1200) { //如果在一楼之上的话，
                        $(options.target).fadeOut();
                    } else if (top > 3300) {//如果在四楼之下
                        $(options.target).fadeOut();
                    } else {
                        $(options.target).fadeIn();
                        $liList.each(function (i, li) {
                            //li-->a .href => div.floor =>offset().top
                            var floorId = $(this).children("a").attr("href");  //每一个楼层距离页面顶部偏移量
                            var floorTop = $(floorId).offset().top;
                            if (top >= floorTop) { //窗口已经滚动到特定楼层
                                $(li).addClass('active').siblings(".active").removeClass("active");
                            }
                        })
                    }
                })
            }
            $(window).scrollspy({
                target: "div.affix" //指定要操作的附加导航
            });

        });

        $("#footer").load("data/footer.html", function () {
            //底部加载完成后要显示一次性定时器广告
            setTimeout(function(){ $("#msg").css("bottom", "0px");},6000);

            //绑定单机事件
            $("#msg>a").on("click", function () {
                $("#msg").css("bottom", "-200px");
                //等三秒后再上移
                setTimeout(function () {
                    $("#msg").css("bottom", "0px");
                }, 3000 + 2000)
            })
        });
        if (!window.jQuery) {
            throw new Error("jd_index.js依赖于jQuery");
        }
//调用轮播广告插件函数,
//$(".sliderBox").carousel();
        jQuery.fn.carousel1 = function () {
            var interval = 5000;//定义一个时间变量，切换时间间隔
            var duration = 500; //每次轮换动画的持续时间/毫秒;
            var $imgList = this.children('img');//所有的img组成的直接子元素;
            var $liList = this.find("li");  //所有的li 组成的类数组子元素模糊查找
            var current = 0; //当前显示广告的序号
            var next = 1;    //下次即将要显示的广告的序号
            //开启一个定时器，每隔interval时长启动一次轮换
            setInterval(function () {
                lunhuan();
            }, interval);
            //为每个li添加事件监听,单击后直接显示指定的广告
            $liList.click(function () {
                var i = $liList.index(this);//找到当前点击圆饼时对应的下标
                next = i;
                lunhuan();
            });
            function lunhuan() {
                //让第next个li圆饼添加.active,让其兄弟元素去除.active;
                $liList.eq(next).addClass("active").siblings(".active").removeClass("active");
                //让当前显示的广告启动动画向左滑动，滑出去后，删除.active;
                $imgList.eq(current).animate({left: '-100%'}, duration, function () {
                    //console.log(this);  this.removeClass("active");这样写不可以
                    $(this).removeClass("active");
                });
                //让即将要显示的下一张广告添加.active，出现在最右侧，开始动画慢慢向左滑动;
                $imgList.eq(next).addClass("active").css("left", "100%").animate({left: '0'}, duration, function () {
                });
                //修改current和next变量的值
                current = next;
                next++;
                //如果next=5，
                if (next >= $imgList.length) {
                    next = 0;
                }
            };
        }
        $('.slider-box').carousel1();

//调用轮播广告插件函数,小米明星单品
        jQuery.fn.carousel2 = function () {
            var interval = 5000;//定义一个时间变量，切换时间间隔
            var duration = 500;//每次轮换动画的持续时间/毫秒;
            var that = this;
            var $spanList = $(".icons").children();
            //console.log($spanList);
            var offset = [0, -1240];
            var i = 1;

            setInterval(function () {
                lunhuan2();
            }, interval);
            //为每个span添加事件监听,单击后直接显示指定的广告
            $spanList.click(function () {
                var I = $spanList.index(this);//找到当前点击圆饼时对应的下标
                i = I;
                lunhuan2();
            })
            function lunhuan2() {
                $spanList.eq(i).addClass("active").siblings(".active").removeClass("active");
                var val = offset[i] + "px";
                that.animate({left: val}, duration, function () {//如果i为
                    if (i == 1)i = 0;
                    else i = 1;
                })

            }
        }
        //轮播广告
        $(".singleStar ul").carousel2();
        //调用滚动监听插件函数

});
})();
