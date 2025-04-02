document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("text-input");
    const checkButton = document.getElementById("check-btn");
    const resultDiv = document.getElementById("result");

    checkButton.addEventListener("click", function () {
        const userInput = inputField.value.trim();
        
        if (userInput === "") {
            resultDiv.style.display = "block";
            resultDiv.textContent = "Silakan masukkan teks terlebih dahulu.";
            return;
        }
        
        const processedInput = userInput.toLowerCase().replace(/[^a-z0-9]/g, "");
        const reversedInput = processedInput.split("").reverse().join("");
        
        if (processedInput === reversedInput) {
            resultDiv.style.display = "block";
            resultDiv.textContent = `\u2705 '${userInput}' adalah palindrome!`;
        } else {
            resultDiv.style.display = "block";
            resultDiv.textContent = `\u274C '${userInput}' bukan palindrome.`;
        }
    });
});
