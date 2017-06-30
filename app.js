/**
 * Created by bjwsl-001 on 2017/5/19.
 */
const http=require("http");
const express=require("express");
const mysql=require("mysql");
const qs=require("querystring");
var app=express();
var server=http.createServer(app).listen(8080);
var pool=mysql.createPool({
    user:"root",
    database:"xiaomi",
    connectionLimit:10
});
//向客户端提供静态响应
    app.use(express.static("public"));
//向客户端提供动态响应
    app.post("/myregister",(req,res)=>{
         req.on("data",(buf)=>{
             var obj=qs.parse(buf.toString());
             //console.log(obj);
             pool.getConnection((err,conn)=>{
                 conn.query("insert into t_login values(null,?,?)",[obj.uname,obj.upwd],(err,result)=>{
                     if(err){
                         console.log("sql语句执行失败");
                     }else{
                         //console.log(result);
                        if(result!=null) {
                            var msg = {
                                code: 1,
                                msg: "注册成功",
                                insertId: result.insertId
                            }
                            res.json(msg);
                        }else{
                            var msg = {
                                code: 2,
                                msg: "注册失败,请重新注册"
                            }
                            res.json(msg);
                        }
                         conn.release();
                     }
                 })
             })
         });
     })

      app.get("/mylogin",(req,res)=>{
          console.log(req.query);
          pool.getConnection((err,conn)=>{
              conn.query("select *from t_login where uname=? and upwd=?",[req.query.uname,req.query.upwd],(err,result)=>{
                  //res.setHeader("Content-Type","application/json;charset=utf-8");
                  if(err){
                      console.log("sql语句执行失败");
                  }else{
                      //console.log(result);
                      if(result.length>0) {
                          var msg = {
                              code: 1,
                              msg: "登录成功",
                              uid:result[0].uid
                          }
                          res.json(msg);
                      }else{
                          var msg = {
                              code: 2,
                              msg: "登录失败,请重新登录"
                          }
                          res.json(msg);
                      }
                      conn.release();
                  }
              })
          })
      })

        app.get("/search",(req,res)=>{
            //console.log(req.query);
            var obj=req.query;
            //console.log(obj.key);
            //去连接数据库
            pool.getConnection((err,conn)=>{
                conn.query(`select *from xiaomi_product where pname like ?`,["%"+obj.key+"%"],function(err,result){
                    //console.log(err);
                    //console.log(result);
                    res.json(result);
                    conn.release();
                })
            })
        })

        app.post("/cart",(req,res)=>{
            req.on('data', (buf)=>{
                var obj = qs.parse(buf.toString());
                //console.log(obj.uid);//   { uid: '3', productId: '1' }
                //查询数据库
                pool.getConnection((err,conn)=>{
                  conn.query("select *from xiaomi_cart where uid=? and productId=?",[obj.uid,obj.productId],(err,result)=>{
                      //console.log(result);
                      if(err){
                         console.log("sql语句执行错误");
                      }else if(result.length==0){
                          //console.log(result);//[]
                         //判断如果结果没有找到的话就在表中添加一条记录
                            conn.query("insert into xiaomi_cart values(null,?,?,1)",[obj.uid,obj.productId]);
                              var msg={
                                  code:"1",
                                  msg:"添加成功!"
                              }
                              res.json(msg);
                              conn.release();
                      }else{
                          var count=1;//如果查到之前有购买过，就更新count的数量;
                          conn.query("update xiaomi_cart set count=count+1 where uid=? and productId=?",[obj.uid,obj.productId]);
                                var msg={
                                    code:2,
                                    msg:"添加成功!",
                                    count:result[0].count+count
                                }
                              res.json(msg);
                              conn.release();
                      }
                  })
                })
        })
        });

        app.get("/addCart",(req,res)=>{
            //console.log(req.query);
            var obj=req.query;
            console.log(obj);
            pool.getConnection((err,conn)=>{ //多表查询
                conn.query("select p.pic,p.pname,p.price,c.count,c.id from xiaomi_product p,xiaomi_cart c where c.uid=? and c.productId=p.pid",[obj.uid],(err,result)=>{
                    //console.log(result);
                    res.json(result);
                })
            })
        })
        app.delete("/delete/:bid",(req,res)=>{
            //console.log(req.params);{bid:3};
            var obj=req.params;
            pool.getConnection((err,conn)=>{
                conn.query("delete from xiaomi_cart where id=?",[obj.bid],(err,result)=>{
                    console.log(result);
                    res.json(result.affectedRows);
                    conn.release();
                })
            })
        })

        app.get("/selectCount",(req,res)=>{
            var obj=req.query;
            pool.getConnection((err,conn)=>{
                conn.query("select count from xiaomi_cart where uid=?",[obj.uid],(err,result)=>{
                    //遍历result中所有的count然后相加
                    var sum=0;
                    for(var i=0;i<result.length;i++){
                        var obj=result[i];
                        sum+=obj.count;
                    }
                    //console.log(sum);
                    var count={
                        count:sum
                    }
                    res.json(count);
                    conn.release();
                })
            })
        })