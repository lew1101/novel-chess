export function getOffsetRect(el: HTMLElement) {
    let rect = el.getBoundingClientRect();

    let scrollX = window.scrollX || window.pageXOffset;
    let scrollY = window.scrollY || window.pageYOffset;

    let left = rect.left + scrollX;
    let top = rect.top + scrollY;

    return {
        left,
        top,
        right: rect.right + scrollX,
        bottom: rect.bottom + scrollY,
        x: rect.x === undefined ? left : rect.x + scrollX,
        y: rect.y === undefined ? top : rect.y + scrollY,
        width: rect.width,
        height: rect.height,
    };
}

export function elementsOffsetRectIntersects(e1: HTMLElement, e2: HTMLElement) {
    const rect1 = getOffsetRect(e1);
    const rect2 = getOffsetRect(e2);

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top > rect2.bottom &&
        rect1.bottom < rect2.top
    );
}
