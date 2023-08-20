import closeAllModals from "./closeAllModals";
import calcScroll from "./calcScroll";

const modals = () => {
    let btnPressed = false;

    const bindModal = (triggerSelector, modalSelector, closeSelector, removeTrigger = false) => {
        const triggers = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              scroll = calcScroll();
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (removeTrigger) {
                    trigger.remove();
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
            if (e.target === modal) {
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

            if (!display && !btnPressed) {
                closeAllModals();

                document.querySelector(modalSelector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll(); 
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time)
    };

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        })
    }
    
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 5000)
}

export default modals;