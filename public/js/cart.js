/**
 * Created by bjwsl-001 on 2017/5/24.
 */
(function(){
$(function(){//页面加载完成后要执行的事情
    $("#footer").load("data/footer.html",function() {
        //1、找到是哪个用户登录uid,如果没有用户登录的话，直接返回login.html如果有就传入该用户的uid去数据库查找
        var uid = sessionStorage["uid"];
        //var pid=sessionStorage["pid"];
        //console.log(uid,pid);
        if (uid == null) {
            location.href = "login.html";
        } else {
            //存放所有的小计td
            var list;
            //获取所有的CheckBox
            var checkboxList;
            $.ajax({
                type: "GET",
                url: "/addCart",
                data: {uid: uid},//,productId:pid
                success: function (result) {
                    //console.log(result);
                    //接下来就是拼接到DOM树上
                    var html = "";
                    for (var i = 0; i < result.length; i++) {
                        var obj = result[i];
                        html += `
                              <tr>
                                <td>
                                    <input type="checkbox" class="lf"  name="checkbox">
                                    <input type="hidden" value="1" />
                                    <div class="lf"><img src=${obj.pic} alt=""/></div>
                                </td>
                                <td><a href="">${obj.pname}</a></td>
                                <td>${obj.price}</td>
                                <td class="num">
                                    <button class="minus">-</button><input type="text" value=${obj.count}><button class="add">+</button>
                                </td>
                                <td><span>${obj.price * obj.count}</span></td>
                                <td><a href=${obj.id} class="delete">删除</a></td>
                             </tr>
                    `
                        //list=$("tbody td:nth-child(5)");
                        //console.log(list);
                    }
                    $("#cart tbody").html(html);
                    list = $("tbody td:nth-child(5)");
                    checkboxList = $("table input[type='checkbox']");
                    //先找到第一个type=checkbox全选按钮
                    $("#selAll").on("click", function () {
                        if (this.checked) {
                            $("input[name='checkbox']").each(function () {
                                this.checked = true
                            })
                        } else {
                            $("input[name='checkbox']").each(function () {
                                this.checked = false
                            });
                        }
                    });
                    //在找到name=checkbox的所有的按钮
                    $("input[name='checkbox']").click(function () {
                        //定义一个变量设置为true
                        var bool = true;
                        $("input[name='checkbox']").each(function () {
                            bool = this.checked && bool;
                        })
                        if (bool) {//如果每一项勾上了让全选也添加checked
                            selAll.checked = true;
                        } else {
                            selAll.checked = false;
                        }
                    })
                    //给所有的CheckBox添加单机事件   重新结算总价
                    checkboxList.click(function () {
                        var total = countTotal(list);
                        $("#cart_footer span").html(total);
                    });
                }
            })
        }
            //拼接到DOM树上之后找到删除行的那个a.
            $('tbody').on("click", ".delete", function (e) {
                e.preventDefault();//组织默认行为
                var cid = $(this).attr("href");
                //console.log(href);
                //异步请求
                var bool = confirm("您确认要删除" + cid + "吗");
                $(this).parent().parent().remove();//页面删除
                if (bool) {//数据库删除
                    $.ajax({
                        type: "DELETE",
                        url: "/delete/" + cid,
                        success: function (result) {
                            if (result == 1) {
                                alert("删除成功");
                            }
                        }
                    })
                }
            })


            //DOM树添加完成后找到每一个button进行加减的计算,对应的小计和总计也要有相应的改变，还有数据库的改变
            $("tbody").on("click", "button", function () {   //减法的计算
                var input;
                if ($(this).html() == "-") {
                    input = $(this).next();
                } else {
                    input = $(this).prev();
                }
                var num = input.val();
                //console.log(typeof num);
                num = parseInt(num);

                if ($(this).html() == "+") {
                    num++;
                    input.val(num);
                } else if (num > 1) {
                    num--;
                    input.val(num);
                }
                //获得单价
                var price = $(this).parent().prev().html();
                //console.log(typeof price);
                price = parseInt(price);
                $(this).parent().prev().html(price);
                //获得小计
                var sum = $(this).parent().next().children().html();
                //console.log(typeof sum);
                sum = parseInt(sum);
                sum = num * price;
                $(this).parent().next().children().html(sum);
                var total = countTotal(list);
                $("#cart_footer span").html(total);
            })

            function countTotal(list) {
                var total = 0;
                for (var i = 0; i < list.length; i++) {//找到小计对应的那个选项，如果勾选了就计算，否则就不计算
                    var checkbox = $(list[i].parentNode).find("[type='checkbox']")[0];
                    if (checkbox.checked) {
                        total += parseInt(list[i].innerText);
                    }
                }
                return total;
            }
    });
})
})();