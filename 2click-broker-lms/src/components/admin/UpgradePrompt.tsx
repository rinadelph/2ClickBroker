import React from 'react';

interface UpgradePromptProps {
  currentPlan: string;
  availablePlans: string[];
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ currentPlan, availablePlans }) => {
  return (
    <div className="upgrade-prompt">
      <h2>Upgrade Your Plan</h2>
      <p>Your current plan: {currentPlan}</p>
      <ul>
        {availablePlans.map((plan, index) => (
          <li key={index}>{plan}</li>
        ))}
      </ul>
      <button onClick={() => console.log('Upgrade clicked')}>Upgrade Now</button>
    </div>
  );
};

export default UpgradePrompt;
