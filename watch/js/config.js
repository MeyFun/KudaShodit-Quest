// =========================================================
// Настройки квеста: ученицы, страницы, пароль учителя
// =========================================================

window.QUEST_CONFIG = {
    // ученицы: кнопки на экране входа (в этом порядке) и их страницы
    students: [
        { name: 'Мария Шашкова', page: 'profile' },
        { name: 'Нина Терехова', page: 'rooms' },
        { name: 'Полина Федорченко', page: 'catalog' },
        { name: 'Анастасия Застебина', page: 'home' },
    ],

    // как называются страницы
    pages: {
        home: { title: 'Главная' },
        catalog: { title: 'Подборки' },
        rooms: { title: 'Комнаты' },
        profile: { title: 'Профиль' },
    },

    // название репозитория команды (подсказка после последней задачи)
    repoName: 'Киносфера',

    // шрифты сайта команды — подключаются в каждое превью
    fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=PT+Serif:wght@700&display=swap">',

    // превью строятся без обёртки с отступами (у сайта свой .container)
    wrapperClass: 'quest-root',

    // картинки сайта: код ссылается на ../img/..., поэтому превью «стоит» в папке site/page/
    assetBase: 'site/page/',

    // какие картинки положить в архив при скачивании страницы и откуда их взять
    imageSource: 'site/img/',
    downloadImages: [
        'arrow-right.svg', 'avatar.jpg', 'bookmark.svg', 'franchise-lotr.jpg', 'franchise-marvel.jpg', 'franchise-potter.jpg',
        'franchise-wick.jpg', 'group.svg', 'hero-dune.jpg', 'icon-award.svg', 'icon-bolt.svg', 'icon-clock.svg', 'icon-magic.svg',
        'logo-footer.svg', 'logo.svg', 'mascot-small.svg', 'mascot.svg', 'pencil.svg', 'plus-circle.svg', 'poster-creator.jpg',
        'poster-flower-moon.jpg', 'poster-napoleon.jpg', 'review-1.jpg', 'review-2.jpg', 'review-3.jpg', 'room-bladerunner.jpg',
        'room-interstellar.jpg', 'room.svg', 'search.svg', 'sparkle.svg', 'star-kp.svg', 'star.svg', 'tab-friends.svg', 'tab-rooms.svg',
    ],

    // хеш пароля учителя (сейчас пароль: kino2026).
    // Новый хеш: открой консоль на сайте (F12) и выполни Quest.hash('новый пароль')
    teacherHash: 3435120672,
};

// Задачи страниц заполняются в файлах js/tasks-*.js
window.QUEST_TASKS = {};
