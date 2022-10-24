$(document).ready(function () {

    // change content size
    function changeSize() {
        $(".content-page").height(($(".footer").height() + $("#main-content").height()) + "px")
    }
    $(window).on('resize', function () {
        changeSize()
    });
    changeSize()
    var observer = new MutationObserver(function () {
        changeSize()
    });
    observer.observe($(".content-page")[0], {characterData: true, childList: true, attributes: true, subtree: true})

    $(document).on('click', '.like-button', function () {
        $(this).children("i").toggleClass("text-danger")
        // ajax send like
    });
    $(document).on('click', '.post-content', function () {
        $(this).toggleClass("expended")
        if ($(this).hasClass("expended")) {
            $(this).children("iframe").prop("src", function () {
                return $(this).data("src");
            })
        }
    })
    var observer2 = new MutationObserver(function () {
        $('.side-nav').metisMenu('dispose').metisMenu();
    });
    observer2.observe($('.side-nav')[0], {childList: true})
})

