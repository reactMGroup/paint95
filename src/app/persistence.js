class CanvasFile {
    constructor() {
        // this.save = saveMethod;
    }

    save(jsonObject, fileName) {
        let textToBLOB = new Blob([JSON.stringify(jsonObject, null, 2)], { type: 'application/json' });
        const sFileName = fileName;

        let newLink = document.createElement("a");
        newLink.download = sFileName;
        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click(); 
    }
}