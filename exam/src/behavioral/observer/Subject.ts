import { Observer } from "./Observer";

export interface Subject {
  subscribe(event: string, observer: Observer): void;
  unsubscribe(event: string, observer: Observer): void;
  notify(event: string, data: unknown): void;
}