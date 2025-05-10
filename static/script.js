document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('detailsBackButton').addEventListener('click', () => {
        document.getElementById('detailsSlideArea').style.right = '-100%';
    });

    document.getElementById('detailsBtn').addEventListener('click', () => {
        document.getElementById('detailsSlideArea').style.right = '0';
    });

    document.getElementById('backArea').addEventListener('click', () => {
        document.getElementById('detailsSlideArea').style.right = '-100%';
    });

    
})