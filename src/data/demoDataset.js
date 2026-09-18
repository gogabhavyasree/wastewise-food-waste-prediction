export const generateDemoData = () => {
  const data = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];
  
  for (let i = 0; i < 1050; i++) {
    const mealsServed = Math.floor(Math.random() * 800) + 200; // 200 to 1000
    const kitchenStaff = Math.floor(mealsServed / 50) + Math.floor(Math.random() * 5) - 2;
    const temperature = Math.floor(Math.random() * 15) + 20; // 20 to 35
    const humidity = Math.floor(Math.random() * 40) + 40; // 40 to 80
    const day = days[i % 7];
    const isWeekend = day === 'Saturday' || day === 'Sunday';
    const specialEvent = isWeekend ? (Math.random() > 0.5 ? 'Yes' : 'No') : (Math.random() > 0.8 ? 'Yes' : 'No');
    const pastWaste = (mealsServed * 0.05) + (Math.random() * 10 - 5); // Roughly 5% of meals
    const staffExperience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
    
    // Target variable with some logic based on features
    let foodWasteBase = (mealsServed * 0.04);
    if (temperature > 30) foodWasteBase *= 1.1;
    if (specialEvent === 'Yes') foodWasteBase *= 1.2;
    if (staffExperience === 'Beginner') foodWasteBase *= 1.15;
    if (staffExperience === 'Expert') foodWasteBase *= 0.9;
    
    const foodWaste = Math.max(0, foodWasteBase + (Math.random() * 8 - 4));

    data.push({
      id: i + 1,
      'Meals Served': mealsServed,
      'Kitchen Staff': Math.max(2, kitchenStaff),
      'Temperature (°C)': temperature,
      'Humidity (%)': humidity,
      'Day': day,
      'Special Event': specialEvent,
      'Past Waste (kg)': parseFloat(Math.max(0, pastWaste).toFixed(2)),
      'Staff Experience': staffExperience,
      'Food Waste (kg)': parseFloat(foodWaste.toFixed(2))
    });
  }
  
  // Add some missing/duplicate records for preprocessing demo
  // Introduce missing values
  data[10]['Kitchen Staff'] = null;
  data[45]['Temperature (°C)'] = null;
  data[102]['Staff Experience'] = null;
  
  // Introduce duplicate
  data.push({...data[0], id: 1051});
  data.push({...data[15], id: 1052});

  return data;
};

export const demoDataset = generateDemoData();
