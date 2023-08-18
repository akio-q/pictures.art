import closeAllModals from "./closeAllModals";
import calcScroll from "./calcScroll";

const modals = () => {
    const bindModal = (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) => {
        const triggers = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              scroll = calcScroll();
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                if (e.target) {
                    e.preventDefault();
                }

                closeAllModals();
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            closeAllModals();

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        });

        modal.addEventListener('click', e => {
            if (e.target === modal && closeClickOverlay) {
                closeAllModals();

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            }
        });
    };

    const showModalByTime = (modalSelector, time) => {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            })

            if (!display) {
                document.querySelector(modalSelector).style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }, time)
    };
    
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    showModalByTime('.popup-consultation', 5000)
}

export default modals;