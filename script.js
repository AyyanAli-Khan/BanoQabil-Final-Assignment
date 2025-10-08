
// Cart functionality
let cart = [];
let cartTotal = 0;

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Menu filtering
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Update active category button
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter menu items
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add to cart functionality
function addToCart(itemName, price) {
    cart.push({ name: itemName, price: parseFloat(price) });
    cartTotal += parseFloat(price);

    showNotification(`${itemName} added to cart! 🍕`);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    // This would update a cart sidebar or modal in a real application
    console.log('Cart updated:', cart);
    console.log('Total:', cartTotal);
}

// Pizza Order Calculator
function updateOrder() {
    let total = 0;
    let orderSummary = '';

    // Get size
    const size = document.querySelector('input[name="size"]:checked');
    if (size) {
        total += parseFloat(size.dataset.price);
        const sizeText = size.id === 'small' ? 'Personal (10")' :
            size.id === 'medium' ? 'Medium (12")' :
                size.id === 'large' ? 'Large (14")' : 'Family (16")';
        orderSummary += `<div class="cart-item">${sizeText} - ${size.dataset.price}</div>`;
    }

    // Get crust
    const crust = document.querySelector('input[name="crust"]:checked');
    if (crust) {
        const crustPrice = crust.dataset.price || 0;
        total += parseFloat(crustPrice);
        const crustText = crust.id === 'thin' ? 'Thin & Crispy Crust' :
            crust.id === 'thick' ? 'Thick & Chewy Crust' :
                crust.id === 'stuffed' ? 'Cheese Stuffed Crust' : 'Gluten-Free Crust';
        orderSummary += `<div class="cart-item">${crustText}${crustPrice > 0 ? ` (+${crustPrice})` : ''}</div>`;
    }

    // Get cheese
    const cheese = document.querySelector('input[name="cheese"]:checked');
    if (cheese) {
        const cheesePrice = cheese.dataset.price || 0;
        total += parseFloat(cheesePrice);
        const cheeseText = cheese.id === 'regular-cheese' ? 'Regular Mozzarella Cheese' :
            cheese.id === 'extra-cheese' ? 'Extra Cheese' : 'Vegan Cheese';
        orderSummary += `<div class="cart-item">${cheeseText}${cheesePrice > 0 ? ` (+${cheesePrice})` : ''}</div>`;
    }

    // Get meat toppings
    const meatToppings = document.querySelectorAll('input[name="meat-toppings"]:checked');
    meatToppings.forEach(topping => {
        total += parseFloat(topping.dataset.price);
        const toppingText = topping.id.charAt(0).toUpperCase() + topping.id.slice(1);
        orderSummary += `<div class="cart-item">${toppingText} (+${topping.dataset.price})</div>`;
    });

    // Get veggie toppings
    const veggieToppings = document.querySelectorAll('input[name="veggie-toppings"]:checked');
    veggieToppings.forEach(topping => {
        total += parseFloat(topping.dataset.price);
        const toppingText = topping.id.charAt(0).toUpperCase() + topping.id.slice(1);
        orderSummary += `<div class="cart-item">${toppingText} (+${topping.dataset.price})</div>`;
    });

    // Get special additions
    const specialAdditions = document.querySelectorAll('input[name="special"]:checked');
    specialAdditions.forEach(special => {
        total += parseFloat(special.dataset.price);
        const specialText = special.id.replace('-', ' ').split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        orderSummary += `<div class="cart-item">${specialText} (+${special.dataset.price})</div>`;
    });

    document.getElementById('orderSummary').innerHTML = orderSummary;
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Get current total for custom pizza
function getCurrentTotal() {
    return parseFloat(document.getElementById('totalPrice').textContent);
}

// Place order
function placeOrder() {
    const total = getCurrentTotal();
    showNotification(`Order placed successfully! Total: ${total.toFixed(2)} 🎉`);

    // Reset form
    setTimeout(() => {
        document.querySelector('input[name="size"][value="medium"]').checked = true;
        document.querySelector('input[name="crust"][value="thin"]').checked = true;
        document.querySelector('input[name="cheese"][value="regular"]').checked = true;
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        updateOrder();
    }, 2000);
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');

    showNotification(`Thank you ${name}! We'll get back to you soon. 📧`);

    // Reset form
    setTimeout(() => {
        event.target.reset();
    }, 1000);
}

// Social media links
function openSocialMedia(platform) {
    showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}... 🌐`);
}

// Gallery image modal
function openImageModal(title) {
    showNotification(`Viewing: ${title} 📸`);
}

// Notification system
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add event listeners for pizza builder
document.addEventListener('DOMContentLoaded', function () {
    // Add change listeners to all pizza options
    const pizzaInputs = document.querySelectorAll('#order input[type="radio"], #order input[type="checkbox"]');
    pizzaInputs.forEach(input => {
        input.addEventListener('change', updateOrder);
    });

    // Initial order update
    updateOrder();

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(139, 69, 19, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(139, 69, 19, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '<div class="loading"></div> Processing...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });

    // Add hover effects to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function () {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });

    // Add animation delays to features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
    });

    // Add typing effect to hero text
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }

        setTimeout(typeWriter, 1000);
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.feature, .menu-item, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});