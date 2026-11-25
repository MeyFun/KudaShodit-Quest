// =========================================================
// Настройки квеста: ученицы, страницы, пароль учителя
// =========================================================

window.QUEST_CONFIG = {
    // ученицы: кнопки на экране входа (в этом порядке) и их страницы
    students: [
        { name: 'Валерия Шипунова', page: 'collections' },
        { name: 'Божена Белан', page: 'home' },
        { name: 'Алёна Фендель', page: 'settlements' },
        { name: 'Дарья Боюрнова', page: 'groups' },
    ],

    // как называются страницы
    pages: {
        home: { title: 'Главная' },
        groups: { title: 'Группы' },
        collections: { title: 'Сборы' },
        settlements: { title: 'Расчёты' },
    },

    // название репозитория команды (подсказка после последней задачи)
    repoName: 'Сплит',

    // шрифты сайта команды — подключаются в каждое превью
    fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&family=Manrope:wght@600;700;800&display=swap">',

    // превью строятся без обёртки с отступами (у сайта свой .container)
    wrapperClass: 'quest-root',

    // картинки сайта: код ссылается на ../img/..., поэтому превью «стоит» в папке site/page/
    assetBase: 'site/page/',

    // какие картинки положить в архив при скачивании страницы и откуда их взять
    imageSource: 'site/img/',
    downloadImages: [
        'logo.svg', 'logo-footer.svg', 'plus.svg', 'user.svg', 'arrow-down.svg', 'arrow-up.svg',
        'send.svg', 'receipt.svg', 'group-add.svg', 'group-altai.jpg', 'group-cottage.jpg', 'cocktail.svg',
    ],

    // хеш пароля учителя (сейчас пароль: split2026).
    // Новый хеш: открой консоль на сайте (F12) и выполни Quest.hash('новый пароль')
    teacherHash: 3028005681,
};

// Задачи страниц заполняются в файлах js/tasks-*.js
window.QUEST_TASKS = {};
