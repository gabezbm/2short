build:
	cd frontend &&\
	pnpm install &&\
	pnpm build &&\
	cd ../backend &&\
	pnpm install

run:
	cd backend &&\
	node .