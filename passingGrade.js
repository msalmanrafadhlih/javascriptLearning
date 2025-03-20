
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getAverage(scores) {
    let sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
}

function getGrade(score) {
    if (score === 100) return "A++";
    else if (score >= 90) return "A";
    else if (score >= 80) return "B";
    else if (score >= 70) return "C";
    else if (score >= 60) return "D";
    else return "F";
}

function hasPassingGrade(score) {
    return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
    let classAverage = getAverage(totalScores);
    let grade = getGrade(studentScore);
    return hasPassingGrade(studentScore)
        ? `Class average: ${classAverage}. Your grade: ${grade}. You passed the course.`
        : `Class average: ${classAverage}. Your grade: ${grade}. You failed the course.`;
}

let scores = [];
let index = 0;

function askForScore() {
    if (index < 10) {
        rl.question(`Masukkan nilai ${index + 1}: `, (input) => {
            let score = parseInt(input);
            if (!isNaN(score)) {
                scores.push(score);
                index++;
                askForScore(); 
            } else {
                console.log("Harap masukkan angka yang valid.");
                askForScore(); 
            }
        });
    } else {
        rl.close();
        let avgScore = getAverage(scores);
        let grade = getGrade(avgScore);
        let message = studentMsg(scores, avgScore);

        console.log("\n=== Hasil Akhir ===");
        console.log(`Rata-rata: ${avgScore}`);
        console.log(`Nilai Huruf: ${grade}`);
        console.log(message);
    }
}

askForScore();
