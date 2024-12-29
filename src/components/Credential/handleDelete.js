export const handleDelete = async (credentialId, setCredentials) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this password?");
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/credentials/${credentialId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          setCredentials(prevCredentials => 
            prevCredentials.filter(credential => credential.id !== credentialId)
          );
          alert("Password deleted successfully.");
        } else {
          alert("Failed to delete the password.");
        }
      } catch (error) {
        console.error("Error deleting password:", error);
        alert("Error deleting password.");
      }
    }
  };
  