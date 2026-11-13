// =========================================================
// Задачи страницы «Профиль» — Андрей Плешивых
// =========================================================

(function () {
    const T = QuestTasks;

    const cardCss = '.card {\n    background: #1c1c20;\n    border-radius: 16px;\n    padding: 16px;\n    margin-bottom: 14px;\n}\n';
    const mutedCss = '.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}\n';
    const linkCss = '.link {\n    color: #f5a623;\n    font-size: 13px;\n    font-weight: 700;\n}\n';
    const roundBtnCss =
        '.round-btn {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    border: none;\n    background: #26262b;\n' +
        '    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n}\n';
    const sectionTitleCss = '.section-title {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n' +
        '    margin: 22px 0 12px;\n    font-size: 17px;\n    font-weight: 600;\n}\n\n.section-title .icon {\n    color: #f5a623;\n    margin-right: 6px;\n}\n';
    const listItemCss =
        '.list-item {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    padding: 12px 0;\n}\n\n' +
        '.list-item .icon {\n    color: #f5a623;\n}\n\n.list-item-text {\n    flex: 1;\n    font-size: 16px;\n}\n\n' +
        '.list-item-text small {\n    display: block;\n    font-size: 12px;\n    color: #9a9aa2;\n}\n';
    const switchCss =
        '.switch {\n    width: 48px;\n    height: 26px;\n    border-radius: 999px;\n    background: #f5a623;\n    padding: 3px;\n' +
        '    display: flex;\n    justify-content: flex-end;\n    cursor: pointer;\n}\n\n' +
        '.knob {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    background: #3a2a00;\n}\n';
    const switchOffCss = '.switch.off {\n    background: #26262b;\n    justify-content: flex-start;\n}\n\n.switch.off .knob {\n    background: #888888;\n}\n';

    const userCard =
        '<section class="card">\n' +
        '    <div class="profile-head">\n' +
        '        <div class="avatar-big user-letter">А</div>\n' +
        '        <div>\n' +
        '            <div class="profile-name"><b class="user-name">Алексей Смирнов</b> <div class="icon">verified</div></div>\n' +
        '            <p class="muted">@omsk_alex</p>\n' +
        '            <div class="muted"><div class="icon">near_me</div> Омск · Центр</div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>';

    const settingsHtml =
        '<section class="card">\n' +
        '    <div class="list-item">\n' +
        '        <div class="icon">dark_mode</div>\n' +
        '        <div class="list-item-text">Оформление<small class="setting-text">Тёмная тема включена</small></div>\n' +
        '        <div class="switch" data-on="Тёмная тема включена" data-off="Тёмная тема выключена"><div class="knob"></div></div>\n' +
        '    </div>\n' +
        '    <div class="list-item">\n' +
        '        <div class="icon">notifications_active</div>\n' +
        '        <div class="list-item-text">Напоминания<small class="setting-text">За 2 часа до начала событий</small></div>\n' +
        '        <div class="switch" data-on="За 2 часа до начала событий" data-off="Напоминания выключены"><div class="knob"></div></div>\n' +
        '    </div>\n' +
        '</section>';

    QUEST_TASKS.profile = [
        // 1
        T.base(),

        // 2
        T.mainHeader(),

        // 3
        {
            title: 'Карточка пользователя',
            kind: 'CSS',
            text: '<p>Главный блок профиля: большая круглая аватарка, имя и ник. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.card</code>: фон <code>#1c1c20</code>, скругление <code>16px</code>, отступы <code>16px</code></li>' +
                '<li><code>.profile-head</code>: в строку, по центру по вертикали, промежуток <code>14px</code></li>' +
                '<li><code>.avatar-big</code>: круг <code>66×66px</code>, фон <code>#f5a623</code>, тёмная буква <code>#1a1a1a</code> по центру ' +
                '(flex + justify-content + align-items), размер буквы <code>26px</code></li>' +
                '<li><code>.profile-name</code>: размер <code>19px</code>, жирность <code>700</code></li></ul>',
            hint: ['display: flex', 'align-items', 'gap', 'width', 'height', 'border-radius: 50%', 'justify-content: center', 'font-size'],
            start: {
                html: userCard,
                css: '.card {\n    \n}\n\n.profile-head {\n    \n}\n\n.avatar-big {\n    \n}\n\n.profile-name {\n    \n}\n\n/* Уже готово */\n' + mutedCss,
            },
            answer: {
                css: cardCss + '\n.profile-head {\n    display: flex;\n    gap: 14px;\n    align-items: center;\n}\n\n' +
                    '.avatar-big {\n    width: 66px;\n    height: 66px;\n    border-radius: 50%;\n    background: #f5a623;\n    color: #1a1a1a;\n' +
                    '    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 26px;\n    font-weight: 700;\n}\n\n' +
                    '.profile-name {\n    font-size: 19px;\n    font-weight: 700;\n}',
            },
            checks: [
                ['.card: фон #1c1c20 и скругление 16px', function (t) {
                    return t.color('.card', 'background-color') === '#1c1c20' && t.px('.card', 'border-top-left-radius') === 16;
                }],
                ['.profile-head в строку и по центру', function (t) {
                    return t.css('.profile-head', 'display') === 'flex' && t.css('.profile-head', 'align-items') === 'center';
                }],
                ['.profile-head: промежуток 14px', function (t) { return t.css('.profile-head', 'column-gap') === '14px'; }],
                ['Аватарка 66×66px и круглая', function (t) {
                    return t.px('.avatar-big', 'width') === 66 && t.px('.avatar-big', 'height') === 66 &&
                        t.css('.avatar-big', 'border-top-left-radius') === '50%';
                }],
                ['Аватарка оранжевая, буква тёмная', function (t) {
                    return t.color('.avatar-big', 'background-color') === '#f5a623' && t.color('.avatar-big', 'color') === '#1a1a1a';
                }],
                ['Буква по центру аватарки', function (t) {
                    return t.css('.avatar-big', 'display') === 'flex' && t.css('.avatar-big', 'justify-content') === 'center' &&
                        t.css('.avatar-big', 'align-items') === 'center';
                }],
                ['Буква 26px', function (t) { return t.px('.avatar-big', 'font-size') === 26; }],
                ['Имя 19px и жирное (700)', function (t) {
                    return t.px('.profile-name', 'font-size') === 19 && t.css('.profile-name', 'font-weight') === '700';
                }],
            ],
        },

        // 4
        {
            title: 'Статистика и кнопки',
            kind: 'HTML + CSS',
            text: '<p>Под именем — три числа и кнопки.</p><ul>' +
                '<li>HTML: в <code>.stats</code> три блока <code>&lt;div&gt;</code>, в каждом число в <code>&lt;b&gt;</code> и подпись в ' +
                '<code>&lt;small&gt;</code>: 14 «В планах», 28 «Посещено», 6 «Друзей». У первого числа классы <code>link plans-count</code></li>' +
                '<li><code>.stats</code>: сетка из трёх равных колонок (<code>repeat(3, 1fr)</code>), фон <code>#26262b</code>, ' +
                'скругление <code>12px</code>, текст по центру, отступы <code>10px 0</code>, снаружи <code>14px 0</code></li>' +
                '<li><code>.stats b</code>: отдельной строкой (<code>display: block</code>), размер <code>20px</code></li>' +
                '<li><code>.btn-wide</code>: кнопка растягивается (<code>flex: 1</code>)</li></ul>',
            hint: ['<b>', '<small>', 'display: grid', 'grid-template-columns: repeat(3, 1fr)', 'text-align: center', 'display: block', 'flex: 1'],
            start: {
                html: '<section class="card">\n    <div class="stats">\n        <!-- три блока с числами -->\n\n    </div>\n' +
                    '    <div class="row">\n        <button class="btn btn-wide open-edit"><div class="icon">edit</div> Редактировать профиль</button>\n' +
                    '        <button class="round-btn share-btn"><div class="icon">share</div></button>\n    </div>\n</section>',
                css: '.stats {\n    \n}\n\n.stats b {\n    \n}\n\n.btn-wide {\n    \n}\n\n/* Уже готово */\n' +
                    '.stats small {\n    font-size: 11px;\n    color: #9a9aa2;\n}\n\n.row {\n    display: flex;\n    gap: 8px;\n}\n\n' +
                    cardCss + '\n' + linkCss + '\n' + T.btnCss + '\n' + roundBtnCss,
            },
            answer: {
                html: '<section class="card">\n    <div class="stats">\n        <div><b class="link plans-count">14</b><small>В планах</small></div>\n' +
                    '        <div><b>28</b><small>Посещено</small></div>\n        <div><b>6</b><small>Друзей</small></div>\n    </div>\n' +
                    '    <div class="row">\n        <button class="btn btn-wide open-edit"><div class="icon">edit</div> Редактировать профиль</button>\n' +
                    '        <button class="round-btn share-btn"><div class="icon">share</div></button>\n    </div>\n</section>',
                css: '.stats {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    background: #26262b;\n    border-radius: 12px;\n' +
                    '    margin: 14px 0;\n    padding: 10px 0;\n    text-align: center;\n}\n\n' +
                    '.stats b {\n    display: block;\n    font-size: 20px;\n}\n\n.btn-wide {\n    flex: 1;\n}',
            },
            checks: [
                ['В .stats три блока', function (t) { return t.all('.stats > div').length === 3; }],
                ['В каждом блоке число <b> и подпись <small>', function (t) {
                    return t.all('.stats > div').every(function (d) { return d.querySelector('b') && d.querySelector('small'); });
                }],
                ['Первое число — 14 с классом plans-count', function (t) { return t.text('.stats .plans-count') === '14'; }],
                ['.stats — сетка из 3 колонок', function (t) {
                    return t.css('.stats', 'display') === 'grid' && t.css('.stats', 'grid-template-columns').split(' ').length === 3;
                }],
                ['.stats: фон #26262b, скругление 12px', function (t) {
                    return t.color('.stats', 'background-color') === '#26262b' && t.px('.stats', 'border-top-left-radius') === 12;
                }],
                ['.stats: текст по центру', function (t) { return t.css('.stats', 'text-align') === 'center'; }],
                ['Числа отдельной строкой, 20px', function (t) {
                    return t.css('.stats b', 'display') === 'block' && t.px('.stats b', 'font-size') === 20;
                }],
                ['Кнопка «Редактировать» растягивается', function (t) { return t.css('.btn-wide', 'flex-grow') === '1'; }],
            ],
        },

        // 5
        {
            title: 'Мой ближайший билет',
            kind: 'CSS',
            text: '<p>Билет — тёмная «картинка» с названием фильма и кнопка QR-кода. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.ticket-image</code>: высота <code>130px</code>, скругление <code>12px</code>, отступы <code>12px</code>, фон <code>#1b3a4b</code>, ' +
                'элементы столбиком (<code>flex-direction: column</code>) и по краям (<code>space-between</code>)</li>' +
                '<li><code>.ticket-label</code>: малиновый фон <code>#c2185b</code>, скругление <code>999px</code>, отступы <code>3px 10px</code>, ' +
                'размер <code>11px</code>, не растягивается на всю ширину (<code>align-self: flex-start</code>)</li>' +
                '<li><code>.ticket-info</code>: в строку, края разнесены, отступы <code>12px 0</code></li>' +
                '<li><code>.badge-active</code>: фон <code>#f5d9a8</code>, текст <code>#6b4200</code>, скругление <code>999px</code></li></ul>',
            hint: ['height', 'display: flex', 'flex-direction: column', 'justify-content: space-between', 'align-self: flex-start', 'border-radius'],
            start: {
                html: '<h2 class="section-title">\n    <b><div class="icon">confirmation_number</div>Мой ближайший билет</b>\n' +
                    '    <b class="badge-active">АКТИВЕН</b>\n</h2>\n<section class="card">\n    <div class="ticket-image">\n' +
                    '        <b class="ticket-label">КИНО НА ТРАВЕ</b>\n        <div>\n            <p class="muted">Сквер им. Ф.Э. Дзержинского</p>\n' +
                    '            <p class="ticket-title">«Полночь в Париже»</p>\n        </div>\n    </div>\n    <div class="ticket-info">\n' +
                    '        <div><div class="icon">calendar_month</div> 24 мая, Пт</div>\n        <div><div class="icon">schedule</div> 20:30</div>\n' +
                    '        <small class="muted">Ряд 4, место 12</small>\n    </div>\n' +
                    '    <button class="btn btn-accent btn-big open-qr"><div class="icon">qr_code_2</div> Показать QR-код</button>\n</section>',
                css: '.ticket-image {\n    \n}\n\n.ticket-label {\n    \n}\n\n.ticket-info {\n    \n}\n\n.badge-active {\n    \n}\n\n/* Уже готово */\n' +
                    '.ticket-title {\n    font-size: 17px;\n    font-weight: 700;\n}\n\n' + cardCss + '\n' + sectionTitleCss + '\n' + mutedCss + '\n' +
                    T.btnCss + '\n.btn-big {\n    width: 100%;\n    padding: 15px;\n    font-size: 17px;\n    border-radius: 14px;\n}\n',
            },
            answer: {
                css: '.ticket-image {\n    height: 130px;\n    border-radius: 12px;\n    padding: 12px;\n    display: flex;\n' +
                    '    flex-direction: column;\n    justify-content: space-between;\n    background: #1b3a4b;\n}\n\n' +
                    '.ticket-label {\n    align-self: flex-start;\n    background: #c2185b;\n    border-radius: 999px;\n    padding: 3px 10px;\n' +
                    '    font-size: 11px;\n    font-weight: 700;\n}\n\n' +
                    '.ticket-info {\n    display: flex;\n    justify-content: space-between;\n    margin: 12px 0;\n    font-weight: 600;\n}\n\n' +
                    '.badge-active {\n    background: #f5d9a8;\n    color: #6b4200;\n    border-radius: 999px;\n    padding: 2px 10px;\n' +
                    '    font-size: 11px;\n    font-weight: 700;\n}',
            },
            checks: [
                ['.ticket-image: высота 130px', function (t) { return t.px('.ticket-image', 'height') === 130; }],
                ['.ticket-image: фон #1b3a4b, скругление 12px', function (t) {
                    return t.color('.ticket-image', 'background-color') === '#1b3a4b' && t.px('.ticket-image', 'border-top-left-radius') === 12;
                }],
                ['.ticket-image: столбиком', function (t) {
                    return t.css('.ticket-image', 'display') === 'flex' && t.css('.ticket-image', 'flex-direction') === 'column';
                }],
                ['.ticket-image: по краям (space-between)', function (t) { return t.css('.ticket-image', 'justify-content') === 'space-between'; }],
                ['.ticket-label: малиновый фон #c2185b', function (t) { return t.color('.ticket-label', 'background-color') === '#c2185b'; }],
                ['.ticket-label не растянут (align-self: flex-start)', function (t) { return t.css('.ticket-label', 'align-self') === 'flex-start'; }],
                ['.ticket-info в строку, края разнесены', function (t) {
                    return t.css('.ticket-info', 'display') === 'flex' && t.css('.ticket-info', 'justify-content') === 'space-between';
                }],
                ['.badge-active: фон #f5d9a8, текст #6b4200', function (t) {
                    return t.color('.badge-active', 'background-color') === '#f5d9a8' && t.color('.badge-active', 'color') === '#6b4200';
                }],
            ],
        },

        // 6
        {
            title: 'Любимые категории',
            kind: 'HTML + CSS',
            text: '<p>Категории — «таблетки», которые переносятся на новую строку, если не влезают.</p><ul>' +
                '<li>HTML: в <code>.pills</code> добавь ещё две таблетки по образцу: «Выставки» (иконка <code>palette</code>) и ' +
                '«Крафтовые маркеты» (иконка <code>storefront</code>). Последней — <code>&lt;div class="pill link add-pill"&gt;+ Добавить&lt;/div&gt;</code></li>' +
                '<li><code>.pills</code>: в строку с переносом (<code>flex-wrap: wrap</code>), промежуток <code>8px</code></li>' +
                '<li><code>.pill</code>: в строку, по центру, промежуток <code>4px</code>, фон <code>#26262b</code>, скругление <code>999px</code>, ' +
                'отступы <code>6px 12px</code>, размер <code>13px</code></li></ul>',
            hint: ['<div class="pill">', 'display: flex', 'flex-wrap: wrap', 'gap', 'border-radius: 999px', 'padding'],
            start: {
                html: '<div class="pills">\n    <div class="pill"><div class="icon">theaters</div> Кино на траве</div>\n' +
                    '    <div class="pill"><div class="icon">mood</div> Стендап</div>\n    <!-- ещё две категории и «+ Добавить» -->\n\n</div>',
                css: '.pills {\n    \n}\n\n.pill {\n    \n}\n\n/* Уже готово */\n' + linkCss,
            },
            answer: {
                html: '<div class="pills">\n    <div class="pill"><div class="icon">theaters</div> Кино на траве</div>\n' +
                    '    <div class="pill"><div class="icon">mood</div> Стендап</div>\n    <div class="pill"><div class="icon">palette</div> Выставки</div>\n' +
                    '    <div class="pill"><div class="icon">storefront</div> Крафтовые маркеты</div>\n    <div class="pill link add-pill">+ Добавить</div>\n</div>',
                css: '.pills {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' +
                    '.pill {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    background: #26262b;\n    border-radius: 999px;\n' +
                    '    padding: 6px 12px;\n    font-size: 13px;\n    font-weight: 600;\n}',
            },
            checks: [
                ['В .pills 5 таблеток', function (t) { return t.all('.pills .pill').length === 5; }],
                ['Есть «Выставки» и «Крафтовые маркеты»', function (t) {
                    return t.text('.pills').indexOf('Выставки') >= 0 && t.text('.pills').indexOf('Крафтовые маркеты') >= 0;
                }],
                ['Последняя — «+ Добавить» с классом add-pill', function (t) {
                    const pills = t.all('.pills .pill');
                    return pills.length > 0 && pills[pills.length - 1].classList.contains('add-pill');
                }],
                ['.pills в строку с переносом', function (t) {
                    return t.css('.pills', 'display') === 'flex' && t.css('.pills', 'flex-wrap') === 'wrap';
                }],
                ['.pills: промежуток 8px', function (t) { return t.css('.pills', 'column-gap') === '8px'; }],
                ['.pill: фон #26262b, скругление 999px', function (t) {
                    return t.color('.pill', 'background-color') === '#26262b' && t.px('.pill', 'border-top-left-radius') === 999;
                }],
                ['.pill: отступы 6px 12px', function (t) {
                    return t.px('.pill', 'padding-top') === 6 && t.px('.pill', 'padding-left') === 12;
                }],
            ],
        },

        // 7
        {
            title: 'Район и карта',
            kind: 'CSS',
            text: '<p>Блок «Мой район»: строка с иконками и «карта» — синий круг с меткой. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.list-item</code>: в строку, по центру, промежуток <code>14px</code>, отступы <code>12px 0</code></li>' +
                '<li><code>.list-item-text</code>: занимает всё свободное место (<code>flex: 1</code>)</li>' +
                '<li><code>.round-btn-accent</code>: оранжевый фон <code>#f5a623</code></li>' +
                '<li><code>.map</code>: высота <code>110px</code>, круг по центру (flex + justify-content + align-items)</li>' +
                '<li><code>.map-circle</code>: круг <code>80×80px</code>, рамка <code>2px solid #2b6fd6</code>, ' +
                'полупрозрачный фон <code>rgba(43, 111, 214, 0.15)</code>, метка по центру</li></ul>',
            hint: ['display: flex', 'gap', 'flex: 1', 'height', 'border', 'rgba(...)', 'border-radius: 50%'],
            start: {
                html: '<section class="card">\n    <div class="list-item">\n        <div class="round-btn"><div class="icon">my_location</div></div>\n' +
                    '        <div class="list-item-text">Центр Омска\n            <small>Любинский проспект, набережная Тухачевского</small>\n        </div>\n' +
                    '        <button class="round-btn round-btn-accent open-edit"><div class="icon">tune</div></button>\n    </div>\n' +
                    '    <div class="map">\n        <div class="map-circle"><div class="icon">location_on</div></div>\n    </div>\n</section>',
                css: '.list-item {\n    \n}\n\n.list-item-text {\n    \n}\n\n.round-btn-accent {\n    \n}\n\n.map {\n    \n}\n\n.map-circle {\n    \n}\n\n/* Уже готово */\n' +
                    '.list-item-text small {\n    display: block;\n    font-size: 12px;\n    color: #9a9aa2;\n}\n\n' + cardCss + '\n' + roundBtnCss,
            },
            answer: {
                css: '.list-item {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    padding: 12px 0;\n}\n\n' +
                    '.list-item-text {\n    flex: 1;\n    font-size: 16px;\n}\n\n.round-btn-accent {\n    background: #f5a623;\n}\n\n' +
                    '.map {\n    height: 110px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n' +
                    '.map-circle {\n    width: 80px;\n    height: 80px;\n    border-radius: 50%;\n    border: 2px solid #2b6fd6;\n' +
                    '    background: rgba(43, 111, 214, 0.15);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: #f5a623;\n}',
            },
            checks: [
                ['.list-item в строку, промежуток 14px', function (t) {
                    return t.css('.list-item', 'display') === 'flex' && t.css('.list-item', 'column-gap') === '14px';
                }],
                ['.list-item-text растягивается', function (t) { return t.css('.list-item-text', 'flex-grow') === '1'; }],
                ['Кнопка с ползунками оранжевая', function (t) { return t.color('.round-btn-accent', 'background-color') === '#f5a623'; }],
                ['.map: высота 110px, круг по центру', function (t) {
                    return t.px('.map', 'height') === 110 && t.css('.map', 'display') === 'flex' && t.css('.map', 'justify-content') === 'center';
                }],
                ['.map-circle: 80×80px и круглый', function (t) {
                    return t.px('.map-circle', 'width') === 80 && t.px('.map-circle', 'height') === 80 &&
                        t.css('.map-circle', 'border-top-left-radius') === '50%';
                }],
                ['.map-circle: синяя рамка 2px #2b6fd6', function (t) {
                    return Math.abs(t.px('.map-circle', 'border-top-width') - 2) <= 0.5 && t.color('.map-circle', 'border-top-color') === '#2b6fd6';
                }],
                ['.map-circle: полупрозрачный синий фон', function (t) {
                    return t.css('.map-circle', 'background-color').replace(/\s/g, '') === 'rgba(43,111,214,0.15)';
                }],
            ],
        },

        // 8
        {
            title: 'Активность друзей',
            kind: 'HTML + CSS',
            text: '<p>Карточка «Лера и Артём идут на концерт» с кнопкой «Тоже иду».</p><ul>' +
                '<li>HTML: в конец карточки добавь кнопку <code>&lt;button class="btn btn-accent btn-small go-btn"&gt;Тоже иду&lt;/button&gt;</code></li>' +
                '<li><code>.friends-text</code>: размер <code>14px</code></li>' +
                '<li><code>.friends-event</code>: оранжевый <code>#f5a623</code> (название концерта)</li>' +
                '<li><code>.btn-small</code>: маленькая кнопка — размер <code>12px</code>, отступы <code>5px 12px</code></li></ul>',
            hint: ['<button class="...">', 'font-size', 'color', 'padding'],
            start: {
                html: '<section class="card list-item">\n    <div class="list-item-text friends-text">\n' +
                    '        <b>Лера</b> и <b>Артём</b> идут на <b class="friends-event">Инди-концерт на крыше бара</b>\n' +
                    '        <small>Сегодня, 21:00 · Бар «Свои»</small>\n    </div>\n    <!-- сюда кнопку «Тоже иду» -->\n\n</section>',
                css: '.friends-text {\n    \n}\n\n.friends-event {\n    \n}\n\n.btn-small {\n    \n}\n\n/* Уже готово */\n' +
                    cardCss + '\n' + listItemCss + '\n' + T.btnCss,
            },
            answer: {
                html: '<section class="card list-item">\n    <div class="list-item-text friends-text">\n' +
                    '        <b>Лера</b> и <b>Артём</b> идут на <b class="friends-event">Инди-концерт на крыше бара</b>\n' +
                    '        <small>Сегодня, 21:00 · Бар «Свои»</small>\n    </div>\n' +
                    '    <button class="btn btn-accent btn-small go-btn">Тоже иду</button>\n</section>',
                css: '.friends-text {\n    font-size: 14px;\n}\n\n.friends-event {\n    color: #f5a623;\n}\n\n' +
                    '.btn-small {\n    font-size: 12px;\n    padding: 5px 12px;\n}',
            },
            checks: [
                ['Есть кнопка «Тоже иду»', function (t) { return t.text('.list-item button') === 'Тоже иду'; }],
                ['У кнопки классы btn, btn-accent, btn-small, go-btn', function (t) {
                    const b = t.q('.list-item button');
                    return !!b && ['btn', 'btn-accent', 'btn-small', 'go-btn'].every(function (c) { return b.classList.contains(c); });
                }],
                ['Текст карточки 14px', function (t) { return t.px('.friends-text', 'font-size') === 14; }],
                ['Название концерта оранжевое', function (t) { return t.color('.friends-event', 'color') === '#f5a623'; }],
                ['Маленькая кнопка: 12px', function (t) { return t.px('.btn-small', 'font-size') === 12; }],
                ['Маленькая кнопка: отступы 5px 12px', function (t) {
                    return t.px('.btn-small', 'padding-top') === 5 && t.px('.btn-small', 'padding-left') === 12;
                }],
            ],
        },

        // 9
        {
            title: 'Настройки: ползунки',
            kind: 'HTML + CSS',
            text: '<p>Нарисуем переключатель без картинок — из двух <code>&lt;div&gt;</code>: «дорожка» <code>.switch</code> и кружок <code>.knob</code>.</p><ul>' +
                '<li>HTML: во второй строке настроек добавь такой же ползунок, как в первой: ' +
                '<code>&lt;div class="switch" data-on="За 2 часа до начала событий" data-off="Напоминания выключены"&gt;&lt;div class="knob"&gt;&lt;/div&gt;&lt;/div&gt;</code></li>' +
                '<li><code>.switch</code>: <code>48×26px</code>, скругление <code>999px</code>, фон <code>#f5a623</code>, отступы <code>3px</code>, ' +
                'кружок справа (<code>display: flex</code> + <code>justify-content: flex-end</code>)</li>' +
                '<li><code>.knob</code>: круг <code>20×20px</code>, фон <code>#3a2a00</code></li></ul>',
            hint: ['<div class="switch">', '<div class="knob">', 'data-on / data-off', 'display: flex', 'justify-content: flex-end', 'border-radius'],
            start: {
                html: settingsHtml.replace('<div class="switch" data-on="За 2 часа до начала событий" data-off="Напоминания выключены"><div class="knob"></div></div>',
                    '<!-- сюда второй ползунок -->'),
                css: '.switch {\n    \n}\n\n.knob {\n    \n}\n\n/* Уже готово */\n' + cardCss + '\n' + listItemCss,
            },
            answer: { html: settingsHtml, css: switchCss },
            checks: [
                ['Два ползунка .switch', function (t) { return t.all('.switch').length === 2; }],
                ['В каждом ползунке кружок .knob', function (t) { return t.all('.switch .knob').length === 2; }],
                ['У второго ползунка есть data-on и data-off', function (t) {
                    const s = t.all('.switch')[1];
                    return !!s && !!s.dataset.on && !!s.dataset.off;
                }],
                ['.switch: 48×26px и скругление 999px', function (t) {
                    return t.px('.switch', 'width') === 48 && t.px('.switch', 'height') === 26 && t.px('.switch', 'border-top-left-radius') === 999;
                }],
                ['.switch: оранжевый, отступы 3px', function (t) {
                    return t.color('.switch', 'background-color') === '#f5a623' && t.px('.switch', 'padding-top') === 3;
                }],
                ['Кружок справа (flex-end)', function (t) {
                    return t.css('.switch', 'display') === 'flex' && t.css('.switch', 'justify-content') === 'flex-end';
                }],
                ['.knob: круг 20×20px, фон #3a2a00', function (t) {
                    return t.px('.knob', 'width') === 20 && t.css('.knob', 'border-top-left-radius') === '50%' &&
                        t.color('.knob', 'background-color') === '#3a2a00';
                }],
            ],
        },

        // 10
        {
            title: 'Выход и нижнее меню',
            kind: 'HTML + CSS',
            text: '<p>В конце — кнопка выхода и меню, которое <b>прилипает к низу экрана</b>.</p><ul>' +
                '<li>HTML: ссылка выхода <code>&lt;a href="../login/login.html" class="list-item logout logout-link"&gt;</code> ' +
                'с иконкой <code>logout</code> и текстом «Выйти из аккаунта»</li>' +
                '<li>HTML: в <code>.bottom-nav</code> вторая ссылка — на <code>../profile/profile.html</code> с классом <code>active</code>, ' +
                'иконка <code>person</code>, текст «Профиль»</li>' +
                '<li><code>.logout</code> и <code>.logout .icon</code>: красный <code>#ff6b6b</code></li>' +
                '<li><code>.bottom-nav</code>: <code>position: fixed</code>, <code>bottom: 0</code>, <code>left: 0</code>, <code>right: 0</code>, ' +
                'не шире <code>430px</code>, <code>margin: 0 auto</code>; <code>.bottom-nav a.active</code> — оранжевая</li></ul>',
            hint: ['<a href="..." class="...">', 'position: fixed', 'bottom: 0', 'left: 0', 'right: 0', 'max-width', 'margin: 0 auto'],
            start: {
                html: '<section class="card">\n    <!-- сюда ссылку выхода -->\n\n</section>\n\n' +
                    '<nav class="bottom-nav">\n    <a href="../index/index.html"><div class="icon">event_available</div>Афиша</a>\n' +
                    '    <!-- сюда ссылку на профиль -->\n\n</nav>',
                css: '.logout {\n    \n}\n\n.logout .icon {\n    \n}\n\n.bottom-nav {\n    \n}\n\n.bottom-nav a.active {\n    \n}\n\n/* Уже готово */\n' +
                    '.bottom-nav a {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n' +
                    '    padding: 12px 0;\n    font-size: 12px;\n    font-weight: 600;\n}\n\n' + cardCss + '\n' + listItemCss,
            },
            answer: {
                html: '<section class="card">\n    <a href="../login/login.html" class="list-item logout logout-link">\n        <div class="icon">logout</div>\n' +
                    '        <div class="list-item-text">Выйти из аккаунта</div>\n    </a>\n</section>\n\n' +
                    '<nav class="bottom-nav">\n    <a href="../index/index.html"><div class="icon">event_available</div>Афиша</a>\n' +
                    '    <a href="../profile/profile.html" class="active"><div class="icon">person</div>Профиль</a>\n</nav>',
                css: '.logout {\n    color: #ff6b6b;\n}\n\n.logout .icon {\n    color: #ff6b6b;\n}\n\n' +
                    '.bottom-nav {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    max-width: 430px;\n    margin: 0 auto;\n' +
                    '    display: flex;\n    background: #1c1c20;\n    border-top: 1px solid #2e2e34;\n}\n\n' +
                    '.bottom-nav a.active {\n    color: #f5a623;\n}',
            },
            checks: [
                ['Ссылка выхода ведёт на ../login/login.html', function (t) { return t.attr('.logout-link', 'href') === '../login/login.html'; }],
                ['В ссылке выхода иконка logout и текст', function (t) {
                    return t.text('.logout-link .icon') === 'logout' && t.text('.logout-link').indexOf('Выйти') >= 0;
                }],
                ['Выход красный (и иконка тоже)', function (t) {
                    return t.color('.logout', 'color') === '#ff6b6b' && t.color('.logout .icon', 'color') === '#ff6b6b';
                }],
                ['В меню ссылка на профиль с классом active', function (t) {
                    return t.attr('.bottom-nav a.active', 'href') === '../profile/profile.html';
                }],
                ['Меню прилипает к низу (fixed, bottom: 0)', function (t) {
                    return t.css('.bottom-nav', 'position') === 'fixed' && t.css('.bottom-nav', 'bottom') === '0px';
                }],
                ['Растянуто: left: 0 и right: 0', function (t) {
                    return t.css('.bottom-nav', 'left') === '0px' && t.css('.bottom-nav', 'right') === '0px';
                }],
                ['Не шире 430px и по центру', function (t) {
                    return t.css('.bottom-nav', 'max-width') === '430px' && t.rule('.bottom-nav', 'margin-left') === 'auto';
                }],
                ['Активная ссылка оранжевая', function (t) { return t.color('.bottom-nav a.active', 'color') === '#f5a623'; }],
            ],
        },

        // 11
        {
            title: 'JS: ползунки и «Тоже иду»',
            kind: 'JS',
            text: '<p>Оживим ползунки. Класс <code>off</code> делает ползунок серым, а кружок — слева (стили уже готовы).</p><ul>' +
                '<li>для каждого <code>.switch</code> при клике переключай класс <code>off</code>: <code>toggle</code> вернёт <code>true</code>, если класс добавился</li>' +
                '<li>и меняй подпись под настройкой (<code>.setting-text</code> в той же строке): если выключили — текст из ' +
                '<code>toggle.dataset.off</code>, если включили — из <code>toggle.dataset.on</code></li>' +
                '<li>кнопка «Тоже иду» (<code>.go-btn</code>): при клике переключай класс <code>btn-accent</code></li></ul>' +
                '<p>Подсказка: подпись в той же строке — <code>toggle.parentElement.querySelector(\'.setting-text\')</code>.</p>',
            hint: ['querySelectorAll(...).forEach', 'classList.toggle(\'off\')', 'dataset.on / dataset.off', 'parentElement', 'textContent'],
            start: {
                html: settingsHtml + '\n\n<button class="btn btn-accent go-btn">Тоже иду</button>',
                css: cardCss + '\n' + listItemCss + '\n' + switchCss + '\n' + switchOffCss + '\n' + T.btnCss,
                js: 'const switches = document.querySelectorAll(\'.switch\');\n\n// 1) ползунки\n\n\n// 2) «Тоже иду»\n',
            },
            answer: {
                js: 'const switches = document.querySelectorAll(\'.switch\');\n\n' +
                    'switches.forEach(function (toggle) {\n    const text = toggle.parentElement.querySelector(\'.setting-text\');\n\n' +
                    '    toggle.addEventListener(\'click\', function () {\n        const isOff = toggle.classList.toggle(\'off\');\n' +
                    '        if (isOff) {\n            text.textContent = toggle.dataset.off;\n        } else {\n' +
                    '            text.textContent = toggle.dataset.on;\n        }\n    });\n});\n\n' +
                    'const goButton = document.querySelector(\'.go-btn\');\ngoButton.addEventListener(\'click\', function () {\n' +
                    '    goButton.classList.toggle(\'btn-accent\');\n});',
            },
            checks: [
                ['Клик выключает первый ползунок (класс off)', function (t) {
                    t.click('.switch');
                    return t.has('.switch', 'off');
                }],
                ['Подпись меняется на «Тёмная тема выключена»', function (t) { return t.text('.setting-text') === 'Тёмная тема выключена'; }],
                ['Второй клик включает обратно', function (t) {
                    t.click('.switch');
                    return !t.has('.switch', 'off') && t.text('.setting-text') === 'Тёмная тема включена';
                }],
                ['Второй ползунок работает отдельно', function (t) {
                    const second = t.all('.switch')[1];
                    second.click();
                    return second.classList.contains('off') && !t.has('.switch', 'off') &&
                        t.all('.setting-text')[1].textContent === 'Напоминания выключены';
                }],
                ['«Тоже иду» становится серой и обратно', function (t) {
                    t.click('.go-btn');
                    const grey = !t.has('.go-btn', 'btn-accent');
                    t.click('.go-btn');
                    return grey && t.has('.go-btn', 'btn-accent');
                }],
            ],
        },

        // 12
        {
            title: 'JS: имя из регистрации и QR-код',
            kind: 'JS',
            text: '<p>Последний шаг — связать профиль с регистрацией и открыть окно с QR-кодом.</p><ul>' +
                '<li>возьми имя: <code>localStorage.getItem(\'userName\')</code>. Если оно есть — запиши его в <code>.user-name</code>, ' +
                'а первую букву (<code>name[0]</code>) — в <code>.user-letter</code></li>' +
                '<li>клик по «Показать QR-код» (<code>.open-qr</code>) открывает окно <code>.qr-modal</code> (<code>showModal()</code>)</li>' +
                '<li>кнопка <code>.close-modal</code> в окне закрывает его (<code>close()</code>)</li></ul>' +
                '<p>Для проверки мы сами положим в localStorage имя «Марат».</p>',
            hint: ['localStorage.getItem', 'if (name)', 'textContent', 'name[0]', 'showModal()', 'close()'],
            before: function () { localStorage.setItem('userName', 'Марат'); },
            after: function () { localStorage.removeItem('userName'); },
            start: {
                html: userCard + '\n\n<button class="btn btn-accent open-qr">Показать QR-код</button>\n\n' +
                    '<dialog class="modal qr-modal">\n    <h2>«Полночь в Париже»</h2>\n    <p>Покажи код на входе</p>\n' +
                    '    <button class="btn close-modal">Готово</button>\n</dialog>',
                css: cardCss + '\n' + mutedCss + '\n' + T.btnCss +
                    '\n.profile-head {\n    display: flex;\n    gap: 14px;\n    align-items: center;\n}\n\n' +
                    '.avatar-big {\n    width: 66px;\n    height: 66px;\n    border-radius: 50%;\n    background: #f5a623;\n    color: #1a1a1a;\n' +
                    '    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 26px;\n    font-weight: 700;\n}\n\n' +
                    '.modal {\n    margin: auto;\n    padding: 20px;\n    border: none;\n    border-radius: 16px;\n    background: #1c1c20;\n    color: #f2f2f2;\n}\n',
                js: 'const qrModal = document.querySelector(\'.qr-modal\');\n\n// 1) имя из localStorage\n\n\n// 2) открыть QR-код\n\n\n// 3) закрыть окно\n',
            },
            answer: {
                js: 'const qrModal = document.querySelector(\'.qr-modal\');\n\nconst name = localStorage.getItem(\'userName\');\nif (name) {\n' +
                    '    document.querySelector(\'.user-name\').textContent = name;\n' +
                    '    document.querySelector(\'.user-letter\').textContent = name[0];\n}\n\n' +
                    'document.querySelector(\'.open-qr\').addEventListener(\'click\', function () {\n    qrModal.showModal();\n});\n\n' +
                    'document.querySelector(\'.close-modal\').addEventListener(\'click\', function () {\n    qrModal.close();\n});',
            },
            checks: [
                ['Имя из localStorage показано в профиле', function (t) { return t.text('.user-name') === 'Марат'; }],
                ['На аватарке первая буква «М»', function (t) { return t.text('.user-letter') === 'М'; }],
                ['«Показать QR-код» открывает окно', function (t) {
                    t.click('.open-qr');
                    return t.q('.qr-modal').open === true;
                }],
                ['«Готово» закрывает окно', function (t) {
                    t.click('.close-modal');
                    return t.q('.qr-modal').open === false;
                }],
            ],
        },
    ];
})();
