import moment from 'moment';
import momentJalaali from 'moment-jalaali';

momentJalaali.loadPersian({
    usePersianDigits: true,
    dialect: 'persian-modern'
});

/* ---------- Helpers ---------- */

const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹' [d]);
const toArabicIndic = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩' [d]);

/* ---------- Gregorian ---------- */

const UNITS = {
    en: {
        yr: 'yr',
        yrs: 'yrs',
        mo: 'mo',
        mos: 'mos'
    },
    az: {
        yr: 'il',
        yrs: 'il',
        mo: 'ay',
        mos: 'ay'
    },
    "az-Cyrl": {
        yr: 'ил',
        yrs: 'ил',
        mo: 'ay',
        mos: 'ay'
    },
    tr: {
        yr: 'yıl',
        yrs: 'yıl',
        mo: 'ay',
        mos: 'ay'
    },
    otk: {
        yr: '𐰖𐰃𐰞',
        yrs: '𐰖𐰃𐰞',
        mo: '𐰀𐰖',
        mos: '𐰀𐰖'
    },
};

const MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    az: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    "az-Cyrl": ['Январ', 'Феврал', 'Март', 'Апрел', 'Май', 'Июн', 'Июл', 'Август', 'Сентябр', 'Октябр', 'Ноябр', 'Декабр'],
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    otk: ['𐰆𐰲𐰀𐰴', '𐱁𐰆𐰉𐰀𐱃', '𐰢𐰀𐰺𐱃', '𐰤𐰃𐰾𐰀𐰣', '𐰢𐰀𐰖𐰃𐰽', '𐰴𐰀𐰔𐰃𐰼𐰀𐰣', '𐱅𐰀𐰢𐰢𐰆𐰔', '𐰀𐰍𐰆𐰽𐱃𐰽', '𐰀𐰘𐰠𐰇𐰠', '𐰀𐰚𐰃𐰢', '𐰴𐰀𐰽𐰃𐰢', '𐰀𐰺𐰞𐰶'],
};

/* ---------- Shamsi (Jalaali) ---------- */

const SHAMSI_MONTHS = {
    fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    // azarab: ['آغلار-گولَر آیی', 'گول آیی', 'کوز آیی', 'قوروق آیی', 'دَرو آیی', 'خِزان آیی', 'آی‌لار آیی', 'آرا آیی', 'قیرخ‌چیخار', 'بویوک چیلّه', 'کیچیک چیلّه', 'بایرام آیی'],
    "az-Arab": ['آغلار گولر', 'گولن آی', 'قیزاران آی', 'قورا پیشیرن', 'قویروق دوغان', 'زومار آیی', 'خزل آیی', 'قیروو آیی', 'آذر', 'چیلله', 'دوندوران آی', 'بایرام آیی'],
};

const SHAMSI_UNITS = {
    fa: {
        year: 'سال',
        month: 'ماه',
        and: ' و '
    },
    "az-Arab": {
        year: 'ایل',
        month: 'آی',
        and: ' '
    },
};

/* ---------- Hijri (Islamic) ---------- */

const HIJRI_MONTHS = {
    ota: ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الآخر', 'جمادی‌الاول', 'جمادی‌الآخر', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'],
};

const HIJRI_UNITS = {
    ota: {
        year: 'سنه',
        years: 'سنه',
        month: 'آی',
        months: 'آی',
        and: ' '
    },
};

const HIJRI_PRESENT_DEFAULT = 'Present';

// ارقام: فارسی برای fa/azarab، عربی-هندی برای ar/ota، لاتین برای بقیه
const HIJRI_DIGITS = {
    ota: toArabicIndic,
};

const hijriFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
});

const toHijri = (date) => {
    const parts = hijriFormatter.formatToParts(date);
    const get = (type) => Number(parts.find((p) => p.type === type).value);
    return {
        year: get('year'),
        month: get('month') - 1
    }; // ماه از ۰ شروع می‌شود
};

/* ---------- Formatters ---------- */

const capitalize = (s, lang) => s.charAt(0).toLocaleUpperCase(lang) + s.slice(1);

window.formatDateRange = (outElement) => {
    const element = document.getElementById(outElement);
    if (!element) return;

    // const lang = (element.getAttribute('data-lang') || 'en').split('-')[0];
    const lang = element.getAttribute('data-lang') || 'en';
    const present = element.getAttribute('data-present') || 'Present';
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') || null;

    const start = moment(startDate);
    const end = endDate ? moment(endDate) : moment();

    const monthNames = MONTHS[lang] ?? MONTHS.en;
    const fmt = (m) => `${monthNames[m.month()]} ${m.year()}`;

    const startFormatted = fmt(start);
    const endFormatted = endDate ? fmt(end) : present;

    const totalMonths = end.diff(start, 'months') + 1;
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;

    const units = UNITS[lang] ?? UNITS.en;

    const parts = [];
    if (y > 0) parts.push(`${y} ${y > 1 ? units.yrs : units.yr}`);
    if (m > 0) parts.push(`${m} ${m > 1 ? units.mos : units.mo}`);

    element.innerText = `${startFormatted} - ${endFormatted} 🞄 ${parts.join(' ')}`;
};

window.formatShamsiDateRange = (outElement) => {
    const element = document.getElementById(outElement);
    if (!element) return;

    const lang = element.getAttribute('data-lang') || 'fa';
    const present = element.getAttribute('data-present') || 'اکنون';
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') || null;

    const monthNames = SHAMSI_MONTHS[lang] ?? SHAMSI_MONTHS.fa;
    const units = SHAMSI_UNITS[lang] ?? SHAMSI_UNITS.fa;

    const start = momentJalaali(startDate);
    const end = endDate ? momentJalaali(endDate) : momentJalaali();

    const fmt = (m) => `${monthNames[m.jMonth()]} ${toFa(m.jYear())}`;

    const startFormatted = fmt(start);
    const endFormatted = endDate ? fmt(end) : present;

    const totalMonths = end.diff(start, 'months') + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const durationParts = [];
    if (years > 0) durationParts.push(`${toFa(years)} ${units.year}`);
    if (months > 0) durationParts.push(`${toFa(months)} ${units.month}`);

    element.innerText = `${startFormatted} - ${endFormatted} 🞄 ${durationParts.join(units.and)}`;
};

window.formatHijriDateRange = (outElement) => {
    const element = document.getElementById(outElement);
    if (!element) return;

    const lang = (element.getAttribute('data-lang') || 'en').split('-')[0];
    const present = element.getAttribute('data-present') || HIJRI_PRESENT_DEFAULT;
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') || null;

    const monthNames = HIJRI_MONTHS[lang] ?? HIJRI_MONTHS.en;
    const units = HIJRI_UNITS[lang] ?? HIJRI_UNITS.en;
    const digits = HIJRI_DIGITS[lang] ?? ((n) => String(n));

    const start = toHijri(moment(startDate).toDate());
    const end = toHijri(endDate ? moment(endDate).toDate() : new Date());

    const fmt = (h) => `${monthNames[h.month]} ${digits(h.year)}`;

    const startFormatted = fmt(start);
    const endFormatted = endDate ? fmt(end) : present;

    // مثل نسخه‌های دیگر، ماه آخر هم حساب می‌شود (+1)
    const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const durationParts = [];
    if (years > 0) durationParts.push(`${digits(years)} ${years > 1 ? units.years : units.year}`);
    if (months > 0) durationParts.push(`${digits(months)} ${months > 1 ? units.months : units.month}`);

    element.innerText = `${startFormatted} - ${endFormatted} 🞄 ${durationParts.join(units.and)}`;
};

/* ---------- Init ---------- */

function initDateRanges() {
    document.querySelectorAll('[data-date-range]').forEach((el) => {
        if (!el.id) return;
        switch (el.dataset.dateRange) {
            case 'shamsi':
                window.formatShamsiDateRange(el.id);
                break;
            case 'hijri':
                window.formatHijriDateRange(el.id);
                break;
            default:
                window.formatDateRange(el.id);
        }
    });
}

initDateRanges();
document.addEventListener('astro:page-load', initDateRanges);
