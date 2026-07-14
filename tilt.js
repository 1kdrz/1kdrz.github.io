document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.main-container');
    const profile = document.querySelector('.profile-container');
    
    if (!container || !profile) return;

    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        profile.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        profile.style.transition = 'transform 0.1s ease-out';
    });

    container.addEventListener('mouseleave', function() {
        profile.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        profile.style.transition = 'transform 0.4s ease-out';
    });
});