async function pingRingba() {
    const cid = document.getElementById('cid').value;
    const zip = document.getElementById('zipcode').value;
    const statusDiv = document.getElementById('status');

    statusDiv.style.display = "block";
    statusDiv.innerHTML = "Sending ping...";

    const url = `https://rtb.ringba.com/v1/production/618e2f522f3a467791b46a25f3f33cc5.json?CID=${cid}&zipcode=${zip}&subid=yes&exposeCallerid=yes`;

    try {
        await fetch(url, {
            method: 'GET',
            mode: 'no-cors', // This tells the browser not to panic about CORS
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Because of 'no-cors', we can't actually read the response body.
        // We can only assume it sent correctly if the promise didn't fail.
        statusDiv.className = "success";
        statusDiv.innerHTML = "Ping sent successfully! (Check Ringba reporting for bid details)";
        
    } catch (error) {
        statusDiv.className = "error";
        statusDiv.innerHTML = "Failed to send ping.";
        console.error(error);
    }
}
