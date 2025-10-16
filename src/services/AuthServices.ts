import { apiMakeRequest } from '../api';
import { mapPostDtoModel, mapPostsDtoModel, PostDtoApi } from '../mappers';
import { AuthorType, CommentsType, Post } from '../models';

const AuthServices = {
  async getAuthor(id: number, signal?: AbortSignal): Promise<AuthorType> {
    const authorId = id.toString();
    const authorRes = await apiMakeRequest<AuthorType>({
      method: 'GET',
      url: `/users/${authorId}`,
      signal,
    });
    return authorRes;
  },

  async getPosts(signal?: AbortSignal): Promise<Post[]> {
    const posts = await apiMakeRequest<PostDtoApi[]>({
      method: 'GET',
      url: '/posts',
      signal,
    });
    return mapPostsDtoModel(posts);
  },

  async getOnePost(postId: number, signal?: AbortSignal): Promise<Post> {
    const postID = postId.toString();
    const posts = await apiMakeRequest<PostDtoApi>({
      method: 'GET',
      url: `/posts/${postID}`,
      signal,
    });
    return mapPostDtoModel(posts);
  },
  async getComments(postId: number, signal?: AbortSignal) {
    const postID = postId.toString();
    const comments = await apiMakeRequest<CommentsType>({
      method: 'GET',
      url: `/comments/${postID}`,
      signal,
    });
    return comments;
  },
};

export default AuthServices;
