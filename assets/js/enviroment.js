
export var url="https://ving2k2.github.io/rescusiveVer2.github.io"
// change when error
// http://127.0.0.1:5500/
// https://ving2k2.github.io/rescusiveVer2.github.io
function loaded(){
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
}

function loading() {
    $('#status').show();
    $('#preloader').show();
}
export {loaded,loading}
