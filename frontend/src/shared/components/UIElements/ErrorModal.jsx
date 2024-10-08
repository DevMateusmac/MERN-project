/* eslint-disable react/prop-types */
import Modal from './Modal'
import Button from '../FormElements/Button'

export default function ErrorModal({onClear, error}) {
  return (
    <Modal
      onCancel={onClear}
      header='An Error Occurred!'
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  )
}