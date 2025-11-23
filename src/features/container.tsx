import { Badge, Card, Text, Input, Button } from "@/shared/ui";
import { Sparkles } from "lucide-react";
import { PolymarketLogo } from "@/assets/icons";

// type Star = {
//   id: number;
//   x: number;
//   y: number;
//   size: number;
//   duration: number;
//   delay: number;
//   isFalling: boolean;
// };

// function StarryBackground() {
//   const [stars, setStars] = useState<Star[]>([]);

//   useEffect(() => {
//     // Generate initial stars
//     const initialStars: Star[] = Array.from({ length: 100 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 3 + 1.5,
//       duration: Math.random() * 3 + 2,
//       delay: Math.random() * 10,
//       isFalling: false,
//     }));
//     setStars(initialStars);

//     // Randomly make stars fall
//     const interval = setInterval(() => {
//       setStars((prevStars) => {
//         const starIndex = Math.floor(Math.random() * prevStars.length);
//         return prevStars.map((star, idx) => {
//           if (idx === starIndex && !star.isFalling) {
//             return { ...star, isFalling: true };
//           }
//           return star;
//         });
//       });
//     }, 3000); // Every 3 seconds, one star might start falling

//     return () => clearInterval(interval);
//   }, []);

//   const handleAnimationEnd = (starId: number) => {
//     setStars((prevStars) =>
//       prevStars.map((star) =>
//         star.id === starId
//           ? {
//               ...star,
//               isFalling: false,
//               y: Math.random() * 100,
//               x: Math.random() * 100,
//             }
//           : star
//       )
//     );
//   };

//   return (
//     <div
//       className="fixed inset-0 overflow-hidden pointer-events-none"
//       style={{ zIndex: 0 }}
//     >
//       {stars.map((star) => (
//         <div
//           key={star.id}
//           className="absolute rounded-full"
//           style={{
//             left: `${star.x}%`,
//             top: `${star.y}%`,
//             width: `${star.size}px`,
//             height: `${star.size}px`,
//             backgroundColor: "#ffffff",
//             opacity: star.isFalling ? 1 : 0.7,
//             animation: star.isFalling
//               ? `fall ${star.duration}s linear forwards`
//               : `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
//             boxShadow: `0 0 ${star.size * 4}px rgba(255, 255, 255, 0.9), 0 0 ${star.size * 2}px rgba(255, 255, 255, 0.6)`,
//           }}
//           onAnimationEnd={() => star.isFalling && handleAnimationEnd(star.id)}
//         />
//       ))}
//       <style>{`
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.9; }
//         }
//         @keyframes fall {
//           0% {
//             transform: translateY(0) translateX(0);
//             opacity: 0.8;
//           }
//           100% {
//             transform: translateY(100vh) translateX(50px);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-muted/40 border-border transition-all duration-300 backdrop-blur-sm">
      <Card.Content className="p-6 flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20 transition-colors">
          {icon}
        </div>
        <div className="space-y-1">
          <Text className="font-semibold text-foreground">{title}</Text>
          <Text className="text-sm text-muted-foreground">{description}</Text>
        </div>
      </Card.Content>
    </Card>
  );
}

const Container = () => {
  return (
    <>
      {/* Starry Background */}
      {/* <StarryBackground /> */}
      <PolymarketLogo className="w-10 h-10 text-white" />

      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 space-y-12 relative z-10">
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <Badge
            variant="secondary"
            className="px-4 py-1.5 bg-primary/30 text-white border-primary/50 hover:bg-primary/40 transition-colors"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            AI-Powered Market Intelligence
          </Badge>

          <div className="space-y-4">
            <Text
              as="h1"
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              Munar
            </Text>
            <Text color="secondary" className="text-lg max-w-2xl mx-auto">
              Paste any Polymarket event URL to get instant deep analysis,
              sentiment tracking, and win probability predictions.
            </Text>
          </div>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-2xl space-y-4">
          <div className="relative grid gap-2 w-full">
            <Input
              centred
              placeholder="Paste a Polymarket event link..."
              className="h-14 text-base bg-muted/40 border-border focus-visible:ring-primary/30 pl-6 rounded-xl transition-all w-full"
            />
            <Button className="bg-primary hover:bg-primary/90 h-14 px-6 rounded-lg transition-all shadow-lg shadow-primary/20">
              Analyze
              <PolymarketLogo className="size-12 -ms-2 -me-2" />
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
          <FeatureCard
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            title="Sentiment Analysis"
            description="Real-time social tracking"
          />
          <FeatureCard
            icon={<Sparkles className="w-5 h-5 text-primary" />}
            title="Win Probability"
            description="AI-calculated odds"
          />
          <FeatureCard
            icon={<Eye className="w-5 h-5 text-primary" />}
            title="Whale Watching"
            description="Smart money movements"
          />
        </div> */}
      </div>
    </>
  );
};

export { Container };
