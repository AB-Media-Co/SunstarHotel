/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const TagsInput = ({ setAmmenities }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load saved tags from localStorage when the component mounts
  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem('tags')) || [];
    setTags(savedTags);
    setAmmenities(savedTags);
  }, [setAmmenities]);

  // Update localStorage whenever tags change

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTags = (e) => {
    if (e.keyCode === 13) {
      const newTag = e.target.value.toLowerCase();
      if (!isDuplicateOrEmpty(newTag)) {
        setTags((prevTags) => [...prevTags, newTag]);
        setAmmenities((prevTags) => [...prevTags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagIndex) => {
    const updatedTags = tags.filter((_, index) => index !== tagIndex);
    setTags(updatedTags);
    setAmmenities(updatedTags);
  };

  const isDuplicateOrEmpty = (newTag) => {
    if (newTag.trim().length === 0) {
      return true;
    }

    const index = tags.findIndex((tag) => tag === newTag);
    return index !== -1;
  };

  return (
    <div className="bg-white border border-gray-300 shadow-inner flex flex-wrap py-2 rounded-md min-h-[42px] max-w-full">
      {tags.map((tag, i) => (
        <span 
          key={i} 
          className="flex items-center bg-cyan-500 text-white text-sm font-bold rounded-md px-2 py-1 m-1"
        >
          {tag}
          <span 
            className="ml-2 cursor-pointer" 
            onClick={() => removeTag(i)}
          >
            x
          </span>
        </span>
      ))}
      <input 
        type="text"
        className="border-none shadow-none outline-none bg-transparent px-2 w-auto flex-1" 
        onKeyUp={addTags} 
        onChange={handleChange} 
        value={inputValue} 
        autoFocus 
      />
    </div>
  );
};

export default TagsInput;
