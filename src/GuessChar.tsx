import React, { useState, useEffect } from "react";
import Character, {
  CharacterType,
} from "C:/Users/pedro/OneDrive/Documents/Web-Sites/fightdle/models/Character";

// 3. Game component
const GuessingGame: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]); // State to store characters fetched from the backend
  const [winningCharacter, setWinningCharacter] = useState<any | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [suggestions, setSuggestions] = useState<CharacterType[]>([]);

  // 1. Fetch characters from the backend when the component mounts
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/characters"); //Fetch characters from db
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        const data = await response.json();
        console.log("Characters data:", data); // Log the data to check it

        setCharacters(data);

        //Set the winning character to the first character or choose a different one
        setWinningCharacter(
          data.find((characters: any) => characters.name === "Ryu") ||
            characters[0]
        );
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []); // Empty dependency array to run the fetch on mount

  //Handle input changes and filter suggestions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setGuess(query);

    if (query.length > 1) {
      const filteredSuggestions = characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // 4. Handle guesses
  const handleGuess = (guessedName: string) => {
    const guessedCharacter = characters.find((c) => c.name === guessedName);
    if (!guessedCharacter) {
      setFeedback(["Character not found. Try again!"]);
      return;
    }

    // Check if the guessed character is the winning character
    if (guessedCharacter.name === winningCharacter.name) {
      setFeedback(["Correct! You guessed the winning character."]);
    } else {
      // Compare attributes and generate feedback
      const feedbackList: string[] = [];

      //Gender check
      if (guessedCharacter.gender === winningCharacter.gender) {
        feedbackList.push("Gender matches!");
      } else {
        feedbackList.push("Gender does not match.");
      }

      //Archetype check
      const allArchetypesMatch = winningCharacter.archetype.every(
        (archetype: string) => guessedCharacter.archetype.includes(archetype)
      );

      //Exact match
      const exactArchetypeMatch =
        allArchetypesMatch &&
        guessedCharacter.archetype.length === winningCharacter.archetype.length;

      //Partial match
      const partialArchetypeMatch =
        allArchetypesMatch ||
        guessedCharacter.archetype.some((archetype: string) =>
          winningCharacter.archetype.includes(archetype)
        );

      if (exactArchetypeMatch) {
        feedbackList.push("Archetype fully matches!");
      } else if (partialArchetypeMatch) {
        feedbackList.push("Archetype partially matches.");
      } else {
        feedbackList.push("Archetype does not match.");
      }

      //Birthplace check
      if (guessedCharacter.birthplace === winningCharacter.birthplace) {
        feedbackList.push("Birthplace matches!");
      } else {
        feedbackList.push("Birthplace does not match.");
      }

      //First appearance check
      if (
        guessedCharacter.firstAppearance === winningCharacter.firstAppearance
      ) {
        feedbackList.push("First Appearance matches!");
      } else {
        feedbackList.push("First Appearance does not match.");
      }

      //Push feedback list
      setFeedback(feedbackList);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={guess}
        onChange={(e) => {
          setGuess(e.target.value);
          handleInputChange(e);
        }}
        placeholder="Enter character name"
        className="your-input-class"
      />
      <button onClick={() => handleGuess(guess)}>Submit Guess</button>
      <div>
        {feedback.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded shadow mt-2">
          {suggestions.map((character) => (
            <li key={character.name} className="p-2 hover:bg-gray-200">
              {character.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuessingGame;
