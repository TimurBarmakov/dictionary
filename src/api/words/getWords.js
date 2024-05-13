const getWords = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const wiktionaryUrl = `https://en.wiktionary.org/wiki/${word}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        const result = { data, wiktionaryUrl, error: null };
        console.log("Result from getWords:", result);
        return result;
        return { data, wiktionaryUrl, error: null };
    } catch (error) {
        return { data: null, wiktionaryUrl, error: error.message };
    }
};

export default getWords;
