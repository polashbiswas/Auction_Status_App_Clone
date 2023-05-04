

// function getData() {
//     document.getElementById("loader").style.display = "block";
//         fetch("https://gauravgitacc.github.io/postAppData/auctionData.json", {
//             method: "GET",
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Data", data);
//                 let innerHtml = "";
//                 data.forEach((item) => {
//                     innerHtml += `
//                         <div class = "myDiv">
//                         <h1>${item.status}</h1>
//                         <h3>${item.caseNumber}</h3>
//                         </div>
//                         `;
//                 });
//                 document.getElementById("loader").style.display = "none";
//                 document.getElementById("container").innerHTML = innerHtml;
//             });
// }

var arr = [];
async function getData() {
    document.getElementById("loader").style.display = "block";
    console.log("fetching data...");
    try {
        const response = await fetch("https://gauravgitacc.github.io/postAppData/auctionData.json");
        arr = await response.json();
        sessionStorage.setItem("myArr", JSON.stringify(arr));
        // alert("Added to the session storage");
        if (arr) {
            // console.log("Data", arr)
            showData(arr);
            document.getElementById("loader").style.display = "none";

        }
    } catch (e) {
        console.log("Error", e);
    }
}
if(sessionStorage.getItem("myArr")){
    //thats mean user is coming againg in the session
    // alert("getting from the session storage");
    var myArr = JSON.parse(sessionStorage.getItem("myArr"));
    showData(myArr);
    arr = myArr;
}else{
    //user is comming to the session for the very first time
    getData();
}


document.getElementById("search").addEventListener("input", () => {
    var newArr = arr.filter((item) =>
    item.toLocation.toLowerCase().includes(document.getElementById("search").value.trim().toLowerCase())
    );
    showData(newArr);
});

function showData(myArr) {
    document.getElementById("container").innerHTML = "";
    let innerHtml = "";
    myArr.forEach((item) => {
        innerHtml += `
                        <div class = "myDiv">
                            <div class = "flex-info">
                                <div>
                                    <div class = 'chip ${item.status == "PENDING" ? "yellow" : item.status == "CANCELLED" ? "red" : ""}'>
                                    ${item.status}</div>
                                <p>${item.caseNumber}</p>
                                </div>
                                <p>${item.date}</p>
                            </div>
                            </hr>
                            <div>
                            <strong>${item.toLocation}</strong>
                            <p>${item.fromLocation}<span style = 'float:right'>${item.fare}</span></p>
                            </div>
                        </div>
                        `;
    });
    document.getElementById("container").innerHTML = innerHtml;
}
// document.getElementById("btn").addEventListener("click", getData);