import { ModalModel } from '../interfaces';
import { createNode } from '../utils/createNode';

export class Modal implements ModalModel {
    private overlay: HTMLElement | null = null;
    private modal: HTMLElement | null = null;
    private modalContent: HTMLElement | null = null;

    public buildModal(message: string): void {
        this.overlay = createNode({ tag: 'div', classes: ['modal-wrapper'] });
        this.modal = createNode({ tag: 'div', classes: ['modal'] });
        this.modalContent = createNode({ tag: 'p', classes: ['modal-content'], inner: message });

        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);

        this.bindEvents();
        this.openModal();
    }

    private openModal(): void {
        if (this.overlay) {
            document.body.append(this.overlay);
            document.body.style.overflow = 'hidden';
        }
    }

    private bindEvents(): void {
        if (this.overlay) this.overlay.addEventListener('click', this.closeModal);
    }

    private closeModal = (): void => {
        if (this.overlay) {
            this.overlay.remove();
            document.body.style.overflow = 'visible';
        }
    };
}
