import { Parcel } from "../types/Parcel";

export const distanceBetween = (parcelA: Parcel, parcelB: Parcel): number => {
  return Math.abs(parcelA.x - parcelB.x) + Math.abs(parcelA.y - parcelB.y);
};

export const getAllNeighbors = (parcels: Parcel[]) => {
  const neighbors = new Set<Parcel>();

  const myParcels = parcels.filter((parcel) => parcel.owner === 1);
  // Not optimized at all.
  // We should store this data instead of calculating it every time.
  myParcels.forEach((parcel) => {
    // Check if it has a neighbor.
    const thisParcelsNeighbors = parcels.filter(
      (otherParcel) =>
        otherParcel.owner !== 1 && distanceBetween(parcel, otherParcel) === 1
    );
    thisParcelsNeighbors.forEach((neighbor) => neighbors.add(neighbor));
  });
  return neighbors;
};

export const getUserParcelsNextTo = (parcel: Parcel, parcels: Parcel[]) => {
  const neighbors = parcels.filter(
    (otherParcel) =>
      otherParcel.owner === 1 && distanceBetween(parcel, otherParcel) === 1
  );
  return neighbors;
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};
