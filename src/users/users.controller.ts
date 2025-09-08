import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }

  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN)
  @Post('invite')
  invite(@Body() body: { email: string; role?: Role }) {
    const token = `invite_${Math.random().toString(36).slice(2, 10)}`;
    return { message: 'Invitation created (email sending stubbed)', token, email: body.email, role: body.role ?? Role.CUSTOMER_USER };
  }

  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN)
  @Get()
  async list() {
    const users = await this.usersRepo.find();
    return users.map(({ passwordHash, ...u }) => u as any);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() body: { roles: Role[] }) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) return { error: 'Not found' };
    user.roles = body.roles;
    const saved = await this.usersRepo.save(user);
    const { passwordHash, ...u } = saved as any;
    return u;
  }
}


