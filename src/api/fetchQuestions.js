export async function fetchQuestions() {
  const res = await fetch('https://opentdb.com/api.php?amount=5')
  const data = await res.json()
  return data.results
}