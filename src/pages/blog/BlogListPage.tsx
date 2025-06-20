import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '@/lib/supabase/blog';
import type { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const publishedPosts = await getBlogPosts();
        setPosts(publishedPosts.filter(p => p.is_published));
        setError(null);
      } catch (err) {
        setError('Failed to fetch blog posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-teal-900 min-h-screen text-yellow-50 font-sans">
      <main className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 text-yellow-50 tracking-tight"
        >
          Coreway Blog
        </motion.h1>

        {loading && <p className="text-center text-lg">Loading posts...</p>}
        {error && <p className="text-center text-red-400 text-lg">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="bg-teal-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
                    <div className="p-6 flex-grow">
                      <h2 className="text-2xl font-semibold mb-3 text-yellow-50 group-hover:text-white transition-colors duration-300">{post.title}</h2>
                      <p className="text-yellow-50 opacity-80 line-clamp-3">{post.summary}</p>
                    </div>
                    <div className="p-6 bg-teal-800/50 mt-auto">
                        <span className="text-sm text-yellow-50/70">Read more &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogListPage;
