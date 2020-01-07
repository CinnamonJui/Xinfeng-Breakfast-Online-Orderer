var priceSum = 0;
function createTable(){
    /*var carts = localStorage.getItem("cart");
    carts = JSON.parse(cart); */
    //console.log(cart);
    var carts = {"安安套餐": "5, 120"   
                ,"早安套餐": "3, 400"}
    var cart = JSON.stringify(carts)
    localStorage.setItem("cart",cart)
    var forTable = document.querySelector( ".carts tbody" );
    //var carts = JSON.parse(localStorage.getItem('cart'));
    console.log(carts);
    console.log(typeof(carts));
    for(var val in carts){
        var price = carts[val].split(',')[1];
        var amount= carts[val].split(',')[0];
        console.log(carts[val]);
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
            "<td class = value colspan='3'><input type=time id='finish_Time'></td>"+
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
    var carts = JSON.parse(localStorage.getItem('cart'));
    var i=r.parentNode.parentNode.rowIndex;
    var temp = document.getElementById("tbody1");
    let del=r.parentNode.parentNode.childNodes[0].textContent;
    for(let i in carts){
        //console.log(i,carts[i]);
        if(i==del){
            delete(carts[i]);
            localStorage.setItem('cart', JSON.stringify(carts));
        }
            

    }
    //console.log(carts);
    priceSum -= parseInt(temp.rows[i-1].cells[1].innerHTML);
    temp.deleteRow(i-1);
    updateTfoot();
    //console.log(priceSum);
}

function makeOrder(){
    var item =localStorage.getItem('cart');
    var finish=document.getElementById("finish_Time").value;

    let xhr = new XMLHttpRequest();
    let send_data;
    xhr.open("POST", "./php/makeOrders.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log(item);
    console.log(finish);
    send_data ='item_list='+item +'&finishTime=' + finish;
    console.log(send_data);
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            if(xhr.response==0){
                alert("預定時間不在營業時間喔~<3")
            }
            else{
                localStorage.setItem("orderId",xhr.response);
                location.href='./顧客訂單頁面.html';    
            }

        }
    }
}