
const sound = new Audio('sound.mp3');
sound.volume = 0.8;

window.addEventListener('message', function (event) {
    const data = event.data;
    if (data.action === 'open') {
        showNotification({
            title: data.title,
            message: data.message,
            color: getColor(data.type),
            duration: data.time || 5000,
            type: data.type
        });
    }
});

function showNotification({ title, message, color = '#4dabf7', duration = 5000, type = 'info' }) {
    
    sound.currentTime = 0;
    sound.play();

    const container = document.querySelector('.notification_container');

    const notification = document.createElement('div');
    notification.classList.add('notification');

    notification.innerHTML = `
        <i class="${getIcon(type)}" style="color: ${color};"></i>
        <div class="content">
            <div class="title">${title}</div>
            <div class="message">${message}</div>
        </div>
    `;

    container.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    setTimeout(() => {
        closeNotification(notification);
    }, duration);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 400);
}

function getColor(type) {
    switch (type) {
        case 'success': return '#69db7c'; 
        case 'info':    return '#4dabf7'; 
        case 'warning': return '#ffd43b'; 
        case 'error':   return '#f03e3e'; 
        default:        return '#bdc3c7'; 
    }
}

function getIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'info':    return 'fas fa-info-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        case 'error':   return 'fas fa-times-circle';
        default:        return 'fas fa-bell';
    }
}