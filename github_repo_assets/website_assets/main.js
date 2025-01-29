
/* The entrypoint of this low-code, no-tooling JS website */

console.log('Main script started...');
const isRunningLocally = window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('localhost')

console.log('Checking if site is running locally (in local environments the script pathing is different):',  isRunningLocally)

if (isRunningLocally) {
    // Adding p5.js libraries from the project root path

    const p5jsLib = document.createElement('script')
    p5jsLib.src = '/libraries/p5.min.js'
    document.head.appendChild(p5jsLib);

    setTimeout(() => {
        const p5jsSoundLib = document.createElement('script')
        p5jsSoundLib.src = '/libraries/p5.sound.min.js'
        document.head.appendChild(p5jsSoundLib);
    }, 500)
}


// Will need to add an onselect listener to the select
// Will need to populate the select options.

const module1 = await import('/the-nature-of-code/chapter-0/alanas/0.1-walker.js')

console.log(module1)
window.setup = module1.setup;
window.draw = module1.draw;



setTimeout(async () => {
    const module2 = await import('/the-nature-of-code/chapter-0/alanas/0.2-random-number-distribution.js')

    clear();
    window.setup = module2.setup;
    window.draw = module2.draw;
    setup();

}, 15000)