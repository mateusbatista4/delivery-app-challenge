import React, { useState } from 'react';
import { postConsult } from './apiRequests';

const ConsultForm = () => {
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        source_address: sourceAddress,
        destination_address: destinationAddress,
      };
      const response = await postConsult(data);
      setResult(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from server.');
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Consult Distance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Source Address:</label>
          <input
            type="text"
            value={sourceAddress}
            onChange={(e) => setSourceAddress(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label>Destination Address:</label>
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ border: '1px solid red', padding: '10px', marginTop: '10px' }}>
          <h2>Result:</h2>
          <h3>{result.distance}km</h3>
        </div>
      )}
    </div>
  );
};

export default ConsultForm; 