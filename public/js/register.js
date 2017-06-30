/**
 * Created by bjwsl-001 on 2017/5/19.
 */
(function(){
//正则表达式测试用户输入是否合格
uname.onfocus=getFocus;
upwd.onfocus=getFocus;
    function getFocus(){
        this.style.borderColor="#ff6700";
    }
uname.onblur=function(){
   vali(this,/^\w{1,10}$/);
};
function vali(txt,reg){
    if(txt.value=="") {
        er1.style.display = "inline-block";
    }
    else
        if(reg.test(txt.value)){
        er1.className="right";
        s1.innerHTML="";
            return true;
    }else{
            er1.style.display = "inline-block";
            s1.innerHTML="用户名格式错误";
            return false;
    }
}
upwd.onblur=function(){
    vali2(this,/^\d{6}$/);
}
function vali2(txt,reg){
    console.log(reg.test(txt.value));
    if(txt.value=="")
    {er2.style.display="inline-block";}
    else if(reg.test(txt.value)) {
            er2.className ="right";
            s2.innerHTML = "";
        return true;
        }else{
        er2.style.display="inline-block";
            s2.innerHTML = "密码格式错误";
        return false;
        }
}
//当且仅当用户全都输入正确才可以进入到下一个页面
    btn.onclick=function(e) {
        e.preventDefault();//取消默认行为;
        var rName = vali(uname, /^\w{1,10}$/);
        var rPwd = vali2(upwd, /^\d{6}$/);
        //console.log(rName,rPwd);
        if (rName && rPwd) {
//用户注册
//            $("#btn").on("click", function () {
                var n = $("#uname").val();
                var p = $("#upwd").val();
                //console.log(n,p);
                //发ajax请求
                $.ajax({
                    type: "POST",
                    url: "/myregister",
                    data: {uname: n, upwd: p},
                    success: function (result) {
                        console.log(result);
                        if (result.code === 1) {
                            alert("注册成功,3s后进入登录页面...");
                            setInterval(function () {
                                location.href = "login.html";
                            }, 3000)
                        } else {
                            alert("注册失败,请用户重新注册");
                        }
                    }
                })
            //})
        }
    }
})();