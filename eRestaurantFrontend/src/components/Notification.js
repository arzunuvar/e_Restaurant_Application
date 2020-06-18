import { NotificationManager } from 'react-notifications';

export function createNotification(type,message,title) {
    switch (type) {
        case 'info':
            return NotificationManager.info(message,title);
        case 'success':
            return NotificationManager.success(message, title);
        case 'warning':
            return NotificationManager.warning(message, title, 3000);
        case 'error':
            return NotificationManager.error(message, title, 5000, () => {
                alert('callback');
            });
    }
};