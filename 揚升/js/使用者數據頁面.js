var data = [];
var thead_name = [
    ["使用者名稱", "姓名", "年齡", "性別", "電子信箱", "總消費"],
    ["userName", "name", "age", "gender", "eMail", "totalCost"]
];
var table_width = [15, 15, 10, 10, 40, 10];
var thead, tbody;
var mainmenu;
var even = 0;

function start() {
    importdata();
    search = document.getElementById("search");
    search.addEventListener("click", getString, false);
    thead = document.getElementById("thead");
    buildthead();
    tbody = document.getElementById("tbody");
    $("input").keydown(function(event) {
        if (event.which == 13) {
            getString();
        }
    });
}

function getString() {
    let str = document.getElementById("string").value;
    let type = document.getElementById("type").value;
    $("tbody").fadeOut("fast", function() {
        importdata(str, type);
    });
}


function buildthead() {
    thead.setAttribute("style", "text-align:center;");
    let row = document.createElement("tr");
    //row.setAttribute("style", "line-height:30px;");
    row.setAttribute("height", "30");
    for (let i in thead_name[0]) {
        let col = document.createElement("td");
        col.setAttribute("width", table_width[i] + "%");
        col.setAttribute("id", thead_name[1][i]);
        col.textContent = thead_name[0][i];
        row.appendChild(col);
    }
    thead.appendChild(row);
}

function importdata(str = null, type = null) {
    let send_data;
    if (str && type) {
        send_data = "find_str=" + str + "&find_type=" + type;
    } else
        send_data = null;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getAccount.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let importData;
            if (xhr.response == "get data fail") {
                window.alert("查無此筆資料");
                importdata();
            } else {
                importData = JSON.parse(xhr.response);
                console.log(importData);
                /*for (let i in importData) {
                    importData[i].splice('password', 1);
                }*/
            }

            buildtbody(importData);
            $("tbody").fadeIn();
        }
    }
}

function buildtbody(tdata) {
    even = 0;
    tbody.innerHTML = "";
    tbody.setAttribute("style", "text-align:center;");
    for (let i in tdata) {
        let row = document.createElement("tr");
        row.setAttribute("height", "25");
        if (!even) {
            row.setAttribute("class", "odd");
            even = 1;
        } else {
            row.setAttribute("class", "even");
            even = 0;
        }

        for (let j in tdata[i]) {
            let col = document.createElement("td");
            col.textContent = tdata[i][j];
            row.appendChild(col);
            if (j == 4) {
                col.setAttribute("align", "left");
                col.innerHTML = "&ensp;" + tdata[i][j];
            } else
                col.textContent = tdata[i][j];
        }
        tbody.appendChild(row);
    }
}

window.addEventListener("load", start, false);