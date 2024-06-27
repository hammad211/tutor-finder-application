import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Dropdowns = ({ label, initialValue, options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Form.Group
      controlId={`validationCustom${label}`}
      className="mb-3"
      style={{ width: "180px" }}
    >
      <Form.Label>{label}</Form.Label>
      <Form.Select
        onChange={(e) => handleDropdownChange(e.target.value)}
        className="border border-primary rounded w-100"
        style={{ height: "60px" }}
      >
        <option key="" value="">
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Dropdowns;
