/**
 * Text Analysis Tool
 * Analyzes text for counts of characters, words, spaces, and specific parts of speech
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create the text analyzer interface if it doesn't exist yet
    if (!document.getElementById('text-analyzer')) {
        createTextAnalyzerInterface();
    }

    // Set up the analyze button click handler
    document.getElementById('analyze-btn').addEventListener('click', analyzeText);
});

/**
 * Creates the UI elements for the text analyzer
 */
function createTextAnalyzerInterface() {
    // Create the container
    const container = document.createElement('section');
    container.id = 'text-analyzer';
    container.className = 'section';
    
    // Add heading
    const heading = document.createElement('h2');
    heading.textContent = 'Text Analyzer';
    container.appendChild(heading);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'Paste your text (10,000+ words recommended) and click "Analyze" to see detailed statistics.';
    container.appendChild(description);
    
    // Create textarea for input
    const textarea = document.createElement('textarea');
    textarea.id = 'text-input';
    textarea.rows = 10;
    textarea.placeholder = 'Paste your text here...';
    textarea.style.width = '100%';
    textarea.style.padding = '10px';
    textarea.style.marginTop = '20px';
    textarea.style.backgroundColor = '#111';
    textarea.style.color = '#eee';
    textarea.style.border = '1px solid #333';
    textarea.style.borderRadius = '5px';
    container.appendChild(textarea);
    
    // Add sample text button
    const sampleBtn = document.createElement('button');
    sampleBtn.textContent = 'Load Sample Text';
    sampleBtn.style.marginTop = '10px';
    sampleBtn.style.marginRight = '10px';
    sampleBtn.style.padding = '8px 16px';
    sampleBtn.style.backgroundColor = '#333';
    sampleBtn.style.color = '#fff';
    sampleBtn.style.border = 'none';
    sampleBtn.style.borderRadius = '4px';
    sampleBtn.style.cursor = 'pointer';
    sampleBtn.addEventListener('click', loadSampleText);
    container.appendChild(sampleBtn);
    
    // Add analyze button
    const analyzeBtn = document.createElement('button');
    analyzeBtn.id = 'analyze-btn';
    analyzeBtn.textContent = 'Analyze Text';
    analyzeBtn.style.marginTop = '10px';
    analyzeBtn.style.padding = '8px 16px';
    analyzeBtn.style.backgroundColor = '#00cccc';
    analyzeBtn.style.color = '#000';
    analyzeBtn.style.border = 'none';
    analyzeBtn.style.borderRadius = '4px';
    analyzeBtn.style.cursor = 'pointer';
    container.appendChild(analyzeBtn);
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'analysis-results';
    resultsContainer.style.marginTop = '30px';
    
    // Create sections for different types of results
    const basicCountsSection = document.createElement('div');
    basicCountsSection.id = 'basic-counts';
    basicCountsSection.className = 'result-section';
    basicCountsSection.style.marginBottom = '20px';
    basicCountsSection.style.padding = '15px';
    basicCountsSection.style.backgroundColor = 'rgba(0,0,0,0.3)';
    basicCountsSection.style.borderRadius = '5px';
    resultsContainer.appendChild(basicCountsSection);
    
    const pronounsSection = document.createElement('div');
    pronounsSection.id = 'pronouns-count';
    pronounsSection.className = 'result-section';
    pronounsSection.style.marginBottom = '20px';
    pronounsSection.style.padding = '15px';
    pronounsSection.style.backgroundColor = 'rgba(0,0,0,0.3)';
    pronounsSection.style.borderRadius = '5px';
    resultsContainer.appendChild(pronounsSection);
    
    const prepositionsSection = document.createElement('div');
    prepositionsSection.id = 'prepositions-count';
    prepositionsSection.className = 'result-section';
    prepositionsSection.style.marginBottom = '20px';
    prepositionsSection.style.padding = '15px';
    prepositionsSection.style.backgroundColor = 'rgba(0,0,0,0.3)';
    prepositionsSection.style.borderRadius = '5px';
    resultsContainer.appendChild(prepositionsSection);
    
    const articlesSection = document.createElement('div');
    articlesSection.id = 'articles-count';
    articlesSection.className = 'result-section';
    articlesSection.style.padding = '15px';
    articlesSection.style.backgroundColor = 'rgba(0,0,0,0.3)';
    articlesSection.style.borderRadius = '5px';
    resultsContainer.appendChild(articlesSection);
    
    container.appendChild(resultsContainer);
    
    // Add the analyzer section before the footer
    const footer = document.querySelector('footer');
    document.body.insertBefore(container, footer);
}

/**
 * Loads a sample text into the textarea for demonstration
 */
function loadSampleText() {
    const sampleText = `The quick brown fox jumps over the lazy dog. This is a sample text that contains various pronouns such as I, you, he, she, it, we, they, and others. I am writing this text to demonstrate how the text analyzer works. You can use this tool to analyze any text you want. He went to the store yesterday. She likes to read books. It is raining outside. We are going to the movies tonight. They have a new car.

This text also contains various prepositions like in, on, at, by, with, from, to, for, of, about, and others. The cat is on the table. The book is in the drawer. I'll meet you at the cafe. He drove by the park. She went with her friends. The letter is from my aunt. I'm going to the store. This gift is for you. The color of the sky is blue. He told me about his trip.

Articles are also present in this text, including indefinite articles like a and an. A dog barked loudly. An apple fell from the tree. A cat chased a mouse. An elephant is a large animal. A university student studied for an exam. An honest person tells the truth.

Let's add more text to reach a significant word count. The sun rises in the east and sets in the west. Birds fly in the sky. Fish swim in the ocean. Mountains are tall and majestic. Rivers flow to the sea. Trees provide shade and oxygen. Flowers bloom in spring. The seasons change throughout the year. People live in houses and apartments. Cars drive on roads. Planes fly in the air. Boats sail on water.

I hope this sample text helps you understand how the analyzer works. You can replace it with your own text for analysis. It should contain various types of words, including pronouns, prepositions, articles, and other parts of speech. The analyzer will count these elements and display the results for you.`;
    
    document.getElementById('text-input').value = sampleText;
}

/**
 * Main function to analyze the input text
 */
function analyzeText() {
    const text = document.getElementById('text-input').value;
    
    if (!text.trim()) {
        alert('Please enter some text to analyze.');
        return;
    }
    
    // Perform all analyses
    const basicCounts = countBasicElements(text);
    const pronounCounts = countPartsOfSpeech(text, pronouns, 'pronouns');
    const prepositionCounts = countPartsOfSpeech(text, prepositions, 'prepositions');
    const articleCounts = countPartsOfSpeech(text, articles, 'indefinite articles');
    
    // Display results
    displayBasicCounts(basicCounts);
    displayWordCounts(pronounCounts, 'pronouns-count', 'Pronouns');
    displayWordCounts(prepositionCounts, 'prepositions-count', 'Prepositions');
    displayWordCounts(articleCounts, 'articles-count', 'Indefinite Articles');
}

/**
 * Counts basic text elements: letters, words, spaces, newlines, special symbols
 * @param {string} text - The input text to analyze
 * @return {Object} Object containing counts of basic elements
 */
function countBasicElements(text) {
    const counts = {
        letters: 0,
        words: 0,
        spaces: 0,
        newlines: 0,
        specialSymbols: 0
    };
    
    // Count letters, spaces, newlines, and special symbols
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (/[a-zA-Z]/.test(char)) {
            counts.letters++;
        } else if (char === ' ') {
            counts.spaces++;
        } else if (char === '\n') {
            counts.newlines++;
        } else if (!/\w/.test(char) && char !== ' ' && char !== '\n') {
            counts.specialSymbols++;
        }
    }
    
    // Count words by splitting on whitespace and filtering out empty strings
    counts.words = text.split(/\s+/).filter(word => word.length > 0).length;
    
    return counts;
}

/**
 * Counts occurrences of specific parts of speech
 * @param {string} text - The input text to analyze
 * @param {Array} wordList - Array of words to count
 * @param {string} type - Type of words being counted (for logging)
 * @return {Object} Object with words as keys and counts as values
 */
function countPartsOfSpeech(text, wordList, type) {
    const counts = {};
    
    // Initialize counts for all words in the list
    wordList.forEach(word => {
        counts[word] = 0;
    });
    
    // Create a regex pattern that matches whole words only
    const pattern = new RegExp('\\b(' + wordList.join('|') + ')\\b', 'gi');
    
    // Find all matches
    const matches = text.match(pattern) || [];
    
    // Count occurrences
    matches.forEach(match => {
        const lowerMatch = match.toLowerCase();
        if (counts.hasOwnProperty(lowerMatch)) {
            counts[lowerMatch]++;
        }
    });
    
    return counts;
}

/**
 * Displays basic count statistics in the results area
 * @param {Object} counts - Object containing count values
 */
function displayBasicCounts(counts) {
    const container = document.getElementById('basic-counts');
    container.innerHTML = `
        <h3>Basic Text Statistics</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr style="background-color: rgba(0,204,204,0.1);">
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #444;">Element</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #444;">Count</th>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #333;">Letters</td>
                <td style="text-align: right; padding: 8px; border-bottom: 1px solid #333;">${counts.letters}</td>
            </tr>
            <tr style="background-color: rgba(0,0,0,0.2);">
                <td style="padding: 8px; border-bottom: 1px solid #333;">Words</td>
                <td style="text-align: right; padding: 8px; border-bottom: 1px solid #333;">${counts.words}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #333;">Spaces</td>
                <td style="text-align: right; padding: 8px; border-bottom: 1px solid #333;">${counts.spaces}</td>
            </tr>
            <tr style="background-color: rgba(0,0,0,0.2);">
                <td style="padding: 8px; border-bottom: 1px solid #333;">Newlines</td>
                <td style="text-align: right; padding: 8px; border-bottom: 1px solid #333;">${counts.newlines}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #333;">Special Symbols</td>
                <td style="text-align: right; padding: 8px; border-bottom: 1px solid #333;">${counts.specialSymbols}</td>
            </tr>
        </table>
    `;
}

/**
 * Displays word count statistics in the results area
 * @param {Object} counts - Object with words and their counts
 * @param {string} containerId - ID of the container to update
 * @param {string} title - Title for this section
 */
function displayWordCounts(counts, containerId, title) {
    const container = document.getElementById(containerId);
    
    // Get non-zero counts and sort by count (descending)
    const nonZeroCounts = Object.entries(counts)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
    // Calculate total count
    const totalCount = nonZeroCounts.reduce((sum, [_, count]) => sum + count, 0);
    
    // Generate HTML
    let html = `<h3>${title} Count</h3>`;
    
    if (nonZeroCounts.length === 0) {
        html += `<p>No ${title.toLowerCase()} found in the text.</p>`;
    } else {
        html += `<p>Total ${title.toLowerCase()} found: ${totalCount}</p>`;
        html += `<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr style="background-color: rgba(0,204,204,0.1);">
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #444;">${title.slice(0, -1)}</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #444;">Count</th>
            </tr>`;
        
        nonZeroCounts.forEach(([word, count], index) => {
            const rowStyle = index % 2 === 1 ? 'background-color: rgba(0,0,0,0.2);' : '';
            html += `
                <tr style="${rowStyle}">
                    <td style="padding: 8px; border-bottom: 1px solid #333;">${word}</td>
                    <td style="text-align: right; padding: 8px; border-bottom: 1px solid #333;">${count}</td>
                </tr>
            `;
        });
        
        html += `</table>`;
    }
    
    container.innerHTML = html;
}

// Lists of words to count
const pronouns = [
    'i', 'me', 'my', 'mine', 'myself',
    'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves',
    'who', 'whom', 'whose', 'which', 'that',
    'this', 'these', 'those'
];

const prepositions = [
    'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at',
    'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
    'concerning', 'considering',
    'despite', 'down', 'during',
    'except',
    'for', 'from',
    'in', 'inside', 'into',
    'like',
    'near',
    'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
    'past', 'per',
    'regarding',
    'since',
    'through', 'throughout', 'to', 'toward', 'towards',
    'under', 'underneath', 'until', 'unto', 'up', 'upon',
    'with', 'within', 'without'
];

const articles = [
    'a', 'an'  // Indefinite articles only as specified in the requirements
];