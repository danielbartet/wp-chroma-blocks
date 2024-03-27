const quizLoader = function() {
  var parser = new DOMParser(),
  loader = document.getElementById('cm-quiz-loader'),
  doc,
  loadQuiz
  fetch(window.location.hostname + '/wp-json/wp/v2/cmquiz/' + loader.getAttribute('data-id'))
    .then( response => response.text())
    .then(string => {
      doc = parser.parseFromString(string, "text/html")
      loadQuiz = doc.getElementById('cm-quiz')
      var quizScriptSrc = doc.getElementById('cm-quiz-script').getAttribute('src'),
      quizScript = document.createElement('script')
      quizScript.setAttribute('async', 'async')
      quizScript.setAttribute('src', quizScriptSrc)
      loader.appendChild(loadQuiz)
      document.body.appendChild(quizScript)
    })
    .then( () => {
      loader.className = 'is-active'
      var innerQuizShare = new socialShareMaster(loadQuiz.getAttribute('data-link'))
      console.log(innerQuizShare)
    })
    .catch(e => console.log(e))
}
quizLoader()
