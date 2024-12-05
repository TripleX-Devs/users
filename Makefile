include .env.development

.PHONY: plant up reset clean check-env

# To build a pre-seeded db image.
plant:	
	docker compose build \
	--build-arg POSTGRES_USER=$(POSTGRES_USER) \
	--build-arg POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
	--build-arg POSTGRES_DB=$(POSTGRES_DB)

# To run docker compose.
up:
	make plant && docker compose up --no-build

# To delete compose images, containers & volumes.
reset: 	
	docker compose down -v --rmi all && docker compose rm -s

# To delete compose volumes.
clean: 
	docker compose down -v

# To check if your env's are loading into Makefile.
check-env: 
	@echo $(info POSTGRES_USER is $(POSTGRES_USER)) \
	$(info POSTGRES_PASSWORD is $(POSTGRES_PASSWORD)) \
	$(info POSTGRES_DB is $(POSTGRES_DB))