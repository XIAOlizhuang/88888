(function(){
$(function(){
    //1:加载头和尾内容
    //加载头文件 header.html
    //加载脚文件 footer.html
    $("#header").load("data/header.html",function(){//页面加载完成后来个回调函数
        //找到id为welcome的标签设置其内容为欢迎回来+"名字"
        //找到id为welcome的li设置其内容为欢迎回来+Name;
        var n =sessionStorage["loginName"];
        // console.log(typeof n);
        if (n) {
            welcome.innerHTML = `欢迎回来:${n} <a href="loginout.html">退出登录</a>`;
            $(".none").remove();
        }else{
            welcome.innerHTML="您好,欢迎来到小米商城";
        }
        //购物车中的数量动态获取到
        var cart=sessionStorage["cart"];
        $("#cart").html(cart);

    });
    $("#footer").load("data/footer.html");

    //先找到更多的a标记然后点击触发让ul的高为90px;
    $(".more").on("click",function(e){
        e.preventDefault();
        //console.log(this);
        //获取a中的data-toggle属性
      var hover= $(this).attr("data-target");
        //判断
        if(hover==="dropUp"){
            $(this).parent().parent().css("height","90px");
            $(this).attr("data-target","dropDown");
        }else if(hover==="dropDown"){
        $(this).parent().parent().css("height","45px");
        $(this).attr("data-target","dropUp");
        }
    })
    //第二个
    $(".more2").on("click",function(e){
        e.preventDefault();
        //console.log(this);
        //获取a中的data-toggle属性
        var hover= $(this).attr("data-target");
        //判断
        if(hover==="dropUp"){
            $(this).parent().parent().css("height","130px");
            $(this).attr("data-target","dropDown");
        }else if(hover==="dropDown"){
            $(this).parent().parent().css("height","45px");
            $(this).attr("data-target","dropUp");
        }
    })
    //模块四:页面加载后，异步请求当前
    //把获得的参数接收到
    console.log(location.search.split("=")[1]);
    var keys=location.search.split("=")[1];
        keys=decodeURIComponent(keys);
    //ajax异步请求
    $.ajax({
        type:"GET",
        url:"/search",
        data:{key:keys},

        success:function(result){
            console.log(result);
            var html="";
            for(var i=0;i<result.length;i++){
                var OBJ=result[i];
                html+=`
                            <ul>
                                <li>
                                     <span class="lf">喜欢</span>
                                     <!-- 尝试自定义属性-->
                                     <span class="rt buy" data-target="${OBJ.pid}">立即购买</span>
                                     <img src=${OBJ.pic}>
                                     <p class="apply"></p>
                                     <a href="#">${OBJ.pname}</a>
                                     <p class="price">${OBJ.price}</p>
                                </li>
                            </ul>
                           `
            }
            $(".section-items").html(html);
        }
    })
    //登录用户购物车中商品信息.

    $('.section-items').on("click",".buy",function(){
        //1、找到是哪个用户登录uid, 2、知道是点击哪一个商品也就是pid
        //3、判断商品是否购买过，如果没有购买就insert ,如果购买过就update
            var uid= sessionStorage["uid"];
            if(uid==null){
                location.href="register.html";
            }
            //console.log(uid);
            var pid=$(this).attr("data-target");//把这个保存起来  防止以后有用
                 sessionStorage["pid"]=pid;
            //console.log(pid);
            //开始发送ajax请求
            $.ajax({
                type:"POST",
                url:"/cart",
                data:{uid:uid,productId:pid},
                success:function(result){
                    console.log(result);
                    if(result.code==1){
                        alert("商品添加成功");
                    }else if(result.code==2){
                        alert("该商品添加成功已购买"+result.count+"次");
                    }
                }
            })
    })

})
})();