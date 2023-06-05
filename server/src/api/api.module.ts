import { Module, OnModuleInit } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import { TestsController } from './tests/tests.controller';
import { TestsService } from './tests/tests.service';

import { TopicsController } from './topics/topics.controller';
import { TopicsService } from './topics/topics.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { ResultsController } from './results/results.controller';
import { ResultsService } from './results/results.service';

import { GroupsController } from './groups/groups.controller';
import { GroupsService } from './groups/groups.service';

import { AuthGuard } from 'src/guards/auth.guard';

import { TheoriesController } from './theories/theories.controller';
import { TheoriesService } from './theories/theories.service';
import { ExercisesController } from './exercises/exercises.controller';
import { ExercisesService } from './exercises/exercises.service';
import { InstrumentsController } from './exercise-el/exercise-el.controller';
import { InstrumentsService } from './exercise-el/exercise-el.service';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import dayjs from 'dayjs';

@Module({
  controllers: [
    UsersController, 
    TestsController,
    QuestionsController, 
    TopicsController,
    ResultsController,
    GroupsController,
    TheoriesController,
    AuthController,
    ExercisesController,
    InstrumentsController,
    MediaController,
  ],
  providers: [
    UsersService, 
    TestsService, 
    QuestionsService,
    TopicsService,
    ResultsService,
    GroupsService,
    TheoriesService,
    AuthService,
    ExercisesService,
    InstrumentsService,
    MediaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    },

  ]
})
export class ApiModule implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    // private readonly themesService: TopicsService,
  ){}
  async onModuleInit(){
    // const themes = await this.themesService.findAll();
    // console.log(themes);
    // получить по role admin пользователя, изменить его логин и пароль в соответствии с env properties
    // const admin = (await this.usersService.findAdmin())[0];

    // await this.themeTextsService.create('1', {title:'Глава 0', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', createdAt: dayjs()})
  
    // if(admin) {
    //   console.log(admin);
    //   return;
    // }

    // this.usersService.createAdmin( 
    //   {
    //     login: 'Andrey', 
    //     password: '12345',
    //     surname: 'Mirkashev',
    //     firstName: 'Ilnaz',
    //     lastName: 'Lenarovich',
    //     // createdAt: dayjs(),
    //     role: 'admin',
    //   }
    // );

    // for(let i = 0; i < 99; i += 1) {
    //   this.themesService.create({
    //     title: 'Рандом тема #' + i,
    //     createdAt: dayjs(),
    //   })
    // }


  }
}
