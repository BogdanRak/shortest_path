module.exports = function (data) {
    const result = {}

    data.forEach(([from, to, cost]) => {
        result[from] = {
            ...result[from],
            [to]: cost
        }

        result[to] = {
            ...result[to],
            [from]: cost
        }
    })

    return result
};