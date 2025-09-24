// Background image rotation and enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    const bgImages = document.querySelectorAll('.bg-image');
    let currentIndex = 0;
    
    function rotateBackground() {
        // Remove active class from current image
        bgImages[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % bgImages.length;
        
        // Add active class to next image
        bgImages[currentIndex].classList.add('active');
    }
    
    // Rotate background images every 6 seconds
    setInterval(rotateBackground, 6000);
    
    // Add scroll animation effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Add staggered animations to list items within sections
                if(entry.target.tagName === 'SECTION') {
                    const listItems = entry.target.querySelectorAll('ul li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateX(0)";
                        }, 200 * index);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });
    
    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add click effect to the letter Yo
    const letterYo = document.querySelector('.letter-yo');
    if (letterYo) {
        letterYo.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 4s ease-in-out infinite, pulse 0.5s ease';
            }, 10);
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 204, 0, 0.4)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.position = 'absolute';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.zIndex = '-1';
            
            this.appendChild(ripple);
            
            // Animate the ripple
            setTimeout(() => {
                ripple.style.transition = 'all 0.6s ease-out';
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                ripple.style.opacity = '0';
            }, 10);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 700);
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add typing effect to header subtitle
    const headerP = document.querySelector('header p');
    if(headerP) {
        const originalText = headerP.textContent;
        headerP.textContent = '';
        
        let i = 0;
        const speed = 100; // typing speed in ms
        
        function typeWriter() {
            if (i < originalText.length) {
                headerP.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Add interactive "Did you know?" tooltips for facts
    const factItems = document.querySelectorAll('.facts ul li');
    factItems.forEach((item, index) => {
        // Add question mark icon after each fact
        const tooltip = document.createElement('span');
        tooltip.innerHTML = ' <sup style="color: #ffcc00; cursor: help;" title="Нажмите для дополнительной информации">ⓘ</sup>';
        item.appendChild(tooltip);
        
        // Add click event to show more information
        tooltip.addEventListener('click', function() {
            let extraInfo = '';
            
            switch(index) {
                case 0:
                    extraInfo = 'Азбука Морзе была разработана в XIX веке, задолго до введения буквы Ё в русский алфавит.';
                    break;
                case 1:
                    extraInfo = 'На олимпиадах знание буквы Ё может давать решающее преимущество при выполнении заданий.';
                    break;
                case 2:
                    extraInfo = 'Многие стихотворения теряют рифму, если Ё заменить на Е, например, "пёс" на "пес".';
                    break;
                case 3:
                    extraInfo = 'Движение "Я за букву Ё" было основано в 2006 году и насчитывает тысячи сторонников.';
                    break;
                case 4:
                    extraInfo = '7 апреля 2013 года был учрежден как День буквы Ё по инициативе писателя Бориса Акунина.';
                    break;
                case 5:
                    extraInfo = 'Буква Ё уникальна для русского языка и не встречается в других славянских алфавитах.';
                    break;
                default:
                    extraInfo = 'Интересный факт о букве Ё.';
            }
            
            alert(extraInfo);
        });
    });
    
    // Add a button to toggle between light and dark modes
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '🌙';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.zIndex = '100';
    toggleButton.style.background = 'rgba(255, 255, 255, 0.8)';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.width = '40px';
    toggleButton.style.height = '40px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontSize = '18px';
    toggleButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    
    document.body.appendChild(toggleButton);
    
    let isDarkMode = false;
    toggleButton.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if(isDarkMode) {
            document.body.style.background = '#1a1a1a';
            document.body.style.color = '#f0f0f0';
            toggleButton.textContent = '☀️';
            
            // Update other elements for dark mode
            document.querySelectorAll('section').forEach(section => {
                section.style.background = 'rgba(30, 30, 30, 0.85)';
                section.style.color = '#f0f0f0';
            });
            
            document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                heading.style.color = '#ffcc00';
            });
        } else {
            document.body.style.background = 'linear-gradient(to bottom, #f5f7fa, #e4edf5)';
            document.body.style.color = '#333';
            toggleButton.textContent = '🌙';
            
            // Reset to light mode
            document.querySelectorAll('section').forEach(section => {
                section.style.background = 'rgba(255, 255, 255, 0.85)';
                section.style.color = '#34495e';
            });
            
            document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                heading.style.color = '#2c3e50';
            });
        }
    });
    
    // Add a floating "Back to top" button
    const topButton = document.createElement('button');
    topButton.innerHTML = '↑';
    topButton.style.position = 'fixed';
    topButton.style.bottom = '30px';
    topButton.style.right = '30px';
    topButton.style.zIndex = '100';
    topButton.style.background = '#ffcc00';
    topButton.style.color = '#2c3e50';
    topButton.style.border = 'none';
    topButton.style.borderRadius = '50%';
    topButton.style.width = '50px';
    topButton.style.height = '50px';
    topButton.style.cursor = 'pointer';
    topButton.style.fontSize = '24px';
    topButton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    topButton.style.display = 'none';
    
    document.body.appendChild(topButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    topButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});