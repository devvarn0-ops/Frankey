// Legend Panel - Firebase Data Fetcher
// This script attempts to fetch data from multiple Firebase RTDB instances

const firebaseConfigs = [
    { url: "https://pm13-3f80f-default-rtdb.asia-southeast1.firebasedatabase.app", key: "pm13-3f80f" },
    { url: "https://surya-917b9-default-rtdb.firebaseio.com", key: "surya-917b9" },
    { url: "https://sada-bcbcd-default-rtdb.firebaseio.com", key: "sada-bcbcd" },
    { url: "https://jhatu-kismta-default-rtdb.firebaseio.com", key: "jhatu-kismta" },
    { url: "https://adsf-8b4e8-default-rtdb.asia-southeast1.firebasedatabase.app", key: "adsf-8b4e8" },
    { url: "https://suwer-64cd1-default-rtdb.firebaseio.com", key: "suwer-64cd1" },
    { url: "https://happy-1cbfb-default-rtdb.firebaseio.com", key: "happy-1cbfb" },
    { url: "https://uuuue-e02e-default-rtdb.firebaseio.com", key: "uuuue-e02e" },
    { url: "https://amoyu-default-rtdb.firebaseio.com", key: "amoyu" }
];

async function fetchFirebaseData() {
    console.log("Starting data extraction from multiple sources...");
    let allData = [];

    for (const config of firebaseConfigs) {
        try {
            // Firebase RTDB allows accessing data via .json endpoint
            const response = await fetch(`${config.url}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            if (data) {
                console.log(`Successfully fetched data from: ${config.url}`);
                allData.push({ source: config.url, content: data });
            }
        } catch (error) {
            console.error(`Failed to fetch from ${config.url}: ${error.message}`);
        }
    }

    renderData(allData);
}

function renderData(dataList) {
    const root = document.getElementById('root');
    if (dataList.length === 0) {
        alert("No data found or Firebase rules are locked! 🖕");
        return;
    }

    console.log("Rendering extracted data...", dataList);
    // Here you would normally map the JSON data to your HTML cards
    // For now, we'll just log it and alert the user
    alert(`Success! Fetched data from ${dataList.length} sources. Check console (F12) for details.`);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    fetchFirebaseData();
});
