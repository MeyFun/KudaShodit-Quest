"""Режет готовые страницы из папки watch-site на блоки (по одному на задачу)
и сохраняет их в data/code.js. Запуск из папки KudaShodit-Quest:

    python tools/build.py ../watch-site

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
    # ---------------- Главная (Анастасия Застебина) ----------------
    "home": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<section class="mascot">': 6,
            '<section class="reviews">': 8,
            '<footer class="footer">': 9,
            '<script src="home.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".chip {": 5, ".section-head {#1": 8, ".hero {#1": 4,
            ".round-button {": 5, ".mascot {#1": 7, ".reviews-grid {#1": 8, ".footer {": 9,
            "@media (max-width: 1024px) {": 9,
        }),
        "js": (10, {
            "const films = [": 12,
            "const demoData = {": 10,
            "const moods = document.querySelectorAll('.mood');": 11,
            "document.querySelector('.recommend-button').addEventListener('click', function () {": 12,
        }),
    },
    # ---------------- Подборки (Полина Федорченко) ----------------
    "catalog": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<div class="cards">': 4,
            '<section>#2': 7,
            '<footer class="footer">': 9,
            '<script src="catalog.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".chip {": 8, ".section-head {#1": 3, ".search {#1": 3,
            ".cards {#1": 5, ".card-poster {": 6, ".card-body {": 5, ".franchises {#1": 8, ".footer {": 9,
            "@media (max-width: 1024px) {": 9,
        }),
        "js": (10, {
            "const searchForm = document.querySelector('.search');": 11,
            "const collections = {": 12,
        }),
    },
    # ---------------- Комнаты (Нина Терехова) ----------------
    "rooms": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<div class="tabs">': 4,
            '<div class="room-list">': 5,
            '<footer class="footer">': 9,
            '<dialog class="modal room-modal">': 7,
            '<label class="modal-field">Название комнаты <input name="title" placeholder="Киновечер у Ани"></label>': 8,
            '<p class="small">Комната сохранится в этом браузере.</p>': 7,
            '<script src="rooms.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".tabs {": 4, ".room-list {": 6, ".modal {": 7,
            ".modal-field {": 8, ".footer {": 9, "@media (max-width: 768px) {": 9,
        }),
        "js": (10, {
            "roomList.addEventListener('click', function (event) {": 11,
            "document.querySelector('.open-room-form').addEventListener('click', function () {": 12,
        }),
    },
    # ---------------- Профиль (Мария Шашкова) ----------------
    "profile": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<section>#1': 5,
            '<footer class="footer">': 9,
            '<dialog class="modal review-modal">': 7,
            '<label class="modal-field">Фильм <input name="film" placeholder="Дюна: Часть вторая"></label>': 8,
            '<p class="error hide">Напиши название фильма и текст рецензии.</p>': 7,
            '<script src="profile.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".section-head {#1": 5, ".link {": 6, ".profile-card {": 4,
            ".empty-text {": 5, ".saved-list {": 6, ".modal {": 7, ".modal-field {": 8, ".footer {": 9,
            "@media (max-width: 768px) {": 9,
        }),
        "js": (10, {
            "const films = [": 11,
            "const demoData = {": 10,
            "const savedList = document.querySelector('.saved-list');": 11,
            "const reviewsGrid = document.querySelector('.reviews-grid');": 12,
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
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "../watch-site")
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
