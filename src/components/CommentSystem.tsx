import React, { useState } from 'react';
import { HeartIcon, ArrowUturnLeftIcon, UserIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Comment } from '../types';

interface CommentSystemProps {
  newsId: number;
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, 'id' | 'date' | 'likes'>) => void;
  onLikeComment: (commentId: number) => void;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  newsId,
  comments,
  onAddComment,
  onLikeComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && authorName.trim()) {
      onAddComment({
        newsId,
        author: authorName,
        content: newComment
      });
      setNewComment('');
    }
  };

  const handleLike = (commentId: number) => {
    const newLikedComments = new Set(likedComments);
    if (likedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
    onLikeComment(commentId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold khmer-text">
        មតិយោបល់ ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ឈ្មោះរបស់អ្នក"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
            required
          />
        </div>
        <textarea
          placeholder="សរសេរមតិយោបល់របស់អ្នក..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all khmer-text"
        >
          បញ្ជូនមតិយោបល់
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="glass rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium khmer-text">{comment.author}</h4>
                  <span className="text-sm text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-300 khmer-text leading-relaxed mb-4">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-all ${likedComments.has(comment.id)
                        ? 'bg-red-500/20 text-red-400'
                        : 'glass hover:bg-white/10'
                      }`}
                  >
                    {likedComments.has(comment.id) ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                    <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 glass rounded-lg hover:bg-white/10 transition-all">
                    <ArrowUturnLeftIcon className="w-4 h-4" />
                    <span className="khmer-text">ឆ្លើយតប</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSystem;