// Slideshow JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Array of image paths - update with your actual image paths
    const images = [
        { src: "photo2.jpg", alt: "Temple " },
        {src:"photo3.jpg",alt:"Temple"}
        // Add more images as needed
    ];
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    const dotsContainer = document.querySelector('.slideshow-dots');
    
    // Create slides
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.display = index === 0 ? 'block' : 'none';
        
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        
        slide.appendChild(imgElement);
        slideshowContainer.appendChild(slide);
        
        // Create dot indicators
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(n) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        if (n > slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate its dot
        slides[currentSlide].style.display = 'block';
        dots[currentSlide].classList.add('active');
    }
    
    // Function to advance to the next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
        currentSlide++;
        if (currentSlide > images.length) currentSlide = 0;
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Add prev/next buttons
    const prevButton = document.createElement('a');
    prevButton.className = 'prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        currentSlide--;
        if (currentSlide < 0) currentSlide = images.length - 1;
    });
    
    const nextButton = document.createElement('a');
    nextButton.className = 'next';
    nextButton.innerHTML = '&#10095;';
    nextButton.addEventListener('click', () => {
        nextSlide();
    });
    
    slideshowContainer.appendChild(prevButton);
    slideshowContainer.appendChild(nextButton);
});
