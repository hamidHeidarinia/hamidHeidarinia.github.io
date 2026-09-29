import moment from 'moment';
import momentJalaali from 'moment-jalaali';

// نام ماه‌های فارسی و ارقام فارسی (فقط یک بار، بعد از import)
momentJalaali.loadPersian({
    usePersianDigits: true,
    dialect: 'persian-modern'
});

// تبدیل ارقام لاتین به فارسی (برای مدت زمان)
const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹' [d]);

window.formatDateRange = (outElement) => {
    let element = document.getElementById(outElement);
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') == '' ? null : element.getAttribute('data-end');
    const start = moment(startDate);
    const end = endDate ? moment(endDate) : moment();
    const startFormatted = start.format('MMM YYYY');
    const endFormatted = endDate ? end.format('MMM YYYY') : 'Present';

    let totalMonths = end.diff(start, 'months') + 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let durationParts = [];
    if (years > 0) durationParts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months > 0) durationParts.push(`${months} mo${months > 1 ? 's' : ''}`);

    const duration = durationParts.join(' ');

    element.innerText = `${startFormatted} - ${endFormatted} · ${duration}`;
};

window.formatShamsiDateRange = (outElement) => {
    let element = document.getElementById(outElement);
    const startDate = element.getAttribute('data-start');
    const endDate = element.getAttribute('data-end') == '' ? null : element.getAttribute('data-end');

    const start = momentJalaali(startDate);
    const end = endDate ? momentJalaali(endDate) : momentJalaali();

    // j قبل از MMMM و YYYY یعنی ماه و سال شمسی
    const startFormatted = start.format('jMMMM jYYYY');
    const endFormatted = endDate ? end.format('jMMMM jYYYY') : 'اکنون';

    let totalMonths = end.diff(start, 'months') + 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let durationParts = [];
    if (years > 0) durationParts.push(`${toFa(years)} سال`);
    if (months > 0) durationParts.push(`${toFa(months)} ماه`);

    const duration = durationParts.join(' و ');

    element.innerText = `${startFormatted} - ${endFormatted} · ${duration}`;
};
