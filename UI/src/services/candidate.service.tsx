import axios, { AxiosResponse } from "axios";
import AuthService from "./auth.service";
import Candidate from "../constants/CandidateConstant";




const API_URL = "http://localhost:8080/candidate";

const CandidateService = {
  getCandidates: async (): Promise<Candidate[]> => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response: AxiosResponse<{ candidates: Candidate[] }> =
        await axios.get(`${API_URL}/candidates`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      return response.data.candidates;
    } catch (error: any) {
      throw new Error("Failed to fetch candidates: " + error.message);
    }
  },

  addCandidate: async (candidateData: Candidate): Promise<Candidate> => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response: AxiosResponse<{ candidate: Candidate }> =
        await axios.post(`${API_URL}/candidate`, candidateData, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      return response.data.candidate;
    } catch (error: any) {
      throw new Error("Failed to add a candidate: " + error.message);
    }
  },

  updateCandidate: async (
    candidateId: string,
    candidateData: Candidate
  ): Promise<Candidate> => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response: AxiosResponse<{ candidate: Candidate }> = await axios.put(
        `${API_URL}/candidate/${candidateId}`,
        candidateData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      return response.data.candidate;
    } catch (error: any) {
      throw new Error("Failed to update a candidate: " + error.message);
    }
  },

  deleteCandidate: async (candidateId: string): Promise<void> => {
    try {
      const currentUser = AuthService.getCurrentUser();
      await axios.post(
        `${API_URL}/candidateRemove/${candidateId}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
    } catch (error: any) {
      throw new Error("Failed to delete a candidate: " + error.message);
    }
  },
};

export default CandidateService;
