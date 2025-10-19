// Typing effect function
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);
        
        function type() {
            if (i < text.length) {
                // Replace cursor with current character
                if (cursor.previousSibling) {
                    cursor.previousSibling.textContent += text.charAt(i);
                } else {
                    element.textContent = text.charAt(i);
                    element.appendChild(cursor);
                }
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor when finished
                cursor.remove();
                resolve();
            }
        }
        
        // Clear element and start typing
        element.textContent = '';
        element.appendChild(cursor);
        type();
    });
}

// Countdown dan redirect dengan progress update
function startCountdown() {
    let count = 5;
    const countdownElement = document.getElementById('countdown');
    const progressElement = document.querySelector('.progress');
    const progressText = document.getElementById('progress-text');
    let countdownInterval;
    
    function updateCountdown() {
        count--;
        countdownElement.textContent = count;
        
        // Update progress percentage
        const progressPercent = Math.max(0, (count / 5) * 100);
        progressText.textContent = `${Math.round(progressPercent)}%`;
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            redirectToMainSite();
        }
    }
    
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Tombol skip
    document.getElementById('skip-btn').addEventListener('click', () => {
        clearInterval(countdownInterval);
        progressText.textContent = '0%';
        redirectToMainSite();
    });
    
    // Tombol cancel/understand
    document.getElementById('cancel-btn').addEventListener('click', () => {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-section').style.display = 'none';
        document.getElementById('skip-btn').textContent = 'Proceed to Main Site';
        document.getElementById('cancel-btn').style.display = 'none';
        
        // Tampilkan konfirmasi
        const confirmation = document.createElement('div');
        confirmation.className = 'final-note';
        confirmation.style.background = 'rgba(0, 255, 204, 0.1)';
        confirmation.style.border = '1px solid rgba(0, 255, 204, 0.3)';
        confirmation.style.color = '#00ffcc';
        confirmation.innerHTML = '✅ You have acknowledged the risks. Click "Proceed to Main Site" when ready.';
        
        document.querySelector('.button-group').parentNode.insertBefore(confirmation, document.querySelector('.button-group'));
    });
}

// Fungsi redirect ke website utama
function redirectToMainSite() {
    // Tambahkan efek transisi sebelum redirect
    const card = document.querySelector('.welcome-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px)';
    card.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        window.location.href = 'https://kyluesky.netlify.app/';
    }, 500);
}

// Inisialisasi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    // Start typing effect
    const typingElement = document.getElementById('typing-text');
    await typeWriter(typingElement, 'Hi, Welcome to Lyora Exploit', 70);
    
    // Start countdown after typing finishes
    startCountdown();
});