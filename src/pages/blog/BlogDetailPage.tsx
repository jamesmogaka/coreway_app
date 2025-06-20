import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '@/lib/supabase/blog';
import type { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const fetchedPost = await getBlogPostById(id);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('Blog post not found.');
        }
      } catch (err) {
        setError('Failed to fetch blog post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="bg-teal-900 min-h-screen flex items-center justify-center text-yellow-50"><p>Loading post...</p></div>;
  }

  if (error) {
    return <div className="bg-teal-900 min-h-screen flex items-center justify-center text-red-400"><p>{error}</p></div>;
  }

  if (!post) {
    return <div className="bg-teal-900 min-h-screen flex items-center justify-center text-yellow-50"><p>Post not found.</p></div>;
  }

  return (
    <div className="bg-teal-900 min-h-screen text-yellow-50 font-sans">
      <main className="container mx-auto px-4 py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-50 mb-4 tracking-tight">{post.title}</h1>
          <p className="text-yellow-50/80 mb-8">Published on {new Date(post.created_at).toLocaleDateString()}</p>
          <div 
            className="prose prose-invert prose-lg max-w-none prose-p:text-yellow-50/90 prose-headings:text-yellow-50 prose-strong:text-yellow-50 prose-a:text-yellow-200 hover:prose-a:text-yellow-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </main>
    </div>
  );
};

export default BlogDetailPage;
