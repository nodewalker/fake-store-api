import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { Controllers, Services } from 'src/utils/const';
import {
  ReturnUserProfileDetails,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { IUserService } from 'src/utils/interfaces/IUserService';

@Controller(Controllers.user)
export class UserController {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getUserProfile(@Req() req: Request) {
    return plainToInstance(
      ReturnUserProfileDetails,
      await this.userService.findOne(req.user._uuid),
      { excludeExtraneousValues: true },
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const sanitized = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '');
          callback(null, `${uniqueSuffix}-${sanitized}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
          return callback(
            new HttpException(
              'You can upload only image',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    await this.userService.updateUser(req.user._uuid, {
      ...dto,
      avatarURL: avatar?.filename,
    });
    return res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(AuthGuard)
  @Patch('/password')
  async updateUserPassword(
    @Req() req: Request,
    @Body() dto: UpdateUserPasswordDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserPassword(req.user._uuid, dto);
    return res.sendStatus(HttpStatus.OK);
  }
}
