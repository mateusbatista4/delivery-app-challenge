import React, { useState } from 'react';
import ConsultForm from './ConsultForm';
import ConsultList from './ConsultList';

const ConsultPage = () => {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('form')}>Consult Form</button>
        <button onClick={() => setActiveTab('list')}>Consults List</button>
      </nav>

      <div>
        {activeTab === 'form' && <ConsultForm />}
        {activeTab === 'list' && <ConsultList />}
      </div>
    </div>
  );
};

export default ConsultPage;