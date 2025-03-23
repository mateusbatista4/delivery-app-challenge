import React, { useEffect, useState } from 'react';
import { getConsults } from './apiRequests';
import Modal from 'react-modal';

const ConsultList = () => {
  const [consults, setConsults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchConsults = async () => {
      try {
        const data = await getConsults();
        setConsults(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch consults from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsults();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;
  }

  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '0px',
        maxWidth: '400px',
        //height: 'min-content',
        width: '90%',
    },
    
    image: {
        maxWidth: '100%',
    },

    
    buttonsContainer: {
        width: '100%',
        position: 'absolute', // Botões com posicionamento absoluto
        bottom: '10px', // Distância da parte inferior do modal
        left: '50%', // Centralizar horizontalmente
        transform: 'translateX(-50%)', // Centralizar horizontalmente
        textAlign: 'center',
    },

    app_button: {
        width: "95%",
        margin: '3px',
        padding: '10px 10px',
        borderRadius: '15px',
        backgroundColor: '#FF033E',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
    },
    button: {
        width: "95%",
        margin: '5px 5px',
        'border-color': 'transparent',
        padding: "8px",
        borderRadius: '15px',
        backgroundColor: 'white',
        color: '#fff',
        cursor: 'pointer',
        color: 'black'
    },
};

  Modal.setAppElement('#root');
  


  const handleOpenModal = (item) => {
      console.log("Caiu")
      setIsModalOpen(true);
      setSelectedItem(item)
  };

  const handleCloseModal = (send = false) => {
      setIsModalOpen(false);
      setSelectedItem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Consults List</h1>
      {/* (selectedItem ? 
      <div className="modal">
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => handleCloseModal(false)}
                    contentLabel="Modal de exemplo"
                    style={customStyles}
                >
                  
                    {selectedItem}
                </Modal>
            </div> : null) */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {consults.map((consult, index) =>{ 
        const date = new Date(consult.created_at);
        const formattedDateTime = date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        return(
        <div key={index} className="items-l" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginTop: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minWidth: '500px'
      }}>
          <div onClick={() => handleOpenModal(consult)}  style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', alignContent: 'center' }}>
              
              <span style={{ marginLeft: '10px', color: '#666' }}> {consult.distance}km</span>
              <span style={{ marginLeft: '10px', color: '#666' }}>-</span>
              <span style={{ marginLeft: '10px', color: '#666' }}> {consult.created_at}</span>
          </div>
         
      </div>
      )})}
    </div>
  );
};

export default ConsultList; 