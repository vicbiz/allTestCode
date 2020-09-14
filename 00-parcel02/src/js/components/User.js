import axios from "axios";

const User = async () => {
  const res = await axios.get("https://randomuser.me/api");
  const user = res.data.results[0];

  const template = `
    <div class="card warnings">
      <img class="userPicture" src="${user.picture.large}"/>
      <div class="card-body">
        <h2>${user.name.first} ${user.name.last}</h2>
        <ul>
          <li>${user.email}</li>
          <li>${user.phone}</li>
          <li>${user.location.city}</li>
        </ul>
      </div>
    </div>
  `;

  return template;
};

export default User;
