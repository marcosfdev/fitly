import React from 'react';
import Workouts from './workouts/Workouts';
import Navigation from './Navigation'


  const Dashboard = () => {
    return (
      <div>
        <Navigation />
        <Workouts /> 
      </div>
    )
  }

  export default Dashboard;