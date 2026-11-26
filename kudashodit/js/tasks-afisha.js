// =========================================================
// Задачи страницы «Афиша» — Самвел Аракелян
// =========================================================

(function () {
    const T = QuestTasks;

    // одна карточка события (для задач, где она нужна готовой)
    function eventCard(id, type, day, date, tag, tagClass, price, title, time, place, footer, going) {
        return '<article class="card event" data-id="' + id + '" data-type="' + type + '">\n' +
            '    <div class="event-date">' + day + '<small>' + date + '</small></div>\n' +
            '    <div class="event-body">\n' +
            '        <div class="event-tags"><b class="tag ' + tagClass + '">' + tag + '</b> ' + price + '</div>\n' +
            '        <h3>' + title + '</h3>\n' +
            '        <div class="event-meta">\n' +
            '            <div><div class="icon">schedule</div> ' + time + '</div>\n' +
            '            <div><div class="icon">location_on</div> ' + place + '</div>\n' +
            '        </div>\n' +
            '        <div class="event-footer">\n' +
            '            <p>' + footer + '</p>\n' +
            '            <div class="actions">\n' +
            '                <button class="round-btn share-btn"><div class="icon">share</div></button>\n' +
            '                <button class="btn go-btn' + (going ? ' btn-accent' : '') + '">Иду</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</article>';
    }

    const events = [
        eventCard('kino', 'free near kino', 'СБ', '24 мая', 'Культура', 'tag-culture', '<b class="price-free">0 ₽</b>',
            'Кинопоказ в сквере им. Дзержинского', '18:00', 'Центр · Сквер', 'Осталось 19 билетов', true),
        eventCard('quiz', 'near quiz', 'СБ', '24 мая', 'Квизы &amp; Настолки', 'tag-quiz', '300 ₽',
            'Квиз в кафе «Одно Вино / Coffee Rooms»', '19:00', 'ул. Ленина, 13', 'Команды 2-6 чел', false),
        eventCard('fifa', 'free near', 'ВС', '25 мая', 'Активности', 'tag-active', '<b class="price-free">0 ₽</b>',
            'Турнир FIFA &amp; настольный теннис', '12:00', 'Библиотека Пушкина', 'Регистрация открыта', true),
        eventCard('indie', 'music', 'ВС', '25 мая', 'Музыка', 'tag-music', '800 ₽',
            'Инди-концерт омских резидентов', '20:00', 'Ленинградская площадь', 'Осталось 14 билетов', false),
        eventCard('walk', 'free near', 'СБ', '24 мая', 'Город', 'tag-culture', '<b class="price-free">0 ₽</b>',
            'Тайные дворики Любинского', '15:00', 'Старт у памятника Любе', 'Пешком · 1.5 часа', true),
    ];
    const allEvents = events.join('\n\n');

    // готовые стили карточек событий (для задач 7–11)
    const cardCss = '.card {\n    background: #1c1c20;\n    border-radius: 16px;\n    padding: 16px;\n    margin-bottom: 14px;\n}\n';
    const eventCss = cardCss +
        '\n.event {\n    display: flex;\n    gap: 12px;\n}\n\n' +
        '.event-date {\n    min-width: 44px;\n    width: 44px;\n    height: 46px;\n    border-radius: 10px;\n    background: #26262b;\n' +
        '    color: #f5a623;\n    text-align: center;\n    font-weight: 700;\n    font-size: 16px;\n    padding-top: 6px;\n}\n\n' +
        '.event-date small {\n    display: block;\n    font-size: 9px;\n    color: #9a9aa2;\n}\n\n' +
        '.event-body {\n    flex: 1;\n}\n\n.event h3 {\n    font-size: 16px;\n    margin: 6px 0;\n}\n\n' +
        '.event-meta {\n    display: flex;\n    gap: 12px;\n    color: #9a9aa2;\n    font-size: 13px;\n}\n\n' +
        '.event-footer {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-top: 12px;\n' +
        '    font-size: 12px;\n    font-weight: 600;\n}\n\n.event-footer .actions {\n    display: flex;\n    gap: 6px;\n}\n';
    const tagsCss =
        '.event-tags {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-weight: 700;\n}\n\n' +
        '.tag {\n    padding: 2px 8px;\n    border-radius: 6px;\n    font-size: 12px;\n    font-weight: 600;\n}\n\n' +
        '.tag-culture  { background: #4a3a1c; color: #f5c46b; }\n.tag-quiz     { background: #4a1c2c; color: #f58fb0; }\n' +
        '.tag-active   { background: #26334d; color: #9ec0ff; }\n.tag-music    { background: #6b1030; color: #ffb3c8; }\n\n' +
        '.price-free {\n    color: #f5a623;\n}\n';
    const roundBtnCss =
        '.round-btn {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    border: none;\n    background: #26262b;\n' +
        '    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n}\n';
    const readyCss = eventCss + '\n' + tagsCss + '\n' + T.btnCss + '\n' + roundBtnCss + '\n' + T.hideCss;

    const filtersHtml =
        '<div class="filters">\n' +
        '    <button class="btn btn-accent filter-btn" data-filter="all">Все</button>\n' +
        '    <button class="btn filter-btn" data-filter="free">Бесплатно · 0 ₽</button>\n' +
        '    <button class="btn filter-btn" data-filter="near">Рядом</button>\n' +
        '    <button class="btn filter-btn" data-filter="kino">Кино</button>\n' +
        '    <button class="btn filter-btn" data-filter="quiz">Квизы</button>\n' +
        '    <button class="btn filter-btn" data-filter="music">Музыка</button>\n' +
        '</div>';
    const filtersCss = '.filters {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin: 16px 0;\n}\n';

    function visibleEvents(t) {
        return t.all('.event').filter(function (e) { return t.visible(e); }).length;
    }

    QUEST_TASKS.afisha = [
        // 1
        T.base(),

        // 2
        T.mainHeader(),

        // 3
        {
            title: 'Заголовок и значок LIVE',
            kind: 'HTML + CSS',
            text: '<p>Под шапкой — заголовок «Куда сходить» и значок <b>LIVE</b> с оранжевой точкой.</p><ul>' +
                '<li>HTML: в конец <code>.page-title</code> добавь <code>&lt;b class="badge-live"&gt;</code>, внутри — ' +
                '<code>&lt;div class="dot"&gt;&lt;/div&gt;</code> и текст <code>LIVE</code></li>' +
                '<li><code>.page-title</code>: в строку, края разнесены (<code>space-between</code>)</li>' +
                '<li><code>.page-title h1</code>: размер <code>22px</code></li>' +
                '<li><code>.badge-live</code>: в строку, по центру, промежуток <code>6px</code>, фон <code>#26262b</code>, ' +
                'скругление <code>999px</code>, отступы <code>4px 10px</code>, текст <code>11px</code></li>' +
                '<li><code>.dot</code>: круг <code>8×8px</code>, фон <code>#f5a623</code></li></ul>',
            hint: ['<b class="badge-live">', '<div class="dot">', 'display: flex', 'justify-content: space-between', 'gap', 'border-radius: 50%'],
            start: {
                html: '<div class="page-title">\n    <div>\n        <h1>Куда сходить</h1>\n' +
                    '        <p class="muted"><b class="link">ОМСК</b> · эти выходные</p>\n    </div>\n    <!-- сюда значок LIVE -->\n\n</div>',
                css: '.page-title {\n    \n}\n\n.page-title h1 {\n    \n}\n\n.badge-live {\n    \n}\n\n.dot {\n    \n}\n\n/* Уже готово */\n' +
                    '.link {\n    color: #f5a623;\n    font-size: 13px;\n    font-weight: 700;\n}\n\n.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}\n',
            },
            answer: {
                html: '<div class="page-title">\n    <div>\n        <h1>Куда сходить</h1>\n' +
                    '        <p class="muted"><b class="link">ОМСК</b> · эти выходные</p>\n    </div>\n' +
                    '    <b class="badge-live"><div class="dot"></div>LIVE</b>\n</div>',
                css: '.page-title {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n}\n\n' +
                    '.page-title h1 {\n    font-size: 22px;\n}\n\n' +
                    '.badge-live {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    background: #26262b;\n' +
                    '    border-radius: 999px;\n    padding: 4px 10px;\n    font-size: 11px;\n    font-weight: 700;\n}\n\n' +
                    '.dot {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: #f5a623;\n}',
            },
            checks: [
                ['В .page-title есть значок .badge-live', function (t) { return !!t.q('.page-title .badge-live'); }],
                ['В значке точка .dot и текст LIVE', function (t) {
                    return !!t.q('.badge-live .dot') && t.text('.badge-live') === 'LIVE';
                }],
                ['.page-title в строку, края разнесены', function (t) {
                    return t.css('.page-title', 'display') === 'flex' && t.css('.page-title', 'justify-content') === 'space-between';
                }],
                ['Заголовок 22px', function (t) { return t.px('.page-title h1', 'font-size') === 22; }],
                ['.badge-live: flex и промежуток 6px', function (t) {
                    return t.css('.badge-live', 'display') === 'flex' && t.css('.badge-live', 'column-gap') === '6px';
                }],
                ['.badge-live: фон #26262b и скругление 999px', function (t) {
                    return t.color('.badge-live', 'background-color') === '#26262b' && t.px('.badge-live', 'border-top-left-radius') === 999;
                }],
                ['.dot: оранжевый круг 8×8px', function (t) {
                    return t.px('.dot', 'width') === 8 && t.px('.dot', 'height') === 8 &&
                        t.round('.dot') && t.color('.dot', 'background-color') === '#f5a623';
                }],
            ],
        },

        // 4
        {
            title: 'Кнопки-фильтры',
            kind: 'HTML + CSS',
            text: '<p>Фильтры — ряд кнопок. Каждой кнопке нужен атрибут <code>data-filter</code>: по нему JS потом поймёт, что показывать.</p><ul>' +
                '<li>HTML: в <code>.filters</code> шесть кнопок <code>&lt;button class="btn filter-btn" data-filter="..."&gt;</code>: ' +
                'Все (<code>all</code>), Бесплатно · 0 ₽ (<code>free</code>), Рядом (<code>near</code>), Кино (<code>kino</code>), ' +
                'Квизы (<code>quiz</code>), Музыка (<code>music</code>). У первой кнопки ещё класс <code>btn-accent</code></li>' +
                '<li><code>.filters</code>: в строку, с переносом (<code>flex-wrap: wrap</code>), промежуток <code>8px</code>, отступы <code>16px 0</code></li>' +
                '<li>Допиши <code>.btn-accent</code>: фон <code>#f5a623</code>, текст <code>#1a1a1a</code></li></ul>',
            hint: ['<button data-filter="all">', 'display: flex', 'flex-wrap: wrap', 'gap', 'margin'],
            start: {
                html: '<div class="filters">\n    <!-- 6 кнопок -->\n\n</div>',
                css: '.filters {\n    \n}\n\n.btn-accent {\n    \n}\n\n/* Уже готово */\n' +
                    '.btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    border: none;\n' +
                    '    border-radius: 999px;\n    padding: 8px 18px;\n    background: #26262b;\n    font-weight: 600;\n    cursor: pointer;\n}\n',
            },
            answer: { html: filtersHtml, css: filtersCss + '\n.btn-accent {\n    background: #f5a623;\n    color: #1a1a1a;\n}' },
            checks: [
                ['В .filters 6 кнопок .filter-btn', function (t) { return t.all('.filters .filter-btn').length === 6; }],
                ['У кнопок есть data-filter: all, free, near, kino, quiz, music', function (t) {
                    const values = t.all('.filter-btn').map(function (b) { return b.dataset.filter; }).join(',');
                    return values === 'all,free,near,kino,quiz,music';
                }],
                ['Первая кнопка «Все» оранжевая (btn-accent)', function (t) {
                    const first = t.q('.filter-btn');
                    return !!first && first.classList.contains('btn-accent') && first.textContent.trim() === 'Все';
                }],
                ['.btn-accent: фон #f5a623', function (t) { return t.color('.btn-accent', 'background-color') === '#f5a623'; }],
                ['.filters в строку с переносом', function (t) {
                    return t.css('.filters', 'display') === 'flex' && t.css('.filters', 'flex-wrap') === 'wrap';
                }],
                ['.filters: промежуток 8px и отступы 16px', function (t) {
                    return t.css('.filters', 'column-gap') === '8px' && t.px('.filters', 'margin-top') === 16;
                }],
            ],
        },

        // 5
        {
            title: 'Подборка выходных',
            kind: 'CSS',
            text: '<p>Карточка с подборкой мест. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.card</code>: фон <code>#1c1c20</code>, скругление <code>16px</code>, отступы <code>16px</code>, снизу <code>14px</code></li>' +
                '<li><code>.promo-label</code>: оранжевый <code>#f5a623</code>, размер <code>12px</code>, жирность <code>700</code>, ЗАГЛАВНЫМИ</li>' +
                '<li><code>.promo h2</code>: размер <code>17px</code>, отступы <code>6px 0</code></li>' +
                '<li><code>.promo-footer</code>: в строку, края разнесены, линия сверху <code>1px solid #2e2e34</code>, ' +
                'отступ сверху снаружи и внутри по <code>12px</code></li></ul>',
            hint: ['background', 'border-radius', 'text-transform: uppercase', 'border-top', 'justify-content: space-between', 'margin-top', 'padding-top'],
            start: {
                html: '<section class="card promo">\n    <div class="promo-label"><div class="icon">verified</div> Подборка выходных</div>\n' +
                    '    <h2>12 локаций без билетов в центре</h2>\n' +
                    '    <p class="muted">Любинский проспект, набережная Тухачевского и скейт-парк на Зелёном острове</p>\n' +
                    '    <div class="promo-footer">\n        <p>Обновлено сегодня, 14:20</p>\n' +
                    '        <a href="#" class="link guide-link">Смотреть гид ›</a>\n    </div>\n</section>',
                css: '.card {\n    \n}\n\n.promo-label {\n    \n}\n\n.promo h2 {\n    \n}\n\n.promo-footer {\n    \n}\n\n/* Уже готово */\n' +
                    '.link {\n    color: #f5a623;\n    font-size: 13px;\n    font-weight: 700;\n}\n\n.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}\n',
            },
            answer: {
                css: cardCss + '\n.promo-label {\n    color: #f5a623;\n    font-size: 12px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n' +
                    '.promo h2 {\n    font-size: 17px;\n    margin: 6px 0;\n}\n\n' +
                    '.promo-footer {\n    display: flex;\n    justify-content: space-between;\n    border-top: 1px solid #2e2e34;\n' +
                    '    margin-top: 12px;\n    padding-top: 12px;\n    font-size: 12px;\n    font-weight: 600;\n}',
            },
            checks: [
                ['.card: фон #1c1c20', function (t) { return t.color('.card', 'background-color') === '#1c1c20'; }],
                ['.card: скругление 16px, отступы 16px', function (t) {
                    return t.px('.card', 'border-top-left-radius') === 16 && t.px('.card', 'padding-left') === 16;
                }],
                ['.promo-label: оранжевый и ЗАГЛАВНЫЙ', function (t) {
                    return t.color('.promo-label', 'color') === '#f5a623' && t.css('.promo-label', 'text-transform') === 'uppercase';
                }],
                ['.promo-label: 12px, жирность 700', function (t) {
                    return t.px('.promo-label', 'font-size') === 12 && t.css('.promo-label', 'font-weight') === '700';
                }],
                ['Заголовок карточки 17px', function (t) { return t.px('.promo h2', 'font-size') === 17; }],
                ['.promo-footer в строку, края разнесены', function (t) {
                    return t.css('.promo-footer', 'display') === 'flex' && t.css('.promo-footer', 'justify-content') === 'space-between';
                }],
                ['.promo-footer: линия сверху 1px #2e2e34', function (t) {
                    return Math.abs(t.px('.promo-footer', 'border-top-width') - 1) <= 0.5 && t.color('.promo-footer', 'border-top-color') === '#2e2e34';
                }],
                ['.promo-footer: отступы сверху по 12px', function (t) {
                    return t.px('.promo-footer', 'margin-top') === 12 && t.px('.promo-footer', 'padding-top') === 12;
                }],
            ],
        },

        // 6
        {
            title: 'Карточка события',
            kind: 'CSS',
            text: '<p>Главная часть афиши — карточка события: слева дата, справа описание. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.event</code>: в строку, промежуток <code>12px</code></li>' +
                '<li><code>.event-date</code>: ширина <code>44px</code> (и <code>min-width: 44px</code>, чтобы не сжималась), высота <code>46px</code>, ' +
                'скругление <code>10px</code>, фон <code>#26262b</code>, оранжевый текст по центру</li>' +
                '<li><code>.event-date small</code>: на отдельной строке (<code>display: block</code>), размер <code>9px</code></li>' +
                '<li><code>.event-body</code>: занимает всё оставшееся место (<code>flex: 1</code>)</li>' +
                '<li><code>.event-footer</code>: в строку, края разнесены, по центру по вертикали, сверху <code>12px</code></li></ul>',
            hint: ['display: flex', 'gap', 'min-width', 'text-align: center', 'display: block', 'flex: 1', 'justify-content: space-between'],
            start: {
                html: events[0].replace(/<div class="event-tags">.*<\/div>\n/, ''),
                css: '.event {\n    \n}\n\n.event-date {\n    \n}\n\n.event-date small {\n    \n}\n\n.event-body {\n    \n}\n\n.event-footer {\n    \n}\n\n' +
                    '/* Уже готово */\n' + cardCss + '\n.event h3 {\n    font-size: 16px;\n    margin: 6px 0;\n}\n\n' +
                    '.event-meta {\n    display: flex;\n    gap: 12px;\n    color: #9a9aa2;\n    font-size: 13px;\n}\n\n' +
                    '.event-footer .actions {\n    display: flex;\n    gap: 6px;\n}\n\n' + T.btnCss + '\n' + roundBtnCss,
            },
            answer: {
                css: '.event {\n    display: flex;\n    gap: 12px;\n}\n\n' +
                    '.event-date {\n    min-width: 44px;\n    width: 44px;\n    height: 46px;\n    border-radius: 10px;\n    background: #26262b;\n' +
                    '    color: #f5a623;\n    text-align: center;\n    font-weight: 700;\n    font-size: 16px;\n    padding-top: 6px;\n}\n\n' +
                    '.event-date small {\n    display: block;\n    font-size: 9px;\n    color: #9a9aa2;\n}\n\n' +
                    '.event-body {\n    flex: 1;\n}\n\n' +
                    '.event-footer {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-top: 12px;\n}',
            },
            checks: [
                ['.event в строку, промежуток 12px', function (t) {
                    return t.css('.event', 'display') === 'flex' && t.css('.event', 'column-gap') === '12px';
                }],
                ['.event-date: 44×46px', function (t) {
                    return t.px('.event-date', 'width') === 44 && t.px('.event-date', 'height') === 46;
                }],
                ['.event-date не сжимается (min-width: 44px)', function (t) { return t.px('.event-date', 'min-width') === 44; }],
                ['.event-date: скругление 10px, фон #26262b', function (t) {
                    return t.px('.event-date', 'border-top-left-radius') === 10 && t.color('.event-date', 'background-color') === '#26262b';
                }],
                ['.event-date: оранжевый текст по центру', function (t) {
                    return t.color('.event-date', 'color') === '#f5a623' && t.css('.event-date', 'text-align') === 'center';
                }],
                ['Дата (small) на отдельной строке, 9px', function (t) {
                    return t.css('.event-date small', 'display') === 'block' && t.px('.event-date small', 'font-size') === 9;
                }],
                ['.event-body растягивается (flex: 1)', function (t) { return t.css('.event-body', 'flex-grow') === '1'; }],
                ['.event-footer: в строку, края разнесены', function (t) {
                    return t.css('.event-footer', 'display') === 'flex' && t.css('.event-footer', 'justify-content') === 'space-between';
                }],
            ],
        },

        // 7
        {
            title: 'Метки категорий и все события',
            kind: 'HTML + CSS',
            text: '<p>У каждого события есть цветная метка категории. Карточек уже пять, допиши метки и цвета.</p><ul>' +
                '<li>HTML: в первой карточке в <code>.event-tags</code> добавь метку <code>&lt;b class="tag tag-culture"&gt;Культура&lt;/b&gt;</code> ' +
                'и цену <code>&lt;b class="price-free"&gt;0 ₽&lt;/b&gt;</code></li>' +
                '<li><code>.event-tags</code>: в строку, по центру, промежуток <code>8px</code></li>' +
                '<li><code>.tag</code>: отступы <code>2px 8px</code>, скругление <code>6px</code>, размер <code>12px</code></li>' +
                '<li>Цвета: <code>.tag-culture</code> — фон <code>#4a3a1c</code>, текст <code>#f5c46b</code>; ' +
                '<code>.tag-quiz</code> — фон <code>#4a1c2c</code>, текст <code>#f58fb0</code>; ' +
                '<code>.tag-active</code> — фон <code>#26334d</code>, текст <code>#9ec0ff</code>; ' +
                '<code>.tag-music</code> — фон <code>#6b1030</code>, текст <code>#ffb3c8</code></li>' +
                '<li><code>.price-free</code>: оранжевый <code>#f5a623</code></li></ul>',
            hint: ['<b class="tag tag-culture">', 'display: flex', 'gap', 'padding', 'border-radius', 'background', 'color'],
            start: {
                html: allEvents.replace('<div class="event-tags"><b class="tag tag-culture">Культура</b> <b class="price-free">0 ₽</b></div>',
                    '<div class="event-tags"><!-- метка и цена --></div>'),
                css: '.event-tags {\n    \n}\n\n.tag {\n    \n}\n\n/* цвета меток */\n\n\n.price-free {\n    \n}\n\n/* Уже готово */\n' +
                    eventCss + '\n' + T.btnCss + '\n' + roundBtnCss,
            },
            answer: { html: allEvents, css: tagsCss },
            checks: [
                ['В первой карточке метка «Культура»', function (t) {
                    const tag = t.q('.event').querySelector('.tag-culture');
                    return !!tag && tag.textContent.trim() === 'Культура';
                }],
                ['В первой карточке цена .price-free', function (t) { return !!t.q('.event').querySelector('.price-free'); }],
                ['.event-tags в строку, промежуток 8px', function (t) {
                    return t.css('.event-tags', 'display') === 'flex' && t.css('.event-tags', 'column-gap') === '8px';
                }],
                ['.tag: скругление 6px, размер 12px', function (t) {
                    return t.px('.tag', 'border-top-left-radius') === 6 && t.px('.tag', 'font-size') === 12;
                }],
                ['.tag-culture: фон #4a3a1c', function (t) { return t.color('.tag-culture', 'background-color') === '#4a3a1c'; }],
                ['.tag-quiz: фон #4a1c2c', function (t) { return t.color('.tag-quiz', 'background-color') === '#4a1c2c'; }],
                ['.tag-active: фон #26334d', function (t) { return t.color('.tag-active', 'background-color') === '#26334d'; }],
                ['.tag-music: фон #6b1030', function (t) { return t.color('.tag-music', 'background-color') === '#6b1030'; }],
                ['.price-free оранжевая', function (t) { return t.color('.price-free', 'color') === '#f5a623'; }],
            ],
        },

        // 8
        {
            title: 'Блок «Предложить» и нижнее меню',
            kind: 'HTML + CSS',
            text: '<p>В конце страницы — блок «Знаешь классное место?» и меню, которое <b>прилипает к низу экрана</b>.</p><ul>' +
                '<li>HTML: в <code>&lt;nav class="bottom-nav"&gt;</code> две ссылки: на <code>../afisha/afisha.html</code> с классом ' +
                '<code>active</code> (иконка <code>event_available</code>, текст «Афиша») и на <code>../profile/profile.html</code> ' +
                '(иконка <code>person</code>, текст «Профиль»)</li>' +
                '<li><code>.bottom-nav</code>: <code>position: fixed</code>, <code>bottom: 0</code>, <code>left: 0</code>, <code>right: 0</code>, ' +
                'ширина не больше <code>430px</code>, по центру (<code>margin: 0 auto</code>), в строку, фон <code>#1c1c20</code></li>' +
                '<li><code>.bottom-nav a.active</code>: оранжевый <code>#f5a623</code></li></ul>',
            hint: ['<nav>', '<a href="..." class="active">', 'position: fixed', 'bottom: 0', 'left: 0', 'right: 0', 'max-width', 'margin: 0 auto'],
            start: {
                html: '<section class="card">\n    <h2 class="section-title">Знаешь классное место? <div class="icon">add_location_alt</div></h2>\n' +
                    '    <p class="muted">Добавь бесплатный квартирник, встречу или лекцию в Омске в ленту за 1 минуту.</p>\n' +
                    '    <button class="btn btn-big open-suggest">Предложить событие</button>\n</section>\n\n' +
                    '<nav class="bottom-nav">\n    <!-- две ссылки -->\n\n</nav>',
                css: '.bottom-nav {\n    \n}\n\n.bottom-nav a.active {\n    \n}\n\n/* Уже готово */\n' +
                    '.bottom-nav a {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n' +
                    '    padding: 12px 0;\n    font-size: 12px;\n    font-weight: 600;\n}\n\n' + cardCss +
                    '\n.section-title {\n    display: flex;\n    justify-content: space-between;\n    font-size: 17px;\n    margin-bottom: 8px;\n}\n\n' +
                    '.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}\n\n' + T.btnCss +
                    '\n.btn-big {\n    width: 100%;\n    padding: 15px;\n    margin-top: 14px;\n    border-radius: 14px;\n}\n',
            },
            answer: {
                html: '<section class="card">\n    <h2 class="section-title">Знаешь классное место? <div class="icon">add_location_alt</div></h2>\n' +
                    '    <p class="muted">Добавь бесплатный квартирник, встречу или лекцию в Омске в ленту за 1 минуту.</p>\n' +
                    '    <button class="btn btn-big open-suggest">Предложить событие</button>\n</section>\n\n' +
                    '<nav class="bottom-nav">\n    <a href="../afisha/afisha.html" class="active"><div class="icon">event_available</div>Афиша</a>\n' +
                    '    <a href="../profile/profile.html"><div class="icon">person</div>Профиль</a>\n</nav>',
                css: '.bottom-nav {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    max-width: 430px;\n    margin: 0 auto;\n' +
                    '    display: flex;\n    background: #1c1c20;\n    border-top: 1px solid #2e2e34;\n}\n\n' +
                    '.bottom-nav a.active {\n    color: #f5a623;\n}',
            },
            checks: [
                ['В меню 2 ссылки', function (t) { return t.all('.bottom-nav a').length === 2; }],
                ['Ссылки ведут на афишу и профиль', function (t) {
                    const links = t.all('.bottom-nav a').map(function (a) { return a.getAttribute('href'); }).join(' ');
                    return links === '../afisha/afisha.html ../profile/profile.html';
                }],
                ['Ссылка «Афиша» с классом active', function (t) {
                    return t.has('.bottom-nav a', 'active') && t.text('.bottom-nav a').indexOf('Афиша') >= 0;
                }],
                ['Меню прилипает к экрану (position: fixed)', function (t) { return t.css('.bottom-nav', 'position') === 'fixed'; }],
                ['Меню прижато к низу (bottom: 0)', function (t) { return t.css('.bottom-nav', 'bottom') === '0px'; }],
                ['Растянуто: left: 0 и right: 0', function (t) {
                    return t.css('.bottom-nav', 'left') === '0px' && t.css('.bottom-nav', 'right') === '0px';
                }],
                ['Не шире 430px и по центру', function (t) {
                    return t.css('.bottom-nav', 'max-width') === '430px' && t.rule('.bottom-nav', 'margin-left') === 'auto';
                }],
                ['Меню в строку, фон #1c1c20', function (t) {
                    return t.css('.bottom-nav', 'display') === 'flex' && t.color('.bottom-nav', 'background-color') === '#1c1c20';
                }],
                ['Активная ссылка оранжевая', function (t) { return t.color('.bottom-nav a.active', 'color') === '#f5a623'; }],
            ],
        },

        // 9
        {
            title: 'JS: фильтры',
            kind: 'JS',
            text: '<p>Оживим фильтры. У каждой кнопки есть <code>data-filter</code>, у каждого события — <code>data-type</code> ' +
                '(например, <code>"free near kino"</code>). При клике на кнопку фильтра:</p><ul>' +
                '<li>убери класс <code>btn-accent</code> у всех кнопок и добавь нажатой</li>' +
                '<li>пройди по всем событиям (<code>forEach</code>): если фильтр <code>all</code> или <code>event.dataset.type</code> ' +
                'содержит фильтр (<code>.includes(...)</code>) — убери класс <code>hide</code>, иначе добавь</li>' +
                '<li>посчитай видимые события и запиши в <code>.found-count</code> текст вида <code>3 найдено</code></li></ul>',
            hint: ['querySelectorAll', 'forEach', "addEventListener('click', ...)", 'classList.add / remove', 'button.dataset.filter', 'event.dataset.type', 'if / else', '||', '.includes(...)', 'textContent'],
            start: {
                html: filtersHtml + '\n\n<p class="muted found-count">5 найдено</p>\n\n' + allEvents,
                css: filtersCss + '\n' + readyCss,
                js: 'const events = document.querySelectorAll(\'.event\');\n' +
                    'const filterButtons = document.querySelectorAll(\'.filter-btn\');\n' +
                    'const foundCount = document.querySelector(\'.found-count\');\n\n' +
                    'filterButtons.forEach(function (button) {\n    button.addEventListener(\'click\', function () {\n' +
                    '        const filter = button.dataset.filter;\n\n        // 1) покрась нажатую кнопку\n\n\n' +
                    '        // 2) покажи или спрячь события, посчитай видимые\n\n\n    });\n});\n',
            },
            answer: {
                js: 'const events = document.querySelectorAll(\'.event\');\n' +
                    'const filterButtons = document.querySelectorAll(\'.filter-btn\');\n' +
                    'const foundCount = document.querySelector(\'.found-count\');\n\n' +
                    'filterButtons.forEach(function (button) {\n    button.addEventListener(\'click\', function () {\n' +
                    '        const filter = button.dataset.filter;\n\n' +
                    '        filterButtons.forEach(function (btn) {\n            btn.classList.remove(\'btn-accent\');\n        });\n' +
                    '        button.classList.add(\'btn-accent\');\n\n        let count = 0;\n' +
                    '        events.forEach(function (event) {\n            if (filter === \'all\' || event.dataset.type.includes(filter)) {\n' +
                    '                event.classList.remove(\'hide\');\n                count = count + 1;\n            } else {\n' +
                    '                event.classList.add(\'hide\');\n            }\n        });\n' +
                    '        foundCount.textContent = count + \' найдено\';\n    });\n});',
            },
            checks: [
                ['«Музыка» оставляет 1 событие', function (t) {
                    t.click('.filter-btn[data-filter="music"]');
                    return visibleEvents(t) === 1;
                }],
                ['Счётчик пишет «1 найдено»', function (t) { return t.text('.found-count') === '1 найдено'; }],
                ['Нажатая кнопка оранжевая, «Все» — нет', function (t) {
                    return t.has('.filter-btn[data-filter="music"]', 'btn-accent') && !t.has('.filter-btn[data-filter="all"]', 'btn-accent');
                }],
                ['«Бесплатно» оставляет 3 события', function (t) {
                    t.click('.filter-btn[data-filter="free"]');
                    return visibleEvents(t) === 3 && t.text('.found-count') === '3 найдено';
                }],
                ['«Все» снова показывает 5 событий', function (t) {
                    t.click('.filter-btn[data-filter="all"]');
                    return visibleEvents(t) === 5;
                }],
            ],
        },

        // 10
        {
            title: 'JS: поиск по событиям',
            kind: 'JS',
            text: '<p>Кнопка с лупой открывает поле поиска, а поиск прячет неподходящие события.</p><ul>' +
                '<li>клик по <code>.search-btn</code>: переключи у <code>.search-input</code> класс <code>hide</code> (<code>classList.toggle</code>)</li>' +
                '<li>событие <code>input</code> у поля (срабатывает на каждую букву): возьми текст поля маленькими буквами ' +
                '(<code>.toLowerCase()</code>) и для каждого события проверь, есть ли этот текст в ' +
                '<code>event.textContent.toLowerCase()</code>. Есть — убери <code>hide</code>, нет — добавь</li></ul>',
            hint: ['classList.toggle(\'hide\')', 'addEventListener(\'input\', ...)', '.value.trim().toLowerCase()', '.includes(...)', 'forEach'],
            start: {
                html: '<button class="round-btn search-btn"><div class="icon">search</div></button>\n' +
                    '<input class="search-input hide" type="text" placeholder="Найти событие или место">\n\n' + allEvents,
                css: '.search-input {\n    display: block;\n    width: 100%;\n    margin: 14px 0;\n    padding: 12px 16px;\n    border: none;\n' +
                    '    border-radius: 12px;\n    background: #26262b;\n    outline: none;\n}\n\n' + readyCss,
                js: 'const events = document.querySelectorAll(\'.event\');\n' +
                    'const searchInput = document.querySelector(\'.search-input\');\n\n' +
                    '// 1) лупа показывает и прячет поле\n\n\n// 2) поиск при вводе\n',
            },
            answer: {
                js: 'const events = document.querySelectorAll(\'.event\');\n' +
                    'const searchInput = document.querySelector(\'.search-input\');\n\n' +
                    'document.querySelector(\'.search-btn\').addEventListener(\'click\', function () {\n' +
                    '    searchInput.classList.toggle(\'hide\');\n});\n\n' +
                    'searchInput.addEventListener(\'input\', function () {\n    const search = searchInput.value.trim().toLowerCase();\n' +
                    '    events.forEach(function (event) {\n        if (event.textContent.toLowerCase().includes(search)) {\n' +
                    '            event.classList.remove(\'hide\');\n        } else {\n            event.classList.add(\'hide\');\n        }\n    });\n});',
            },
            checks: [
                ['Сначала поле поиска спрятано', function (t) { return !t.visible('.search-input'); }],
                ['Лупа показывает поле', function (t) {
                    t.click('.search-btn');
                    return t.visible('.search-input');
                }],
                ['Поиск «квиз» оставляет 1 событие', function (t) {
                    t.type('.search-input', 'квиз');
                    return visibleEvents(t) === 1;
                }],
                ['Поиск не зависит от больших букв («ЛЕНИНА»)', function (t) {
                    t.type('.search-input', 'ЛЕНИНА');
                    return visibleEvents(t) === 1;
                }],
                ['Пустой поиск показывает все 5 событий', function (t) {
                    t.type('.search-input', '');
                    return visibleEvents(t) === 5;
                }],
                ['Лупа снова прячет поле', function (t) {
                    t.click('.search-btn');
                    return !t.visible('.search-input');
                }],
            ],
        },

        // 11
        {
            title: 'JS: «Иду» и «Поделиться»',
            kind: 'JS',
            text: '<p>Две кнопки в каждой карточке:</p><ul>' +
                '<li>«Иду» (<code>.go-btn</code>): при клике переключай класс <code>btn-accent</code> — кнопка становится оранжевой или серой</li>' +
                '<li>«Поделиться» (<code>.share-btn</code>): скопируй адрес страницы ' +
                '<code>navigator.clipboard.writeText(location.href)</code> и покажи подсказку <code>.toast</code> (убери <code>hide</code>). ' +
                'Через 2 секунды спрячь её снова: <code>setTimeout(function () { ... }, 2000)</code></li></ul>',
            hint: ['querySelectorAll(...).forEach', "classList.toggle('btn-accent')", 'navigator.clipboard.writeText', 'location.href', 'setTimeout'],
            start: {
                html: allEvents + '\n\n<div class="toast hide">Ссылка скопирована</div>',
                css: readyCss + '\n.toast {\n    position: fixed;\n    bottom: 20px;\n    left: 0;\n    right: 0;\n    width: 220px;\n    margin: 0 auto;\n' +
                    '    padding: 10px 16px;\n    border-radius: 999px;\n    background: #f2f2f2;\n    color: #1a1a1a;\n    text-align: center;\n' +
                    '    font-weight: 600;\n}\n\n.hide {\n    display: none;\n}\n',
                js: 'const toast = document.querySelector(\'.toast\');\n\n// 1) кнопки «Иду»\n\n\n// 2) кнопки «Поделиться»\n',
            },
            answer: {
                js: 'const toast = document.querySelector(\'.toast\');\n\n' +
                    'document.querySelectorAll(\'.go-btn\').forEach(function (button) {\n    button.addEventListener(\'click\', function () {\n' +
                    '        button.classList.toggle(\'btn-accent\');\n    });\n});\n\n' +
                    'document.querySelectorAll(\'.share-btn\').forEach(function (button) {\n    button.addEventListener(\'click\', function () {\n' +
                    '        navigator.clipboard.writeText(location.href);\n        toast.classList.remove(\'hide\');\n' +
                    '        setTimeout(function () {\n            toast.classList.add(\'hide\');\n        }, 2000);\n    });\n});',
            },
            checks: [
                ['Серая «Иду» после клика становится оранжевой', function (t) {
                    const button = t.all('.go-btn')[1];
                    button.click();
                    return button.classList.contains('btn-accent');
                }],
                ['Повторный клик делает её снова серой', function (t) {
                    const button = t.all('.go-btn')[1];
                    button.click();
                    return !button.classList.contains('btn-accent');
                }],
                ['Оранжевая «Иду» после клика становится серой', function (t) {
                    const button = t.all('.go-btn')[0];
                    button.click();
                    return !button.classList.contains('btn-accent');
                }],
                ['«Поделиться» показывает подсказку', function (t) {
                    t.click('.share-btn');
                    return t.visible('.toast');
                }],
            ],
        },

        // 12
        {
            title: 'JS: окна «Гид» и «Предложить событие»',
            kind: 'JS',
            text: '<p>Окна сделаны тегом <code>&lt;dialog&gt;</code>. Открыть — <code>showModal()</code>, закрыть — <code>close()</code>.</p><ul>' +
                '<li>клик по «Смотреть гид» (<code>.guide-link</code>): отмени переход по ссылке и открой <code>.guide-modal</code></li>' +
                '<li>клик по «Предложить событие» (<code>.open-suggest</code>): открой <code>.suggest-modal</code></li>' +
                '<li>кнопки <code>.close-modal</code> закрывают своё окно: <code>button.closest(\'dialog\').close()</code></li>' +
                '<li>отправка <code>.suggest-form</code>: отмени отправку; если название пустое — покажи <code>.error</code>, ' +
                'иначе спрячь форму и покажи <code>.thanks</code></li></ul>',
            hint: ['showModal()', 'close()', "closest('dialog')", "addEventListener('submit', ...)", 'event.preventDefault()', 'form.elements.title.value', 'return', 'classList'],
            start: {
                html: '<a href="#" class="link guide-link">Смотреть гид ›</a>\n<button class="btn btn-accent open-suggest">Предложить событие</button>\n\n' +
                    '<dialog class="modal guide-modal">\n    <h2>12 мест без билетов</h2>\n    <ul>\n        <li>Любинский проспект</li>\n' +
                    '        <li>Набережная Тухачевского</li>\n    </ul>\n    <button class="btn close-modal">Понятно</button>\n</dialog>\n\n' +
                    '<dialog class="modal suggest-modal">\n    <h2>Предложить событие</h2>\n    <form class="suggest-form">\n' +
                    '        <input class="modal-input" name="title" type="text" placeholder="Название события">\n' +
                    '        <p class="error hide">Заполни название</p>\n' +
                    '        <button type="submit" class="btn btn-accent">Отправить</button>\n    </form>\n' +
                    '    <p class="thanks hide">Спасибо! Мы проверим событие.</p>\n    <button class="btn close-modal">Закрыть</button>\n</dialog>',
                css: T.btnCss + '\n' + T.hideCss + '\n.link {\n    color: #f5a623;\n    font-weight: 700;\n}\n\n' +
                    '.modal {\n    width: 90%;\n    max-width: 380px;\n    margin: auto;\n    padding: 20px;\n    border: none;\n' +
                    '    border-radius: 16px;\n    background: #1c1c20;\n    color: #f2f2f2;\n}\n\n.modal::backdrop {\n    background: rgba(0, 0, 0, 0.6);\n}\n\n' +
                    '.modal-input {\n    width: 100%;\n    margin: 10px 0;\n    padding: 12px;\n    border: none;\n    border-radius: 12px;\n    background: #26262b;\n}\n\n' +
                    '.thanks {\n    color: #f5a623;\n}\n',
                js: 'const guideModal = document.querySelector(\'.guide-modal\');\n' +
                    'const suggestModal = document.querySelector(\'.suggest-modal\');\n' +
                    'const suggestForm = document.querySelector(\'.suggest-form\');\n\n' +
                    '// 1) открыть гид\n\n\n// 2) открыть «Предложить событие»\n\n\n// 3) кнопки «Закрыть»\n\n\n// 4) отправка формы\n',
            },
            answer: {
                js: 'const guideModal = document.querySelector(\'.guide-modal\');\n' +
                    'const suggestModal = document.querySelector(\'.suggest-modal\');\n' +
                    'const suggestForm = document.querySelector(\'.suggest-form\');\n\n' +
                    'document.querySelector(\'.guide-link\').addEventListener(\'click\', function (event) {\n' +
                    '    event.preventDefault();\n    guideModal.showModal();\n});\n\n' +
                    'document.querySelector(\'.open-suggest\').addEventListener(\'click\', function () {\n    suggestModal.showModal();\n});\n\n' +
                    'document.querySelectorAll(\'.close-modal\').forEach(function (button) {\n' +
                    '    button.addEventListener(\'click\', function () {\n        button.closest(\'dialog\').close();\n    });\n});\n\n' +
                    'suggestForm.addEventListener(\'submit\', function (event) {\n    event.preventDefault();\n' +
                    '    if (suggestForm.elements.title.value.trim() === \'\') {\n' +
                    '        suggestModal.querySelector(\'.error\').classList.remove(\'hide\');\n        return;\n    }\n' +
                    '    suggestForm.classList.add(\'hide\');\n    suggestModal.querySelector(\'.thanks\').classList.remove(\'hide\');\n});',
            },
            checks: [
                ['«Смотреть гид» открывает окно гида', function (t) {
                    t.click('.guide-link');
                    return t.q('.guide-modal').open === true;
                }],
                ['«Понятно» закрывает окно гида', function (t) {
                    t.click('.guide-modal .close-modal');
                    return t.q('.guide-modal').open === false;
                }],
                ['«Предложить событие» открывает окно с формой', function (t) {
                    t.click('.open-suggest');
                    return t.q('.suggest-modal').open === true;
                }],
                ['Пустая форма показывает ошибку', function (t) {
                    return t.submit('.suggest-form') && t.visible('.suggest-modal .error');
                }],
                ['Заполненная форма показывает «Спасибо»', function (t) {
                    t.q('.suggest-form input[name="title"]').value = 'Квартирник';
                    t.submit('.suggest-form');
                    return t.visible('.thanks') && !t.visible('.suggest-form');
                }],
            ],
        },
    ];
})();
