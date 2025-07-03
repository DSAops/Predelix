import { TextEffect } from '../../components/motion-primitives/text-effect';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <TextEffect per="char" preset="fade">
        Animate your ideas with motion-primitives
      </TextEffect>
    </div>
  );
}

export default Home;