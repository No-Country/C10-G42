# API DOCUMENTATION

1. **Create an .env file with the following constants:**
    - PORT : port where you go to run the server.
    - DB_URL : URI of the mongo database.
    - SECRET : secret key used for JWT
2. **Install the dependencies with npm i**
3. **Run the server with npm run dev (development) or npm start (production)**
    **If you want run the server with npm start, you must build it first with npm run build**


## Auth

| TYPE    | DETAIL            | ROUTE                                                     | SEND                                                         |
| ------- | ----------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| POST    | login user        | https://consultoriomern.onrender.com/api/auth/login       | headers: {token}                                             |
| POST    | register patient  | https://consultoriomern.onrender.com/api/auth/register    | headers: {token}, params: {id}, body: Patient Schema         |
| POST    | register doctor   | https://consultoriomern.onrender.com/api//register/doctor | headers: {token}, params: {id}, body: Doctor Schema          |


## Patient

| TYPE   | DETAIL            | ROUTE                                                  | SEND                                                              |
| ------ | ----------------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| GET    | get all patients  | https://consultoriomern.onrender.com/api/patient       | headers: {token}                                                  |
| GET    | get patient by Id | https://consultoriomern.onrender.com/api/patient/:id   | headers: {token}, params: {id}                                    |
| PUT    | update patient    | https://consultoriomern.onrender.com/api/patient/:id   | headers: {token}, params: {id}, body: {birthdate,phone,gender,dni}|
| DELETE | delete patient    | https://consultoriomern.onrender.com/api/patient/:id   | headers: {token}, params: {id}                                    |


## Doctor

| TYPE   | DETAIL           | ROUTE                                                 | SEND                                                                |
| ------ | ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| GET    | get all doctor   | https://consultoriomern.onrender.com/api/doctor       | headers: {token}                                                    |
| GET    | get doctor by Id | https://consultoriomern.onrender.com/api/doctor/:id   | headers: {token}, params: {id}                                      |
| PUT    | update doctor    | https://consultoriomern.onrender.com/api/doctor/:id   | headers: {token}, params: {id}, body: {speciality, phone, photoUrl} |
| DELETE | delete doctor    | https://consultoriomern.onrender.com/api/doctor/:id   | headers: {token}, params: {id}                                      |


## Doctor Schedules

| TYPE   | DETAIL             | ROUTE                                                       | SEND                                                         |
| ------ | ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | get all schedules  | https://consultoriomern.onrender.com/api/doctorschedule     |                                                              |
| GET    | get schedule by Id | https://consultoriomern.onrender.com/api/doctorschedule/:id | params: {id}                                                 |
| POST   | create schedule    | https://consultoriomern.onrender.com/api/doctorschedule     | headers: {token}, body: DoctorSchedule Schema                |
| PUT    | update schedule    | https://consultoriomern.onrender.com/api/doctorschedule/:id | headers: {token}, params: {id}, body: {day,starttime,endtime}|
| DELETE | delete schedule    | https://consultoriomern.onrender.com/api/doctorschedule/:id | headers: {token}, params: {id}                               |



## Appointments

| TYPE   | DETAIL              | ROUTE                                                    | SEND                                                         |
| ------ | ------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | get all appointment | https://consultoriomern.onrender.com/api/appointment     | headers: {token}                                             |
| GET    | get appoint. by Id  | https://consultoriomern.onrender.com/api/appointment/:id | headers: {token}, params: {id}                               |
| POST   | get array of avail. | https://consultoriomern.onrender.com/api/appointment/:id | params: {idDoctor}                                           |
| POST   | create appointment  | https://consultoriomern.onrender.com/api/appointment     | headers: {token}, body: Appointment Schema                   |
| PUT    | update appointment  | https://consultoriomern.onrender.com/api/appointment/:id | headers: {token}, params: {id}, body: Appointment Schema     |
| DELETE | delete appointment  | https://consultoriomern.onrender.com/api/appointment/:id | headers: {token}, params: {id}                               |



## User Schema

| KEY        | TYPE      | REQUIRED |
| ---------- | --------- | -------- |
| email      | String    |   YES    |
| password   | String    |   YES    |
| firstname  | String    |   YES    |
| lastname   | String    |   YES    |
| role       | String    |   YES    |

## Doctor Schema

| KEY        | TYPE       | REQUIRED |
| ---------- | ---------- | -------- |
| user       | ObjectId   |   YES    |
| name       | String     |   YES    |
| speciality | String     |   YES    |
| phone      | String     |   YES    |
| photoUrl   | String     |   YES    |

## Patient Schema

| KEY       | TYPE        | REQUIRED |
| --------- | ----------- | -------- |
| user      | ObjectId    |   YES    |
| username  | String      |   YES    |
| birthdate | Date        |   YES    |
| phone     | String      |   YES    |
| gender    | String      |   YES    |
| dni       | String      |   YES    |

## Appointment Schema

| KEY        | TYPE       | REQUIRED |
| ---------- | ---------- | -------- |
| date       | Date       |   YES    |
| start_time | String     |   YES    |
| duration   | Number     |   YES    |
| patient    | ObjectId   |   YES    |
| doctor     | ObjectId   |   YES    |

## DoctorSchedule Schema

| KEY       | TYPE       | REQUIRED |
| --------- | ---------- | -------- |
| doctor    | ObjectId   |   YES    |
| day       | Date       |   YES    |
| in_time   | String     |   YES    |
| out_time  | String     |   YES    |
| interval  | Number     |   YES    |
