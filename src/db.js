var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "woo1471dy",
  database: "TFL"
});

function getData() {
  con.connect(function(err) {
    if (err) throw err;
    let sql =
      'SELECT HOUR(date) as hour, reg_bays, ROUND(AVG(occ_reg_bays)) as occ_reg_bays, dis_bays, ROUND(AVG(occ_dis_bays)) as occ_dis_bays from Barkingside_Stn WHERE WEEKDAY(date)="2" GROUP BY HOUR(date) ORDER BY date ASC;';

    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      return result;
    });
  });
}

export default getData();
