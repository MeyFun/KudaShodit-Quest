"""Режет готовые страницы из папки KudaShodit на блоки (по одному на задачу)
и сохраняет их в data/code.js. Запуск из папки KudaShodit-Quest:

    python tools/build.py ../KudaShodit

Якорь — строка файла (без отступов), с которой начинается блок задачи.
"#2" после якоря — второе вхождение строки, "#last" — последнее.
Комментарии прямо над якорем (если есть) уходят в тот же блок.
Всё, что стоит до первого якоря, относится к блоку DEFAULT.
"""
import base64
import json
import sys
from pathlib import Path

PAGES = {
    # ---------------- Вход (Ложников) ----------------
    "login": {
        "html": (1, {
            '<header class="header-back">': 2,
            '<div class="page-title">': 3,
            '<form class="card login-form" action="../profile/profile.html">': 4,
            '<div class="field">#2': 5,
            '<p class="error hide">Заполни телефон или email и пароль</p>': 11,
            '<button type="submit" class="btn btn-accent btn-big">Войти <div class="icon">arrow_forward</div></button>': 6,
            '<div class="divider"><div class="line"></div>или войдите через<div class="line"></div></div>': 7,
            '<div class="socials">': 8,
            '<p class="auth-switch">': 9,
            "</div>#last": 1,
        }),
        "css": (1, {
            ".logo-title {": 3, ".header-back {": 2, ".card {": 4, ".muted {": 3,
            ".btn {": 6, ".page-title {": 3, ".field {": 4, ".divider {": 7,
            ".socials {": 8, ".auth-switch {": 9, ".auth-text {": 3, ".agreement {": 9,
            ".hide {": 11, ".forgot-text {": 12, ".quick-input,": 10,
        }),
        "js": (10, {
            "document.querySelector('.quick-input').addEventListener('click', function () {": 12,
            "eyeButton.addEventListener('click', function () {": 10,
            "document.querySelector('.forgot-link').addEventListener('click', function (event) {": 12,
            "form.addEventListener('submit', function (event) {": 11,
            "document.querySelectorAll('.social-btn').forEach(function (button) {": 12,
        }),
    },
    # ---------------- Регистрация (Зяблов) ----------------
    "register": {
        "html": (1, {
            '<header class="header-back">': 2,
            '<section class="card">': 3,
            '<form class="register-form" action="../profile/profile.html">': 4,
            '<div class="field">#2': 5,
            '<div class="field">#4': 6,
            '<div class="field">#5': 7,
            '<label class="checkbox">': 8,
            '<p class="error hide"></p>': 12,
            '<button type="submit" class="btn btn-accent btn-big">Создать аккаунт <div class="icon">arrow_forward</div></button>': 9,
            '<div class="divider"><div class="line"></div>или зарегистрируйтесь через<div class="line"></div></div>': 10,
            "</div>#last": 1,
        }),
        "css": (1, {
            ".header-back {": 2, ".card {": 3, ".btn {": 9, ".promo-label {": 3,
            ".field {": 4, ".divider {": 10, ".checkbox {": 8, ".icon-medium {": 3,
            ".hide {": 12, ".eye-btn {": 11, ".strength {": 6, ".bar-weak {": 11,
        }),
        "js": (11, {
            "function showError(text) {": 12,
        }),
    },
    # ---------------- Афиша (Аракелян) ----------------
    "afisha": {
        "html": (1, {
            '<header class="header">': 2,
            '<input class="search-input hide" type="text" placeholder="Найти событие или место">': 10,
            '<div class="page-title">': 3,
            '<div class="filters">': 4,
            '<section class="card promo">': 5,
            '<h2 class="section-title">': 6,
            '<article class="card event" data-id="quiz" data-type="near quiz">': 7,
            '<p class="muted empty-text hide">Ничего не найдено. Попробуй другой фильтр.</p>': 9,
            '<section class="card">': 8,
            '<dialog class="modal guide-modal">': 12,
            '<div class="toast hide">Ссылка скопирована</div>': 11,
            '<script src="afisha.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".card {": 5, ".section-title {": 6, ".link {": 3,
            ".btn {": 4, ".btn-big {": 8, ".page-title {": 3, ".filters {": 4,
            ".promo-label {": 5, ".event {": 6, ".event-tags {": 7, ".event h3 {": 6,
            ".icon-small {": 2, ".icon-medium {": 5, ".suggest-title {": 8,
            ".search-input {": 10, ".guide-list {": 12, ".empty-text {": 9,
            ".toast {": 11, ".modal {": 12,
        }),
        "js": (9, {
            "document.querySelector('.search-btn').addEventListener('click', function () {": 10,
            "let going = JSON.parse(localStorage.getItem('going') || 'null');": 11,
            "const guideModal = document.querySelector('.guide-modal');": 12,
        }),
    },
    # ---------------- Профиль (Плешивых) ----------------
    "profile": {
        "html": (1, {
            '<header class="header">': 2,
            '<section class="card">#1': 3,
            '<div class="stats">': 4,
            '<h2 class="section-title">#1': 5,
            '<h2 class="section-title">#2': 6,
            '<h2 class="section-title">#3': 7,
            '<h2 class="section-title">#4': 8,
            '<h2 class="section-title">#5': 9,
            '<h2 class="section-title">#6': 10,
            '<dialog class="modal edit-modal">': 12,
            '<script src="profile.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".card {": 3, ".section-title {": 5, ".link {": 3,
            ".btn {": 4, ".btn-big {": 5, ".bottom-nav {": 10, ".profile-head {": 3,
            ".stats {": 4, ".ticket-image {": 5, ".pills {": 6, ".map {": 7,
            ".switch {#1": 9, ".logout {": 10, ".icon-small {": 2, ".orange {": 3,
            ".ticket-place {": 5, ".no-top {": 7, ".friends-text {": 8,
            ".logout .icon {": 10, ".hide {": 12, ".plain {": 3, ".modal-label {": 12,
            ".switch {#2": 11, ".sync-btn,": 12,
        }),
        "js": (12, {
            "const friendGoButton = document.querySelector('.go-btn');": 11,
            "document.querySelector('.support-link').addEventListener('click', function (event) {": 12,
        }),
    },
}

TASKS_PER_PAGE = 12


def is_comment(line, kind):
    s = line.strip()
    if kind == "html":
        return s.startswith("<!--") and s.endswith("-->")
    if kind == "css":
        return s.endswith("*/")
    return s.startswith("//")


def find_line(lines, anchor):
    """Номер строки, где начинается якорь."""
    text, nth = anchor, ""
    if "#" in anchor:
        head, tail = anchor.rsplit("#", 1)
        if tail == "last" or tail.isdigit():
            text, nth = head, tail
    found = [i for i, line in enumerate(lines) if line.strip() == text]
    if not found:
        raise SystemExit(f"Якорь не найден: {anchor}")
    if nth == "last":
        return found[-1]
    if nth:
        return found[int(nth) - 1]
    if len(found) > 1:
        raise SystemExit(f"Якорь встречается {len(found)} раз, уточни #n: {anchor}")
    return found[0]


def start_with_comments(lines, idx, kind):
    """Поднимаемся вверх, пока над строкой комментарии (в т.ч. многострочные)."""
    while idx > 0:
        prev = lines[idx - 1]
        if kind == "css" and prev.strip().endswith("*/"):
            j = idx - 1
            while j >= 0 and "/*" not in lines[j]:
                j -= 1
            idx = j
        elif kind != "css" and is_comment(prev, kind):
            idx -= 1
        else:
            break
    return idx


def split_file(text, default_part, anchors, kind):
    lines = text.splitlines(keepends=True)
    starts = []
    for anchor, part in anchors.items():
        idx = start_with_comments(lines, find_line(lines, anchor), kind)
        starts.append((idx, part))
    starts.sort()
    segments = []
    prev_idx, prev_part = 0, default_part
    for idx, part in starts:
        if idx > prev_idx:
            segments.append([prev_part, "".join(lines[prev_idx:idx])])
        prev_idx, prev_part = idx, part
    segments.append([prev_part, "".join(lines[prev_idx:])])
    assert "".join(s[1] for s in segments) == text, "файл собрался не так"
    return segments


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "../KudaShodit")
    out = {}
    for page, kinds in PAGES.items():
        out[page] = {}
        used_parts = set()
        for kind, (default_part, anchors) in kinds.items():
            text = (src / page / f"{page}.{kind}").read_text(encoding="utf-8")
            segments = split_file(text, default_part, anchors, kind)
            used_parts |= {p for p, _ in segments}
            out[page][kind] = [
                [p, base64.b64encode(s.encode("utf-8")).decode("ascii")] for p, s in segments
            ]
        missing = set(range(1, TASKS_PER_PAGE + 1)) - used_parts
        print(f"{page}: блоков {sum(len(v) for v in out[page].values())}, "
              f"задачи без кода: {sorted(missing) or 'нет'}")

    target = Path(__file__).resolve().parent.parent / "data" / "code.js"
    target.parent.mkdir(exist_ok=True)
    target.write_text(
        "// Сгенерировано tools/build.py — не править руками.\n"
        "// Готовый код страниц, разрезанный на блоки: [номер задачи, base64].\n"
        "window.QUEST_CODE = " + json.dumps(out, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    print("Записано:", target)


if __name__ == "__main__":
    main()
