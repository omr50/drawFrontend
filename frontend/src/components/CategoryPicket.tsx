import React, { useState, useEffect } from "react";

interface CategoryPickerProps {
  onSelectCategory: (category: string) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  onSelectCategory,
}) => {
  const categories: string[] = [
    "bear",
    "bird",
    "cat",
    "cow",
    "dog",
    "elephant",
    "horse",
    "lion",
    "penguin",
    "rabbit",
  ];
  const [randomCategory, setRandomCategory] = useState<string | null>(null);

  useEffect(() => {
    chooseRandomCategory();
  }, []);

  const chooseRandomCategory = () => {
    const randomIndex: number = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomIndex];
    setRandomCategory(selectedCategory);
    onSelectCategory(selectedCategory);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "0.75rem",
      }}
    >
      <p style={{ fontSize: "1rem", fontWeight: "normal" }}>
        Category:{" "}
        <span style={{ color: "#007bff", fontWeight: "bold" }}>
          {randomCategory?.toUpperCase()}
        </span>
      </p>
    </div>
  );
};

export default CategoryPicker;
