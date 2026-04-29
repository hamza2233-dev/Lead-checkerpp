async function pingRingba() {
    const cid = document.getElementById('cid').value;
    const zip = document.getElementById('zipcode').value;
    const statusDiv = document.getElementById('status');
    
    // Validate inputs
    if (!cid || !zip) {
        alert("Please enter both Phone and Zip");
        return;
    }

    statusDiv.style.display = "block";
    statusDiv.innerHTML = "Pinging Buyer...";
    statusDiv.className = "";

    // Your Ringba RTB URL
    const baseUrl = "https://rtb.ringba.com/v1/production/618e2f522f3a467791b46a25f3f33cc5.json";
    const fullUrl = `${baseUrl}?CID=${cid}&zipcode=${zip}&subid=yes&exposeCallerid=yes`;

    try {
        const response = await fetch(fullUrl);
        const data = await response.json();

        // Checking if the response has a bid or success
        if (data && data.bid > 0) {
            statusDiv.className = "success";
            statusDiv.innerHTML = `<strong>Lead Qualified!</strong><br>Bid Price: $${data.bid}`;
        } else {
            statusDiv.className = "error";
            statusDiv.innerHTML = "No active buyers for this lead at the moment.";
        }
    } catch (error) {
        statusDiv.className = "error";
        statusDiv.innerHTML = "Connection Error. Check if CORS is allowed on the Ringba endpoint.";
        console.error("Error:", error);
    }
}
