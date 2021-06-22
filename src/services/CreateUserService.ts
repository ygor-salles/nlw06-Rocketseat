import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name, email, admin}: IUserRequest): Promise<User> {
        const connectUser = getCustomRepository(UserRepository);

        if(!email) {
            throw new Error('Email incorrect');
        }

        const userAlreadyExists = await connectUser.findOne({ email });

        if(userAlreadyExists) {
            throw new Error('User already exists');
        }

        console.log(name, email, admin);
        const user = connectUser.create({ name, email, admin });
        await connectUser.save(user);
        return user;
    }
}

export { CreateUserService }