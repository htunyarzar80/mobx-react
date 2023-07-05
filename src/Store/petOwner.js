import { observable, action, makeObservable, computed } from "mobx";

class PetOwnerStore {
  pets = [];
  owners = [];

  constructor() {
    makeObservable(this, {
      pets: observable,
      owners: observable,
      totalOwners: computed,
      totalPets: computed,
      storeDetails: computed,
      getPetsByOwner: action.bound,
      createPet: action.bound,
      createOwner: action.bound,
      updatePet: action.bound,
      updateOwner: action.bound,
      deletePet: action.bound,
      deleteOwner: action.bound,
      assignOwnerToPet: action.bound,
    });
  }

  get totalOwners() {
    return this.owners.length;
  }

  get totalPets() {
    return this.pets.length;
  }

  getPetsByOwner(ownerId) {
    return this.pets.filter((pet) => pet.owner && pet.owner.id === ownerId);
  }

  createPet(pet = { name: "", type: "", blood: "" }) {
    const id = (this.pets.length + 1) % 10;
    this.pets.push({ id, ...pet });
  }
  
  

  createOwner(owner = { firstName: "", lastName: "" }) {
    const id = this.owners.length + 1;
    this.owners.push({ id, ...owner });
  }
  

  updateOwner(ownerId, update) {
    const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
    if (ownerIndexAtId > -1 && update) {
      this.owners[ownerIndexAtId] = update;
    }
  }

  updatePet(petId, update) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1 && update) {
      this.pets[petIndexAtId] = update;
    }
  }

  deletePet(petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1) {
      this.pets.splice(petIndexAtId, 1);
    }
  }

  deleteOwner(ownerId) {
    const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
    if (ownerIndexAtId > -1) {
      this.owners.splice(ownerIndexAtId, 1);
    }
  }

  assignOwnerToPet(ownerId, petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
    if (petIndexAtId > -1 && ownerIndexAtId > -1) {
      this.pets[petIndexAtId].owner = this.owners[ownerIndexAtId];
    }
  }

  get storeDetails() {
    return `We have ${this.totalPets} total pets and ${this.totalOwners} total owners, so far!!!`;
  }
}

export default new PetOwnerStore();
