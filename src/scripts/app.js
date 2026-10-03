import moment from 'moment';
import momentJalaali from 'moment-jalaali';

momentJalaali.loadPersian({
    usePersianDigits: true,
    dialect: 'persian-modern'
});


const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

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
    tr: {
        yr: 'yıl',
        yrs: 'yıl',
        mo: 'ay',
        mos: 'ay'
    },
};

const MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    az: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
};

const SHAMSI_MONTHS = {
    fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    // azarab: ['آغلار-گولَر آیی', 'گول آیی', 'کوز آیی', 'قوروق آیی', 'دَرو آیی', 'خِزان آیی', 'آی‌لار آیی', 'آرا آیی', 'قیرخ‌چیخار', 'بویوک چیلّه', 'کیچیک چیلّه', 'بایرام آیی'],
    azarab: ['آغلار گولر', 'گولن آی', 'قیزاران آی', 'قورا پیشیرن', 'قویروق دوغان', 'زومار آیی', 'خزل آیی', 'قیروو آیی', 'آذر', 'چیلله', 'دوندوران آی', 'بایرام آیی'],
};

const SHAMSI_UNITS = {
    fa: {
        year: 'سال',
        month: 'ماه',
        and: ' و '
    },
    azfa: {
        year: 'ایل',
        month: 'آی',
        and: ' '
    },
};

const capitalize = (s, lang) => s.charAt(0).toLocaleUpperCase(lang) + s.slice(1);

window.formatDateRange = (outElement) => {
    
    const element = document.getElementById(outElement);
    if (!element) return;

    const lang = (element.getAttribute('data-lang') || 'en').split('-')[0];
    const present = element.getAttribute('data-present') || 'Present';
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') || null;

    const start = moment(startDate);
    const end = (endDate ? moment(endDate) : moment());

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

function initDateRanges() {
    document.querySelectorAll('[data-date-range]').forEach((el) => {
        if (!el.id) return;
        if (el.dataset.dateRange === 'shamsi') {
            window.formatShamsiDateRange(el.id);
        } else {
            window.formatDateRange(el.id);
        }
    });
}

initDateRanges();
document.addEventListener('astro:page-load', initDateRanges);
