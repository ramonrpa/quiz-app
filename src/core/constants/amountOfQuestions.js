const AMOUNT_OF_QUESTIONS = []

for (let i = 5; i <= 50; i++) {
  const object = { key: i, text: `${i}`, value: i }
  AMOUNT_OF_QUESTIONS.push(object)
}

export default AMOUNT_OF_QUESTIONS