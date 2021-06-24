import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repositories/TagRespository"


class CreateTagService {
    async execute(name: string) {
        const connectTag = getCustomRepository(TagsRepository);

        if (!name) {
            throw new Error('Iccorect name!');
        }

        const tagAlreadyExists = await connectTag.findOne({ name });

        if(tagAlreadyExists) {
            throw new Error('Tag already exists!');
        }

        const tag = connectTag.create({ name });
        await connectTag.save(tag);
        return tag;
    }
}

export { CreateTagService }
