(function(){
$("#btn").on("click",function(){
    var n=$("#uname").val();
    var p=$("#upwd").val();
    //客户端发起ajax请求
    $.ajax({
        type:"GET",
        url:"/mylogin",
        data:{uname:n,upwd:p},
        success:function(result){
            console.log(result);//返回的是一个对象Object {code: 1, msg: "登录成功", uid: 3}
            if(result.code===1){
                //保存uid
                sessionStorage["loginName"]=n;
                sessionStorage["uid"]=result.uid;
                location.href="index.html";
            }else{
                alert("登录失败，请重新登录");
            }
        }
    })
})
document.onkeydown=function(){//方法一
    var e=window.event||arguments[0];
    //alert(e.keyCode);//打桩！
    //接下来判断
    if(e.keyCode==13){
        console.log(1)
        $("#btn").click();
        console.log(2)
    }
}
})();