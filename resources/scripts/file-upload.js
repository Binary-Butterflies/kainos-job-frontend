const dropZone = document.getElementById('dropZone')
const formFile = document.getElementById('formFile')

dropZone.addEventListener('click', () => formFile.click())

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropZone.classList.add('bg-light')
})

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('bg-light')
})

dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    dropZone.classList.remove('bg-light')

    if (!verifyFiles(e)) {
        return;
    }

    formFile.files = e.dataTransfer.files
    updateDropZoneText()
})

formFile.addEventListener('change', updateDropZoneText)

function updateDropZoneText() {
    setDropZoneText(formFile.files.length > 0
        ? formFile.files[0].name
        : 'Drag and drop a file here or click to select')
}

function setDropZoneText(text) {
    dropZone.textContent = text;
}

function verifyFiles(e) {
    if (e.dataTransfer.files.length != 1) {
        return false;
    }

    const file = e.dataTransfer.files[0];

    if (file.type == "application/pdf") { return true }
    if (file.type == "application/msword") { return true }
    if (file.type == "application/vnd.oasis.opendocument.text") { return true }
    if (file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") { return true }

    return false;
}

updateDropZoneText()