<button class="button" disabled={$$props.disabled} on:click>
    <slot />
</button>

<style>
    .button {
        padding: 10px;
        margin: 5px;
        background-color: #f79531;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;

        color: #8b4732;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
    }

    .button:active {
        background-color: #c46c15;
    }

    .button:disabled {
        color: #3b3a3a;
        background-color: #66605a;
    }
</style>
