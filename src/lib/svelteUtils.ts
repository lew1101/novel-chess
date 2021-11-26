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
