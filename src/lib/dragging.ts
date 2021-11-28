export function draggable(el: HTMLElement, tag: string) {
    el.draggable = true;

    function handleDragStart(e: DragEvent) {
        e.dataTransfer.setData("text", tag);
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
    }

    el.addEventListener("dragstart", handleDragStart);

    return {
        destroy() {
            el.draggable = false;
            el.removeEventListener("dragstart", handleDragStart);
        },
    };
}

export function dropzone(el: HTMLElement, tag: string) {
    function handleDragOver(e: DragEvent) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();

        if (e.dataTransfer.getData("text") !== tag) {
            e.stopImmediatePropagation();
        }
    }

    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("drop", handleDrop);

    return {
        destroy() {
            el.removeEventListener("dragover", handleDragOver);
            el.removeEventListener("drop", handleDrop);
        },
    };
}
