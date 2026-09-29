export const locales = ['az', 'azarab', 'en', 'fa', 'otk', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['fa', 'azarab', 'otk'];

export const errors: Record<Locale, Record<'404' | '500', { title: string; text: string }> & { home: string }> = {
    en: {
        '404': { title: 'Page not found', text: 'The page you are looking for does not exist.' },
        '500': { title: 'Server error', text: 'Something went wrong. Please try again later.' },
        home: 'Back to home',
    },
    fa: {
        '404': { title: 'صفحه پیدا نشد', text: 'صفحه‌ای که دنبالش هستید وجود ندارد.' },
        '500': { title: 'خطای سرور', text: 'مشکلی پیش آمد. لطفاً بعداً دوباره تلاش کنید.' },
        home: 'بازگشت به صفحه اصلی',
    },
    tr: {
        '404': { title: 'Sayfa bulunamadı', text: 'Aradığınız sayfa mevcut değil.' },
        '500': { title: 'Sunucu hatası', text: 'Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.' },
        home: 'Ana sayfaya dön',
    },
    az: {
        '404': { title: 'Səhifə tapılmadı', text: 'Axtardığınız səhifə mövcud deyil.' },
        '500': { title: 'Server xətası', text: 'Xəta baş verdi. Zəhmət olmasa sonra yenidən cəhd edin.' },
        home: 'Ana səhifəyə qayıt',
    },
    azarab: {
        '404': { title: 'صحیفه تاپیلمادی', text: 'آختاردیغینیز صحیفه موجود دئیل.' },
        '500': { title: 'سرور خطاسی', text: 'خطا باش وئردی. زحمت اولماسا سونرا یئنیدن جهد ائدین.' },
        home: 'آنا صحیفه‌یه قایيت',
    },
    otk: {
        '404': { title: '𐰽𐰖𐰯𐰀:𐰉𐰆𐰞𐰣𐰢𐰑𐰃', text: '𐰺𐰑𐰍𐰣𐰔:𐰽𐰖𐰯𐰀:𐰢𐰋𐰲𐰆𐱃:𐰓𐰏𐰠⸱ ' },
        '500': { title: '𐰽𐰆𐰣𐰲𐰆:𐰴𐱃𐰽𐰃', text: '𐰋𐰃𐰼:𐰽𐰆𐰺𐰣:𐰆𐰞𐱁𐱃𐰆⸱ 𐰠𐰇𐱅𐰯𐰤:𐰑𐰴𐰀:𐰽𐰆𐰭𐰺𐰀:𐱅𐰚𐰺𐰺:𐰓𐰭𐰘𐰤⸱ ' },
        home: '𐰣𐰀:𐰽𐰖𐰯𐰖𐰀:𐰓𐰇𐰤',
    },
};

export function getLangFromPath(pathname: string): Locale {
    const seg = pathname.split('/').filter(Boolean)[0];
    return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}