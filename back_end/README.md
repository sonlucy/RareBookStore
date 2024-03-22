### 1. **server.js**:

- Express 서버를 생성하고, 필요한 미들웨어들을 설정.
- 세션 관리를 위해 express-session을 사용하고, 세션에 관련된 설정을 정의.
- JSON 데이터를 파싱하기 위해 express.json()을 사용.
- CORS (Cross-Origin Resource Sharing)를 설정하여 클라이언트와의 통신을 허용.
- "/api" 경로에 userRoutes를 연결하여 사용자 관련 요청을 처리.
- 서버를 3001 포트에서 실행.

### 2. **userRoutes.js**:

- Express Router를 사용하여 라우터를 정의.
- "/signup" 경로에 POST 메서드를 사용하여 회원가입 요청을 처리하는 userController.signup을 연결.
- "/loginCheck" 경로에 POST 메서드를 사용하여 로그인 요청을 처리하는 userController.loginCheck을 연결.
- "/logout" 경로에 GET 메서드를 사용하여 로그아웃 요청을 처리하는 userController.logout을 연결.

### 3. **userController.js**:

- 유저 관련 요청을 처리하는 함수들을 정의.
- signup 함수는 회원가입 요청을 처리하고, 입력된 비밀번호를 bcrypt를 사용하여 해시값으로 변환하여 데이터베이스에 저장.
- loginCheck 함수는 로그인 요청을 처리하고, 입력된 아이디와 비밀번호를 데이터베이스에 저장된 값과 비교하여 로그인 여부를 확인.
- logout 함수는 세션에서 사용자 정보를 삭제하여 로그아웃을 처리.

### 4. **userDB.js**:

- 데이터베이스 관련 함수들을 정의.
- signUp 함수는 사용자 정보를 데이터베이스에 저장하는 쿼리를 실행.
- getUser 함수는 특정 사용자의 정보를 데이터베이스에서 조회하는 쿼리를 실행.

### 5. **db.js**:

- MySQL 데이터베이스 연결을 설정.
- 지정된 호스트, 포트, 사용자 이름, 비밀번호, 데이터베이스 이름으로 데이터베이스에 연결.

클라이언트의 요청을 받아 서버에서 처리하고, 데이터베이스와의 상호작용을 통해 사용자 관련 기능을 수행.
클라이언트는 서버에 요청을 보내고, 서버는 해당 요청을 받아 처리한 후 필요한 응답을 클라이언트에게 반환.

### Architecture
### Architecture



        +---------------------------------+
        |             server.js           |
        |    - Express server creation    |
        |    - Middleware configuration   |
        |    - Session management         |
        |    - JSON data parsing          |
        |    - CORS configuration         |
        |    - Routing to userRoutes      |
        |    - Server listening on port   |
        |                 3001            |
        +---------------------------------+
                        |
                        v
+-----------------------|------------------------+
|               userRoutes.js                   |
|   - Define routes using Express Router       |
|   - Handle '/signup' POST requests           |
|   - Handle '/loginCheck' POST requests       |
|   - Handle '/logout' GET requests           |
+----------------------------------------------+
                        |
                        v
+-----------------------|------------------------+
|              userController.js               |
|   - Define functions for user requests      |
|   - Handle signup, login, and logout        |
|   - Interact with userDB for database ops   |
+----------------------------------------------+
                        |
                        v
+-----------------------|------------------------+
|                 userDB.js                   |
|   - Define database-related functions      |
|   - Execute queries for user operations    |
+----------------------------------------------+
                        |
                        v
+-----------------------|------------------------+
|                  db.js                      |
|   - Configure MySQL database connection    |
|   - Connect to specified database         |
+----------------------------------------------+
