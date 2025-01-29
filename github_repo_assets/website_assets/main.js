
/* The entrypoint of this low-code, no-tooling JS website */

// ==============================================
// Code Init
console.log('Main script started...');
const isRunningLocally = window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('localhost')
console.log('Checking if site is running locally (in local environments the script pathing is different):',  isRunningLocally)

let excerciseList;
if (isRunningLocally) {
    const response = await fetch('./local_file_list.json')
    excerciseList = await response.json()
} else {
    const response = await fetch('./file_list.json')
    excerciseList = await response.json()
}
console.log('Excercise list:', excerciseList);

// Adding p5.js libraries from the project root path
const p5jsLib = document.createElement('script')
p5jsLib.src =  isRunningLocally ? '/libraries/p5.min.js' : './libraries/p5.min.js'
document.head.appendChild(p5jsLib);

setTimeout(() => {
    const p5jsSoundLib = document.createElement('script')
    p5jsSoundLib.src = isRunningLocally ? '/libraries/p5.sound.min.js' : './libraries/p5.sound.min.js'
    document.head.appendChild(p5jsSoundLib);
}, 500)




// ==============================================
// Excerise Module import/caching logic.
const importedExcercises = []
async function getExcercise(excercisePath) {
    // Module loading/caching logic
    let excerciseModule = importedExcercises.find(excercise => excercise.name === excercisePath);
    if (!excerciseModule) {
        let importStr;
        if (isRunningLocally) {
            importStr = '/' + excercisePath;
        } else {
            importStr = './' + excercisePath;
        }

        const module = await import(importStr);
        excerciseModule = { name: excercisePath, module }; 
        importedExcercises.push(excerciseModule);
        console.log(importedExcercises)
    }
    return excerciseModule;
}


// ==============================================
// On select listener + option population
const selectDropdown = document.getElementById('excercise-select');
for (let excercise of excerciseList) {
    const option = document.createElement('option');
    option.value = excercise;
    option.innerHTML = excercise;
    selectDropdown.appendChild(option)
}

selectDropdown.onchange = async (e) => {
    const excerciseStr = e.target.value;
    console.log('Swapping to: ', excerciseStr);
    const excerciseModule = await getExcercise(excerciseStr);

    // Loading modules.
    window.setup = excerciseModule.module.setup;
    window.draw = excerciseModule.module.draw;
    setup()
}

// Need to create a canvas on init, else p5.js won't init in the global context.
window.setup = () => {
    createCanvas(1,1)
}
