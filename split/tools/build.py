"""Режет готовые страницы из папки split-site на блоки (по одному на задачу)
и сохраняет их в data/code.js. Запуск из папки KudaShodit-Quest:

    python tools/build.py ../split-site

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
    # ---------------- Главная (Божена Белан) ----------------
    "home": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<section class="balance">': 4,
            '<div class="layout">': 6,
            '<section class="card">': 8,
            '<footer class="footer">': 9,
            '<script src="home.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {": 3, ".card {#1": 7, ".feed {": 8, ".demo-note {": 3,
            ".balance {#1": 5, ".layout {#1": 7, ".footer {": 9, "@media (max-width: 1024px) {": 9,
        }),
        "js": (10, {
            "const demoData = {": 12,
            "const splitForm = document.querySelector('.split-form');": 11,
        }),
    },
    # ---------------- Группы (Дарья Боюрнова) ----------------
    "groups": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<div class="groups">': 4,
            '<footer class="footer">': 9,
            '<dialog class="modal group-modal">': 7,
            '<dialog class="modal group-form-modal">': 8,
            '<script src="groups.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {": 3, ".feed {": 7, ".groups {": 5, ".group-pic {": 6,
            ".group-info {": 5, ".group-balance {#1": 6, ".modal {": 7, ".modal-field {": 8,
            ".footer {": 9, "@media (max-width: 1024px) {": 9,
        }),
        "js": (10, {
            "document.querySelector('.open-group-form').addEventListener('click', function () {": 11,
            "document.querySelector('.open-expense-form').addEventListener('click', function () {": 12,
        }),
    },
    # ---------------- Сборы (Валерия Шипунова) ----------------
    "collections": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<div class="collections">': 4,
            '<footer class="footer">': 9,
            '<dialog class="modal collection-form-modal">': 7,
            '<dialog class="modal contribution-modal">': 8,
            '<script src="collections.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {": 3, ".card {#1": 5, ".section-head {#1": 3, ".collections {#1": 5,
            ".collection-progress {": 6, ".modal {": 7, ".modal-field {": 8, ".footer {": 9,
            "@media (max-width: 1024px) {": 9,
        }),
        "js": (10, {
            "document.querySelector('.open-collection-form').addEventListener('click', function () {": 11,
            "collectionsList.addEventListener('click', function (event) {": 12,
        }),
    },
    # ---------------- Расчёты (Алёна Фендель) ----------------
    "settlements": {
        "html": (1, {
            '<header class="header">': 2,
            '<main class="container main">': 3,
            '<div class="settlements"></div>': 4,
            '<footer class="footer">': 9,
            '<dialog class="modal payment-modal">': 7,
            '<dialog class="modal reminder-modal">': 8,
            '<script src="settlements.js"></script>': 1,
        }),
        "css": (1, {
            ".header {": 2, ".main {": 3, ".card {#1": 5, ".section-head {#1": 3, ".settlements {#1": 5,
            ".empty-text {": 3, ".debt-sum {": 6, ".modal textarea {": 8, ".modal {": 7,
            ".modal-field {": 8, ".footer {": 9, "@media (max-width: 1024px) {": 9,
        }),
        "js": (10, {
            "paymentForm.addEventListener('submit', function (event) {": 11,
            "document.querySelector('.open-reminder').addEventListener('click', function () {": 12,
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
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "../split-site")
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
