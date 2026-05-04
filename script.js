// ============================================
// AADIV DENTAL CLINIC - Main JavaScript
// ============================================

document.addEventListener('componentsLoaded', () => {
    const clinicProfile = window.CLINIC_PROFILE || {};

    const setHtml = (selector, value) => {
        if (!value) return;
        document.querySelectorAll(selector).forEach((element) => {
            element.innerHTML = value;
        });
    };

    const setText = (selector, value) => {
        if (!value) return;
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    };

    const setLink = (selector, href) => {
        if (!href) return;
        document.querySelectorAll(selector).forEach((element) => {
            element.setAttribute('href', href);
        });
    };

    if (clinicProfile.clinicName) {
        document.title = `${clinicProfile.clinicName} | Gentle, Trusted Dental Care in Dindigul`;
        setText('[data-clinic="name"]', clinicProfile.clinicName);
    }

    setText('[data-clinic="name-tamil"]', clinicProfile.clinicNameTamil);
    setText('[data-clinic="phone"]', clinicProfile.phoneDisplay);
    setText('[data-clinic="email"]', clinicProfile.email);
    setHtml('[data-clinic="address"]', clinicProfile.addressHtml);
    setHtml('[data-clinic="hours"]', clinicProfile.hoursHtml);
    setText('[data-clinic="plus-code"]', clinicProfile.plusCode);
    setText('[data-clinic="tagline"]', clinicProfile.shortTagline);
    setText('[data-clinic="hero-badge"]', clinicProfile.heroBadge);
    setText('[data-clinic="hero-title"]', clinicProfile.heroTitle);
    setText('[data-clinic="hero-description"]', clinicProfile.heroDescription);
    setText('[data-clinic="lead-doctor-name"]', clinicProfile.leadDoctorName);
    setText('[data-clinic="lead-doctor-title"]', clinicProfile.leadDoctorTitle);
    setText('[data-clinic="lead-doctor-bio"]', clinicProfile.leadDoctorBio);
    setText('[data-clinic="about-rating"]', clinicProfile.aboutRating);
    setText('[data-clinic="about-rating-note"]', clinicProfile.aboutRatingNote);
    setText('[data-clinic="booking-note"]', clinicProfile.bookingNote);
    setText('[data-clinic="stat-rating"]', clinicProfile.stats && clinicProfile.stats.rating);
    setText('[data-clinic="stat-reviews"]', clinicProfile.stats && clinicProfile.stats.reviews);
    setText('[data-clinic="stat-location"]', clinicProfile.stats && clinicProfile.stats.location);
    setText('[data-clinic="stat-care"]', clinicProfile.stats && clinicProfile.stats.care);

    setLink('[data-clinic-link="phone"]', clinicProfile.phoneHref);
    if (clinicProfile.email) {
        setLink('[data-clinic-link="email"]', `mailto:${clinicProfile.email}`);
    }
    setLink('[data-clinic-link="map"]', clinicProfile.mapUrl);
    if (clinicProfile.whatsappNumber) {
        const whatsappGreeting = encodeURIComponent('Hello, I would like to book a dental appointment.');
        setLink('[data-clinic-link="whatsapp"]', `https://wa.me/${clinicProfile.whatsappNumber}?text=${whatsappGreeting}`);
    }

    if (clinicProfile.socialLinks) {
        Object.entries(clinicProfile.socialLinks).forEach(([platform, href]) => {
            const links = document.querySelectorAll(`[data-social-link="${platform}"]`);
            if (href) {
                links.forEach((element) => {
                    element.setAttribute('href', href);
                    element.removeAttribute('aria-hidden');
                });
            } else {
                links.forEach((element) => {
                    element.style.display = 'none';
                    element.setAttribute('aria-hidden', 'true');
                });
            }
        });

        const visibleSocialLinks = Array.from(document.querySelectorAll('.footer-socials a'))
            .filter((element) => element.style.display !== 'none');
        if (visibleSocialLinks.length === 0) {
            document.querySelectorAll('.footer-socials').forEach((element) => {
                element.style.display = 'none';
            });
        }
    }

    document.querySelectorAll('meta[property="og:title"]').forEach((meta) => {
        meta.setAttribute('content', `${clinicProfile.clinicName} | Gentle, Trusted Dental Care in Dindigul`);
    });
    document.querySelectorAll('meta[property="og:description"]').forEach((meta) => {
        meta.setAttribute('content', clinicProfile.shortTagline || '');
    });
    document.querySelectorAll('meta[name="description"]').forEach((meta) => {
        meta.setAttribute('content', clinicProfile.shortTagline || '');
    });
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const isActive = mobileMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isActive));
            if (isActive) {
                if(menuIcon) { menuIcon.classList.remove('fa-bars'); menuIcon.classList.add('fa-times'); }
            } else {
                if(menuIcon) { menuIcon.classList.remove('fa-times'); menuIcon.classList.add('fa-bars'); }
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                if(menuIcon) { menuIcon.classList.remove('fa-times'); menuIcon.classList.add('fa-bars'); }
            });
        });
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('home');
    if (navbar) {
        let ticking = false;

        const updateNavbarState = () => {
            const isScrolled = window.scrollY > 20;
            navbar.classList.toggle('scrolled', isScrolled);

            let shouldCompactBrand = isScrolled;
            if (heroSection) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                shouldCompactBrand = heroBottom <= (navbar.offsetHeight + 24);
            }

            navbar.classList.toggle('compact-brand', shouldCompactBrand);
            ticking = false;
        };

        const requestNavbarUpdate = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbarState);
                ticking = true;
            }
        };

        updateNavbarState();
        window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
        window.addEventListener('resize', requestNavbarUpdate);
    }

    // ============================================
    // Back to Top Button
    // ============================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    if (scrollElements.length > 0) {
        // Initial check and scroll listener
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
        // Also trigger one right after loading
        setTimeout(handleScrollAnimation, 100);
        setTimeout(handleScrollAnimation, 500);
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    const faqBtns = document.querySelectorAll('.faq-btn');
    if (faqBtns.length > 0) {
        faqBtns.forEach((btn, index) => {
            const content = btn.nextElementSibling;
            const contentId = `faq-content-${index + 1}`;
            if (content) {
                content.id = contentId;
            }
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-controls', contentId);

            btn.addEventListener('click', () => {
                const icon = btn.querySelector('i');
                
                // Close other FAQs
                faqBtns.forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        const otherContent = otherBtn.nextElementSibling;
                        if (otherContent) otherContent.classList.remove('active');
                        otherBtn.setAttribute('aria-expanded', 'false');
                        const otherIcon = otherBtn.querySelector('i');
                        if (otherIcon) otherIcon.classList.replace('fa-minus', 'fa-plus');
                    }
                });

                // Toggle current FAQ
                if (content) content.classList.toggle('active');
                if (icon && content) {
                    btn.setAttribute('aria-expanded', String(content.classList.contains('active')));
                    if (content.classList.contains('active')) {
                        icon.classList.replace('fa-plus', 'fa-minus');
                    } else {
                        icon.classList.replace('fa-minus', 'fa-plus');
                    }
                }
            });
        });
    }

    // ============================================
    // Appointment Form
    // ============================================
    const form = document.getElementById('appointment-form');
    const formMessage = document.getElementById('form-message');

    if (form && formMessage) {
        const appointmentDateEl = document.getElementById('appointment-date');
        const phoneInputEl = document.getElementById('phone');

        if (phoneInputEl) {
            phoneInputEl.addEventListener('input', () => {
                phoneInputEl.value = phoneInputEl.value.replace(/\D/g, '').slice(0, 10);
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameEl = document.getElementById('name');
            const phoneEl = document.getElementById('phone');
            const emailEl = document.getElementById('email');
            const serviceEl = document.getElementById('service');
            const preferredTimeEl = document.getElementById('preferred-time');
            const messageEl = document.getElementById('message');

            const phoneValue = phoneEl ? phoneEl.value.replace(/\D/g, '').slice(0, 10) : '';
            if (phoneEl) {
                phoneEl.value = phoneValue;
            }
            const isPhoneValid = /^\d{10}$/.test(phoneValue);

            if (nameEl && phoneEl && serviceEl && nameEl.value.trim() && isPhoneValid && serviceEl.value) {
                const appointmentDate = appointmentDateEl && appointmentDateEl.value
                    ? new Date(`${appointmentDateEl.value}T00:00:00`).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                    : 'Not specified';

                const lines = [
                    `Hello ${clinicProfile.clinicName || 'clinic team'},`,
                    '',
                    'I would like to request a dental appointment.',
                    `Name: ${nameEl.value.trim()}`,
                    `Phone: ${phoneValue}`,
                    `Email: ${emailEl && emailEl.value.trim() ? emailEl.value.trim() : 'Not provided'}`,
                    `Service: ${serviceEl.value}`,
                    `Preferred date: ${appointmentDate}`,
                    `Preferred time: ${preferredTimeEl && preferredTimeEl.value ? preferredTimeEl.value : 'Not specified'}`,
                    `Notes: ${messageEl && messageEl.value.trim() ? messageEl.value.trim() : 'None'}`
                ];

                const whatsappUrl = clinicProfile.whatsappNumber
                    ? `https://wa.me/${clinicProfile.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
                    : '';

                if (whatsappUrl) {
                    window.open(whatsappUrl, '_blank', 'noopener');
                }

                if (clinicProfile.email) {
                    const mailtoUrl = `mailto:${clinicProfile.email}?subject=${encodeURIComponent('Appointment Request')}&body=${encodeURIComponent(lines.join('\n'))}`;
                    setTimeout(() => {
                        window.location.href = mailtoUrl;
                    }, 200);
                }

                formMessage.textContent = 'Your request is ready. WhatsApp has opened and an email draft will open next if available.';
                formMessage.className = 'form-message success';
                form.reset();
                
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 5000);
            } else {
                formMessage.textContent = 'Please enter your name, a 10 digit phone number, and the service you need.';
                formMessage.className = 'form-message error';
            }
        });
    }

    // ============================================
    // Gallery Slider
    // ============================================
    const gallery = document.getElementById('gallery-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    // Check if inner slider exists, otherwise check if the wrapper has it (there are 2 gallery-containers)
    const gallerySlider = document.querySelector('.gallery-slider') || gallery;

    if (scrollLeftBtn && scrollRightBtn && gallerySlider) {
        const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 420;
        
        scrollLeftBtn.addEventListener('click', () => {
            gallerySlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            gallerySlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    const getAnchorTarget = (href) => {
        if (href === '#appointment' || href === '#book-appointment') {
            return document.getElementById('book-appointment')
                || document.getElementById('appointment-form')
                || document.getElementById('appointment');
        }

        try {
            return document.querySelector(href);
        } catch (error) {
            return null;
        }
    };

    const scrollToAnchorTarget = (target) => {
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;

        window.scrollTo({
            top: Math.max(targetPosition, 0),
            behavior: 'smooth'
        });
    };

    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = getAnchorTarget(href);
        if (!target) return;

        e.preventDefault();
        scrollToAnchorTarget(target);
    });

    if (window.location.hash === '#appointment' || window.location.hash === '#book-appointment') {
        const target = getAnchorTarget(window.location.hash);
        if (target) {
            setTimeout(() => scrollToAnchorTarget(target), 150);
        }
    }

});
