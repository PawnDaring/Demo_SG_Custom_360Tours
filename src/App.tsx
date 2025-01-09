import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MoveUp } from 'lucide-react';
import ThreeScene from './components/ThreeScene';
import { Scene } from './types/Scene';

// Example scene - replace with your actual scenes
const demoScene: Scene = {
  id: 'demo',
  name: 'Demo Scene',
  images: {
    front: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000&h=2000',
    back: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000&h=2000',
    left: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000&h=2000',
    right: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000&h=2000',
    top: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000&h=2000',
    bottom: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000&h=2000',
  },
  connections: {
    left: 'scene2',
    right: 'scene3',
    forward: 'scene4',
  },
};

function App() {
  const [currentScene] = useState<Scene>(demoScene);

  return (
    <div className="relative h-screen w-screen bg-gray-900">
      <ThreeScene currentScene={currentScene} />
      
      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          className="p-4 bg-gray-900/80 rounded-full border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all duration-300"
          onClick={() => console.log('Left')}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          className="p-4 bg-gray-900/80 rounded-full border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all duration-300"
          onClick={() => console.log('Forward')}
        >
          <MoveUp className="w-6 h-6 text-white" />
        </button>
        
        <button
          className="p-4 bg-gray-900/80 rounded-full border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all duration-300"
          onClick={() => console.log('Right')}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

export default App;