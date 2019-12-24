function ShowTime(){
    var NowDate = new Date();
    var d = NowDate.getDay();
    var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    document.getElementById('showbox').innerHTML =NowDate.toLocaleString() + '（' + dayNames[d] + '）';
    setTimeout('ShowTime()', 1000);
}