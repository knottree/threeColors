document.addEventListener('DOMContentLoaded', function() {
    let generatedCode = ''; // To store the generated code globally

    const generateCodeBtn = document.getElementById('generateCode');
    generateCodeBtn.addEventListener('click', function() {
        if (!generatedCode) { // Generate code only if it hasn't been generated yet
            generatedCode = generateCode();
            document.getElementById('codeDisplay').value = generatedCode;
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
        // Use the generated code if available; otherwise, use the manually entered code
        const codeToUse = generatedCode || document.getElementById('enterCode').value;
        if (codeToUse) {
            cycleColors(codeToUse);
        } else {
            alert('Please generate or enter a code first.');
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

        const colors = code.split('&').map(param => colorMap[param]);

        let i = 0;
        document.getElementById('colorDisplay').style.display = 'block';

        setInterval(() => {
            document.getElementById('colorDisplay').style.backgroundColor = colors[i % colors.length];
            i++;
        }, 1000);
    }
});