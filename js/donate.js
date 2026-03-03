 // Copy to clipboard functionality
 document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        const originalText = this.innerHTML;
        
        // Create temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        
        // Select and copy text
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        
        // Remove temporary input
        document.body.removeChild(tempInput);
        
        // Change button text temporarily
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.style.background = '#2ecc71';
        this.style.color = 'white';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
            this.style.color = '';
        }, 2000);
    });
});