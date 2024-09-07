function formatDoc(cmd, value=null) {
    let textArea = document.querySelector('#textArea');
    if (value) {
        textArea.focus();
        document.execCommand(cmd, false, value);
        
    }
    else {
        textArea.focus();
        document.execCommand(cmd);
        
    }
}

function addLink() {
    const url = prompt("Enter your link: ");
    formatDoc('createLink', url);
}

const textArea = document.getElementById('textArea');

textArea.addEventListener('mouseenter', () => {
    const a = textArea.querySelectorAll('a');
    a.forEach(item => {
        item.addEventListener('mouseenter', () => {
            textArea.setAttribute('contenteditable', false);
            item.target = '_blank';
        });
        item.addEventListener('mouseleave', () => {
            textArea.setAttribute('contenteditable', true);
        });
    });
});

function clearTextArea() {
    textArea.innerHTML = "";
}

function openFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            textArea.innerHTML = e.target.result;
        };
        reader.readAsText(file);
    }
}

function saveFile(format) {
    const fileName = prompt("Save as: ");
    if (format === 'pdf') {
        html2pdf(textArea).save(fileName);
    }
    else if (format === 'html') {
        const blob = new Blob([textArea.innerHTML])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${fileName}.html`;
		link.click();
    }
    else if (format === 'txt') {
        const blob = new Blob([textArea.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${fileName}.txt`;
		link.click();
    }
}
