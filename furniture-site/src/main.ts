import './style.css'
/**
 * ============================
 * КАРУСЕЛЬ + LIGHTBOX
 * ============================
 * 
 * Что делает этот файл:
 * 1. Управляет прокруткой фото в блоке "Наши работы"
 * 2. Открывает фото на весь экран (lightbox)
 * 3. Позволяет листать фото стрелками
 * 4. Закрывает lightbox по клику вне картинки
 */

// -----------------------------
// Получаем элементы карусели
// -----------------------------

const track = document.querySelector('.carousel__track') as HTMLElement
const items = Array.from(
  document.querySelectorAll('.carousel__item')
) as HTMLImageElement[]

const prevBtn = document.querySelector('.carousel__btn--prev') as HTMLButtonElement
const nextBtn = document.querySelector('.carousel__btn--next') as HTMLButtonElement

// текущий индекс фото
let currentIndex = 0

/**
 * Обновляет положение карусели
 */
function updateCarousel() {
  const width = items[0].clientWidth
  track.style.transform = `translateX(-${currentIndex * width}px)`
}

// -----------------------------
// Кнопки влево / вправо (карусель)
// -----------------------------

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length
  updateCarousel()
})

prevBtn.addEventListener('click', () => {
  currentIndex =
    (currentIndex - 1 + items.length) % items.length
  updateCarousel()
})

// -----------------------------
// LIGHTBOX (развёрнутое фото)
// -----------------------------

const lightbox = document.getElementById('lightbox') as HTMLElement
const lightboxImage = lightbox.querySelector(
  '.lightbox__image'
) as HTMLImageElement

const lightboxPrev = lightbox.querySelector(
  '.lightbox__btn--prev'
) as HTMLButtonElement

const lightboxNext = lightbox.querySelector(
  '.lightbox__btn--next'
) as HTMLButtonElement

let lightboxIndex = 0

/**
 * Открывает lightbox с нужным изображением
 */
function openLightbox(index: number) {
  lightboxIndex = index
  lightboxImage.src = items[lightboxIndex].src
  lightbox.classList.add('active')
}

/**
 * Закрывает lightbox
 */
function closeLightbox() {
  lightbox.classList.remove('active')
}

// -----------------------------
// Клик по фото → открыть
// -----------------------------

items.forEach((img, index) => {
  img.addEventListener('click', () => {
    openLightbox(index)
  })
})

// -----------------------------
// Листание в lightbox
// -----------------------------

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation()

  lightboxIndex = (lightboxIndex + 1) % items.length
  lightboxImage.src = items[lightboxIndex].src
})

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation()

  lightboxIndex =
    (lightboxIndex - 1 + items.length) % items.length
  lightboxImage.src = items[lightboxIndex].src
})

// -----------------------------
// Закрытие по клику вне фото
// -----------------------------

lightbox.addEventListener('click', () => {
  closeLightbox()
})

// -----------------------------
// Закрытие по ESC (приятный бонус)
// -----------------------------

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox()
  }
})

