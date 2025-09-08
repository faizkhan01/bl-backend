SHELL := /bin/sh

PROJECT := 4ami-backend
SUDO ?= sudo
DOCKER ?= docker

.PHONY: build up down logs migrate sh

build:
	$(SUDO) $(DOCKER) compose build

up:
	$(SUDO) $(DOCKER) compose up -d

down:
	$(SUDO) $(DOCKER) compose down

logs:
	$(SUDO) $(DOCKER) compose logs -f api

migrate:
	$(SUDO) $(DOCKER) compose run --rm api node ./node_modules/typeorm/cli.js -d dist/database/data-source.js migration:run

sh:
	$(SUDO) $(DOCKER) compose exec api sh


