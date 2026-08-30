import {
    defineConfig,
    fontProviders
} from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";
import moment from 'moment';
import momentJalaali from 'moment-jalaali';

// https://astro.build/config
export default defineConfig({
    // site: "https://www.hamidheidarinia.github.io",
    // output: "server", // required, with no prerendered pages
    // adapter: node({
    //     mode: 'standalone',
    // }),
    vite: {
        plugins: [tailwindcss()],
    },
    devToolbar: {
        enabled: true
    },

    integrations: [alpinejs()],
    i18n: {
        locales: ["en", "az", "tr", "türkcə", "fa"],
        defaultLocale: "en",
        // fallback: {
        //     rs: "en"
        // },
        routing: {
            prefixDefaultLocale: true,
            // fallbackType: "rewrite"
        }
    },
    fonts: [
        {
            provider: fontProviders.local(),
            name: "Calibri",
            cssVariable: "--font-calibri",
            options: {
                variants: [{
                    src: ['./src/assets/fonts/Calibri/calibri-regular.woff2'],
                    weight: 'normal',
                    style: 'normal'
                }]
            }
        },
        {
            provider: fontProviders.local(),
            name: "IRANSans",
            cssVariable: "--font-iransSans",
            options: {
                variants: [{
                    src: ['./src/assets/fonts/IRANSans/IRANSANSWEB.woff2'],
                    weight: 'normal',
                    style: 'normal'
                }]
            }
        }
    ]
});