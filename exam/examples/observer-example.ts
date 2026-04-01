import {
  EventEmitter,
  Logger,
  EmailNotifier,
  AuditService,
} from "../src/behavioral/observer";

// ── Setup ────────────────────────────────────────────────────────────────────
const emitter = new EventEmitter();

const logger       = new Logger("AppLogger");
const emailAdmin   = new EmailNotifier("admin@example.com");
const emailDev     = new EmailNotifier("dev@example.com");
const auditService = new AuditService();

// ── Subscribe ────────────────────────────────────────────────────────────────
emitter.subscribe("user:registered", logger);
emitter.subscribe("user:registered", emailAdmin);
emitter.subscribe("user:registered", auditService);

emitter.subscribe("order:placed", logger);
emitter.subscribe("order:placed", emailDev);
emitter.subscribe("order:placed", auditService);

console.log("\n=== Event: user:registered ===");
emitter.notify("user:registered", { userId: 42, username: "alice" });

console.log("\n=== Event: order:placed ===");
emitter.notify("order:placed", { orderId: 101, total: 199.99 });

// ── Unsubscribe ──────────────────────────────────────────────────────────────
console.log("\n=== Unsubscribing AppLogger from order:placed ===");
emitter.unsubscribe("order:placed", logger);

console.log("\n=== Event: order:placed (after unsubscribe) ===");
emitter.notify("order:placed", { orderId: 102, total: 49.99 });

// ── Audit log ────────────────────────────────────────────────────────────────
console.log("\n=== Audit Log ===");
console.table(auditService.getLog());