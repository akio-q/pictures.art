const sliders = (slides, direction, prev, next) => {
    const items = document.querySelectorAll(slides);
    let slideIndex = 1;
    
    function showSldies(n) {
        if (n > items.length) {
            slideIndex = 1;
        } 
        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(slide => {
            slide.classList.add('animated');
            slide.style.display = 'none';
        })

        items[slideIndex - 1].style.display = 'block';
    }

    showSldies(slideIndex);

    function changeSlides(n) {
        showSldies(slideIndex += n);
    } 

    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);
        
        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        })

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        })
    } catch(e) {}

    
}

export default sliders;