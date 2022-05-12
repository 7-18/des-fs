import {
  addUser,
  deleteUser,
  getUser,
  onGetUsers,
  updateUser,
} from "./firebase.js";

const container = document.getElementById("container-cards");
const form = document.getElementById("form");
let editUser = false;
let id;

form.addEventListener("submit", (e) => {
  container.innerHTML = "";
  e.preventDefault();
  const name = document.getElementById("name").value.toLowerCase();
  const age = document.getElementById("age").value;
  const country = document.getElementById("country").value.toLowerCase();
  !editUser
    ? addUser(name, age, country)
    : updateUser(id, { name, age, country }) && (editUser = false);

  form.reset();
});

window.addEventListener("DOMContentLoaded", async () => {
  await onGetUsers((users) =>
    users.forEach((doc) => {
      const user = doc.data();
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
      <div class="description">
        <h2>${user.name}</h2>
        <h4>${user.age} ${user.age <= 1 ? "año" : "años"}</h4>
        <h3>${user.country}</h3>
        <i class="fa-solid fa-pen-to-square" data-id="${doc.id}"></i>
        <i class="fa-solid fa-trash" data-id="${doc.id}"></i>
    </div>
      `;
      container.appendChild(div);
      container.querySelectorAll(".fa-trash").forEach((icon) => {
        icon.addEventListener("click", ({ target: { dataset } }) => {
          container.innerHTML = "";
          deleteUser(dataset.id);
        });
      });
      container.querySelectorAll(".fa-pen-to-square").forEach((icon) => {
        icon.addEventListener("click", async ({ target: { dataset } }) => {
          const userData = await getUser(dataset.id);
          const user = userData.data();
          const name = (document.getElementById("name").value = user.name);
          const age = (document.getElementById("age").value = user.age);
          const country = (document.getElementById("country").value =
            user.country);
          editUser = true;
          id = dataset.id;
          form["submit"].value = "Actualizar";
        });
      });
    })
  );
});
