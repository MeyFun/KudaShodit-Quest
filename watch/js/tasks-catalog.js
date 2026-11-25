// =========================================================
// Задачи страницы «Подборки» — Полина Федорченко
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    function card(id, poster, alt, rating, year, length, title, cast) {
        return '<article class="card" data-film="' + id + '">\n' +
            '    <div class="card-poster">\n' +
            '        <img src="../img/' + poster + '" alt="' + alt + '">\n' +
            '        <div class="rating"><img src="../img/star.svg" alt="" width="10" height="10"> ' + rating + '</div>\n' +
            '    </div>\n' +
            '    <div class="card-body">\n' +
            '        <div class="card-meta"><p>' + year + '</p><p>' + length + '</p></div>\n' +
            '        <h3>' + title + '</h3>\n' +
            '        <p class="card-cast">' + cast + '</p>\n' +
            '        <button class="save-button" type="button">В мой список</button>\n' +
            '    </div>\n' +
            '</article>';
    }
    const c1 = card('creator', 'poster-creator.jpg', 'Постер фильма «Создатель»', '8.1', '2024 • Фантастика', '2 ч 13 мин', 'Создатель', 'Джон Дэвид Вашингтон, Джемма Чан');
    const c2 = card('flower-moon', 'poster-flower-moon.jpg', 'Постер фильма «Убийцы цветочной луны»', '8.6', '2024 • Триллер', '1 ч 58 мин', 'Убийцы цветочной луны', 'Леонардо ДиКаприо, Роберт Де Ниро');
    const c3 = card('napoleon', 'poster-napoleon.jpg', 'Постер фильма «Наполеон»', '7.8', '2024 • Биография', '2 ч 38 мин', 'Наполеон: Режиссерская версия', 'Хоакин Феникс, Ванесса Кирби');
    const cardsHtml = '<div class="cards">\n' + indent(c1) + '\n\n' + indent(c2) + '\n\n' + indent(c3) + '\n</div>';

    const searchHtml =
        '<div class="section-head">\n    <h2 class="title">Новинки и горячие премьеры</h2>\n    <form class="search">\n' +
        '        <input name="query" type="text" placeholder="Фильм, жанр или актёр">\n' +
        '        <button type="submit"><img src="../img/search.svg" alt="Найти" width="14" height="14"></button>\n    </form>\n</div>';

    function franchise(cid, pic, chip, chipCls, title, icon, iw, ih, note) {
        return '<article class="franchise" data-collection="' + cid + '">\n' +
            '    <img class="franchise-pic" src="../img/' + pic + '" alt="">\n' +
            '    <div class="franchise-body">\n' +
            '        <div class="chip ' + chipCls + ' chip-small">' + chip + '</div>\n' +
            '        <h3>' + title + '</h3>\n' +
            '        <p><img src="../img/' + icon + '" alt="" width="' + iw + '" height="' + ih + '"> ' + note + '</p>\n' +
            '        <button class="link franchise-button" type="button">Список фильмов</button>\n' +
            '        <ol class="franchise-list hide"></ol>\n' +
            '    </div>\n' +
            '</article>';
    }
    const f1 = franchise('potter', 'franchise-potter.jpg', '8 фильмов в 4K', 'chip-purple', 'Гарри Поттер &amp; Волшебный мир', 'icon-magic.svg', 13, 13, 'Марафон выходного дня');
    const f2 = franchise('lotr', 'franchise-lotr.jpg', 'Расширенные версии', 'chip-teal', 'Властелин колец: Трилогия', 'icon-award.svg', 6, 12, '17 премий Оскар');
    const franchisesHtml = '<div class="franchises">\n' + indent(f1) + '\n\n' + indent(f2) + '\n</div>';

    const cardCss =
        '.cards {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n}\n\n' +
        '.card {\n    background: #1c1a26;\n    border: 1px solid #2c2f34;\n    border-radius: 16px;\n}\n\n' +
        '.card-body {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    padding: 16px;\n}\n\n' +
        '.card-meta {\n    display: flex;\n    justify-content: space-between;\n    font-size: 11px;\n    color: #c0c8c7;\n}\n\n' +
        '.card h3 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 18px;\n}\n';
    const posterCss =
        '.card-poster {\n    position: relative;\n}\n\n' +
        '.card-poster img {\n    width: 100%;\n    aspect-ratio: 2 / 3;\n    object-fit: cover;\n    border-radius: 16px 16px 0 0;\n}\n\n' +
        '.rating {\n    position: absolute;\n    top: 12px;\n    left: 12px;\n    display: flex;\n    gap: 4px;\n    align-items: center;\n' +
        '    padding: 4px 10px;\n    font-weight: 700;\n    color: #a0cfce;\n    background: #0e0d18;\n    border-radius: 999px;\n}\n';
    const saveCss =
        '.card-cast {\n    font-size: 12px;\n    color: #c0c8c7;\n}\n\n' +
        '.save-button {\n    align-self: flex-start;\n    padding: 8px 14px;\n    font-size: 12px;\n    color: #a0cfce;\n    background: #201e2a;\n' +
        '    border: 1px solid #4d6e6e;\n    border-radius: 999px;\n}\n\n.save-button.saved {\n    color: #003736;\n    background: #a0cfce;\n}\n';
    const franchiseCss =
        '.franchises {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n}\n\n' +
        '.franchise {\n    background: #1c1a26;\n    border: 1px solid #2c2f34;\n    border-radius: 16px;\n}\n\n' +
        '.franchise-pic {\n    width: 100%;\n    height: 140px;\n    object-fit: cover;\n    border-radius: 16px 16px 0 0;\n}\n\n' +
        '.franchise-body {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n    padding: 20px;\n}\n\n' +
        '.franchise .chip {\n    align-self: flex-start;\n}\n';
    const franchiseReady =
        '.franchise h3 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 20px;\n}\n\n' +
        '.franchise p {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    font-size: 13px;\n    color: #c0c8c7;\n}\n\n' +
        '.franchise-button {\n    align-self: flex-start;\n    padding: 0;\n}\n\n' +
        '.franchise-list {\n    padding-left: 20px;\n    list-style: decimal;\n    font-size: 13px;\n}\n';

    QUEST_TASKS.catalog = [
        // 1
        T.base(),

        // 2
        T.header('catalog'),

        // 3
        {
            title: 'Заголовок и поиск',
            kind: 'CSS',
            text: '<p>Вверху подборок — заголовок раздела и строка поиска. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.section-head</code>: в строку, заголовок слева, поиск справа (<code>space-between</code>), по центру по вертикали, промежуток <code>16px</code>, снизу <code>24px</code></li>' +
                '<li><code>.title</code>: шрифт <code>"PT Serif", Georgia, serif</code>, <code>30px</code>, отступ слева <code>16px</code> и полоска слева <code>border-left: 6px solid #a0cfce</code></li>' +
                '<li><code>.search</code>: в строку, по центру, промежуток <code>8px</code>, ширина <code>280px</code>, отступы <code>10px 16px</code>, ' +
                'фон <code>#201e2a</code>, скругление <code>999px</code></li>' +
                '<li><code>.search input</code>: на всю ширину, без рамки, без фона и без обводки (<code>outline: none</code>)</li></ul>',
            hint: ['justify-content: space-between', 'border-left: 6px solid ...', 'width', 'background: none', 'border: none', 'outline: none'],
            start: {
                html: searchHtml,
                css: '.section-head {\n    \n}\n\n.title {\n    \n}\n\n.search {\n    \n}\n\n.search input {\n    \n}\n\n/* Уже готово */\n' +
                    '.search button {\n    padding: 4px;\n    background: none;\n    border: none;\n}\n',
            },
            answer: {
                css: '.section-head {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 24px;\n}\n\n' +
                    '.title {\n    padding-left: 16px;\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 30px;\n    font-weight: 700;\n' +
                    '    border-left: 6px solid #a0cfce;\n}\n\n' +
                    '.search {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    width: 280px;\n    padding: 10px 16px;\n' +
                    '    background: #201e2a;\n    border: 1px solid #2c2f34;\n    border-radius: 999px;\n}\n\n' +
                    '.search input {\n    width: 100%;\n    background: none;\n    border: none;\n    outline: none;\n}\n\n' +
                    '.search button {\n    padding: 4px;\n    background: none;\n    border: none;\n}',
            },
            checks: [
                ['.section-head: в строку, края разнесены', function (t) {
                    return t.css('.section-head', 'display') === 'flex' && t.css('.section-head', 'justify-content') === 'space-between';
                }],
                ['.section-head: промежуток 16px, снизу 24px', function (t) {
                    return t.css('.section-head', 'column-gap') === '16px' && t.px('.section-head', 'margin-bottom') === 24;
                }],
                ['.title: PT Serif 30px', function (t) {
                    return t.css('.title', 'font-family').indexOf('PT Serif') >= 0 && t.px('.title', 'font-size') === 30;
                }],
                ['.title: полоска слева 6px #a0cfce', function (t) {
                    return Math.abs(t.px('.title', 'border-left-width') - 6) <= 0.5 && t.color('.title', 'border-left-color') === '#a0cfce';
                }],
                ['.search: в строку, ширина 280px', function (t) {
                    return t.css('.search', 'display') === 'flex' && t.rule('.search', 'width') === '280px';
                }],
                ['.search: фон #201e2a, скругление 999px', function (t) {
                    return t.color('.search', 'background-color') === '#201e2a' && t.px('.search', 'border-top-left-radius') === 999;
                }],
                ['Поле поиска без рамки, фона и обводки', function (t) {
                    return t.css('.search input', 'border-top-style') === 'none' && t.css('.search input', 'outline-style') === 'none' &&
                        t.color('.search input', 'background-color') === 'transparent';
                }],
            ],
        },

        // 4
        {
            title: 'Карточки фильмов: разметка',
            kind: 'HTML',
            text: '<p>Каждый фильм — карточка с постером, рейтингом и кнопкой «В мой список». Две карточки готовы, сделай третью по образцу:</p><ul>' +
                '<li><code>&lt;article class="card" data-film="napoleon"&gt;</code> (<code>data-film</code> нужен JS, чтобы знать, какой это фильм)</li>' +
                '<li>постер <code>../img/poster-napoleon.jpg</code> с <code>alt="Постер фильма «Наполеон»"</code> и рейтинг <code>7.8</code> — как в первой карточке</li>' +
                '<li>в <code>.card-body</code>: строка <code>.card-meta</code> («2024 • Биография» и «2 ч 38 мин»), заголовок ' +
                '<code>&lt;h3&gt;Наполеон: Режиссерская версия&lt;/h3&gt;</code>, актёры в <code>.card-cast</code> и кнопка ' +
                '<code>&lt;button class="save-button" type="button"&gt;В мой список&lt;/button&gt;</code></li></ul>',
            hint: ['<article data-film="...">', '<div class="...">', '<img src="..." alt="...">', '<h3>', '<p class="...">', '<button type="button">'],
            start: {
                html: '<div class="cards">\n' + indent(c1) + '\n\n' + indent(c2) + '\n\n    <!-- сюда третью карточку -->\n\n</div>',
                css: cardCss + '\n' + posterCss + '\n' + saveCss,
            },
            answer: { html: cardsHtml },
            checks: [
                ['Три карточки .card', function (t) { return t.all('.cards .card').length === 3; }],
                ['У третьей data-film="napoleon"', function (t) { return t.all('.card')[2].dataset.film === 'napoleon'; }],
                ['Постер napoleon с alt', function (t) {
                    const img = t.all('.card')[2].querySelector('.card-poster img');
                    return !!img && img.getAttribute('src') === '../img/poster-napoleon.jpg' && (img.getAttribute('alt') || '').length > 0;
                }],
                ['Рейтинг 7.8', function (t) { return t.text(t.all('.card')[2].querySelector('.rating')) === '7.8'; }],
                ['Заголовок «Наполеон: Режиссерская версия»', function (t) {
                    return t.text(t.all('.card')[2].querySelector('h3')) === 'Наполеон: Режиссерская версия';
                }],
                ['Есть .card-meta и .card-cast', function (t) {
                    const c = t.all('.card')[2];
                    return !!c.querySelector('.card-meta') && !!c.querySelector('.card-cast');
                }],
                ['Кнопка «В мой список»', function (t) {
                    const b = t.all('.card')[2].querySelector('button.save-button');
                    return !!b && b.getAttribute('type') === 'button';
                }],
            ],
        },

        // 5
        {
            title: 'Карточки фильмов: оформление',
            kind: 'CSS',
            text: '<p>Разложим карточки по сетке и оформим их:</p><ul>' +
                '<li><code>.cards</code>: сетка из трёх колонок (<code>repeat(3, 1fr)</code>), промежуток <code>20px</code></li>' +
                '<li><code>.card</code>: фон <code>#1c1a26</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>16px</code></li>' +
                '<li><code>.card-body</code>: столбиком, промежуток <code>6px</code>, отступы <code>16px</code></li>' +
                '<li><code>.card-meta</code>: год и длительность по краям (<code>space-between</code>), текст <code>11px</code></li>' +
                '<li><code>.card h3</code>: шрифт PT Serif, <code>18px</code></li></ul>',
            hint: ['grid-template-columns: repeat(3, 1fr)', 'flex-direction: column', 'justify-content: space-between'],
            start: {
                html: cardsHtml,
                css: '.cards {\n    \n}\n\n.card {\n    \n}\n\n.card-body {\n    \n}\n\n.card-meta {\n    \n}\n\n.card h3 {\n    \n}\n\n/* Уже готово */\n' + posterCss + '\n' + saveCss,
            },
            answer: { css: cardCss },
            checks: [
                ['.cards — сетка из 3 колонок', function (t) {
                    return t.css('.cards', 'display') === 'grid' && t.css('.cards', 'grid-template-columns').split(' ').length === 3;
                }],
                ['.cards: промежуток 20px', function (t) { return t.css('.cards', 'column-gap') === '20px'; }],
                ['.card: фон #1c1a26, скругление 16px', function (t) {
                    return t.color('.card', 'background-color') === '#1c1a26' && t.px('.card', 'border-top-left-radius') === 16;
                }],
                ['.card: рамка 1px #2c2f34', function (t) {
                    return Math.abs(t.px('.card', 'border-top-width') - 1) <= 0.5 && t.color('.card', 'border-top-color') === '#2c2f34';
                }],
                ['.card-body: столбиком, промежуток 6px, отступы 16px', function (t) {
                    return t.css('.card-body', 'flex-direction') === 'column' && t.css('.card-body', 'row-gap') === '6px' &&
                        t.px('.card-body', 'padding-top') === 16;
                }],
                ['.card-meta: по краям, 11px', function (t) {
                    return t.css('.card-meta', 'justify-content') === 'space-between' && t.px('.card-meta', 'font-size') === 11;
                }],
                ['.card h3: PT Serif 18px', function (t) {
                    return t.css('.card h3', 'font-family').indexOf('PT Serif') >= 0 && t.px('.card h3', 'font-size') === 18;
                }],
            ],
        },

        // 6
        {
            title: 'Постер и рейтинг',
            kind: 'CSS',
            text: '<p>Рейтинг должен лежать прямо поверх постера, в левом верхнем углу. Для этого:</p><ul>' +
                '<li><code>.card-poster</code>: <code>position: relative</code> — от этого блока будет считаться положение рейтинга</li>' +
                '<li><code>.card-poster img</code>: на всю ширину, пропорции постера <code>aspect-ratio: 2 / 3</code>, без искажений ' +
                '(<code>object-fit: cover</code>), скругление только сверху <code>16px 16px 0 0</code></li>' +
                '<li><code>.rating</code>: <code>position: absolute</code>, отступы от края <code>top: 12px</code> и <code>left: 12px</code>, ' +
                'фон <code>#0e0d18</code>, цвет <code>#a0cfce</code>, скругление <code>999px</code></li></ul>',
            hint: ['position: relative', 'position: absolute', 'top', 'left', 'aspect-ratio: 2 / 3', 'object-fit: cover'],
            start: {
                html: cardsHtml,
                css: '.card-poster {\n    \n}\n\n.card-poster img {\n    \n}\n\n.rating {\n    \n}\n\n/* Уже готово */\n' + cardCss + '\n' + saveCss,
            },
            answer: { css: posterCss },
            checks: [
                ['.card-poster: position: relative', function (t) { return t.css('.card-poster', 'position') === 'relative'; }],
                ['Постер на всю ширину, 2 / 3', function (t) {
                    return t.rule('.card-poster img', 'width') === '100%' && t.css('.card-poster img', 'aspect-ratio').replace(/\s/g, '') === '2/3';
                }],
                ['Постер без искажений', function (t) { return t.css('.card-poster img', 'object-fit') === 'cover'; }],
                ['Скругление постера только сверху', function (t) {
                    return t.px('.card-poster img', 'border-top-left-radius') === 16 && t.px('.card-poster img', 'border-bottom-left-radius') === 0;
                }],
                ['.rating: position: absolute', function (t) { return t.css('.rating', 'position') === 'absolute'; }],
                ['.rating: top 12px, left 12px', function (t) { return t.px('.rating', 'top') === 12 && t.px('.rating', 'left') === 12; }],
                ['.rating: фон #0e0d18, цвет #a0cfce', function (t) {
                    return t.color('.rating', 'background-color') === '#0e0d18' && t.color('.rating', 'color') === '#a0cfce';
                }],
            ],
        },

        // 7
        {
            title: 'Франшизы: разметка',
            kind: 'HTML',
            text: '<p>Ниже — культовые франшизы. Первая карточка готова, сделай вторую — «Властелин колец»:</p><ul>' +
                '<li><code>&lt;article class="franchise" data-collection="lotr"&gt;</code></li>' +
                '<li>картинка <code>&lt;img class="franchise-pic" src="../img/franchise-lotr.jpg" alt=""&gt;</code></li>' +
                '<li>в <code>.franchise-body</code>: метка <code>&lt;div class="chip chip-teal chip-small"&gt;Расширенные версии&lt;/div&gt;</code>, ' +
                '<code>&lt;h3&gt;Властелин колец: Трилогия&lt;/h3&gt;</code>, строка <code>&lt;p&gt;</code> с иконкой <code>icon-award.svg</code> ' +
                'и текстом «17 премий Оскар»</li>' +
                '<li>кнопку <code>&lt;button class="link franchise-button" type="button"&gt;Список фильмов&lt;/button&gt;</code> и пустой список ' +
                '<code>&lt;ol class="franchise-list hide"&gt;&lt;/ol&gt;</code> (<code>ol</code> — нумерованный список)</li></ul>',
            hint: ['<article data-collection="...">', '<ol>', '<button class="link ..." type="button">'],
            start: {
                html: '<div class="franchises">\n' + indent(f1) + '\n\n    <!-- сюда вторую франшизу -->\n\n</div>',
                css: franchiseCss + '\n' + franchiseReady + '\n' + T.css.chips + '\n' + T.css.hide +
                    '\n.link {\n    font-weight: 600;\n    color: #a0cfce;\n    background: none;\n    border: none;\n}\n',
            },
            answer: { html: franchisesHtml },
            checks: [
                ['Две франшизы', function (t) { return t.all('.franchises .franchise').length === 2; }],
                ['У второй data-collection="lotr"', function (t) { return t.all('.franchise')[1].dataset.collection === 'lotr'; }],
                ['Картинка franchise-lotr.jpg', function (t) {
                    return t.attr(t.all('.franchise')[1].querySelector('img.franchise-pic'), 'src') === '../img/franchise-lotr.jpg';
                }],
                ['Метка «Расширенные версии» chip-teal', function (t) {
                    const chip = t.all('.franchise')[1].querySelector('.chip.chip-teal');
                    return !!chip && chip.textContent.trim() === 'Расширенные версии';
                }],
                ['Заголовок «Властелин колец: Трилогия»', function (t) { return t.text(t.all('.franchise')[1].querySelector('h3')) === 'Властелин колец: Трилогия'; }],
                ['Кнопка .franchise-button и пустой ol.franchise-list.hide', function (t) {
                    const f = t.all('.franchise')[1];
                    const ol = f.querySelector('ol.franchise-list');
                    return !!f.querySelector('button.franchise-button') && !!ol && ol.classList.contains('hide');
                }],
            ],
        },

        // 8
        {
            title: 'Франшизы: оформление',
            kind: 'CSS',
            text: '<p>Оформим франшизы:</p><ul>' +
                '<li><code>.franchises</code>: сетка из двух колонок (<code>repeat(2, 1fr)</code>), промежуток <code>16px</code></li>' +
                '<li><code>.franchise</code>: фон <code>#1c1a26</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>16px</code></li>' +
                '<li><code>.franchise-pic</code>: на всю ширину, высота <code>140px</code>, без искажений, скругление только сверху <code>16px 16px 0 0</code></li>' +
                '<li><code>.franchise-body</code>: столбиком, промежуток <code>8px</code>, отступы <code>20px</code></li>' +
                '<li><code>.franchise .chip</code>: метка не растягивается — <code>align-self: flex-start</code></li></ul>',
            hint: ['grid-template-columns: repeat(2, 1fr)', 'align-self: flex-start'],
            start: {
                html: franchisesHtml,
                css: '.franchises {\n    \n}\n\n.franchise {\n    \n}\n\n.franchise-pic {\n    \n}\n\n.franchise-body {\n    \n}\n\n.franchise .chip {\n    \n}\n\n/* Уже готово */\n' +
                    franchiseReady + '\n' + T.css.chips + '\n' + T.css.hide + '\n.link {\n    color: #a0cfce;\n    background: none;\n    border: none;\n}\n',
            },
            answer: { css: franchiseCss },
            checks: [
                ['.franchises — сетка из 2 колонок, промежуток 16px', function (t) {
                    return t.css('.franchises', 'display') === 'grid' && t.css('.franchises', 'grid-template-columns').split(' ').length === 2 &&
                        t.css('.franchises', 'column-gap') === '16px';
                }],
                ['.franchise: фон #1c1a26, скругление 16px', function (t) {
                    return t.color('.franchise', 'background-color') === '#1c1a26' && t.px('.franchise', 'border-top-left-radius') === 16;
                }],
                ['Картинка: высота 140px, без искажений', function (t) {
                    return t.px('.franchise-pic', 'height') === 140 && t.css('.franchise-pic', 'object-fit') === 'cover';
                }],
                ['Картинка скруглена только сверху', function (t) {
                    return t.px('.franchise-pic', 'border-top-left-radius') === 16 && t.px('.franchise-pic', 'border-bottom-left-radius') === 0;
                }],
                ['.franchise-body: столбиком, промежуток 8px, отступы 20px', function (t) {
                    return t.css('.franchise-body', 'flex-direction') === 'column' && t.css('.franchise-body', 'row-gap') === '8px' &&
                        t.px('.franchise-body', 'padding-top') === 20;
                }],
                ['Метка не растянута', function (t) { return t.css('.franchise .chip', 'align-self') === 'flex-start'; }],
            ],
        },

        // 9
        T.footer('catalog'),

        // 10
        {
            title: 'JS: бургер и «В мой список»',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>кнопки «В мой список»: для каждой карточки (<code>forEach</code>) возьми её кнопку <code>.save-button</code> и id фильма ' +
                '<code>card.dataset.film</code>. При клике: если фильм уже в <code>data.saved</code> — убери его (<code>filter</code>), сними класс ' +
                '<code>saved</code> и верни текст «В мой список»; иначе — добавь (<code>push</code>), поставь класс <code>saved</code> и текст «В списке ✓». ' +
                'В конце <code>saveData(data)</code></li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", 'querySelectorAll(...).forEach', 'card.dataset.film', 'data.saved.includes(id)', 'data.saved.filter(function (item) { return item !== id; })', '.push(...)', 'classList.add / remove', 'textContent', 'if / else', 'saveData(data)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + cardsHtml,
                css: T.burgerCss + '\n' + cardCss + '\n' + posterCss + '\n' + saveCss,
                js: T.js.data + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" +
                    '// 1) бургер\n\n\n// 2) кнопки «В мой список»\n',
            },
            answer: {
                js: T.js.data + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "document.querySelectorAll('.card').forEach(function (card) {\n    const button = card.querySelector('.save-button');\n" +
                    "    const id = card.dataset.film;\n\n    button.addEventListener('click', function () {\n        if (data.saved.includes(id)) {\n" +
                    "            data.saved = data.saved.filter(function (item) {\n                return item !== id;\n            });\n" +
                    "            button.classList.remove('saved');\n            button.textContent = 'В мой список';\n        } else {\n" +
                    "            data.saved.push(id);\n            button.classList.add('saved');\n            button.textContent = 'В списке ✓';\n        }\n" +
                    "        saveData(data);\n    });\n});",
            },
            checks: T.burgerChecks.concat([
                ['Клик по кнопке второго фильма — «В списке ✓»', function (t) {
                    const b = t.all('.save-button')[1];
                    b.click();
                    return b.classList.contains('saved') && b.textContent.trim() === 'В списке ✓';
                }],
                ['Фильм flower-moon сохранён в localStorage', function (t) {
                    const s = T.saved();
                    return !!s && s.saved.join(',') === 'flower-moon';
                }],
                ['Второй клик убирает фильм', function (t) {
                    const b = t.all('.save-button')[1];
                    b.click();
                    const s = T.saved();
                    return !b.classList.contains('saved') && b.textContent.trim() === 'В мой список' && s.saved.length === 0;
                }],
            ]),
        },

        // 11
        {
            title: 'JS: поиск по фильмам',
            kind: 'JS',
            text: '<p>Поиск прячет фильмы, которые не подходят. Напиши функцию <code>search()</code>:</p><ul>' +
                '<li>возьми текст из поля маленькими буквами: <code>searchForm.elements.query.value.trim().toLowerCase()</code></li>' +
                '<li>для каждой карточки: если <code>card.textContent.toLowerCase().includes(query)</code> — убери класс <code>hide</code> и прибавь 1 к счётчику, иначе добавь <code>hide</code></li>' +
                '<li>если ничего не нашлось (счётчик <code>0</code>) — покажи <code>.search-empty</code>, иначе спрячь</li></ul>' +
                '<p>Запускай её на каждую букву (событие <code>input</code> у поля) и при отправке формы (не забудь <code>event.preventDefault()</code>).</p>',
            hint: ['function search() { }', '.toLowerCase()', '.includes(...)', 'let count = 0', "addEventListener('input', search)",
                "addEventListener('submit', ...)", 'event.preventDefault()', '.value.trim()'],
            start: {
                html: searchHtml + '\n<p class="search-empty hide">Ничего не найдено.</p>\n' + cardsHtml,
                css: cardCss + '\n' + posterCss + '\n' + saveCss + '\n' + T.css.hide,
                js: "const cards = document.querySelectorAll('.card');\nconst searchForm = document.querySelector('.search');\n" +
                    "const searchEmpty = document.querySelector('.search-empty');\n\nfunction search() {\n    // спрячь неподходящие карточки\n\n}\n\n" +
                    '// запускай поиск на каждую букву и при отправке формы\n',
            },
            answer: {
                js: "const cards = document.querySelectorAll('.card');\nconst searchForm = document.querySelector('.search');\n" +
                    "const searchEmpty = document.querySelector('.search-empty');\n\nfunction search() {\n" +
                    "    const query = searchForm.elements.query.value.trim().toLowerCase();\n    let count = 0;\n" +
                    "    cards.forEach(function (card) {\n        if (card.textContent.toLowerCase().includes(query)) {\n" +
                    "            card.classList.remove('hide');\n            count = count + 1;\n        } else {\n            card.classList.add('hide');\n        }\n    });\n" +
                    "    if (count === 0) {\n        searchEmpty.classList.remove('hide');\n    } else {\n        searchEmpty.classList.add('hide');\n    }\n}\n\n" +
                    "searchForm.elements.query.addEventListener('input', search);\nsearchForm.addEventListener('submit', function (event) {\n" +
                    '    event.preventDefault();\n    search();\n});',
            },
            checks: [
                ['Поиск «триллер» оставляет 1 фильм', function (t) {
                    t.type('.search input', 'триллер');
                    return t.all('.card').filter(function (c) { return t.visible(c); }).length === 1;
                }],
                ['Большие буквы не мешают («ДИКАПРИО»)', function (t) {
                    t.type('.search input', 'ДИКАПРИО');
                    return t.all('.card').filter(function (c) { return t.visible(c); }).length === 1;
                }],
                ['Нет совпадений — видно «Ничего не найдено»', function (t) {
                    t.type('.search input', 'шрек');
                    return t.all('.card').filter(function (c) { return t.visible(c); }).length === 0 && t.visible('.search-empty');
                }],
                ['Пустой поиск — снова 3 фильма', function (t) {
                    t.type('.search input', '');
                    return t.all('.card').filter(function (c) { return t.visible(c); }).length === 3 && !t.visible('.search-empty');
                }],
                ['Отправка формы не перезагружает страницу', function (t) { return t.submit('.search'); }],
            ],
        },

        // 12
        {
            title: 'JS: списки франшиз',
            kind: 'JS',
            text: '<p>Кнопка «Список фильмов» показывает фильмы франшизы. Списки уже лежат в объекте <code>collections</code>: ' +
                '<code>collections.lotr</code> — фильмы «Властелина колец». Для каждой франшизы (<code>forEach</code>) при клике на её кнопку:</p><ul>' +
                '<li>если список <code>.franchise-list</code> ещё пустой (<code>list.children.length === 0</code>) — для каждого названия из ' +
                '<code>collections[franchise.dataset.collection]</code> создай <code>&lt;li&gt;</code> и добавь в список</li>' +
                '<li>переключи у списка класс <code>hide</code></li>' +
                '<li>если список спрятан — текст кнопки «Список фильмов», иначе — «Скрыть список»</li></ul>',
            hint: ['collections[...]', 'list.children.length === 0', "document.createElement('li')", '.append(...)', "classList.toggle('hide')", "classList.contains('hide')"],
            start: {
                html: franchisesHtml,
                css: franchiseCss + '\n' + franchiseReady + '\n' + T.css.chips + '\n' + T.css.hide + '\n.link {\n    color: #a0cfce;\n    background: none;\n    border: none;\n}\n',
                js: 'const collections = {\n' +
                    "    potter: ['Философский камень', 'Тайная комната', 'Узник Азкабана', 'Кубок огня', 'Орден Феникса', 'Принц-полукровка', 'Дары Смерти: Часть I', 'Дары Смерти: Часть II'],\n" +
                    "    lotr: ['Братство Кольца', 'Две крепости', 'Возвращение короля']\n};\n\n" +
                    "document.querySelectorAll('.franchise').forEach(function (franchise) {\n    const button = franchise.querySelector('.franchise-button');\n" +
                    "    const list = franchise.querySelector('.franchise-list');\n\n    // при клике заполни и покажи список\n\n});\n",
            },
            answer: {
                js: 'const collections = {\n' +
                    "    potter: ['Философский камень', 'Тайная комната', 'Узник Азкабана', 'Кубок огня', 'Орден Феникса', 'Принц-полукровка', 'Дары Смерти: Часть I', 'Дары Смерти: Часть II'],\n" +
                    "    lotr: ['Братство Кольца', 'Две крепости', 'Возвращение короля']\n};\n\n" +
                    "document.querySelectorAll('.franchise').forEach(function (franchise) {\n    const button = franchise.querySelector('.franchise-button');\n" +
                    "    const list = franchise.querySelector('.franchise-list');\n\n    button.addEventListener('click', function () {\n" +
                    "        if (list.children.length === 0) {\n            collections[franchise.dataset.collection].forEach(function (name) {\n" +
                    "                const item = document.createElement('li');\n                item.textContent = name;\n                list.append(item);\n            });\n        }\n" +
                    "        list.classList.toggle('hide');\n        if (list.classList.contains('hide')) {\n            button.textContent = 'Список фильмов';\n" +
                    "        } else {\n            button.textContent = 'Скрыть список';\n        }\n    });\n});",
            },
            checks: [
                ['Клик по «Властелину колец» показывает 3 фильма', function (t) {
                    t.click('[data-collection="lotr"] .franchise-button');
                    return t.visible('[data-collection="lotr"] .franchise-list') && t.all('[data-collection="lotr"] li').length === 3;
                }],
                ['Первый — «Братство Кольца»', function (t) { return t.text('[data-collection="lotr"] li') === 'Братство Кольца'; }],
                ['Кнопка стала «Скрыть список»', function (t) { return t.text('[data-collection="lotr"] .franchise-button') === 'Скрыть список'; }],
                ['Второй клик прячет список без повторов', function (t) {
                    t.click('[data-collection="lotr"] .franchise-button');
                    t.click('[data-collection="lotr"] .franchise-button');
                    t.click('[data-collection="lotr"] .franchise-button');
                    return !t.visible('[data-collection="lotr"] .franchise-list') && t.all('[data-collection="lotr"] li').length === 3 &&
                        t.text('[data-collection="lotr"] .franchise-button') === 'Список фильмов';
                }],
                ['У Гарри Поттера 8 фильмов', function (t) {
                    t.click('[data-collection="potter"] .franchise-button');
                    return t.all('[data-collection="potter"] li').length === 8;
                }],
            ],
        },
    ];
})();
