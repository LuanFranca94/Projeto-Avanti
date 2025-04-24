const carrossel = document.querySelector('.carrossel');
const carrosselItens = document.querySelectorAll('.carrossel_item:not(.clone)'); // Seleciona apenas os itens originais
const carrosselTodosItens = document.querySelectorAll('.carrossel_item'); // Seleciona todos os itens
const prevButton = document.querySelector('.carrossel_nav.prev');
const nextButton = document.querySelector('.carrossel_nav.next');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let itemWidth;
let isTransitioning = false;

function updateCarrossel() {
    const translateX = -currentIndex * itemWidth;
    carrossel.style.transform = `translateX(${translateX}px)`;

    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex % carrosselItens.length);
    });
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarrossel();
    setTimeout(() => {
        if (currentIndex >= carrosselItens.length) {
            carrossel.style.transition = 'none'; // Remove a transição para o reposicionamento instantâneo
            currentIndex = 0;
            updateCarrossel();
            // Força um reflow para que a transição 'none' seja aplicada
            carrossel.offsetHeight;
            carrossel.style.transition = ''; // Reativa a transição
        }
        isTransitioning = false;
    }, 300); // Duração da transição (deve corresponder ao CSS)
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarrossel();
    setTimeout(() => {
        if (currentIndex < 0) {
            carrossel.style.transition = 'none';
            currentIndex = carrosselItens.length - 1;
            updateCarrossel();
            carrossel.offsetHeight;
            carrossel.style.transition = '';
        }
        isTransitioning = false;
    }, 300);
}

function goToSlide(index) {
    currentIndex = index % carrosselItens.length;
    updateCarrossel();
}

function init() {
    itemWidth = carrosselTodosItens[0].offsetWidth + 10; // Largura do item + margem
    updateCarrossel();
    updateIndicators();

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

init();