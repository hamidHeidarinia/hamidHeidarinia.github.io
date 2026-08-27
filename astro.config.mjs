import {
    defineConfig
} from "astro/config";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
    // site: "https://www.hamidheidarinia.github.io",
    // output: "server", // required, with no prerendered pages
    // adapter: node({
    //     mode: 'standalone',
    // }),
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
    }
});