// EditableRow.tsx
import React, { ChangeEvent } from "react";

interface EditableRowProps {
  editFormData: {
    name: string;
    status: string;
    feedback: string;
    rating: number;
  };
  handleEditFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCancelClick: () => void;
}

const EditableRow: React.FC<EditableRowProps> = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="Candidate name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Interview status"
          name="status"
          value={editFormData.status}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Feedback"
          name="feedback"
          value={editFormData.feedback}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required
          placeholder="Rating"
          name="rating"
          value={editFormData.rating}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="edit-button" type="submit">Save</button>
        <button className="delete-button" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
