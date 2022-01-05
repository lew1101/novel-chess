<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function closeEvent(e) {
        dispatch('closeEvent');
    }
</script>

<div class="background" on:click={closeEvent}>
    <span class="helper" />
    <div class="popup-container" on:click|stopPropagation>
        <div class="popup-close-button" on:click={closeEvent}>&times;</div>
        <div class="title">
            <slot name="title" />
        </div>
        <div class="description">
            <slot name="desc" />
        </div>
    </div>
</div>

<style>
    /* Reference: https://html-online.com/articles/simple-popup-box/ */
    .background {
        background: rgba(0, 0, 0, 0.4);
        cursor: pointer;
        top: 0;
        position: fixed;
        text-align: center;
        z-index: 10000;

        width: 100%;
        height: 100%;
    }

    .helper {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

    .popup-container {
        background-color: #fff;
        position: relative;
        box-shadow: 10px 10px 60px #555;
        display: inline-block;
        z-index: 10001;
        max-width: 551px;
        min-height: 100px;

        width: 60%;
        height: auto;

        vertical-align: middle;
        border-radius: 8px;
        overflow: hidden;

        color: black;
        font-family: 'Roboto', san-serif;
    }

    .title {
        font-size: 30px;
        padding: 30px 0 20px;
        width: 100%;
        font-weight: bold;
        background-color: #f79531;
    }

    .description {
        width: 100%;
        padding: 30px 0;
        font-size: 20px;
    }

    .popup-close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;

        cursor: pointer;
        display: inline-block;
        font-weight: bolder;
        text-align: center;
        font-size: 30px;
    }
</style>
