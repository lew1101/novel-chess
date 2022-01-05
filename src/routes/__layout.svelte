<slot />
<footer class="footer">
    <span>Made by Kenneth Lew</span>
    <span
        >Github Repo: <a href="https://github.com/lew1101/novel-chess"
            >https://github.com/lew1101/novel-chess</a
        ></span
    >
</footer>

<style>
    .footer {
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        left: 0;
        bottom: 0;
        margin: 0;
        padding: 0 10px;

        font-family: 'Roboto', sans-serif;
    }

    .footer > span {
        margin: 5px;
    }
    .footer > span > a {
        color: #f79531;
    }

    @media only screen and (orientation: portrait) {
        .footer {
            display: none;
        }
    }
</style>
