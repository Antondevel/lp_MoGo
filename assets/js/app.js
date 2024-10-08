// Header  слайдер

document.addEventListener('DOMContentLoaded', function () {
    const sliderItems = document.querySelectorAll('.slider__item');
    const contentItems = document.querySelectorAll('.content__item');

    sliderItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Убираем класс 'active' у всех слайдов и контента
            sliderItems.forEach(slide => slide.classList.remove('active'));
            contentItems.forEach(content => content.classList.remove('active'));

            // Добавляем класс 'active' к текущему слайду и соответствующему контенту
            item.classList.add('active');
            contentItems[index].classList.add('active');
        });
    });
});


// шапка 


document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav_toggle');

    // Обработчик для открытия/закрытия бургер-меню
    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Обработчик для плавного скролла по клику на ссылки меню
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Отменяет стандартное поведение ссылки
            const targetId = this.getAttribute('data-scroll'); // Получение значения атрибута data-scroll
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Прокрутка до нужного элемента
                    behavior: 'smooth' // Плавная прокрутка
                });

                // Закрытие меню после клика на ссылку
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
});



// Аккордеон


const accordionHeaders = document.querySelectorAll('.accordion__header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.accordion__item');
        const content = item.querySelector('.accordion__content');
        const isActive = content.classList.contains('active');

        // Закрываем все открытые секции
        document.querySelectorAll('.accordion__content.active').forEach(openContent => {
            openContent.style.maxHeight = openContent.scrollHeight + 'px'; // Сначала задаем текущую высоту
            requestAnimationFrame(() => {
                openContent.style.maxHeight = null;
                openContent.classList.remove('active');
                openContent.closest('.accordion__item').classList.remove('active');
            });
        });

        // Открываем текущую секцию, если она была закрыта
        if (!isActive) {
            content.classList.add('active');
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';

            // Используем setTimeout для установки max-height на auto после завершения анимации
            setTimeout(() => {
                content.style.maxHeight = 'auto';
            }, 500); // Время должно совпадать с transition в CSS
        }
    });
});



// Слайдер 
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.reviews');

    sliders.forEach(slider => {
        const track = slider.querySelector('.reviews__track');
        let slides = Array.from(track.children);
        const prevButton = slider.querySelector('.reviews__btn--prev');
        const nextButton = slider.querySelector('.reviews__btn--next');
        let currentIndex = 0;

        // Клонируем первый и последний слайды
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        slides = Array.from(track.children);
        let slideWidth = slides[0].clientWidth;

        // Устанавливаем начальную позицию
        track.style.transform = `translateX(-${slideWidth}px)`;

        const moveToSlide = (index) => {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
            currentIndex = index;
        };

        const updateSlideWidth = () => {
            slideWidth = slides[0].clientWidth;
            track.style.transition = 'none'; // Отключаем анимацию на время пересчета
            track.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
        };

        // Обработчик события изменения размера окна
        window.addEventListener('resize', () => {
            updateSlideWidth();
        });

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex >= slides.length - 2) {
                moveToSlide(slides.length - 2);
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = `translateX(-${slideWidth}px)`;
                    currentIndex = 0;
                }, 500); // Ждем окончания анимации
            } else {
                moveToSlide(currentIndex + 1);
            }
        });

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex <= 0) {
                moveToSlide(0);
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = `translateX(-${(slides.length - 2) * slideWidth}px)`;
                    currentIndex = slides.length - 3;
                }, 500); // Ждем окончания анимации
            } else {
                moveToSlide(currentIndex - 1);
            }
        });

        track.addEventListener('transitionend', () => {
            if (slides[currentIndex + 1] === firstClone) {
                track.style.transition = 'none';
                track.style.transform = `translateX(-${slideWidth}px)`;
                currentIndex = 0;
            } else if (slides[currentIndex + 1] === lastClone) {
                track.style.transition = 'none';
                track.style.transform = `translateX(-${(slides.length - 2) * slideWidth}px)`;
                currentIndex = slides.length - 3;
            }
        });
    });
});





