const Utils = {
    makeFetch(url) {
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: '*',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
    },
}

module.exports = Utils;