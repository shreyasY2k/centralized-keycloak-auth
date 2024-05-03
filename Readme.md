# Centralized UAM (User Access Management) Application 

This repository contains code for a Centralized User Access Management (UAM) application. It includes a Node.js Express server for managing posts, integrated with Keycloak for authentication and authorization. 

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/12717481-ba2788bc-a84d-4e52-8344-bef0355f911f?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D12717481-ba2788bc-a84d-4e52-8344-bef0355f911f%26entityType%3Dcollection%26workspaceId%3D4095aa99-cf22-45d3-8abd-629c8257021a#?env%5BUAM%5D=W3sia2V5IjoiY2xpZW50X3NlY3JldCIsInZhbHVlIjoidVFqNjVkTEdYZXFRWTFOTVNFcXpsb2VDTUNFMHN3VTYiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoidVFqNjVkTEdYZXFRWTFOTVNFcXpsb2VDTUNFMHN3VTYiLCJzZXNzaW9uSW5kZXgiOjB9XQ==)

## Prerequisites

- Docker installed on your machine
- Node.js installed on your machine
- A Keycloak instance running (you can use the provided `docker-compose.yaml` file)
- An `.env` file with the following environment variables `posts-api` directory:

```bash
PORT=3000
KEYCLOAK_INTROSPECTION_URL=http://localhost:8080/auth/realms/your-realm-name/protocol/openid-connect/token/introspect
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```

- Another `.env` file with the following environment variables in the `Keycloak` directory:

```bash
PG_DB=keycloak
PG_USER=keycloak_user
PG_PASSWORD=keycloak_password
KEYCLOAK_ADMIN=your-admin-username
KEYCLOAK_ADMIN_PASSWORD=your-admin-password
```

Replace `your-realm-name`, `your-client-id`, and `your-client-secret` with your actual Keycloak realm name, client ID, and client secret respectively.

## Setup

1. Clone this repository:

```bash
cd Centralized-UAM
```

2. Navigate to the `Keycloak` directory and run Keycloak using Docker:

```bash
cd Keycloak
docker-compose up -d
```

3. Create a `.env` file in the `posts-api` directory with the required environment variables as mentioned in the Prerequisites section.

4. Install dependencies and run the posts API:

```bash
cd posts-api
npm install
node index.js
```

5. Optionally, if you are using domain name with nginx, you can use the `nginx.conf` file to configure the reverse proxy as shown in Keycloak directory.

## Usage

Refer to this [blog post](https://medium.com/@shreyasmk.mathur/d1c51b13456a) for detailed instructions on how to setup keycloak and use the application.

You can also refer to the [Keycloak documentation](https://www.keycloak.org/documentation.html) for more information.
Once the application is running, you can access the following endpoints:

- `GET /admin`: Get admin endpoint.
- `GET /users`: Get users endpoint.
- `GET /posts`: Get posts endpoint.

Make sure to include the access token in the `Authorization` header for each request.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.
