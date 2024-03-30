import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { motion, useAnimationControls } from 'framer-motion';
import { buttonVariants } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel';
import { useGlitch } from 'react-powerglitch';
import { GameStatus } from '@/App';
import { useEffect } from 'react';

interface StartingScreenProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  instructions: boolean | null;
  setInstructions: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const StartingScreen = ({ setGameStatus, instructions, setInstructions }: StartingScreenProps) => {
  const schismGlitch = useGlitch({
    // playMode: 'hover',
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
  const textGlitch = useGlitch({
    shake: {
      amplitudeX: 0.03,
      amplitudeY: 0.03,
    },
    slice: {
      count: 1,
      velocity: 8,
      minHeight: 0.1,
      maxHeight: 0.1,
    },
    glitchTimeSpan: false,
  });

  const controls = useAnimationControls();

  useEffect(() => {
    if (instructions != null) {
      controls.start({ y: -20 });
    }
  }, [instructions]);

  return (
    <Carousel className="w-4/5 h-full">
      <CarouselContent className="h-full">
        <CarouselItem>
          <Card className="p-16">
            <CardTitle className="flex justify-center">
              <img src="schism.svg" alt="logo" width="400" ref={schismGlitch.ref} />
            </CardTitle>
            <CardContent>
              <p className="text-lg text-center">
                Welcome to <em>Schism</em>, a game about self-identity and navigating the chaotic world of messaging
                services.
                <br /> <br />
                In this simulator, you'll experience a relentless influx of messages from various social circles, each
                demanding your attention and response. Through gameplay, you'll discover the profound impact of
                messaging services on our sense of identity, highlighting the disconcerting reality of fragmented selves
                in the digital age.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-16">
            <CardTitle className="p-8 flex justify-center">
              <iframe src="https://lottie.host/embed/d064e008-4524-4a53-96cd-ca64b52ac8d7/Bap9ef5Rwa.json"></iframe>
            </CardTitle>
            <CardContent>
              <p className="text-lg text-center">
                Today, technology has brought us closer together than ever before, yet it has also ushered in
                unprecedented challenges to our sense of self. As you navigate this game, you'll confront the notion of
                self-fragmentation—and discover the self has become more alien than you've ever realised. <br /> <br />
                Are you prepared to unravel the layers of your digital existence and confront the{' '}
                <span ref={textGlitch.ref}>unsettling truths</span> hidden within?
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full flex items-center justify-center flex-col">
            <motion.div animate={controls} className="absolute w-full flex items-center flex-col gap-6">
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
            </motion.div>
            {instructions != null && (
              <motion.button
                initial={{ y: 70 }}
                animate={{ y: 90 }}
                className={buttonVariants({ variant: 'default' })}
                onClick={() => setGameStatus(GameStatus.PLAYING)}
              >
                Let's start.
              </motion.button>
            )}
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="animate-bounce" />
    </Carousel>
  );
};

export default StartingScreen;
