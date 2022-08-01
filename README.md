# Nest.js API

- passport-jwt 인증 구현
- bcrypt 암호화
- jest, jest-mock 코드 테스트 구현 (unit, e2e)

### 프로젝트 파일 탐색

프로젝트 루트를 펼치면 다음과 같은 노드 트리가 표시 됩니다.

````
.
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── auth
│   │     ├── dto
│   │     │    └── user-login.dto.ts
│   │     ├── auth.controller.spec.ts
│   │     ├── auth.controller.ts
│   │     ├── auth.module.ts
│   │     ├── auth.service.spec.ts
│   │     ├── auth.service.ts
│   │     ├── jwt.strategy.ts
│   │     └── jwt-auth.gurad.ts
│   ├── common
│   │     ├── bcrypt
│   │     │     ├── bcrypt.service.spec.ts
│   │     │     └── bcrypt.service.ts
│   │     ├── decorators
│   │     │     └── user.decorator.ts
│   │     ├── filter
│   │     │     └── httpException.filter.ts
│   │     ├── interceptors
│   │     │     └── transform.interceptor.ts
│   │     └── common.module.ts
│   ├── config
│   │     ├── config.module.ts
│   │     ├── config.service.spec.ts
│   │     └── config.service.ts
│   ├── entities
│   │     └── user.entity.ts
│   ├── users
│   │     ├── dto
│   │     │    ├── user.dto.ts
│   │     │    └── user-create.dto.ts
│   │     ├── users.controller.spec.ts
│   │     ├── users.controller.ts
│   │     ├── users.module.ts
│   │     ├── users.service.spec.ts
│   │     ├── users.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test
│     ├── app.e2e-spec.ts
│     └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
````

|||
|---|---|
|app.controller.ts|단일 경로가 있는 기본 컨트롤러|
|app.controller.spec.ts|컨트롤러 단위 테스트|
|app.module.ts|애플리케이션 루트 모듈|
|app.service.ts|단일 방법으로 기본 서비스|
|main.ts|핵심 함수 NestFactory를 사용하여 Nest 애플리케이션 인스턴스를 만드는 엔트리 파일|

### API 정의

- POST/register - 사용자 등록

## 테스트 코드

### user.service.spec.ts

```javascript
describe('createUser', () => {
  it('유저 정보를 저장해야 합니다. ', async () => {
    const user: UserCreateDto = {
      id: 'user1234',
      username: 'user',
      password: 'password',
      department: 'dev',
      email: 'test@email.com',
    };
    bcryptService.hash.mockReturnValue('hashed');
    const newUser = Object.assign({}, user, { password: 'hashed' });
    expect(await service.createUser(user)).toEqual(newUser);
  });

  it('중복된 유저네임은 거절해야 합니다.', async () => {
    const user: UserCreateDto = {
      id: 'user1234',
      username: 'user',
      password: 'password',
      department: 'dev',
      email: 'test@email.com',
    };
    repositoryMock.findOne.mockReturnValue(user);
    try {
      await service.createUser(user);
      fail(BadRequestException);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.response.error).toContain('username');
    }
  });

  it('중복된 메일 주소는 거부해야 합니다.', async () => {
    const user: UserCreateDto = {
      id: 'user1234',
      username: 'user',
      password: 'password',
      department: 'dev',
      email: 'test@email.com',
    };
    repositoryMock.findOne.mockReturnValueOnce(null);
    repositoryMock.findOne.mockReturnValueOnce(user);
    try {
      await service.createUser(user);
      fail(BadRequestException);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.response.error).toContain('email');
      expect(repositoryMock.findOne).toHaveBeenCalledTimes(2);
    }
  });

  it('이메일 주소가 없어도, 유저등록을 허용해야 합니다.', async () => {
    const user: UserCreateDto = {
      id: 'user1234',
      password: 'password',
      username: 'user',
      department: 'dev',
    };
    repositoryMock.findOne.mockImplementation((d) =>
      d.hasOwnProperty('email') ? user : null,
    );
    await service.createUser(user);
    expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });
});
```

### users.controller.spec.ts

```javascript
describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: MockType<UsersService>;
  const user: UserEntity = {
    id: 'id',
    username: 'user',
    password: 'password',
    email: 'email@email.com',
    department: 'dev',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useFactory: usersServiceFactory }],
    }).compile();

    controller = module.get < UsersController > (UsersController);
    userServiceMock = module.get(UsersService);
  });

  it('should create a user', async () => {
    userServiceMock.createUser.mockReturnValue(user);
    expect(
      controller.createUser({
        id: 'id',
        username: 'user',
        password: 'password',
        email: 'email@email.com',
        department: 'dev',
      }),
    ).toEqual(user);
  });
});
```
