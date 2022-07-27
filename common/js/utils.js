function interpolate(template, obj) {
    for (let key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }

    return template;
}

function debounce(fn, timeout = 300) {
    let timerId = null;
    return (...rest) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...rest), timeout);
    };
}