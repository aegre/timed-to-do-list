.DEFAULT_GOAL := help
.PHONY : setup build help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: clean  ## Instalar dependencias del proyecto
	yarn install

start: ## Genera el bundle de webpack de producción
	yarn start

build: ## Genera el bundle de webpack de producción
	yarn build

lint: ## Correr el linter
	yarn run lint

lint-fix: ## Correr el linter en modo auto-arreglo
	yarn run lint --fix

clean: ## Borrar carpeta node_modules y los hooks de git
	rm -rf .git/hooks
	rm -rf node_modules
	find . -name "package-lock.json" -delete
	find . -name ".DS_Store" -delete

test: ## Ejecutar pruebas
	yarn test

coverage: ## Ejecutar analisis de coverage
	yarn test --coverage
