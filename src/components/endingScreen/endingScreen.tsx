import { Card, CardContent, CardTitle } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel';
import { useGlitch } from 'react-powerglitch';
import { GameStatus } from '@/App';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

interface EndingScreenProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

const EndingScreen = ({ setGameStatus }: EndingScreenProps) => {
  const schismGlitch = useGlitch({
    shake: {
      velocity: 6,
      amplitudeX: 0.03,
      amplitudeY: 0.03,
    },
    slice: {
      count: 3,
      velocity: 4,
    },
    glitchTimeSpan: {
      start: 0,
      end: 1,
    },
  });

  return (
    <Carousel className="w-4/5 h-full">
      <CarouselContent className="h-full">
        <CarouselItem>
          <Card className="p-16">
            <CardTitle ref={schismGlitch.ref} className="text-8xl font-medium text-center p-8 pb-12">
              GAME OVER.
            </CardTitle>
            <CardContent>
              <p className="text-lg text-center">
                <strong>You've lost.</strong> You've failed to keep up with the demands of your digital life, and now
                you're left stranded in a sea of unanswered messages.
                <br /> <br />
                Seems like an exaggeration? Maybe. But the truth is, this game is a reflection of the digital reality in
                which so many find themselves deeply entrenched, one which is perpetually accelerating, voraciously
                demanding its users' attention at every turn.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-16 flex items-center">
            <p className="text-lg text-center">
              And it's a world <span className="line-through">you're</span> we're all addicted to. The constant pings,
              the endless scrolling, the never-ending notifications—it's all designed to keep us hooked. But at what
              cost?
              <br /> <br />
              With each message sent and received, every chat opened and closed, with every notification in a ceaseless
              stream we frantically manouevre around, with every persona we adopt and discard, the possibility of a
              coherent self becomes ever more elusive, and the specter of schism looms ominously.
              <br /> <br />
              We've become merely nodes in a vast, apathetic network, our identities fragmented and dispersed across the
              digital ether. Entering a chat, do we truly control the words we type? Or are we merely marionettes
              playing out a script written by the invisible hand of the network?
              <br /> <br />
              Can we ever truly be ourselves in a world that demands we be everything to everyone?
            </p>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-20 flex flex-col items-center justify-center">
            <p className="text-lg text-center">
              After this game, you'll probably close the tab and hop back onto Telegram or whatever messaging service
              you use. They are, after all, indispensable tools for communication, right? But just before you do, take a
              moment to review the way you've played this game. What did you say? What did you reveal about yourself to
              your Friend? What did you hide from your Manager?
              <br /> <br />
              Is this really just a game?
            </p>
            <button
              className={cn('mt-6', buttonVariants({ variant: 'default' }))}
              onClick={() => setGameStatus(GameStatus.REVIEW)}
            >
              Let's see...
            </button>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="animate-bounce" />
    </Carousel>
  );
};

export default EndingScreen;
