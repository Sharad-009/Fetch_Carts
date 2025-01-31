async function showData() {
  let dataSet = await fetch("http://localhost:3000/personalInfo");
  let conver = await dataSet.json();

  let table = document.querySelector("#container_table");
  table.innerHTML = conver
    .map(
      (el) =>
        `
    
        <tr>
            <td>${el.id}</td>
            <td>${el.user}</td>
            <td>${el.course}</td>
            <td><img src="${el.img}" alt=""></td>
            <td>${el.price}</td>
            <td onclick="editData('${el.id}')">Edit</td>
            <td onclick="deleteData('${el.id}')">Delete</td>
            
        </tr>
   `
    )
    .join(" ");
}
showData();

// Insert Data In Json starts
function insertData() {
  let num = Math.random() * 1000;
  num = Math.round(num);
  let data = {
    id: String(num),
    user: document.getElementById("name1").value,
    course: document.getElementById("cource1").value,
    img: document.getElementById("imgSrc1").value,
    price: document.getElementById("price1").value,
  };
  console.log(data);
  let confirmData = confirm("Do you Wnat To Add Data");
  if (confirmData == true) {
    console.log(data);

    fetch(`http://localhost:3000/personalInfo`, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
      body: JSON.stringify(data),
    }).then((re) => alert("Data Inserted......", re));
  }
}
// Insert Data In Json Ends

// Delete Data in json starts

function deleteData(id) {
  let conf = confirm("Do you want to delete data");
  if (conf) {
    fetch(`http://localhost:3000/personalInfo/${id}`, {
      method: "DELETE",
    }).then((res) => alert("Data Deleted succedded....."));
  }
}

// Delete Data in json ends
// // Edit Data in js starts
async function editData(id) {
  let dataFatch = await fetch(`http://localhost:3000/personalInfo/${id}`);
  let editDt = await dataFatch.json();
  let datashow = document.getElementById("showDataEdit");
  datashow.innerHTML = `
 <form action="">
        <label for=""><h3>Name</h3></label> <input type="tel" value="${editDt.user}" name="" id="name2" />
        <br />
        <label for=""><h3>cource</h3></label> <input type="tel" value="${editDt.course}" name="" id="course2" />
        <br />
        <label for=""><h3>imgSrc</h3></label> <input type="tel" name="" value="${editDt.img}" id="imgSrc2" />
        <br />
        <label for=""><h3>price</h3></label> <input type="tel" name="" value="${editDt.price}" id="price2" />
        <br />
        <button onclick="finalUpdate('${editDt.id}')">Save Date</button>
      </form>
 `;
}

// Then edit access final update data
function finalUpdate(id) {
  let data2 = {
    user: document.getElementById("name2").value,
    course: document.getElementById("course2").value,
    img: document.getElementById("imgSrc2").value,
    price: document.getElementById("price2").value,
  };

  fetch(`http://localhost:3000/personalInfo/${id}`, {
    method: "PUT",
    headers: { "content-type":" application/JSON" },
    body: JSON.stringify(data2),
  }).then((res) => alert("Updated successfully......"));
}

// Then edit access final update data finish

// Edit Data in js ends
