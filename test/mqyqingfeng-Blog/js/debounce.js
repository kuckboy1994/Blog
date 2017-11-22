var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

// container.onmousemove = getUserAction;


// 第一版
function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}

// container.onmousemove = debounce(getUserAction, 1000);


// 第二版
function debounce2(func, wait) {
    var timeout;

    return function () {
        var context = this;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context)
        }, wait);
    }
}

// container.onmousemove = debounce2(getUserAction, 1000);


// 第三版
function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
};


function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        console.log(arguments);
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}

container.onmousemove = debounce2(getUserAction, 1000);