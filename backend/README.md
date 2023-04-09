# API DOCUMENTATION

1. **Create an .env file with the following constants:**
    - PORT : port where you go to run the server.
    - DB_URL : URI of the mongo database.
    - SECRET : secret key used for JWT
2. **Install the dependencies with npm i**
3. **Run the server with npm run dev (development) or npm start (production)**
    **If you want run the server with npm start, you must build it first with npm run build**


## Auth

| TYPE    | DETAIL            | ROUTE                                      | SEND                                                           |
| ------- | ----------------- | ------------------------------------------ | -------------------------------------------------------------- |
| POST    | login user        | http://localhost:PORT/api/auth/login       | headers: {token}                                               |
| POST    | register patient  | http://localhost:PORT/api/auth/register    | headers: {token}, params: {id}, body: User & Patient Schema    |
| POST    | register doctor   | http://localhost:PORT/api//register/doctor | headers: {token}, params: {id}, body: User & Doctor Schema     |

### User Schema

| KEY        | TYPE      | REQUIRED |
| ---------- | --------- | -------- |
| email      | String    |   YES    |
| password   | String    |   YES    |
| firstname  | String    |   YES    |
| lastname   | String    |   YES    |
| role       | String    |   YES    |



## Patient

| TYPE   | DETAIL            | ROUTE                                   | SEND                                                                  |
| ------ | ----------------- | --------------------------------------- | --------------------------------------------------------------------- |
| GET    | get all patients  | http://localhost:PORT/api/patient       | headers: {token}                                                      |
| GET    | get patient by Id | http://localhost:PORT/api/patient/:id   | headers: {token}, params: {id}                                        |
| PUT    | update patient    | http://localhost:PORT/api/patient/:id   | headers: {token}, params: {id}, body: {birthdate, phone, gender, dni} |
| DELETE | delete patient    | http://localhost:PORT/api/patient/:id   | headers: {token}, params: {id}                                        |

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

| TYPE   | DETAIL           | ROUTE                                  | SEND                                                                |
| ------ | ---------------- | -------------------------------------- | ------------------------------------------------------------------- |
| GET    | get all doctor   | http://localhost:PORT/api/doctor       | headers: {token}                                                    |
| GET    | get doctor by Id | http://localhost:PORT/api/doctor/:id   | headers: {token}, params: {id}                                      |
| PUT    | update doctor    | http://localhost:PORT/api/doctor/:id   | headers: {token}, params: {id}, body: {speciality, phone, photoUrl} |
| DELETE | delete doctor    | http://localhost:PORT/api/doctor/:id   | headers: {token}, params: {id}                                      |

### Doctor Schema

| KEY        | TYPE       | REQUIRED |
| ---------- | ---------- | -------- |
| user       | ObjectId   |   YES    |
| name       | String     |   YES    |
| speciality | String     |   YES    |
| phone      | String     |   YES    |
| photoUrl   | String     |   YES    |


## Doctor Schedules

| TYPE   | DETAIL             | ROUTE                                        | SEND                                                            |
| ------ | ------------------ | -------------------------------------------- | --------------------------------------------------------------- |
| GET    | get all schedules  | http://localhost:PORT/api/doctorschedule     |                                                                 |
| GET    | get schedule by Id | http://localhost:PORT/api/doctorschedule/:id | params: {id}                                                    |
| POST   | create schedule    | http://localhost:PORT/api/doctorschedule     | headers: {token}, body: DoctorSchedule Schema                   |
| PUT    | update schedule    | http://localhost:PORT/api/doctorschedule/:id | headers: {token}, params: {id}, body: {day, starttime, endtime} |
| DELETE | delete schedule    | http://localhost:PORT/api/doctorschedule/:id | headers: {token}, params: {id}                                  |

### DoctorSchedule Schema

| KEY       | TYPE       | REQUIRED |
| --------- | ---------- | -------- |
| doctor    | ObjectId   |   YES    |
| day       | Date       |   YES    |
| in_time   | String     |   YES    |
| out_time  | String     |   YES    |
| interval  | Number     |   YES    |


## Appointments

| TYPE   | DETAIL              | ROUTE                                     | SEND                                                         |
| ------ | ------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| GET    | get all appointment | http://localhost:PORT/api/appointment     | headers: {token}                                             |
| GET    | get appoint. by Id  | http://localhost:PORT/api/appointment/:id | headers: {token}, params: {id}                               |
| POST   | get array of avail. | http://localhost:PORT/api/appointment/:id | params: {idDoctor}                                           |
| POST   | create appointment  | http://localhost:PORT/api/appointment     | headers: {token}, body: Appointment Schema                   |
| PUT    | update appointment  | http://localhost:PORT/api/appointment/:id | headers: {token}, params: {id}, body: Appointment Schema     |
| DELETE | delete appointment  | http://localhost:PORT/api/appointment/:id | headers: {token}, params: {id}                               |

### Appointment Schema

| KEY        | TYPE       | REQUIRED |
| ---------- | ---------- | -------- |
| date       | Date       |   YES    |
| start_time | String     |   YES    |
| duration   | Number     |   YES    |
| patient    | ObjectId   |   YES    |
| doctor     | ObjectId   |   YES    |


