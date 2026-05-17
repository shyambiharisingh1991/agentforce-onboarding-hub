# Contributing

Thanks for helping make Agentforce Onboarding Hub useful for real implementation teams.

## Development workflow

1. Fork the repository and create a feature branch.
2. Install dependencies with `pnpm install`.
3. Copy `.env.example` to `.env` and fill only the services you need.
4. Run `pnpm dev` to start the monorepo.
5. Add tests or seed data for behavior that affects scoring, analytics, prompts, or templates.
6. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before opening a pull request.

## Contribution areas

- Role-based onboarding journeys
- Industry implementation templates
- Prompt library categories and examples
- Analytics models for credit usage, ROI, and adoption
- Salesforce, Slack, Jira, and identity provider integrations
- Translations and accessibility improvements

## Pull request standards

- Keep changes focused and document the business outcome.
- Include screenshots for UI changes.
- Do not commit secrets, customer data, or proprietary Salesforce org exports.
- Prefer reusable package-level logic over one-off page logic.

## Security

Please report security issues privately to the maintainers rather than opening a public issue.
