// Sample data using filenames from your AudioSampler/Audio folder
const allSamples = [
    { name: "Ah-Ha", file: "ah-ha.mp3" },
    { name: "Back of the net", file: "back-of-the-net.mp3" },
    { name: "Bang out of order", file: "bangoutoforder.mp3" },
    { name: "Dan", file: "dan.mp3" },
    { name: "Email of the evening", file: "emailoftheevening.mp3" },
    { name: "Hello Partridge", file: "hellopartridge.mp3" },
    { name: "I ate a scotch egg", file: "iateascotchegg.mp3" },
    { name: "I'm confused", file: "imconfused.mp3" },
    { name: "Jurassic Park", file: "ah-ha.mp3" }, // Dummy filler
    { name: "Kiss my face", file: "ah-ha.mp3" },  // Page 2 start
    { name: "Goal!", file: "ah-ha.mp3" }
];

let currentPage = 0;
const itemsPerPage = 9;

function updateUI() {
    const grid = document.getElementById('grid-container');
    
    // 1. CLEAR THE GHOST BUTTONS
    grid.innerHTML = ""; 

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = allSamples.slice(start, end);

    // 2. BUILD THE NEW PAGE
    currentItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Correct path to the audio folder
        const audio = new Audio(`AudioSampler/Audio/${item.file}`);
        const displayID = start + index + 10;

        card.innerHTML = `
            <span>${displayID}.</span>
            <b>${item.name}</b>
            <small id="dur-${displayID}">0.00</small>
        `;

        audio.onloadedmetadata = () => {
            document.getElementById(`dur-${displayID}`).innerText = audio.duration.toFixed(2);
        };

        card.onclick = () => {
            audio.currentTime = 0;
            audio.play();
        };

        grid.appendChild(card);
    });

    // 3. UPDATE LABELS & BUTTON VISIBILITY
    document.getElementById('bank-label').innerText = `Sample Bank ${currentPage + 1}`;
    document.getElementById('prev-page').classList.toggle('hidden', currentPage === 0);
    document.getElementById('next-page').classList.toggle('hidden', end >= allSamples.length);
}

// Event Listeners for Pagination
document.getElementById('prev-page').onclick = () => {
    currentPage--;
    updateUI();
};

document.getElementById('next-page').onclick = () => {
    currentPage++;
    updateUI();
};

// TTS Logic
document.getElementById('speak-btn').onclick = () => {
    const text = document.getElementById('tts-input').value;
    if (text.trim()) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
};

// Initial Start
updateUI();