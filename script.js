async function pingRingba() {
    const cid = document.getElementById('cid').value;
    const zip = document.getElementById('zipcode').value;
    const statusDiv = document.getElementById('status');
    
    if (!cid || !zip) {
        alert("Please enter both Phone and Zip");
        return;
    }

    statusDiv.style.display = "block";
    statusDiv.innerHTML = "Connecting to Ringba...";
    statusDiv.className = "";

    const baseUrl = "https://rtb.ringba.com/v1/production/618e2f522f3a467791b46a25f3f33cc5.json";
    const queryParams = `?CID=${cid}&zipcode=${zip}&subid=yes&exposeCallerid=yes`;
    
    // We wrap the URL in a CORS proxy to bypass the browser block
    const proxiedUrl = "https://corsproxy.io/?" + encodeURIComponent(baseUrl + queryParams);

    try {
        const response = await fetch(proxiedUrl);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        // Standard Ringba RTB check
        if (data && data.bid > 0) {
            statusDiv.className = "success";
            statusDiv.innerHTML = `<strong>Lead Qualified!</strong><br>Potential Payout: $${data.bid}`;
        } else {
            statusDiv.className = "error";
            statusDiv.innerHTML = "No buyers available or lead already exists.";
        }
    } catch (error) {
        statusDiv.className = "error";
        statusDiv.innerHTML = "Error: Could not reach the server. Please check your connection or contact support.";
        console.error("CORS/Fetch Error:", error);
    }
}
