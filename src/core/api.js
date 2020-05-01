const API_BASE = 'https://opentdb.com/api.php?amount={0}&category={1}&difficulty={2}&type={3}'

const getTrivia = (amountOfQuestions, category, difficulty, type) => {
    return new Promise(async (resolve, reject) => {
        let url = API_BASE.format(amountOfQuestions, category, difficulty, type)
        let response = await fetch(url)
        if (response.ok) {
            let data = await response.json()
            return resolve(data)
        }
        resolve({ "response_code": 5 })
    })
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        let args = arguments
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match

        })
    }
}

export { getTrivia }