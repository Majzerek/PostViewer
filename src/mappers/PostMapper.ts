import { Post } from '../models';

export type PostApiType = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const mapPostApiToPostModel = (dto: PostApiType): Post => ({
  postId: dto.id,
  authorId: dto.userId,
  headline: dto.title,
  content: dto.body,
});

export const mapPostsApiToPostsModel = (dto: PostApiType[]): Post[] =>
  dto.map((post) => ({
    postId: post.id,
    authorId: post.userId,
    headline: post.title,
    content: post.body,
  }));
