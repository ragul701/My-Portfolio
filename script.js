// Profile picture change panna
function changeProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('main-photo').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Gallery-la new images add panna
function addGalleryImages(event) {
    const files = event.target.files;
    const gallery = document.getElementById('gallery-container');
    
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "Gallery Image";
            gallery.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}