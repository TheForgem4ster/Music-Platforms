import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {UserModule} from "../user/user.module";
import {User} from "../user/schemas/user.schemas";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if(candidate) {
            throw new HttpException("A user with the same name already exists", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(userDoc: any) {
        const user = userDoc.toObject({ getters: true }); // convert Document to plain JavaScript object
        const payload = {email: user.email, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        let name = "";
        if (user !== null && user !== undefined) {
            name = user.get('password');
        }
        const passwordEquals = await bcrypt.compare(userDto.password, name);

        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: "Uncorrected email and password"})
    }
}
