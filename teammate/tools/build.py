"""Режет готовые страницы из папки teammate-site на блоки (по одному на задачу)
и сохраняет их в data/code.js. Запуск из папки teammate-quest:

    python tools/build.py ../teammate-site

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
    # ---------------- Анкета (Алёна Юрченко) ----------------
    "profile": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<form class="card profile-form">': 4,
            '<section class="steps">': 8,
            '<footer class="footer">': 9,
            '<script src="profile.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".button {": 7, ".card {": 6, ".field {": 5, ".hero {#1": 7, ".eyebrow {": 3,
            ".profile-form {": 5, ".form-head {": 6, ".steps {#1": 8, ".footer {": 9, "@media (max-width: 1000px) {": 9,
        }),
        "js": (10, {
            "function showProfile() {": 12,
            "profileForm.addEventListener('submit', function (event) {": 11,
        }),
    },
    # ---------------- Дисциплины (Мадина Жумадилова) ----------------
    "catalog": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<section class="toolbar">': 4,
            '<div class="catalog-grid">': 6,
            '<footer class="footer">': 9,
            '<script src="catalog.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".button {": 8, ".card {": 7, ".chip {": 5, ".tag {": 8, ".toolbar {": 5,
            ".catalog-grid {#1": 7, ".game-body {": 8, ".footer {": 9, "@media (max-width: 1000px) {": 9,
        }),
        "js": (10, {
            "searchForm.elements.query.addEventListener('input', showGames);": 11,
            "function showChosen() {": 12,
        }),
    },
    # ---------------- Заявки (Надежда Окольникова) ----------------
    "requests": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<aside class="card sidebar">': 4,
            '<div class="request-list"></div>': 6,
            '<footer class="footer">': 9,
            '<dialog class="modal request-modal">': 7,
            '<label class="field">Дисциплина <input name="game" placeholder="Dota 2"></label>': 8,
            '<p class="error hide">Заполни название, дисциплину, роль и описание.</p>': 7,
            '<script src="requests.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".button {": 6, ".card {": 5, ".tag {": 6, ".field {": 5, ".page-head {#1": 3,
            ".empty {": 6, ".board {#1": 3, ".sidebar {": 5, ".request-list {": 6, ".modal {": 7, ".modal-buttons {": 8,
            ".footer {": 9, "@media (max-width: 768px) {": 9,
        }),
        "js": (10, {
            "document.querySelectorAll('.close-modal').forEach(function (button) {": 12,
            "const data = loadData();": 10,
            "function createRequest(request) {": 11,
            "function showRequests() {": 10,
            "tabs.forEach(function (tab) {": 11,
            "requestSearch.addEventListener('input', showRequests);": 10,
            "const requestModal = document.querySelector('.request-modal');": 12,
        }),
    },
    # ---------------- Отзывы (Кристина Власова) ----------------
    "reviews": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<section class="stats">': 4,
            '<section class="reviews">': 6,
            '<footer class="footer">': 9,
            '<dialog class="modal review-modal">': 7,
            '<label class="field">Дисциплина <input name="game" placeholder="Counter-Strike 2"></label>': 8,
            '<p class="error hide">Введи ник, дисциплину, оценку от 1 до 5 и текст отзыва.</p>': 7,
            '<script src="reviews.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {#1": 3, ".card {": 5, ".chip {": 6, ".field {": 8, ".page-head {#1": 3, ".empty {": 6,
            ".stats {#1": 5, ".reviews {": 6, ".modal {": 7, ".modal-buttons {": 8, ".footer {": 9, "@media (max-width: 768px) {": 9,
        }),
        "js": (10, {
            "document.querySelectorAll('.close-modal').forEach(function (button) {": 12,
            "const data = loadData();": 10,
            "function showStats() {": 11,
            "const reviewModal = document.querySelector('.review-modal');": 12,
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
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "../teammate-site")
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
