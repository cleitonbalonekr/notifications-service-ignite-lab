import { Injectable } from '@nestjs/common';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

type Input = {
  recipientId: string;
  content: string;
  category: string;
};

type Output = {
  notification: Notification;
};

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: Input): Promise<Output> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
