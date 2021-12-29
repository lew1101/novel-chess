export default function dragging(
    el: HTMLElement,
    { useAction = false, payload = '', debug = false }
) {
    if (!useAction) return;

    el.style.cursor = 'grab';

    let temp: HTMLElement = null;

    function handleStart(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button !== 0) return; // make sure click is left click

        temp = <HTMLElement>el.cloneNode();
        el.style.visibility = 'hidden';

        temp.style.position = 'absolute';
        temp.style.zIndex = '1000';
        temp.style.cursor = 'grabbing';
        temp.style.left = e.pageX - temp.offsetWidth / 2 + 'px';
        temp.style.top = e.pageY - temp.offsetHeight / 2 + 'px';
        document.body.appendChild(temp);

        document.addEventListener('mousemove', handleMove, true);
        document.addEventListener('mouseup', handleEnd, true);

        el.dispatchEvent(
            new CustomEvent('move-start', {
                detail: {
                    payload,
                    mouseX: e.pageX,
                    mouseY: e.pageY,
                },
            })
        );

        if (debug) {
            console.log(`Initial mousePos: ${e.pageX}, ${e.pageY}`);
        }
    }

    function handleMove(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();

        temp.style.left = e.pageX - temp.offsetWidth / 2 + 'px';
        temp.style.top = e.pageY - temp.offsetHeight / 2 + 'px';
    }

    function handleEnd(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();

        temp.remove();
        temp = null;

        document.removeEventListener('mousemove', handleMove, true);
        document.removeEventListener('mouseup', handleEnd, true);

        el.dispatchEvent(
            new CustomEvent('move-end', {
                detail: {
                    payload,
                    mouseX: e.pageX,
                    mouseY: e.pageY,
                    accept() {
                        el.parentElement.removeChild(el);
                        return el;
                    },
                    reject() {
                        el.style.visibility = 'visible';
                    },
                },
            })
        );

        if (debug) {
            console.log(`Final mousePos: ${e.pageX}, ${e.pageY}`);
        }
    }

    el.addEventListener('mousedown', handleStart, true);

    return {
        node: el,
        destroy() {
            el.removeEventListener('mousedown', handleStart, true);
            document.removeEventListener('mousemove', handleMove, true);
            document.removeEventListener('mouseup', handleEnd, true);
        },
    };
}
