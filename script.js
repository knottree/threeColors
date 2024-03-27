document.addEventListener('DOMContentLoaded', function() {
    let generatedCode = ''; // To store the generated code globally

    document.getElementById('generateCode').addEventListener('click', function() {
        if (!generatedCode) { // Generate code only if it hasn't been generated yet
            generatedCode = generateCode();
            document.getElementById('enterCode').value = generatedCode; // Place generated code into the enterCode input
        }
        // Change button text and functionality to "Copy Code to Send"
        this.textContent = 'Copy Code to Send';
        this.removeEventListener('click', arguments.callee); // Remove the current event listener
        this.addEventListener('click', function() {
            const fullMessage = `https://knottree.github.io/threeColors/\n\nCode to enter: ${generatedCode}`;
            navigator.clipboard.writeText(fullMessage).then(() => {
                alert('Code copied to clipboard. Ready to share via SMS!');
            });
        });
    });

    document.getElementById('startColors').addEventListener('click', function() {
        // Directly use the code from the enterCode input
        const codeToUse = document.getElementById('enterCode').value;
        if (codeToUse && isValidCode(codeToUse)) {
            cycleColors(codeToUse);
        } else {
            alert('Invalid code. Please check the code and try again.');
        }
    });

    function generateCode() {
        const colorCodes = ['AB', 'CD', 'EF', 'GH', 'IJ'];
        let selectedColors = [];

        while(selectedColors.length < 3){
            const randomCode = colorCodes[Math.floor(Math.random() * colorCodes.length)];
            if(!selectedColors.includes(randomCode)){
                selectedColors.push(randomCode);
            }
        }

        return selectedColors.join('&');
    }

    function cycleColors(code) {
        const colorMap = {
            'AB': 'red',
            'CD': 'green',
            'EF': 'blue',
            'GH': 'yellow',
            'IJ': 'violet'
        };

        const colors = code.split('&').map(param => colorMap[param] || null).filter(Boolean);

        if (colors.length < 3) {
            alert('Invalid code. Please check the code and try again.');
            return;
        }

        let i = 0;
        document.getElementById('colorDisplay').style.display = 'block';

        setInterval(() => {
            document.getElementById('colorDisplay').style.backgroundColor = colors[i % colors.length];
            i++;
        }, 1500);
    }

    function isValidCode(code) {
        const validCodes = ['AB', 'CD', 'EF', 'GH', 'IJ'];
        const enteredCodes = code.split('&');
        return enteredCodes.length === 3 && enteredCodes.every(code => validCodes.includes(code));
    }
});