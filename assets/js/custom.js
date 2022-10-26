Dropzone.autoDiscover = false;
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

    // summernote
    function summernote_init() {
        var create = $("#summernote-create")
        if (create.length)
            create.summernote({
                placeholder: "Viết giới thiệu, tóm tắt đề tài...",
                height: 230,
                callbacks: {
                    onInit: function (e) {
                        $(e.editor).find(".custom-control-description").addClass("custom-control-label").parent().removeAttr("for")
                    }
                }
            })
        var edit = $("#summernote-edit")
        if (edit.length)
            create.summernote({
                placeholder: "Viết giới thiệu, tóm tắt đề tài...",
                height: 230,
                callbacks: {
                    onInit: function (e) {
                        $(e.editor).find(".custom-control-description").addClass("custom-control-label").parent().removeAttr("for")
                    }
                }
            })
        var mark = $("#summernote-basic-3")
        if (mark.length)
            mark.summernote({
                placeholder: "Viết bình luận...",
                height: 230,
                callbacks: {
                    onInit: function (e) {
                        $(e.editor).find(".custom-control-description").addClass("custom-control-label").parent().removeAttr("for")
                    }
                }
            })
    }

    summernote_init()

    //dropzone
    let count_dropzone = $('[data-plugin="dropzone"]').length

    function dropzone_init() {
        $('[data-plugin="dropzone"]').each(function () {
            let dropzoneControl = $(this)[0].dropzone;
            if (dropzoneControl) {
                dropzoneControl.destroy();
            }
            var t = $(this).data("url"), e = {url: t};
            var i = $(this).data("previewsContainer")
            i && (e.previewsContainer = i);
            var o = $(this).data("uploadPreviewTemplate");
            o && (e.previewTemplate = $(o).html());
            var m = $(this).data("maxFile");
            m && (e.maxFiles=m)
            e.init = function () {
                this.on("addedfile", function (file) {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        var base64String = event.target.result;
                        // console.log(base64String);
                        $('#file-neee').val(base64String)
                    };
                    reader.readAsDataURL(file);

                });
            };
            $(this).dropzone(e)
        })
    }
    dropzone_init()

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

    //reload menu
    var observer2 = new MutationObserver(function () {
        $('.side-nav').metisMenu('dispose').metisMenu();
    });
    observer2.observe($('.side-nav')[0], {childList: true, subtree: true})

    //reload content
    var observer3 = new MutationObserver(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="toast"]').toast();
        $('[data-toggle="touchspin"]').TouchSpin();
        underline_only()
        summernote_init()
        var dz = $('[data-plugin="dropzone"]')
        if (count_dropzone != dz.length) {
            count_dropzone = dz.length
            dropzone_init()
        }
    });
    observer3.observe($(".content-page")[0], {childList: true, subtree: true})
})
