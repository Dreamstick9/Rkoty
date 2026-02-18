const scanBtn = document.getElementById('scan-btn');
const terminal = document.getElementById('terminal');

// Helper function to print messages to our fake terminal
function logToTerminal(message, className = "system") {
    const newLine = document.createElement('div');
    newLine.textContent = `> ${message}`;
    newLine.className = className;
    terminal.appendChild(newLine);
    // Auto-scroll to bottom
    
    terminal.scrollTop = terminal.scrollHeight;
}

// YOUR TURN: Part 1 - Create the Promise
function runSecurityScan() {
    // 1. Return a new Promise that takes (resolve, reject)
    // 2. Inside the Promise, use setTimeout to wait 2.5 seconds (2500 ms).
    // 3. Inside the setTimeout, generate a random number between 1 and 10.
    // 4. If the number is greater than 3, resolve with "Scan complete: No vulnerabilities found."
    // 5. If the number is 3 or less, reject with "CRITICAL ERROR: Connection to target lost!"
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let k = Math.floor(Math.random()*10) + 1
            if (k > 3){
                resolve("Scan complete: No vulnerabilities found.")
            }else{
                reject("CRITICAL ERROR: Connection to target lost!")
            }
        },2500)
    })
}

// YOUR TURN: Part 2 - Consume the Promise
scanBtn.addEventListener('click', () => {
    // Disable button so we can't spam it
    scanBtn.disabled = true;
    logToTerminal("Initializing port scan... please wait.", "system");

    // 1. Call runSecurityScan()
    runSecurityScan()
    .then(function(message){
        logToTerminal(message, "success")
    })
    .catch(function(error){
        logToTerminal(error, "error")
    })
    .finally(()=>{
        scanBtn.disabled = false
    })
    // 2. Chain a .then() to catch the success message. 
    //    -> Use logToTerminal(message, "success") to display it.
    // 3. Chain a .catch() to catch the error message.
    //    -> Use logToTerminal(error, "error") to display it.
    // 4. Chain a .finally() to re-enable the scanBtn (scanBtn.disabled = false).
    
    
});