import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notification';
import { NotificationsRepository } from '../../../../application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaSevice: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaSevice.notifications.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
        recipientId: notification.recipientId,
      },
    });
  }
}
