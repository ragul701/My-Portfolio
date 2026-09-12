// =========================================================
// PAGE LOAD
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

    // =====================================================
    // PROFILE IMAGE
    // =====================================================

    const savedImage =
        localStorage.getItem('profileImage');

    const mainPhoto =
        document.getElementById('main-photo');

    if (savedImage && mainPhoto) {
        mainPhoto.src = savedImage;
    }


    // =====================================================
    // DARK / LIGHT MODE
    // =====================================================

    const themeToggle =
        document.getElementById('theme-toggle');

    const themeIcon =
        themeToggle
            ? themeToggle.querySelector('i')
            : null;

    const savedTheme =
        localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }


    // =====================================================
    // UPDATE THEME ICON
    // =====================================================

    function updateThemeIcon() {

        if (!themeIcon) {
            return;
        }

        const isLightMode =
            document.body.classList.contains('light-mode');

        if (isLightMode) {

            themeIcon.classList.remove('fa-sun');

            themeIcon.classList.add('fa-moon');

        } else {

            themeIcon.classList.remove('fa-moon');

            themeIcon.classList.add('fa-sun');

        }
    }


    updateThemeIcon();


    // =====================================================
    // THEME BUTTON CLICK
    // =====================================================

    if (themeToggle) {

        themeToggle.addEventListener(
            'click',
            function () {

                document.body.classList.toggle(
                    'light-mode'
                );

                const isLightMode =
                    document.body.classList.contains(
                        'light-mode'
                    );

                localStorage.setItem(
                    'portfolio-theme',
                    isLightMode
                        ? 'light'
                        : 'dark'
                );

                updateThemeIcon();

            }
        );

    }


    // =====================================================
    // NAVIGATION
    // HOME / ABOUT / SKILLS / PROJECTS / CONTACT
    // =====================================================

    document.querySelectorAll('nav a[href^="#"]').forEach(
        function (link) {

            link.addEventListener(
                'click',
                function (event) {

                    const targetId =
                        link.getAttribute('href');

                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                }
            );

        }
    );

});


// =========================================================
// IMAGE RESIZE + COMPRESS
// =========================================================

function resizeImage(file, maxSize, callback) {

    const reader =
        new FileReader();

    reader.onload = function (e) {

        const img =
            new Image();

        img.onload = function () {

            let width =
                img.width;

            let height =
                img.height;


            // Maintain aspect ratio

            if (width > height) {

                if (width > maxSize) {

                    height =
                        Math.round(
                            height *
                            (maxSize / width)
                        );

                    width =
                        maxSize;
                }

            } else {

                if (height > maxSize) {

                    width =
                        Math.round(
                            width *
                            (maxSize / height)
                        );

                    height =
                        maxSize;
                }
            }


            // Canvas

            const canvas =
                document.createElement(
                    'canvas'
                );

            canvas.width =
                width;

            canvas.height =
                height;


            const ctx =
                canvas.getContext(
                    '2d'
                );


            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );


            // Compress image

            const compressedData =
                canvas.toDataURL(
                    'image/jpeg',
                    0.7
                );


            callback(
                compressedData
            );

        };


        img.src =
            e.target.result;

    };


    reader.readAsDataURL(file);

}


// =========================================================
// CHANGE PROFILE PICTURE
// =========================================================

function changeProfilePic(event) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }


    resizeImage(
        file,
        500,
        function (compressedData) {

            const mainPhoto =
                document.getElementById(
                    'main-photo'
                );


            if (mainPhoto) {

                mainPhoto.src =
                    compressedData;

            }


            try {

                localStorage.setItem(
                    'profileImage',
                    compressedData
                );

            }
            catch (err) {

                alert(
                    'Image romba periya irukku, konjam chinna image try pannunga.'
                );

                console.error(err);

            }

        }
    );

}


// =========================================================
// GALLERY IMAGES
// =========================================================

function addGalleryImages(event) {

    const files =
        event.target.files;

    const gallery =
        document.getElementById(
            'gallery-container'
        );


    if (!gallery) {
        return;
    }


    for (let file of files) {

        resizeImage(
            file,
            500,
            function (compressedData) {

                const img =
                    document.createElement(
                        'img'
                    );


                img.src =
                    compressedData;

                img.alt =
                    'Gallery Image';


                gallery.appendChild(
                    img
                );

            }
        );

    }

}