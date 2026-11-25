// =========================================================
// Настройки квеста: ученицы, страницы, пароль учителя
// =========================================================

window.QUEST_CONFIG = {
    // ученицы: кнопки на экране входа (в этом порядке) и их страницы
    students: [
        { name: 'Надежда Окольникова', page: 'requests' },
        { name: 'Кристина Власова', page: 'reviews' },
        { name: 'Алёна Юрченко', page: 'profile' },
        { name: 'Мадина Жумадилова', page: 'catalog' },
    ],

    // как называются страницы
    pages: {
        profile: { title: 'Анкета' },
        catalog: { title: 'Дисциплины' },
        requests: { title: 'Заявки' },
        reviews: { title: 'Отзывы' },
    },

    // название репозитория команды (подсказка после последней задачи)
    repoName: 'TeamPlay',

    // шрифты сайта команды — подключаются в каждое превью
    fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap">',

    // превью строятся без обёртки с отступами (у сайта свой .container)
    wrapperClass: 'quest-root',

    // картинки сайта: код ссылается на ../img/..., поэтому превью «стоит» в папке site/page/
    assetBase: 'site/page/',

    // какие картинки положить в архив при скачивании страницы и откуда их взять
    imageSource: 'site/img/',
    downloadImages: ['cs2.jpg', 'cyberpunk.jpg', 'dota.jpg', 'valorant.jpg'],

    // хеш пароля учителя (сейчас пароль: 2222).
    // Новый хеш: открой консоль на сайте (F12) и выполни Quest.hash('новый пароль')
    teacherHash: 2085915525,
};

// Задачи страниц заполняются в файлах js/tasks-*.js
window.QUEST_TASKS = {};
