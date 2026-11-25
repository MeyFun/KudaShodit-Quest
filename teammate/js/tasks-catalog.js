// =========================================================
// Задачи страницы «Дисциплины» — Мадина Жумадилова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    function game(type, cover, tag, title, text) {
        return '<article class="card game" data-type="' + type + '">\n' +
            '    ' + cover + '\n' +
            '    <div class="game-body">\n' +
            '        <p class="tag">' + tag + '</p>\n' +
            '        <h2>' + title + '</h2>\n' +
            '        <p class="game-text">' + text + '</p>\n' +
            '        <button class="button choose-button" type="button">Моя дисциплина</button>\n' +
            '        <a class="link" href="../requests/requests.html">Смотреть заявки →</a>\n' +
            '    </div>\n' +
            '</article>';
    }
    const g1 = game('fps', '<img class="cover" src="../img/cs2.jpg" alt="Counter-Strike 2">', 'FPS · 5×5', 'Counter-Strike 2', 'Командные матчи, тренировки и разбор раундов.');
    const g2 = game('moba', '<img class="cover" src="../img/dota.jpg" alt="Dota 2">', 'MOBA · 5×5', 'Dota 2', 'Сыгранная пятёрка для рейтинга и командных лобби.');
    const g3 = game('fps', '<img class="cover" src="../img/valorant.jpg" alt="Valorant">', 'FPS · 5×5', 'Valorant', 'Поиск игроков по роли агента и времени тренировок.');
    const g4 = game('dev', '<div class="cover cover-text cover-ai">AI BATTLE</div>', 'Хакатон', 'Хакатон AI Battle', 'Команды для прототипов, моделей и презентаций.');
    const gridHtml = '<div class="catalog-grid">\n' + indent(g1) + '\n\n' + indent(g2) + '\n\n' + indent(g3) + '\n</div>';
    const gridHtml4 = '<div class="catalog-grid">\n' + indent(g1) + '\n\n' + indent(g2) + '\n\n' + indent(g3) + '\n\n' + indent(g4) + '\n</div>';

    const chips = [['all', 'Все'], ['fps', 'FPS'], ['moba', 'MOBA'], ['coop', 'Кооператив'], ['dev', 'Разработка']];
    function filtersHtml(count) {
        let html = '<div class="filters">\n';
        chips.slice(0, count).forEach(function (c, i) {
            html += '    <button class="chip' + (i === 0 ? ' active' : '') + '" type="button" data-type="' + c[0] + '">' + c[1] + '</button>\n';
        });
        return html + '</div>';
    }
    const searchHtml = '<form class="search">\n    <input name="query" type="text" placeholder="Поиск игры или дисциплины">\n' +
        '    <button class="button button-quiet" type="submit">Найти</button>\n</form>';
    const toolbarHtml = '<section class="toolbar">\n' + indent(filtersHtml(5)) + '\n' + indent(searchHtml) + '\n</section>';
    const emptyHtml = '<p class="empty hide">Дисциплина не найдена. Попробуй другой запрос или выбери «Все».</p>';

    const toolbarCss =
        '.toolbar {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 16px;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
        '.filters {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' + T.css.chips + '\n' +
        '.search {\n    display: flex;\n    gap: 8px;\n}\n\n' +
        '.search input {\n    width: 260px;\n    padding: 10px 12px;\n    background: #15141b;\n    border: 1px solid #3a3547;\n    border-radius: 8px;\n}\n';
    const gridCss =
        '.catalog-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 14px;\n}\n\n' + T.css.card + '\n' +
        '.game {\n    display: flex;\n    flex-direction: column;\n    padding: 0;\n}\n\n' +
        '.cover {\n    width: 100%;\n    aspect-ratio: 460 / 215;\n    object-fit: cover;\n    border-radius: 12px 12px 0 0;\n}\n';
    const coverTextCss =
        '.cover-text {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 28px;\n    font-weight: 800;\n    color: #b0e3dd;\n}\n\n' +
        '.cover-ai {\n    background: #216077;\n}\n';
    const bodyCss =
        '.game-body {\n    display: flex;\n    flex: 1;\n    flex-direction: column;\n    gap: 8px;\n    padding: 16px;\n}\n\n' + T.css.tag + '\n' +
        '.game-text {\n    flex: 1;\n    font-size: 14px;\n    color: #bcb2c9;\n}\n\n' + T.css.buttons + '\n' +
        '.link {\n    font-size: 14px;\n    font-weight: 700;\n    text-align: center;\n    color: #f7ca60;\n}\n';
    const chosenCss = '.choose-button.chosen {\n    color: #241a06;\n    background: #b0e3dd;\n}\n';

    const jsStart = "const cards = document.querySelectorAll('.game');\nconst chips = document.querySelectorAll('.filters .chip');\nlet type = 'all';\n\n";

    QUEST_TASKS.catalog = [
        // 1
        T.base(),

        // 2
        T.header('catalog'),

        // 3
        {
            title: 'Заголовок страницы',
            kind: 'CSS',
            text: '<p>Вверху страницы — большой заголовок и подзаголовок. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.main</code>: блоки столбиком (<code>flex-direction: column</code>), промежуток <code>32px</code>, отступ сверху <code>44px</code>, снизу <code>64px</code></li>' +
                '<li><code>h1</code>: шрифт <code>Georgia, serif</code>, размер <code>44px</code>, высота строки <code>1.15</code></li>' +
                '<li><code>.lead</code>: отступ сверху <code>12px</code>, цвет <code>#bcb2c9</code></li></ul>',
            hint: ['display: flex', 'flex-direction: column', 'gap', 'padding-top', 'padding-bottom', 'font-family', 'font-size', 'line-height', 'margin-top', 'color'],
            start: {
                html: '<main class="container main">\n    <section>\n        <h1>Игры, хакатоны и дисциплины</h1>\n' +
                    '        <p class="lead">Выбери направление и посмотри, какие команды ищут участников.</p>\n    </section>\n\n' +
                    '    <p class="empty">Здесь будут фильтры и карточки игр.</p>\n</main>',
                css: '.main {\n    \n}\n\nh1 {\n    \n}\n\n.lead {\n    \n}\n\n/* Уже готово */\n' + T.css.empty,
            },
            answer: {
                css: '.main {\n    display: flex;\n    flex-direction: column;\n    gap: 32px;\n    padding-top: 44px;\n    padding-bottom: 64px;\n}\n\n' +
                    'h1 {\n    font-family: Georgia, serif;\n    font-size: 44px;\n    line-height: 1.15;\n}\n\n' +
                    '.lead {\n    margin-top: 12px;\n    color: #bcb2c9;\n}\n\n' + T.css.empty,
            },
            checks: [
                ['.main: столбиком, промежуток 32px', function (t) {
                    return t.css('.main', 'display') === 'flex' && t.css('.main', 'flex-direction') === 'column' && t.css('.main', 'row-gap') === '32px';
                }],
                ['.main: сверху 44px, снизу 64px', function (t) {
                    return t.px('.main', 'padding-top') === 44 && t.px('.main', 'padding-bottom') === 64;
                }],
                ['h1: Georgia 44px', function (t) {
                    return t.css('h1', 'font-family').indexOf('Georgia') >= 0 && t.px('h1', 'font-size') === 44;
                }],
                ['h1: высота строки 1.15', function (t) { return Math.abs(t.px('h1', 'line-height') - 50.6) < 0.5; }],
                ['.lead: отступ сверху 12px, цвет #bcb2c9', function (t) {
                    return t.px('.lead', 'margin-top') === 12 && t.color('.lead', 'color') === '#bcb2c9';
                }],
            ],
        },

        // 4
        {
            title: 'Фильтры и поиск: разметка',
            kind: 'HTML',
            text: '<p>Под заголовком — кнопки-фильтры и строка поиска. Две кнопки уже есть, допиши остальное:</p><ul>' +
                '<li>ещё три кнопки по образцу: <code>MOBA</code> (<code>data-type="moba"</code>), <code>Кооператив</code> (<code>data-type="coop"</code>), ' +
                '<code>Разработка</code> (<code>data-type="dev"</code>). У всех <code>class="chip"</code> и <code>type="button"</code></li>' +
                '<li>после блока <code>.filters</code> — форма <code>&lt;form class="search"&gt;</code>, в ней поле ' +
                '<code>&lt;input name="query" type="text" placeholder="Поиск игры или дисциплины"&gt;</code> и кнопка ' +
                '<code>&lt;button class="button button-quiet" type="submit"&gt;Найти&lt;/button&gt;</code></li></ul>' +
                '<p><code>data-type</code> понадобится JS: по нему он поймёт, какие игры показать.</p>',
            hint: ['<button class="chip" type="button" data-type="...">', '<form class="...">', '<input name="..." type="text" placeholder="...">', '<button type="submit">'],
            start: {
                html: '<section class="toolbar">\n' + indent(filtersHtml(2)).replace('    </div>', '        <!-- ещё три кнопки -->\n\n    </div>') +
                    '\n\n    <!-- форма поиска -->\n\n</section>',
                css: toolbarCss + '\n' + T.css.buttons,
            },
            answer: { html: toolbarHtml },
            checks: [
                ['Пять кнопок .chip', function (t) { return t.all('.filters .chip').length === 5; }],
                ['data-type: moba, coop, dev', function (t) {
                    return t.all('.filters .chip').slice(2).map(function (b) { return b.dataset.type; }).join(',') === 'moba,coop,dev';
                }],
                ['Тексты MOBA, Кооператив, Разработка', function (t) {
                    return t.all('.filters .chip').slice(2).map(function (b) { return b.textContent.trim(); }).join(',') === 'MOBA,Кооператив,Разработка';
                }],
                ['У кнопок type="button"', function (t) {
                    return t.all('.filters .chip').every(function (b) { return b.getAttribute('type') === 'button'; });
                }],
                ['Форма .search с полем name="query"', function (t) { return !!t.q('form.search input[name="query"]'); }],
                ['У поля есть placeholder', function (t) { return (t.attr('.search input', 'placeholder') || '').length > 0; }],
                ['Кнопка «Найти» type="submit"', function (t) {
                    const b = t.q('.search button');
                    return !!b && b.getAttribute('type') === 'submit' && b.textContent.trim() === 'Найти';
                }],
            ],
        },

        // 5
        {
            title: 'Фильтры и поиск: оформление',
            kind: 'CSS',
            text: '<p>Оформим панель с фильтрами:</p><ul>' +
                '<li><code>.toolbar</code>: в строку с переносом (<code>flex-wrap: wrap</code>), края разнесены, по центру по вертикали, промежуток <code>16px</code></li>' +
                '<li><code>.filters</code>: кнопки в строку с переносом, промежуток <code>8px</code></li>' +
                '<li><code>.chip</code>: отступы <code>8px 14px</code>, жирный текст <code>700</code>, фон <code>#15141b</code>, рамка <code>1px solid #3a3547</code>, скругление <code>8px</code></li>' +
                '<li><code>.chip.active</code> (выбранная кнопка): фон <code>#f7ca60</code>, текст <code>#241a06</code></li>' +
                '<li><code>.search</code>: в строку, промежуток <code>8px</code>; <code>.search input</code>: ширина <code>260px</code>, отступы <code>10px 12px</code>, фон <code>#15141b</code></li></ul>',
            hint: ['flex-wrap: wrap', 'justify-content: space-between', 'border: 1px solid ...', 'border-radius', 'font-weight'],
            start: {
                html: toolbarHtml,
                css: '.toolbar {\n    \n}\n\n.filters {\n    \n}\n\n.chip {\n    \n}\n\n.chip.active {\n    \n}\n\n.search {\n    \n}\n\n.search input {\n    \n}\n\n/* Уже готово */\n' + T.css.buttons,
            },
            answer: { css: toolbarCss + '\n' + T.css.buttons },
            checks: [
                ['.toolbar: в строку с переносом, края разнесены', function (t) {
                    return t.css('.toolbar', 'display') === 'flex' && t.css('.toolbar', 'flex-wrap') === 'wrap' &&
                        t.css('.toolbar', 'justify-content') === 'space-between';
                }],
                ['.toolbar: промежуток 16px', function (t) { return t.css('.toolbar', 'column-gap') === '16px'; }],
                ['.filters: в строку с переносом, промежуток 8px', function (t) {
                    return t.css('.filters', 'display') === 'flex' && t.css('.filters', 'flex-wrap') === 'wrap' && t.css('.filters', 'column-gap') === '8px';
                }],
                ['.chip: отступы 8px 14px, жирный', function (t) {
                    return t.px('.chip:not(.active)', 'padding-top') === 8 && t.px('.chip:not(.active)', 'padding-left') === 14 &&
                        t.css('.chip:not(.active)', 'font-weight') === '700';
                }],
                ['.chip: фон #15141b, рамка #3a3547, скругление 8px', function (t) {
                    return t.color('.chip:not(.active)', 'background-color') === '#15141b' && t.color('.chip:not(.active)', 'border-top-color') === '#3a3547' &&
                        t.px('.chip:not(.active)', 'border-top-left-radius') === 8;
                }],
                ['Выбранная кнопка: фон #f7ca60, текст #241a06', function (t) {
                    return t.color('.chip.active', 'background-color') === '#f7ca60' && t.color('.chip.active', 'color') === '#241a06';
                }],
                ['.search: в строку, промежуток 8px', function (t) {
                    return t.css('.search', 'display') === 'flex' && t.css('.search', 'column-gap') === '8px';
                }],
                ['Поле поиска: 260px, фон #15141b', function (t) {
                    return t.rule('.search input', 'width') === '260px' && t.color('.search input', 'background-color') === '#15141b';
                }],
            ],
        },

        // 6
        {
            title: 'Карточки игр: разметка',
            kind: 'HTML',
            text: '<p>Каждая игра — карточка с обложкой, меткой, названием и кнопками. Две карточки готовы, сделай третью — Valorant:</p><ul>' +
                '<li><code>&lt;article class="card game" data-type="fps"&gt;</code></li>' +
                '<li>обложка <code>&lt;img class="cover" src="../img/valorant.jpg" alt="Valorant"&gt;</code></li>' +
                '<li>в <code>.game-body</code>: метка <code>&lt;p class="tag"&gt;FPS · 5×5&lt;/p&gt;</code>, заголовок <code>&lt;h2&gt;Valorant&lt;/h2&gt;</code>, ' +
                'текст <code>&lt;p class="game-text"&gt;</code> «Поиск игроков по роли агента и времени тренировок.», кнопка ' +
                '<code>&lt;button class="button choose-button" type="button"&gt;Моя дисциплина&lt;/button&gt;</code> и ссылка ' +
                '<code>&lt;a class="link" href="../requests/requests.html"&gt;Смотреть заявки →&lt;/a&gt;</code></li></ul>',
            hint: ['<article class="..." data-type="...">', '<img class="..." src="..." alt="...">', '<div class="...">', '<h2>', '<p class="...">', '<a href="...">'],
            start: {
                html: '<div class="catalog-grid">\n' + indent(g1) + '\n\n' + indent(g2) + '\n\n    <!-- сюда третью карточку -->\n\n</div>',
                css: gridCss + '\n' + bodyCss,
            },
            answer: { html: gridHtml },
            checks: [
                ['Три карточки .game', function (t) { return t.all('.catalog-grid .game').length === 3; }],
                ['У третьей class="card game" и data-type="fps"', function (t) {
                    const c = t.all('.game')[2];
                    return c.classList.contains('card') && c.dataset.type === 'fps';
                }],
                ['Обложка valorant.jpg с alt', function (t) {
                    const img = t.all('.game')[2].querySelector('img.cover');
                    return !!img && img.getAttribute('src') === '../img/valorant.jpg' && (img.getAttribute('alt') || '').length > 0;
                }],
                ['Метка «FPS · 5×5»', function (t) { return t.text(t.all('.game')[2].querySelector('.tag')) === 'FPS · 5×5'; }],
                ['Заголовок «Valorant»', function (t) { return t.text(t.all('.game')[2].querySelector('h2')) === 'Valorant'; }],
                ['Текст .game-text', function (t) { return t.text(t.all('.game')[2].querySelector('.game-text')).indexOf('роли агента') >= 0; }],
                ['Кнопка «Моя дисциплина» и ссылка на заявки', function (t) {
                    const c = t.all('.game')[2];
                    const b = c.querySelector('button.choose-button');
                    const a = c.querySelector('a.link');
                    return !!b && b.getAttribute('type') === 'button' && !!a && a.getAttribute('href') === '../requests/requests.html';
                }],
            ],
        },

        // 7
        {
            title: 'Карточки игр: сетка и обложки',
            kind: 'CSS',
            text: '<p>Разложим карточки по сетке и приведём обложки к одному размеру:</p><ul>' +
                '<li><code>.catalog-grid</code>: сетка из трёх колонок (<code>repeat(3, 1fr)</code>), промежуток <code>14px</code></li>' +
                '<li><code>.card</code>: отступы <code>18px</code>, фон <code>#1c1b23</code>, рамка <code>1px solid #3a3547</code>, скругление <code>12px</code></li>' +
                '<li><code>.game</code>: содержимое столбиком, без отступов (<code>padding: 0</code>) — обложка встаёт вплотную к краям</li>' +
                '<li><code>.cover</code>: на всю ширину, пропорции <code>aspect-ratio: 460 / 215</code>, без искажений (<code>object-fit: cover</code>), ' +
                'скругление только сверху <code>12px 12px 0 0</code></li></ul>' +
                '<p>Четвёртая карточка — без картинки: её обложка просто цветной блок с надписью.</p>',
            hint: ['display: grid', 'grid-template-columns: repeat(3, 1fr)', 'padding: 0', 'aspect-ratio: 460 / 215', 'object-fit: cover'],
            start: {
                html: gridHtml4,
                css: '.catalog-grid {\n    \n}\n\n.card {\n    \n}\n\n.game {\n    \n}\n\n.cover {\n    \n}\n\n/* Уже готово */\n' + coverTextCss + '\n' + bodyCss,
            },
            answer: { css: gridCss + '\n' + coverTextCss + '\n' + bodyCss },
            checks: [
                ['.catalog-grid — сетка из 3 колонок', function (t) {
                    return t.css('.catalog-grid', 'display') === 'grid' && t.css('.catalog-grid', 'grid-template-columns').split(' ').length === 3;
                }],
                ['.catalog-grid: промежуток 14px', function (t) { return t.css('.catalog-grid', 'column-gap') === '14px'; }],
                ['.card: фон #1c1b23, скругление 12px', function (t) {
                    return t.color('.card', 'background-color') === '#1c1b23' && t.px('.card', 'border-top-left-radius') === 12;
                }],
                ['.card: рамка 1px #3a3547, отступы 18px', function (t) {
                    return Math.abs(t.px('.card', 'border-top-width') - 1) <= 0.5 && t.color('.card', 'border-top-color') === '#3a3547' &&
                        t.rule('.card', 'padding-top') === '18px';
                }],
                ['.game: столбиком, без отступов', function (t) {
                    return t.css('.game', 'flex-direction') === 'column' && t.px('.game', 'padding-top') === 0;
                }],
                ['Обложка на всю ширину, 460 / 215, без искажений', function (t) {
                    return t.rule('.cover', 'width') === '100%' && t.css('.cover', 'aspect-ratio').replace(/\s/g, '') === '460/215' &&
                        t.css('img.cover', 'object-fit') === 'cover';
                }],
                ['Обложка скруглена только сверху', function (t) {
                    return t.px('.cover', 'border-top-left-radius') === 12 && t.px('.cover', 'border-bottom-left-radius') === 0;
                }],
            ],
        },

        // 8
        {
            title: 'Карточки игр: текст и кнопки',
            kind: 'CSS',
            text: '<p>Теперь нижняя часть карточки:</p><ul>' +
                '<li><code>.game-body</code>: столбиком, промежуток <code>8px</code>, отступы <code>16px</code> и <code>flex: 1</code> — занимает всё место под обложкой</li>' +
                '<li><code>.tag</code>: не растягивается (<code>align-self: flex-start</code>), отступы <code>3px 8px</code>, текст <code>12px</code> цвета <code>#b0e3dd</code>, ' +
                'фон <code>#26333a</code>, скругление <code>4px</code></li>' +
                '<li><code>.game-text</code>: <code>flex: 1</code> (кнопки уходят вниз, даже если текст короткий), <code>14px</code>, цвет <code>#bcb2c9</code></li>' +
                '<li><code>.link</code>: <code>14px</code>, жирный, по центру, цвет <code>#f7ca60</code></li></ul>',
            hint: ['flex: 1', 'align-self: flex-start', 'text-align: center'],
            start: {
                html: gridHtml4,
                css: '.game-body {\n    \n}\n\n.tag {\n    \n}\n\n.game-text {\n    \n}\n\n.link {\n    \n}\n\n/* Уже готово */\n' + gridCss + '\n' + coverTextCss + '\n' + T.css.buttons,
            },
            answer: { css: bodyCss + '\n' + gridCss + '\n' + coverTextCss },
            checks: [
                ['.game-body: столбиком, промежуток 8px, отступы 16px', function (t) {
                    return t.css('.game-body', 'flex-direction') === 'column' && t.css('.game-body', 'row-gap') === '8px' && t.px('.game-body', 'padding-top') === 16;
                }],
                ['.game-body: flex: 1', function (t) { return t.css('.game-body', 'flex-grow') === '1'; }],
                ['.tag не растянута, 12px', function (t) {
                    return t.css('.tag', 'align-self') === 'flex-start' && t.px('.tag', 'font-size') === 12;
                }],
                ['.tag: цвет #b0e3dd, фон #26333a, скругление 4px', function (t) {
                    return t.color('.tag', 'color') === '#b0e3dd' && t.color('.tag', 'background-color') === '#26333a' && t.px('.tag', 'border-top-left-radius') === 4;
                }],
                ['.game-text: flex: 1, 14px, #bcb2c9', function (t) {
                    return t.css('.game-text', 'flex-grow') === '1' && t.px('.game-text', 'font-size') === 14 && t.color('.game-text', 'color') === '#bcb2c9';
                }],
                ['.link: по центру, жирная, #f7ca60', function (t) {
                    return t.css('.link', 'text-align') === 'center' && t.css('.link', 'font-weight') === '700' && t.color('.link', 'color') === '#f7ca60';
                }],
            ],
        },

        // 9
        T.footer('catalog'),

        // 10
        {
            title: 'JS: бургер и фильтры',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>фильтры: для каждой кнопки <code>chips</code> (<code>forEach</code>) при клике — сними класс <code>active</code> со всех кнопок, ' +
                'поставь его нажатой, запомни <code>type = chip.dataset.type</code> и вызови <code>showGames()</code></li>' +
                '<li>в функции <code>showGames()</code> для каждой карточки: если <code>type === \'all\'</code> или <code>card.dataset.type === type</code> — ' +
                'убери у карточки класс <code>hide</code>, иначе добавь</li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", 'querySelectorAll(...).forEach', 'function showGames() { }',
                "classList.add / remove", 'chip.dataset.type', '||', 'if / else'],
            start: {
                html: T.burgerHtml + '\n\n' + filtersHtml(5) + '\n\n' + gridHtml4,
                css: T.burgerCss + '\n' + T.css.chips + '\n' + gridCss + '\n' + coverTextCss + '\n' + bodyCss + '\n' + T.css.hide,
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" + jsStart +
                    '// 1) бургер\n\n\n// 2) функция showGames()\n\n\n// 3) клик по кнопкам-фильтрам\n',
            },
            answer: {
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" + jsStart +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "function showGames() {\n    cards.forEach(function (card) {\n        if (type === 'all' || card.dataset.type === type) {\n" +
                    "            card.classList.remove('hide');\n        } else {\n            card.classList.add('hide');\n        }\n    });\n}\n\n" +
                    "chips.forEach(function (chip) {\n    chip.addEventListener('click', function () {\n        chips.forEach(function (other) {\n" +
                    "            other.classList.remove('active');\n        });\n        chip.classList.add('active');\n        type = chip.dataset.type;\n" +
                    '        showGames();\n    });\n});',
            },
            checks: T.burgerChecks.concat([
                ['Кнопка FPS оставляет 2 игры', function (t) {
                    t.click('[data-type="fps"]');
                    return T.shown(t, '.game') === 2;
                }],
                ['Нажатая кнопка стала active, «Все» — нет', function (t) {
                    return t.has('.filters [data-type="fps"]', 'active') && !t.has('.filters [data-type="all"]', 'active');
                }],
                ['«Разработка» — 1 игра', function (t) {
                    t.click('[data-type="dev"]');
                    return T.shown(t, '.game') === 1;
                }],
                ['«Все» — снова 4 игры', function (t) {
                    t.click('[data-type="all"]');
                    return T.shown(t, '.game') === 4 && t.all('.filters .active').length === 1;
                }],
            ]),
        },

        // 11
        {
            title: 'JS: поиск по играм',
            kind: 'JS',
            text: '<p>Добавим поиск в функцию <code>showGames()</code>. Фильтры уже работают, теперь карточка должна подходить ещё и под текст из поиска:</p><ul>' +
                '<li>в начале функции возьми текст маленькими буквами: <code>searchForm.elements.query.value.trim().toLowerCase()</code></li>' +
                '<li>карточка подходит, если подходит тип <b>и</b> <code>card.textContent.toLowerCase().includes(query)</code> (используй <code>&amp;&amp;</code>)</li>' +
                '<li>считай подходящие карточки; если их <code>0</code> — покажи <code>.empty</code>, иначе спрячь</li>' +
                '<li>запускай <code>showGames</code> на каждую букву (событие <code>input</code> у поля) и при отправке формы (не забудь <code>event.preventDefault()</code>)</li></ul>',
            hint: ['.value.trim()', '.toLowerCase()', 'card.textContent', '.includes(...)', '&&', 'let count = 0', "addEventListener('input', showGames)",
                "addEventListener('submit', ...)", 'event.preventDefault()'],
            start: {
                html: toolbarHtml + '\n\n' + emptyHtml + '\n\n' + gridHtml4,
                css: toolbarCss + '\n' + gridCss + '\n' + coverTextCss + '\n' + bodyCss + '\n' + T.css.empty + '\n' + T.css.hide,
                js: jsStart + "const searchForm = document.querySelector('.search');\nconst empty = document.querySelector('.empty');\n\n" +
                    "function showGames() {\n    // добавь сюда поиск и счётчик\n    cards.forEach(function (card) {\n" +
                    "        if (type === 'all' || card.dataset.type === type) {\n            card.classList.remove('hide');\n        } else {\n" +
                    "            card.classList.add('hide');\n        }\n    });\n}\n\n" +
                    "chips.forEach(function (chip) {\n    chip.addEventListener('click', function () {\n        chips.forEach(function (other) {\n" +
                    "            other.classList.remove('active');\n        });\n        chip.classList.add('active');\n        type = chip.dataset.type;\n" +
                    '        showGames();\n    });\n});\n\n// запускай поиск на каждую букву и при отправке формы\n',
            },
            answer: {
                js: jsStart + "const searchForm = document.querySelector('.search');\nconst empty = document.querySelector('.empty');\n\n" +
                    "function showGames() {\n    const query = searchForm.elements.query.value.trim().toLowerCase();\n    let count = 0;\n" +
                    "    cards.forEach(function (card) {\n        const fitsType = type === 'all' || card.dataset.type === type;\n" +
                    "        const fitsQuery = card.textContent.toLowerCase().includes(query);\n        if (fitsType && fitsQuery) {\n" +
                    "            card.classList.remove('hide');\n            count = count + 1;\n        } else {\n            card.classList.add('hide');\n        }\n    });\n" +
                    "    if (count === 0) {\n        empty.classList.remove('hide');\n    } else {\n        empty.classList.add('hide');\n    }\n}\n\n" +
                    "chips.forEach(function (chip) {\n    chip.addEventListener('click', function () {\n        chips.forEach(function (other) {\n" +
                    "            other.classList.remove('active');\n        });\n        chip.classList.add('active');\n        type = chip.dataset.type;\n" +
                    '        showGames();\n    });\n});\n\n' +
                    "searchForm.elements.query.addEventListener('input', showGames);\nsearchForm.addEventListener('submit', function (event) {\n" +
                    '    event.preventDefault();\n    showGames();\n});',
            },
            checks: [
                ['Поиск «dota» оставляет 1 игру', function (t) {
                    t.type('.search input', 'dota');
                    return T.shown(t, '.game') === 1;
                }],
                ['Большие буквы не мешают («VALORANT»)', function (t) {
                    t.type('.search input', 'VALORANT');
                    return T.shown(t, '.game') === 1;
                }],
                ['Поиск учитывает фильтр (FPS + «dota» = 0)', function (t) {
                    t.type('.search input', 'dota');
                    t.click('[data-type="fps"]');
                    return T.shown(t, '.game') === 0;
                }],
                ['Ничего не найдено — видно .empty', function (t) { return t.visible('.empty'); }],
                ['Пустой поиск и «Все» — снова 4 игры, .empty спрятан', function (t) {
                    t.type('.search input', '');
                    t.click('[data-type="all"]');
                    return T.shown(t, '.game') === 4 && !t.visible('.empty');
                }],
                ['Отправка формы не перезагружает страницу', function (t) { return t.submit('.search'); }],
            ],
        },

        // 12
        {
            title: 'JS: «Моя дисциплина»',
            kind: 'JS',
            text: '<p>Кнопка «Моя дисциплина» запоминает любимую игру — потом её покажет страница «Анкета». Напиши:</p><ul>' +
                '<li>функцию <code>showChosen()</code>: для каждой карточки возьми её кнопку <code>.choose-button</code>. Если текст заголовка ' +
                '<code>card.querySelector(\'h2\').textContent</code> равен <code>data.game</code> — поставь кнопке класс <code>chosen</code> и текст «Выбрано ✓», ' +
                'иначе сними класс и верни текст «Моя дисциплина»</li>' +
                '<li>вызови <code>showChosen()</code> сразу — чтобы после перезагрузки выбор был виден</li>' +
                '<li>для каждой карточки: при клике на её кнопку запиши название в <code>data.game</code>, вызови <code>saveData(data)</code> и <code>showChosen()</code></li></ul>',
            hint: ['card.querySelector(...)', 'data.game', 'saveData(data)', 'textContent', "classList.add('chosen')"],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: gridHtml,
                css: gridCss + '\n' + bodyCss + '\n' + chosenCss,
                js: T.js.data + "\nconst data = loadData();\nconst cards = document.querySelectorAll('.game');\n\n" +
                    '// 1) функция showChosen()\n\n\n// 2) вызови её сразу\n\n\n// 3) клик по кнопке «Моя дисциплина»\n',
            },
            answer: {
                js: T.js.data + "\nconst data = loadData();\nconst cards = document.querySelectorAll('.game');\n\n" +
                    "function showChosen() {\n    cards.forEach(function (card) {\n        const button = card.querySelector('.choose-button');\n" +
                    "        if (card.querySelector('h2').textContent === data.game) {\n            button.classList.add('chosen');\n            button.textContent = 'Выбрано ✓';\n" +
                    "        } else {\n            button.classList.remove('chosen');\n            button.textContent = 'Моя дисциплина';\n        }\n    });\n}\n\n" +
                    'showChosen();\n\n' +
                    "cards.forEach(function (card) {\n    card.querySelector('.choose-button').addEventListener('click', function () {\n" +
                    "        data.game = card.querySelector('h2').textContent;\n        saveData(data);\n        showChosen();\n    });\n});",
            },
            checks: [
                ['Клик по Dota 2 — «Выбрано ✓»', function (t) {
                    t.click(t.all('.choose-button')[1]);
                    const b = t.all('.choose-button')[1];
                    return b.classList.contains('chosen') && b.textContent.trim() === 'Выбрано ✓';
                }],
                ['Выбор сохранён в localStorage', function (t) {
                    const s = T.saved();
                    return !!s && s.game === 'Dota 2';
                }],
                ['Клик по Valorant снимает выбор с Dota 2', function (t) {
                    t.click(t.all('.choose-button')[2]);
                    const b = t.all('.choose-button');
                    return b[2].classList.contains('chosen') && !b[1].classList.contains('chosen') && b[1].textContent.trim() === 'Моя дисциплина';
                }],
                ['Выбрана ровно одна игра', function (t) { return t.all('.choose-button.chosen').length === 1 && T.saved().game === 'Valorant'; }],
            ],
        },
    ];
})();
