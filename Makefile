
docker-prod:
	docker compose -f docker-compose.yml up --build

docker-dev:
	docker compose -f docker-compose.dev.yml up --build

create-env-file:
	cat .env.example > .env

run_tests:
	pnpm test:ci && pnpm test:e2e
