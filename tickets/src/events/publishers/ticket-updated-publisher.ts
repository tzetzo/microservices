import { Publisher, Subjects, TicketUpdatedEvent } from "@tmtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated; //type and value
}
