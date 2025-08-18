import { Injectable } from '@nestjs/common';
import { userValidation } from '../dto/user.dto';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
    constructor( private readonly db: UserRepository){}

    async createUser(user: userValidation){
    
        user.password = hashSync(user.password, 10);

        const data: Prisma.usersCreateInput = {
            password: user.password,
            name: user.name,
            email: user.email,
        }
        
        return this.db.createUser(data);
     }

     async FindUserByEmail(email: string){

        return this.db.findUserByEmail(email);
        
     }
}
