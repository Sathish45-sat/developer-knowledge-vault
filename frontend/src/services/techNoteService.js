import api from "./api";

const getTechNotes = async () => {
  const res = await api.get('/technotes/all');
  return res.data;
};

const getMyTechNotes = async () => {
  const res = await api.get('/technotes/me');
  return res.data;
};

const revisitTechNote = async (id) => {
  await api.get(`/technotes/${id}`); // My new backend updates accessCount on GET
};

const createTechNote = async (techNote) => {
  const res = await api.post('/technotes', techNote);
  return res.data;
};

const updateTechNote = async (id, techNote) => {
  const res = await api.put(`/technotes/${id}`, techNote);
  return res.data;
};

const deleteTechNote = async (id, userId) => {
  await api.delete(`/technotes/${id}`);
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  const res = await api.post('/upload', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  
  return res.data.imageUrl;
};

const techNoteService = { getTechNotes, getMyTechNotes, revisitTechNote, createTechNote, updateTechNote, deleteTechNote, uploadImage };

export default techNoteService;