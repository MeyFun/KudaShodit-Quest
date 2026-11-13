// =========================================================
// Задачи страницы «Регистрация» — Кирилл Зяблов
// =========================================================

(function () {
    const T = QuestTasks;

    function field(label, icon, name, type, placeholder, extra) {
        return '<div class="field">\n' +
            '    <label class="field-label">' + label + '</label>\n' +
            '    <div class="input">\n' +
            '        <div class="icon">' + icon + '</div>\n' +
            '        <input name="' + name + '" type="' + type + '" placeholder="' + placeholder + '">\n' +
            (extra || '') +
            '    </div>\n' +
            '</div>';
    }

    const nameField = field('Ваше имя *', 'person', 'name', 'text', 'Например, Алексей');
    const phoneField = field('Телефон (+7) *', 'call', 'phone', 'tel', '+7 (999) 000-00-00');
    const emailField = field('Email *', 'mail', 'email', 'email', 'omsk.afisha@example.ru');
    const strengthHtml =
        '    <div class="strength">\n        <div class="bar"></div>\n        <div class="bar"></div>\n' +
        '        <div class="bar"></div>\n        <div class="bar"></div>\n    </div>\n';
    const passwordField = field('Пароль * <small class="muted strength-text">Надежность</small>', 'lock', 'password', 'password',
        'Минимум 8 знаков', '        <div class="icon eye-btn">visibility_off</div>\n').replace('    </div>\n</div>', '    </div>\n' + strengthHtml + '</div>');
    const districtField = field('Район города', 'location_city', 'district', 'text', 'Например, Центральный');
    const checkboxHtml = '<label class="checkbox">\n    <input name="agree" type="checkbox">\n' +
        '    <p>Я соглашаюсь с <b class="link">условиями использования сервиса</b> и обработкой данных</p>\n</label>';

    const strengthCss = '.strength {\n    display: flex;\n    gap: 6px;\n    margin-top: 8px;\n}\n\n' +
        '.bar {\n    flex: 1;\n    height: 4px;\n    border-radius: 999px;\n    background: #2e2e34;\n}\n';
    const barColorsCss = '.bar-weak {\n    background: #ff6b6b;\n}\n\n.bar-medium {\n    background: #f5a623;\n}\n\n.bar-strong {\n    background: #4caf50;\n}\n';
    const checkboxCss = '.checkbox {\n    display: flex;\n    gap: 10px;\n    align-items: flex-start;\n    margin-bottom: 16px;\n' +
        '    font-size: 13px;\n    color: #9a9aa2;\n}\n\n.checkbox input {\n    width: 20px;\n    height: 20px;\n}\n';
    const linkCss = '.link {\n    color: #f5a623;\n    font-size: 13px;\n    font-weight: 700;\n}\n';
    const mutedCss = '.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}\n';

    function indent(html) {
        return html.replace(/^/gm, '    ');
    }

    QUEST_TASKS.register = [
        // 1
        T.base(),

        // 2
        T.headerBack('../login/login.html', 'Регистрация', 'на страницу входа'),

        // 3
        {
            title: 'Приветственный блок',
            kind: 'CSS',
            text: '<p>Сверху — карточка «Добро пожаловать». HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.card</code>: фон <code>#1c1c20</code>, скругление <code>16px</code>, отступы <code>16px</code>, снизу <code>14px</code></li>' +
                '<li><code>.promo-label</code>: оранжевый <code>#f5a623</code>, размер <code>12px</code>, жирность <code>700</code>, ЗАГЛАВНЫМИ</li>' +
                '<li><code>.welcome-title</code>: размер <code>21px</code>, отступы <code>8px 0</code></li>' +
                '<li><code>.muted</code>: серый <code>#9a9aa2</code>, размер <code>13px</code></li></ul>',
            hint: ['background', 'border-radius', 'padding', 'color', 'font-size', 'text-transform: uppercase', 'margin'],
            start: {
                html: '<section class="card">\n    <div class="promo-label"><div class="icon">local_fire_department</div> Омск на связи</div>\n' +
                    '    <h1 class="welcome-title">Добро пожаловать в КУДА_СХОДИТЬ</h1>\n' +
                    '    <p class="muted">Создайте профиль, чтобы сохранять мероприятия Омска, видеть планы друзей и получать еженедельные подборки.</p>\n' +
                    '</section>',
                css: '.card {\n    \n}\n\n.promo-label {\n    \n}\n\n.welcome-title {\n    \n}\n\n.muted {\n    \n}\n',
            },
            answer: {
                css: '.card {\n    background: #1c1c20;\n    border-radius: 16px;\n    padding: 16px;\n    margin-bottom: 14px;\n}\n\n' +
                    '.promo-label {\n    color: #f5a623;\n    font-size: 12px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n' +
                    '.welcome-title {\n    font-size: 21px;\n    margin: 8px 0;\n}\n\n' + mutedCss,
            },
            checks: [
                ['.card: фон #1c1c20', function (t) { return t.color('.card', 'background-color') === '#1c1c20'; }],
                ['.card: скругление 16px, отступы 16px', function (t) {
                    return t.px('.card', 'border-top-left-radius') === 16 && t.px('.card', 'padding-top') === 16;
                }],
                ['.promo-label: оранжевый', function (t) { return t.color('.promo-label', 'color') === '#f5a623'; }],
                ['.promo-label: 12px и ЗАГЛАВНЫЕ', function (t) {
                    return t.px('.promo-label', 'font-size') === 12 && t.css('.promo-label', 'text-transform') === 'uppercase';
                }],
                ['Заголовок 21px', function (t) { return t.px('.welcome-title', 'font-size') === 21; }],
                ['Отступы заголовка 8px сверху и снизу', function (t) {
                    return t.px('.welcome-title', 'margin-top') === 8 && t.px('.welcome-title', 'margin-bottom') === 8;
                }],
                ['.muted: серый 13px', function (t) {
                    return t.color('.muted', 'color') === '#9a9aa2' && t.px('.muted', 'font-size') === 13;
                }],
            ],
        },

        // 4
        {
            title: 'Поле «Ваше имя»',
            kind: 'HTML + CSS',
            text: '<p>Первое поле формы. Структура каждого поля одинаковая: подпись сверху, под ней серая плашка с иконкой и полем ввода.</p><ul>' +
                '<li>HTML: в <code>.input</code> после иконки добавь <code>&lt;input&gt;</code> с <code>name="name"</code>, <code>type="text"</code>, ' +
                '<code>placeholder="Например, Алексей"</code></li>' +
                '<li><code>.field</code>: отступ снизу <code>16px</code></li>' +
                '<li><code>.field-label</code>: в строку, края разнесены, жирность <code>600</code>, снизу <code>8px</code></li>' +
                '<li><code>.input</code>: в строку, по центру, промежуток <code>10px</code>, фон <code>#26262b</code>, ' +
                'скругление <code>12px</code>, отступы <code>0 14px</code></li></ul>',
            hint: ['<input name="..." type="..." placeholder="...">', 'margin-bottom', 'display: flex', 'justify-content', 'gap', 'border-radius'],
            start: {
                html: '<form class="register-form">\n    <div class="field">\n        <label class="field-label">Ваше имя *</label>\n' +
                    '        <div class="input">\n            <div class="icon">person</div>\n            <!-- сюда поле ввода -->\n\n' +
                    '        </div>\n    </div>\n</form>',
                css: '.field {\n    \n}\n\n.field-label {\n    \n}\n\n.input {\n    \n}\n\n/* Уже готово */\n' +
                    '.input .icon {\n    color: #9a9aa2;\n}\n\n' +
                    '.input input {\n    flex: 1;\n    background: #26262b;\n    border: none;\n    outline: none;\n    padding: 14px 0;\n}\n',
            },
            answer: { html: '<form class="register-form">\n' + indent(nameField) + '\n</form>', css: T.fieldCss },
            checks: [
                ['Есть поле name="name"', function (t) { return !!t.q('.input input[name="name"]'); }],
                ['У поля type="text"', function (t) { return t.attr('input[name="name"]', 'type') === 'text'; }],
                ['Подсказка «Например, Алексей»', function (t) { return t.attr('input[name="name"]', 'placeholder') === 'Например, Алексей'; }],
                ['.field: отступ снизу 16px', function (t) { return t.px('.field', 'margin-bottom') === 16; }],
                ['.field-label: flex, жирность 600', function (t) {
                    return t.css('.field-label', 'display') === 'flex' && t.css('.field-label', 'font-weight') === '600';
                }],
                ['.input: в строку и по центру', function (t) {
                    return t.css('.input', 'display') === 'flex' && t.css('.input', 'align-items') === 'center';
                }],
                ['.input: фон #26262b, скругление 12px', function (t) {
                    return t.color('.input', 'background-color') === '#26262b' && t.px('.input', 'border-top-left-radius') === 12;
                }],
                ['.input: промежуток 10px, отступы по бокам 14px', function (t) {
                    return t.css('.input', 'column-gap') === '10px' && t.px('.input', 'padding-left') === 14;
                }],
            ],
        },

        // 5
        {
            title: 'Телефон и email',
            kind: 'HTML',
            text: '<p>Добавь ещё два поля — по образцу поля имени:</p><ul>' +
                '<li>«Телефон (+7) *»: иконка <code>call</code>, поле <code>name="phone"</code> <code>type="tel"</code>, ' +
                'подсказка <code>+7 (999) 000-00-00</code></li>' +
                '<li>«Email *»: иконка <code>mail</code>, поле <code>name="email"</code> <code>type="email"</code>, ' +
                'подсказка <code>omsk.afisha@example.ru</code></li></ul>' +
                '<p>Тип поля важен: на телефоне <code>tel</code> открывает цифровую клавиатуру, а <code>email</code> — клавиатуру с @.</p>',
            hint: ['<div class="field">', '<label class="field-label">', 'type="tel"', 'type="email"', 'placeholder'],
            start: {
                html: '<form class="register-form">\n' + indent(nameField) + '\n\n    <!-- сюда поле телефона -->\n\n\n    <!-- сюда поле email -->\n\n</form>',
                css: T.fieldCss,
            },
            answer: { html: '<form class="register-form">\n' + indent(nameField) + '\n' + indent(phoneField) + '\n' + indent(emailField) + '\n</form>' },
            checks: [
                ['В форме три поля .field', function (t) { return t.all('.register-form .field').length === 3; }],
                ['Есть поле телефона name="phone"', function (t) { return !!t.q('.input input[name="phone"]'); }],
                ['У телефона type="tel"', function (t) { return t.attr('input[name="phone"]', 'type') === 'tel'; }],
                ['Есть поле email name="email"', function (t) { return !!t.q('.input input[name="email"]'); }],
                ['У email type="email"', function (t) { return t.attr('input[name="email"]', 'type') === 'email'; }],
                ['У обоих полей есть подсказки', function (t) {
                    return !!t.attr('input[name="phone"]', 'placeholder') && !!t.attr('input[name="email"]', 'placeholder');
                }],
                ['Подписи «Телефон» и «Email»', function (t) {
                    const labels = t.all('.field-label').map(function (l) { return l.textContent; }).join(' ');
                    return labels.indexOf('Телефон') >= 0 && labels.indexOf('Email') >= 0;
                }],
            ],
        },

        // 6
        {
            title: 'Пароль и полоски надёжности',
            kind: 'HTML + CSS',
            text: '<p>Под паролем — 4 полоски, которые потом будут закрашиваться (это сделаем в JS).</p><ul>' +
                '<li>HTML: после <code>.input</code> добавь <code>&lt;div class="strength"&gt;</code>, а в нём 4 блока ' +
                '<code>&lt;div class="bar"&gt;&lt;/div&gt;</code></li>' +
                '<li><code>.strength</code>: в строку, промежуток <code>6px</code>, сверху <code>8px</code></li>' +
                '<li><code>.bar</code>: растягивается (<code>flex: 1</code>), высота <code>4px</code>, скругление <code>999px</code>, фон <code>#2e2e34</code></li></ul>',
            hint: ['<div class="strength">', '<div class="bar">', 'display: flex', 'gap', 'flex: 1', 'height'],
            start: {
                html: '<div class="field">\n    <label class="field-label">Пароль * <small class="muted strength-text">Надежность</small></label>\n' +
                    '    <div class="input">\n        <div class="icon">lock</div>\n' +
                    '        <input name="password" type="password" placeholder="Минимум 8 знаков">\n' +
                    '        <div class="icon eye-btn">visibility_off</div>\n    </div>\n    <!-- сюда 4 полоски -->\n\n</div>',
                css: '.strength {\n    \n}\n\n.bar {\n    \n}\n\n/* Уже готово */\n' + T.fieldCss + '\n' + mutedCss,
            },
            answer: { html: passwordField, css: strengthCss },
            checks: [
                ['Есть блок .strength', function (t) { return !!t.q('.field .strength'); }],
                ['В нём 4 полоски .bar', function (t) { return t.all('.strength .bar').length === 4; }],
                ['.strength в строку, промежуток 6px', function (t) {
                    return t.css('.strength', 'display') === 'flex' && t.css('.strength', 'column-gap') === '6px';
                }],
                ['.strength: отступ сверху 8px', function (t) { return t.px('.strength', 'margin-top') === 8; }],
                ['.bar растягивается (flex: 1)', function (t) { return t.css('.bar', 'flex-grow') === '1'; }],
                ['.bar: высота 4px, фон #2e2e34', function (t) {
                    return t.px('.bar', 'height') === 4 && t.color('.bar', 'background-color') === '#2e2e34';
                }],
                ['Полоски одинаковой ширины', function (t) {
                    const w = t.all('.bar').map(function (b) { return Math.round(b.getBoundingClientRect().width); });
                    return w.length === 4 && w[0] > 10 && w.every(function (x) { return Math.abs(x - w[0]) <= 1; });
                }],
            ],
        },

        // 7
        {
            title: 'Район города',
            kind: 'HTML',
            text: '<p>Последнее поле — район, чтобы показывать события рядом. Оно не обязательное, поэтому без звёздочки.</p><ul>' +
                '<li>Сделай <code>.field</code> с подписью «Район города»</li>' +
                '<li>Внутри <code>.input</code>: иконка <code>location_city</code> и поле <code>name="district"</code> <code>type="text"</code> ' +
                'с подсказкой <code>Например, Центральный</code></li></ul>',
            hint: ['<div class="field">', '<label class="field-label">', '<div class="icon">location_city</div>', '<input name="district">'],
            start: { html: '<form class="register-form">\n    <!-- сюда поле района -->\n\n</form>', css: T.fieldCss },
            answer: { html: '<form class="register-form">\n' + indent(districtField) + '\n</form>' },
            checks: [
                ['Есть .field с подписью «Район города»', function (t) { return t.text('.field .field-label') === 'Район города'; }],
                ['Есть иконка location_city', function (t) { return t.text('.input .icon') === 'location_city'; }],
                ['Есть поле name="district"', function (t) { return !!t.q('.input input[name="district"]'); }],
                ['type="text" и подсказка', function (t) {
                    return t.attr('input[name="district"]', 'type') === 'text' &&
                        (t.attr('input[name="district"]', 'placeholder') || '').indexOf('Центральный') >= 0;
                }],
            ],
        },

        // 8
        {
            title: 'Галочка согласия',
            kind: 'HTML + CSS',
            text: '<p>Перед кнопкой — галочка «Я соглашаюсь с условиями».</p><ul>' +
                '<li>HTML: в <code>&lt;label class="checkbox"&gt;</code> первым добавь <code>&lt;input name="agree" type="checkbox"&gt;</code></li>' +
                '<li><code>.checkbox</code>: в строку, промежуток <code>10px</code>, по верхнему краю (<code>align-items: flex-start</code>), ' +
                'снизу <code>16px</code>, текст <code>13px</code> серого цвета <code>#9a9aa2</code></li>' +
                '<li><code>.checkbox input</code>: размер <code>20×20px</code></li></ul>' +
                '<p>Раз и галочка, и текст лежат внутри <code>&lt;label&gt;</code>, клик по тексту тоже ставит галочку.</p>',
            hint: ['type="checkbox"', 'display: flex', 'gap', 'align-items: flex-start', 'width', 'height'],
            start: {
                html: '<label class="checkbox">\n    <!-- сюда галочку -->\n\n' +
                    '    <p>Я соглашаюсь с <b class="link">условиями использования сервиса</b> и обработкой данных</p>\n</label>',
                css: '.checkbox {\n    \n}\n\n.checkbox input {\n    \n}\n\n/* Уже готово */\n' + linkCss,
            },
            answer: { html: checkboxHtml, css: checkboxCss },
            checks: [
                ['Есть галочка type="checkbox"', function (t) { return !!t.q('.checkbox input[type="checkbox"]'); }],
                ['У галочки name="agree"', function (t) { return t.attr('.checkbox input', 'name') === 'agree'; }],
                ['.checkbox в строку, промежуток 10px', function (t) {
                    return t.css('.checkbox', 'display') === 'flex' && t.css('.checkbox', 'column-gap') === '10px';
                }],
                ['.checkbox: по верхнему краю', function (t) { return t.css('.checkbox', 'align-items') === 'flex-start'; }],
                ['.checkbox: серый текст 13px', function (t) {
                    return t.color('.checkbox', 'color') === '#9a9aa2' && t.px('.checkbox', 'font-size') === 13;
                }],
                ['Галочка 20×20px', function (t) {
                    return t.rule('.checkbox input', 'width') === '20px' && t.px('.checkbox input', 'height') === 20;
                }],
                ['Клик по тексту ставит галочку', function (t) {
                    t.click('.checkbox p');
                    return t.q('.checkbox input').checked === true;
                }],
            ],
        },

        // 9
        T.bigButton('Создать аккаунт'),

        // 10
        {
            title: 'Соцсети и ссылка «Войти»',
            kind: 'HTML + CSS',
            text: '<p>Внизу — две кнопки соцсетей и ссылка для тех, у кого уже есть аккаунт.</p><ul>' +
                '<li>HTML: в <code>.socials</code> две кнопки <code>&lt;button class="btn social-btn"&gt;</code>: «ВКонтакте» и «Telegram»</li>' +
                '<li>HTML: в <code>.auth-switch</code> ссылка <code>&lt;a href="../login/login.html" class="link"&gt;Войти&lt;/a&gt;</code></li>' +
                '<li><code>.socials</code>: сетка из двух колонок <code>1fr 1fr</code>, промежуток <code>8px</code></li>' +
                '<li><code>.auth-switch</code>: текст по центру, отступы <code>20px 0</code></li></ul>',
            hint: ['<button class="btn social-btn">', '<a href="...">', 'display: grid', 'grid-template-columns: 1fr 1fr', 'text-align: center'],
            start: {
                html: '<div class="divider"><div class="line"></div>или зарегистрируйтесь через<div class="line"></div></div>\n' +
                    '<div class="socials">\n    <!-- две кнопки -->\n\n</div>\n\n<p class="auth-switch">\n    Уже зарегистрированы?\n</p>',
                css: '.socials {\n    \n}\n\n.auth-switch {\n    \n}\n\n/* Уже готово */\n' + T.btnCss + '\n' + linkCss +
                    '\n.socials .btn {\n    border-radius: 12px;\n    padding: 14px;\n}\n\n' +
                    '.divider {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    margin: 20px 0 14px;\n    color: #9a9aa2;\n' +
                    '    font-size: 11px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n' +
                    '.line {\n    flex: 1;\n    height: 1px;\n    background: #2e2e34;\n}\n',
            },
            answer: {
                html: '<div class="divider"><div class="line"></div>или зарегистрируйтесь через<div class="line"></div></div>\n' +
                    '<div class="socials">\n    <button class="btn social-btn">ВКонтакте</button>\n    <button class="btn social-btn">Telegram</button>\n</div>\n\n' +
                    '<p class="auth-switch">\n    Уже зарегистрированы? <a href="../login/login.html" class="link">Войти</a>\n</p>',
                css: '.socials {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 8px;\n}\n\n' +
                    '.auth-switch {\n    text-align: center;\n    margin: 20px 0;\n}',
            },
            checks: [
                ['Две кнопки .social-btn', function (t) { return t.all('.socials .btn.social-btn').length === 2; }],
                ['Кнопки «ВКонтакте» и «Telegram»', function (t) {
                    return t.text('.socials').indexOf('ВКонтакте') >= 0 && t.text('.socials').indexOf('Telegram') >= 0;
                }],
                ['.socials — сетка из 2 колонок', function (t) {
                    return t.css('.socials', 'display') === 'grid' && t.css('.socials', 'grid-template-columns').split(' ').length === 2;
                }],
                ['Промежуток 8px', function (t) { return t.css('.socials', 'column-gap') === '8px'; }],
                ['Ссылка «Войти» ведёт на ../login/login.html', function (t) {
                    return t.attr('.auth-switch a', 'href') === '../login/login.html' && t.text('.auth-switch a') === 'Войти';
                }],
                ['.auth-switch по центру, отступ 20px', function (t) {
                    return t.css('.auth-switch', 'text-align') === 'center' && t.px('.auth-switch', 'margin-top') === 20;
                }],
            ],
        },

        // 11
        {
            title: 'JS: глазок и надёжность пароля',
            kind: 'JS',
            text: '<p>Две вещи для поля пароля:</p><ul>' +
                '<li>клик по глазку <code>.eye-btn</code>: если <code>type</code> поля <code>"password"</code> — сделай <code>"text"</code> ' +
                'и текст глазка <code>visibility</code>; иначе — обратно <code>"password"</code> и <code>visibility_off</code></li>' +
                '<li>при вводе пароля (событие <code>input</code>): если длина пароля <code>8</code> и больше — добавь первым трём полоскам ' +
                '<code>.bar</code> класс <code>bar-medium</code>, иначе убери его у всех</li></ul>' +
                '<p>Подсказка: <code>bars.forEach(function (bar, index) { ... })</code> — <code>index</code> это номер полоски: 0, 1, 2, 3.</p>',
            hint: ['addEventListener', 'passwordInput.type', 'passwordInput.value.length', 'forEach(function (bar, index) ...)', 'classList.add / remove'],
            start: {
                html: passwordField,
                css: T.fieldCss + '\n' + mutedCss + '\n' + strengthCss + '\n' + barColorsCss + '\n.eye-btn {\n    cursor: pointer;\n}\n',
                js: 'const passwordInput = document.querySelector(\'input[name="password"]\');\n' +
                    'const eyeButton = document.querySelector(\'.eye-btn\');\nconst bars = document.querySelectorAll(\'.bar\');\n\n' +
                    '// 1) глазок\n\n\n// 2) полоски надёжности\n',
            },
            answer: {
                js: 'const passwordInput = document.querySelector(\'input[name="password"]\');\n' +
                    'const eyeButton = document.querySelector(\'.eye-btn\');\nconst bars = document.querySelectorAll(\'.bar\');\n\n' +
                    'eyeButton.addEventListener(\'click\', function () {\n    if (passwordInput.type === \'password\') {\n' +
                    '        passwordInput.type = \'text\';\n        eyeButton.textContent = \'visibility\';\n    } else {\n' +
                    '        passwordInput.type = \'password\';\n        eyeButton.textContent = \'visibility_off\';\n    }\n});\n\n' +
                    'passwordInput.addEventListener(\'input\', function () {\n    bars.forEach(function (bar, index) {\n' +
                    '        if (passwordInput.value.length >= 8 && index < 3) {\n            bar.classList.add(\'bar-medium\');\n' +
                    '        } else {\n            bar.classList.remove(\'bar-medium\');\n        }\n    });\n});',
            },
            checks: [
                ['Глазок показывает пароль', function (t) {
                    t.click('.eye-btn');
                    return t.q('input[name="password"]').type === 'text' && t.text('.eye-btn') === 'visibility';
                }],
                ['Второй клик снова прячет пароль', function (t) {
                    t.click('.eye-btn');
                    return t.q('input[name="password"]').type === 'password' && t.text('.eye-btn') === 'visibility_off';
                }],
                ['Короткий пароль — полоски не закрашены', function (t) {
                    t.type('input[name="password"]', 'abc');
                    return t.all('.bar.bar-medium').length === 0;
                }],
                ['Пароль из 8 знаков закрашивает 3 полоски', function (t) {
                    t.type('input[name="password"]', 'abcdefgh');
                    const bars = t.all('.bar');
                    return bars[0].classList.contains('bar-medium') && bars[2].classList.contains('bar-medium') &&
                        !bars[3].classList.contains('bar-medium');
                }],
                ['Если стереть пароль, полоски снова серые', function (t) {
                    t.type('input[name="password"]', 'ab');
                    return t.all('.bar.bar-medium').length === 0;
                }],
            ],
        },

        // 12
        {
            title: 'JS: проверка формы и имя в профиль',
            kind: 'JS',
            text: '<p>При отправке формы (событие <code>submit</code>) проверь поля и сохрани имя для страницы профиля:</p><ul>' +
                '<li>отмени обычную отправку: <code>event.preventDefault()</code></li>' +
                '<li>если имя пустое — напиши в <code>.error</code> «Заполни имя», покажи её и <code>return</code></li>' +
                '<li>если пароль короче 8 знаков — «Пароль должен быть не короче 8 знаков», покажи, <code>return</code></li>' +
                '<li>если галочка не стоит (<code>!form.elements.agree.checked</code>) — «Поставь галочку согласия», покажи, <code>return</code></li>' +
                '<li>иначе сохрани имя: <code>localStorage.setItem(\'userName\', name)</code> и перейди: <code>location.href = form.action</code></li></ul>',
            hint: ['event.preventDefault()', 'form.elements.name.value.trim()', '.length < 8', '.checked', 'textContent', 'localStorage.setItem'],
            before: function () { localStorage.removeItem('userName'); },
            after: function () { localStorage.removeItem('userName'); },
            start: {
                html: '<form class="register-form" action="../profile/profile.html">\n' + indent(nameField) + '\n' +
                    indent(passwordField) + '\n' + indent(checkboxHtml) + '\n    <p class="error hide"></p>\n' +
                    '    <button type="submit" class="btn btn-accent">Создать аккаунт</button>\n</form>',
                css: T.fieldCss + '\n' + mutedCss + '\n' + strengthCss + '\n' + checkboxCss + '\n' + linkCss + '\n' + T.btnCss + '\n' + T.hideCss,
                js: 'const form = document.querySelector(\'.register-form\');\nconst error = document.querySelector(\'.error\');\n\n' +
                    'function showError(text) {\n    error.textContent = text;\n    error.classList.remove(\'hide\');\n}\n\n' +
                    'form.addEventListener(\'submit\', function (event) {\n    // проверь поля по порядку\n\n});\n',
            },
            answer: {
                js: 'const form = document.querySelector(\'.register-form\');\nconst error = document.querySelector(\'.error\');\n\n' +
                    'function showError(text) {\n    error.textContent = text;\n    error.classList.remove(\'hide\');\n}\n\n' +
                    'form.addEventListener(\'submit\', function (event) {\n    event.preventDefault();\n\n' +
                    '    const name = form.elements.name.value.trim();\n    const password = form.elements.password.value;\n\n' +
                    '    if (name === \'\') {\n        showError(\'Заполни имя\');\n        return;\n    }\n' +
                    '    if (password.length < 8) {\n        showError(\'Пароль должен быть не короче 8 знаков\');\n        return;\n    }\n' +
                    '    if (!form.elements.agree.checked) {\n        showError(\'Поставь галочку согласия\');\n        return;\n    }\n\n' +
                    '    localStorage.setItem(\'userName\', name);\n    location.href = form.action;\n});',
            },
            checks: [
                ['Пустая форма не отправляется', function (t) { return t.submit('.register-form'); }],
                ['Пустое имя — видна ошибка', function (t) { return t.visible('.error') && t.text('.error').length > 0; }],
                ['Короткий пароль — ошибка про пароль', function (t) {
                    t.q('input[name="name"]').value = 'Кирилл';
                    t.q('input[name="password"]').value = '123';
                    t.submit('.register-form');
                    return t.text('.error').toLowerCase().indexOf('пароль') >= 0;
                }],
                ['Без галочки — ошибка про галочку', function (t) {
                    t.q('input[name="password"]').value = '12345678';
                    t.submit('.register-form');
                    return t.text('.error').toLowerCase().indexOf('галочк') >= 0;
                }],
                ['Всё верно — имя сохранено в localStorage', function (t) {
                    t.q('input[name="agree"]').checked = true;
                    t.submit('.register-form');
                    return localStorage.getItem('userName') === 'Кирилл';
                }],
            ],
        },
    ];
})();
