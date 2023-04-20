# API DOCUMENTATION

1. **Create an .env file with the following constants:**
    - PORT : port where you go to run the server.
    - DB_URL : URI of the mongo database.
    - SECRET : secret key used for JWT
2. **Install the dependencies with npm i**
3. **Run the server with npm run dev (development) or npm start (production)**
    **If you want run the server with npm start, you must build it first with npm run build**


## Auth

| TYPE    | DETAIL               | ROUTE                                          | SEND                                                           |
| ------- | -------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| POST    | login user           | http://URL:PORT/api/auth/login                 | headers: {token}                                               |
| POST    | register patient     | http://URL:PORT/api/auth/register              | headers: {token}, params: {id}, body: User & Patient Schema    |
| POST    | register doctor      | http://URL:PORT/api/auth/register/doctor       | headers: {token}, params: {id}, body: User & Doctor Schema     |
| GET     | get profile          | http://URL:PORT/api/auth/profile               | headers: {token}                                               |
| GET     | confirm user         | http://URL:PORT/api/auth/confirm/:code         | headers: {token}, params: {code}                               |
| POST    | forgot password      | http://URL:PORT/api/auth/forgot-password/      | headers: {token}, params: {code}, body: {email}                |
| GET     | verify code password | http://URL:PORT/api/auth/forgot-password/:code | headers: {token}, params: {code}                               |
| POST    | reset password       | http://URL:PORT/api/auth/reset-password/:code  | headers: {token}, params: {code}, body: {password}             |

### User Schema

| KEY        | TYPE      | REQUIRED |
| ---------- | --------- | -------- |
| email      | String    |   YES    |
| password   | String    |   YES    |
| firstname  | String    |   YES    |
| lastname   | String    |   YES    |
| role       | String    |   YES    |



## Patient

| TYPE   | DETAIL            | ROUTE                             | SEND                                                                  |
| ------ | ----------------- | --------------------------------- | --------------------------------------------------------------------- |
| GET    | get all patients  | http://URL:PORT/api/patient       | headers: {token}                                                      |
| GET    | get patient by Id | http://URL:PORT/api/patient/:id   | headers: {token}, params: {id}                                        |
| PUT    | update patient    | http://URL:PORT/api/patient/:id   | headers: {token}, params: {id}, body: {birthdate, phone, gender, dni} |
| DELETE | delete patient    | http://URL:PORT/api/patient/:id   | headers: {token}, params: {id}                                        |

### Patient Schema

| KEY       | TYPE        | REQUIRED |
| --------- | ----------- | -------- |
| user      | ObjectId    |   YES    |
| username  | String      |   YES    |
| birthdate | Date        |   YES    |
| phone     | String      |   YES    |
| gender    | String      |   YES    |
| dni       | String      |   YES    |


## Doctor

| TYPE   | DETAIL              | ROUTE                                                | SEND                                                               |
| ------ | ------------------- | ---------------------------------------------------- |------------------------------------------------------------------- |
| GET    | get all doctor      | http://URL:PORT/api/doctor                           |                                                                    |
| GET    | get all doctor pag. | http://URL:PORT/api/doctor/paginated                 | params: {specialty, page}                                          |
| GET    | get doctor by Id    | http://URL:PORT/api/doctor/:id                       | params: {id}                                                       |
| GET    | get specialties     | http://URL:PORT/api/doctor/specialty                 |                                                                    |
| GET    | get doctor by spec. | http://URL:PORT/api/doctor/specialty/list/:specialty | params: {specialty}                                                |
| GET    | get doctor by spec. | http://URL:PORT/api/doctor/random/:limit             | params: {limit}                                                    |
| PUT    | update doctor       | http://URL:PORT/api/doctor/:id                       | headers: {token}, params: {id}, body: {specialty, phone, photoUrl} |
| DELETE | delete doctor       | http://URL:PORT/api/doctor/:id                       | headers: {token}, params: {id}                                     |

### Doctor Schema

| KEY        | TYPE       | REQUIRED |
| ---------- | ---------- | -------- |
| user       | ObjectId   |   YES    |
| name       | String     |   YES    |
| specialty  | String     |   YES    |
| phone      | String     |   YES    |
| photoUrl   | String     |   YES    |


## Doctor Schedules

| TYPE   | DETAIL             | ROUTE                                  | SEND                                                            |
| ------ | ------------------ | -------------------------------------- | --------------------------------------------------------------- |
| GET    | get all schedules  | http://URL:PORT/api/doctorschedule     |                                                                 |
| GET    | get schedule by Id | http://URL:PORT/api/doctorschedule/:id | params: {id}                                                    |
| POST   | create schedule    | http://URL:PORT/api/doctorschedule     | headers: {token}, body: DoctorSchedule Schema                   |
| PUT    | update schedule    | http://URL:PORT/api/doctorschedule/:id | headers: {token}, params: {id}, body: {day, starttime, endtime} |
| DELETE | delete schedule    | http://URL:PORT/api/doctorschedule/:id | headers: {token}, params: {id}                                  |

### DoctorSchedule Schema

| KEY       | TYPE       | REQUIRED |
| --------- | ---------- | -------- |
| doctor    | ObjectId   |   YES    |
| day       | Date       |   YES    |
| in_time   | String     |   YES    |
| out_time  | String     |   YES    |
| interval  | Number     |   YES    |


## Appointments

| TYPE   | DETAIL              | ROUTE                                       | SEND                                                      |
| ------ | ------------------- | ------------------------------------------- | --------------------------------------------------------- |
| GET    | get all appointment | http://URL:PORT/api/appointment             | headers: {token}                                          |
| GET    | get appoint. by Id  | http://URL:PORT/api/appointment/:id         | headers: {token}, params: {id}                            |
| GET    | get doctor appoint. | http://URL:PORT/api/appointment/doctor/:id  | headers: {token}                                          |
| GET    | get patient appoint.| http://URL:PORT/api/appointment/patient/:id | headers: {token}                                          |
| GET    | get array of avail. | http://URL:PORT/api/appointment/:id         | params: {idDoctor, date}                                  |
| POST   | create appointment  | http://URL:PORT/api/appointment             | headers: {token}, body: Appointment Schema                |
| PUT    | update appointment  | http://URL:PORT/api/appointment/:id         | headers: {token}, params: {id}, body: Appointment Schema  |
| DELETE | delete appointment  | http://URL:PORT/api/appointment/:id         | headers: {token}, params: {id}                            |

### Appointment Schema

| KEY        | TYPE       | REQUIRED |
| ---------- | ---------- | -------- |
| date       | Date       |   YES    |
| startTime  | String     |   YES    |
| duration   | Number     |   YES    |
| patient    | ObjectId   |   YES    |
| doctor     | ObjectId   |   YES    |



## POSTMAN DOCUMENTATION
https://documenter.getpostman.com/view/24686438/2s93RXrq7M#177095a4-bd3d-4342-935a-41f7d5b5a6cb
