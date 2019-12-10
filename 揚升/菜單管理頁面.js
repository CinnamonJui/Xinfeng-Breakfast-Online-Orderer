var item_type, item_name, item_price, item_picture, item_info;
var item_upload, item_upload_src;
var combo_type, combo_name, combo_price, combo_picture, combo_info;
var combo_upload, combo_upload_src;
var item_width = [10, 20, 30, 15, 15, 10];
var combo_width = [50, 15, 20, 15];
var combo_item_width = [25, 60, 15];
var item_ex = [
    ["三明治", "牛肉三明治", "35", "pic/1.jpg", "好ㄘ"],
    ["三明治", "鮪魚三明治", "35", "pic/2.jpg", "豪好ㄘ"],
    ["飲料", "奶茶", "20", "pic/3.jpg", "好喝"],
    ["飲料", "紅茶", "20", "pic/4.jpg", "不錯喝"],
    ["點心", "薯條", "30", "pic/5.jpg", "有點好ㄘ"],
    ["點心", "抓餅", "35", "pic/6.jpg", "這是點心嗎0.0"]
];
var combo_ex = [
    ["薯條套餐", "45", "pic/1.jpg", "薯條、紅茶", "好ㄘ"],
    ["鮪魚三明治套餐", "50", "pic/2.jpg", "鮪魚三明治、紅茶", "豪好ㄘ"],
    ["豪華鮪魚三明治套餐", "80", "pic/3.jpg", "薯條、鮪魚三明治、奶茶", "超級好ㄘ"],
    ["好多飲料套餐", "30", "pic/4.jpg", "奶茶、紅茶", "豪好喝"],
    ["沒有比較便宜套餐", "60", "pic/5.jpg", "牛肉三明治、紅茶", "好貴"],
    ["寫程式好累套餐", "45", "pic/6.jpg", "薯條、奶茶", "好累喔"],
    ["都是點心套餐", "60", "pic/2.jpg", "薯條、抓餅", "會胖"]
];
var item_type_name = [
    ["三明治", "飲料", "點心"],
    ["sandwich", "drink", "dessert"]
];
var item_length = 6,
    combo_length = 4;
var itemBody, comboBody;
var even = 0;

function itemUploadFile(ev) {
    console.log(ev.target.files, ev.target.files[0]);
    item_upload_src = item_upload.value;
    let pic_src = item_upload_src;
    pic_src = pic_src.split("\\");
    item_picture.value = pic_src[pic_src.length - 1];
}

function comboUploadFile(ev) {
    combo_upload_src = combo_upload.value;
    let pic_src = combo_upload_src;
    pic_src = pic_src.split("\\");
    combo_picture.value = pic_src[pic_src.length - 1];
}

function start() {
    itemInit();
    comboInit();
}

function itemInit() {
    item_type = document.getElementById("item_type");
    item_name = document.getElementById("item_name");
    item_picture = document.getElementById("item_picture");
    item_price = document.getElementById("item_price");
    item_info = document.getElementById("item_info");
    item_upload = document.getElementById("item_upload");
    item_upload.addEventListener("change", itemUploadFile, false);
    document.getElementById("item_add").addEventListener("click", item_add, false);
    itemBody = document.getElementById("item_tbody");
    buildItemHead(document.getElementById("thead"));
    buildItemHead(item_type);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getMenu.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("check=item");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log(xhr.response);
            let importData = JSON.parse(xhr.response);
            console.log(importData);
            buildItemBody(importData);
        }
    }
    //buildItemBody(item_ex);
}

function comboInit() {
    combo_name = document.getElementById("combo_name");
    combo_picture = document.getElementById("combo_picture");
    combo_price = document.getElementById("combo_price");
    combo_info = document.getElementById("combo_info");
    combo_upload = document.getElementById("combo_upload");
    combo_upload.addEventListener("change", comboUploadFile, false);
    document.getElementById("combo_add").addEventListener("click", combo_add, false);
    comboBody = document.getElementById("combo_tbody");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getMenu.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("check=combo");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log(xhr.response);
            let importData = JSON.parse(xhr.response);
            console.log(importData);
            buildComboBody(importData);
        }
    }
    //buildComboBody(combo_ex);
}

function buildItemBody(tdata) {
    itemBody.innerHTML = "";
    for (let i in tdata) {
        let row = document.createElement("tr");
        for (let j in item_type_name[0])
            if (tdata[i][0] == item_type_name[0][j])
                row.setAttribute("class", item_type_name[1][j]);
        for (let j = 0; j < item_length; j++) {
            let col = document.createElement("td");
            switch (j) {
                case 0: //新增到combo
                    let add = document.createElement("span");
                    add.setAttribute("class", "clickable");
                    add.addEventListener("click", addToCombo, false);
                    add.innerHTML = "[+]";
                    col.appendChild(add);
                    break;
                case item_length - 2: //編輯
                    let edit = document.createElement("span");
                    edit.setAttribute("class", "clickable");
                    edit.addEventListener("click", itemEdit, false);
                    edit.innerHTML = "[編輯]";
                    col.appendChild(edit);
                    break;
                case item_length - 1: //刪除
                    let remove = document.createElement("span");
                    remove.setAttribute("class", "clickable");
                    remove.addEventListener("click", itemRemove, false);
                    remove.innerHTML = "[X]";
                    col.appendChild(remove);
                    break;
                default:
                    col.textContent = tdata[i][j - 1];
                    break;
            }
            col.setAttribute("width", item_width[j] + "%");
            row.appendChild(col);
        }
        row.setAttribute("width", "100%");
        row.setAttribute("height", "25");
        row.setAttribute("id", tdata[i][1]);
        itemBody.appendChild(row);
    }
}

function buildComboBody(tdata) {
    comboBody.innerHTML = "";
    for (let i in tdata) {
        let row = document.createElement("tr");
        if (!even) {
            row.setAttribute("class", "odd");
            even = 1;
        } else {
            row.setAttribute("class", "even");
            even = 0;
        }
        for (let j = 0; j < combo_length; j++) {
            let col = document.createElement("td");
            switch (j) {
                case combo_length - 2: //編輯
                    let edit = document.createElement("span");
                    edit.setAttribute("class", "clickable");
                    edit.addEventListener("click", comboEdit, false);
                    edit.innerHTML = "[編輯]";
                    col.appendChild(edit);
                    break;
                case combo_length - 1: //刪除
                    let remove = document.createElement("span");
                    remove.setAttribute("class", "clickable");
                    remove.addEventListener("click", comboRemove, false);
                    remove.innerHTML = "[X]";
                    col.appendChild(remove);
                    break;
                default:
                    col.textContent = tdata[i][j];
                    break;
            }
            col.setAttribute("width", combo_width[j] + "%");
            row.appendChild(col);
        }
        row.setAttribute("width", "100%");
        row.setAttribute("height", "25");
        row.setAttribute("id", tdata[i][0]);
        row.addEventListener("click", printComboItems, false);
        comboBody.appendChild(row);
    }
}

function addToCombo(ev) {
    let parent;
    //if (ev.target.tagName.toLowerCase() == "tr")
    if (!ev.target)
        parent = ev;
    else
        parent = ev.target.parentNode.parentNode;
    let row = document.createElement("tr");
    row.setAttribute("class", parent.className);
    for (let i = 0; i < 3; i++) {
        let col = document.createElement("td");
        switch (i) {
            case 0:
                for (let j in item_type_name[0])
                    if (parent.className == item_type_name[1][j])
                        col.textContent = item_type_name[0][j];
                break;
            case 1:
                col.textContent = parent.id;
                break;
            case 2: //刪除
                let remove = document.createElement("span");
                remove.setAttribute("class", "clickable");
                remove.addEventListener("click", comboItemsRemove, false);
                remove.innerHTML = "[X]";
                col.appendChild(remove);
                break;
        }
        col.setAttribute("width", combo_item_width[i] + "%");
        row.appendChild(col);
    }
    row.setAttribute("width", "100%");
    row.setAttribute("height", "25");
    row.setAttribute("id", parent.id);
    combo_items.appendChild(row);
}

function item_add() {
    if (!item_price.value || !item_name.value || !item_upload_src || !item_info.value) {
        window.alert("資料填寫不完全");
        return;
    }

    let ito = item_type.getElementsByTagName("option");
    let it;
    for (let i in item_type_name[0])
        if (item_type_name[1][i] == item_type.value)
            it = item_type_name[0][i];
    let arr = [it, item_name.value, item_price.value, item_upload_src, item_info.value];
    let send_data="add_check=item"+
    "&ID="+arr[1]+
    "&type="+arr[0]+
    "&price="+arr[2]+
    "&picture="+arr[3]+
    "&info="+arr[4];
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getMenu.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            if(xhr.response)
                console.log("success");
            else
                console.log("error");
        }
    }
/*
    console.log(arr);
    item_ex.push(arr);
    console.log(item_ex);*/
    ito[0].selected = true;
    item_name.value = "";
    item_price.value = "";
    item_picture.value = "";
    item_upload_src = "";
    item_info.value = "";
    //buildItemBody(item_ex);
}

function combo_add() {
    if (!combo_price.value || !combo_name.value || !combo_upload_src || !combo_info.value || !combo_items.innerHTML) {
        window.alert("資料填寫不完全");
        return;
    }
    even = 0;
    let ci_contents = combo_items.getElementsByTagName("tr");
    let combo_items_value = [];
    for (let i = 0; i < ci_contents.length; i++)
        combo_items_value[i] = ci_contents[i].id;
    combo_items_value = combo_items_value.join("、");
    let arr = [combo_name.value, combo_price.value, combo_upload_src, combo_items_value, combo_info.value];
    let send_data="add_check=combo"+
    "&ID="+arr[0]+
    "&price="+arr[1]+
    "&picture="+arr[2]+
    "&items="+arr[3]+
    "&info="+arr[4];
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getMenu.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            if(xhr.response)
                console.log("success");
            else
                console.log("error");
        }
    }
    //combo_ex.push(arr);
    combo_name.value = "";
    combo_price.value = "";
    combo_picture.value = "";
    combo_upload_src = "";
    combo_items.innerHTML = "";
    combo_items_value = "";
    combo_info.value = "";
    //buildComboBody(combo_ex);
}
function delete_data(item_combo,del_id){
    console.log(item_combo,del_id);
    let send_data;
    send_data="del_check="+item_combo+
    "&ID="+del_id;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "getMenu.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(send_data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            if(xhr.response)
                console.log("success");
            else
                console.log("error");
        }
    }
}
function itemEdit(ev) {
    if (item_price.value || item_name.value || item_upload_src || item_info.value) {
        if (!window.confirm("資料欄位中有值，確定覆蓋?"))
            return;
    }
    let parent = ev.target.parentNode.parentNode;
    delete_data("item",parent.id);
    for (let i in item_ex) {
        if (item_ex[i][1] == parent.id) {
            for (let j in item_type_name[0])
                if (item_type_name[0][j] == item_ex[i][0])
                    item_type.value = item_type_name[1][j];
            item_name.value = item_ex[i][1];
            item_price.value = item_ex[i][2];
            item_upload_src = item_ex[i][3];
            let pic_src = item_upload_src;
            console.log(item_upload_src);
            pic_src = pic_src.split("\\");
            item_picture.value = pic_src[pic_src.length - 1];
            item_info.value = item_ex[i][4];
            item_ex.splice(i, 1);
            break;
        }
    }
    parent.parentNode.removeChild(parent);
}

function comboEdit(ev) {
    if (combo_price.value || combo_name.value || combo_upload_src || combo_info.value) {
        if (!window.confirm("資料欄位中有值，確定覆蓋?"))
            return;
    }
    even = 0;
    let parent = ev.target.parentNode.parentNode;
    delete_data("combo",parent.id);
    for (let i in combo_ex) {
        if (combo_ex[i][0] == parent.id) {
            combo_name.value = combo_ex[i][0];
            combo_price.value = combo_ex[i][1];
            combo_upload_src = combo_ex[i][2];
            let ci_contents = combo_ex[i][3];
            ci_contents = ci_contents.split("、");
            let items = itemBody.getElementsByTagName("tr");
            for (let j in ci_contents)
                for (let k in items)
                    if (ci_contents[j] == items[k].id)
                        addToCombo(items[k]);
            let pic_src = combo_upload_src;
            pic_src = pic_src.split("\\");
            combo_picture.value = pic_src[pic_src.length - 1];
            combo_info.value = combo_ex[i][4];
            combo_ex.splice(i, 1);
            break;
        }
    }
    buildComboBody(combo_ex);
}

function itemRemove(ev) {
    if (!window.confirm("確定要刪除此餐點嗎?"))
        return;
    let parent = ev.target.parentNode.parentNode;
    parent.parentNode.removeChild(parent);
    delete_data("item",parent.id);
    /*for (let i in item_ex) {
        if (item_ex[i][1] == parent.id) {
            item_ex.splice(i, 1);
            console.log(item_ex);
            break;
        }
    }
    buildItemBody(item_ex);*/
}

function comboRemove(ev) {
    if (!window.confirm("確定要刪除此套餐嗎?"))
        return;
    let parent = ev.target.parentNode.parentNode;
    delete_data("combo",parent.id);
    //parent.parentNode.removeChild(parent);
    for (let i in combo_ex) {
        if (combo_ex[i][0] == parent.id) {
            combo_ex.splice(i, 1);
            console.log(combo_ex);
            break;
        }
    }
    even = 0;
    buildComboBody(combo_ex);
}

function comboItemsRemove(ev) {
    let parent = ev.target.parentNode.parentNode;
    parent.parentNode.removeChild(parent);
}

function buildItemHead(select) {
    for (let i in item_type_name[0]) {
        let option = document.createElement("option");
        option.value = item_type_name[1][i];
        option.innerHTML = "&nbsp;" + item_type_name[0][i];
        select.appendChild(option);
    }
}

function printComboItems(ev) {
    let parent;
    if (ev.target.tagName.toLowerCase() != "td")
        return;
    else
        parent = ev.target.parentNode;
    let cic = document.getElementById("combo_items_content");
    console.log(parent);
    for (let i in combo_ex) {
        if (combo_ex[i][0] == parent.id) {
            cic.innerHTML = "&nbsp;[ " + parent.id + " : " + combo_ex[i][3] + " ] ";
        }
    }
}

window.addEventListener("load", start, false);