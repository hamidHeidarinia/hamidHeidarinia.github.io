import {
    defineConfig,
    fontProviders
} from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";

const SERVER_PORT = 4321;

const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://hamidheidarinia.github.io";

// روش مطمئن‌تر برای تشخیص build به‌جای npm_lifecycle_event
const isBuild = process.env.NODE_ENV === "production";

const BASE_URL = isBuild ? LIVE_URL : LOCALHOST_URL;

const SITE_LOCALES = ["en", "az", "azarab", "tr", "otk", "fa"];
const DEFAULT_LOCALE = "en";

// https://astro.build/config
export default defineConfig({
    site: BASE_URL,

    // output: "server", // required, with no prerendered pages
    // adapter: node({
    //     mode: 'standalone',
    // }),

    vite: {
        plugins: [tailwindcss()],
    },

    devToolbar: {
        enabled: true,
    },

    integrations: [
        alpinejs(),
        sitemap({
            i18n: {
                defaultLocale: DEFAULT_LOCALE,
                locales: {
                    en: 'en-US',
                    az: 'az-Latn-AZ',
                    azarab: 'az-Arab-IR',
                    tr: 'tr-TR',
                    otk: 'otk',
                    fa: 'fa-IR',
                },
            },
            // xslURL: '/sitemap.xsl',
            namespaces: {
                news: false,
                xhtml: false,
            },
        }),
    ],

    i18n: {
        locales: SITE_LOCALES,
        defaultLocale: DEFAULT_LOCALE,
        // fallback: {
        //     az: "en",
        //     tr: "en",
        //     fa: "en",
        // },
        routing: {
            prefixDefaultLocale: true,
            // fallbackType: "rewrite"
        },
    },

    fonts: [{
            provider: fontProviders.local(),
            name: "IRANSans",
            cssVariable: "--font-iranssans",
            options: {
                variants: [{
                        weight: 400,
                        style: "normal",
                        src: ["./src/assets/fonts/IRANSans/IRANSans_Medium.woff2"]
                    },
                    {
                        weight: 700,
                        style: "normal",
                        src: ["./src/assets/fonts/IRANSans/IRANSans_Bold.woff2"]
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: "Calibri",
            cssVariable: "--font-calibri",
            options: {
                variants: [{
                    weight: 400,
                    style: "normal",
                    src: ["./src/assets/fonts/Calibri/calibri-regular.woff2"]
                }, {
                    weight: 700,
                    style: "normal",
                    src: ["./src/assets/fonts/Calibri/calibri-bold.woff2"]
                }, ],
            },
        },
        {
            provider: fontProviders.local(),
            name: "KokTuruk",
            cssVariable: "--font-kokturuk",
            options: {
                variants: [{
                    weight: 400,
                    style: "normal",
                    src: ["./src/assets/fonts/KokTuruk/KokTurukUnicodeTugrulCavdar.woff2"]
                }, ],
            },
        },
    ],
});