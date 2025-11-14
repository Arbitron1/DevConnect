import { Router, Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment';
import User from '../models/User';
import mongoose from 'mongoose';

const router = Router();

function getUserId(req: Request) {
  return (req as any).userId as string | undefined;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { content, images } = req.body;
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ message: 'content is required' });
    }

    const post = new Post({
      author: new mongoose.Types.ObjectId(userId),
      content,
      images: Array.isArray(images) ? images : [],
    });

    await post.save();

    res.status(201).json({ post });
  } catch (err) {
    console.error('Create post error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = Math.min(parseInt((req.query.limit as string) || '10', 10), 50);
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar bio')
      .lean();

    res.json({ posts, page, limit });
  } catch (err) {
    console.error('Get posts error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const post = await Post.findById(id).populate('author', 'name avatar bio');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comments = await Comment.find({ post: post._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('author', 'name avatar');

    res.json({ post, comments });
  } catch (err) {
    console.error('Get post error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/like', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const uid = new mongoose.Types.ObjectId(userId);
    const already = post.likes.some((l) => l.equals(uid));
    if (already) {
      post.likes = post.likes.filter((l) => !l.equals(uid));
    } else {
      post.likes.push(uid);
    }

    await post.save();
    res.json({ likesCount: post.likes.length, liked: !already });
  } catch (err) {
    console.error('Like error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/comments', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      post: post._id,
      author: new mongoose.Types.ObjectId(userId),
      text: text.trim(),
    });

    await comment.save();
    post.commentsCount = (post.commentsCount || 0) + 1;
    await post.save();

    const populated = await comment.populate('author', 'name avatar');

    res.status(201).json({ comment: populated, commentsCount: post.commentsCount });
  } catch (err) {
    console.error('Add comment error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:postId/comments/:commentId', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { postId, commentId } = req.params;
    if (!mongoose.isValidObjectId(postId) || !mongoose.isValidObjectId(commentId)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // only comment author or post author can delete
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isAuthor = comment.author.equals(userId);
    const isPostOwner = post.author.equals(userId);
    if (!isAuthor && !isPostOwner) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await comment.deleteOne();
    post.commentsCount = Math.max(0, (post.commentsCount || 1) - 1);
    await post.save();

    res.json({ message: 'Deleted', commentsCount: post.commentsCount });
  } catch (err) {
    console.error('Delete comment error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
