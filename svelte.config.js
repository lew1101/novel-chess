import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const dev = process.env.NODE_ENV === 'development';

const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        typescript: {
            tsconfigFile: './tsconfig.json',
        },
    }),

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        // target: '#svelte',
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
        }),
        vite: {
            // herein lies the place where i lost my sanity
            resolve: {
                alias: {
                    '@lib': path.resolve('./src/lib'),
                    '@components': path.resolve('./src/components'),
                    '@utils': path.resolve('./src/lib/utils'),
                },
            },
        },
        paths: {
            base: dev ? '' : '/novel-chess-demo', // gh-pages compatibilty
        },
    },
};

export default config;
