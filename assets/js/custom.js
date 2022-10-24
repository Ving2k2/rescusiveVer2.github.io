$(document).ready(function () {
    content_page =$(".content-page")[0];
    // change content size
    function changeSize() {
        content_page.height(($(".footer").height() + $("#main-content").height()) + "px")
    }
    $(window).on('resize', function () {
        changeSize()
    });
    changeSize()
    var observer = new MutationObserver(function () {
        changeSize()
    });
    observer.observe(content_page, {characterData: true, childList: true, attributes: true, subtree: true})

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
    observer2.observe($('.side-nav')[0], {childList: true, subtree: true})
    var observer3 =new MutationObserver(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="toast"]').toast();
        $('[data-toggle="touchspin"]').TouchSpin();
    });
    observer3.observe($('body')[0], {childList: true, subtree: true})
})

