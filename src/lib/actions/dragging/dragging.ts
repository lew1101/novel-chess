import { getOffsetRect } from '@lib/utils/bounding';

export function mouseDragging(el: HTMLElement, { useAction = false, payload = '', debug = false }) {
    if (!useAction) return;

    let pageX;
    let pageY;

    let temp: HTMLElement = null;

    function handleStart(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.type === 'touchstart') {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        } else {
            if (e.button !== 0) return; // make sure click is left click
            pageX = e.pageX;
            pageY = e.pageY;
        }

        const rect = el.getBoundingClientRect();

        temp = <HTMLElement>el.cloneNode();
        el.style.visibility = 'hidden';

        temp.style.width = rect.width + 'px';
        temp.style.height = rect.height + 'px';
        temp.style.position = 'absolute';
        temp.style.zIndex = '1000';
        temp.style.cursor = 'grabbing';
        temp.style.left = pageX - rect.width / 2 + 'px';
        temp.style.top = pageY - rect.height / 2 + 'px';
        document.body.appendChild(temp);

        document.addEventListener('mousemove', handleMouseMove, true);
        document.addEventListener('mouseup', handleEnd, true);

        document.addEventListener('touchmove', handleTouchMove, true);
        document.addEventListener('touchend', handleEnd, true);

        el.dispatchEvent(
            new CustomEvent('move-start', {
                detail: {
                    payload,
                    pageX: pageX,
                    pageY: pageY,
                },
            })
        );

        if (debug) {
            console.log(`Initial mousePos: ${pageX}, ${pageY}`);
        }
    }

    function handleMouseMove(e) {
        e.stopPropagation();
        e.preventDefault();

        pageX = e.pageX;
        pageY = e.pageY;

        temp.style.left = pageX - temp.offsetWidth / 2 + 'px';
        temp.style.top = pageY - temp.offsetHeight / 2 + 'px';
    }

    function handleTouchMove(e) {
        e.stopPropagation();
        e.preventDefault();

        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;

        temp.style.left = pageX - temp.offsetWidth / 2 + 'px';
        temp.style.top = pageY - temp.offsetHeight / 2 + 'px';
    }

    function handleEnd(e) {
        e.stopPropagation();
        e.preventDefault();

        temp.remove();
        temp = null;

        document.removeEventListener('mousemove', handleMouseMove, true);
        document.removeEventListener('mouseup', handleEnd, true);

        document.removeEventListener('touchmove', handleTouchMove, true);
        document.removeEventListener('touchend', handleEnd, true);

        el.dispatchEvent(
            new CustomEvent('move-end', {
                detail: {
                    payload,
                    pageX: pageX,
                    pageY: pageY,
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
            console.log(`Final mousePos: ${pageX}, ${pageY}`);
        }
    }

    el.addEventListener('mousedown', handleStart, true);
    el.addEventListener('touchstart', handleStart, true);

    return {
        node: el,
        destroy() {
            el.removeEventListener('mousedown', handleStart, true);
            el.removeEventListener('touchstart', handleStart, true);

            document.removeEventListener('mousemove', handleMouseMove, true);
            document.removeEventListener('mouseup', handleEnd, true);

            document.removeEventListener('touchmove', handleTouchMove, true);
            document.removeEventListener('touchend', handleEnd, true);
        },
    };
}
