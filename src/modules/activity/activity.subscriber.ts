import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  DataSource,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";

import { AuditService } from "@modules/audit/audit.service";
import { Operacion } from "@modules/audit/common/enums";
import { ActivityEntity } from "./entities";

@EventSubscriber()
export class ActivitySubscriber
  implements EntitySubscriberInterface<ActivityEntity>
{
  constructor(
    private readonly auditService: AuditService,
    dataSource: DataSource
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return ActivityEntity;
  }

  afterInsert(event: InsertEvent<ActivityEntity>): void {
    this.auditService.create(event.entity, Operacion.CREACION);
  }

  afterUpdate(event: UpdateEvent<ActivityEntity>): void {
    this.auditService.create(event.entity, Operacion.MODIFICACION);
  }

  beforeRemove(event: RemoveEvent<ActivityEntity>): void {
    this.auditService.create(event.entity, Operacion.ELIMINACION);
  }
}
