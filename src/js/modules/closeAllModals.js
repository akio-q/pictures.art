const closeAllModals = () => {
    const windows = document.querySelectorAll('[data-modal]');
    
    windows.forEach(item => {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeIn');
    })
}

export default closeAllModals;