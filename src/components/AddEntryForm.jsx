import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "../features/tableSlice";

const AddEntryForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addRow(data));
    onClose();
  };

  return (
    <div className="modal" style={{ border: "1px solid #ccc", padding: "20px", margin: "20px" }}>
      <h3>Add New Entry</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <input
            {...register("id", { 
              required: "ID is required", 
              pattern: { value: /^[0-9]+$/, message: "ID must contain only numbers" }
            })}
            placeholder="ID"
          />
          {errors.id && <p style={{ color: "red" }}>{errors.id.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            placeholder="Age"
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <button type="submit">Add Entry</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

AddEntryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddEntryForm;
