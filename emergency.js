// emergency.js
// All JavaScript logic for Emergency Service project

let coins = 100;
let copyCount = 0;

function updateCoinDisplay() {
    var coinSpan = document.getElementById('coin-count');
    coinSpan.innerHTML = '<img src="assets/coin.png" alt="" style="display:inline;vertical-align:middle;width:20px;height:20px;margin-left:4px;">' + coins;
}

function toggleFavorite(btn) {
    btn.classList.toggle('text-red-500');
    btn.classList.toggle('text-gray-300');
    if (btn.classList.contains('text-red-500')) {
        btn.innerHTML = '♥';
    } else {
        btn.innerHTML = '♡';
    }
}

function copyNumber(number) {
    navigator.clipboard.writeText(number).then(() => {
        copyCount++;
        document.getElementById('copy-count-header').textContent = copyCount;
        alert(`Number ${number} copied! Total copies: ${copyCount}`);
    }).catch(() => {
        alert(`Failed to copy ${number}`);
    });
}

function callNumber(number, service) {
    if (coins < 20) {
        alert('Not enough coins! You need at least 20 coins to make a call.');
        showToast('Not enough coins!');
        return;
    }
    coins -= 20;
    updateCoinDisplay();
    alert(`Calling ${service}: ${number}`);
    addToCallHistory(service, number);
    showToast(`Calling ${service}: ${number}`);
}

function addToCallHistory(service, number) {
    const historyContainer = document.getElementById('call-history');
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const historyItem = document.createElement('div');
    historyItem.className = 'flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0';
    historyItem.innerHTML = `
        <div class="flex-1">
            <div class="font-medium text-gray-900 text-sm">${service}</div>
            <div class="text-gray-500 text-xs">${number}</div>
        </div>
        <div class="text-gray-400 text-xs">${time}</div>
    `;

    historyContainer.insertBefore(historyItem, historyContainer.firstChild);

    while (historyContainer.children.length > 10) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

function clearHistory() {
    document.getElementById('call-history').innerHTML = '';
    showToast('Call history cleared');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

window.onload = function() {
    updateCoinDisplay();
    document.getElementById('copy-count-header').textContent = copyCount;
};
