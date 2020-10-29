let get = document.getElementById('get')
let post = document.getElementById('post')
let postDetails = document.getElementById('postDetails')

postDetails.style.display = 'none';
post.addEventListener('click', () => {
    postDetails.style.display = 'block';
})
get.addEventListener('click', () => {
    postDetails.style.display = 'none';

})


let json = document.getElementById('json')
let custom = document.getElementById('custom')
let plus = document.getElementById('plus')

let submit = document.getElementById('submit')
let responseText = document.getElementById('reponseText');

let parameterBox = document.getElementById('parameterBox')
let jsonBox = document.getElementById('jsonBox')

parameterBox.style.display = 'none'

custom.addEventListener('click', (e) => {
    parameterBox.style.display = 'block';
    // console.log(e.target)
    jsonBox.style.display = 'none'
})

json.addEventListener('click', (e) => {
    jsonBox.style.display = 'block';
    parameterBox.style.display = 'none'

})
function* gen() {
    let i = 2;
    while (true) {
        yield i
        i = i + 1;
    }
};
let iter = gen();


let count = 2
plus.addEventListener('click', (e) => {
    // let count = iter.next().value
    let html = `
    <div class="form-row my-1">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${count}</label>
        <div class="col-md-4">
            <input type="text" class="form-control" id="paraKey${count}" placeholder="Enter Parameter ${count} Key">
        </div>
        <div class="col-md-4">
            <input type="text" class="form-control" id="paraValue${count}" placeholder="Enter Parameter ${count} Value">
        </div>
        <button id="minus-${count}" class = "btn btn-danger delParam pd-3" type="button" >-</button>
      </div>`

    let child = document.createElement('div')
    child.innerHTML = html;
    parameterBox.appendChild(child);

    let delParams = document.getElementsByClassName('delParam')
    for (item of delParams) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    count += 1
})


submit.addEventListener('click', (e) => {
    responseText.innerText = 'Please wait. fetching response...'
    let req_url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='request']:checked").value
    let contentType = document.querySelector("input[name='content']:checked").value



    if (contentType == 'custom') {
        data = {}
        for (let i = 0; i < count - 1; i++) {
            if (document.getElementById('paraKey' + (i + 1)) != null) {
                let key = document.getElementById('paraKey' + (i + 1)).value
                let value = document.getElementById('paraValue' + (i + 1)).value
                data[key] = value;
            }

        }
        data = JSON.stringify(data)

    }
    else {
        data = document.getElementById('jsonText').value;
    }

    if (requestType == 'GET') {
        async function getRequest() {
            let response = await fetch(req_url, { method: 'GET', });
            let data = await response.text();
            return data;
        }
        getRequest().then((data) => {
            console.log(JSON.parse(data));
            responseText.textContent = data;
            Prism.highlightAll();
        }).catch(e => {
            responseText.textContent= e;
            console.log("Error");
        })
    }

    else if (requestType == 'POST') {
        async function postRequest() {
            params = {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
            let response = await fetch(req_url, params)
            let d = await response.text()
            return d;
        }
        postRequest().then(data => {
            responseText.textContent = data;
            Prism.highlightAll();
            console.log(data)
        })
    }

   


})


