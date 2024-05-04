import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Table, Input, Button, Form, Rate, Menu } from "antd";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import authService from "../../services/auth.service";
import CandidateService from "../../services/candidate.service";
import "../../style/Candidate.css";
import Candidate from "../../constants/CandidateConstant";

const { Column } = Table;
const { SubMenu } = Menu;

const CandidateTable: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editCandidateId, setEditCandidateId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Candidate>({
    _id: "",
    name: "",
    status: "",
    feedback: "",
    rating: 0,
  });
  const [addFormData, setAddFormData] = useState<Candidate>({
    _id: "",
    name: "",
    status: "",
    feedback: "",
    rating: 0,
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/";
    }
    const expiryDate = localStorage.getItem("expiryDate");

    if (new Date(expiryDate!) <= new Date()) {
      handleLogout();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate!).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    CandidateService.getCandidates()
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.error("Failed to fetch candidates:", error);
      });
  };

  const handleAddFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  const handleEditFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleAddFormSubmit = (values: any) => {
    console.log(values);
    const { name, status, feedback, rating } = values;
    const newCandidate: Candidate = {
      _id: "",
      name,
      status,
      feedback,
      rating,
    };
    console.log(newCandidate);
    CandidateService.addCandidate(newCandidate)
      .then((newCandidate) => {
        setCandidates([...candidates, newCandidate]);
        setAddFormData({
          _id: "",
          name: "",
          status: "",
          feedback: "",
          rating: 0,
        });
      })
      .catch((error) => {
        console.error("Failed to add a candidate:", error);
      });
  };

  const handleEditFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!editCandidateId) return;

    const editedCandidate = {
      ...editFormData,
      _id: editCandidateId,
    };

    CandidateService.updateCandidate(editCandidateId, editFormData)
      .then(() => {
        const updatedCandidates = candidates.map((candidate) =>
          candidate._id === editCandidateId ? editedCandidate : candidate
        );
        setCandidates(updatedCandidates);
        setEditCandidateId(null);
      })
      .catch((error) => {
        console.error("Failed to update a candidate:", error);
      });
  };

  const handleEditClick = (candidate: Candidate) => {
    setEditCandidateId(candidate._id);
    setEditFormData(candidate);
  };

  const handleCancelClick = () => {
    setEditCandidateId(null);
  };

  const handleDeleteClick = (candidateId: string) => {
    CandidateService.deleteCandidate(candidateId)
      .then(() => {
        const updatedCandidates = candidates.filter(
          (candidate) => candidate._id !== candidateId
        );
        setCandidates(updatedCandidates);
      })
      .catch((error) => {
        console.error("Failed to delete a candidate:", error);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const setAutoLogout = (milliseconds: number) => {
    setTimeout(() => {
      handleLogout();
    }, milliseconds);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <Menu mode="inline">
          <Menu.Item key="1">Interview</Menu.Item>
          <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
      </div>
      <div className="content">
        {candidates.length > 0 ? (
          <>
            <h2>All Candidates</h2>
            <form onSubmit={handleEditFormSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Feedback</th>
                    <th>Rating</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <React.Fragment key={candidate._id}>
                      {editCandidateId === candidate._id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          candidate={candidate}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </form>
          </>
        ) : (
          <h1>No candidates added</h1>
        )}

        <h2>Add a Candidate</h2>
        <Form layout="inline" className="new-candidate" onFinish={handleAddFormSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Candidate name" />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item label="Feedback" name="feedback" rules={[{ required: true }]}>
            <Input placeholder="Feedback" />
          </Form.Item>
          <Form.Item label="Rating" name="rating" >
            <Rate allowHalf defaultValue={0} />
          </Form.Item>
          <Form.Item>
            <Button className="add-btn" type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CandidateTable;
