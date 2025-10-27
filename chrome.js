const save = document.getElementById("inputbtn")
const input = document.getElementById("inputEl")
const dlt = document.getElementById("dltbtn")
let namele = document.getElementById("uknow")
const saveTab = document.getElementById("save-tab")
let data = document.getElementById("data")
let myleads = JSON.parse(localStorage.getItem("myleads")) || []
render(myleads)


function getname(namm) {
    namele.innerHTML = `
    <div id="getname">
                <p id="url">${namm}</p>
                <div id="namenurl">
                    <input type="text" placeholder="Name???" id="namespace">
                    <button id="save-name">SAVE URL</button>
                </div>
            </div>
    `
    document.getElementById("save-name").addEventListener("click", function () {
        let nam = document.getElementById("namespace").value
        if (nam === "") {
            alert("Please enter name before saving")
            return
        }
        myleads.push({ [nam]: namm })
        render(myleads)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        namele.innerHTML = ""
    })
}

function render(leads) {
    let k = ""
    for (let i = 0; i < leads.length; i++) {
        k += `
        <li>
            <a href="${leads[i][Object.keys(leads[i])[0]]}" target="_blank">${Object.keys(leads[i])[0]}</a>
        </li>
        `
    }
    data.innerHTML = k
}

// save.addEventListener("click", function () {
//     if (input.value === "") {
//         alert("Please write before saving!")
//         return;
//     }
//     else {
//         getname(input.value)
//         input.value = ""
//     }
// })

saveTab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let stuff = tabs[0].url
        getname(stuff)
    })
})

dlt.addEventListener("dblclick", function () {
    localStorage.clear()
    myleads = []
    render(myleads)
})




