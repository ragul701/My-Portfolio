// Page load aagum bodhu, save pannina profile pic ah restore pannuvom
document.addEventListener('DOMContentLoaded', function () {
    const savedImage = localStorage.getItem('profileImage');
    const mainPhoto = document.getElementById('main-photo');
    if (savedImage && mainPhoto) {
        mainPhoto.src = savedImage;
    }
});

// Image ah chinna size ah resize + compress panna (canvas use panni)
function resizeImage(file, maxSize, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            let width = img.width;
            let height = img.height;

            // Aspect ratio maintain pannikittu, max size ku ulla resize pannuvom
            if (width > height) {
                if (width > maxSize) {
                    height = Math.round(height * (maxSize / width));
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = Math.round(width * (maxSize / height));
                    height = maxSize;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // JPEG ah 0.7 quality la compress pannuvom (file size kammiya irukkum)
            const compressedData = canvas.toDataURL('image/jpeg', 0.7);
            callback(compressedData);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Profile picture change panna
function changeProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        resizeImage(file, 500, function (compressedData) {
            document.getElementById('main-photo').src = compressedData;
            try {
                localStorage.setItem('profileImage', compressedData);
            } catch (err) {
                alert('Image romba periya irukku, konjam chinna image try pannunga.');
                console.error(err);
            }
        });
    }
}

// Gallery-la new images add panna
function addGalleryImages(event) {
    const files = event.target.files;
    const gallery = document.getElementById('gallery-container');

    for (let file of files) {
        resizeImage(file, 500, function (compressedData) {
            const img = document.createElement('img');
            img.src = compressedData;
            img.alt = "Gallery Image";
            gallery.appendChild(img);
        });
    }
}