import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notificaiton';
import { NotificationNotFound } from './errors/notification-not-found';

describe('ReadNotification', () => {
  it('should be able to unread notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });
    await notificationsRepository.create(notification);
    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existent notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const promise = unreadNotification.execute({
      notificationId: 'fake-recipient-id',
    });
    expect(promise).rejects.toThrow(NotificationNotFound);
  });
});
