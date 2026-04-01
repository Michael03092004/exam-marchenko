import { Observer } from "./Observer";
import { Subject } from "./Subject";


export class EventEmitter implements Subject {
  private listeners: Map<string, Set<Observer>> = new Map();

  subscribe(event: string, observer: Observer): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(observer);
    console.log(`[EventEmitter] Observer subscribed to "${event}"`);
  }

  unsubscribe(event: string, observer: Observer): void {
    const group = this.listeners.get(event);
    if (group) {
      group.delete(observer);
      console.log(`[EventEmitter] Observer unsubscribed from "${event}"`);
    }
  }

  notify(event: string, data: unknown): void {
    const group = this.listeners.get(event);
    if (!group || group.size === 0) {
      console.log(`[EventEmitter] No observers for event "${event}"`);
      return;
    }
    console.log(`[EventEmitter] Notifying ${group.size} observer(s) for "${event}"`);
    for (const observer of group) {
      observer.update(event, data);
    }
  }
}