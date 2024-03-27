document.getElementById('generateCode').addEventListener('click', function() {
    const code = generateCode();
    document.getElementById('codeDisplay').value = code;
});

document.getElementById('startColors').addEventListener('click', function() {
    const enteredCode = document.getElementById('enterCode').value;
    if (enteredCode) {
        cycleColors(enteredCode);
    }
});

function generateCode() {
    const colorCodes = ['AB', 'CD', 'EF', 'GH', 'IJ']; // Representing Red, Green, Blue, Yellow, Violet
    let selectedColors = [];

    // Randomly select 3 unique color codes
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