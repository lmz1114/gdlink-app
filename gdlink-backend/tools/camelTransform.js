const snakeToCamel = (snakeObj) => {
    return Object.entries(snakeObj).reduce((camelObj, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelObj[camelKey] = value;
        return camelObj;
    }, {});
};

module.exports = { snakeToCamel };