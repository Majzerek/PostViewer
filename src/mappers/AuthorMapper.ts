import { AuthorType } from '../models';

type AuthorDtoToTypeModel = {
  authorId: number;
  name: string;
  userName: string;
  email: string;
};

export const mapAuthorDtoModel = (dto: AuthorType): AuthorDtoToTypeModel => ({
  authorId: dto.id,
  name: dto.name,
  email: dto.email,
  userName: dto.username,
});
