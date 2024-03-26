document.addEventListener("DOMContentLoaded", function() {
    const currentRunInput = document.getElementById("currentRun");
    const currentOverInput = document.getElementById("currentOver");
    const currentRunRateSpan = document.getElementById("currentRunRate");
    const projectedScoresTable = document.getElementById("projectedScores");
    const targetScoreInput = document.getElementById("targetScore");
    const requiredRunRateSpan = document.getElementById("requiredRunRate");
    const actualRequiredRunRateSpan = document.getElementById("actualRequiredRunRate");
    const anotherRequiredRunRateSpan = document.getElementById("anotherRequiredRunRate");
    const targetRunInput = document.getElementById("targetRun");
    const targetOverInput = document.getElementById("targetOver");

    function calculateProjectedScore() {
        const currentRun = parseFloat(currentRunInput.value);
        const currentOver = parseFloat(currentOverInput.value);

        // Check if both inputs are present
        if (!isNaN(currentRun) && !isNaN(currentOver) && currentOver !== 0) {
            // Clear previous projected scores
            clearProjectedScores();

            // Calculate projected scores for each run rate and populate the table
            const runRates = [-2, -1, 0, 1, 2];
            const currentRunRate = (currentRun / currentOver).toFixed(2);
            const updatedRunRates = runRates.map(rate => (parseFloat(currentRunRate) + rate).toFixed(2));

            updatedRunRates.forEach((runRate, index) => {
                // Calculate projected scores for each run rate
                const projectedScores = [];
                const overs = [5, 10, 12, 15, 20];
                overs.forEach(over => {
                    const projectedScore = Math.floor(runRate * over);
                    projectedScores.push(projectedScore);
                });

                // Create a new row for each run rate
                const newRow = projectedScoresTable.insertRow();
                newRow.insertCell(0).innerText = runRate;

                // Populate cells with projected scores
                projectedScores.forEach(score => {
                    newRow.insertCell().innerText = score;
                });

                // Highlight row if it corresponds to the current run rate
                if (runRate === currentRunRate) {
                    newRow.classList.add("highlight");
                }
            });

            // Update current run rate display
            currentRunRateSpan.innerText = currentRunRate;

            // Calculate required run rate if target is present
            const targetScore = parseFloat(targetScoreInput.value);
            if (!isNaN(targetScore)) {
                const requiredRunRate = (targetScore / 20).toFixed(2);
                requiredRunRateSpan.innerText = requiredRunRate;
            } else {
                requiredRunRateSpan.innerText = "N/A";
            }
			
			calculateActualRequiredRunRate();
        } else {
            // If one or both inputs are missing, display a message
            currentRunRateSpan.innerText = "N/A";
            clearProjectedScores();
        }
    }

    function calculateActualRequiredRunRate() {
        const currentRun = parseFloat(currentRunInput.value);
        const currentOver = parseFloat(currentOverInput.value);
        const targetRun = parseFloat(targetRunInput.value);
        const targetOver = parseFloat(targetOverInput.value);

        // Check if all inputs are present
        if (!isNaN(currentRun) && !isNaN(currentOver) && !isNaN(targetRun) && !isNaN(targetOver) && targetOver !== 0) {
            const actualRequiredRunRate = ((targetRun - currentRun) / (targetOver - currentOver)).toFixed(2);
            actualRequiredRunRateSpan.innerText = actualRequiredRunRate;

            // Calculate another required run rate
            const anotherRequiredRunRate = (targetRun / targetOver).toFixed(2);
            anotherRequiredRunRateSpan.innerText = anotherRequiredRunRate;
        } else {
            actualRequiredRunRateSpan.innerText = "N/A";
            anotherRequiredRunRateSpan.innerText = "N/A";
        }
    }

    function clearProjectedScores() {
        // Clear all rows in the projected scores table except the header row
        while (projectedScoresTable.rows.length > 1) {
            projectedScoresTable.deleteRow(1);
        }
    }

    // Event listeners for input change
    currentRunInput.addEventListener("input", calculateProjectedScore);
    currentOverInput.addEventListener("input", calculateProjectedScore);
    targetScoreInput.addEventListener("input", calculateProjectedScore);

    // Event listeners for "Predict for" inputs
    targetRunInput.addEventListener("input", calculateActualRequiredRunRate);
    targetOverInput.addEventListener("input", calculateActualRequiredRunRate);
});
