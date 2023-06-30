import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DatabaseService } from '../src/database/database.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/users/dto/edit-user.dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';

describe('E2E', () => {
    let app: INestApplication;
    let prisma: DatabaseService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        await app.init();
        await app.listen(3333);

        prisma = app.get(DatabaseService);
        await prisma.cleanDb();
        pactum.request.setBaseUrl('http://localhost:3333');
    });
    afterAll(() => {
        app.close();
    });
    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'teste@gmail.com',
            password: '123',
        };
        describe('Signup', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto.password)
                    .expectStatus(400);
            });
            it('should throw if passoword empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto.email)
                    .expectStatus(400);
            });
            it('should signup a user', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201);
            });
        });
        describe('Signin', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto.password)
                    .expectStatus(400);
            });
            it('should throw if password empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto.email)
                    .expectStatus(400);
            });
            it('should throw if body empty', () => {
                return pactum.spec().post('/auth/signin').expectStatus(400);
            });
            it('should signin a user', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(201)
                    .stores('userAt', 'access_token');
            });
        });
    });
    describe('User', () => {
        const dto: EditUserDto = {
            email: 'tlucase@gmail.com',
            fristName: 'Lucas',
        };
        describe('Get me', () => {
            it('should get current user', () => {
                return pactum
                    .spec()
                    .get('/users/me')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .withBody(dto)
                    .expectStatus(200);
            });
        });
        describe('Edit user', () => {
            it('should edit current user', () => {
                return pactum
                    .spec()
                    .patch('/users')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .inspect()
                    .expectStatus(200);
            });
        });
    });
});
