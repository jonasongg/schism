import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { motion } from 'framer-motion';
import { buttonVariants } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel';
import { useGlitch } from 'react-powerglitch';
import { GameStatus } from '@/App';

interface StartingScreenProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  instructions: boolean | null;
  setInstructions: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const StartingScreen = ({ setGameStatus, instructions, setInstructions }: StartingScreenProps) => {
  const glitch = useGlitch({
    playMode: 'hover',
    shake: {
      amplitudeX: 0.1,
      amplitudeY: 0.1,
    },
    slice: {
      count: 5,
      velocity: 10,
    },
  });

  return (
    <Carousel className="w-4/5 h-full">
      <CarouselContent className="h-full">
        <CarouselItem>
          <Card className="h-full p-16 flex items-center">
            <CardContent className="flex items-center justify-center flex-col gap-6">
              <div>
                <img src="public/schism.svg" alt="logo" width="400" ref={glitch.ref} />
              </div>
              <p className="text-lg text-center">
                Welcome to Schism, a game about self-identity and navigating the chaotic world of messaging services.
                <br /> <br />
                In this simulator, you will experience a relentless influx of messages from various social circles, each
                demanding your attention and response. Through gameplay, you will discover the profound impact of
                messaging services on our sense of identity, highlighting the disconcerting reality of fragmented selves
                in the digital age.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-16 flex items-center">
            <CardContent className="flex items-center justify-center flex-col gap-10 pt-6">
              <div>
                <iframe src="https://lottie.host/embed/d064e008-4524-4a53-96cd-ca64b52ac8d7/Bap9ef5Rwa.json"></iframe>
              </div>
              <p className="text-lg text-center">
                Today, technology has brought us closer together than ever before, yet it has also ushered in
                unprecedented challenges to our sense of self. As you navigate the virtual landscape of this game, you
                will confront the notion of self-fragmentation, and discover that the self has become more alien than
                you ever realised. <br /> <br />
                Are you prepared to unravel the layers of your digital existence and confront the unsettling truths
                hidden within?
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-16 flex items-center justify-center">
            <CardContent className="flex items-center justify-center flex-col gap-6">
              <p className="text-lg text-center">
                Before we begin, have you played this game before? <br /> This will decide whether or not instructions
                will be given to you as you play.
              </p>
              <RadioGroup onValueChange={(value) => (value === 'yes' ? setInstructions(false) : setInstructions(true))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label className="text-base" htmlFor="yes">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label className="text-base" htmlFor="no">
                    No
                  </Label>
                </div>
              </RadioGroup>
              {instructions != null && (
                <motion.button
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  className={buttonVariants({ variant: 'default' })}
                  onClick={() => setGameStatus(GameStatus.PLAYING)}
                >
                  Let's start.
                </motion.button>
              )}
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StartingScreen;
