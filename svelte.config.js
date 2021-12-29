import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
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
        target: '#svelte',
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
    },
};

export default config;
