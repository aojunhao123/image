# AGENTS.md

## Cursor Cloud specific instructions

This is `@rc-component/image`, a React Image component library used by Ant Design. It is a pure front-end library with no backend services.

### Key commands

| Task | Command |
|---|---|
| Install deps | `bun install` |
| Dev server (Dumi) | `bun run start` (port 8000) |
| Lint | `bun run lint` |
| Tests | `bun run test` |
| Type check | `bun run tsc` |
| Build library | `bun run compile` |

### Caveats

- **Bun is the package manager.** The project uses `bunfig.toml` with `peer = false`. Always use `bun install`, not `npm install`.
- **Bun must be on PATH.** If `bun` is not found, source `~/.bashrc` or set `PATH="$HOME/.bun/bin:$PATH"`.
- **`bun run tsc` uses `bunx tsc --noEmit`.** TypeScript checking goes through bun's runner.
- **One pre-existing test failure** in `tests/preview.test.tsx` ("Esc closes preview then modal") — this is a known issue in the codebase, not an environment problem.
- **Blocked postinstalls are expected.** `bun install` may report blocked postinstalls; this does not affect functionality. Run `bun pm untrusted` for details if needed.
- **Dev server hot-reloads** — Dumi watches `src/` and `docs/` for changes automatically.
