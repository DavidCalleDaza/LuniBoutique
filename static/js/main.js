/* --- LÓGICA GENERAL DE LA APLICACIÓN --- */

document.addEventListener('DOMContentLoaded', function () {

    /* --- LÓGICA PARA EL MENÚ DE NAVEGACIÓN LATERAL --- */
    
    const mainHeader = document.querySelector('.main-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close-btn');
    const navMenu = document.querySelector('.nav-menu');

    function openNavMenu() {
        navMenu.classList.add('active');
        mainHeader.classList.add('menu-is-open');
    }

    function closeNavMenu() {
        navMenu.classList.remove('active');
        mainHeader.classList.remove('menu-is-open');
    }

    if (navToggle && navMenu && mainHeader) {
        navToggle.addEventListener('click', openNavMenu);
    }

    if (navClose && navMenu && mainHeader) {
        navClose.addEventListener('click', closeNavMenu);
    }

    /* --- LÓGICA MODIFICADA PARA EL CARRUSEL DE TESTIMONIOS (CON IMÁGENES) --- */
    const testimonials = document.querySelectorAll('.testimonial-carousel blockquote');
    const testimonialImages = document.querySelectorAll('.testimonial-image-carousel .testimonial-image');
    
    if (testimonials.length > 0 && testimonialImages.length > 0) {
        let currentTestimonialIndex = 0;
        const intervalTime = 6000;

        function showNextTestimonial() {
            // Oculta el testimonio y la imagen actual
            if(testimonials[currentTestimonialIndex]) {
                testimonials[currentTestimonialIndex].classList.remove('active');
            }
            if(testimonialImages[currentTestimonialIndex]) {
                testimonialImages[currentTestimonialIndex].classList.remove('active');
            }
            
            // Calcula el siguiente índice
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            
            // Muestra el siguiente testimonio y la imagen
            if(testimonials[currentTestimonialIndex]) {
                testimonials[currentTestimonialIndex].classList.add('active');
            }
            if(testimonialImages[currentTestimonialIndex]) {
                testimonialImages[currentTestimonialIndex].classList.add('active');
            }
        }

        setInterval(showNextTestimonial, intervalTime);
    }

    /* --- LÓGICA PARA LOS MODALES INTERACTIVOS (GENERAL) --- */
    const openModalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-close-button');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
    }

    openModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.querySelector(trigger.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    /* --- LÓGICA PARA EL MODAL DE PRODUCTO --- */
    const acquireButtons = document.querySelectorAll('.btn-highlight');
    const productModal = document.querySelector('#modal-producto');
    // ⚠️ REEMPLAZA CON TU NÚMERO DE CONTACTO (CÓDIGO DE PAÍS + NÚMERO)
    const CONTACT_NUMBER = '573106899547'; 

    acquireButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.product-card');
            
            const productName = card.querySelector('h2').textContent;
            const productPrice = card.querySelector('.price').textContent;
            const productImageSrc = card.querySelector('img').src;

            // Llenar el modal con la información del producto
            productModal.querySelector('#modal-product-image').src = productImageSrc;
            productModal.querySelector('#modal-product-name').textContent = productName;
            productModal.querySelector('#modal-product-price').textContent = productPrice;
            
            // Configurar links de contacto
            const message = encodeURIComponent(`Hola LuniBoutique, estoy interesada en el producto: ${productName}.`);
            productModal.querySelector('#modal-whatsapp-link').href = `https://wa.me/${CONTACT_NUMBER}?text=${message}`;
            productModal.querySelector('#modal-telegram-link').href = `https://t.me/share/url?url=&text=${message}`;

            openModal(productModal);
        });
    });

    /* --- LÓGICA PARA CERRAR ELEMENTOS CON LA TECLA ESCAPE --- */
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
            if (navMenu.classList.contains('active')) {
                closeNavMenu();
            }
        }
    });

    /* --- LÓGICA PARA EL HEADER FIJO AL HACER SCROLL --- */
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- LÓGICA MODIFICADA PARA CARGAR MÁS/MENOS PRODUCTOS --- */
    document.querySelectorAll('.product-section-with-load-more').forEach(section => {
        const productGrid = section.querySelector('.product-grid');
        const viewMoreContainer = section.querySelector('.view-more-container');
        
        const loadMoreBtn = viewMoreContainer.querySelector('.btn-view-more');
        // Crear y añadir botón "Ver menos" dinámicamente
        const loadLessBtn = document.createElement('button');
        loadLessBtn.textContent = 'Ver menos';
        loadLessBtn.className = 'btn-view-less hidden';
        viewMoreContainer.appendChild(loadLessBtn);

        if (!productGrid || !loadMoreBtn) return;

        const products = Array.from(productGrid.querySelectorAll('.product-card'));
        const itemsPerPage = 9;
        let itemsShown = itemsPerPage;

        // Ocultar productos que no deben ser visibles inicialmente
        products.slice(itemsPerPage).forEach(product => product.style.display = 'none');

        // Ocultar botón "Ver más" si no hay más productos
        if (products.length <= itemsPerPage) {
            loadMoreBtn.classList.add('hidden');
            return;
        }

        // Evento para "Ver más"
        loadMoreBtn.addEventListener('click', () => {
            const nextProducts = products.slice(itemsShown, itemsShown + itemsPerPage);
            nextProducts.forEach(product => product.style.display = 'block');
            itemsShown += itemsPerPage;

            loadLessBtn.classList.remove('hidden'); // Mostrar "Ver menos"

            if (itemsShown >= products.length) {
                loadMoreBtn.classList.add('hidden'); // Ocultar "Ver más" si se mostraron todos
            }
        });

        // Evento para "Ver menos"
        loadLessBtn.addEventListener('click', () => {
            // Ocultar productos extra y hacer scroll hacia el inicio de la sección
            products.slice(itemsPerPage).forEach(product => product.style.display = 'none');
            itemsShown = itemsPerPage;
            
            loadLessBtn.classList.add('hidden'); // Ocultar "Ver menos"
            loadMoreBtn.classList.remove('hidden'); // Mostrar "Ver más" de nuevo

            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* --- LÓGICA PARA EL MODAL FLOTANTE --- */
    const floatingModal = document.querySelector('#floating-promo-modal');
    const closeFloatingModalBtn = floatingModal.querySelector('.floating-modal-close');

    if(floatingModal && closeFloatingModalBtn) {
        closeFloatingModalBtn.addEventListener('click', () => {
            floatingModal.classList.add('is-hidden');
        });
    }
    
});