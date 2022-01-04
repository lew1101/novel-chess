import {publish} from 'gh-pages'

publish({
    'build': {
        branch: 'gh-pages',
        repo: "https://github.com/lew1101/novel-chess-demo.git",
        user: {
            name: 'Kenneth Lew',
            email: 'kennethlew001@gmail.com'
        },
        dotfiles: true,
    },
}, () => {
    console.log("Deploy to Github Pages Complete")
})