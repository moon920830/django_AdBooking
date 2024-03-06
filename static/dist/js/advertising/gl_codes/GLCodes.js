const createGLCodeModal = document.querySelector('#create_gl_code_modal');
const createGLCodeForm = document.querySelector('#create_gl_code_form');
const createCode = document.querySelector('#code');
const createDescription = document.querySelector('#description');
const createSubmitBtn = document.querySelector('#create_gl_code_submit');

const editBtns = document.querySelectorAll('.edit-btn');

const editGLCodeModal = document.querySelector('#edit_gl_code_modal');
const editGLCodeForm = document.querySelector('#create_gl_code_form');
const editCode = document.querySelector('#editCode');
const editDescription = document.querySelector('#editDescription');
const editSubmitBtn = document.querySelector('#edit_gl_code_submit');

let codeId;

const GL_CODE_LENGTH = 16;

createSubmitBtn.addEventListener('click', e => {
    e.preventDefault();

    // TODO - validate that code is only 4 numerical digits before sending

    let glCode = createCode.value.replace(/\D/g, '');

    if(glCode.length != GL_CODE_LENGTH)  {
        alert("Please input the GL CODE correctly!");
        return;
    }

    if(createDescription.value.length < 1 )  {
        alert("Please input the description correctly!");
        return;
    }

    fetch(`/advertising/gl-codes/new/`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        // send only numerical gl code
        body: JSON.stringify({
            code: glCode,
            description: createDescription.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message.includes('Error.')) {
                alert(data.message);
                return;
            } else {
                $('#create_gl_code_modal').modal('hide');
                window.location.reload();
            }
        })
        .catch(err => console.error(err))
});

$('#create_gl_code_modal').on('hide.bs.modal', e => {
    createCode.value = '';
    createDescription.value = '';
});

editBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        codeId = e.target.parentElement.parentElement.dataset.codeId
        $('#edit_gl_code_modal').modal('show');
    })
})

$('#edit_gl_code_modal').on('show.bs.modal', e => {
    console.log('editModal')
    if (codeId) {
        fetch(`/advertising/gl-codes/${codeId}/`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                let glCode = data.gl_code;

                let pattern = /^(\d{2})(\d{3})(\d{2})(\d{2})(\d{4})(\d{3})$/;
                // Apply the pattern and format the string
                let formattedCode = glCode.code.replace(pattern, '$1-$2-$3-$4-$5-$6');
                
                // Display the formatted code
                editCode.value = formattedCode;
                editDescription.value = glCode.description;
            })
    }
});

editSubmitBtn.addEventListener('click', e => {

    let glCode = editCode.value.replace(/\D/g, '');

    if(glCode.length != GL_CODE_LENGTH)  {
        alert("Please input the GL CODE correctly!");
        return;
    }

    if(editDescription.value.length < 1 )  {
        alert("Please input the description correctly!");
        return;
    }
    
    fetch(`/advertising/gl-codes/${codeId}/edit/`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: glCode,
            description: editDescription.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message.includes('Error.')) {
                alert(data.message);
                return;
            } else {
                $('#edit_gl_code_modal').modal('hide');
                window.location.reload();
            }
        })
        .catch(err => console.error(err))
})

const searchInput = document.querySelector('#search-glcode');
const searchTableBody = document.querySelector('#gl_code_table_tbody');
const searchTableRows = searchTableBody.querySelectorAll('tr');
searchInput.addEventListener('keyup', () => {
    const searchValue = searchInput.value;
    searchCodes(searchValue)
});

const searchCodes = (searchValue) => {
    searchTableRows.forEach(row => {
        const rowTitle = row.querySelector('td:nth-child(2)').innerText;
        const rowCode = row.querySelector('td:nth-child(3)').innerText;

        if (searchValue === "") {
            row.style.display = '';
        } else if (!rowTitle.toLowerCase().includes(searchValue.toLowerCase()) && !rowCode.toLowerCase().includes(searchValue.toLowerCase()))
            row.style.display = 'none';
    });
}

// Function to format the code as xx-xxx-xx-xx-xxxx-xxx
function formatGLCode(inputElement) {
    const GL_CODE_LENGTH = 16; // Assuming GL_CODE_LENGTH is defined somewhere
    const segmentLengths = [2, 3, 2, 2, 4, 3];
    
    let formatted = inputElement.value.replace(/\D/g, ''); // Remove non-numeric characters
    formatted = formatted.slice(0, GL_CODE_LENGTH); // Limit to GL_CODE_LENGTH characters

    let currentIndex = 0;
    
    // Format the code
    for (let i = 0; i < segmentLengths.length; i++) {
        if (formatted.length > currentIndex + segmentLengths[i]) {
            formatted = formatted.slice(0, currentIndex + segmentLengths[i]) + '-' + formatted.slice(currentIndex + segmentLengths[i]);
            currentIndex += segmentLengths[i] + 1;
        }
    }
    
    // Replace the input value with the formatted string
    inputElement.value = formatted;
}

// Attach event listeners to input elements
createCode.addEventListener('input', () => {
    formatGLCode(createCode);
});

editCode.addEventListener('input', () => {
    formatGLCode(editCode);
});

