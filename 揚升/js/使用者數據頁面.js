var data = [];
var thead_name = [
    ["使用者名稱", "姓名", "年齡", "性別", "電子信箱", "總消費"],
    ["user_ID", "name", "age", "gender", "email", "total"]
];
var table_width = [15, 15, 10, 10, 40, 10];
var tbody;
var mainmenu;
var even = 0;
var upDown = "ASC";

function start() {
    importdata();
    search = document.getElementById("search");
    search.addEventListener("click", getString, false);
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
    $("thead").css("text-align", "center");
    $("thead").css("cursor", "pointer");
    let row = document.createElement("tr");
    row.setAttribute("id", "thead");
    //row.setAttribute("style", "line-height:30px;");
    row.setAttribute("height", "30");
    for (let i in thead_name[0]) {
        let col = document.createElement("td");
        col.setAttribute("width", table_width[i] + "%");
        col.setAttribute("id", thead_name[1][i]);
        col.textContent = thead_name[0][i];
        row.appendChild(col);
    }
    $("thead").append(row);
    $("thead td").click(function() {
        upDown = "ASC";
        if ($("#sort")) {
            if ($("#sort").parent("td").attr("id") == $(this).attr("id")) {
                if ($("#sort").html() == "△") {
                    $("#sort").html("▽");
                    upDown = "DESC";
                } else
                    $("#sort").html("△");
            } else {
                $("#sort").remove();
                $(this).append("<span id='sort'>△</span>");
            }
        } else
            $(this).append("<span id='sort'>△</span>");
        $("tbody").fadeOut("fast", function() {
            console.log(upDown);
            importdata(null, null, $("#sort").parent().attr("id"));
        });

    });
}

function importdata(str = null, type = null, par = "user_ID") {
    let send_data = "";
    if (str && type) {
        send_data = "find_str=" + str + "&find_type=" + type;
    } else //▽△
        send_data += "par=" + par + "&sort=" + upDown;
    console.log(send_data);
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