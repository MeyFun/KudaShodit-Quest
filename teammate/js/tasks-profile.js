// =========================================================
// Задачи страницы «Анкета» — Алёна Юрченко
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    const introHtml =
        '<div class="intro">\n' +
        '    <p class="eyebrow">Подбор команды</p>\n' +
        '    <h1>Найди проверенных тиммейтов <b>для побед и проектов</b></h1>\n' +
        '    <p class="lead">Заполни анкету, выбери дисциплину и откликнись на заявку команды.</p>\n' +
        '    <div class="actions">\n' +
        '        <a class="button" href="../catalog/catalog.html">Выбрать дисциплину</a>\n' +
        '        <a class="button button-quiet" href="../requests/requests.html">Смотреть заявки</a>\n' +
        '    </div>\n' +
        '</div>';

    const levelsHtml =
        '<div class="field">\n' +
        '    Уровень\n' +
        '    <div class="levels">\n' +
        '        <button class="chip level active" type="button" data-level="Новичок">Новичок</button>\n' +
        '        <button class="chip level" type="button" data-level="Любитель">Любитель</button>\n' +
        '        <button class="chip level" type="button" data-level="Опытный">Опытный</button>\n' +
        '    </div>\n' +
        '</div>';
    const formTop =
        '<form class="card profile-form">\n' +
        '    <div class="form-head">\n' +
        '        <div>\n' +
        '            <h2>Анкета игрока</h2>\n' +
        '            <p class="muted">Хранится в этом браузере.</p>\n' +
        '        </div>\n' +
        '        <div class="avatar">?</div>\n' +
        '    </div>\n' +
        '    <label class="field">Никнейм <input name="nickname" placeholder="Например, PixelFox"></label>\n';
    const formMiddle =
        '    <label class="field">Роль <input name="role" placeholder="Капитан, дизайнер…"></label>\n' +
        indent(levelsHtml) + '\n' +
        '    <label class="field">Когда удобно играть <input name="schedule" placeholder="Вечера по будням"></label>\n';
    const formBottom =
        '    <p class="muted">Основная дисциплина: <b class="my-game">не выбрана</b></p>\n' +
        '    <p class="error hide">Заполни ник и роль.</p>\n' +
        '    <p class="success hide">Профиль сохранён.</p>\n' +
        '    <button class="button" type="submit">Сохранить профиль</button>\n' +
        '</form>';
    const formHtml = formTop + formMiddle + formBottom;
    const heroHtml = '<section class="hero">\n' + indent(introHtml) + '\n\n' + indent(formHtml) + '\n</section>';

    function step(icon, title, text) {
        return '<article class="card step">\n    <div class="step-icon">' + icon + '</div>\n    <h2>' + title + '</h2>\n    <p>' + text + '</p>\n</article>';
    }
    const s1 = step('◎', 'Заполни профиль', 'Укажи ник, роль и свой уровень.');
    const s2 = step('✦', 'Найди команду', 'Выбери дисциплину и посмотри заявки.');
    const s3 = step('☆', 'Читай отзывы', 'Узнай, как другие участники оценивают работу в команде.');
    const stepsHtml = '<section class="steps">\n' + indent(s1) + '\n' + indent(s2) + '\n' + indent(s3) + '\n</section>';

    const introCss =
        'h1 {\n    font-family: Georgia, serif;\n    font-size: 44px;\n    line-height: 1.15;\n}\n\n' +
        '.eyebrow {\n    margin-bottom: 10px;\n    font-size: 13px;\n    font-weight: 700;\n    text-transform: uppercase;\n    color: #f7ca60;\n}\n\n' +
        '.intro h1 b {\n    color: #f7ca60;\n}\n\n' +
        '.lead {\n    margin-top: 12px;\n    color: #bcb2c9;\n}\n\n' +
        '.actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin-top: 24px;\n}\n';
    const formCss =
        '.profile-form {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' + T.css.fields;
    const headCss =
        T.css.card + '\n' +
        '.form-head {\n    display: flex;\n    gap: 16px;\n    align-items: flex-start;\n    justify-content: space-between;\n}\n\n' +
        '.avatar {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-width: 40px;\n    width: 40px;\n    height: 40px;\n' +
        '    font-weight: 700;\n    color: #f7ca60;\n    background: #382c48;\n    border-radius: 10px;\n}\n\n' +
        '.levels {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' + T.css.chips;
    const heroCss =
        '.hero {\n    display: grid;\n    grid-template-columns: 3fr 2fr;\n    gap: 48px;\n    align-items: start;\n}\n\n' +
        '.intro {\n    padding-top: 24px;\n}\n';
    const stepsCss =
        '.steps {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 14px;\n}\n\n' +
        '.step {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n' +
        '.step-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 40px;\n    height: 40px;\n' +
        '    color: #f7ca60;\n    background: #382c48;\n    border-radius: 10px;\n}\n';
    const stepsReady = '.step p {\n    font-size: 14px;\n    color: #bcb2c9;\n}\n';
    const textCss = T.css.muted + '\n.my-game {\n    color: #f7ca60;\n}\n\n.success {\n    font-size: 14px;\n    color: #b0e3dd;\n}\n';

    const levelsJs =
        "levels.forEach(function (button) {\n    button.addEventListener('click', function () {\n        level = button.dataset.level;\n        showLevel();\n    });\n});\n";
    const showLevelJs =
        'function showLevel() {\n    levels.forEach(function (button) {\n        if (button.dataset.level === level) {\n' +
        "            button.classList.add('active');\n        } else {\n            button.classList.remove('active');\n        }\n    });\n}\n";
    const formConsts =
        "const data = loadData();\nconst profileForm = document.querySelector('.profile-form');\nconst levels = document.querySelectorAll('.level');\n" +
        "const avatar = document.querySelector('.avatar');\nconst myGame = document.querySelector('.my-game');\n" +
        "const formError = profileForm.querySelector('.error');\nconst formSuccess = profileForm.querySelector('.success');\nlet level = 'Новичок';\n\n";

    function fill(t, nick, role) {
        const f = t.q('.profile-form');
        f.elements.nickname.value = nick;
        f.elements.role.value = role;
    }

    QUEST_TASKS.profile = [
        // 1
        T.base(),

        // 2
        T.header('profile'),

        // 3
        {
            title: 'Главный экран: текст',
            kind: 'CSS',
            text: '<p>Слева на главном экране — надпись, большой заголовок, описание и две кнопки. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.eyebrow</code>: <code>13px</code>, жирный <code>700</code>, большими буквами (<code>text-transform: uppercase</code>), цвет <code>#f7ca60</code>, снизу отступ <code>10px</code></li>' +
                '<li><code>h1</code>: шрифт <code>Georgia, serif</code>, <code>44px</code>, высота строки <code>1.15</code></li>' +
                '<li><code>.intro h1 b</code> (выделенная часть заголовка): цвет <code>#f7ca60</code></li>' +
                '<li><code>.lead</code>: отступ сверху <code>12px</code>, цвет <code>#bcb2c9</code></li>' +
                '<li><code>.actions</code>: кнопки в строку с переносом, промежуток <code>8px</code>, отступ сверху <code>24px</code></li></ul>',
            hint: ['font-size', 'font-weight', 'text-transform: uppercase', 'color', 'margin-bottom', 'font-family', 'line-height', 'margin-top', 'display: flex', 'flex-wrap: wrap', 'gap'],
            start: {
                html: introHtml,
                css: '.eyebrow {\n    \n}\n\nh1 {\n    \n}\n\n.intro h1 b {\n    \n}\n\n.lead {\n    \n}\n\n.actions {\n    \n}\n\n/* Уже готово */\n' + T.css.buttons,
            },
            answer: { css: introCss + '\n' + T.css.buttons },
            checks: [
                ['.eyebrow: 13px, жирный, большими буквами', function (t) {
                    return t.px('.eyebrow', 'font-size') === 13 && t.css('.eyebrow', 'font-weight') === '700' && t.css('.eyebrow', 'text-transform') === 'uppercase';
                }],
                ['.eyebrow: цвет #f7ca60, снизу 10px', function (t) {
                    return t.color('.eyebrow', 'color') === '#f7ca60' && t.px('.eyebrow', 'margin-bottom') === 10;
                }],
                ['h1: Georgia 44px, высота строки 1.15', function (t) {
                    return t.css('h1', 'font-family').indexOf('Georgia') >= 0 && t.px('h1', 'font-size') === 44 && Math.abs(t.px('h1', 'line-height') - 50.6) < 0.5;
                }],
                ['Выделенная часть заголовка #f7ca60', function (t) { return t.color('h1 b', 'color') === '#f7ca60'; }],
                ['.lead: сверху 12px, цвет #bcb2c9', function (t) {
                    return t.px('.lead', 'margin-top') === 12 && t.color('.lead', 'color') === '#bcb2c9';
                }],
                ['.actions: в строку с переносом, промежуток 8px, сверху 24px', function (t) {
                    return t.css('.actions', 'display') === 'flex' && t.css('.actions', 'flex-wrap') === 'wrap' &&
                        t.css('.actions', 'column-gap') === '8px' && t.px('.actions', 'margin-top') === 24;
                }],
            ],
        },

        // 4
        {
            title: 'Анкета: разметка',
            kind: 'HTML',
            text: '<p>Справа — анкета игрока. Шапка формы и поле «Никнейм» готовы. Допиши после никнейма:</p><ul>' +
                '<li>поле «Роль»: <code>&lt;label class="field"&gt;Роль &lt;input name="role" placeholder="Капитан, дизайнер…"&gt;&lt;/label&gt;</code></li>' +
                '<li>блок уровня: <code>&lt;div class="field"&gt;</code> с текстом «Уровень», внутри <code>&lt;div class="levels"&gt;</code> и три кнопки ' +
                '<code>&lt;button class="chip level" type="button" data-level="Новичок"&gt;Новичок&lt;/button&gt;</code> — так же «Любитель» и «Опытный». ' +
                'У первой кнопки ещё класс <code>active</code></li>' +
                '<li>поле «Когда удобно играть» с <code>name="schedule"</code> и подсказкой «Вечера по будням»</li></ul>' +
                '<p>Почему уровень не в <code>&lt;input&gt;</code>? Вариантов всего три — удобнее нажать кнопку, чем печатать.</p>',
            hint: ['<label class="field">', '<input name="..." placeholder="...">', '<div class="...">', '<button class="..." type="button" data-level="...">'],
            start: {
                html: formTop + '\n    <!-- роль, уровень и время игры -->\n\n' + formBottom,
                css: formCss + '\n' + headCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide,
            },
            answer: { html: formHtml },
            checks: [
                ['Поле name="role" в label.field', function (t) { return !!t.q('label.field input[name="role"]'); }],
                ['Поле name="schedule" в label.field', function (t) { return !!t.q('label.field input[name="schedule"]'); }],
                ['Поля идут по порядку: ник, роль, время', function (t) {
                    return t.all('.profile-form input').map(function (i) { return i.name; }).join(',') === 'nickname,role,schedule';
                }],
                ['Блок .levels внутри div.field', function (t) { return !!t.q('div.field .levels'); }],
                ['Три кнопки .chip.level type="button"', function (t) {
                    const b = t.all('.levels button.chip.level');
                    return b.length === 3 && b.every(function (x) { return x.getAttribute('type') === 'button'; });
                }],
                ['data-level: Новичок, Любитель, Опытный', function (t) {
                    return t.all('.levels .level').map(function (b) { return b.dataset.level; }).join(',') === 'Новичок,Любитель,Опытный';
                }],
                ['Активна только первая кнопка', function (t) {
                    const b = t.all('.levels .level');
                    return b.length === 3 && b[0].classList.contains('active') && t.all('.levels .active').length === 1;
                }],
            ],
        },

        // 5
        {
            title: 'Анкета: поля',
            kind: 'CSS',
            text: '<p>Оформим поля анкеты:</p><ul>' +
                '<li><code>.profile-form</code>: всё столбиком, промежуток <code>16px</code></li>' +
                '<li><code>.field</code>: подпись и поле столбиком, промежуток <code>6px</code>, текст <code>14px</code> цвета <code>#bcb2c9</code></li>' +
                '<li><code>.field input, .field textarea</code> (одно правило на оба): на всю ширину, отступы <code>10px 12px</code>, фон <code>#15141b</code>, ' +
                'рамка <code>1px solid #3a3547</code>, скругление <code>8px</code></li>' +
                '<li><code>.error</code>: <code>14px</code>, цвет <code>#ff9b9b</code></li></ul>',
            hint: ['flex-direction: column', 'width: 100%', 'border: 1px solid ...', 'border-radius'],
            start: {
                html: formHtml.replace('<p class="error hide">', '<p class="error">'),
                css: '.profile-form {\n    \n}\n\n.field {\n    \n}\n\n.field input,\n.field textarea {\n    \n}\n\n.error {\n    \n}\n\n/* Уже готово */\n' +
                    headCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide,
            },
            answer: { css: formCss + '\n' + headCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide },
            checks: [
                ['.profile-form: столбиком, промежуток 16px', function (t) {
                    return t.css('.profile-form', 'display') === 'flex' && t.css('.profile-form', 'flex-direction') === 'column' &&
                        t.css('.profile-form', 'row-gap') === '16px';
                }],
                ['.field: столбиком, промежуток 6px', function (t) {
                    return t.css('.field', 'flex-direction') === 'column' && t.css('.field', 'row-gap') === '6px';
                }],
                ['.field: 14px цвета #bcb2c9', function (t) {
                    return t.px('.field', 'font-size') === 14 && t.color('.field', 'color') === '#bcb2c9';
                }],
                ['Поле: на всю ширину, фон #15141b', function (t) {
                    return t.rule('.field input', 'width') === '100%' && t.color('.field input', 'background-color') === '#15141b';
                }],
                ['Поле: отступы 10px 12px, рамка 1px #3a3547, скругление 8px', function (t) {
                    return t.px('.field input', 'padding-top') === 10 && t.px('.field input', 'padding-left') === 12 &&
                        Math.abs(t.px('.field input', 'border-top-width') - 1) <= 0.5 && t.color('.field input', 'border-top-color') === '#3a3547' &&
                        t.px('.field input', 'border-top-left-radius') === 8;
                }],
                ['.field textarea в том же правиле', function (t) { return t.rule('.field textarea', 'width') === '100%'; }],
                ['.error: 14px, #ff9b9b', function (t) {
                    return t.px('.error', 'font-size') === 14 && t.color('.error', 'color') === '#ff9b9b';
                }],
            ],
        },

        // 6
        {
            title: 'Анкета: карточка, аватар и уровни',
            kind: 'CSS',
            text: '<p>Сделаем из формы карточку:</p><ul>' +
                '<li><code>.card</code>: отступы <code>18px</code>, фон <code>#1c1b23</code>, рамка <code>1px solid #3a3547</code>, скругление <code>12px</code></li>' +
                '<li><code>.form-head</code>: в строку, края разнесены, промежуток <code>16px</code></li>' +
                '<li><code>.avatar</code>: квадрат <code>40×40px</code> (и <code>min-width: 40px</code>, чтобы не сжимался), буква по центру, фон <code>#382c48</code>, ' +
                'цвет <code>#f7ca60</code>, скругление <code>10px</code></li>' +
                '<li><code>.levels</code>: кнопки в строку с переносом, промежуток <code>8px</code></li>' +
                '<li><code>.chip</code>: отступы <code>8px 14px</code>, жирный <code>700</code>, фон <code>#15141b</code>, рамка <code>1px solid #3a3547</code>, скругление <code>8px</code>; ' +
                '<code>.chip.active</code>: фон <code>#f7ca60</code>, текст <code>#241a06</code></li></ul>',
            hint: ['justify-content: space-between', 'align-items: center', 'justify-content: center', 'min-width', 'height', 'width'],
            start: {
                html: formHtml,
                css: '.card {\n    \n}\n\n.form-head {\n    \n}\n\n.avatar {\n    \n}\n\n.levels {\n    \n}\n\n.chip {\n    \n}\n\n.chip.active {\n    \n}\n\n/* Уже готово */\n' +
                    formCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide,
            },
            answer: { css: headCss + '\n' + formCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide },
            checks: [
                ['.card: отступы 18px, фон #1c1b23', function (t) {
                    return t.px('.card', 'padding-top') === 18 && t.color('.card', 'background-color') === '#1c1b23';
                }],
                ['.card: рамка 1px #3a3547, скругление 12px', function (t) {
                    return Math.abs(t.px('.card', 'border-top-width') - 1) <= 0.5 && t.color('.card', 'border-top-color') === '#3a3547' &&
                        t.px('.card', 'border-top-left-radius') === 12;
                }],
                ['.form-head: в строку, края разнесены', function (t) {
                    return t.css('.form-head', 'display') === 'flex' && t.css('.form-head', 'justify-content') === 'space-between';
                }],
                ['.avatar: 40×40px, буква по центру', function (t) {
                    return t.px('.avatar', 'width') === 40 && t.px('.avatar', 'height') === 40 && t.css('.avatar', 'display') === 'flex' &&
                        t.css('.avatar', 'justify-content') === 'center' && t.css('.avatar', 'align-items') === 'center';
                }],
                ['.avatar: фон #382c48, скругление 10px', function (t) {
                    return t.color('.avatar', 'background-color') === '#382c48' && t.px('.avatar', 'border-top-left-radius') === 10;
                }],
                ['.levels: в строку с переносом, промежуток 8px', function (t) {
                    return t.css('.levels', 'display') === 'flex' && t.css('.levels', 'flex-wrap') === 'wrap' && t.css('.levels', 'column-gap') === '8px';
                }],
                ['.chip: фон #15141b, скругление 8px', function (t) {
                    return t.color('.chip:not(.active)', 'background-color') === '#15141b' && t.px('.chip:not(.active)', 'border-top-left-radius') === 8;
                }],
                ['.chip.active: фон #f7ca60, текст #241a06', function (t) {
                    return t.color('.chip.active', 'background-color') === '#f7ca60' && t.color('.chip.active', 'color') === '#241a06';
                }],
            ],
        },

        // 7
        {
            title: 'Кнопки и две колонки',
            kind: 'CSS',
            text: '<p>Соберём главный экран: слева текст, справа анкета.</p><ul>' +
                '<li><code>.hero</code>: сетка из двух колонок <code>3fr 2fr</code> (левая шире), промежуток <code>48px</code>, ' +
                'обе колонки прижаты к верху (<code>align-items: start</code>)</li>' +
                '<li><code>.intro</code>: отступ сверху <code>24px</code></li>' +
                '<li><code>.button</code>: <code>display: inline-block</code>, отступы <code>10px 16px</code>, жирный <code>700</code>, текст по центру, ' +
                'цвет <code>#241a06</code>, фон <code>#f7ca60</code>, рамка <code>1px solid #f7ca60</code>, скругление <code>8px</code></li>' +
                '<li><code>.button-quiet</code> (тихая кнопка): цвет <code>#f4eef9</code>, фон <code>#15141b</code>, цвет рамки <code>#3a3547</code></li></ul>',
            hint: ['grid-template-columns: 3fr 2fr', 'align-items: start', 'display: inline-block', 'text-align: center', 'border-color'],
            start: {
                html: '<section class="hero">\n' + indent(introHtml) + '\n\n' + indent(formHtml) + '\n</section>',
                css: '.hero {\n    \n}\n\n.intro {\n    \n}\n\n.button {\n    \n}\n\n.button-quiet {\n    \n}\n\n/* Уже готово */\n' +
                    introCss + '\n' + formCss + '\n' + headCss + '\n' + textCss + '\n' + T.css.hide,
            },
            answer: { css: heroCss + '\n' + T.css.buttons + '\n' + introCss + '\n' + formCss + '\n' + headCss + '\n' + textCss + '\n' + T.css.hide },
            checks: [
                ['.hero — сетка из 2 колонок', function (t) {
                    return t.css('.hero', 'display') === 'grid' && t.css('.hero', 'grid-template-columns').split(' ').length === 2;
                }],
                ['Колонки 3fr 2fr', function (t) { return t.rule('.hero', 'grid-template-columns').replace(/\s+/g, ' ') === '3fr 2fr'; }],
                ['.hero: промежуток 48px, прижато к верху', function (t) {
                    return t.css('.hero', 'column-gap') === '48px' && t.css('.hero', 'align-items') === 'start';
                }],
                ['.intro: сверху 24px', function (t) { return t.px('.intro', 'padding-top') === 24; }],
                ['.button: inline-block, отступы 10px 16px, скругление 8px', function (t) {
                    return t.rule('.button', 'display') === 'inline-block' && t.px('a.button', 'padding-top') === 10 &&
                        t.px('a.button', 'padding-left') === 16 && t.px('a.button', 'border-top-left-radius') === 8;
                }],
                ['.button: фон #f7ca60, цвет #241a06, жирный', function (t) {
                    return t.color('a.button', 'background-color') === '#f7ca60' && t.color('a.button', 'color') === '#241a06' &&
                        t.css('a.button', 'font-weight') === '700';
                }],
                ['.button-quiet: фон #15141b, цвет #f4eef9, рамка #3a3547', function (t) {
                    return t.color('.button-quiet', 'background-color') === '#15141b' && t.color('.button-quiet', 'color') === '#f4eef9' &&
                        t.color('.button-quiet', 'border-top-color') === '#3a3547';
                }],
            ],
        },

        // 8
        {
            title: 'Три шага',
            kind: 'HTML + CSS',
            text: '<p>Под главным экраном — три шага. Первый готов, допиши ещё два по образцу:</p><ul>' +
                '<li>иконка <code>✦</code>, заголовок «Найди команду», текст «Выбери дисциплину и посмотри заявки.»</li>' +
                '<li>иконка <code>☆</code>, заголовок «Читай отзывы», текст «Узнай, как другие участники оценивают работу в команде.»</li></ul>' +
                '<p>И оформи:</p><ul>' +
                '<li><code>.steps</code>: сетка из трёх колонок, промежуток <code>14px</code></li>' +
                '<li><code>.step</code>: столбиком, промежуток <code>8px</code></li>' +
                '<li><code>.step-icon</code>: квадрат <code>40×40px</code>, значок по центру, фон <code>#382c48</code>, цвет <code>#f7ca60</code>, скругление <code>10px</code></li></ul>',
            hint: ['<article class="...">', '<h2>', '<p>', 'grid-template-columns: repeat(3, 1fr)'],
            start: {
                html: '<section class="steps">\n' + indent(s1) + '\n\n    <!-- ещё два шага -->\n\n</section>',
                css: '.steps {\n    \n}\n\n.step {\n    \n}\n\n.step-icon {\n    \n}\n\n/* Уже готово */\n' + stepsReady + '\n' + T.css.card,
            },
            answer: {
                html: stepsHtml,
                css: stepsCss + '\n' + stepsReady + '\n' + T.css.card,
            },
            checks: [
                ['Три шага .card.step', function (t) { return t.all('.steps .card.step').length === 3; }],
                ['Заголовки шагов по порядку', function (t) {
                    return t.all('.step h2').map(function (h) { return h.textContent.trim(); }).join('|') === 'Заполни профиль|Найди команду|Читай отзывы';
                }],
                ['У каждого шага иконка .step-icon и текст', function (t) {
                    return t.all('.step').every(function (s) { return !!s.querySelector('.step-icon') && !!s.querySelector('p'); });
                }],
                ['.steps — сетка из 3 колонок, промежуток 14px', function (t) {
                    return t.css('.steps', 'display') === 'grid' && t.css('.steps', 'grid-template-columns').split(' ').length === 3 &&
                        t.css('.steps', 'column-gap') === '14px';
                }],
                ['.step: столбиком, промежуток 8px', function (t) {
                    return t.css('.step', 'flex-direction') === 'column' && t.css('.step', 'row-gap') === '8px';
                }],
                ['.step-icon: 40×40px, по центру', function (t) {
                    return t.px('.step-icon', 'width') === 40 && t.px('.step-icon', 'height') === 40 && t.css('.step-icon', 'justify-content') === 'center';
                }],
                ['.step-icon: фон #382c48, цвет #f7ca60, скругление 10px', function (t) {
                    return t.color('.step-icon', 'background-color') === '#382c48' && t.color('.step-icon', 'color') === '#f7ca60' &&
                        t.px('.step-icon', 'border-top-left-radius') === 10;
                }],
            ],
        },

        // 9
        T.footer('profile'),

        // 10
        {
            title: 'JS: бургер и уровень',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>уровень: напиши функцию <code>showLevel()</code> — для каждой кнопки уровня (<code>forEach</code>): если <code>button.dataset.level === level</code>, ' +
                'добавь класс <code>active</code>, иначе убери. А при клике на любую кнопку уровня запомни <code>level = button.dataset.level</code> и вызови <code>showLevel()</code></li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", 'querySelectorAll(...).forEach', 'function showLevel() { }',
                'button.dataset.level', 'classList.add / remove', 'if / else'],
            start: {
                html: T.burgerHtml + '\n\n' + levelsHtml,
                css: T.burgerCss + '\n' + T.css.chips + '\n.levels {\n    display: flex;\n    gap: 8px;\n}\n',
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const levels = document.querySelectorAll('.level');\nlet level = 'Новичок';\n\n" +
                    '// 1) бургер\n\n\n// 2) функция showLevel()\n\n\n// 3) клик по кнопкам уровня\n',
            },
            answer: {
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const levels = document.querySelectorAll('.level');\nlet level = 'Новичок';\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" + showLevelJs + '\n' + levelsJs,
            },
            checks: T.burgerChecks.concat([
                ['Клик по «Опытный» делает её активной', function (t) {
                    t.click('[data-level="Опытный"]');
                    return t.has('[data-level="Опытный"]', 'active');
                }],
                ['«Новичок» больше не активна', function (t) {
                    return !t.has('[data-level="Новичок"]', 'active') && t.all('.level.active').length === 1;
                }],
                ['Клик по «Любитель» — активна только она', function (t) {
                    t.click('[data-level="Любитель"]');
                    return t.has('[data-level="Любитель"]', 'active') && t.all('.level.active').length === 1;
                }],
            ]),
        },

        // 11
        {
            title: 'JS: сохранение анкеты',
            kind: 'JS',
            text: '<p>При отправке формы <code>.profile-form</code>:</p><ul>' +
                '<li>отмени перезагрузку страницы (<code>event.preventDefault()</code>) и спрячь <code>formSuccess</code></li>' +
                '<li>возьми ник, роль и время из полей формы (<code>profileForm.elements.nickname.value.trim()</code> и т. д.)</li>' +
                '<li>если ник или роль пустые — покажи <code>formError</code> (убери класс <code>hide</code>) и выйди (<code>return</code>)</li>' +
                '<li>иначе спрячь ошибку, запиши в <code>data.profile</code> объект ' +
                '<code>{ nickname: nickname, role: role, level: level, schedule: schedule }</code>, вызови <code>saveData(data)</code> и покажи <code>formSuccess</code></li></ul>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', 'profileForm.elements.nickname.value.trim()', "=== ''", '||', 'return',
                '{ nickname: nickname, ... }', 'saveData(data)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: formHtml,
                css: formCss + '\n' + headCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: T.js.data + '\n' + formConsts + showLevelJs + '\n' + levelsJs + '\n// отправка анкеты\n',
            },
            answer: {
                js: T.js.data + '\n' + formConsts + showLevelJs + '\n' + levelsJs + '\n' +
                    "profileForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    '    const nickname = profileForm.elements.nickname.value.trim();\n    const role = profileForm.elements.role.value.trim();\n' +
                    "    const schedule = profileForm.elements.schedule.value.trim();\n    formSuccess.classList.add('hide');\n\n" +
                    "    if (nickname === '' || role === '') {\n        formError.classList.remove('hide');\n        return;\n    }\n\n" +
                    "    formError.classList.add('hide');\n    data.profile = { nickname: nickname, role: role, level: level, schedule: schedule };\n" +
                    "    saveData(data);\n    formSuccess.classList.remove('hide');\n});",
            },
            checks: [
                ['Отправка не перезагружает страницу', function (t) { return t.submit('.profile-form'); }],
                ['Без ника и роли видна ошибка', function (t) {
                    return t.visible('.profile-form .error') && !t.visible('.profile-form .success') && T.saved() === null;
                }],
                ['Только ник без роли — всё ещё ошибка', function (t) {
                    fill(t, 'PixelFox', '');
                    t.submit('.profile-form');
                    return t.visible('.profile-form .error') && T.saved() === null;
                }],
                ['Ник и роль — анкета сохранена, ошибки нет', function (t) {
                    fill(t, '  PixelFox ', 'Капитан');
                    t.click('[data-level="Опытный"]');
                    t.submit('.profile-form');
                    const s = T.saved();
                    return !!s && !!s.profile && !t.visible('.profile-form .error') && t.visible('.profile-form .success');
                }],
                ['Сохранены ник без пробелов, роль и уровень', function (t) {
                    const p = T.saved().profile;
                    return p.nickname === 'PixelFox' && p.role === 'Капитан' && p.level === 'Опытный' && p.schedule === '';
                }],
            ],
        },

        // 12
        {
            title: 'JS: анкета после перезагрузки',
            kind: 'JS',
            text: '<p>Анкета сохранена, но после перезагрузки поля пустые. Напиши функцию <code>showProfile()</code>:</p><ul>' +
                '<li>если в <code>data.game</code> что-то есть (игру выбирают на странице «Дисциплины») — напиши её в <code>myGame</code></li>' +
                '<li>если <code>data.profile === null</code> — выйди (<code>return</code>)</li>' +
                '<li>иначе заполни поля <code>nickname</code>, <code>role</code>, <code>schedule</code> значениями из <code>data.profile</code>, ' +
                'запомни <code>level = data.profile.level</code> и вызови <code>showLevel()</code></li>' +
                '<li>в аватар напиши первую букву ника большой: <code>data.profile.nickname[0].toUpperCase()</code></li></ul>' +
                '<p>Вызови <code>showProfile()</code> сразу при загрузке и ещё раз после сохранения анкеты.</p>',
            hint: ['function showProfile() { }', 'data.profile === null', 'profileForm.elements.role.value = ...', '[0]', '.toUpperCase()', 'textContent', 'showProfile()'],
            before: function () {
                localStorage.setItem('teamplay', JSON.stringify({
                    profile: { nickname: 'neonFox', role: 'Саппорт', level: 'Любитель', schedule: 'Выходные' },
                    game: 'Valorant', requests: [], replies: [], reviews: [],
                }));
            },
            after: T.resetData,
            start: {
                html: formHtml,
                css: formCss + '\n' + headCss + '\n' + textCss + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: T.js.data + '\n' + formConsts + showLevelJs + '\n' + levelsJs + '\n// функция showProfile() и её вызов\n\n\n' +
                    "profileForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    '    const nickname = profileForm.elements.nickname.value.trim();\n    const role = profileForm.elements.role.value.trim();\n' +
                    "    const schedule = profileForm.elements.schedule.value.trim();\n    formSuccess.classList.add('hide');\n\n" +
                    "    if (nickname === '' || role === '') {\n        formError.classList.remove('hide');\n        return;\n    }\n\n" +
                    "    formError.classList.add('hide');\n    data.profile = { nickname: nickname, role: role, level: level, schedule: schedule };\n" +
                    "    saveData(data);\n    // покажи анкету заново\n\n    formSuccess.classList.remove('hide');\n});\n",
            },
            answer: {
                js: T.js.data + '\n' + formConsts + showLevelJs + '\n' + levelsJs + '\n' +
                    'function showProfile() {\n    if (data.game) {\n        myGame.textContent = data.game;\n    }\n    if (data.profile === null) {\n        return;\n    }\n' +
                    '    profileForm.elements.nickname.value = data.profile.nickname;\n    profileForm.elements.role.value = data.profile.role;\n' +
                    '    profileForm.elements.schedule.value = data.profile.schedule;\n    level = data.profile.level;\n    showLevel();\n' +
                    '    avatar.textContent = data.profile.nickname[0].toUpperCase();\n}\n\nshowProfile();\n\n' +
                    "profileForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    '    const nickname = profileForm.elements.nickname.value.trim();\n    const role = profileForm.elements.role.value.trim();\n' +
                    "    const schedule = profileForm.elements.schedule.value.trim();\n    formSuccess.classList.add('hide');\n\n" +
                    "    if (nickname === '' || role === '') {\n        formError.classList.remove('hide');\n        return;\n    }\n\n" +
                    "    formError.classList.add('hide');\n    data.profile = { nickname: nickname, role: role, level: level, schedule: schedule };\n" +
                    "    saveData(data);\n    showProfile();\n    formSuccess.classList.remove('hide');\n});",
            },
            checks: [
                ['Поля заполнены из сохранённой анкеты', function (t) {
                    const f = t.q('.profile-form');
                    return f.elements.nickname.value === 'neonFox' && f.elements.role.value === 'Саппорт' && f.elements.schedule.value === 'Выходные';
                }],
                ['Активен сохранённый уровень «Любитель»', function (t) {
                    return t.has('[data-level="Любитель"]', 'active') && t.all('.level.active').length === 1;
                }],
                ['В аватаре большая буква N', function (t) { return t.text('.avatar') === 'N'; }],
                ['Показана выбранная дисциплина Valorant', function (t) { return t.text('.my-game') === 'Valorant'; }],
                ['После сохранения нового ника аватар обновился', function (t) {
                    fill(t, 'kira', 'Капитан');
                    t.submit('.profile-form');
                    return t.text('.avatar') === 'K' && T.saved().profile.nickname === 'kira';
                }],
            ],
        },
    ];
})();
