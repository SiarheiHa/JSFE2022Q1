import { createNode } from '../utils/createNode';

export class Modal {
    overlay: HTMLElement | null = null;
    modal: HTMLElement | null = null;
    modalContent: HTMLElement | null = null;

    buildModal(message: string) {
        this.overlay = createNode({ tag: 'div', classes: ['modal-wrapper'] });
        this.modal = createNode({ tag: 'div', classes: ['modal'] });
        this.modalContent = createNode({ tag: 'p', classes: ['modal-content'], inner: message });

        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);

        this.bindEvents();
        this.openModal();
    }

    openModal() {
        if (this.overlay) {
            document.body.append(this.overlay);
            document.body.style.overflow = 'hidden';
        }
    }

    bindEvents() {
        if (this.overlay) this.overlay.addEventListener('click', this.closeModal);
    }

    closeModal = () => {
        if (this.overlay) {
            this.overlay.remove();
            document.body.style.overflow = 'visible';
        }
    };
}
