function ShowTime(){
    var NowDate = new Date();
    var d = NowDate.getDay();
    var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    document.getElementById('showbox').innerHTML =NowDate.toLocaleString() + '（' + dayNames[d] + '）';
    setTimeout('ShowTime()', 1000);
}

function createTable(status,ID,price,FnsTime,items){
    console.log(status,ID,price,FnsTime,items);
    var forTable = document.querySelector( ".order tbody" );
        forTable.innerHTML += 
        "<tr>"+
        "<th class=title>編號</th>"+
        "<th class=value >"+ ID +"</th>"+
        "</tr>"+
        "<tr>"+
        "<th class=title>總計</th>"+
        "<th class=value>"+ price +"</th>"+
        "</tr>"+
        "<tr>"+
        "<th class=title>狀態</th>"+
        "<th class=value id=status>"+ status +"</th>"+
        "</tr>"+
        "<tr>"+
        "<th class=title>預定</th>"+
        "<th class=value >"+ FnsTime +"</th>"+
        "</tr>";

    var fortextarea = document.querySelector( ".textarea_item " );
    fortextarea.innerHTML ='';
    var item = JSON.parse(items);
    console.log(item);
    for(var val in item){
        var price = item[val].split(',')[1];
        var amount= item[val].split(',')[0];
        fortextarea.innerHTML += "NT$" + price +" -"+ val + " *"+ amount +"\n";
    }
}
function updateStatus(status){
    var forStatus = document.querySelector( ".status" );
    if(forStatus.innerHTML!=status)
        forStatus.innerHTML=status;
}

function getOrder(check = 0){
    var orderId = localStorage.getItem("orderId");
    console.log(orderId);
    let xhr = new XMLHttpRequest();
    let send_data;
    xhr.open("POST", "./php/getOrder.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(check==0){
        send_data ='orderId='+orderId+'&check=0';
        xhr.send(send_data);
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            let importData = JSON.parse(xhr.response);
            console.log(importData);
            createTable(importData['status'],importData['ID'],importData['price'],importData['FnsTime'],importData['items']);

        }
    }
    }
    else{
        send_data ='orderId='+orderId+'&check=1';
        xhr.send(send_data);
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            updateStatus(status);

        }
    }
    }
    
}
