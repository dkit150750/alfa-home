/* eslint-disable no-new */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function throttle(function_, ms) {
	let isThrottled = false;
	let savedArguments;
	let savedThis;

	function wrapper(...argumentsList) {
		if (isThrottled) {
			// eslint-disable-next-line prefer-rest-params
			savedArguments = argumentsList;
			// eslint-disable-next-line unicorn/no-this-assignment
			savedThis = this;
			return;
		}

		// eslint-disable-next-line prefer-rest-params
		Reflect.apply(function_, this, argumentsList);

		isThrottled = true;

		// eslint-disable-next-line func-names
		setTimeout(function () {
			isThrottled = false;
			if (savedArguments) {
				wrapper.apply(savedThis, savedArguments);
				savedArguments = null;
				savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

function getCoords(element) {
	const box = element.getBoundingClientRect();

	return {
		top: Math.round(box.top + window.pageYOffset),
		right: Math.round(box.right + window.pageXOffset),
		bottom: Math.round(box.bottom + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset),
	};
}

{
	const header = document.querySelector('.header');
	const headerMobileTop = header.querySelector('.header-mobile-top__outer');
	const body = document.querySelector('.page__body');
	const headerSearch = headerMobileTop.querySelector('.header-search');
	const headerSearchForm = headerMobileTop.querySelector('.header-search__form');
	const headerSearchFormInput = headerMobileTop.querySelector('.header-search__input');
	const headerSearchFormOverlay = headerMobileTop.querySelector('.header-search__overlay');
	const headerSearchTrigger = headerSearch.querySelector('.header-search__trigger');

	function switchSearchExpanded() {
		if (!headerSearch.classList.contains('header-search--expanded')) {
			headerSearch.classList.add('header-search--expanded');
			body.classList.add('page__body--lock');
			headerSearchFormInput.focus();
		} else {
			headerSearch.classList.remove('header-search--expanded');
			body.classList.remove('page__body--lock');
			headerSearchTrigger.focus();
		}
	}

	headerSearchForm.addEventListener('reset', switchSearchExpanded);
	headerSearchTrigger.addEventListener('click', switchSearchExpanded);
	headerSearchFormOverlay.addEventListener('click', switchSearchExpanded);
}

{
	const header = document.querySelector('.header');

	const headerDesktopMiddleWrapper = header.querySelector('.header-desktop-middle');
	const headerDesktopMiddle = header.querySelector('.header-desktop-middle__outer');

	const headerMobileTopWrapper = header.querySelector('.header-mobile-top');
	const headerMobileTop = header.querySelector('.header-mobile-top__outer');

	const headerLogoDesktop = headerDesktopMiddle.querySelector('.header-logo--desktop');
	const headerSearchDesktop = headerDesktopMiddle.querySelector('.header-search');
	const headerTabsBox = headerDesktopMiddle.querySelector('.header-tabs');
	const headerTabDesktopList = headerTabsBox.querySelectorAll('.header-tab');
	const buttonScrollUp = document.querySelector('.page__scroll-up');

	const windowHeight = window.innerHeight;

	let headerDesktopMiddleWrapperHeight;
	let headerDesktopMiddleWrapperCoords;

	function getHeaderDesktopValues() {
		headerDesktopMiddleWrapperHeight = headerDesktopMiddleWrapper.clientHeight;
		headerDesktopMiddleWrapperCoords = getCoords(headerDesktopMiddleWrapper);
		switchHeaderDesktopSticky();
	}
	getHeaderDesktopValues();

	function getHeaderMobileValues() {
		headerMobileTopWrapperHeight = headerMobileTopWrapper.clientHeight;
		headerMobileTopCoords = getCoords(headerMobileTop);
		switchHeaderDesktopSticky();
	}
	getHeaderMobileValues();

	buttonScrollUp.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});

	function switchHeaderDesktopSticky() {
		if (window.pageYOffset > headerDesktopMiddleWrapperCoords.top) {
			headerDesktopMiddle.classList.add('header-desktop-middle__outer--sticky');
			headerLogoDesktop.classList.add('header-logo--hide-description');
			headerSearchDesktop.classList.add('header-search--compact');
			// headerTabsBox.classList.add('header-tabs--compact');
			headerTabDesktopList.forEach((tab) => {
				tab.classList.add('header-tab--hide-description');
			});
			headerDesktopMiddleWrapper.style.paddingBottom = `${headerDesktopMiddleWrapperHeight}px`;
		} else {
			headerDesktopMiddle.classList.remove('header-desktop-middle__outer--sticky');
			headerLogoDesktop.classList.remove('header-logo--hide-description');
			headerSearchDesktop.classList.remove('header-search--compact');
			// headerTabsBox.classList.remove('header-tabs--compact');
			headerTabDesktopList.forEach((tab) => {
				tab.classList.remove('header-tab--hide-description');
			});
			headerDesktopMiddleWrapper.style.paddingBottom = 0;
		}
	}

	function hideMobileMenu() {
		headerMobileTop.classList.remove('header-mobile-top__outer--hide');
		headerMobileTop.classList.remove('header-mobile-top__outer--sticky');
		headerMobileTopWrapper.style.paddingBottom = 0;
		headerMobileTop.removeEventListener('animationend', hideMobileMenu);
	}

	function switchHeaderMobileSticky() {
		if (window.pageYOffset > windowHeight / 1) {
			headerMobileTop.classList.add('header-mobile-top__outer--sticky');
			headerMobileTopWrapper.style.paddingBottom = `${headerMobileTopWrapperHeight}px`;
		} else if (headerMobileTop.classList.contains('header-mobile-top__outer--sticky')) {
			headerMobileTop.classList.add('header-mobile-top__outer--hide');
			headerMobileTop.addEventListener('animationend', hideMobileMenu);
		}
	}

	function switchButtonScrollUp() {
		if (window.pageYOffset > document.documentElement.clientHeight) {
			buttonScrollUp.classList.add('page__scroll-up--show');
		} else {
			buttonScrollUp.classList.remove('page__scroll-up--show');
		}
	}

	const windowScrollHandler = throttle(() => {
		switchHeaderDesktopSticky();
		switchHeaderMobileSticky();
		switchButtonScrollUp();
	}, 10);

	const windowResizeHandler = throttle(() => {
		getHeaderDesktopValues();
	}, 100);

	window.addEventListener('scroll', windowScrollHandler, { passive: true });
	window.addEventListener('resize', windowResizeHandler, { passive: true });
}

{
	const bannersSlider = new Swiper('.banners-slider .swiper', {
		init: false,
		effect: 'fade',

		loop: true,
		autoplay: {
			delay: 5000,
		},

		clickable: true,

		pagination: {
			dynamicBullets: true,
			el: '.banners-slider .swiper-pagination',
			bulletElement: 'button',
			clickable: true,
			bulletClass: 'swiper-pagination__bullet',
			bulletActiveClass: 'swiper-pagination__bullet--active',
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.banners-slider .swiper-navigation--next',
					prevEl: '.banners-slider .swiper-navigation--prev',
				},
			},
		},
	});

	bannersSlider.init();
}

{
	const productsSliderOne = new Swiper('.popular-products-slider .swiper', {
		loop: true,
		// autoplay: {
		// 	delay: 5000,
		// },
		clickable: true,

		pagination: {
			dynamicBullets: true,
			dynamicMainBullets: 3,
			el: '.popular-products-slider .swiper-pagination',
			bulletElement: 'button',
			clickable: true,
			bulletClass: 'swiper-pagination__bullet',
			bulletActiveClass: 'swiper-pagination__bullet--active',
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.popular-products-slider .swiper-navigation--next',
					prevEl: '.popular-products-slider .swiper-navigation--prev',
				},
			},
		},
	});

	productsSliderOne.init();
}

{
	const advantagesSlider = new Swiper('.advantages-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		spaceBetween: 5,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			400: {
				spaceBetween: 5,
			},
			768: {
				navigation: {
					nextEl: '.advantages-slider .swiper-navigation--next',
					prevEl: '.advantages-slider .swiper-navigation--prev',
				},
			},
		},
	});

	advantagesSlider.init();
}

{
	const catalogSlider = new Swiper('.catalogs-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		spaceBetween: 12,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.catalogs-slider .swiper-navigation--next',
					prevEl: '.catalogs-slider .swiper-navigation--prev',
				},
			},
		},
	});

	catalogSlider.init();
}

{
	new Swiper('.brands-slider .swiper', {
		// init: false,
		slidesPerView: 'auto',
		grid: {
			rows: 2,
		},
		spaceBetween: 24,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				grid: {
					rows: 2,
				},
				navigation: {
					nextEl: '.brands-slider .swiper-navigation--next',
					prevEl: '.brands-slider .swiper-navigation--prev',
				},
			},
		},
	});

	// brandsSlider.init();
}

{
	const worksSlider = new Swiper('.works-slider .swiper', {
		init: false,

		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 25,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.works-slider .swiper-navigation--next',
					prevEl: '.works-slider .swiper-navigation--prev',
				},
			},
		},
	});

	worksSlider.init();
}

{
	const promotionsSlider = new Swiper('.promotions-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 25,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.promotions-slider .swiper-navigation--next',
					prevEl: '.promotions-slider .swiper-navigation--prev',
				},
			},
		},
	});
	promotionsSlider.init();
}

{
	const certificatesSlider = new Swiper('.certificates-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 25,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.certificates-slider .swiper-navigation--next',
					prevEl: '.certificates-slider .swiper-navigation--prev',
				},
			},
		},
	});
	certificatesSlider.init();
}

{
	// eslint-disable-next-line no-unused-vars
	const news = new Swiper('.news-slider .swiper', {
		// init: false,
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 40,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.news-slider .swiper-navigation--next',
					prevEl: '.news-slider .swiper-navigation--prev',
				},
			},
		},
	});
	// news.init();
}

{
	const infoSlider = new Swiper('.info-slider .swiper', {
		init: false,

		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 40,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			768: {
				navigation: {
					nextEl: '.info-slider .swiper-navigation--next',
					prevEl: '.info-slider .swiper-navigation--prev',
				},
			},
		},
	});

	infoSlider.init();
}

{
	class Tabbed {
		constructor(tabbed) {
			this.tabbed = tabbed;
			this.tabList = tabbed.querySelector('[data-type=tab-list]');
			this.tabs = [...tabbed.querySelectorAll('[data-type=tab]')];
			this.panels = [...tabbed.querySelectorAll('[data-type=tab-panel]')];
		}

		initTabbed = () => {
			this.initTabs();
			this.inittabList();
			this.initPanels();
		};

		initTabs = () => {
			this.tabs.forEach((tab, tabIndex) => {
				tab.setAttribute('role', 'tab');
				tab.setAttribute('id', `tab${tabIndex + 1}`);
				tab.setAttribute('tabindex', '-1');
				const parent = tab.closest('[data-type="tab-parent"]');
				parent.setAttribute('role', 'presentation');

				this.tabAddClickHandler(tab);
				this.tabAddKeydownHandler(tab, tabIndex);
			});

			this.tabs[0].removeAttribute('tabindex');
			this.tabs[0].setAttribute('aria-selected', 'true');
		};

		inittabList = () => {
			this.tabList.setAttribute('role', 'tab-list');
		};

		initPanels = () => {
			this.panels.forEach((panel, panelIndex) => {
				panel.setAttribute('role', 'tab-panel');
				panel.setAttribute('tabindex', '-1');
				panel.setAttribute('aria-labelledby', this.tabs[panelIndex].id);
				panel.hidden = true;
			});
			this.panels[0].hidden = false;
		};

		tabAddClickHandler = (tab) => {
			tab.addEventListener('click', (event) => {
				event.preventDefault();
				const currentTab = this.tabList.querySelector('[aria-selected]');
				if (event.currentTarget !== currentTab) {
					this.switchTab(currentTab, event.currentTarget);
				}
			});
		};

		tabAddKeydownHandler = (tab, tabIndex) => {
			tab.addEventListener('keydown', (event) => {
				const currentIndex = this.tabs.indexOf(event.currentTarget);

				const direction = this.getDirection(event, currentIndex);

				if (direction !== null) {
					event.preventDefault();
					if (direction === 'down') {
						this.panels[tabIndex].focus();
					} else if (this.tabs[direction]) {
						this.switchTab(event.currentTarget, this.tabs[direction]);
					}
				}
			});
		};

		getDirection = (event, currentIndex) => {
			return event.key === 'ArrowLeft'
				? currentIndex - 1
				: event.key === 'ArrowRight'
				? currentIndex + 1
				: event.key === 'ArrowDown'
				? 'down'
				: null;
		};

		switchTab = (oldTab, newTab) => {
			newTab.focus();
			newTab.removeAttribute('tabindex');
			newTab.setAttribute('aria-selected', 'true');

			oldTab.removeAttribute('aria-selected');
			oldTab.setAttribute('tabindex', '-1');
			const newIndex = this.tabs.indexOf(newTab);
			const oldIndex = this.tabs.indexOf(oldTab);

			this.panels[oldIndex].hidden = true;
			this.panels[newIndex].hidden = false;
		};
	}
	const tabbedList = document.querySelectorAll('[data-type=tabbed]');
	tabbedList.forEach(($tabbed) => {
		const tabbed = new Tabbed($tabbed);
		tabbed.initTabbed();
	});
}
