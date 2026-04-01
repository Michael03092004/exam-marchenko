# Observer Pattern — TypeScript

Реалізація поведінкового патерну **Observer** мовою TypeScript.

## Структура проєкту

```
exam/
├── src/
│   └── behavioral/
│       └── observer/
│           ├── Observer.ts           # Інтерфейс Observer
│           ├── Subject.ts            # Інтерфейс Subject
│           ├── EventEmitter.ts       # Concrete Subject
│           ├── ConcreteObservers.ts  # Logger, EmailNotifier, AuditService
│           └── index.ts              # Barrel export
├── examples/
│   └── observer-example.ts          # Приклад використання
├── .editorconfig
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Що таке Observer?

**Observer** — поведінковий патерн проєктування, який дозволяє одному об'єкту (`Subject`) автоматично сповіщати інші об'єкти (`Observers`) про зміни свого стану, не знаючи конкретних типів цих об'єктів.

## UML-діаграма

```
      «interface»                «interface»
        Subject   ◄────────────   Observer
    ─────────────                ──────────
    + subscribe()                + update()
    + unsubscribe()
    + notify()
         ▲                            ▲
         │                  ┌─────────┼──────────────┐
    EventEmitter          Logger  EmailNotifier  AuditService
```

## Ролі

| Роль | Клас / Інтерфейс | Відповідальність |
|---|---|---|
| `Subject` | `Subject` (interface) | Оголошує API підписки |
| `ConcreteSubject` | `EventEmitter` | Зберігає підписників, розсилає сповіщення |
| `Observer` | `Observer` (interface) | Оголошує метод `update()` |
| `ConcreteObserver` | `Logger`, `EmailNotifier`, `AuditService` | Реагують на події |

## Встановлення

```bash
npm install
```

## Запуск прикладу

```bash
npx ts-node examples/observer-example.ts
```

Скомпільовані файли з'являться у папці `dist/`.

## Як це працює

```
emitter.notify("user:registered", data)
    │
    ├── logger.update()        → виводить подію в консоль
    ├── emailAdmin.update()    → імітує надсилання email
    └── auditService.update()  → записує подію в журнал

emitter.unsubscribe("order:placed", logger)
    │
    └── logger більше не отримує події "order:placed"
```

## Переваги патерну

- **Слабка зв'язність** — `Subject` не знає нічого про конкретні реалізації `Observer`
- **Розширюваність** — новий спостерігач додається без зміни існуючого коду
- **Гнучкість** — підписка та відписка відбуваються динамічно під час виконання