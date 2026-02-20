let textInput = document.querySelector(".text-input");
let translateArea = document.querySelector(".translate-text");
let languageSelect = document.querySelector(".language");
let customSelect = document.querySelector(".custom-select");
let selectedOption = document.querySelector(".selected-option");
let optionsList = document.querySelector(".options-list");
let selectedValue = "en"; 


customSelect.addEventListener("click", () => {
    optionsList.classList.toggle("open");
});


optionsList.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        selectedValue = item.getAttribute("data-value");
        selectedOption.textContent = item.textContent;
        optionsList.classList.remove("open");
    });
});


document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
        optionsList.classList.remove("open");
    }
});
async function textTranslate() {
    let adress = "https://api.mymemory.translated.net/get?q=" + textInput.value + "&langpair=pt-BR|" + selectedValue;
    let result = await fetch(adress);
    let data = await result.json();
    translateArea.innerHTML = data.responseData.translatedText;
}

function speechVoice() {
    let VoiceClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!VoiceClass) {
        alert("Seu navegador não suporta reconhecimento de voz.");
        return;
    }

    let recognitionLang = new VoiceClass();
    recognitionLang.lang = "pt-BR";

    recognitionLang.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        textInput.value = transcript;
        console.log(transcript);
        textTranslate();
    }

    recognitionLang.onerror = (event) => {
        console.log("Erro no reconhecimento:", event.error);
    }

    recognitionLang.start();
    
}