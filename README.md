# JO Asset Tracker

(In Progress, backend not yet developed)

A clean full-stack project for an IT Asset & Service Request Tracker built with:

- Angular 22
- Symfony 7.4 LTS
- MariaDB 11.4 LTS

## Project structure

- frontend/ - Angular 22 application shell
- backend/ - Symfony 7.4 API shell
- docker-compose.yml - MariaDB 11.4, a Symfony backend, PhpMyAdmin, and an Angular frontend
- scripts/install-prereqs.ps1 - Windows setup helper

## Prerequisites

A Windows machine with:

- Docker Desktop
- Node.js LTS
- npm
- Git

For a native local Symfony runtime, install PHP 8.3 + Composer as a second step. The project already includes Docker-based API and database services so the stack can run without a local PHP installation.

## Start everything with Docker

```powershell
docker compose up --build
```

Then:

- Angular UI: http://localhost:4200
- Symfony API: http://localhost:8000/api/health
- PhpMyAdmin: http://localhost:8080
- MariaDB: localhost:3306

## Default database access

- Host: localhost
- Port: 3306
- Database: jo_asset_tracker
- User: app
- Password: app
- Root password: root

## Native local frontend

If you want to run Angular directly on the host instead of Docker:

```powershell
cd frontend
npm install
npm start
```

## Native local backend

If you want Symfony directly on the host, install PHP 8.3 and Composer then run:

```powershell
cd backend
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console server:run
```

## Next steps

- Add asset inventory and lifecycle tracking
- Add user, department, and role management
- Create service request workflow and SLA monitoring
- Add dashboard widgets and reporting
- Add auth and RBAC to secure the API
