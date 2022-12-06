import React from 'react';
import Modal from 'react-modal';

class MyComponent extends React.Component {
  state = {
    showModal: false
  };

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
        >
          {/* Modal content goes here */}
        </Modal>
      </div>
    );
  }
}