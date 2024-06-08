import React, { useState } from "react";
import { Container, VStack, Text, Select, Button, HStack, Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaLeaf, FaTrash } from "react-icons/fa";

const activities = [
  { name: "Driving a car (1 mile)", emissions: 0.411 },
  { name: "Using a computer (1 hour)", emissions: 0.05 },
  { name: "Taking a shower (10 minutes)", emissions: 0.3 },
  { name: "Cooking (1 meal)", emissions: 0.5 },
  { name: "Watching TV (1 hour)", emissions: 0.1 },
];

const globalAverageDailyEmissions = 14.0; // in kg CO2
const globalAverageWeeklyEmissions = 98.0; // in kg CO2

const Index = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [dailyEmissions, setDailyEmissions] = useState([]);
  const [weeklyEmissions, setWeeklyEmissions] = useState([]);

  const handleAddActivity = () => {
    const activity = activities.find((act) => act.name === selectedActivity);
    if (activity) {
      setDailyEmissions([...dailyEmissions, activity]);
    }
  };

  const handleRemoveActivity = (index) => {
    const newDailyEmissions = dailyEmissions.filter((_, i) => i !== index);
    setDailyEmissions(newDailyEmissions);
  };

  const calculateTotalEmissions = (emissions) => emissions.reduce((total, activity) => total + activity.emissions, 0);

  const handleEndOfDay = () => {
    setWeeklyEmissions([...weeklyEmissions, dailyEmissions]);
    setDailyEmissions([]);
  };

  const dailyTotalEmissions = calculateTotalEmissions(dailyEmissions);
  const weeklyTotalEmissions = calculateTotalEmissions(weeklyEmissions.flat());

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Track Your Carbon Footprint</Text>
        <HStack width="100%">
          <Select placeholder="Select activity" value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
            {activities.map((activity, index) => (
              <option key={index} value={activity.name}>
                {activity.name} - {activity.emissions} kg CO2
              </option>
            ))}
          </Select>
          <Button onClick={handleAddActivity} colorScheme="green">
            Add Activity
          </Button>
        </HStack>
        <Box width="100%">
          <Text fontSize="lg">Today's Activities</Text>
          <List spacing={3}>
            {dailyEmissions.map((activity, index) => (
              <ListItem key={index}>
                <HStack justifyContent="space-between">
                  <Text>
                    {activity.name} - {activity.emissions} kg CO2
                  </Text>
                  <Button size="sm" colorScheme="red" onClick={() => handleRemoveActivity(index)}>
                    <FaTrash />
                  </Button>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box width="100%">
          <Text fontSize="lg">Daily Total Emissions: {dailyTotalEmissions.toFixed(2)} kg CO2</Text>
          <Text fontSize="lg">Global Average Daily Emissions: {globalAverageDailyEmissions} kg CO2</Text>
        </Box>
        <Button onClick={handleEndOfDay} colorScheme="blue">
          End of Day
        </Button>
        <Box width="100%">
          <Text fontSize="lg">Weekly Total Emissions: {weeklyTotalEmissions.toFixed(2)} kg CO2</Text>
          <Text fontSize="lg">Global Average Weekly Emissions: {globalAverageWeeklyEmissions} kg CO2</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
