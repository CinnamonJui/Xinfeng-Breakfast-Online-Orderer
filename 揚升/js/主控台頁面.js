var title = ["菜單管理頁面", "使用者數據頁面", "訂單管理頁面"];
var menu, order, user, confirm;
var start_time, end_time;
var type = -1;

function start() {
    ShowTime();
    initTime();
    confirm = document.getElementById("confirm");
    menu = document.getElementById("menu");
    order = document.getElementById("order");
    user = document.getElementById("user");
    confirm.addEventListener("click", set_time, false);
    menu.addEventListener("click", function() { click_button(0); }, false);
    order.addEventListener("click", function() { click_button(1); }, false);
    user.addEventListener("click", function() { click_button(2); }, false);
}

function initTime() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getTime.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("getTime=1");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let newTime = JSON.parse(xhr.response);
            $("#start_time").val(newTime['openTime']);
            $("#end_time").val(newTime['closeTime']);
        }
    }
}

function set_time() {
    start_time = document.getElementById("start_time").value;
    end_time = document.getElementById("end_time").value;
    console.log(start_time, end_time);
    let send_data = "startTime=" + start_time +
        "&endTime=" + end_time;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getTime.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.response) {
                console.log("set time success");
            } else {
                console.log("set time fail");
            }
        }
    }
}

function click_button(type) {
    let iframe;
    iframe = document.getElementById("iframe");
    iframe.src = title[type] + ".html";
}

function ShowTime() {
    var dt = new Date();
    document.getElementById("time").innerHTML = "&emsp;" + dt.toLocaleString() + "&emsp;";
    setTimeout("ShowTime()", 100);
}

window.addEventListener("load", start, false);