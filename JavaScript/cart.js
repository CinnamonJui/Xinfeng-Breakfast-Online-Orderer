var priceSum = 0;
function createTable(){
    /*var carts = localStorage.getItem("cart");
    carts = JSON.parse(cart); */
    //console.log(cart); 
    var forTable = document.querySelector( ".carts tbody" );
    var carts = {
        "雞腿便當" : "2,100",
        "炸蜘蛛" : "1,50"
    }
    for(var val in carts){
        var price = carts[val].split(",")[1];
        var amount= carts[val].split(",")[0];
        priceSum+= parseInt(price);
        forTable.innerHTML += 
           "<tr>" +
                "<td>" + val + "</td>" +
                "<td class = price>" + price + "</td>" +
                "<td class = amount>"+ amount + "</td>" +
                "<td class = delete>"+
                    "<button onclick=deleteRow(this)>刪除</button>"
                "</td>"+
            "</tr>";
        //console.log(val + ":" + carts[val]);
    }
    console.log(priceSum);
    updateTfoot();
    /*forTable.innerHTML +=
        "<tr>"+
            "<td class = title>總計</td>"+
            "<td class = totalPrice colspan='3'>"+priceSum+"</td>"+
        "</tr>";*/
}
function updateTfoot(){
    var forTable = document.querySelector( ".carts tfoot" );
    forTable.innerHTML =
        "<tr>"+
            "<td class = title>總計</td>"+
            "<td class = totalPrice colspan='3'>"+priceSum+"</td>"+
        "</tr>"+
        "<tr>"+
            "<td class = title>預定時間</td>"+
            "<td class = value colspan='3'><input type=time></td>"+
        "</tr>";

}
function ShowTime(){
       var NowDate = new Date();
       var d = NowDate.getDay();
       var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
       document.getElementById('showbox').innerHTML =NowDate.toLocaleString() + '（' + dayNames[d] + '）';
       setTimeout('ShowTime()', 1000);
   }

function deleteRow(r){
    var i=r.parentNode.parentNode.rowIndex;
    var temp = document.getElementById("tbody1");
    priceSum -= parseInt(temp.rows[i-1].cells[1].innerHTML);
    temp.deleteRow(i-1);
    updateTfoot();
    console.log(priceSum);
}
