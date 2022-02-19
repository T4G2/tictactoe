/* API from: https://piskvorky.jobs.cz/api/doc

*/

const PAGEURL = "https://piskvorky.jobs.cz"
const REGISTERURL = PAGEURL + "/api/v1/user"

function register(name, email) {
    let xhr = new XMLHttpRequest();
       
            // open a connection
            xhr.open("POST", REGISTERURL, true);
 
            // Set the request header i.e. which type of content you are sending
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", PAGEURL);
 
            // Create a state change callback
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
 
                    // Print received data from server
                    result.innerHTML = this.responseText;
 
                }
            };
 
            // Converting JSON data to string
            var data = JSON.stringify({});
 
            // Sending data with the request
            xhr.send(data);
}


function play() {
    const eventSource = new EventSource('https://mercure-server.jobs.cz/.well-known/mercure?topic=' + encodeURIComponent('five-in-a-row/' + [GAME_ID]));

    eventSource.onmessage = event => {
        console.log(JSON.parse(event.data));

        
    }
}