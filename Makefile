DEPLOY_VERSION ?= $(shell git describe --tags --always)
REPO = rui

build:
	docker build -f Dockerfile -t ${REPO}:${DEPLOY_VERSION} .

run-image:
	docker run -p 3000:3000 -e BACKEND_URL=http://host.docker.internal:8000 -it rui:${DEPLOY_VERSION}