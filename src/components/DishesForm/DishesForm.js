import React, { useState } from "react";
import './DishesForm.scss';
import DishesOptions from "../../data/DishesOptions";

function DishesForm() {
  const [formData, setFormData] = useState({
    name: "",
    preparation_time: "",
    type_of_dish: "",
    //For pizza
    number_of_slice: "",
    diameter: "",
    //For soup
    spiciness_scale: "",
    //For sandwich
    slices_of_bread: "",
  });

  const URL = "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData ={};
    for (const [key, value] of Object.entries(formData)){
      if (value !== "") {
      reqData[key] = value
      }
    }
    console.log(reqData);

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
    .catch(error => {
        console.error(error);
    });
    // Clear field in form
      const emptyFormData = Object.fromEntries(
        Object.keys(formData).map((key) => [key, ""])
      );
      setFormData(emptyFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dish_name">Dish name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="preparation_time">Preparation time:</label>
        <input
          type="time"
          step ="1"
          id="preparation_time"
          name="preparation_time"
          value={formData.preparation_time}
          onChange={handleInputChange}
          required
        />
      </div>

      <label htmlFor="dish_type">Dish type:</label>
      <select onChange={handleInputChange} required name="type_of_dish" value={formData.type_of_dish}>
        {DishesOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.value}</option>
        ))}
      </select>

      {formData.type_of_dish === 'Pizza' &&
        <div>
          <h2>Pizza</h2>
          <label htmlFor="number_of_slice">Number of slice:</label>
          <input
            type="number"
            id="number_of_slice"
            name="number_of_slice"
            value={formData.number_of_slice}
            onChange={handleInputChange}
            min="1"
            required
          />
          <label htmlFor="diameter">Diameter:</label>
          <input
            type="number"
            step="0.01"
            id="diameter"
            name="diameter"
            value={formData.diameter}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>}
      {formData.type_of_dish === 'Soup' &&
        <div>
          <h2>Soup</h2>
        <label htmlFor="soup">Spiciness scale (1 - 10):</label>
        <input
          type="number"
          min="1" max="10"
          id="spiciness_scale"
          name="spiciness_scale"
          value={formData.spiciness_scale}
          onChange={handleInputChange}
          required
        />
      </div>}
      {formData.type_of_dish === 'Sandwich' &&
        <div>
          <h2>Sandwich</h2>
          <label htmlFor="slices_of_bread">Slices of bread:</label>
            <input
              type="number"
              id="slices_of_bread"
              name="slices_of_bread"
              value={formData.slices_of_bread}
              onChange={handleInputChange}
              min="1"
              required
            />
        </div>}

      <button type="submit" >
        Submit
      </button>

    </form>
  );
}

export default DishesForm;