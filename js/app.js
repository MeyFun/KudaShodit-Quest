// =========================================================
// Квест: вход по фамилии, задачи, проверка, «Мой сайт», учитель
// =========================================================

(function () {
    const config = window.QUEST_CONFIG;
    const $ = function (sel) { return document.querySelector(sel); };

    // ---------- Состояние ----------
    let surname = '';     // имя и фамилия выбранного ученика
    let page = '';        // login / index / register / profile
    let tasks = [];       // задачи страницы
    let progress = null;  // { solved: число решённых, code: { номер: {html, css, js} } }
    let current = 0;      // открытая сейчас задача
    let editors = {};     // редакторы html / css / js
    let activeKind = 'html';
    let previewTimer = null;

    // ---------- Хранение прогресса в браузере ----------
    function storageKey() {
        return 'kq-progress-' + surname.toLowerCase();
    }

    function loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey()));
            if (saved && typeof saved.solved === 'number') return saved;
        } catch (e) { /* испорченные данные — начинаем заново */ }
        return { solved: 0, code: {} };
    }

    function saveProgress() {
        localStorage.setItem(storageKey(), JSON.stringify(progress));
    }

    // ---------- Экран входа: кнопка на каждого ученика ----------
    config.students.forEach(function (student) {
        const saved = JSON.parse(localStorage.getItem('kq-progress-' + student.name.toLowerCase()) || 'null');
        const solved = saved ? saved.solved : 0;
        const total = window.QUEST_TASKS[student.page].length;

        const button = document.createElement('button');
        button.className = 'profile-btn';
        button.innerHTML = '<b></b><small></small>';
        button.querySelector('b').textContent = student.name;
        button.querySelector('small').textContent =
            'Страница «' + config.pages[student.page].title + '» · решено ' + solved + ' из ' + total;
        button.addEventListener('click', function () { start(student); });
        $('.profiles').appendChild(button);
    });

    function start(student) {
        surname = student.name;
        page = student.page;
        tasks = window.QUEST_TASKS[page];
        progress = loadProgress();

        $('.login-screen').classList.add('hidden');
        $('.quest-screen').classList.remove('hidden');
        $('.who').textContent = surname + ' · страница «' + config.pages[page].title + '»';

        createEditors();
        openTask(Math.min(progress.solved, tasks.length - 1));
    }

    $('.logout-btn').addEventListener('click', function () {
        location.reload();
    });

    // ---------- Редакторы кода ----------
    const KINDS = ['html', 'css', 'js'];
    const MODES = { html: 'htmlmixed', css: 'css', js: 'javascript' };

    function createEditors() {
        const box = $('.editors');
        box.innerHTML = '';
        editors = {};
        KINDS.forEach(function (kind) {
            const wrap = document.createElement('div');
            wrap.className = 'editor-box';
            wrap.dataset.kind = kind;
            box.appendChild(wrap);

            if (window.CodeMirror) {
                const cm = window.CodeMirror(wrap, {
                    mode: MODES[kind],
                    theme: 'material-darker',
                    lineNumbers: true,
                    indentUnit: 4,
                    tabSize: 4,
                    autoCloseBrackets: true,
                    // в HTML после <p> сразу дописывается </p>
                    // (для <br>, <img>, <input> и других одиночных тегов — нет)
                    autoCloseTags: kind === 'html' ? {
                        whenOpening: true,
                        whenClosing: true,
                        // на отдельные строки раскрываются только блоки-контейнеры,
                        // а <p>, <h1>, <b>, <a> закрываются в той же строке
                        indentTags: ['div', 'section', 'header', 'nav', 'main', 'footer', 'form', 'ul', 'article', 'dialog'],
                    } : false,
                    lineWrapping: true,
                });
                cm.on('change', onCodeChange);
                editors[kind] = {
                    get: function () { return cm.getValue(); },
                    set: function (v) { cm.setValue(v); },
                    refresh: function () { cm.refresh(); },
                };
            } else {
                // запасной вариант без интернета: обычное поле
                const area = document.createElement('textarea');
                area.spellcheck = false;
                area.addEventListener('input', onCodeChange);
                wrap.appendChild(area);
                editors[kind] = {
                    get: function () { return area.value; },
                    set: function (v) { area.value = v; },
                    refresh: function () {},
                };
            }
        });
    }

    function taskKinds(task) {
        return KINDS.filter(function (k) { return task.start[k] !== undefined; });
    }

    function showTab(kind) {
        activeKind = kind;
        document.querySelectorAll('.editor-tabs .tab').forEach(function (tab) {
            tab.classList.toggle('active', tab.dataset.kind === kind);
        });
        document.querySelectorAll('.editor-box').forEach(function (box) {
            box.classList.toggle('active', box.dataset.kind === kind);
        });
        editors[kind].refresh();
    }

    function currentCode() {
        const code = {};
        taskKinds(tasks[current]).forEach(function (k) { code[k] = editors[k].get(); });
        return code;
    }

    let silent = false; // не сохраняем, пока сами подставляем код

    function onCodeChange() {
        if (silent) return;
        progress.code[current] = currentCode();
        saveProgress();
        clearTimeout(previewTimer);
        previewTimer = setTimeout(updatePreview, 500);
    }

    function updatePreview() {
        Quest.render($('.preview'), Quest.taskDoc(page, current, currentCode()));
    }

    // ---------- Список задач ----------
    function renderTaskList() {
        const list = $('.task-list');
        list.innerHTML = '';
        tasks.forEach(function (task, i) {
            const item = document.createElement('button');
            item.className = 'task-item';
            const done = i < progress.solved;
            const locked = i > progress.solved;
            if (done) item.classList.add('done');
            if (locked) item.classList.add('locked');
            if (i === current) item.classList.add('current');

            const mark = done ? '✓' : (locked ? '🔒' : '▶');
            item.innerHTML = '<span class="mark">' + mark + '</span>' +
                '<span>' + (i + 1) + '. ' + task.title + '</span>' +
                '<span class="kind">' + task.kind + '</span>';

            item.addEventListener('click', function () {
                if (!locked) openTask(i);
            });
            list.appendChild(item);
        });

        const percent = Math.round(progress.solved / tasks.length * 100);
        $('.progress-bar').style.width = percent + '%';
        $('.progress-text').textContent = progress.solved + ' / ' + tasks.length;
    }

    // ---------- Открыть задачу ----------
    function openTask(i) {
        current = i;
        const task = tasks[i];

        $('.task-number').textContent = 'Задача ' + (i + 1) + ' из ' + tasks.length + ' · ' + task.kind;
        $('.task-title').textContent = task.title;
        $('.task-text').innerHTML = task.text;

        // подсказка: нужные команды
        const hints = $('.hints');
        hints.innerHTML = '<span class="label">Понадобится:</span>';
        task.hint.forEach(function (h) {
            const code = document.createElement('code');
            code.textContent = h;
            hints.appendChild(code);
        });

        // вкладки редактора только для нужных языков
        const kinds = taskKinds(task);
        const tabs = $('.editor-tabs');
        tabs.innerHTML = '';
        kinds.forEach(function (kind) {
            const tab = document.createElement('button');
            tab.className = 'tab';
            tab.dataset.kind = kind;
            tab.textContent = kind.toUpperCase();
            tab.addEventListener('click', function () { showTab(kind); });
            tabs.appendChild(tab);
        });

        // код: сохранённый учеником или стартовый
        const saved = progress.code[i] || {};
        silent = true;
        KINDS.forEach(function (k) {
            editors[k].set(saved[k] !== undefined ? saved[k] : (task.start[k] || ''));
        });
        silent = false;
        showTab(task.focus || kinds[kinds.length - 1]);

        $('.checks').innerHTML = '';
        $('.success').classList.add('hidden');
        renderTaskList();
        updatePreview();
    }

    $('.reset-code').addEventListener('click', function () {
        if (!confirm('Вернуть стартовый код задачи? Твой код в этой задаче сотрётся.')) return;
        delete progress.code[current];
        saveProgress();
        openTask(current);
    });

    // ---------- Проверка ----------
    $('.check-btn').addEventListener('click', async function () {
        const task = tasks[current];
        const result = await Quest.check($('.preview'), page, current, task, currentCode());
        showResult(result);
        if (result.ok) solve();
    });

    function showResult(result) {
        const box = $('.checks');
        box.innerHTML = '';
        result.results.forEach(function (r) {
            const row = document.createElement('div');
            row.className = 'check-row ' + (r.ok ? 'ok' : 'bad');
            row.innerHTML = '<span>' + (r.ok ? '✓' : '✗') + '</span><span></span>';
            row.lastChild.textContent = r.label;
            box.appendChild(row);
        });
        result.errors.forEach(function (message) {
            const row = document.createElement('div');
            row.className = 'check-row bad';
            row.innerHTML = '<span>⚠</span><span>Ошибка в JS: <small></small></span>';
            row.querySelector('small').textContent = message;
            box.appendChild(row);
        });
    }

    function solve() {
        if (current + 1 > progress.solved) {
            progress.solved = current + 1;
            saveProgress();
        }
        $('.success').classList.remove('hidden');
        $('.next-task').classList.toggle('hidden', current + 1 >= tasks.length);
        renderTaskList();
    }

    $('.next-task').addEventListener('click', function () {
        openTask(current + 1);
    });

    $('.see-code').addEventListener('click', function () {
        openSite(guessKind(tasks[current]));
    });

    // какой файл показать после решения: где у задачи есть код
    function guessKind(task) {
        const own = ['html', 'css', 'js'].filter(function (kind) {
            return Quest.segments(page, kind).some(function (s) { return s.part === current + 1; });
        });
        return own.indexOf(task.kind.toLowerCase().split(' ')[0]) >= 0 ? task.kind.toLowerCase().split(' ')[0] : own[0];
    }

    // ---------- «Мой сайт» ----------
    const siteDialog = $('.site-dialog');
    let siteView = 'preview';

    $('.site-btn').addEventListener('click', function () { openSite('preview'); });
    $('.close-site').addEventListener('click', function () { siteDialog.close(); });

    document.querySelectorAll('.site-tabs .tab').forEach(function (tab) {
        tab.addEventListener('click', function () { showSiteView(tab.dataset.view); });
    });

    function openSite(view) {
        const all = progress.solved >= tasks.length;
        $('.download-btn').disabled = !all;
        $('.site-note').textContent = all
            ? 'Все задачи решены — страница открыта целиком. Скачай её и перенеси в свой репозиторий KudaShodit.'
            : 'Открыто задач: ' + progress.solved + ' из ' + tasks.length +
              '. Замазанный код откроется, когда решишь следующие задачи. JS заработает в превью после последней задачи.';
        siteDialog.showModal();
        showSiteView(view);
    }

    function showSiteView(view) {
        siteView = view;
        document.querySelectorAll('.site-tabs .tab').forEach(function (tab) {
            tab.classList.toggle('active', tab.dataset.view === view);
        });
        const preview = $('.site-preview');
        const codeView = $('.code-view');
        if (view === 'preview') {
            codeView.classList.add('hidden');
            preview.classList.remove('hidden');
            Quest.render(preview, Quest.siteDoc(page, progress.solved, tasks.length));
        } else {
            preview.classList.add('hidden');
            codeView.classList.remove('hidden');
            renderCode(codeView, view);
        }
    }

    // закрытые куски кода заменяем случайными буквами и размываем
    function scramble(text) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        return text.replace(/\S/g, function () {
            return letters.charAt(Math.floor(Math.random() * letters.length));
        });
    }

    function renderCode(box, kind) {
        box.innerHTML = '';
        let firstFresh = null;
        Quest.segments(page, kind).forEach(function (s) {
            const span = document.createElement('span');
            if (s.part <= progress.solved) {
                span.className = s.part === progress.solved ? 'seg-fresh' : 'seg-open';
                span.textContent = s.text;
                if (s.part === progress.solved && !firstFresh) firstFresh = span;
            } else {
                span.className = 'seg-locked';
                span.textContent = scramble(s.text);
            }
            box.appendChild(span);
        });
        if (firstFresh) firstFresh.scrollIntoView({ block: 'center' });
    }

    // ---------- Скачивание страницы ----------
    $('.download-btn').addEventListener('click', async function () {
        const files = {};
        ['html', 'css', 'js'].forEach(function (kind) {
            files[page + '.' + kind] = Quest.fullCode(page, kind);
        });

        if (window.JSZip) {
            const zip = new window.JSZip();
            const folder = zip.folder(page);
            Object.keys(files).forEach(function (name) { folder.file(name, files[name]); });
            const blob = await zip.generateAsync({ type: 'blob' });
            downloadBlob(blob, page + '.zip');
        } else {
            // без интернета архиватор не загрузится — скачиваем три файла по отдельности
            Object.keys(files).forEach(function (name) {
                downloadBlob(new Blob([files[name]], { type: 'text/plain' }), name);
            });
        }
    });

    function downloadBlob(blob, name) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
        setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    }

    // ---------- Режим учителя ----------
    const teacherDialog = $('.teacher-dialog');
    const teacherForm = $('.teacher-form');

    if (sessionStorage.getItem('kq-teacher') === '1') {
        document.body.classList.add('teacher');
    }

    // Ctrl + Shift + U открывает окно пароля
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyU') {
            event.preventDefault();
            teacherForm.reset();
            teacherForm.querySelector('.error').classList.add('hidden');
            teacherDialog.showModal();
        }
    });

    teacherForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (Quest.hash(teacherForm.elements.password.value) === config.teacherHash) {
            sessionStorage.setItem('kq-teacher', '1');
            document.body.classList.add('teacher');
            teacherDialog.close();
        } else {
            teacherForm.querySelector('.error').classList.remove('hidden');
        }
    });

    document.querySelectorAll('.close-dialog').forEach(function (button) {
        button.addEventListener('click', function () { button.closest('dialog').close(); });
    });

    $('.teacher-exit').addEventListener('click', function () {
        sessionStorage.removeItem('kq-teacher');
        document.body.classList.remove('teacher');
    });

    $('.show-answer').addEventListener('click', function () {
        const task = tasks[current];
        const box = $('.answer-code');
        box.innerHTML = '';
        taskKinds(task).forEach(function (kind) {
            const title = document.createElement('b');
            title.textContent = kind.toUpperCase();
            const pre = document.createElement('pre');
            pre.textContent = task.answer[kind] || '';
            box.appendChild(title);
            box.appendChild(pre);
        });
        $('.answer-dialog').showModal();
    });

    $('.accept-task').addEventListener('click', function () {
        if (!page) return;
        if (!confirm('Засчитать задачу ' + (current + 1) + ' для ' + surname + '?')) return;
        solve();
    });

    $('.reset-progress').addEventListener('click', function () {
        if (!page) return;
        if (!confirm('Стереть весь прогресс ученика ' + surname + '? Это нельзя отменить.')) return;
        progress = { solved: 0, code: {} };
        saveProgress();
        openTask(0);
    });
})();
