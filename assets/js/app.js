function formatDateRange(startDate, endDate = null) {
    const start = moment(startDate);
    const end = endDate ? moment(endDate) : moment();

    const startFormatted = start.format('MMM YYYY');
    const endFormatted = endDate ? end.format('MMM YYYY') : 'Present';

    // کل اختلاف رو بر حسب ماه حساب می‌کنیم و یک ماه اضافه می‌کنیم (برای شمارش inclusive مثل لینکدین)
    let totalMonths = end.diff(start, 'months') + 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let durationParts = [];
    if (years > 0) durationParts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months > 0) durationParts.push(`${months} mo${months > 1 ? 's' : ''}`);

    const duration = durationParts.join(' ');

    return `${startFormatted} - ${endFormatted} · ${duration}`;
}
