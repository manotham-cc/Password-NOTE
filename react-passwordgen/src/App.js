import React, { useState } from 'react';
import './App.css';

import Checkbox from './components/Checkbox';

const App = () => {
  const [passwordGen, setPasswordGen] = useState({
    length: 8,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handelText, setHandelText] = useState({
    password: '',
    platform: '',
    note: '',
  });

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (name) => {
    setPasswordGen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setHandelText((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const setPasswordLength = (value) => {
    const length = parseInt(value);
    setPasswordGen((prevState) => ({
      ...prevState,
      length: isNaN(length) ? 0 : length,
    }));
  };

  const generatePassword = () => {
    const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const availableCharacters = [
      ...(lowercase ? lowerCaseLetters : []),
      ...(uppercase ? upperCaseLetters : []),
      ...(numbers ? numbersArray : []),
      ...(symbols ? symbolsArray : []),
    ];

    const generateTheWord = () => {
      const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };

      const shuffledCharacters = shuffleArray(availableCharacters);
      return shuffledCharacters.slice(0, length).join('');
    };

    const generatedPassword = generateTheWord();
    setHandelText((prevState) => ({
      ...prevState,
      password: generatedPassword,
    }));
  };

  const copyToClipboard = () => {
    const { password, platform, note } = handelText;
    const textToCopy = `Password: ${password}\nPlatform: ${platform}\nNote: ${note}`;

    if (password.length > 0 && platform.length > 0) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h2>Password Generator</h2>
        <div className="password-box">
          <input
            type="text"
            value={handelText.password}
            placeholder=""
            autoComplete="off"
            onChange={(e) => handleInputChange(e, 'password')}
          />
          <input
            type="text"
            value={handelText.platform}
            placeholder="Platform or Purpose"
            autoComplete="off"
            onChange={(e) => handleInputChange(e, 'platform')}
          />
          <input
            type="text"
            value={handelText.note}
            placeholder="Note (optional)"
            autoComplete="off"
            onChange={(e) => handleInputChange(e, 'note')}
          />

          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy text'}
          </button>
        </div>
        <br />
        <div className="word-criteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="4"
              max="20"
              value={passwordGen.length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include uppercase letters</label>
          </div>
          <div>
            <Checkbox
              checked={passwordGen.uppercase}
              onChange={() => handleCheckboxChange('uppercase')}
            />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include lowercase letters</label>
          </div>
          <div>
            <Checkbox
              checked={passwordGen.lowercase}
              onChange={() => handleCheckboxChange('lowercase')}
            />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
            <Checkbox
              checked={passwordGen.numbers}
              onChange={() => handleCheckboxChange('numbers')}
            />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div>
            <Checkbox
              checked={passwordGen.symbols}
              onChange={() => handleCheckboxChange('symbols')}
            />
          </div>
        </div>
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>
      </div>
      <a href="http://localhost:5173/">Next to note</a>
    </div>
  );
};

export default App;
