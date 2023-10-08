import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@bitwisebit/server-util";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
