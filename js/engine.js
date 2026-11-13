// =========================================================
// Движок: готовый код страниц, сборка превью и проверка задач
// Используется в квесте (app.js) и в самопроверке (test.html)
// =========================================================

window.Quest = (function () {
    const FONTS =
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap">\n' +
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">';

    // Скрипт-охранник внутри превью: ловит ошибки JS,
    // не даёт ссылкам и формам уводить превью на другую страницу
    const GUARD = `<script>
window.__errors = [];
window.addEventListener('error', function (e) { window.__errors.push(e.message); });
window.addEventListener('unhandledrejection', function (e) { e.preventDefault(); });
document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    var href = a ? a.getAttribute('href') : null;
    if (href && href.charAt(0) !== '#') e.preventDefault();
});
document.addEventListener('submit', function (e) {
    window.__studentPrevented = e.defaultPrevented;
    e.preventDefault();
});
<\/script>`;

    // ---------- Хеш пароля учителя ----------
    function hash(text) {
        let h = 5381;
        for (const ch of text) h = ((h * 33) ^ ch.charCodeAt(0)) >>> 0;
        return h;
    }

    // ---------- Готовый код страниц ----------
    function decode(b64) {
        const bytes = Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); });
        return new TextDecoder().decode(bytes);
    }

    // [{part, text}] для файла страницы (kind: html / css / js)
    function segments(page, kind) {
        return window.QUEST_CODE[page][kind].map(function (s) {
            return { part: s[0], text: decode(s[1]) };
        });
    }

    // код файла, где открыты только задачи с номером <= solved
    function openCode(page, kind, solved) {
        return segments(page, kind)
            .filter(function (s) { return s.part <= solved; })
            .map(function (s) { return s.text; })
            .join('');
    }

    function fullCode(page, kind) {
        return openCode(page, kind, 999);
    }

    // базовые стили страницы (блок задачи 1) — подкладываются в превью задач
    function baseCss(page) {
        return segments(page, 'css')
            .filter(function (s) { return s.part === 1; })
            .map(function (s) { return s.text; })
            .join('');
    }

    // ---------- Документ для превью задачи ----------
    function taskDoc(page, taskIndex, code) {
        const base = taskIndex === 0 ? '' : baseCss(page);
        return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
            FONTS + '\n<style>\n' + base + '\n</style>\n<style>\n' + (code.css || '') + '\n</style>\n' +
            '</head>\n<body>\n<div class="app">\n' + (code.html || '') + '\n</div>\n' +
            GUARD + '\n<script>\n' + (code.js || '') + '\n<\/script>\n</body>\n</html>';
    }

    // ---------- Документ «Мой сайт»: открытые блоки готовой страницы ----------
    function siteDoc(page, solved, total) {
        let html = openCode(page, 'html', solved);
        const css = openCode(page, 'css', solved);
        // JS подключаем, только когда открыты все задачи (иначе он ищет ещё закрытые блоки)
        const js = solved >= total ? fullCode(page, 'js') : '';
        html = html.replace('</head>', '<style>\n' + css + '\n</style>\n</head>');
        html = html.replace(/<script src="[^"]*"><\/script>/, '');
        html = html.replace('</body>', GUARD + '\n<script>\n' + js + '\n<\/script>\n</body>');
        return html;
    }

    // ---------- Рендер в iframe ----------
    function render(iframe, html) {
        return new Promise(function (resolve) {
            iframe.onload = function () {
                iframe.onload = null;
                resolve();
            };
            iframe.srcdoc = html;
        });
    }

    // ---------- Помощник для проверок ----------
    function toHex(value) {
        const m = String(value).match(/rgba?\(([^)]+)\)/);
        if (!m) return String(value).toLowerCase();
        const nums = m[1].split(',').map(function (n) { return parseFloat(n); });
        if (nums.length === 4 && nums[3] === 0) return 'transparent';
        return '#' + nums.slice(0, 3).map(function (n) {
            return Math.round(n).toString(16).padStart(2, '0');
        }).join('');
    }

    function helper(win) {
        const doc = win.document;
        function el(sel) {
            return typeof sel === 'string' ? doc.querySelector(sel) : sel;
        }
        function need(sel) {
            const e = el(sel);
            if (!e) throw new Error('не найден элемент ' + sel);
            return e;
        }
        return {
            win: win,
            doc: doc,
            q: el,
            all: function (sel) { return Array.from(doc.querySelectorAll(sel)); },
            css: function (sel, prop) {
                const e = el(sel);
                return e ? win.getComputedStyle(e).getPropertyValue(prop).trim() : '';
            },
            px: function (sel, prop) { return parseFloat(this.css(sel, prop)) || 0; },
            color: function (sel, prop) { return toHex(this.css(sel, prop || 'color')); },
            text: function (sel) {
                const e = el(sel);
                return e ? e.textContent.replace(/\s+/g, ' ').trim() : '';
            },
            attr: function (sel, name) {
                const e = el(sel);
                return e ? e.getAttribute(name) : null;
            },
            has: function (sel, cls) {
                const e = el(sel);
                return !!e && e.classList.contains(cls);
            },
            // виден ли элемент (он и все родители без display: none)
            visible: function (sel) {
                let e = el(sel);
                if (!e) return false;
                while (e && e.nodeType === 1) {
                    if (win.getComputedStyle(e).display === 'none') return false;
                    e = e.parentElement;
                }
                return true;
            },
            // значение свойства прямо из CSS-правила (например, margin: 0 auto -> auto)
            rule: function (selector, prop) {
                let value = '';
                Array.from(doc.styleSheets).forEach(function (sheet) {
                    let rules;
                    try { rules = sheet.cssRules; } catch (e) { return; }
                    Array.from(rules).forEach(function (r) {
                        if (r.selectorText && r.selectorText.replace(/\s+/g, ' ') === selector) {
                            const v = r.style.getPropertyValue(prop);
                            if (v) value = v.trim();
                        }
                    });
                });
                return value;
            },
            click: function (sel) { need(sel).click(); },
            type: function (sel, value) {
                const e = need(sel);
                e.value = value;
                e.dispatchEvent(new win.Event('input', { bubbles: true }));
            },
            // отправляет форму; вернёт true, если код ученика вызвал preventDefault()
            submit: function (sel) {
                const form = need(sel);
                win.__studentPrevented = false;
                form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
                return win.__studentPrevented === true;
            },
            errors: function () { return win.__errors || []; },
        };
    }

    // ---------- Проверка задачи ----------
    // рендерит код, запускает проверки по очереди, возвращает результаты
    async function check(iframe, page, taskIndex, task, code) {
        if (task.before) task.before();
        await render(iframe, taskDoc(page, taskIndex, code));
        const win = iframe.contentWindow;
        const t = helper(win);
        const results = task.checks.map(function (c) {
            try {
                return { label: c[0], ok: !!c[1](t) };
            } catch (e) {
                return { label: c[0], ok: false, note: e.message };
            }
        });
        const errors = t.errors().slice();
        if (task.after) task.after();
        return {
            results: results,
            errors: errors,
            ok: results.every(function (r) { return r.ok; }) && errors.length === 0,
        };
    }

    return {
        hash: hash,
        segments: segments,
        fullCode: fullCode,
        taskDoc: taskDoc,
        siteDoc: siteDoc,
        render: render,
        check: check,
    };
})();
