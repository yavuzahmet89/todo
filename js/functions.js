function getAlertMessage(type, message, title = '', spinner = false) {
    html = `<div class="alert alert-${type}" role="alert">`;

    if (title !== '') {
        html += `<h3 class="alert-title">${title}</h3>`;
    }

    if (spinner) {
        html += `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden"></span>
            </div> 
        `;
    }

    html += message;
    html += '</div>';

    return html;
}