import PropTypes from 'prop-types'
import { Modal, makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'

const CreateItemModal = ({
  isOpen: open,
  handleClose,
  onSubmit,
}: {
  isOpen: boolean
  handleClose: any
  onSubmit: any
}) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const classes = useStyles()
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Create Dessert Modal"
      aria-describedby="Create Dessert Modal Description"
    >
      <div className={classes.paper}>
        <p>Please fill all details before you submit</p>
        <form
          onSubmit={onSubmit}
        >
          <input type="submit" />
        </form>
      </div>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

CreateItemModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default CreateItemModal
