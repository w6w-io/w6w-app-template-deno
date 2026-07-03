# w6w-app-template

A minimal, opinionated starting point for building a [w6w](https://w6w.io) app: a package that exposes actions (and optionally auth) against a third-party API so w6w workflows can invoke it.

Use it as a **GitHub template** — click "Use this template" and start editing.

## What's in the box

```
.
├── package.json         # identity + presentation (the w6w block)
├── deno.json            # Deno tasks: test / check / fmt / lint
├── tsconfig.json        # editor / node-side type-checking
├── index.ts             # exports the AppDefinition
├── auth/
│   └── api-key.ts       # bearer-token auth with a test() probe
├── actions/
│   ├── get-status.ts    # a GET example
│   └── echo.ts          # a POST example
├── lib/
│   └── client.ts        # thin fetch wrapper — routes through ctx.fetch
├── assets/icon.svg
└── tests/               # deno tests using a mocked HookContext
```

The example points at `httpbin.org` so the actions and tests run against a stable, well-known echo service. Replace the API URL, actions, and auth to build your own app.

## Getting started

1. Click **Use this template** (or `gh repo create --template w6w-io/w6w-app-template`).
2. Update `package.json`:
   - `name` — your npm-style package name
   - `w6w.id` — reverse-DNS globally unique id (`com.acme.foo`)
   - `w6w.displayName`, `w6w.categories`
   - `w6w.network.allow` — hostnames your app will call
3. Replace the icon at `assets/icon.svg`.
4. Rewrite `lib/client.ts` to point at your API base URL.
5. Model your auth in `auth/` (see below) and your operations in `actions/`.
6. Wire them up in `index.ts` and add tests under `tests/`.

## Local dev

```bash
deno task check   # type-check
deno task test    # run unit tests
deno task fmt     # format
deno task lint    # lint
```

## Auth

An `AuthDefinition` describes:

- **fields** — what the user enters (rendered as a form in the editor)
- **sign** — how to attach credentials to outbound requests (headers only; the runtime mediates the fetch)
- **test** — a probe the editor calls after the user submits credentials

For OAuth2 use `type: "oauth2"` and provide `authorize` / `token` endpoints instead of `sign`.

## Actions

An `ActionDefinition<Input, Output>` describes:

- **params** — user-visible input schema (rendered as a form)
- **output** — optional shape hint for downstream steps
- **execute(input, ctx)** — the hook. Use `ctx.fetch` (not global `fetch`) — the runtime enforces the egress allowlist and applies auth via `sign`.

Never call `fetch` directly, never read environment variables, never touch the filesystem. The runtime is sandboxed and will deny by default; anything the app needs is exposed through `ctx`.

## Publishing

Once your app is stable, submit it to a registry (or self-host). See the [App RFC](https://github.com/w6w-io/w6w-core/blob/main/rfcs/app.md) for the full contract.

## License

MIT — see [LICENSE](./LICENSE).
