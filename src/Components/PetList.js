import React from "react";
import { observer } from "mobx-react-lite";

function PetList({ store }) {
  const handleAddPet = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const type = event.target.elements.type.value;
    const blood = event.target.elements.blood.value;
    const ownerId = event.target.elements.ownerId.value;
  
    if (name && type && blood && ownerId) {
      const pet = {
        id: Date.now(),
        name,
        blood,
        type,
      };
      store.createPet(pet);
      store.assignOwnerToPet(ownerId, pet.id);
      event.target.reset();
    } else {
      // Handle case when any of the fields is not provided
      alert("All fields are required.");
    }
  };
  
  

  const handleUpdatePet = (pet) => {
    pet.name = prompt("Name of the pet", pet.name);
    pet.type = prompt("Type of the pet", pet.type);
    pet.breed = prompt("Breed of the pet", pet.breed);
    const ownerId = prompt("Owner's Id of the pet", pet.owner?.id);
    store.updatePet(pet.id, pet);
    if (ownerId !== pet.owner?.id) {
      store.assignOwnerToPet(ownerId, pet.id);
    }
  };

  const handleDeletePet = (pet) => {
    store.deletePet(pet.id);
  };

  return (
    <div>
        <div className="pet-app ">
      <h5>Add New Pet</h5>
      <form onSubmit={handleAddPet} className="">
        <div className="row ">
          <div className="row-12 p-2">
            <label htmlFor="name "> Name:</label>
            <input type="text" id="name" name="name" className="mx-3" required />
          </div>
          <div className="row-12 p-2">
            <label htmlFor="type ">Type:</label>
            <input type="text" id="type" name="type" className="mx-3" required />
          </div>
          <div className="row-12 p-2">
            <label htmlFor="blood ">Blood:</label>
            <input type="text" id="blood" name="blood" className="mx-3" required />
          </div>
          <div className="row-12 p-2">
  <label htmlFor="ownerId">OwnerId:</label>
  <input type="text" id="ownerId" name="ownerId" className="mx-3" required />
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
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Blood</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
          <tbody>
            {store.pets.map((pet) => {
              return (


                <tr key={pet.id}>
                   
                  <td scope="row">{pet.id}</td>
                  <td scope="row">{pet.name}</td>
                  <td scope="row">{pet.type}</td>
                  <td scope="row">{pet.blood}</td>
                  <td scope="row">
                    <button
                      onClick={() => handleDeletePet(pet)}
                      style={{ marginRight: "1rem" }}
                    >
                      Delete {pet.name}
                    </button>
                    <button onClick={() => handleUpdatePet(pet)}>
                      Update {pet.blood}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default observer(PetList);
