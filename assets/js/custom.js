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

    //underline input text
    function underline_only() {
        $('.underline-only').each(function () {
            this.onkeydown = this.onkeyup = function () {
                size = this.value.length * 9;
                this.style.width = size + "px";
                if (size < 200)
                    this.style.width = "200px";
            }
        })
    }
    underline_only()

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

    //menu
    var observer2 = new MutationObserver(function () {
        $('.side-nav').metisMenu('dispose').metisMenu();
    });

    //reload body
    observer2.observe($('.side-nav')[0], {childList: true, subtree: true})
    var observer3 =new MutationObserver(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="toast"]').toast();
        $('[data-toggle="touchspin"]').TouchSpin();
        underline_only()
    });
    observer3.observe($('body')[0], {childList: true, subtree: true})


})

