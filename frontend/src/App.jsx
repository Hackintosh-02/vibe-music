import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Right from './components/Right';
import axios from 'axios';

const App = () => {
    const [songs, setSongs] = useState([]); // Holds the list of songs
    const [currentSong, setCurrentSong] = useState(null); // Holds the current song
    const [isPlaying, setIsPlaying] = useState(false); // Holds the play/pause state
    const [currentIndex, setCurrentIndex] = useState(0); // Keeps track of the current song's index
    const [isLooping, setIsLooping] = useState(false); // State for looping
    const [isShuffling, setIsShuffling] = useState(false); // State for shuffling

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/songs');
                setSongs(response.data);
                if (response.data.length > 0) {
                    setCurrentSong(response.data[0]);
                    setCurrentIndex(0);
                }
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const handlePlayPause = (song) => {
        if (song) {
            if (currentSong && currentSong._id === song._id) {
                setIsPlaying(!isPlaying); // Toggle play/pause for the same song
            } else {
                setCurrentSong(song); // Select a new song
                setIsPlaying(true); // Start playing the new song
                setCurrentIndex(songs.findIndex(s => s._id === song._id)); // Update current index
            }
        } else {
            setIsPlaying(false); // Pause the current song
        }
    };

    const playNextSong = () => {
        if (songs.length > 0) {
            let nextIndex;
            if (isShuffling) {
                nextIndex = Math.floor(Math.random() * songs.length);
            } else {
                nextIndex = (currentIndex + 1) % songs.length;
            }
            setCurrentIndex(nextIndex);
            setCurrentSong(songs[nextIndex]);
            setIsPlaying(true);
        }
    };
    

    const playPreviousSong = () => {
        console.log('playPreviousSong function called');
        if (songs.length > 0) {
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            setCurrentIndex(prevIndex);
            setCurrentSong(songs[prevIndex]);
            setIsPlaying(true);
        }
    };

    // Define the toggle functions
    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-b from-red-800 to-black">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header />
                <MainContent 
                    songs={songs}
                    currentSong={currentSong} 
                    onPlayPause={handlePlayPause} 
                />
            </div>
            <Right
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={playNextSong}
                onPrevious={playPreviousSong}
                toggleShuffle={toggleShuffle} // Pass the shuffle toggle function
                toggleLoop={toggleLoop} // Pass the loop toggle function
                isShuffling={isShuffling} // Pass the shuffle state
                isLooping={isLooping} // Pass the loop state
            />
        </div>
    );
};

export default App;
