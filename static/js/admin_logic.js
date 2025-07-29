document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA EL MODAL DE ELIMINACIÓN ---
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        const productNameSpan = document.getElementById('productNameSpan');
        const deleteConfirmForm = document.getElementById('deleteConfirmForm');
        const cancelDeleteBtn = document.getElementById('cancelDelete');
        const deleteTriggers = document.querySelectorAll('.delete-trigger');

        function openDeleteModal(name, url) {
            productNameSpan.textContent = `"${name}"`;
            deleteConfirmForm.action = url;
            deleteModal.classList.remove('hidden');
        }

        function closeDeleteModal() {
            deleteModal.classList.add('hidden');
        }

        deleteTriggers.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const name = this.dataset.productName;
                const url = this.dataset.deleteUrl;
                openDeleteModal(name, url);
            });
        });

        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
        deleteModal.addEventListener('click', function(event) {
            if (event.target === deleteModal) {
                closeDeleteModal();
            }
        });
    }

    // --- LÓGICA PARA EL MODAL DE DETALLES DEL PRODUCTO (NUEVA) ---
    const detailModal = document.getElementById('productDetailModal');
    if (detailModal) {
        const modalImage = document.getElementById('modalProductImage');
        const modalName = document.getElementById('modalProductName');
        const modalDescription = document.getElementById('modalProductDescription');
        const closeDetailBtn = document.getElementById('closeDetailModal');
        const imageTriggers = document.querySelectorAll('.product-thumbnail-container');

        function openDetailModal(name, description, imgUrl) {
            modalName.textContent = name;
            modalDescription.textContent = description;
            modalImage.src = imgUrl;
            detailModal.classList.remove('hidden');
        }

        function closeDetailModal() {
            detailModal.classList.add('hidden');
        }

        imageTriggers.forEach(container => {
            container.addEventListener('click', function() {
                const name = this.dataset.name;
                const description = this.dataset.description;
                const imgUrl = this.dataset.imgUrl;
                openDetailModal(name, description, imgUrl);
            });
        });

        closeDetailBtn.addEventListener('click', closeDetailModal);
        detailModal.addEventListener('click', function(event) {
            if (event.target === detailModal) {
                closeDetailModal();
            }
        });
    }
});