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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus commodi nesciunt autem, consequatur
                ullam quibusdam corporis eius voluptates error nisi!
              </p>
              <p className="text-lg text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              {/* <div className="flex text-lg text-center items-center">
                    <span>Lorem ipsum dolor sit amet.</span>
                    <Button className="ml-4 text-base">Let's start.</Button>
                  </div> */}
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-16 flex items-center">
            <CardContent className="flex items-center justify-center flex-col gap-6">
              <div>
                <img src="public/schism.svg" alt="logo" width="400" ref={glitch.ref} />
              </div>
              <p className="text-lg text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi corporis odio officiis, perferendis
                deleniti consectetur dolorum cumque ad hic similique repellendus nostrum natus cupiditate aspernatur!
                Vel maxime vitae atque quia.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="h-full p-16 flex items-center justify-center">
            <CardContent className="flex items-center justify-center flex-col gap-6">
              <p className="text-lg text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, veniam?
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
