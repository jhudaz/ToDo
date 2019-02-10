import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import '../App.scss';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (

      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
        <h2>Description</h2>
        <input
          className='inputs'
          type="text"
          onChange={() => console.log()}
          />
      </div>
    );
  }
}
function mapStateToProps() {

}
function mapDispatchToProps() {

}
export default Edit;
