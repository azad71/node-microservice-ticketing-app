import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@bitwisebit/server-util";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
