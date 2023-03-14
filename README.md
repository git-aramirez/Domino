# Domino

## Language
English

## Clean Architecture
Hexagonal Architecture

## Frameworks
.Net 6 and React 18.2

## Authentication
Basic Athentication

Credentials:
UserName: ander@inalambria.com
password: An#er32345InAsFd$

##Libreries
1) Antd
2) base-64

## Steps for Run project
1) Open Visual Studio Code or your development enviroment and clone this repository
2) execute the command "npm install"
3) if the libreries aren't included then run "npm install" so execute the following commands:

- "npm i antd"
- "npm i base-64"

4) Now, you can run to project on Dominio
5) If you want to send request on the application through Postman, do not forget the credential with Basic Authentication

##Endpoint Resolve
type: POST
url: http://localhost:5165/api/domino

Authentication: Basic Authentication
body: 
{
    "tiles":[
        [2, 1], [3, 2], [1, 3]
    ]
}
