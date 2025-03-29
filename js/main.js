// HERO SLIDER 
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // Variáveis de controle
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 5000; 
    let isPlaying = true;
    let startX, moveX;

    // Inicialização
    function initSlider() {
        createDots();
        updateSlider();
        startAutoPlay();
        setupEventListeners();
    }

    // Dots de navegação
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Atualizar estado do slider
    function updateSlider() {
        // Atualizar slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        // Atualizar dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive);
        });
    }

    // Navegação
    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateSlider();
        resetAutoPlay();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Controle do auto-play
    function startAutoPlay() {
        if (!isPlaying) return;
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    function pauseAutoPlay() {
        clearInterval(slideInterval);
    }

    // Event listeners
    function setupEventListeners() {
        // Botões de navegação
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Pausar no hover
        slider.addEventListener('mouseenter', () => {
            isPlaying = false;
            pauseAutoPlay();
        });

        slider.addEventListener('mouseleave', () => {
            isPlaying = true;
            startAutoPlay();
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Touch events para mobile
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchmove', handleTouchMove, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd);
    }

    // Touch handlers
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        pauseAutoPlay();
    }

    function handleTouchMove(e) {
        moveX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (startX - moveX > 50) nextSlide();  // Swipe left
        if (startX - moveX < -50) prevSlide(); // Swipe right
        startAutoPlay();
    }

    // Iniciar slider
    initSlider();
});

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Fecha todas as outras respostas
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    const answer = document.getElementById(q.getAttribute('aria-controls'));
                    answer.style.maxHeight = null;
                    q.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            
            // Alterna o estado da pergunta clicada
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            const icon = this.querySelector('i');
            
            if (isExpanded) {
                answer.style.maxHeight = null;
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });
});

  