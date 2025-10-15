import { CommentsType } from '../models';

type CommentsDtoToTypeModel = {
  commentId: number;
  postId: number;
  headline: string;
  content: string;
  email: string;
};

export const mapCommentDtoModel = (dto: CommentsType): CommentsDtoToTypeModel => ({
  postId: dto.postId,
  commentId: dto.id,
  headline: dto.name,
  email: dto.email,
  content: dto.body,
});
