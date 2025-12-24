import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, FilePicker, CustomButton, Tab } from '../components';
import downloadImg from "../assets/download.png";
import github from "../assets/github.png";
import storeIcon from "../assets/store.png";


const Customizer = () => {
    const snap = useSnapshot(state);
    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false
    });

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return <FilePicker 
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />;
            default:
                return null;
        }
    }

    
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
    
        // Ensure that the result is correctly used, assuming it's a base64 string
        state[decalType.stateProperty] = result;
    
        // If a filter tab is not active, activate it
        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };
    
    const handleRedirectToGithub = () => {
        const url = "https://github.com/hitesh-mulwani/3d-Tshirt-Studio";
        window.open(url, "_blank");
    };
    
    const handleRedirectToStore = () => {
        window.open("https://3d-tshirt-studio.vercel.app/tshirtStore.html", "_blank");
    };
    
    
    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isFullTexture = false;
                state.isLogoTexture = true;
        }

        setActiveFilterTab((prevState) => ({
            ...prevState,
            [tabName]: !prevState[tabName]
        }));
    }

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("");
        });
    }

    return (
        <AnimatePresence>
            {
                !snap.intro && (
                    <>
                        <motion.div
                            key="custom"
                            className='absolute top-0 left-0 z-10'
                            {...slideAnimation('left')}
                        >
                            <div className='flex items-center min-h-screen'>
                                <div className='editortabs-container tabs'>
                                    {EditorTabs.map((tab) => (
                                        <Tab
                                            key={tab.name}
                                            tab={tab}
                                            handleClick={() => setActiveEditorTab(activeEditorTab === tab.name ? "" : tab.name)}
                                            isActiveTab={activeEditorTab === tab.name}
                                        />
                                    ))}
                                    {generateTabContent()}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                            <CustomButton
                                type="filled"
                                title="Go Back"
                                handleClick={() => state.intro = true}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            />
                        </motion.div>

                        <motion.div className='filtertabs-container' {...slideAnimation('up')}>
                            {FilterTabs.map((tab) => (
                                <Tab
                                    key={tab.name}
                                    tab={tab}
                                    isFilterTab
                                    isActiveTab={activeFilterTab[tab.name]}
                                    handleClick={() => handleActiveFilterTab(tab.name)}
                                />
                            ))}
                            <Tab
                                key="download-btn"
                                isFilterTab
                                tab={{
                                    name: "Download",
                                    icon: downloadImg,
                                }}
                                handleClick={() => downloadCanvasToImage()}
                            />
                            <Tab
                                key="github-btn"
                                isFilterTab
                                tab={{
                                    name: "github",
                                    icon: github,
                                }}
                                handleClick={handleRedirectToGithub}
                            />
                            <Tab
                                key="store-btn"
                                isFilterTab
                                    tab={{
                                        name: "Store",
                                        icon: storeIcon,
                                    }}
                                handleClick={handleRedirectToStore}
                            />

                        </motion.div>

                        {generatingImg && <div className="loading">Generating Image...</div>}
                    </>
                )
            }
        </AnimatePresence>
    );
}

export default Customizer;
