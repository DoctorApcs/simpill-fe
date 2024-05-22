import winkNLP, { SentenceImportance } from 'wink-nlp';
import model from 'wink-eng-lite-web-model';


const nlp = await winkNLP(model);


const replaceHtmlTagsWithPlaceholders = (text) => {
    const tags = [];
    let placeholderIndex = 0;

    const textWithPlaceholders = text.replace(/<\/?[^>]+(>|$)/g, match => {
        tags.push(match);
        return `(${placeholderIndex++})`;
    });

    return { textWithPlaceholders, tags };
}

const reaplyHtmlTags = (text, tags) => {
    const txt = text.replace(/<mark>\(\d+\)\(\d+\)/g, (match) => {
        // match is like <mark>(0)(1) and we need to replace it with (0)(1)</mark>
        const [start, end] = match.match(/\d+/g);
        return `(${start})(${end})<mark>`;
    })
    return txt.replace(/\(\d+\)/g, () => tags.shift());
}

export const highLightText = async (text, threshold=0.5) => {
    const { textWithPlaceholders, tags } = replaceHtmlTagsWithPlaceholders(text);
    const doc = await nlp.readDoc(textWithPlaceholders);
    const sentenceWeights = await doc.out(nlp.its.sentenceWiseImportance);

    console.log(sentenceWeights);
    
    // filter out sentences with importance less than threshold
    const filteredIndices = sentenceWeights
        .filter(sentence => sentence.importance > threshold)
        .map(sentence => sentence.index);

    filteredIndices.forEach(index => {
        doc.sentences().itemAt(Number(index)).markup();
    })

    const res = doc.out(nlp.its.markedUpText);
    return reaplyHtmlTags(res, tags);
}

export const unhightLightText = (text) => {
    // remove the markup
    return text.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
}

export const removeHtmlTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
}

export const shortenText = (text, threshold=0.5) => {
    // remove all html tags
    const cleanText = removeHtmlTags(text);
    const doc = nlp.readDoc(cleanText);
    
    // get the importance of the whole text
    const sentenceWeights = doc.out(nlp.its.sentenceWiseImportance);
    const filteredIndices = sentenceWeights
    .filter(sentence => sentence.importance > threshold)
    .map(sentence => sentence.index);
    
    const sentences = doc.sentences();
    const selectedSentences = filteredIndices.map(index => sentences.itemAt(Number(index)).out(nlp.its.text));
    
    return `<ul>${selectedSentences.map(sentence => `<li>${sentence}</li>`).join('')}</ul>`;
}
