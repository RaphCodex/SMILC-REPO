 // ---------- LIGHTBOX GALLERY ----------
            const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxCaption = document.getElementById('lightboxCaption');
            const lightboxCounter = document.getElementById('lightboxCounter');
            const lightboxClose = document.getElementById('lightboxClose');
            const lightboxPrev = document.getElementById('lightboxPrev');
            const lightboxNext = document.getElementById('lightboxNext');

            let currentIndex = 0;
            const images = galleryItems.map(item => {
                const img = item.querySelector('img');
                return {
                    src: img.src,
                    alt: img.alt,
                    caption: img.alt // you can customize captions here
                };
            });

            function openLightbox(index) {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            function updateLightbox() {
                const imgData = images[currentIndex];
                lightboxImg.src = imgData.src;
                lightboxImg.alt = imgData.alt;
                lightboxCaption.textContent = imgData.caption;
                lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            }

            function prevImage() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightbox();
            }

            function nextImage() {
                currentIndex = (currentIndex + 1) % images.length;
                updateLightbox();
            }

            // Attach click events to gallery items
            galleryItems.forEach((item, idx) => {
                item.addEventListener('click', () => openLightbox(idx));
            });

            // Lightbox navigation
            lightboxClose?.addEventListener('click', closeLightbox);
            lightboxPrev?.addEventListener('click', prevImage);
            lightboxNext?.addEventListener('click', nextImage);

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
            });

            // Close lightbox when clicking outside image (on background)
            lightbox?.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            // ---------- ACTIVE LINK (simulate current page) ----------
            const currentPath = window.location.pathname.split('/').pop();
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                if (link.getAttribute('href') === 'gallery.html') {
                    link.classList.add('active');
                }
            });

            console.log('Gallery page with modern navbar and mosaic collage ready!');