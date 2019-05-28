var sqlMap = {
    getUser: 'SELECT * FROM User',
    addUser: 'insert into User (username, password,address,money) values (?,?,?,?)',
    getAdmin:'SELECT * FROM admin where AdminName = ?',
    getOrderList: 'SELECT * FROM orderlist',
    addOrderList: 'insert into orderlist (username,address,productname,number,price,status,date,id) values (?,?,?,?,?,?,?,?)',
    addAdminLogin:'insert into adminlogin (AdminName,loginTime,Id) values (?,?,?)',
    getAdminLogin:'SELECT * FROM adminlogin',
    addAdminRest: 'insert into adminrest (AdminName,restTime,Id) values (?,?,?)',
    getAdminRest: 'SELECT * FROM adminrest',
    getOrderListZero: 'SELECT * FROM orderlist where status = 0 ',
    getOrderListOne: 'SELECT * FROM orderlist where status = 1 ',
    getOrderListTwo: 'SELECT * FROM orderlist where status = 2 ',
    updateOrderList: 'UPDATE orderlist set status = ? where id = ?',
    addCoupon: 'insert into coupon (couponID,couponDiscount,username) values (?,?,?)',
    getCoupon: 'SELECT * FROM coupon where username = ?',
    updateMoney: 'UPDATE User set money = ? where username = ?',
    getUserMoney: 'SELECT * FROM user where username = ?',
    // 'UPDATE Customer SET password = ? WHERE username = ?'
  }
  
  module.exports = sqlMap;