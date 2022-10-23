var dropzone = null;
Dropzone.autoDiscover = false;
if ($("#myAwesomeDropzone").length) {

    dropzone = $("#myAwesomeDropzone").dropzone({
        url: "/",
        autoProcessQueue: false,
        createImageThumbnails: true,
        addRemoveLinks: true
    });

    function submitForm() {
        dropzone.processQueue();
        return false;
    }
}
if ($("#myAwesomeDropzone1").length) {

    dropzone = $("#myAwesomeDropzone1").dropzone({
        url: "/",
        autoProcessQueue: false,
        createImageThumbnails: true,
        addRemoveLinks: true
    });

    function submitForm() {
        dropzone.processQueue();
        return false;
    }
}
