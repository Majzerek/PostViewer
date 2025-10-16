import { apiMakeRequest } from '../api';
import { mapPostDtoModel, mapPostsDtoModel, PostDtoApi } from '../mappers';
import { AuthorType, CommentsType, Post } from '../models';
import { StorageKeys } from '../types/StorageKeys';
import storage from './LocalStorageController';

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
  async getAuthors(signal?: AbortSignal): Promise<AuthorType[]> {
    const authorRes = await apiMakeRequest<AuthorType[]>({
      method: 'GET',
      url: `/users`,
      signal,
    });
    return authorRes;
  },

  async getPosts(signal?: AbortSignal): Promise<Post[]> {
    try {
      const posts = await apiMakeRequest<PostDtoApi[]>({
        method: 'GET',
        url: '/posts',
        signal,
      });
      const mapped = mapPostsDtoModel(posts);
      storage.setItem(StorageKeys.POSTS, mapped);
      return mapped;
    } catch (err) {
      const saved = storage.getItem<Post[]>(StorageKeys.POSTS);
      if (saved) return saved;
      throw err;
    }
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
    const comments = await apiMakeRequest<CommentsType[]>({
      method: 'GET',
      url: `/comments?postId=${postID}`,
      signal,
    });

    return comments;
  },
};

export default AuthServices;
