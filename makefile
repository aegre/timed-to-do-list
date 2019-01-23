.DEFAULT_GOAL := help
.PHONY : setup build help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: clean  ## Instalar dependencias del proyecto
	npm install

start: ## Genera el bundle de webpack de producción
	npm start

build: ## Genera el bundle de webpack de producción
	npm build

lint: ## Correr el linter
	npm run lint

lint-fix: ## Correr el linter en modo auto-arreglo
	npm run lint --fix

clean: ## Borrar carpeta node_modules y los hooks de git
	rm -rf .git/hooks
	rm -rf node_modules
	find . -name "package-lock.json" -delete
	find . -name ".DS_Store" -delete

test: ## Ejecutar pruebas
	npm test

coverage: ## Ejecutar analisis de coverage
	npm test --coverage
