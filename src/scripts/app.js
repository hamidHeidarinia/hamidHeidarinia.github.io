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
        mos: 'months'
    },
    az: {
        yr: 'il',
        yrs: 'il',
        mo: 'ay',
        mos: 'ay'
    },
    "az-cyrl": {
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
    "az-cyrl": ['Январ', 'Феврал', 'Март', 'Апрел', 'Май', 'Июн', 'Июл', 'Август', 'Сентябр', 'Октябр', 'Ноябр', 'Декабр'],
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    otk: ['𐰆𐰲𐰀𐰴', '𐱁𐰆𐰉𐰀𐱃', '𐰢𐰀𐰺𐱃', '𐰤𐰃𐰾𐰀𐰣', '𐰢𐰀𐰖𐰃𐰽', '𐰴𐰀𐰔𐰃𐰼𐰀𐰣', '𐱅𐰀𐰢𐰢𐰆𐰔', '𐰀𐰍𐰆𐰽𐱃𐰽', '𐰀𐰘𐰠𐰇𐰠', '𐰀𐰚𐰃𐰢', '𐰴𐰀𐰽𐰃𐰢', '𐰀𐰺𐰞𐰶'],
};

/* ---------- Shamsi (Jalaali) ---------- */

const SHAMSI_MONTHS = {
    fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    // azarab: ['آغلار-گولَر آیی', 'گول آیی', 'کوز آیی', 'قوروق آیی', 'دَرو آیی', 'خِزان آیی', 'آی‌لار آیی', 'آرا آیی', 'قیرخ‌چیخار', 'بویوک چیلّه', 'کیچیک چیلّه', 'بایرام آیی'],
    "az-arab": ['آغلار گولر', 'گولن آی', 'قیزاران آی', 'قورا پیشیرن', 'قویروق دوغان', 'زومار آیی', 'خزل آیی', 'قیروو آیی', 'آذر', 'چیلله', 'دوندوران آی', 'بایرام آیی'],
};

const SHAMSI_UNITS = {
    fa: {
        year: 'سال',
        month: 'ماه',
        and: ' و '
    },
    "az-arab": {
        year: 'ایل',
        month: 'آی',
        and: ' و '
    },
};

/* ---------- Rumi (Ottoman Mali) ---------- */

// ماه‌های رومی از مارس شروع می‌شوند
const RUMI_MONTHS = {
    ota: ['مارت', 'نیسان', 'مایس', 'حزیران', 'تموز', 'آغستوس', 'ایلول', 'تشرین اول', 'تشرین ثانی', 'کانون اول', 'کانون ثانی', 'شباط'],
};

const RUMI_UNITS = {
    ota: {
        year: 'سنه',
        years: 'سنه',
        month: 'آی',
        months: 'آی',
        and: ' '
    },
};

const RUMI_PRESENT_DEFAULT = 'Present';

// ارقام عربی-هندی برای ota، لاتین برای بقیه
const RUMI_DIGITS = {
    ota: toArabicIndic,
};

// میلادی → شمارهٔ روز ژولینی (JDN)
const gregorianToJdn = (y, m, d) => {
    const a = Math.floor((14 - m) / 12);
    const yy = y + 4800 - a;
    const mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
};

// JDN → تقویم ژولین
const jdnToJulian = (jdn) => {
    const c = jdn + 32082;
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    return {
        year: d - 4800 + Math.floor(m / 10),
        month: m + 3 - 12 * Math.floor(m / 10), // 1..12
        day: e - Math.floor((153 * m + 2) / 5) + 1,
    };
};

const toRumi = (date) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;

    // قبل از ۱ مارس ۱۹۱۷ میلادی، تقویم رومی ژولینی بود
    const isJulianEra = y < 1917 || (y === 1917 && m < 3);
    if (isJulianEra) {
        const j = jdnToJulian(gregorianToJdn(y, m, date.getDate()));
        y = j.year;
        m = j.month;
    }

    return {
        year: m >= 3 ? y - 584 : y - 585,
        month: (m + 9) % 12 // مارس = ۰ ... فوریه = ۱۱
    };
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

window.formatRumiDateRange = (outElement) => {
    const element = document.getElementById(outElement);
    if (!element) return;

    const lang = (element.getAttribute('data-lang') || 'ota').split('-')[0];
    const present = element.getAttribute('data-present') || RUMI_PRESENT_DEFAULT;
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') || null;

    const monthNames = RUMI_MONTHS[lang] ?? RUMI_MONTHS.ota;
    const units = RUMI_UNITS[lang] ?? RUMI_UNITS.ota;
    const digits = RUMI_DIGITS[lang] ?? ((n) => String(n));

    const start = toRumi(moment(startDate).toDate());
    const end = toRumi(endDate ? moment(endDate).toDate() : new Date());

    const fmt = (r) => `${monthNames[r.month]} ${digits(r.year)}`;

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
            case 'rumi':
            case 'hijri': // سازگاری با HTML قدیمی
                window.formatRumiDateRange(el.id);
                break;
            default:
                window.formatDateRange(el.id);
        }
    });
}

initDateRanges();
document.addEventListener('astro:page-load', initDateRanges);