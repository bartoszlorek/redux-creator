function addParams(url, params) {
    const keys = params && Object.keys(params);

    if (!keys || keys.length === 0) {
        return url;
    }
    return keys.reduce((url, key) => {
        const regex = new RegExp(`:${key}`, 'g');
        return url.replace(regex, params[key]);
    }, url);
}

export default addParams;