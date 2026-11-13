// =========================================================
// Задачи страницы «Вход» — Лев Ложников
// =========================================================

(function () {
    const T = QuestTasks;

    // поле логина целиком (используется в нескольких задачах как готовый код)
    const loginField =
        '<div class="field">\n' +
        '    <label class="field-label">Телефон или Email <b class="link quick-input">Быстрый ввод</b></label>\n' +
        '    <div class="input">\n' +
        '        <div class="icon">alternate_email</div>\n' +
        '        <input name="login" type="text" placeholder="+7 (___) ___-__-__ или name@mail.ru">\n' +
        '    </div>\n' +
        '</div>';

    const passwordField =
        '<div class="field">\n' +
        '    <label class="field-label">Пароль <a href="#" class="link forgot-link">Забыли пароль?</a></label>\n' +
        '    <div class="input">\n' +
        '        <div class="icon">lock</div>\n' +
        '        <input name="password" type="password" placeholder="••••••••••••">\n' +
        '        <div class="icon eye-btn">visibility_off</div>\n' +
        '    </div>\n' +
        '</div>';

    const linkCss = '.link {\n    color: #f5a623;\n    font-size: 13px;\n    font-weight: 700;\n}\n';
    const cardCss = '.card {\n    background: #1c1c20;\n    border-radius: 16px;\n    padding: 16px;\n    margin-bottom: 14px;\n}\n';

    QUEST_TASKS.login = [
        // 1
        T.base(),

        // 2
        T.headerBack('../afisha/afisha.html', 'Вход', 'на афишу'),

        // 3
        {
            title: 'Чип, логотип и заголовок',
            kind: 'CSS',
            text: '<p>Под шапкой — «чип» с точкой, логотип, большой заголовок и серый текст. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.page-title</code>: в строку, чип слева, логотип справа (<code>space-between</code>), по центру по вертикали</li>' +
                '<li><code>.chip</code>: в строку с промежутком <code>6px</code>, фон <code>#26262b</code>, скругление <code>999px</code>, ' +
                'отступы <code>5px 12px</code>, текст <code>11px</code></li>' +
                '<li><code>.dot</code>: круг <code>7×7px</code> (скругление <code>50%</code>), фон <code>#f5a623</code></li>' +
                '<li><code>.auth-title</code>: размер <code>26px</code>, отступы <code>14px 0 8px</code></li>' +
                '<li><code>.muted</code>: серый цвет <code>#9a9aa2</code>, размер <code>13px</code></li></ul>',
            hint: ['display: flex', 'justify-content: space-between', 'align-items', 'gap', 'border-radius', 'width', 'height', 'font-size', 'color'],
            start: {
                html: '<div class="page-title">\n    <b class="chip"><div class="dot"></div>ОМСК · АФИША</b>\n' +
                    '    <a href="../afisha/afisha.html" class="logo-title">КУДА_СХОДИТЬ</a>\n</div>\n\n' +
                    '<h1 class="auth-title">С возвращением! ✨</h1>\n' +
                    '<p class="muted">Войдите, чтобы видеть планы друзей и не пропускать лучшие события Омска</p>',
                css: '.page-title {\n    \n}\n\n.chip {\n    \n}\n\n.dot {\n    \n}\n\n.auth-title {\n    \n}\n\n.muted {\n    \n}\n\n' +
                    '/* Уже готово */\n.logo-title {\n    font-size: 16px;\n    font-weight: 600;\n}\n',
            },
            answer: {
                css: '.page-title {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n' +
                    '.chip {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    background: #26262b;\n    border-radius: 999px;\n' +
                    '    padding: 5px 12px;\n    font-size: 11px;\n    font-weight: 700;\n}\n\n' +
                    '.dot {\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: #f5a623;\n}\n\n' +
                    '.auth-title {\n    font-size: 26px;\n    margin: 14px 0 8px;\n}\n\n' +
                    '.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}',
            },
            checks: [
                ['.page-title в строку, края разнесены', function (t) {
                    return t.css('.page-title', 'display') === 'flex' && t.css('.page-title', 'justify-content') === 'space-between';
                }],
                ['.chip: flex и промежуток 6px', function (t) {
                    return t.css('.chip', 'display') === 'flex' && t.css('.chip', 'column-gap') === '6px';
                }],
                ['.chip: фон #26262b и скругление 999px', function (t) {
                    return t.color('.chip', 'background-color') === '#26262b' && t.px('.chip', 'border-top-left-radius') === 999;
                }],
                ['.chip: текст 11px', function (t) { return t.px('.chip', 'font-size') === 11; }],
                ['.dot: круг 7×7px', function (t) {
                    return t.px('.dot', 'width') === 7 && t.px('.dot', 'height') === 7 && t.css('.dot', 'border-top-left-radius') === '50%';
                }],
                ['.dot: оранжевая', function (t) { return t.color('.dot', 'background-color') === '#f5a623'; }],
                ['.auth-title: 26px', function (t) { return t.px('.auth-title', 'font-size') === 26; }],
                ['.muted: серый #9a9aa2 и 13px', function (t) {
                    return t.color('.muted', 'color') === '#9a9aa2' && t.px('.muted', 'font-size') === 13;
                }],
            ],
        },

        // 4
        {
            title: 'Карточка формы и поле логина',
            kind: 'HTML + CSS',
            text: '<p>Форма входа лежит в тёмной карточке. Внутри — поле для телефона или email.</p><ul>' +
                '<li>HTML: в <code>.input</code> после иконки добавь поле <code>&lt;input&gt;</code> с атрибутами ' +
                '<code>name="login"</code>, <code>type="text"</code> и подсказкой <code>placeholder="+7 (___) ___-__-__ или name@mail.ru"</code></li>' +
                '<li>CSS <code>.card</code>: фон <code>#1c1c20</code>, скругление <code>16px</code>, внутренние отступы <code>16px</code></li>' +
                '<li>CSS <code>.input</code>: в строку, по центру по вертикали, промежуток <code>10px</code>, фон <code>#26262b</code>, ' +
                'скругление <code>12px</code>, отступы <code>0 14px</code></li></ul>',
            hint: ['<input>', 'name', 'type="text"', 'placeholder', 'background', 'border-radius', 'padding', 'display: flex'],
            start: {
                html: '<form class="card login-form">\n    <div class="field">\n' +
                    '        <label class="field-label">Телефон или Email <b class="link">Быстрый ввод</b></label>\n' +
                    '        <div class="input">\n            <div class="icon">alternate_email</div>\n' +
                    '            <!-- сюда поле ввода -->\n\n        </div>\n    </div>\n</form>',
                css: '.card {\n    \n}\n\n.input {\n    \n}\n\n/* Уже готово */\n' +
                    '.field-label {\n    display: flex;\n    justify-content: space-between;\n    font-weight: 600;\n    margin-bottom: 8px;\n}\n\n' +
                    '.input .icon {\n    color: #9a9aa2;\n}\n\n' +
                    '.input input {\n    flex: 1;\n    background: #26262b;\n    border: none;\n    outline: none;\n    padding: 14px 0;\n}\n\n' + linkCss,
            },
            answer: {
                html: '<form class="card login-form">\n' + loginField.replace(/^/gm, '    ').replace(' quick-input', '') + '\n</form>',
                css: cardCss + '\n.input {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    background: #26262b;\n' +
                    '    border-radius: 12px;\n    padding: 0 14px;\n}',
            },
            checks: [
                ['В .input есть поле input', function (t) { return !!t.q('.input input'); }],
                ['У поля name="login"', function (t) { return t.attr('.input input', 'name') === 'login'; }],
                ['У поля type="text"', function (t) { return t.attr('.input input', 'type') === 'text'; }],
                ['У поля есть placeholder', function (t) { return (t.attr('.input input', 'placeholder') || '').length > 3; }],
                ['.card: фон #1c1c20', function (t) { return t.color('.card', 'background-color') === '#1c1c20'; }],
                ['.card: скругление 16px и отступы 16px', function (t) {
                    return t.px('.card', 'border-top-left-radius') === 16 && t.px('.card', 'padding-top') === 16;
                }],
                ['.input: в строку и по центру', function (t) {
                    return t.css('.input', 'display') === 'flex' && t.css('.input', 'align-items') === 'center';
                }],
                ['.input: фон #26262b и скругление 12px', function (t) {
                    return t.color('.input', 'background-color') === '#26262b' && t.px('.input', 'border-top-left-radius') === 12;
                }],
                ['.input: промежуток 10px', function (t) { return t.css('.input', 'column-gap') === '10px'; }],
            ],
        },

        // 5
        {
            title: 'Поле пароля',
            kind: 'HTML',
            text: '<p>Под полем логина сделай второе поле — для пароля. Повтори структуру первого поля:</p><ul>' +
                '<li><code>&lt;div class="field"&gt;</code>, внутри подпись <code>&lt;label class="field-label"&gt;</code> со словом «Пароль» ' +
                'и ссылкой <code>&lt;a href="#" class="link forgot-link"&gt;Забыли пароль?&lt;/a&gt;</code></li>' +
                '<li>Затем <code>&lt;div class="input"&gt;</code>: иконка <code>lock</code>, поле <code>name="password"</code> ' +
                '<code>type="password"</code> (точки вместо букв!) и иконка-глазок <code>&lt;div class="icon eye-btn"&gt;visibility_off&lt;/div&gt;</code></li></ul>',
            hint: ['<div class="field">', '<label>', '<a href="#">', 'type="password"', 'class="icon eye-btn"'],
            start: {
                html: '<form class="card login-form">\n' + loginField.replace(/^/gm, '    ') + '\n\n    <!-- сюда второе поле: пароль -->\n\n</form>',
                css: cardCss + '\n' + T.fieldCss + '\n' + linkCss,
            },
            answer: {
                html: '<form class="card login-form">\n' + loginField.replace(/^/gm, '    ') + '\n' + passwordField.replace(/^/gm, '    ') + '\n</form>',
            },
            checks: [
                ['В форме два блока .field', function (t) { return t.all('.login-form .field').length === 2; }],
                ['Есть подпись «Пароль»', function (t) { return t.text('.field:nth-of-type(2) .field-label').indexOf('Пароль') >= 0; }],
                ['Есть ссылка .forgot-link с href="#"', function (t) { return t.attr('.forgot-link', 'href') === '#'; }],
                ['Есть поле name="password"', function (t) { return !!t.q('input[name="password"]'); }],
                ['Поле пароля type="password"', function (t) { return t.attr('input[name="password"]', 'type') === 'password'; }],
                ['Есть иконка .eye-btn с текстом visibility_off', function (t) { return t.text('.eye-btn') === 'visibility_off'; }],
                ['Иконка lock стоит во втором поле', function (t) {
                    return t.all('.icon').some(function (e) { return e.textContent.trim() === 'lock'; });
                }],
            ],
        },

        // 6
        T.bigButton('Войти'),

        // 7
        {
            title: 'Разделитель «или»',
            kind: 'HTML + CSS',
            text: '<p>Под формой — надпись «или войдите через» с линиями слева и справа.</p><ul>' +
                '<li>HTML: в <code>.divider</code> добавь <code>&lt;div class="line"&gt;&lt;/div&gt;</code> до текста и ещё одну после</li>' +
                '<li><code>.divider</code>: в строку, по центру по вертикали, промежуток <code>10px</code>, серый <code>#9a9aa2</code>, ' +
                'текст <code>11px</code>, ЗАГЛАВНЫМИ (<code>text-transform: uppercase</code>), отступы <code>20px 0 14px</code></li>' +
                '<li><code>.line</code>: растягивается (<code>flex: 1</code>), высота <code>1px</code>, фон <code>#2e2e34</code></li></ul>',
            hint: ['<div class="line">', 'display: flex', 'gap', 'text-transform: uppercase', 'flex: 1', 'height: 1px'],
            start: {
                html: '<div class="divider">или войдите через</div>',
                css: '.divider {\n    \n}\n\n.line {\n    \n}\n',
            },
            answer: {
                html: '<div class="divider"><div class="line"></div>или войдите через<div class="line"></div></div>',
                css: '.divider {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    margin: 20px 0 14px;\n    color: #9a9aa2;\n' +
                    '    font-size: 11px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n' +
                    '.line {\n    flex: 1;\n    height: 1px;\n    background: #2e2e34;\n}',
            },
            checks: [
                ['В .divider две линии .line', function (t) { return t.all('.divider .line').length === 2; }],
                ['Текст стоит между линиями', function (t) {
                    const d = t.q('.divider');
                    return !!d && d.firstElementChild && d.firstElementChild.classList.contains('line') &&
                        d.lastElementChild.classList.contains('line') && t.text('.divider').indexOf('или') >= 0;
                }],
                ['.divider в строку (flex)', function (t) { return t.css('.divider', 'display') === 'flex'; }],
                ['.divider: промежуток 10px', function (t) { return t.css('.divider', 'column-gap') === '10px'; }],
                ['.divider: заглавные буквы', function (t) { return t.css('.divider', 'text-transform') === 'uppercase'; }],
                ['.divider: серый текст 11px', function (t) {
                    return t.color('.divider', 'color') === '#9a9aa2' && t.px('.divider', 'font-size') === 11;
                }],
                ['.line растягивается (flex: 1)', function (t) { return t.css('.line', 'flex-grow') === '1'; }],
                ['.line: высота 1px, фон #2e2e34', function (t) {
                    return t.px('.line', 'height') === 1 && t.color('.line', 'background-color') === '#2e2e34';
                }],
            ],
        },

        // 8
        {
            title: 'Кнопки соцсетей',
            kind: 'HTML + CSS',
            text: '<p>Сделай 4 кнопки входа через соцсети сеткой 2×2.</p><ul>' +
                '<li>HTML: в <code>.socials</code> четыре кнопки <code>&lt;button class="btn social-btn"&gt;</code>: ' +
                '«VK ID», «Яндекс ID», «Telegram», «По СМС-коду»</li>' +
                '<li><code>.socials</code>: сетка (<code>display: grid</code>) из двух равных колонок ' +
                '(<code>grid-template-columns: 1fr 1fr</code>), промежуток <code>8px</code></li>' +
                '<li><code>.socials .btn</code>: скругление <code>12px</code>, отступы <code>14px</code></li></ul>',
            hint: ['<button class="btn social-btn">', 'display: grid', 'grid-template-columns: 1fr 1fr', 'gap', '.socials .btn'],
            start: {
                html: '<div class="socials">\n    <!-- 4 кнопки -->\n\n</div>',
                css: '.socials {\n    \n}\n\n.socials .btn {\n    \n}\n\n/* Уже готово */\n' + T.btnCss,
            },
            answer: {
                html: '<div class="socials">\n    <button class="btn social-btn">VK ID</button>\n    <button class="btn social-btn">Яндекс ID</button>\n' +
                    '    <button class="btn social-btn">Telegram</button>\n    <button class="btn social-btn">По СМС-коду</button>\n</div>',
                css: '.socials {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 8px;\n}\n\n' +
                    '.socials .btn {\n    border-radius: 12px;\n    padding: 14px;\n}',
            },
            checks: [
                ['В .socials 4 кнопки', function (t) { return t.all('.socials button').length === 4; }],
                ['У всех кнопок классы btn и social-btn', function (t) {
                    const b = t.all('.socials button');
                    return b.length === 4 && b.every(function (e) { return e.classList.contains('btn') && e.classList.contains('social-btn'); });
                }],
                ['Есть кнопки VK ID и Telegram', function (t) {
                    const text = t.text('.socials');
                    return text.indexOf('VK ID') >= 0 && text.indexOf('Telegram') >= 0;
                }],
                ['.socials — сетка (grid)', function (t) { return t.css('.socials', 'display') === 'grid'; }],
                ['В сетке 2 колонки', function (t) { return t.css('.socials', 'grid-template-columns').split(' ').length === 2; }],
                ['Промежуток 8px', function (t) { return t.css('.socials', 'column-gap') === '8px'; }],
                ['Кнопки скруглены на 12px', function (t) { return t.px('.socials .btn', 'border-top-left-radius') === 12; }],
            ],
        },

        // 9
        {
            title: 'Ссылки внизу',
            kind: 'HTML + CSS',
            text: '<p>Внизу страницы — ссылка на регистрацию и мелкий текст про соглашение.</p><ul>' +
                '<li>В <code>.auth-switch</code> после вопроса добавь ссылку <code>&lt;a href="../register/register.html" class="link"&gt;</code> ' +
                'с текстом «Зарегистрироваться»</li>' +
                '<li>Во втором абзаце выдели слова «пользовательским соглашением и политикой конфиденциальности» тегом подчёркивания ' +
                '<code>&lt;u&gt;</code></li>' +
                '<li>CSS: <code>.auth-switch</code> — текст по центру, отступы <code>20px 0</code>; <code>.agreement</code> — текст по центру</li></ul>',
            hint: ['<a href="...">', '<u>', 'text-align: center', 'margin'],
            start: {
                html: '<p class="auth-switch">\n    Еще нет аккаунта?\n</p>\n<p class="muted agreement">\n' +
                    '    Авторизуясь, вы соглашаетесь с пользовательским соглашением и политикой конфиденциальности\n</p>',
                css: '.auth-switch {\n    \n}\n\n.agreement {\n    \n}\n\n/* Уже готово */\n' + linkCss +
                    '\n.muted {\n    color: #9a9aa2;\n    font-size: 13px;\n}\n',
            },
            answer: {
                html: '<p class="auth-switch">\n    Еще нет аккаунта? <a href="../register/register.html" class="link">Зарегистрироваться</a>\n</p>\n' +
                    '<p class="muted agreement">\n    Авторизуясь, вы соглашаетесь с <u>пользовательским соглашением и политикой конфиденциальности</u>\n</p>',
                css: '.auth-switch {\n    text-align: center;\n    margin: 20px 0;\n}\n\n.agreement {\n    text-align: center;\n}',
            },
            checks: [
                ['Есть ссылка на ../register/register.html', function (t) { return t.attr('.auth-switch a', 'href') === '../register/register.html'; }],
                ['Текст ссылки «Зарегистрироваться»', function (t) { return t.text('.auth-switch a') === 'Зарегистрироваться'; }],
                ['У ссылки класс link', function (t) { return t.has('.auth-switch a', 'link'); }],
                ['В .agreement есть подчёркнутый текст <u>', function (t) { return t.text('.agreement u').indexOf('соглашением') >= 0; }],
                ['.auth-switch по центру', function (t) { return t.css('.auth-switch', 'text-align') === 'center'; }],
                ['.auth-switch: отступы 20px сверху и снизу', function (t) { return t.px('.auth-switch', 'margin-top') === 20; }],
                ['.agreement по центру', function (t) { return t.css('.agreement', 'text-align') === 'center'; }],
            ],
        },

        // 10
        {
            title: 'JS: глазок у пароля',
            kind: 'JS',
            text: '<p>Пусть глазок показывает и прячет пароль. При клике на <code>.eye-btn</code>:</p><ul>' +
                '<li>если у поля <code>type</code> равен <code>"password"</code> — поменяй на <code>"text"</code>, ' +
                'а текст глазка на <code>visibility</code></li>' +
                '<li>иначе — верни <code>"password"</code> и <code>visibility_off</code></li></ul>' +
                '<p>Проверь сам: напиши что-нибудь в поле пароля в превью и пощёлкай по глазку.</p>',
            hint: ['addEventListener(\'click\', ...)', 'if / else', 'passwordInput.type', 'textContent'],
            start: {
                html: passwordField,
                css: T.fieldCss + '\n.eye-btn {\n    cursor: pointer;\n}\n',
                js: 'const passwordInput = document.querySelector(\'input[name="password"]\');\n' +
                    'const eyeButton = document.querySelector(\'.eye-btn\');\n\n' +
                    '// При клике на глазок показывай или прячь пароль\n',
            },
            answer: {
                js: 'const passwordInput = document.querySelector(\'input[name="password"]\');\n' +
                    'const eyeButton = document.querySelector(\'.eye-btn\');\n\n' +
                    'eyeButton.addEventListener(\'click\', function () {\n    if (passwordInput.type === \'password\') {\n' +
                    '        passwordInput.type = \'text\';\n        eyeButton.textContent = \'visibility\';\n    } else {\n' +
                    '        passwordInput.type = \'password\';\n        eyeButton.textContent = \'visibility_off\';\n    }\n});',
            },
            checks: [
                ['После клика пароль виден (type="text")', function (t) {
                    t.click('.eye-btn');
                    return t.attr('input[name="password"]', 'type') === 'text' || t.q('input[name="password"]').type === 'text';
                }],
                ['Глазок поменялся на visibility', function (t) { return t.text('.eye-btn') === 'visibility'; }],
                ['После второго клика пароль снова скрыт', function (t) {
                    t.click('.eye-btn');
                    return t.q('input[name="password"]').type === 'password';
                }],
                ['Глазок снова visibility_off', function (t) { return t.text('.eye-btn') === 'visibility_off'; }],
            ],
        },

        // 11
        {
            title: 'JS: проверка формы',
            kind: 'JS',
            text: '<p>Нельзя входить с пустыми полями. Когда форму отправляют (событие <code>submit</code>):</p><ul>' +
                '<li>сначала отмени обычную отправку: <code>event.preventDefault()</code></li>' +
                '<li>если логин или пароль пустые (не забудь <code>.trim()</code>) — покажи ошибку: убери у <code>.error</code> класс <code>hide</code>, ' +
                'и закончи функцию (<code>return</code>)</li>' +
                '<li>если всё заполнено — переходи в профиль: <code>location.href = form.action;</code></li></ul>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', ".value.trim() === ''", '||', "classList.remove('hide')", 'return', 'location.href = form.action'],
            start: {
                html: '<form class="card login-form" action="../profile/profile.html">\n' + loginField.replace(/^/gm, '    ') + '\n' +
                    passwordField.replace(/^/gm, '    ') + '\n    <p class="error hide">Заполни телефон или email и пароль</p>\n' +
                    '    <button type="submit" class="btn btn-accent">Войти</button>\n</form>',
                css: cardCss + '\n' + T.fieldCss + '\n' + linkCss + '\n' + T.btnCss + '\n' + T.hideCss,
                js: 'const form = document.querySelector(\'.login-form\');\nconst loginInput = form.elements.login;\n' +
                    'const passwordInput = form.elements.password;\nconst error = document.querySelector(\'.error\');\n\n' +
                    '// Проверь поля, когда форму отправляют\n',
            },
            answer: {
                js: 'const form = document.querySelector(\'.login-form\');\nconst loginInput = form.elements.login;\n' +
                    'const passwordInput = form.elements.password;\nconst error = document.querySelector(\'.error\');\n\n' +
                    'form.addEventListener(\'submit\', function (event) {\n    event.preventDefault();\n\n' +
                    '    if (loginInput.value.trim() === \'\' || passwordInput.value.trim() === \'\') {\n' +
                    '        error.classList.remove(\'hide\');\n        return;\n    }\n\n    location.href = form.action;\n});',
            },
            checks: [
                ['Пока форму не отправили, ошибки не видно', function (t) { return !t.visible('.error'); }],
                ['Пустая форма не отправляется (preventDefault)', function (t) { return t.submit('.login-form'); }],
                ['При пустых полях видна ошибка', function (t) { return t.visible('.error'); }],
                ['Ошибка видна, если пароль пустой', function (t) {
                    t.q('.error').classList.add('hide');
                    t.q('input[name="login"]').value = 'test@mail.ru';
                    t.q('input[name="password"]').value = '   ';
                    t.submit('.login-form');
                    return t.visible('.error');
                }],
            ],
        },

        // 12
        {
            title: 'JS: быстрый ввод и «Забыли пароль?»',
            kind: 'JS',
            text: '<p>Оживим две маленькие ссылки:</p><ul>' +
                '<li>клик по «Быстрый ввод» (<code>.quick-input</code>): впиши в поле логина <code>\'+7 \'</code></li>' +
                '<li>клик по «Забыли пароль?» (<code>.forgot-link</code>): отмени переход по ссылке (<code>event.preventDefault()</code>). ' +
                'Если логин пустой — покажи <code>.error</code>, иначе — покажи <code>.forgot-text</code> (убери класс <code>hide</code>)</li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", 'loginInput.value = ...', 'event.preventDefault()', 'if / else', "classList.remove('hide')"],
            start: {
                html: '<form class="card login-form">\n' + loginField.replace(/^/gm, '    ') + '\n' + passwordField.replace(/^/gm, '    ') +
                    '\n    <p class="error hide">Сначала введи телефон или email</p>\n' +
                    '    <p class="muted forgot-text hide">Ссылка для нового пароля отправлена. Проверь почту или СМС.</p>\n</form>',
                css: cardCss + '\n' + T.fieldCss + '\n' + linkCss + '\n' + T.hideCss + '\n.quick-input,\n.forgot-link {\n    cursor: pointer;\n}\n',
                js: 'const loginInput = document.querySelector(\'input[name="login"]\');\n' +
                    'const error = document.querySelector(\'.error\');\nconst forgotText = document.querySelector(\'.forgot-text\');\n\n' +
                    '// 1) «Быстрый ввод»\n\n\n// 2) «Забыли пароль?»\n',
            },
            answer: {
                js: 'const loginInput = document.querySelector(\'input[name="login"]\');\n' +
                    'const error = document.querySelector(\'.error\');\nconst forgotText = document.querySelector(\'.forgot-text\');\n\n' +
                    'document.querySelector(\'.quick-input\').addEventListener(\'click\', function () {\n    loginInput.value = \'+7 \';\n});\n\n' +
                    'document.querySelector(\'.forgot-link\').addEventListener(\'click\', function (event) {\n    event.preventDefault();\n' +
                    '    if (loginInput.value.trim() === \'\') {\n        error.classList.remove(\'hide\');\n    } else {\n' +
                    '        forgotText.classList.remove(\'hide\');\n    }\n});',
            },
            checks: [
                ['«Быстрый ввод» вписывает +7', function (t) {
                    t.click('.quick-input');
                    return t.q('input[name="login"]').value.trim() === '+7';
                }],
                ['«Забыли пароль?» с пустым логином показывает ошибку', function (t) {
                    t.q('input[name="login"]').value = '';
                    t.click('.forgot-link');
                    return t.visible('.error');
                }],
                ['«Забыли пароль?» с логином показывает сообщение про ссылку', function (t) {
                    t.q('input[name="login"]').value = 'lev@mail.ru';
                    t.click('.forgot-link');
                    return t.visible('.forgot-text');
                }],
            ],
        },
    ];
})();
