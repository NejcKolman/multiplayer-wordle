/**
 * Words is a utility class to load, store, validate and choose words
 * in different languages. This will make it simpler to add more languages
 * in the future if needed. It will also make code dealing with these wordlists
 * much simpler and easier to understand.
 * Usage:
 *   const wordList = new Words()
 *   await wordList.preloadWords()
 *   wordList.setLanguage("slo")
 *   wordList.validateWord("bonus")
 *   const someWord = wordList.pickRandomWord()
 */
class Words {
    allLanguages = ["slo", "eng"];
    currentLanguageId = 1;
    currentLanguage = "eng";
    allWords = { slo: [], eng: [] };
    words = [];
    wordsSet = {};

    // == PUBLIC METHODS ==
    // This is all the functionality you'll need to work with Words class

    // Pick which language you are planning to use from now on.
    setLanguage(language) {
        const languageId = this.allLanguages.indexOf(language)
        if (languageId == -1) {
            console.error(`Trying to change language to non-existant ${language} but only ${this.allLanguages} available.`)
            return
        }
        this.#setNewLanguageId(languageId)
    }

    // Automatically swap language to the next language on the languages list.
    nextLanguage() {
        this.#setNewLanguageId(this.currentLanguageId + 1)
    }

    // Check that a word is in the current wordlist.
    validateWord(word) {
        return this.wordsSet[word.toLowerCase()] === true
    }

    // Pick a random word from the wordlist for the current language.
    pickRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)]
    }

    // Load words for all languages from the server.
    async preloadWords() {
        await Promise.all([this.#fetchWords('slo'), this.#fetchWords('eng')])
    }

    // == PRIVATE METHDOS ==
    // You shouldn't need these as a user of Words class

    #setNewLanguageId(languageId) {
        // If languageId is bigger than allLanguages roll around
        this.currentLanguageId = languageId % this.allLanguages.length
        this.currentLanguage = this.allLanguages[this.currentLanguageId]
        this.#setCurrentWords(this.allWords[this.currentLanguage])
    }

    #setCurrentWords(wordList) {
        this.words = wordList;
        this.wordsSet = {};
        for (let word of wordList) {
            this.wordsSet[word] = true
        }
    }

    #saveWordList(language, wordList) {
        this.allWords[language] = wordList
        if (language == this.currentLanguage) {
            this.#setCurrentWords(wordList)
        }
    }

    async #fetchWords(language) {
        let response = await fetch("data/besede/" + language + ".txt")
        const txt = await response.text()
        let words = txt.toLowerCase().split('\n')
        words = words.filter((word) => word.length == 5);
        this.#saveWordList(language, words)
    }
};
