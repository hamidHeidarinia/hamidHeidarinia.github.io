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

const LOCAL_BASE = "/";
const LIVE_BASE = "/hamidHeidarinia.github.io";

const isBuild =
    process.argv.includes("build") || process.env.NODE_ENV === "production";


const BASE_URL = isBuild ? LIVE_URL : LOCALHOST_URL;
const BASE_PATH = isBuild ? LIVE_BASE : "/";

const BASE_PREFIX = BASE_PATH.replace(/\/$/, "");

const SITE_LOCALES = ["en", "az-ir", "az", "az-cyrl", "tr", "ota", "otk", "fa"];
const DEFAULT_LOCALE = "en";

const PROFILE_IMAGE = `${LIVE_URL}/profile.webp`;

// https://astro.build/config
export default defineConfig({
    compressHTML: true,
    site: BASE_URL,
    // base: BASE_PATH,
    base: "/",

    // output: "server", // required, with no prerendered pages
    // adapter: node({
    //     mode: 'standalone',
    // }),
    redirects: {
        "/": `/en/`,
    },
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
                    en: "en-US",
                    az: "az-AZ",
                    "az-ir": "az-IR",
                    "az-cyrl": "az-Cyrl",
                    fa: "fa-IR",
                    tr: "tr-TR",
                    ota: "ota",
                    otk: "otk",
                },
            },

            serialize(item) {
                const {
                    pathname
                } = new URL(item.url);
                const parts = pathname.split("/").filter(Boolean);
                const locale = parts[0];

                if (SITE_LOCALES.includes(locale)) {
                    const rest = pathname.replace(`/${locale}/`, "");

                    const links = item.links ?? [];
                    if (!links.some((l) => l.lang === "x-default")) {
                        links.push({
                            url: `${LIVE_URL}/${DEFAULT_LOCALE}/${rest}`,
                            lang: "x-default",
                        });
                    }
                    item.links = links;

                    if (parts.length === 1) {
                        item.img = [{
                            url: PROFILE_IMAGE,
                            title: "Hamid Heidarinia",
                            caption: "Profile photo of Hamid Heidarinia",
                        }];
                    }

                    // if (parts.length === 2 && parts[1] === "intro") {
                    //     const meta = VIDEO_META[locale];
                    //     item.video = [{
                    //         title: meta.title,
                    //         description: meta.description,
                    //         thumbnail_loc: `${LIVE_URL}/video/${locale}/intro-thumb.jpg`,
                    //         content_loc: `${LIVE_URL}/video/${locale}/intro.mp4`,
                    //         duration: 120,
                    //         publication_date: "2026-10-19",
                    //     }];
                    // }
                }

                return item;
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
                    {
                        weight: 400,
                        style: "normal",
                        src: ["./src/assets/fonts/IRANSans/IRANSans(FaNum)_Medium.woff2"]
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