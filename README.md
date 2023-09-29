# Bulk Email Handler

This utility helps in sending emails in bulk to user's email address per-configured in the system,


### Technology & Frameworks used
- [ReactJS](https://react.dev/)
- [NodeJS](https://nodejs.org/en)
- [NestJS](https://nestjs.com/)
- [MySQL](https://www.mysql.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Nginx](https://www.nginx.com/)
- [Socket.io](https://socket.io/)
- [Docker](https://www.docker.com/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)

### Project structure
There are four services in this project each with their own docker-compose.yml file. Each service requires '.env' environment file for its configuration. Some services also require special configuration files. Steps on how to configure these are mentioned in the below section.


### Steps to configure the project
##### Clone the repository
> $ git clone https://github.com/gauravnadkarni/bulk-emails-handler.git

Go to the root of the project
> $ cd bulk-emails-handler/

##### Configure Job Creation Service
Create a .env file in the 'job-creation-service' directory
> $ cd ./job-creation-service/

> $ touch .env

Add the following content to this '.env' file.
```
APP_PORT=3000

#Queue Settings
QUEUE_SERVICE_NAME="backend-queue"
QUEUE_CONNECTION_NAME="creator_connection"
QUEUE_DIRECT_EXCHANGE_NAME="x.direct"
QUEUE_USERNAME="jobcreator"
QUEUE_PASSWORD="Pass123"
QUEUE_PORT=5672
QUEUE_NAME_EMAIL_PROCESSOR="q.emailProcessor"
QUEUE_EXCHANGE_ROUTE_JOB_CREATE="route.job.create"
```
Go to parent directory
> $ cd ..


##### Configure Job Repository Service
Create a .env file in the 'job-repository-service' directory
> $ cd ./job-repository-service/

> $ touch .env

Add the following content to this '.env' file.
```
APP_PORT=3000

#Queue Settings
QUEUE_SERVICE_NAME="backend-queue"
QUEUE_CONNECTION_NAME="store_connection"
QUEUE_DIRECT_EXCHANGE_NAME="x.direct"
QUEUE_FANOUT_EXCHANGE_NAME="x.fanout"
QUEUE_USERNAME="jobstore"
QUEUE_PASSWORD="Pass123"
QUEUE_PORT=5672
QUEUE_NAME_EMAIL_PROCESSOR="q.emailProcessor"
QUEUE_NAME_JOB_CREATOR="q.jobCreator"
QUEUE_NAME_EMAIL_UPDATE_PROCESSOR="q.emailUpdateProcessor"
QUEUE_NAME_UPDATE_STREAMER="q.updateStreamer"
QUEUE_EXCHANGE_ROUTE_JOB_CREATE="route.job.create"
QUEUE_EXCHANGE_ROUTE_EMAIL_PROCESS="route.email.process"
QUEUE_EXCHANGE_ROUTE_EMAIL_UPDATE="route.email.update"

#Events 
#Emitter Events
EMITTER_JOB_CREATED_EVENT="job.created"
EMITTER_JOB_UPDATED_EVENT="job.updated"
#Socket events
SOCKET_JOB_CREATED_EVENT="job.created"
SOCKET_JOB_UPDATED_EVENT="job.updated"
SOCKET_JOBS_REFRESH_EVENT="jobs.refresh"

#Database settings
DB_HOST="jobrepodb"
DB_PORT="3306"
DB_USERNAME="root"
DB_PASSWORD="Password@1"
DB_NAME="dbjobs"
```
Go to parent directory
> $ cd ..

##### Configure Notification Worker Service
Create a .env file in the 'notification-worker' directory
> $ cd ./notification-worker/

> $ touch .env

Add the following content to this '.env' file.
```
APP_PORT=3000

#Queue Settings
QUEUE_SERVICE_NAME="backend-queue"
QUEUE_CONNECTION_NAME="worker_connection"
QUEUE_DIRECT_EXCHANGE_NAME="x.direct"
QUEUE_USERNAME="emailworker"
QUEUE_PASSWORD="Pass123"
QUEUE_PORT=5672
QUEUE_NAME_EMAIL_PROCESSOR="q.emailProcessor"
QUEUE_EXCHANGE_ROUTE_EMAIL_PROCESS="route.email.process"
QUEUE_EXCHANGE_ROUTE_EMAIL_UPDATE="route.email.update"

#Email Settings
MAIL_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=
TO_EMAIL=
```
> Note that the '#Email Settings' section can be used for configuring app to send actual emails out. Current this code is commented out in the app and another peice of code is bing used in its place which only mimics the functionality of outgoing emails by adding some delay.

Go to parent directory
> $ cd ..

##### Configure UI Service
Create a .env file in the 'ui' directory
> $ cd ./ui/

> $ touch .env

Add the following content to this '.env' file.
```
PORT=3000
```
Go to parent directory
> $ cd ..

##### Configure Other services
This project also uses RabbitMQ, Nginx and MySQL dockers images. We will also have to provide the initial configurations to these containers. 

###### Configurations for RabbitMQ
RabbitMQ requires two file for it to function as expected with this project. They are as follows,
- rabbitmq.conf 
- definitions.json

Following commands should be executed in the root directory of the project. You should already be in it per instructions above
> touch rabbitmq.conf

Add the following content to this `rabbitmq.conf` file,
```
loopback_users.guest = false
listeners.tcp.default = 5672
load_definitions = /etc/rabbitmq/definitions.json
```
> touch definitions.json

Add the following content to this `definitions.json` file,
```
{
	"rabbit_version": "3.11.23",
	"rabbitmq_version": "3.11.23",
	"product_name": "RabbitMQ",
	"product_version": "3.11.23",
	"users": [{
		"name": "admin",
		"password_hash": "/3sY3OCyjytWS/rXSve1X6T69nC19CNWpZfzIx3dM9t4Y9/w",
		"hashing_algorithm": "rabbit_password_hashing_sha256",
		"tags": ["administrator"],
		"limits": {}
	}, {
		"name": "emailworker",
		"password_hash": "STtQhRPrPmCwhdu5DhYnH438A/sl45nTI6JaRT7pcF+36rTT",
		"hashing_algorithm": "rabbit_password_hashing_sha256",
		"tags": ["administrator"],
		"limits": {}
	}, {
		"name": "jobstore",
		"password_hash": "I+lLy0zVj/nlP4faH1PAZrt5qvotai5rGIUjqwrwjno9YVRk",
		"hashing_algorithm": "rabbit_password_hashing_sha256",
		"tags": ["administrator"],
		"limits": {}
	}, {
		"name": "jobcreator",
		"password_hash": "5BSoGYMAMGatieObCi0XZZ6cIBmr4Pgs9nxKcC+jUYXxaXb5",
		"hashing_algorithm": "rabbit_password_hashing_sha256",
		"tags": ["administrator"],
		"limits": {}
	}],
	"vhosts": [{
		"name": "/"
	}],
	"permissions": [{
		"user": "emailworker",
		"vhost": "/",
		"configure": ".*",
		"write": ".*",
		"read": ".*"
	}, {
		"user": "jobstore",
		"vhost": "/",
		"configure": ".*",
		"write": ".*",
		"read": ".*"
	}, {
		"user": "admin",
		"vhost": "/",
		"configure": ".*",
		"write": ".*",
		"read": ".*"
	}, {
		"user": "jobcreator",
		"vhost": "/",
		"configure": ".*",
		"write": ".*",
		"read": ".*"
	}],
	"topic_permissions": [],
	"parameters": [],
	"global_parameters": [{
		"name": "internal_cluster_id",
		"value": "rabbitmq-cluster-id-qOsUHvA-uVbMPdPKBuedLA"
	}],
	"policies": [],
	"queues": [{
		"name": "q.emailProcessor",
		"vhost": "/",
		"durable": true,
		"auto_delete": false,
		"arguments": {
			"x-queue-type": "classic"
		}
	}, {
		"name": "q.emailUpdateProcessor",
		"vhost": "/",
		"durable": true,
		"auto_delete": false,
		"arguments": {
			"x-queue-type": "classic"
		}
	}, {
		"name": "q.jobCreator",
		"vhost": "/",
		"durable": true,
		"auto_delete": false,
		"arguments": {
			"x-queue-type": "classic"
		}
	}, {
		"name": "q.updateStreamer",
		"vhost": "/",
		"durable": true,
		"auto_delete": false,
		"arguments": {
			"x-queue-type": "classic"
		}
	}],
	"exchanges": [{
		"name": "x.direct",
		"vhost": "/",
		"type": "direct",
		"durable": true,
		"auto_delete": false,
		"internal": false,
		"arguments": {}
	}, {
		"name": "x.fanout",
		"vhost": "/",
		"type": "direct",
		"durable": true,
		"auto_delete": false,
		"internal": false,
		"arguments": {}
	}],
	"bindings": [{
		"source": "x.direct",
		"vhost": "/",
		"destination": "q.emailProcessor",
		"destination_type": "queue",
		"routing_key": "route.email.process",
		"arguments": {}
	}, {
		"source": "x.direct",
		"vhost": "/",
		"destination": "q.emailUpdateProcessor",
		"destination_type": "queue",
		"routing_key": "route.email.update",
		"arguments": {}
	}, {
		"source": "x.direct",
		"vhost": "/",
		"destination": "q.jobCreator",
		"destination_type": "queue",
		"routing_key": "route.job.create",
		"arguments": {}
	}, {
		"source": "x.fanout",
		"vhost": "/",
		"destination": "q.updateStreamer",
		"destination_type": "queue",
		"routing_key": "",
		"arguments": {}
	}]
}
```

###### Configurations for Nginx
Following command should be executed in the root directory of the project. You should already be in it per instructions above
> touch nginx.conf

Add the following content to this `nginx.conf` file,

```
events {
  worker_connections  4096;  ## Default: 1024
}

http{
    server {
        listen          80;
        server_name     localhost;

        location /ui {
            proxy_pass http://ui-service:3000;
            proxy_set_header Host $host;
        }

        location ~* \.io {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy false;

            proxy_pass http://job-repository-service:3000;
            proxy_redirect off;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location = /ws {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy false;

            proxy_pass http://job-repository-service:3000;
            proxy_redirect off;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /jobs-repo/ {
            proxy_pass http://job-repository-service:3000/;
            proxy_set_header Host $host;
        }

        location /jobs-creator/ {
            proxy_pass http://job-creation-service:3000/;
            proxy_set_header Host $host;
        }

        location / {
            index index.html;
            root  /var/www/example.com/htdocs;
        }
    }
}
```

Now we are done with the configurations required for this project.

#### Docker setup
>Note: In order to run this project we need docker. You will have to download and install docker before moving forward.

Make sure that you are in the root directory of the project. To start the project run the following command,
> docker compose up -d

This will start all the containers in this project. Please note that some containers may take time to initialize.
You can use the following command to check thier status
> docker ps -a

When all the containers are up and initlaized properly, You can visit http://localhost/ui to see the app in action.

To stop the containers use the following command,
> docker compose down
