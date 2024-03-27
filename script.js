let generatedCode = ''; // To store the generated code globally

document.getElementById('generateCode').addEventListener('click', function() {
    generatedCode = generateCode();
    document.getElementById('codeDisplay').value = generatedCode;
    document.getElementById('codeGenerator').replaceChild(createCopyButton(), this); // Replace with "Copy Code to Send" button
    document.getElementById('codeEntry').style.display = 'none'; // Hide the Enter Code field
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

function createCopyButton() {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy Code to Send';
    copyBtn.addEventListener('click', function() {
        const fullMessage = `https://knottree.github.io/threeColors/\n\nCode to enter: ${generatedCode}`;
        navigator.clipboard.writeText(fullMessage).then(() => {
            alert('Code copied to clipboard. Ready to share via SMS!');
        });
    });
    return copyBtn;
}

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