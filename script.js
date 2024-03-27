let generatedCode = ''; // To store the generated code globally

document.getElementById('generateCode').addEventListener('click', function() {
    generatedCode = generateCode();
    document.getElementById('codeDisplay').value = generatedCode;
    this.textContent = 'Copy Code to Send';
    this.id = 'copyCode'; // Change the button ID to handle the new functionality
    document.getElementById('codeEntry').style.display = 'none'; // Hide the Enter Code field

    // Listen to the new button for copying functionality
    document.getElementById('copyCode').addEventListener('click', function() {
        const fullMessage = `https://knottree.github.io/threeColors/\n\nCode to enter: ${generatedCode}`;
        navigator.clipboard.writeText(fullMessage).then(() => {
            alert('Code copied to clipboard. Ready to share via SMS!');
        });
    });
});

document.getElementById('startColors').addEventListener('click', function() {
    if (generatedCode) { // If a code was generated, use it directly
        cycleColors(generatedCode);
    } else { // Otherwise, use the manually entered code
        const enteredCode = document.getElementById('enterCode').value;
        if (enteredCode) {
            cycleColors(enteredCode);
        }
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
    document.getElementById('codeGenerator').style.display = 'none';
    document.getElementById('codeEntry').style.display = 'none';

    setInterval(() => {
        document.getElementById('colorDisplay').style.backgroundColor = colors[i % colors.length];
        i++;
    }, 1000);
}