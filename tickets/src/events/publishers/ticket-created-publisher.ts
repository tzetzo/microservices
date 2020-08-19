import { Publisher, Subjects, TicketCreatedEvent } from "@tmtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated; //type and value
}
