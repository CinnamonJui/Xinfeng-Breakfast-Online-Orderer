

var data = [];
var thead_name = ["狀態", "編號", "金額", "訂單時間", "預定時間", "姓名", "帳戶", "品項明細"];
var table_width = [8, 11, 5, 7, 7, 10, 11, 40];
var state_name = [
    ["未確認", "準備中", "已完成", "已結帳", "婉拒"],
    ["unconfirm", "prepared", "done", "finished", "rejected"]
];
var thead, tbody;
var mainmenu;
var even = 0;
var tdata;
var order_history;
var time;

function start() {
    window.clearInterval(time);
    time = window.setInterval("checkRefresh();", 10000);
    thead = document.getElementById("thead");
    buildthead();
    tbody = document.getElementById("tbody");
    document.getElementById("refresh").addEventListener("click", checkRefresh, false);
    order_history = document.getElementById("order_history");
    order_history.addEventListener("click", function() {
        getHistory(1);
    }, false);
    getHistory();
}
function checkRefresh(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "BgetOrders.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("checkNew=1");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            if(xhr.response==1){
                getHistory();
                console.log("success");
            }else{
                console.log("error");
            }
                
        }
    }
}

function getString() {
    let str = document.getElementById("string").value;
    let type = document.getElementById("type").value;
    console.log(str);
    console.log(type);
}


function buildthead() {
    thead.setAttribute("style", "text-align:center;");
    let row = document.createElement("tr");
    //row.setAttribute("style", "line-height:30px;");
    row.setAttribute("height", "30");
    for (let i in thead_name) {
        let col = document.createElement("td");
        col.setAttribute("width", table_width[i] + "%");
        col.textContent = thead_name[i];
        row.appendChild(col);
    }
    thead.appendChild(row);
}

function getHistory(check = 0, order_status = null, order_ID = null) {
    console.log(order_status, order_ID);
    let xhr = new XMLHttpRequest();
    let send_data;
    xhr.open("POST", "BgetOrders.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (check == 1) {
        send_data = "order_history=" + order_history.value;
        if (order_history.value == "歷史訂單") {
            order_history.value = "現時訂單";
        } else {
            order_history.value = "歷史訂單";
        }
    } else {
        if (order_history.value == "歷史訂單") {
            send_data = "order_history=現時訂單";
        } else {
            send_data = "order_history=歷史訂單";
        }
        if (order_ID != null && order_ID != null)
            send_data += "&order_status=" + order_status +
            "&order_ID=" + order_ID;
    }
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let importData = JSON.parse(xhr.response);
            console.log(importData);
            buildtbody(importData);
        }
    }
}

function changeState(ev) {
    if (ev.target.tagName.toLowerCase() == "span") {
        if (ev.target.nextSibling) {
            ev.target.parentNode.removeChild(ev.target.nextSibling);
            return;
        }
        let parent = ev.target.parentNode.parentNode;
        let ul = document.createElement("ul");
        for (let i = 0; i < state_name[0].length; i++) {
            let li = document.createElement("li");
            if (parent.className != state_name[1][i]) {
                li.setAttribute("class", "state");
                li.addEventListener("click", changeState, false);
                li.setAttribute("value", state_name[1][i])
                li.textContent = state_name[0][i];
                ul.appendChild(li);
            }

        }
        ev.target.parentNode.appendChild(ul);
    } else {
        let parent = ev.target.parentNode.parentNode;
        /* parent.parentNode.setAttribute("class", ev.target.getAttribute("value"));
         parent.firstChild.textContent = "[" + ev.target.textContent + "]";*/

        getHistory(0, ev.target.textContent, parent.parentNode.getAttribute("id"));
        location.reload();
        parent.removeChild(ev.target.parentNode);
        return;
    }
    //parent.setAttribute("class", "rejected");
    // console.log(parent.className);
}

function buildtbody(tdata) {
    tbody.innerHTML = "";
    tbody.setAttribute("style", "text-align:center;");
    for (let i in tdata) {
        let row = document.createElement("tr");
        for (let j in state_name[0])
            if (tdata[i]['status'] == state_name[0][j])
                row.setAttribute("class", state_name[1][j]);
        for (let j in tdata[i]) {
            let col = document.createElement("td");
            if (j == 0) {
                let state = document.createElement("span");
                state.setAttribute("class", "state");
                state.addEventListener("click", changeState, false);
                state.innerHTML = "[" + tdata[i][j] + "]";
                col.appendChild(state);
            } else if (j == tdata[i].length - 1) {
                col.setAttribute("align", "left");
                col.innerHTML = "&nbsp;" + tdata[i][j];
            } else
                col.textContent = tdata[i][j];
            row.appendChild(col);
        }
        row.setAttribute("height", "25");
        row.setAttribute("id", tdata[i]['ID']);
        tbody.appendChild(row);
    }
}
window.addEventListener("load", start, false);