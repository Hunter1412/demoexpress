function init() {
    const uploadInput = document.getElementById("upload_input");
    const uploadImage = document.getElementById("upload_image");
    if (uploadImage && uploadInput) {
        uploadInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            uploadImage.src = URL.createObjectURL(file);
            uploadImage.style.width = '150px';
            uploadImage.style.height = 'auto';
        });
    }
}
document.addEventListener("DOMContentLoaded", init);