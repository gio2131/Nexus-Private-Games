/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              GIO'S PRIVATE GAMES
            </span>
          </div>

          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search unblocked games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button className="hover:text-white transition-colors">Trending</button>
            <button className="hover:text-white transition-colors">New</button>
            <button className="hover:text-white transition-colors">Categories</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedGame ? (
          /* Game Player View */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <a 
                  href={selectedGame.iframeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">About {selectedGame.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                Enjoy {selectedGame.title} unblocked on Nexus Games. This game is hosted on a secure, high-speed server to ensure the best gaming experience without any restrictions.
              </p>
            </div>
          </motion.div>
        ) : (
          /* Game Grid View */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Popular Games'}
              </h2>
              <div className="text-sm text-zinc-500">
                {filteredGames.length} games available
              </div>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-lg group-hover:border-emerald-500/50 transition-colors">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div className="w-full flex items-center justify-between">
                            <span className="font-bold text-white">Play Now</span>
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Gamepad2 className="w-4 h-4 text-black" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="mt-3 font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors">
                        {game.title}
                      </h3>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                  <Search className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-400">No games found</h3>
                <p className="text-zinc-600 mt-2">Try searching for something else</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold tracking-tight">GIO'S PRIVATE GAMES</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm text-zinc-600">
            © 2026 Nexus Games. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
