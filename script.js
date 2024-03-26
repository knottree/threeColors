document.getElementById('generateLink').addEventListener('click', function() {
    const link = generateLink();
    document.getElementById('linkDisplay').value = window.location.origin + '/' + link;
});

function generateLink() {
    const colorCodes = ['AB', 'CD', 'EF', 'GH', 'IJ']; // Representing Red, Green, Blue, Yellow, Violet
    let selectedColors = [];

    // Randomly select 3 unique color codes
    while(selectedColors.length < 3){
        const randomCode = colorCodes[Math.floor(Math.random() * colorCodes.length)];
        if(!selectedColors.includes(randomCode)){
            selectedColors.push(randomCode);
        }
    }

    return 'meet?' + selectedColors.join('&');
}

if (window.location.search.startsWith('?')) {
    document.getElementById('linkGenerator').style.display = 'none';
    cycleColors();
}

function cycleColors() {
    const colorMap = {
        'AB': 'red',
        'CD': 'green',
        'EF': 'blue',
        'GH': 'yellow',
        'IJ': 'violet'
    };

    const queryParams = window.location.search.substring(1).split('&');
    const colors = queryParams.map(param => colorMap[param]);

    let i = 0;
    document.getElementById('colorDisplay').style.display = 'block';

    setInterval(() => {
        document.getElementById('colorDisplay').style.backgroundColor = colors[i % colors.length];
        i++;
    }, 1000);
}
