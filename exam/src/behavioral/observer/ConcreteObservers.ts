import { Observer } from "./Observer";


export class Logger implements Observer {
  private readonly name: string;

  constructor(name: string = "Logger") {
    this.name = name;
  }

  update(event: string, data: unknown): void {
    console.log(`[${this.name}] Event: "${event}" | Data:`, data);
  }
}


export class EmailNotifier implements Observer {
  private readonly email: string;

  constructor(email: string) {
    this.email = email;
  }

  update(event: string, data: unknown): void {
    console.log(
      `[EmailNotifier] Sending e-mail to "${this.email}" | Event: "${event}" | Payload:`,
      data
    );
  }
}

/**
 * AuditService — Concrete Observer
 * Records events for compliance / audit purposes.
 */
export class AuditService implements Observer {
  private readonly log: Array<{ event: string; data: unknown; timestamp: string }> = [];

  update(event: string, data: unknown): void {
    const entry = { event, data, timestamp: new Date().toISOString() };
    this.log.push(entry);
    console.log(`[AuditService] Recorded event "${event}" at ${entry.timestamp}`);
  }

  getLog() {
    return [...this.log];
  }
}