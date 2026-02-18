const checkBtn = document.getElementById('check-btn');
const flightInput = document.getElementById('flight-input');
const statusMsg = document.getElementById('status-msg');
const altRoutesList = document.getElementById('alt-routes-list');

// I built this Promise for you. It simulates finding new flights.
function getAlternativeRoutes(destinationCode) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Returns an array of strings
            resolve([
                `Reroute 1: ${destinationCode} via Dubai`,
                `Reroute 2: ${destinationCode} via London`,
                `Reroute 3: ${destinationCode} Direct (Next Day)`
            ]);
        }, 1000);
    });
}

// YOUR TURN: Part 1 - The Logic Promise
function checkDisruption(flightId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(flightId==''){
                reject("Please enter a flight number.")
            }else if(flightId.length< 4){
                reject("Invalid flight format")
            }else{
                resolve({status: "Delayed", dest : "BRZ"})

            }
            // 1. If flightId is completely empty, reject with "Please enter a flight number."
            // 2. If flightId length is less than 4, reject with "Invalid flight format."
            // 3. Otherwise, resolve with an OBJECT: { status: "Delayed", dest: "BRZ" }
            
            
        }, 1500);
    });
}

// YOUR TURN: Part 2 - Chaining and the DOM
checkBtn.addEventListener('click', () => {
    // Reset UI
    statusMsg.textContent = "Checking systems...";
    statusMsg.className = "warning";
    altRoutesList.innerHTML = ""; // Clears the list
    
    const flightVal = flightInput.value.trim();
    checkDisruption(flightVal)
    .then(function(obj){
        statusMsg.textContent = `Flight is ${obj['status']}. Fetching alternatives...`
        return getAlternativeRoutes(obj['dest'])
    })
    .then(function(pop){
        statusMsg.textContent = "Alternatives found"
        for(let i of pop){
            let li = document.createElement('li')
            li.textContent = i
            altRoutesList.appendChild(li)
        }
    })
    .catch(function(error){
        statusMsg.textContent = error
        statusMsg.className = "error"
    })

    // 1. Call checkDisruption(flightVal)
    // 2. .then() -> Catch the resolved object. 
    //      a. Update statusMsg.textContent to: "Flight is [status]. Fetching alternatives..."
    //      b. RETURN the second promise: return getAlternativeRoutes(data.dest);
    // 3. .then() -> Catch the array of routes from the second promise.
    //      a. Update statusMsg.textContent to "Alternatives found."
    //      b. Loop through the array (using a for loop or .forEach).
    //      c. For each route, use document.createElement('li')
    //      d. Set the li.textContent to the route string.
    //      e. Append the li to altRoutesList using .appendChild()
    // 4. .catch() -> Catch any errors, set statusMsg.textContent to the error, and change its class to "error".
    
    
});