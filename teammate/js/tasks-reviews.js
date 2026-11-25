// =========================================================
// Задачи страницы «Отзывы» — Кристина Власова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    const headHtml =
        '<section class="page-head">\n' +
        '    <div>\n' +
        '        <h1>Отзывы и репутация</h1>\n' +
        '        <p class="lead">Оценки помогают выбрать людей для игры и проектов.</p>\n' +
        '    </div>\n' +
        '    <button class="button open-review" type="button">Оставить отзыв</button>\n' +
        '</section>';

    function stat(title, cls, value) {
        return '<article class="card stat">\n    <p>' + title + '</p>\n    <b class="' + cls + '">' + value + '</b>\n</article>';
    }
    const st1 = stat('Средняя оценка', 'stat-average', '—');
    const st2 = stat('Всего отзывов', 'stat-count', '0');
    const st3 = stat('Положительные · 4–5', 'stat-positive', '—');
    const statsHtml = '<section class="stats">\n' + indent(st1) + '\n' + indent(st2) + '\n' + indent(st3) + '\n</section>';

    function filtersHtml(values) {
        let html = '<div class="filters">\n';
        values.forEach(function (v, i) {
            html += '    <button class="chip' + (i === 0 ? ' active' : '') + '" type="button" data-rating="' + v + '">' + (v === 'all' ? 'Все оценки' : v) + '</button>\n';
        });
        return html + '</div>';
    }
    const allRatings = ['all', '5', '4', '3', '2', '1'];

    function review(game, author, player, rating, text) {
        return '<article class="card review">\n' +
            '    <p class="muted">' + game + ' · отзыв от ' + author + '</p>\n' +
            '    <h2>' + player + '</h2>\n' +
            '    <p class="tag">' + rating + ' / 5</p>\n' +
            '    <p>' + text + '</p>\n' +
            '</article>';
    }
    const r1 = review('Counter-Strike 2', 'NeonFox', 'Alex_Shadow', 5, 'Собрал команду вовремя.');
    const r2 = review('Dota 2', 'Alex_Shadow', 'LunaCore', 4, 'Хорошая коммуникация.');
    const reviewsHtml = '<section class="reviews">\n' + indent(filtersHtml(allRatings)) + '\n    <div class="review-list">\n' +
        indent(indent(r1)) + '\n' + indent(indent(r2)) + '\n    </div>\n</section>';

    const pageCss =
        '.main {\n    display: flex;\n    flex-direction: column;\n    gap: 32px;\n    padding-top: 44px;\n    padding-bottom: 64px;\n}\n\n' +
        'h1 {\n    font-family: Georgia, serif;\n    font-size: 44px;\n    line-height: 1.15;\n}\n\n' +
        '.lead {\n    margin-top: 12px;\n    color: #bcb2c9;\n}\n\n' +
        '.page-head {\n    display: flex;\n    gap: 16px;\n    align-items: flex-start;\n    justify-content: space-between;\n}\n';
    const statsCss =
        '.stats {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 14px;\n}\n\n' +
        '.stat p {\n    font-size: 14px;\n    color: #bcb2c9;\n}\n\n' +
        '.stat b {\n    font-family: Georgia, serif;\n    font-size: 30px;\n    color: #f7ca60;\n}\n';
    const reviewsCss =
        '.reviews {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
        '.filters {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' + T.css.chips + '\n' +
        '.review-list {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n}\n\n' +
        '.review {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n';
    const readyCss = T.css.card + '\n' + T.css.tag + '\n' + T.css.muted + '\n' + T.css.buttons + '\n' + T.css.empty;

    // ---------- окно «Оставить отзыв» ----------
    const dialogHead = '<dialog class="modal review-modal" open>\n    <form class="modal-form review-form">\n        <h2>Оставить отзыв</h2>\n';
    const fPlayer = '        <label class="field">Ник тиммейта <input name="player" placeholder="Alex_Shadow"></label>\n';
    const fGame = '        <label class="field">Дисциплина <input name="game" placeholder="Counter-Strike 2"></label>\n';
    const fRating = '        <label class="field">Оценка от 1 до 5 <input name="rating" type="number" min="1" max="5" value="5"></label>\n';
    const fText = '        <label class="field">Отзыв <textarea name="text" rows="3"></textarea></label>\n';
    const dialogError = '        <p class="error hide">Введи ник, дисциплину, оценку от 1 до 5 и текст отзыва.</p>\n';
    const dialogButtons =
        '        <div class="modal-buttons">\n' +
        '            <button class="button" type="submit">Сохранить отзыв</button>\n' +
        '            <button class="button button-quiet close-modal" type="button">Отмена</button>\n' +
        '        </div>\n';
    const dialogTail = '    </form>\n</dialog>';
    const dialogFull = dialogHead + fPlayer + fGame + fRating + fText + dialogError + dialogButtons + dialogTail;

    // ---------- JS ----------
    const createJs =
        'function createReview(review) {\n' +
        "    const card = document.createElement('article');\n    card.classList.add('card', 'review');\n" +
        "    const meta = document.createElement('p');\n    meta.classList.add('muted');\n    meta.textContent = review.game + ' · отзыв от ' + review.author;\n" +
        "    const player = document.createElement('h2');\n    player.textContent = review.player;\n" +
        "    const rating = document.createElement('p');\n    rating.classList.add('tag');\n    rating.textContent = review.rating + ' / 5';\n" +
        "    const text = document.createElement('p');\n    text.textContent = review.text;\n" +
        '    card.append(meta, player, rating, text);\n    return card;\n}\n';
    const listConsts =
        "const data = loadData();\nconst reviewList = document.querySelector('.review-list');\nconst chips = document.querySelectorAll('.filters .chip');\nlet filterRating = 'all';\n\n";
    const showJs =
        "function showReviews() {\n    let count = 0;\n    reviewList.textContent = '';\n\n" +
        '    data.reviews.forEach(function (review) {\n' +
        "        if (filterRating === 'all' || review.rating === Number(filterRating)) {\n" +
        '            reviewList.append(createReview(review));\n            count = count + 1;\n        }\n    });\n\n' +
        "    if (count === 0) {\n        const empty = document.createElement('p');\n        empty.classList.add('empty');\n" +
        "        empty.textContent = 'Отзывов с такой оценкой пока нет.';\n        reviewList.append(empty);\n    }\n}\n\nshowReviews();\n\n" +
        "chips.forEach(function (chip) {\n    chip.addEventListener('click', function () {\n        chips.forEach(function (other) {\n" +
        "            other.classList.remove('active');\n        });\n        chip.classList.add('active');\n        filterRating = chip.dataset.rating;\n" +
        '        showReviews();\n    });\n});\n';
    const statsJs =
        'function showStats() {\n    const count = data.reviews.length;\n    let sum = 0;\n    let positive = 0;\n\n' +
        '    data.reviews.forEach(function (review) {\n        sum = sum + review.rating;\n        if (review.rating >= 4) {\n            positive = positive + 1;\n        }\n    });\n\n' +
        "    document.querySelector('.stat-count').textContent = count;\n" +
        "    if (count === 0) {\n        document.querySelector('.stat-average').textContent = '—';\n        document.querySelector('.stat-positive').textContent = '—';\n        return;\n    }\n" +
        "    document.querySelector('.stat-average').textContent = Math.round(sum / count * 10) / 10 + ' / 5';\n" +
        "    document.querySelector('.stat-positive').textContent = Math.round(positive / count * 100) + '%';\n}\n\nshowStats();\n";
    const simpleShow =
        "function showReviews() {\n    reviewList.textContent = '';\n    data.reviews.forEach(function (review) {\n" +
        "        const card = document.createElement('p');\n        card.classList.add('review');\n" +
        "        card.textContent = review.player + ' · ' + review.rating + ' / 5';\n        reviewList.append(card);\n    });\n}\n\nshowReviews();\n";
    const simpleStats = "function showStats() {\n    document.querySelector('.stat-count').textContent = data.reviews.length;\n}\n\nshowStats();\n";
    const modalConsts = "const reviewModal = document.querySelector('.review-modal');\nconst reviewForm = document.querySelector('.review-form');\n\n";

    function setReviews(list) {
        return function () {
            localStorage.setItem('teamplay', JSON.stringify({ profile: null, game: '', requests: [], replies: [], reviews: list }));
        };
    }
    function fillReview(t, player, game, rating, text) {
        const f = t.q('.review-form');
        f.elements.player.value = player;
        f.elements.game.value = game;
        f.elements.rating.value = rating;
        f.elements.text.value = text;
    }

    QUEST_TASKS.reviews = [
        // 1
        T.base(),

        // 2
        T.header('reviews'),

        // 3
        {
            title: 'Заголовок страницы',
            kind: 'CSS',
            text: '<p>Вверху — заголовок с описанием и кнопка «Оставить отзыв». HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.main</code>: блоки столбиком, промежуток <code>32px</code>, отступ сверху <code>44px</code>, снизу <code>64px</code></li>' +
                '<li><code>h1</code>: шрифт <code>Georgia, serif</code>, <code>44px</code>, высота строки <code>1.15</code></li>' +
                '<li><code>.lead</code>: отступ сверху <code>12px</code>, цвет <code>#bcb2c9</code></li>' +
                '<li><code>.page-head</code>: в строку, края разнесены, прижато к верху (<code>align-items: flex-start</code>), промежуток <code>16px</code></li></ul>',
            hint: ['display: flex', 'flex-direction: column', 'gap', 'padding-top', 'padding-bottom', 'font-family', 'font-size', 'line-height', 'margin-top', 'color',
                'justify-content: space-between', 'align-items: flex-start'],
            start: {
                html: '<main class="container main">\n' + indent(headHtml) + '\n\n    <p class="empty">Здесь будет статистика и отзывы.</p>\n</main>',
                css: '.main {\n    \n}\n\nh1 {\n    \n}\n\n.lead {\n    \n}\n\n.page-head {\n    \n}\n\n/* Уже готово */\n' + T.css.buttons + '\n' + T.css.empty,
            },
            answer: { css: pageCss + '\n' + T.css.buttons + '\n' + T.css.empty },
            checks: [
                ['.main: столбиком, промежуток 32px', function (t) {
                    return t.css('.main', 'display') === 'flex' && t.css('.main', 'flex-direction') === 'column' && t.css('.main', 'row-gap') === '32px';
                }],
                ['.main: сверху 44px, снизу 64px', function (t) {
                    return t.px('.main', 'padding-top') === 44 && t.px('.main', 'padding-bottom') === 64;
                }],
                ['h1: Georgia 44px, высота строки 1.15', function (t) {
                    return t.css('h1', 'font-family').indexOf('Georgia') >= 0 && t.px('h1', 'font-size') === 44 && Math.abs(t.px('h1', 'line-height') - 50.6) < 0.5;
                }],
                ['.lead: сверху 12px, цвет #bcb2c9', function (t) {
                    return t.px('.lead', 'margin-top') === 12 && t.color('.lead', 'color') === '#bcb2c9';
                }],
                ['.page-head: в строку, края разнесены, промежуток 16px', function (t) {
                    return t.css('.page-head', 'display') === 'flex' && t.css('.page-head', 'justify-content') === 'space-between' &&
                        t.css('.page-head', 'column-gap') === '16px';
                }],
                ['.page-head: прижато к верху', function (t) { return t.css('.page-head', 'align-items') === 'flex-start'; }],
            ],
        },

        // 4
        {
            title: 'Статистика: разметка',
            kind: 'HTML',
            text: '<p>Под заголовком — три карточки со статистикой. Первая готова, допиши ещё две по образцу:</p><ul>' +
                '<li>«Всего отзывов» и число в <code>&lt;b class="stat-count"&gt;0&lt;/b&gt;</code></li>' +
                '<li>«Положительные · 4–5» и значение в <code>&lt;b class="stat-positive"&gt;—&lt;/b&gt;</code></li></ul>' +
                '<p>Классы <code>stat-count</code> и <code>stat-positive</code> нужны JS: он впишет туда настоящие числа.</p>',
            hint: ['<article class="...">', '<p>', '<b class="...">'],
            start: {
                html: '<section class="stats">\n' + indent(st1) + '\n\n    <!-- ещё две карточки -->\n\n</section>',
                css: statsCss + '\n' + T.css.card,
            },
            answer: { html: statsHtml },
            checks: [
                ['Три карточки .card.stat', function (t) { return t.all('.stats .card.stat').length === 3; }],
                ['Подписи по порядку', function (t) {
                    return t.all('.stat p').map(function (p) { return p.textContent.trim(); }).join('|') === 'Средняя оценка|Всего отзывов|Положительные · 4–5';
                }],
                ['b.stat-count со значением 0', function (t) { return t.text('.stat b.stat-count') === '0'; }],
                ['b.stat-positive со значением —', function (t) { return t.text('.stat b.stat-positive') === '—'; }],
            ],
        },

        // 5
        {
            title: 'Статистика: оформление',
            kind: 'CSS',
            text: '<p>Оформим статистику:</p><ul>' +
                '<li><code>.stats</code>: сетка из трёх колонок (<code>repeat(3, 1fr)</code>), промежуток <code>14px</code></li>' +
                '<li><code>.card</code>: отступы <code>18px</code>, фон <code>#1c1b23</code>, рамка <code>1px solid #3a3547</code>, скругление <code>12px</code></li>' +
                '<li><code>.stat p</code>: <code>14px</code>, цвет <code>#bcb2c9</code></li>' +
                '<li><code>.stat b</code>: крупное число — шрифт <code>Georgia, serif</code>, <code>30px</code>, цвет <code>#f7ca60</code></li></ul>',
            hint: ['display: grid', 'grid-template-columns: repeat(3, 1fr)', 'border: 1px solid ...', 'border-radius'],
            start: {
                html: statsHtml,
                css: '.stats {\n    \n}\n\n.card {\n    \n}\n\n.stat p {\n    \n}\n\n.stat b {\n    \n}\n',
            },
            answer: { css: statsCss + '\n' + T.css.card },
            checks: [
                ['.stats — сетка из 3 колонок, промежуток 14px', function (t) {
                    return t.css('.stats', 'display') === 'grid' && t.css('.stats', 'grid-template-columns').split(' ').length === 3 &&
                        t.css('.stats', 'column-gap') === '14px';
                }],
                ['.card: отступы 18px, фон #1c1b23, скругление 12px', function (t) {
                    return t.px('.card', 'padding-top') === 18 && t.color('.card', 'background-color') === '#1c1b23' && t.px('.card', 'border-top-left-radius') === 12;
                }],
                ['.card: рамка 1px #3a3547', function (t) {
                    return Math.abs(t.px('.card', 'border-top-width') - 1) <= 0.5 && t.color('.card', 'border-top-color') === '#3a3547';
                }],
                ['.stat p: 14px, #bcb2c9', function (t) {
                    return t.px('.stat p', 'font-size') === 14 && t.color('.stat p', 'color') === '#bcb2c9';
                }],
                ['.stat b: Georgia 30px, #f7ca60', function (t) {
                    return t.css('.stat b', 'font-family').indexOf('Georgia') >= 0 && t.px('.stat b', 'font-size') === 30 && t.color('.stat b', 'color') === '#f7ca60';
                }],
            ],
        },

        // 6
        {
            title: 'Фильтр по оценке и карточки отзывов',
            kind: 'HTML + CSS',
            text: '<p>Ниже — кнопки фильтра и сами отзывы. Кнопки «Все оценки» и «5» готовы, допиши ещё четыре: <code>4</code>, <code>3</code>, <code>2</code>, <code>1</code> ' +
                '(у каждой <code>class="chip"</code>, <code>type="button"</code> и <code>data-rating</code> с той же цифрой).</p><p>И оформи:</p><ul>' +
                '<li><code>.reviews</code>: столбиком, промежуток <code>16px</code>; <code>.filters</code>: в строку с переносом, промежуток <code>8px</code></li>' +
                '<li><code>.chip</code>: отступы <code>8px 14px</code>, жирный <code>700</code>, фон <code>#15141b</code>, рамка <code>1px solid #3a3547</code>, скругление <code>8px</code>; ' +
                '<code>.chip.active</code>: фон <code>#f7ca60</code>, текст <code>#241a06</code></li>' +
                '<li><code>.review-list</code>: сетка из двух колонок, промежуток <code>16px</code>; <code>.review</code>: столбиком, промежуток <code>10px</code></li></ul>',
            hint: ['<button class="..." type="button" data-rating="...">', 'flex-wrap: wrap', 'font-weight', 'grid-template-columns: repeat(2, 1fr)'],
            start: {
                html: reviewsHtml.replace(/ {8}<button class="chip" type="button" data-rating="[1-4]">[1-4]<\/button>\n/g, '').replace('    </div>\n    <div class="review-list">',
                    '        <!-- ещё четыре кнопки -->\n    </div>\n    <div class="review-list">'),
                css: '.reviews {\n    \n}\n\n.filters {\n    \n}\n\n.chip {\n    \n}\n\n.chip.active {\n    \n}\n\n.review-list {\n    \n}\n\n.review {\n    \n}\n\n/* Уже готово */\n' + readyCss,
            },
            answer: { html: reviewsHtml, css: reviewsCss + '\n' + readyCss },
            checks: [
                ['Шесть кнопок .chip', function (t) { return t.all('.filters button.chip').length === 6; }],
                ['data-rating: all, 5, 4, 3, 2, 1', function (t) {
                    return t.all('.filters .chip').map(function (b) { return b.dataset.rating; }).join(',') === 'all,5,4,3,2,1';
                }],
                ['Тексты кнопок совпадают с цифрами', function (t) {
                    return t.all('.filters .chip').slice(1).every(function (b) { return b.textContent.trim() === b.dataset.rating; });
                }],
                ['.reviews столбиком 16px, .filters в строку 8px', function (t) {
                    return t.css('.reviews', 'flex-direction') === 'column' && t.css('.reviews', 'row-gap') === '16px' &&
                        t.css('.filters', 'display') === 'flex' && t.css('.filters', 'flex-wrap') === 'wrap' && t.css('.filters', 'column-gap') === '8px';
                }],
                ['.chip: отступы 8px 14px, фон #15141b, скругление 8px', function (t) {
                    return t.px('.chip:not(.active)', 'padding-top') === 8 && t.px('.chip:not(.active)', 'padding-left') === 14 &&
                        t.color('.chip:not(.active)', 'background-color') === '#15141b' && t.px('.chip:not(.active)', 'border-top-left-radius') === 8;
                }],
                ['.chip.active: фон #f7ca60, текст #241a06', function (t) {
                    return t.color('.chip.active', 'background-color') === '#f7ca60' && t.color('.chip.active', 'color') === '#241a06';
                }],
                ['.review-list — сетка из 2 колонок, 16px', function (t) {
                    return t.css('.review-list', 'display') === 'grid' && t.css('.review-list', 'grid-template-columns').split(' ').length === 2 &&
                        t.css('.review-list', 'column-gap') === '16px';
                }],
                ['.review: столбиком, промежуток 10px', function (t) {
                    return t.css('.review', 'flex-direction') === 'column' && t.css('.review', 'row-gap') === '10px';
                }],
            ],
        },

        // 7
        T.modalTask(
            'Окно «Оставить отзыв»',
            '<p>Кнопка «Оставить отзыв» открывает окно с формой. Сделай окно <code>&lt;dialog class="modal review-modal" open&gt;</code>, ' +
            'внутри форма <code>&lt;form class="modal-form review-form"&gt;</code> с заголовком <code>&lt;h2&gt;Оставить отзыв&lt;/h2&gt;</code>. ' +
            'Поля и кнопки уже лежат внутри комментария — перенеси их в форму после заголовка.</p>',
            '<!-- окно: dialog → form → h2, потом эти поля и кнопки:\n' + fPlayer + fGame + fRating + fText + dialogError + dialogButtons + '-->\n',
            dialogFull,
            [
                ['Окно dialog.modal.review-modal', function (t) { return !!t.q('dialog.modal.review-modal'); }],
                ['В нём форма .modal-form.review-form', function (t) { return !!t.q('dialog form.modal-form.review-form'); }],
                ['Заголовок «Оставить отзыв»', function (t) { return t.text('.review-form h2') === 'Оставить отзыв'; }],
                ['Поля и кнопки внутри формы', function (t) {
                    return t.all('.review-form .field').length === 4 && !!t.q('.review-form button[type="submit"]') && !!t.q('.review-form .close-modal');
                }],
            ],
            ['<form class="...">', '<h2>']
        ),

        // 8
        T.fieldsTask(
            'Поля отзыва',
            '<p>В окне пока только ник тиммейта. Допиши после него ещё три поля по образцу:</p><ul>' +
            '<li>«Дисциплина» — <code>&lt;input name="game" placeholder="Counter-Strike 2"&gt;</code></li>' +
            '<li>«Оценка от 1 до 5» — числовое поле <code>&lt;input name="rating" type="number" min="1" max="5" value="5"&gt;</code> ' +
            '(<code>type="number"</code> даёт стрелки, <code>min</code> и <code>max</code> — границы, <code>value</code> — значение сразу)</li>' +
            '<li>«Отзыв» — большое поле <code>&lt;textarea name="text" rows="3"&gt;&lt;/textarea&gt;</code></li></ul>' +
            '<p>Каждое поле — внутри <code>&lt;label class="field"&gt;</code>.</p>',
            dialogHead + fPlayer + '\n        <!-- ещё три поля -->\n\n' + dialogError + dialogButtons + dialogTail,
            dialogFull,
            [
                ['Четыре поля .field', function (t) { return t.all('.review-form label.field').length === 4; }],
                ['Поле game', function (t) { return !!t.q('label.field input[name="game"]'); }],
                ['Оценка: type="number", min 1, max 5, value 5', function (t) {
                    const i = t.q('label.field input[name="rating"]');
                    return !!i && i.getAttribute('type') === 'number' && i.getAttribute('min') === '1' && i.getAttribute('max') === '5' && i.getAttribute('value') === '5';
                }],
                ['Порядок: player, game, rating, text', function (t) {
                    return t.all('.review-form input, .review-form textarea').map(function (e) { return e.name; }).join(',') === 'player,game,rating,text';
                }],
            ],
            ['type="number" min="1" max="5" value="5"', 'name="..."', 'placeholder="..."', 'rows="3"']
        ),

        // 9
        T.footer('reviews'),

        // 10
        {
            title: 'JS: бургер и список отзывов',
            kind: 'JS',
            text: '<p>Отзывы лежат в <code>data.reviews</code>, функция <code>createReview(review)</code> уже делает из отзыва карточку. Напиши:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>функцию <code>showReviews()</code>: очисти список, для каждого отзыва — если <code>filterRating === \'all\'</code> или ' +
                '<code>review.rating === Number(filterRating)</code>, добавь в список <code>createReview(review)</code> и прибавь 1 к счётчику. ' +
                'Если в итоге <code>0</code> — добавь <code>&lt;p class="empty"&gt;</code> с текстом «Отзывов с такой оценкой пока нет.»</li>' +
                '<li>вызови <code>showReviews()</code> сразу</li>' +
                '<li>кнопки фильтра <code>chips</code>: при клике сними <code>active</code> со всех, поставь нажатой, запомни <code>filterRating = chip.dataset.rating</code> и вызови <code>showReviews()</code></li></ul>' +
                '<p><code>Number(...)</code> нужен потому, что в <code>data-rating</code> лежит текст <code>"5"</code>, а в отзыве — число <code>5</code>.</p>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", 'function showReviews() { }', "textContent = ''",
                'data.reviews.forEach(...)', 'Number(...)', '||', '.append(...)', 'let count = 0', "document.createElement('p')", 'chip.dataset.rating', 'classList.add / remove'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + filtersHtml(allRatings) + '\n<div class="review-list"></div>',
                css: T.burgerCss + '\n' + reviewsCss + '\n' + readyCss,
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" + T.js.data + '\n' + listConsts + createJs +
                    '\n// 1) бургер\n\n\n// 2) функция showReviews() и её вызов\n\n\n// 3) клик по кнопкам фильтра\n',
            },
            answer: {
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" + T.js.data + '\n' + listConsts + createJs + '\n' +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" + showJs,
            },
            checks: T.burgerChecks.concat([
                ['В списке 3 отзыва', function (t) { return t.all('.review-list .review').length === 3; }],
                ['Фильтр «5» — 2 отзыва', function (t) {
                    t.click('[data-rating="5"]');
                    return t.all('.review-list .review').length === 2 && t.has('[data-rating="5"]', 'active') && !t.has('[data-rating="all"]', 'active');
                }],
                ['Фильтр «4» — 1 отзыв LunaCore', function (t) {
                    t.click('[data-rating="4"]');
                    return t.all('.review-list .review').length === 1 && t.text('.review h2') === 'LunaCore';
                }],
                ['Фильтр «1» — сообщение .empty', function (t) {
                    t.click('[data-rating="1"]');
                    return t.all('.review-list .review').length === 0 && !!t.q('.review-list .empty');
                }],
                ['«Все оценки» — снова 3 без повторов', function (t) {
                    t.click('[data-rating="all"]');
                    return t.all('.review-list .review').length === 3 && !t.q('.review-list .empty') && t.all('.filters .active').length === 1;
                }],
            ]),
        },

        // 11
        {
            title: 'JS: статистика',
            kind: 'JS',
            text: '<p>Посчитаем статистику. Напиши функцию <code>showStats()</code>:</p><ul>' +
                '<li><code>count</code> — сколько всего отзывов (<code>data.reviews.length</code>); заведи <code>let sum = 0</code> и <code>let positive = 0</code></li>' +
                '<li>для каждого отзыва прибавь его оценку к <code>sum</code>, а если оценка <code>&gt;= 4</code> — прибавь 1 к <code>positive</code></li>' +
                '<li>в <code>.stat-count</code> напиши <code>count</code>. Если отзывов нет — в остальные две впиши «—» и выйди</li>' +
                '<li>в <code>.stat-average</code>: средняя с одной цифрой после точки — <code>Math.round(sum / count * 10) / 10 + \' / 5\'</code></li>' +
                '<li>в <code>.stat-positive</code>: доля хороших в процентах — <code>Math.round(positive / count * 100) + \'%\'</code></li></ul>' +
                '<p>Вызови <code>showStats()</code> сразу.</p>',
            hint: ['function showStats() { }', 'data.reviews.length', 'let sum = 0', 'sum = sum + review.rating', '>=', 'Math.round(...)', 'return'],
            before: setReviews([
                { player: 'A', author: 'B', game: 'Dota 2', rating: 5, text: 'x' },
                { player: 'C', author: 'D', game: 'Dota 2', rating: 4, text: 'x' },
                { player: 'E', author: 'F', game: 'Dota 2', rating: 2, text: 'x' },
            ]),
            after: T.resetData,
            start: {
                html: statsHtml,
                css: statsCss + '\n' + T.css.card,
                js: T.js.data + '\nconst data = loadData();\n\n// функция showStats() и её вызов\n',
            },
            answer: { js: T.js.data + '\nconst data = loadData();\n\n' + statsJs },
            checks: [
                ['Всего отзывов: 3', function (t) { return t.text('.stat-count') === '3'; }],
                ['Средняя оценка: 3.7 / 5', function (t) { return t.text('.stat-average') === '3.7 / 5'; }],
                ['Положительные: 67%', function (t) { return t.text('.stat-positive') === '67%'; }],
            ],
        },

        // 12
        {
            title: 'JS: оставить отзыв',
            kind: 'JS',
            text: '<p>Окно «Оставить отзыв» должно работать:</p><ul>' +
                '<li>кнопка <code>.open-review</code>: очисти форму (<code>reviewForm.reset()</code>), спрячь ошибку <code>.error</code> и открой окно (<code>showModal()</code>)</li>' +
                '<li>отправка формы: отмени перезагрузку, возьми <code>player</code>, <code>game</code>, <code>text</code> (с <code>trim()</code>) и оценку числом: ' +
                '<code>Number(reviewForm.elements.rating.value)</code></li>' +
                '<li>если ник, игра или текст пустые, или оценка меньше 1 или больше 5 — покажи ошибку и выйди</li>' +
                '<li>иначе добавь в <code>data.reviews</code> объект <code>{ player: player, author: myName(), game: game, rating: rating, text: text }</code>, ' +
                'сохрани, вызови <code>showReviews()</code> и <code>showStats()</code> и закрой окно</li></ul>' +
                '<p>Кнопка «Отмена» уже закрывает окно — этот код готов.</p>',
            hint: ['.reset()', '.showModal()', '.close()', "addEventListener('submit', ...)", 'event.preventDefault()', '.value.trim()', 'Number(...)', '<', '>', '||', 'myName()', '.push(...)', 'saveData(data)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="button open-review" type="button">Оставить отзыв</button>\n<p>Всего отзывов: <b class="stat-count">0</b></p>\n' +
                    '<div class="review-list"></div>\n\n' + dialogFull.replace(' open>', '>'),
                css: T.css.modal + '\n' + T.css.fields + '\n' + T.css.modalButtons + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: T.js.data + "\nconst data = loadData();\nconst reviewList = document.querySelector('.review-list');\n\n" + simpleShow + '\n' + simpleStats + '\n' +
                    T.js.close + '\n' + modalConsts + '// 1) открыть окно\n\n\n// 2) отправка формы\n',
            },
            answer: {
                js: T.js.data + "\nconst data = loadData();\nconst reviewList = document.querySelector('.review-list');\n\n" + simpleShow + '\n' + simpleStats + '\n' +
                    T.js.close + '\n' + modalConsts +
                    "document.querySelector('.open-review').addEventListener('click', function () {\n    reviewForm.reset();\n" +
                    "    reviewForm.querySelector('.error').classList.add('hide');\n    reviewModal.showModal();\n});\n\n" +
                    "reviewForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    '    const player = reviewForm.elements.player.value.trim();\n    const game = reviewForm.elements.game.value.trim();\n' +
                    '    const rating = Number(reviewForm.elements.rating.value);\n    const text = reviewForm.elements.text.value.trim();\n\n' +
                    "    if (player === '' || game === '' || text === '' || rating < 1 || rating > 5) {\n" +
                    "        reviewForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    '    data.reviews.push({ player: player, author: myName(), game: game, rating: rating, text: text });\n' +
                    '    saveData(data);\n    showReviews();\n    showStats();\n    reviewModal.close();\n});',
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-review');
                    return t.q('.review-modal').open === true;
                }],
                ['Пустая форма — ошибка, окно не закрылось', function (t) {
                    const prevented = t.submit('.review-form');
                    return prevented && t.visible('.review-form .error') && t.q('.review-modal').open === true;
                }],
                ['Оценка 9 — ошибка', function (t) {
                    fillReview(t, 'LunaCore', 'Dota 2', '9', 'Отличный саппорт');
                    t.submit('.review-form');
                    return t.q('.review-modal').open === true && T.saved() === null;
                }],
                ['Оценка 4 — окно закрылось, отзывов 4', function (t) {
                    fillReview(t, ' LunaCore ', 'Dota 2', '4', 'Отличный саппорт');
                    t.submit('.review-form');
                    return t.q('.review-modal').open === false && t.all('.review-list .review').length === 4 && t.text('.stat-count') === '4';
                }],
                ['Сохранено: ник без пробелов, оценка числом, автор «Гость»', function (t) {
                    const r = T.saved().reviews[3];
                    return r.player === 'LunaCore' && r.rating === 4 && r.author === 'Гость' && r.game === 'Dota 2';
                }],
                ['Повторное открытие — форма сброшена, ошибка спрятана', function (t) {
                    t.click('.open-review');
                    return t.q('.review-form').elements.player.value === '' && t.q('.review-form').elements.rating.value === '5' && !t.visible('.review-form .error');
                }],
            ],
        },
    ];
})();
