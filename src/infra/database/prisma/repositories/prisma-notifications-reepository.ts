import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificaitonMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }
    return PrismaNotificaitonMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notifications.findMany({
      where: {
        recipientId: recipientId,
      },
    });
    return notifications.map(PrismaNotificaitonMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notifications.count({
      where: {
        recipientId: recipientId,
      },
    });
    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificaitonMapper.toPrisma(notification);
    await this.prisma.notifications.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificaitonMapper.toPrisma(notification);
    await this.prisma.notifications.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
