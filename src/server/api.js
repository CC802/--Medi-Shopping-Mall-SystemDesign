const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createConnection({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true // 多语句查询
});

pool.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret)
  }
};
module.exports = {
  getUser(req, res) {
    
    var sql = sqlMap.getUser;
    pool.query(sql, (err, result) => {
      jsonWrite(res, result)
      // pool.release();
    })
  },
  getAdmin(req,res)
  {
    console.log(req.query);
    var AdminName = req.query.AdminName
    var sql = sqlMap.getAdmin;
    pool.query(sql,[AdminName],(err,result)=>{
      jsonWrite(res, result)
    })
  },
  addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;
    var money = req.body.money;
    var sql = sqlMap.addUser; //sqlMap.js的操作数据库的方法
    pool.query(sql, [username,password,address,money], (err, result) => {
      jsonWrite(res, result)
      // pool.release();
    })
  },
  addOrderList(req, res) {
     console.log(req.body);
     var id = req.body.id;
    var username = req.body.username;
    var address = req.body.address;
    var productname = req.body.productName;
    var number = req.body.number;
    var price = req.body.price;
    var status = req.body.status;
    var date = req.body.date
    var sql = sqlMap.addOrderList;
    pool.query(sql, [username,address,productname,number,price,status,date,id], (err, result) => {
      jsonWrite(res, result);
    })
  },
  getOrderList(req,res){
    var sql = sqlMap.getOrderList;
      pool.query(sql, (err, result) => {
        jsonWrite(res, result);
      })
  },
  addAdminLogin(req, res) {
    var AdminName = req.body.adminName;
    var loginTime = req.body.time;
    var Id = req.body.adminId;
    var sql = sqlMap.addAdminLogin;
    pool.query(sql,[AdminName,loginTime,Id], (err, result) => {
      jsonWrite(res, result);
    })
  },
  getAdminLogin(req, res) {
    var sql = sqlMap.getAdminLogin;
    pool.query(sql, (err, result) => {
      jsonWrite(res, result);
    })
  },
   addAdminRest(req, res) {
     var AdminName = req.body.adminName;
     var restTime = req.body.time;
     var Id = req.body.adminId;
     var sql = sqlMap.addAdminRest;
     pool.query(sql, [AdminName, restTime, Id], (err, result) => {
       jsonWrite(res, result);
     })
   },
     getAdminRest(req, res) {
        var sql = sqlMap.getAdminRest;
        pool.query(sql, (err, result) => {
          jsonWrite(res, result);
        })
     },
     getOrderListZero(req,res)
     {
        var sql = sqlMap.getOrderListZero;
        console.log(1);
        pool.query(sql, (err, result) => {
          jsonWrite(res, result);
        })
     },
      getOrderListOne(req, res) {
        var sql = sqlMap.getOrderListOne;
        pool.query(sql,(err, result) => {
          jsonWrite(res, result);
        })
      },
       getOrderListTwo(req, res) {
         var sql = sqlMap.getOrderListTwo;
         pool.query(sql,(err, result) => {
           jsonWrite(res, result);
         })
       },
       updateOrderList(req,res)
       {
         var id = req.body.id;
         var status =  req.body.status;
         var sql = sqlMap.updateOrderList;
          pool.query(sql,[status,id],(err, result) => {
            jsonWrite(res, result);
          })
       },
        addCoupon(req, res)
        {
          var couponId = req.body.couponId;
          var username = req.body.username;
          var couponDiscount = req.body.couponDiscount
          var sql = sqlMap.addCoupon;
          pool.query(sql, [couponId,couponDiscount,username], (err, result) => {
            jsonWrite(res, result);
          })
        },
         getCoupon(req,res) 
         {
           var username = req.query.username
           var sql = sqlMap.getCoupon;
           pool.query(sql,[username],(err, result) => {
             jsonWrite(res, result);
           })
         },
         updateMoney(req, res)
         {
           var username = req.body.username;
           var money = req.body.money;
           var sql = sqlMap.updateMoney;
           pool.query(sql, [money,username], (err, result) => {
             jsonWrite(res, result);
           })
         },
         getUserMoney(req,res)
         {
           var username = req.query.username;
           var sql = sqlMap.getUserMoney
           pool.query(sql,[username],(err,result)=>{
               jsonWrite(res, result);
           })
         }
}