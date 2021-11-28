export function draggable(el: HTMLElement, props: { enabled: boolean; tag: string }) {
    if (!props.enabled) return;

    el.draggable = true;

    function handleDragStart(e: DragEvent) {
        e.dataTransfer.setData("text", props.tag);
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        // (<HTMLElement>e.target).style.visibility = "hidden";
    }

    el.addEventListener("dragstart", handleDragStart, true);

    return {
        destroy() {
            el.draggable = false;
            el.removeEventListener("dragstart", handleDragStart, true);
        },
    };
}

export function dropzone(el: HTMLElement, props: { enabled: boolean; tag: string }) {
    if (!props.enabled) return;

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        if (e.dataTransfer.getData("text") !== props.tag) {
            e.stopImmediatePropagation();
        }
    }

    el.addEventListener("dragover", handleDragOver, true);
    el.addEventListener("drop", handleDrop, true);

    return {
        destroy() {
            el.removeEventListener("dragover", handleDragOver, true);
            el.removeEventListener("drop", handleDrop, true);
        },
    };
}
