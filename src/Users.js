import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UserTable";
import  Axios  from "axios";
import { useEffect, useState } from "react";

const Users = () =>{
  const [users, setUser] = useState([]);
  const [submitted,setSubmitted] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [selectedUser,setSelectedUser] = useState({});
  
  useEffect(() => {
     getUser();
  },[]);

  //getUser =============================================================

  const getUser = () =>{
    Axios.get('http://localhost:3001/api/users')
         .then(response => {
           setUser(response.data.reponse || []);
         })
         .catch(error =>{
           console.error("Axios Error : ",error);
         });
  }

  // addUeser ==========================================================

  const addUser = (data) =>{
    setSubmitted(true);

    const payload = {
      id : data.id,
      name: data.name,
    }
    Axios.post('http://localhost:3001/api/createuser',payload)
    .then(() => {
           getUser();
           setSubmitted(false);
           isEdit(false);
         })
         .catch(error =>{
           console.error("Axios Error : ",error);
         });
  }

  //updateUser =========================================================

  const updateUser = (data) =>{
    setSubmitted(true);

    const payload = {
      id : data.id,
      name: data.name,
    }
    Axios.post('http://localhost:3001/api/updateuser',payload)
    .then(() => {
           getUser();
           setSubmitted(false);
           isEdit(false);

         })
         .catch(error =>{
           console.error("Axios Error : ",error);
         });

  }

  //deleteUser ==========================================================

  const deleteUser = (data) =>{
  
    Axios.post('http://localhost:3001/api/deleteuser',data)
    .then(() => {
           getUser();
         })
         .catch(error =>{
           console.error("Axios Error : ",error);
         });
  }

  return(
      <Box
        sx={{
          width: 'calc(100% - 100px)',
          margin: 'auto',
          marginTop:'100px',
        }}
      >
        <UserForm
           addUser = {addUser}
           updateUser = {updateUser}
           submitted = {submitted}
           data = {selectedUser}
           isEdit ={isEdit}
        />
        <UsersTable 
          rows={users}
          selectedUser = {data =>{
              setSelectedUser(data);
              setIsEdit(true);
          }}
          deleteUser = {data => window.confirm('Are you sure') && deleteUser(data)}
        />
      </Box>
  );
}
export default Users;