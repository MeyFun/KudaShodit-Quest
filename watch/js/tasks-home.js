// =========================================================
// Задачи страницы «Главная» — Анастасия Застебина
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    const heroTop =
        '<div class="hero-tags">\n' +
        '    <div class="chip chip-purple">Премьера недели</div>\n' +
        '    <div class="chip">Фантастика</div>\n' +
        '    <div class="chip chip-teal"><img src="../img/star-kp.svg" alt="" width="12" height="11"> 8.9 Кинопоиск</div>\n' +
        '    <p class="hero-meta">2 ч 46 мин • 16+</p>\n' +
        '</div>\n' +
        '<h1>Дюна: Часть вторая</h1>\n' +
        '<p class="hero-text">Герцог Пол Атрейдес объединяется с фременами, чтобы отомстить заговорщикам, уничтожившим его семью.</p>\n' +
        '<p class="hero-cast">В главных ролях: <b>Тимоти Шаламе</b> • <b>Зендея</b></p>\n';
    const heroButtons =
        '<div class="hero-buttons">\n' +
        '    <a class="button button-teal" href="../catalog/catalog.html">Весь каталог</a>\n' +
        '    <a class="button button-ghost" href="../rooms/rooms.html"><img src="../img/room.svg" alt="" width="15" height="15"> Создать комнату</a>\n' +
        '    <button class="round-button bookmark" type="button"><img src="../img/bookmark.svg" alt="В мой список" width="12" height="15"></button>\n' +
        '</div>';
    function hero(buttons) {
        return '<section class="hero">\n    <div class="hero-content">\n' + indent(indent(heroTop)).replace(/\n {8}$/, '\n') + indent(indent(buttons)) +
            '\n    </div>\n    <img class="hero-poster" src="../img/hero-dune.jpg" alt="Кадр из фильма «Дюна: Часть вторая»">\n</section>';
    }
    const heroFull = hero(heroButtons);
    const heroStart = hero('<!-- сюда блок с тремя кнопками -->\n');

    const heroCss =
        '.hero {\n    display: grid;\n    grid-template-columns: 3fr 2fr;\n    gap: 32px;\n    align-items: center;\n    padding: 40px;\n' +
        '    background: #1c1a26;\n    border: 1px solid #2c2f34;\n    border-radius: 24px;\n}\n\n' +
        '.hero-content {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
        '.hero h1 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 48px;\n    line-height: 1.15;\n}\n\n' +
        '.hero-poster {\n    width: 100%;\n    height: 420px;\n    object-fit: cover;\n    border-radius: 16px;\n}\n';
    const heroReady =
        '.hero-tags {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 10px;\n    align-items: center;\n}\n\n' +
        '.hero-meta,\n.hero-text,\n.hero-cast {\n    font-size: 13px;\n    color: #c0c8c7;\n}\n\n' +
        '.hero-cast b {\n    color: #a0cfce;\n}\n\n' +
        '.hero-buttons {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n    align-items: center;\n}\n';
    const roundCss =
        '.round-button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 48px;\n    height: 48px;\n' +
        '    background: #2a2935;\n    border: 1px solid #2c2f34;\n    border-radius: 50%;\n}\n\n' +
        '.round-button.saved {\n    background: #a0cfce;\n}\n';

    const mascotInfo =
        '<div class="mascot-info">\n' +
        '    <div class="mascot-icon"><img src="../img/mascot.svg" alt="Летучая мышь Бэтти" width="48" height="48"></div>\n' +
        '    <div>\n' +
        '        <div class="chip chip-teal chip-small"><img src="../img/sparkle.svg" alt="" width="11" height="11"> Киномышь Бэтти рекомендует</div>\n' +
        '        <h2>Не знаешь, что посмотреть сегодня вечером?</h2>\n' +
        '        <p>Выбери одно или несколько настроений, и Бэтти подберёт фильм.</p>\n' +
        '    </div>\n' +
        '</div>';
    const moodsHtml =
        '<div class="moods">\n' +
        '    <button class="mood" type="button" data-mood="adventure">🍿 На одном дыхании</button>\n' +
        '    <button class="mood" type="button" data-mood="thriller">🕯️ Мрачный триллер</button>\n' +
        '    <button class="mood" type="button" data-mood="space">🚀 Космическая сага</button>\n' +
        '    <button class="mood" type="button" data-mood="group">🍕 Для шумной компании</button>\n' +
        '</div>\n' +
        '<button class="button button-teal recommend-button" type="button">Подобрать <img src="../img/arrow-right.svg" alt="" width="9" height="9"></button>\n' +
        '<p class="mood-hint"></p>\n' +
        '<ul class="recommend-list"></ul>';
    const mascotFull = '<section class="mascot">\n' + indent(mascotInfo) + '\n' + indent(moodsHtml) + '\n</section>';

    const mascotCss =
        '.mascot {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 24px;\n    align-items: center;\n    justify-content: space-between;\n' +
        '    padding: 32px;\n    background: #1c1a26;\n    border: 1px solid #2c2f34;\n    border-radius: 16px;\n}\n\n' +
        '.mascot-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-width: 80px;\n    width: 80px;\n' +
        '    height: 80px;\n    border-radius: 16px;\n    background: #353340;\n}\n\n' +
        '.moods {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' +
        '.mood {\n    padding: 8px 14px;\n    font-size: 12px;\n    background: #2a2935;\n    border: 1px solid #2c2f34;\n    border-radius: 12px;\n}\n\n' +
        '.mood.active {\n    color: #003736;\n    background: #a0cfce;\n}\n';
    const mascotReady =
        '.mascot-info {\n    display: flex;\n    gap: 20px;\n    align-items: center;\n}\n\n' +
        '.mascot h2 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 22px;\n}\n\n' +
        '.mascot p {\n    font-size: 14px;\n    color: #c0c8c7;\n}\n\n' +
        '.mood-hint {\n    width: 100%;\n    color: #a0cfce;\n}\n\n' +
        '.recommend-list {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    width: 100%;\n}\n';

    function reviewHtml(film, stars, text, pic, name, role) {
        return '<article class="review">\n    <div class="review-top">\n        <div class="chip chip-small">' + film + '</div>\n' +
            '        <p class="stars">' + stars + '</p>\n    </div>\n    <p class="review-text">' + text + '</p>\n' +
            '    <div class="review-author">\n        <img src="../img/' + pic + '" alt="" width="28" height="28">\n' +
            '        <p><b>' + name + '</b> ' + role + '</p>\n    </div>\n</article>';
    }
    const reviewsHtml =
        '<section class="reviews">\n    <div class="section-head">\n        <div>\n' +
        '            <h2 class="title title-blue">Свежие отзывы и рецензии</h2>\n            <p class="section-sub">Что пишут зрители Киносферы</p>\n' +
        '        </div>\n    </div>\n    <div class="reviews-grid">\n' +
        indent(indent(reviewHtml('Дюна: Часть вторая', '★★★★★ 10/10', '«Визуальный размах Вильнёва впечатляет».', 'review-1.jpg', 'Михаил Белов', 'Кинокритик'))) + '\n' +
        indent(indent(reviewHtml('Бедные-несчастные', '★★★★☆ 9/10', '«Эмма Стоун выдала невероятный перформанс».', 'review-2.jpg', 'Екатерина Волкова', 'Премиум-зритель'))) + '\n' +
        indent(indent(reviewHtml('Анатомия падения', '★★★★☆ 8.8/10', '«Держит в напряжении до последнего кадра».', 'review-3.jpg', 'Даниил Романов', 'Киноклуб'))) +
        '\n    </div>\n</section>';

    const dataJs = T.js.data;

    QUEST_TASKS.home = [
        // 1
        T.base(),

        // 2
        T.header('home'),

        // 3
        {
            title: 'Фильм недели: разметка',
            kind: 'HTML',
            text: '<p>Первый экран главной — фильм недели. Метки, название и описание уже есть. Под ними добавь блок с кнопками ' +
                '<code>&lt;div class="hero-buttons"&gt;</code>, а в нём:</p><ul>' +
                '<li>ссылку-кнопку <code>&lt;a class="button button-teal" href="../catalog/catalog.html"&gt;Весь каталог&lt;/a&gt;</code></li>' +
                '<li>ссылку-кнопку на комнаты <code>../rooms/rooms.html</code> с классами <code>button button-ghost</code>, иконкой ' +
                '<code>&lt;img src="../img/room.svg" alt=""&gt;</code> и текстом «Создать комнату»</li>' +
                '<li>круглую кнопку-закладку <code>&lt;button class="round-button bookmark" type="button"&gt;</code>, а внутри картинку ' +
                '<code>../img/bookmark.svg</code> с <code>alt="В мой список"</code></li></ul>',
            hint: ['<div class="...">', '<a class="..." href="...">', '<img src="..." alt="...">', '<button type="button">'],
            start: { html: heroStart, css: heroCss + '\n' + heroReady + '\n' + T.css.chips + '\n' + T.css.buttons + '\n' + roundCss },
            answer: { html: heroFull },
            checks: [
                ['Есть блок .hero-buttons', function (t) { return !!t.q('.hero-content .hero-buttons'); }],
                ['Кнопка «Весь каталог» ведёт в подборки', function (t) {
                    const a = t.q('.hero-buttons a.button-teal');
                    return !!a && a.getAttribute('href') === '../catalog/catalog.html' && a.textContent.trim() === 'Весь каталог';
                }],
                ['Кнопка «Создать комнату» ведёт в комнаты', function (t) {
                    const a = t.q('.hero-buttons a.button-ghost');
                    return !!a && a.getAttribute('href') === '../rooms/rooms.html' && a.textContent.indexOf('Создать комнату') >= 0;
                }],
                ['В ней иконка room.svg', function (t) { return t.attr('.hero-buttons a.button-ghost img', 'src') === '../img/room.svg'; }],
                ['Есть кнопка-закладка .round-button.bookmark', function (t) {
                    const b = t.q('.hero-buttons button.round-button.bookmark');
                    return !!b && b.getAttribute('type') === 'button';
                }],
                ['В закладке картинка с alt «В мой список»', function (t) {
                    return t.attr('.bookmark img', 'src') === '../img/bookmark.svg' && t.attr('.bookmark img', 'alt') === 'В мой список';
                }],
            ],
        },

        // 4
        {
            title: 'Фильм недели: оформление',
            kind: 'CSS',
            text: '<p>Разложим первый экран на две колонки: слева текст, справа кадр из фильма.</p><ul>' +
                '<li><code>.hero</code>: сетка из колонок <code>3fr 2fr</code>, промежуток <code>32px</code>, по центру по вертикали, отступы <code>40px</code>, ' +
                'фон <code>#1c1a26</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>24px</code></li>' +
                '<li><code>.hero-content</code>: всё столбиком, промежуток <code>16px</code></li>' +
                '<li><code>.hero h1</code>: шрифт <code>"PT Serif", Georgia, serif</code>, размер <code>48px</code></li>' +
                '<li><code>.hero-poster</code>: на всю ширину колонки, высота <code>420px</code>, кадр без искажений (<code>object-fit: cover</code>), скругление <code>16px</code></li></ul>',
            hint: ['display: grid', 'grid-template-columns: 3fr 2fr', 'flex-direction: column', 'object-fit: cover', 'border: 1px solid ...'],
            start: {
                html: heroFull,
                css: '.hero {\n    \n}\n\n.hero-content {\n    \n}\n\n.hero h1 {\n    \n}\n\n.hero-poster {\n    \n}\n\n/* Уже готово */\n' +
                    heroReady + '\n' + T.css.chips + '\n' + T.css.buttons + '\n' + roundCss,
            },
            answer: { css: heroCss },
            checks: [
                ['.hero — сетка 3fr 2fr', function (t) {
                    return t.css('.hero', 'display') === 'grid' && t.rule('.hero', 'grid-template-columns') === '3fr 2fr';
                }],
                ['.hero: промежуток 32px, отступы 40px', function (t) {
                    return t.css('.hero', 'column-gap') === '32px' && t.px('.hero', 'padding-top') === 40;
                }],
                ['.hero: фон #1c1a26, скругление 24px', function (t) {
                    return t.color('.hero', 'background-color') === '#1c1a26' && t.px('.hero', 'border-top-left-radius') === 24;
                }],
                ['.hero: рамка 1px', function (t) { return Math.abs(t.px('.hero', 'border-top-width') - 1) <= 0.5; }],
                ['.hero-content: столбиком, промежуток 16px', function (t) {
                    return t.css('.hero-content', 'flex-direction') === 'column' && t.css('.hero-content', 'row-gap') === '16px';
                }],
                ['Заголовок: PT Serif 48px', function (t) {
                    return t.css('.hero h1', 'font-family').indexOf('PT Serif') >= 0 && t.px('.hero h1', 'font-size') === 48;
                }],
                ['Кадр: высота 420px, object-fit: cover', function (t) {
                    return t.px('.hero-poster', 'height') === 420 && t.css('.hero-poster', 'object-fit') === 'cover';
                }],
                ['Кадр: на всю ширину, скругление 16px', function (t) {
                    return t.rule('.hero-poster', 'width') === '100%' && t.px('.hero-poster', 'border-top-left-radius') === 16;
                }],
            ],
        },

        // 5
        {
            title: 'Метки и кнопки',
            kind: 'CSS',
            text: '<p>На главной много меток-«чипов» и кнопок. Оформим их:</p><ul>' +
                '<li><code>.chip</code>: в строку, по центру, промежуток <code>6px</code>, отступы <code>4px 12px</code>, текст <code>12px</code>, ' +
                'фон <code>#353340</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>999px</code></li>' +
                '<li><code>.chip-teal</code>: цвет <code>#a0cfce</code>, фон <code>#2c4a4b</code>; <code>.chip-purple</code>: цвет <code>#debbe7</code>, фон <code>#5a3f64</code></li>' +
                '<li><code>.button-teal</code>: цвет <code>#003736</code>, фон <code>#a0cfce</code></li>' +
                '<li><code>.round-button</code>: круг <code>48×48px</code>, картинка по центру, фон <code>#2a2935</code></li></ul>',
            hint: ['border-radius: 999px', 'border-radius: 50%', 'justify-content: center'],
            start: {
                html: heroFull,
                css: '.chip {\n    \n}\n\n.chip-teal {\n    \n}\n\n.chip-purple {\n    \n}\n\n.button-teal {\n    \n}\n\n.round-button {\n    \n}\n\n/* Уже готово */\n' +
                    heroCss + '\n' + heroReady + '\n' +
                    '.button {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding: 14px 28px;\n    font-weight: 700;\n' +
                    '    border: 1px solid #2c2f34;\n    border-radius: 999px;\n}\n\n.button-ghost {\n    color: #debbe7;\n    background: #2f2537;\n}\n',
            },
            answer: {
                css: T.css.chips + '\n.button-teal {\n    color: #003736;\n    background: #a0cfce;\n    border-color: #a0cfce;\n}\n\n' + roundCss,
            },
            checks: [
                ['.chip: в строку, промежуток 6px', function (t) {
                    return t.css('.chip', 'display') === 'flex' && t.css('.chip', 'column-gap') === '6px';
                }],
                ['.chip: отступы 4px 12px, текст 12px', function (t) {
                    return t.px('.chip', 'padding-top') === 4 && t.px('.chip', 'padding-left') === 12 && t.px('.chip', 'font-size') === 12;
                }],
                ['.chip: фон #353340, скругление 999px', function (t) {
                    return t.color('.chip:not(.chip-teal):not(.chip-purple)', 'background-color') === '#353340' &&
                        t.px('.chip', 'border-top-left-radius') === 999;
                }],
                ['.chip-teal: цвет #a0cfce, фон #2c4a4b', function (t) {
                    return t.color('.chip-teal', 'color') === '#a0cfce' && t.color('.chip-teal', 'background-color') === '#2c4a4b';
                }],
                ['.chip-purple: цвет #debbe7, фон #5a3f64', function (t) {
                    return t.color('.chip-purple', 'color') === '#debbe7' && t.color('.chip-purple', 'background-color') === '#5a3f64';
                }],
                ['.button-teal: цвет #003736 на #a0cfce', function (t) {
                    return t.color('.button-teal', 'color') === '#003736' && t.color('.button-teal', 'background-color') === '#a0cfce';
                }],
                ['.round-button: круг 48×48px', function (t) {
                    return t.px('.round-button', 'width') === 48 && t.px('.round-button', 'height') === 48 &&
                        t.round('.round-button');
                }],
                ['.round-button: фон #2a2935, картинка по центру', function (t) {
                    return t.color('.round-button', 'background-color') === '#2a2935' && t.css('.round-button', 'justify-content') === 'center';
                }],
            ],
        },

        // 6
        {
            title: 'Бэтти: разметка',
            kind: 'HTML',
            text: '<p>Киномышь Бэтти подбирает фильм под настроение. Текст про Бэтти готов, добавь под ним:</p><ul>' +
                '<li><code>&lt;div class="moods"&gt;</code> с четырьмя кнопками <code>&lt;button class="mood" type="button" data-mood="..."&gt;</code>: ' +
                '«🍿 На одном дыхании» (<code>adventure</code>), «🕯️ Мрачный триллер» (<code>thriller</code>), «🚀 Космическая сага» (<code>space</code>), ' +
                '«🍕 Для шумной компании» (<code>group</code>)</li>' +
                '<li>кнопку <code>&lt;button class="button button-teal recommend-button" type="button"&gt;Подобрать&lt;/button&gt;</code></li>' +
                '<li>пустые <code>&lt;p class="mood-hint"&gt;&lt;/p&gt;</code> и <code>&lt;ul class="recommend-list"&gt;&lt;/ul&gt;</code> — их заполнит JS</li></ul>',
            hint: ['<button data-mood="...">', '<p class="...">', '<ul class="...">'],
            start: {
                html: '<section class="mascot">\n' + indent(mascotInfo) + '\n\n    <!-- сюда настроения, кнопку и пустые блоки -->\n\n</section>',
                css: mascotCss + '\n' + mascotReady + '\n' + T.css.chips + '\n' + T.css.buttons,
            },
            answer: { html: mascotFull },
            checks: [
                ['В .moods 4 кнопки .mood', function (t) { return t.all('.moods button.mood').length === 4; }],
                ['data-mood: adventure, thriller, space, group', function (t) {
                    return t.all('.mood').map(function (b) { return b.dataset.mood; }).join(',') === 'adventure,thriller,space,group';
                }],
                ['У кнопок type="button"', function (t) {
                    return t.all('.mood').every(function (b) { return b.getAttribute('type') === 'button'; });
                }],
                ['Кнопка «Подобрать» с классом recommend-button', function (t) {
                    const b = t.q('button.recommend-button');
                    return !!b && b.textContent.indexOf('Подобрать') >= 0;
                }],
                ['Есть пустые .mood-hint и .recommend-list', function (t) { return !!t.q('p.mood-hint') && !!t.q('ul.recommend-list'); }],
            ],
        },

        // 7
        {
            title: 'Бэтти: оформление',
            kind: 'CSS',
            text: '<p>Оформим блок Бэтти:</p><ul>' +
                '<li><code>.mascot</code>: в строку с переносом, промежуток <code>24px</code>, по центру, края разнесены, отступы <code>32px</code>, ' +
                'фон <code>#1c1a26</code>, скругление <code>16px</code></li>' +
                '<li><code>.mascot-icon</code>: квадрат <code>80×80px</code> (и <code>min-width: 80px</code>), скругление <code>16px</code>, фон <code>#353340</code>, Бэтти по центру</li>' +
                '<li><code>.moods</code>: кнопки в строку с переносом, промежуток <code>8px</code></li>' +
                '<li><code>.mood</code>: отступы <code>8px 14px</code>, фон <code>#2a2935</code>, скругление <code>12px</code></li>' +
                '<li><code>.mood.active</code> (выбранное настроение): цвет <code>#003736</code>, фон <code>#a0cfce</code></li></ul>',
            hint: ['flex-wrap: wrap', 'min-width', '.mood.active'],
            start: {
                html: mascotFull.replace('class="mood" type="button" data-mood="space"', 'class="mood active" type="button" data-mood="space"'),
                css: '.mascot {\n    \n}\n\n.mascot-icon {\n    \n}\n\n.moods {\n    \n}\n\n.mood {\n    \n}\n\n.mood.active {\n    \n}\n\n/* Уже готово */\n' +
                    mascotReady + '\n' + T.css.chips + '\n' + T.css.buttons,
            },
            answer: { css: mascotCss },
            checks: [
                ['.mascot: в строку с переносом, промежуток 24px', function (t) {
                    return t.css('.mascot', 'display') === 'flex' && t.css('.mascot', 'flex-wrap') === 'wrap' && t.css('.mascot', 'column-gap') === '24px';
                }],
                ['.mascot: края разнесены, отступы 32px', function (t) {
                    return t.css('.mascot', 'justify-content') === 'space-between' && t.px('.mascot', 'padding-top') === 32;
                }],
                ['.mascot: фон #1c1a26, скругление 16px', function (t) {
                    return t.color('.mascot', 'background-color') === '#1c1a26' && t.px('.mascot', 'border-top-left-radius') === 16;
                }],
                ['.mascot-icon: 80×80px, не сжимается', function (t) {
                    return t.px('.mascot-icon', 'width') === 80 && t.px('.mascot-icon', 'height') === 80 && t.px('.mascot-icon', 'min-width') === 80;
                }],
                ['.mascot-icon: фон #353340, Бэтти по центру', function (t) {
                    return t.color('.mascot-icon', 'background-color') === '#353340' && t.css('.mascot-icon', 'justify-content') === 'center';
                }],
                ['.moods: в строку с переносом, промежуток 8px', function (t) {
                    return t.css('.moods', 'display') === 'flex' && t.css('.moods', 'flex-wrap') === 'wrap' && t.css('.moods', 'column-gap') === '8px';
                }],
                ['.mood: фон #2a2935, скругление 12px', function (t) {
                    return t.color('.mood:not(.active)', 'background-color') === '#2a2935' && t.px('.mood', 'border-top-left-radius') === 12;
                }],
                ['Выбранное настроение: #003736 на #a0cfce', function (t) {
                    return t.color('.mood.active', 'color') === '#003736' && t.color('.mood.active', 'background-color') === '#a0cfce';
                }],
            ],
        },

        // 8
        {
            title: 'Отзывы',
            kind: 'CSS',
            text: '<p>Внизу главной — три отзыва зрителей. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.title</code> (заголовок раздела): шрифт PT Serif <code>30px</code>, отступ слева <code>16px</code> и цветная полоска слева ' +
                '<code>border-left: 6px solid #a0cfce</code>; <code>.title-blue</code>: полоска <code>#aec8f2</code></li>' +
                '<li><code>.reviews-grid</code>: сетка из трёх колонок (<code>repeat(3, 1fr)</code>), промежуток <code>16px</code></li>' +
                '<li><code>.review</code>: столбиком, промежуток <code>16px</code>, отступы <code>20px</code>, фон <code>#2a2935</code>, скругление <code>16px</code></li>' +
                '<li><code>.review-author img</code>: круглое фото <code>28×28px</code></li></ul>',
            hint: ['border-left: 6px solid ...', 'grid-template-columns: repeat(3, 1fr)'],
            start: {
                html: reviewsHtml,
                css: '.title {\n    \n}\n\n.title-blue {\n    \n}\n\n.reviews-grid {\n    \n}\n\n.review {\n    \n}\n\n.review-author img {\n    \n}\n\n/* Уже готово */\n' +
                    '.section-head {\n    display: flex;\n    justify-content: space-between;\n    margin-bottom: 24px;\n}\n\n' +
                    '.section-sub {\n    font-size: 13px;\n    color: #c0c8c7;\n}\n\n' +
                    '.review-top {\n    display: flex;\n    justify-content: space-between;\n}\n\n.stars {\n    font-size: 11px;\n    color: #a0cfce;\n}\n\n' +
                    '.review-text {\n    font-size: 13px;\n}\n\n.review-author {\n    display: flex;\n    gap: 10px;\n    align-items: center;\n    font-size: 10px;\n}\n\n' + T.css.chips,
            },
            answer: {
                css: '.title {\n    padding-left: 16px;\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 30px;\n    font-weight: 700;\n' +
                    '    line-height: 1.25;\n    border-left: 6px solid #a0cfce;\n}\n\n.title-blue {\n    border-left: 6px solid #aec8f2;\n}\n\n' + T.css.reviews,
            },
            checks: [
                ['.title: PT Serif 30px', function (t) {
                    return t.css('.title', 'font-family').indexOf('PT Serif') >= 0 && t.px('.title', 'font-size') === 30;
                }],
                ['.title: полоска слева 6px, отступ 16px', function (t) {
                    return Math.abs(t.px('.title', 'border-left-width') - 6) <= 0.5 && t.px('.title', 'padding-left') === 16;
                }],
                ['.title-blue: полоска #aec8f2', function (t) { return t.color('.title-blue', 'border-left-color') === '#aec8f2'; }],
                ['.reviews-grid — сетка из 3 колонок', function (t) {
                    return t.css('.reviews-grid', 'display') === 'grid' && t.css('.reviews-grid', 'grid-template-columns').split(' ').length === 3;
                }],
                ['.reviews-grid: промежуток 16px', function (t) { return t.css('.reviews-grid', 'column-gap') === '16px'; }],
                ['.review: столбиком, промежуток 16px, отступы 20px', function (t) {
                    return t.css('.review', 'flex-direction') === 'column' && t.css('.review', 'row-gap') === '16px' && t.px('.review', 'padding-top') === 20;
                }],
                ['.review: фон #2a2935, скругление 16px', function (t) {
                    return t.color('.review', 'background-color') === '#2a2935' && t.px('.review', 'border-top-left-radius') === 16;
                }],
                ['Фото автора: круг 28×28px', function (t) {
                    return t.px('.review-author img', 'width') === 28 && t.round('.review-author img');
                }],
            ],
        },

        // 9
        T.footer('home'),

        // 10
        {
            title: 'JS: бургер и «В мой список»',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>закладка <code>.bookmark</code> добавляет «Дюну» в мой список. При клике: если <code>data.saved.includes(\'dune\')</code> — убери её ' +
                '(<code>data.saved = data.saved.filter(...)</code>) и сними класс <code>saved</code>, иначе — добавь (<code>push</code>) и поставь класс. ' +
                'Потом сохрани <code>saveData(data)</code></li></ul>' +
                '<p>Список хранится в <code>localStorage</code>, поэтому страница «Профиль» его увидит.</p>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", "data.saved.includes('dune')",
                'data.saved.filter(function (id) { return id !== ... })', '.push(...)', 'classList.add / remove', 'if / else', 'saveData(data)', 'localStorage'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + heroButtons,
                css: T.burgerCss + '\n' + T.css.buttons + '\n' + roundCss,
                js: dataJs + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const bookmark = document.querySelector('.bookmark');\n\n// 1) бургер\n\n\n// 2) закладка «В мой список»\n",
            },
            answer: {
                js: dataJs + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const bookmark = document.querySelector('.bookmark');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "bookmark.addEventListener('click', function () {\n    if (data.saved.includes('dune')) {\n" +
                    "        data.saved = data.saved.filter(function (id) {\n            return id !== 'dune';\n        });\n" +
                    "        bookmark.classList.remove('saved');\n    } else {\n        data.saved.push('dune');\n" +
                    "        bookmark.classList.add('saved');\n    }\n    saveData(data);\n});",
            },
            checks: T.burgerChecks.concat([
                ['Клик по закладке — класс saved', function (t) {
                    t.click('.bookmark');
                    return t.has('.bookmark', 'saved');
                }],
                ['«Дюна» сохранена в localStorage', function (t) {
                    const s = T.saved();
                    return !!s && s.saved.join(',') === 'dune';
                }],
                ['Второй клик убирает «Дюну»', function (t) {
                    t.click('.bookmark');
                    const s = T.saved();
                    return !t.has('.bookmark', 'saved') && !!s && s.saved.length === 0;
                }],
            ]),
        },

        // 11
        {
            title: 'JS: выбор настроения',
            kind: 'JS',
            text: '<p>Кнопки настроений должны выбираться и сниматься. Для каждой кнопки <code>.mood</code> (<code>forEach</code>) при клике ' +
                'переключай класс <code>active</code> — стиль выбранной кнопки уже готов. И очищай подсказку: <code>moodHint.textContent = \'\'</code></p>',
            hint: ['querySelectorAll', 'forEach', "classList.toggle('active')", 'textContent'],
            start: {
                html: moodsHtml.replace('<p class="mood-hint"></p>', '<p class="mood-hint">Сначала выбери настроение.</p>'),
                css: mascotCss + '\n' + mascotReady + '\n' + T.css.buttons,
                js: "const moods = document.querySelectorAll('.mood');\nconst moodHint = document.querySelector('.mood-hint');\n\n" +
                    '// кнопки настроений выбираются и снимаются\n',
            },
            answer: {
                js: "const moods = document.querySelectorAll('.mood');\nconst moodHint = document.querySelector('.mood-hint');\n\n" +
                    "moods.forEach(function (mood) {\n    mood.addEventListener('click', function () {\n        mood.classList.toggle('active');\n" +
                    "        moodHint.textContent = '';\n    });\n});",
            },
            checks: [
                ['Клик выбирает настроение', function (t) {
                    t.all('.mood')[1].click();
                    return t.all('.mood')[1].classList.contains('active');
                }],
                ['Подсказка очищается', function (t) { return t.text('.mood-hint') === ''; }],
                ['Можно выбрать несколько', function (t) {
                    t.all('.mood')[2].click();
                    return t.all('.mood.active').length === 2;
                }],
                ['Повторный клик снимает выбор', function (t) {
                    t.all('.mood')[1].click();
                    return !t.all('.mood')[1].classList.contains('active') && t.all('.mood.active').length === 1;
                }],
            ],
        },

        // 12
        {
            title: 'JS: Бэтти подбирает фильм',
            kind: 'JS',
            text: '<p>По кнопке «Подобрать» Бэтти показывает фильмы под выбранные настроения. У каждого фильма в списке <code>films</code> есть ' +
                '<code>moods</code> — его настроения. При клике на <code>.recommend-button</code>:</p><ul>' +
                '<li>собери выбранные настроения: <code>const selected = []</code>, и для каждой кнопки с классом <code>active</code> ' +
                '<code>selected.push(mood.dataset.mood)</code></li>' +
                '<li>очисти список <code>recommendList.textContent = \'\'</code>; если ничего не выбрано — напиши в подсказку «Сначала выбери настроение.» и <code>return</code></li>' +
                '<li>для каждого фильма проверь, есть ли хоть одно его настроение в <code>selected</code>. Если есть — создай ' +
                '<code>&lt;li&gt;</code> с названием (<code>document.createElement(\'li\')</code>) и добавь в список (<code>append</code>)</li></ul>',
            hint: ['const selected = []', "classList.contains('active')", 'dataset.mood', 'let fits = false', "document.createElement('li')", '.append(...)', 'return'],
            start: {
                html: moodsHtml,
                css: mascotCss + '\n' + mascotReady + '\n' + T.css.buttons + '\n' + T.css.chips,
                js: T.js.films + "\nconst moods = document.querySelectorAll('.mood');\nconst moodHint = document.querySelector('.mood-hint');\n" +
                    "const recommendList = document.querySelector('.recommend-list');\n\n" +
                    "moods.forEach(function (mood) {\n    mood.addEventListener('click', function () {\n        mood.classList.toggle('active');\n" +
                    "        moodHint.textContent = '';\n    });\n});\n\n" +
                    "document.querySelector('.recommend-button').addEventListener('click', function () {\n    // подбери фильмы\n\n});\n",
            },
            answer: {
                js: T.js.films + "\nconst moods = document.querySelectorAll('.mood');\nconst moodHint = document.querySelector('.mood-hint');\n" +
                    "const recommendList = document.querySelector('.recommend-list');\n\n" +
                    "moods.forEach(function (mood) {\n    mood.addEventListener('click', function () {\n        mood.classList.toggle('active');\n" +
                    "        moodHint.textContent = '';\n    });\n});\n\n" +
                    "document.querySelector('.recommend-button').addEventListener('click', function () {\n    const selected = [];\n" +
                    "    moods.forEach(function (mood) {\n        if (mood.classList.contains('active')) {\n            selected.push(mood.dataset.mood);\n        }\n    });\n\n" +
                    "    recommendList.textContent = '';\n    if (selected.length === 0) {\n        moodHint.textContent = 'Сначала выбери настроение.';\n        return;\n    }\n\n" +
                    "    films.forEach(function (film) {\n        let fits = false;\n        film.moods.forEach(function (mood) {\n" +
                    "            if (selected.includes(mood)) {\n                fits = true;\n            }\n        });\n" +
                    "        if (fits) {\n            const item = document.createElement('li');\n            item.textContent = film.title;\n" +
                    "            recommendList.append(item);\n        }\n    });\n});",
            },
            checks: [
                ['Без настроения — подсказка «Сначала выбери настроение.»', function (t) {
                    t.click('.recommend-button');
                    return t.text('.mood-hint') === 'Сначала выбери настроение.' && t.all('.recommend-list li').length === 0;
                }],
                ['«Мрачный триллер» → 2 фильма', function (t) {
                    t.click('.mood[data-mood="thriller"]');
                    t.click('.recommend-button');
                    return t.all('.recommend-list li').length === 2;
                }],
                ['Среди них «Бегущий по лезвию 2049»', function (t) {
                    return t.all('.recommend-list li').some(function (li) { return li.textContent.trim() === 'Бегущий по лезвию 2049'; });
                }],
                ['Триллер + космос → 4 фильма без повторов', function (t) {
                    t.click('.mood[data-mood="space"]');
                    t.click('.recommend-button');
                    return t.all('.recommend-list li').length === 4;
                }],
            ],
        },
    ];
})();
