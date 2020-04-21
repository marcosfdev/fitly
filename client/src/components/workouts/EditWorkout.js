import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa'

import { updateWorkout } from '../../store/modules/workouts/actions/workoutsAction'

const EditWorkout = ({ workout, className }) => {

  const [modal, setModal] = useState(false);

  const [workoutUpdate, setWorkoutUpdate] = useState("")

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const authID = currentState.Auth.currentUser.id

  const theUpdate = details => dispatch(updateWorkout(details, updateSuccess))

  const updateSuccess = () => {
    setModal(!modal);
  }

  useEffect(() => {
    setWorkoutUpdate(workout)
  }, [workout]);

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
    setWorkoutUpdate(workout)
  } 

  const handleChange = e => {
    setWorkoutUpdate({
      ...workoutUpdate,
      [e.target.name]: e.target.value
    })
  }

  const submitWorkout = (e) => {
    e.preventDefault()
    theUpdate({
      id: workout.id,
      title: workoutUpdate.title,
      content: workoutUpdate.content,
      author_id: authID
    })
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Workout</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Title hello</label>
            <input className="form-control" type="text" name="title"  defaultValue={workoutUpdate.title}  onChange={handleChange}/>
            { currentState.WorkoutsState.workoutsError && currentState.WorkoutsState.workoutsError.Required_title ? (
              <small className="color-red">{currentState.WorkoutsState.workoutsError.Required_title}</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <label>Content</label>
            <textarea className="form-control" name="content" style={{ width: "100%", height: "150px" }} defaultValue={workoutUpdate.content} onChange={handleChange}></textarea>
            { currentState.WorkoutsState.workoutsError && currentState.WorkoutsState.workoutsError.Required_content ? (
              <small className="color-red">{currentState.WorkoutsState.workoutsError.Required_content}</small>
              ) : (
                ""
              )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
        { currentState.WorkoutsState.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Updating...
            </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitWorkout}
                type="submit"
              >
              Update
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default EditWorkout;