'use client';
import { useState } from 'react';
import { Button } from '../ui/button/button';

const Message = () => {
    const [inputText, setInputText] = useState(''); // State for storing input text

    const handleLogButtonClick = () => {
        console.log('Input Text:', inputText); // Log the input text when button is clicked
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%'
            }}
        >
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text..."
                rows={10}
                style={{ width: '100%', marginBottom: '10px' }} // Set width to 100% and add some bottom margin
            />
            <Button
                onClick={() => handleLogButtonClick()}
                text="Send Message"
                color="primary"
            />
        </div>
    );
};

export default Message;
