import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export const handleDelete = async (credentialId, setCredentials) => {
  
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this password!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'bg-blue-50 text-blue-800', 
      confirmButton: 'bg-blue-600 text-white', 
      cancelButton: 'bg-gray-300 text-gray-800', 
    },
  });

  if (isConfirmed) {
    try {
      const response = await fetch(`/api/credentials/${credentialId}`, {
        method: "DELETE",
      });

      if (response.ok) {
       
        setCredentials(prevCredentials => 
          prevCredentials.filter(credential => credential.id !== credentialId)
        );
        
        toast.success("Password deleted successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          style: {
            backgroundColor: '#eff6ff', 
            color: '#1e3a8a', 
          },
        });
      } else {
        
        toast.error("Failed to delete the password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          style: {
            backgroundColor: '#fee2e2', 
            color: '#b91c1c', 
          },
        });
      }
    } catch (error) {
      console.error("Error deleting password:", error);
      
      toast.error("Error deleting password", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        style: {
          backgroundColor: '#fee2e2', 
          color: '#b91c1c', 
        },
      });
    }
  }
};
