import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import moment from 'moment';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { calendarCleanActive, calendarEventStartAddNew, calendarEventStartUpdate } from '../../actions/calendar';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
const initialStartDate = moment().minutes(0).seconds(0).add(1, 'hours');
const initialEndDate = initialStartDate.clone().add(1, 'hours');
const initialForm = {
  title: '',
  notes: '',
  start: initialStartDate,
  end: initialEndDate,
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [startDate, setStartDate] = useState(initialStartDate.toDate());
  const [endDate, setEndDate] = useState(initialEndDate.toDate());
  const [errors, setErrors] = useState({ title: '', notes: '' });

  const [formValues, setFormValues] = useState(initialForm);
  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initialForm);
    }
  }, [activeEvent, setFormValues]);

  const handleStartDateChange = (evt) => {
    setStartDate(evt);
    setFormValues({
      ...formValues,
      start: evt,
    });
  };

  const handleEndDateChange = (evt) => {
    setEndDate(evt);
    setFormValues({
      ...formValues,
      end: evt,
    });
  };

  const handleInutChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });

    setErrors({ title: '', notes: '' });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (startMoment.isAfter(endMoment, 'hour')) {
      return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
    }

    if (title.trim() === '') {
      setErrors({
        ...errors,
        title: 'Ingresa un título',
      });
      return;
    }

    if (activeEvent) {
      dispatch(calendarEventStartUpdate(formValues));
    } else {
      dispatch(calendarEventStartAddNew(formValues));
    }

    closeModal();
  };

  const closeModal = () => {
    setFormValues(initialForm);
    dispatch(calendarCleanActive());
    dispatch(uiCloseModal());
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1>{activeEvent ? 'Editar evento' : 'Nuevo evento'}</h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label>Fecha y hora inicio</label>
            <DateTimePicker className="form-control" onChange={handleStartDateChange} value={startDate} />
          </div>

          <div className="mb-3">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              className="form-control"
              minDate={startDate}
              onChange={handleEndDateChange}
              value={endDate}
            />
          </div>

          <hr />
          <div className="mb-3">
            <label>Título</label>
            <div className="input-group has-validation">
              <input
                type="text"
                className={`form-control ${errors.title.length !== 0 ? 'is-invalid' : ''}`}
                placeholder="Título del evento"
                name="title"
                value={title}
                onChange={handleInutChange}
                autoComplete="off"
              />
              <div className="invalid-feedback">Una descripción corta</div>
            </div>
          </div>

          <div className="mb-3">
            <label>Notas</label>
            <div className="input-group has-validation">
              <textarea
                type="text"
                className={`form-control ${errors.notes.length !== 0 ? 'is-invalid' : ''}`}
                placeholder="Notas"
                rows="5"
                name="notes"
                value={notes}
                onChange={handleInutChange}
              ></textarea>
              <div className="invalid-feedback">Información adicional</div>
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <span>Guardar</span>
            <i className="far fa-save ms-2"></i>
          </button>
        </form>
      </Modal>
    </div>
  );
};
