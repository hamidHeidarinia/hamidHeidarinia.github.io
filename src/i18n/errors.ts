export const locales = ['en', 'az-ir', 'az', 'az-cyrl', 'tr', 'ota', 'otk', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['fa', 'az-ir', 'ota', 'otk'];

type Strings = {
    '404': { title: string; text: string };
    '500': { title: string; text: string };
    home: string;
    back?: string;
    retry?: string;
    skills?: string;
};

export const errors: Record<Locale, Strings> = {
    en: {
        '404': { title: 'Page not found', text: 'The page you are looking for does not exist.' },
        '500': { title: 'Server error', text: 'Something went wrong. Please try again later.' },
        home: 'Back to home', back: 'Go back', retry: 'Try again', skills: 'Skills',
    },
    'az-ir': {
        '404': { title: 'صحیفه تاپیلمادی', text: 'آختاردیغینیز صحیفه موجود دئیل.' },
        '500': { title: 'سرور خطاسی', text: 'خطا باش وئردی. زحمت اولماسا سونرا یئنیدن جهد ائدین.' },
        home: 'آنا صحیفه‌یه قایيت', back: 'گئری', retry: 'یئنیدن جهد ائت', skills: 'باجاریقلار',
    },
    az: {
        '404': { title: 'Səhifə tapılmadı', text: 'Axtardığınız səhifə mövcud deyil.' },
        '500': { title: 'Server xətası', text: 'Xəta baş verdi. Zəhmət olmasa sonra yenidən cəhd edin.' },
        home: 'Ana səhifəyə qayıt', back: 'Geri', retry: 'Yenidən cəhd et', skills: 'Bacarıqlar',
    },
    'az-cyrl': {
        '404': { title: 'Сәһифә тапылмады', text: 'Ахтардығыныз сәһифә мөвҹуд дејил.' },
        '500': { title: 'Сервер хәтасы', text: 'Хәта баш верди. Зәһмәт олмаса сонра јенидән чәһд един.' },
        home: 'Ана сәһифәјә гајыт', back: 'Гери', retry: 'Јенидән чәһд ет', skills: 'Бачарыглар',
    },
    tr: {
        '404': { title: 'Sayfa bulunamadı', text: 'Aradığınız sayfa mevcut değil.' },
        '500': { title: 'Sunucu hatası', text: 'Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.' },
        home: 'Ana sayfaya dön', back: 'Geri', retry: 'Tekrar dene', skills: 'Beceriler',
    },
    ota: {
        '404': { title: 'صحیفه بولونمادی', text: 'آرادیغیكز صحیفه موجود دكلدر.' },
        '500': { title: 'خادم خطاسی', text: 'بر مشكل حاصل اولدی. لطفاً صوڭره یكیدن دنه‌یڭ.' },
        home: 'آنا صحیفه‌یه دون', back: 'گری', retry: 'یكیدن دنه', skills: 'بیلگیلر',
    },
    otk: {
        '404': { title: '𐰽𐰖𐰯𐰀 𐰉𐰆𐰞𐰣𐰢𐰑𐰃', text: '𐰀𐰺𐰑𐰃𐰍𐰣𐰔 𐰽𐰖𐰯𐰀 𐰢𐰋𐰲𐰆𐱃 𐰓𐰏𐰃𐰠.' },
        '500': { title: '𐰽𐰆𐰣𐰲𐰆 𐰴𐱃𐰽𐰃', text: '𐰋𐰃𐰼 𐰽𐰆𐰺𐰣 𐰆𐰞𐱁𐱃𐰆. 𐰠𐰇𐱅𐰯𐰤 𐰑𐰴𐰀 𐰽𐰆𐰣𐰺𐰀 𐱅𐰚𐰺𐰺 𐰓𐰤𐰘𐰃𐰤.' },
        home: '𐰀𐰣𐰀 𐰽𐰖𐰯𐰖𐰀 𐰓𐰇𐰤', back: '𐰏𐰼𐰃', retry: '𐱅𐰚𐰺𐰺 𐰓𐰤𐰀', skills: '𐰋𐰲𐰼𐰃𐰠𐰼',
    },
    fa: {
        '404': { title: 'صفحه پیدا نشد', text: 'صفحه‌ای که دنبالش هستید وجود ندارد.' },
        '500': { title: 'خطای سرور', text: 'مشکلی پیش آمد. لطفاً بعداً دوباره تلاش کنید.' },
        home: 'بازگشت به صفحه اصلی', back: 'بازگشت', retry: 'تلاش دوباره', skills: 'مهارت‌ها',
    },
};

export function getLangFromPath(pathname: string, base = ''): Locale {
    const path = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
    const seg = path.split('/').filter(Boolean)[0];
    return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}