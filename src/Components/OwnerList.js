import { observer } from "mobx-react-lite";
import React from "react";

function OwnerList({ store }) {
  const handleAddOwner = (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    if (firstName && lastName) {
      store.createOwner({ firstName, lastName });
      event.target.reset();
    } else {
      // Handle case when firstName or lastName is not provided
      alert("First Name and Last Name are required.");
    }
  };

  const handleUpdateOwner = (owner) => {
    owner.firstName = prompt("Firstname?", owner.firstName);
    owner.lastName = prompt("Lastname?", owner.lastName);
    store.updateOwner(owner.id, owner);
  };

  const handleDeleteOwner = (owner) => {
    store.deleteOwner(owner.id);
  };

  return (
    <div className="pet-owner-app ">
      <h5>Add New Owner</h5>
      <form onSubmit={handleAddOwner} className="">
        <div className="row ">
          <div className="row-12 p-2">
            <label htmlFor="firstName ">First Name:</label>
            <input type="text" id="firstName" name="firstName" className="mx-3" required />
          </div>
          <div className="row-12 p-2">
            <label htmlFor="lastName ">Last Name:</label>
            <input type="text" id="lastName" name="lastName" className="mx-3" required />
          </div>

          <div className=" row-12 p-2 justify-content-end" style={{justifyContent:"center",alignItems:"center"}}>
            <button type="submit" className="btn btn-secondary text-white">
              Add Owner
            </button>
          </div>
        </div>
      </form>
      
        <table className="table">
        <thead className="table-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
          <tbody>
            {store.owners.map((owner) => {
              return (


                <tr key={owner.id}>
                   
                  <td scope="row">{owner.id}</td>
                  <td scope="row">{owner.firstName}</td>
                  <td scope="row">{owner.lastName}</td>
                  <td scope="row">
                    <button
                      onClick={() => handleDeleteOwner(owner)}
                      style={{ marginRight: "1rem" }}
                    >
                      Delete {owner.firstName}
                    </button>
                    <button onClick={() => handleUpdateOwner(owner)}>
                      Update {owner.firstName}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    
  );
}

export default observer(OwnerList);
