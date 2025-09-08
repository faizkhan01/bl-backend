import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectRepository(User) private readonly usersRepo: Repository<User>,
	) {}

	async signup(params: {
		email: string;
		password: string;
		roles?: Role[];
		firstName?: string;
		lastName?: string;
		invitedByUserId?: string;
	}): Promise<{ accessToken: string; user: Omit<User, 'passwordHash'> }> {
		const existing = await this.usersRepo.findOne({ where: { email: params.email } });
		if (existing) {
			throw new UnauthorizedException('Email already exists');
		}
		const passwordHash = await bcrypt.hash(params.password, 10);
		const roles = params.roles && params.roles.length > 0 ? params.roles : [Role.CUSTOMER_USER];
		const user = this.usersRepo.create({
			email: params.email,
			passwordHash,
			roles,
			profile: { firstName: params.firstName, lastName: params.lastName },
			invitedByUserId: params.invitedByUserId,
		});
		const saved = await this.usersRepo.save(user);

		const token = await this.jwtService.signAsync({ sub: saved.id, email: saved.email, roles: saved.roles });
		const { passwordHash: _, ...safeUser } = (saved as unknown) as any;
		return { accessToken: token, user: safeUser };
	}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersRepo.findOne({ where: { email } });
		if (!user) throw new UnauthorizedException('Invalid credentials');
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) throw new UnauthorizedException('Invalid credentials');
		return user;
	}

	async login(email: string, password: string): Promise<{ accessToken: string; user: Omit<User, 'passwordHash'> }> {
		const user = await this.validateUser(email, password);
		const token = await this.jwtService.signAsync({ sub: user.id, email: user.email, roles: user.roles });
		const { passwordHash: _, ...safeUser } = (user as unknown) as any;
		return { accessToken: token, user: safeUser };
	}
}


