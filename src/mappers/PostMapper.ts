import { Post } from '../models';

export type PostDtoApi = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const mapPostDtoModel = (dto: PostDtoApi): Post => ({
  postId: dto.id,
  authorId: dto.userId,
  headline: dto.title,
  content: dto.body,
});

export const mapPostsDtoModel = (dto: PostDtoApi[]): Post[] =>
  dto.map((post) => ({
    postId: post.id,
    authorId: post.userId,
    headline: post.title,
    content: post.body,
  }));
