## Usage

Create a `.env` file in the root directory with the following content:

```shell
# .env
VITE_SITE_ORIGIN="<YOUR DOMAIN>"
VITE_PORT=<YOUR PORT>
MONGODB_USER="<YOUR MONGODB USER>"
MONGODB_PASSWORD="<YOUR PASSWORD>"
```

Run the following commands:

```shell
make build && make run
```