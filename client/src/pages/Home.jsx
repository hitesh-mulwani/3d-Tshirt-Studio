import {motion,AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
import{
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap= useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <p className='text-lg md:text-xl italic font-bold underline text-gray-900'>Powered by AI</p>
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <p className='head-text'>
              TSHIRT<br className='lg:block hidden'/> STUDIO
              </p>
            </motion.div>

            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='home-description'>
              Design your perfect shirt with our <strong>3D customization tool:</strong> choose <strong>colors</strong>, upload <strong>logos</strong> and <strong>designs</strong>, or let <strong>AI</strong> create unique designs and logos just for you!
              </p>

              <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={()=> state.intro = false}
                customStyles="w-full w-fit py-2.5 px-4  font-bold text-sm"
              />
            </motion.div>

          </motion.div>

        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home