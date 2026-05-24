import { useEffect, useState } from 'react';
import { Bell, CheckCircle2, Sparkles } from 'lucide-react';

const notifications = [
  {
    id: 'n1',
    title: 'Payment link saved',
    description: 'Your new PayLink has been added to the dashboard.',
    type: 'success',
  },
  {
    id: 'n2',
    title: 'Subscription reminder',
    description: 'Upgrade to Pro for exports and branded pages.',
    type: 'info',
  },
  {
    id: 'n3',
    title: 'Security alert',
    description: 'New login detected from a new device.',
    type: 'alert',
  },
];

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      const menu = document.querySelector('.notifications-dropdown');
      if (menu && !menu.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="notifications-dropdown">
      <button
        type="button"
        className="notification-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Open notifications"
      >
        <Bell size={20} />
        <span className="notification-badge">{notifications.length}</span>
      </button>
      {open && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <p>Notifications</p>
            <span>{notifications.length} new</span>
          </div>
          <ul>
            {notifications.map((item) => (
              <li key={item.id} className={`notification-item ${item.type}`}>
                <div className="notification-icon">
                  {item.type === 'success' ? <CheckCircle2 size={18} /> : <Sparkles size={18} />}
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
