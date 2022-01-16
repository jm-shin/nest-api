import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user.entity";
import {AbstractRepository, EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User>{
}