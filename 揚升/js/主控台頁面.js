var title = ["菜單管理頁面", "使用者數據頁面", "訂單管理頁面"];
var menu, order, user, confirm;
var start_time, end_time;
var type = -1;

function start() {
    ShowTime();
    confirm = document.getElementById("confirm");
    menu = document.getElementById("menu");
    order = document.getElementById("order");
    user = document.getElementById("user");
    confirm.addEventListener("click", set_time, false);
    menu.addEventListener("click", function() { click_button(0); }, false);
    order.addEventListener("click", function() { click_button(1); }, false);
    user.addEventListener("click", function() { click_button(2); }, false);
}

function set_time() {
    start_time = document.getElementById("start_time").value;
    end_time = document.getElementById("end_time").value;
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