const miFormulario = document.querySelector("form");
const url = "http://localhost:3001/api/auth/";

miFormulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};
  for (let el of miFormulario) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.log(msg);
      }
      localStorage.setItem("token", token);
    })
    .catch((e) => console.log(e));
});

function handleCredentialResponse(response) {
  const body = { id_token: response.credential };
  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
    })
    .catch(console.warn);

  const button = document.getElementById("google_singOu");
  button.onclick = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
      localStorage.clear();
      location.reload();
    });
  };
}
